import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import { readFileSync } from 'fs'
import { isNullOrUndefined } from 'util'
import { Socket } from 'dgram'
import { catchError } from '/home/xsrm/Desktop/softeng-ntua-master/energy_group012/src/catchError'
import cli from 'cli-ux'
const https = require('https')
const request = require ( 'request')
const axios = require ('axios')
const chalk = require ('chalk')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const csv = require('csvtojson')
const FormData = require ('form-data')
const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})
https.globalAgent = new https.Agent({ca:client_cert})
const base_url = 'https://localhost:8765/energy/api'
let api_key = ''


export default class Admin extends Command {
  static description = 'Admin priviliges only'

  static flags = {
    help: flags.help({char: 'h'}),

    newuser: flags.string({
      description: 'Create new user',
      exclusive : ['userstatus' , 'moduser' , 'newdata']
    }),

    moduser : flags.string({
      description: 'Modify user',
      exclusive : ['newuser' , 'userstatus' , 'newdata'],
    }),

    userstatus : flags.string({
      description: 'Check userstatus',
      exclusive : ['newuser' , 'moduser' , 'newdata'],
    }),

    newdata : flags.string({
      exclusive : ['newuser' , 'moduser' , 'userstatus']
    }),


    source : flags.string({
      dependsOn: ['newdata'],
      //required: true
    }),

    passw : flags.string({
      description : "Required , no spaces allowed",
      exclusive : ['newdata' ,'userstatus']
      //dependsOn: ['newuser'] || ['moduser'],
      //required: true
  }),
    email : flags.string({
      description : "Required",
      exclusive : ['newdata' ,'userstatus']
      //dependsOn: ['newuser'] || ['moduser'],
      //required: true
  }),
    quota : flags.string({
      description :'Add user quota',
      exclusive : ['newdata' ,'userstatus']
      //dependsOn: ['newuser'] || ['moduser'],
      //required: true
  }),

  }
  static args = []

  async run () {

  const {args, flags} = this.parse(Admin)
  const token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
  axios.defaults.headers.common['X-Observatory-Auth']= token

  if(token == ''){
    console.error(chalk.red('No user is currently logged in'))
    process.exit(0)
  }

  //newdata

  if (`${flags.newdata}`!== 'undefined'){

    console.log(chalk.white('Locating file...'))
    let csvPath = `/home/xsrm/Downloads/${flags.source}`
    const jsonArray = await csv({delimiter: ';'}).fromFile(csvPath)
    //const readStream = fs.createReadStream(csvPath)

    //let form = new FormData({MaxDataSize : Infinity})

    //form.append('file',readStream)
    //console.log('here')
    //let formHeaders = form.getHeaders()
    cli.action.start(
      chalk.white('File located and transformed into JSON format!\n') +
      chalk.white('Readable stream created'),
      chalk.green.italic(' Sending Data...'),{stdout : true}
      )

    let json = JSON.stringify(jsonArray)
    let length = json.length
    fs.writeFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/csvtojson.json',json)
    let jsonPath = '/home/xsrm/Desktop/softeng-ntua-master/energy_group012/csvtojson.json'

    const options = {
      method: 'POST',
      url: `${base_url}/Admin/users/addCSV/${flags.newdata}`,
      headers : {
        'X-Observatory-Auth' : token,
      }
    }

    function callback(err : any, response : any){
      if (!err && response.statusCode == 200){
        console.log(chalk.green('Uploading to database!'))
      }
      else{
        console.log(chalk.red('Upload Failed'))
      }
    }
    const readStream = fs.createReadStream(csvPath)
    const writeStream = request(options,callback)
    readStream.pipe(writeStream)

    cli.action.stop(chalk.green('Data sent! ') + '\nWaiting for server response...')
  }

  // moduser

  if (`${flags.moduser}`!== 'undefined' ){
    let body = new Object ({
      email : `${flags.email}`,
      password : `${flags.passw}`,
      quota : `${flags.quota}`
    })
    let keys = Object.keys(body)
    let values = Object.values(body)
    for (let key in keys){
      if (values[key] === 'undefined'){
        console.error(chalk.red.bold("Missing required field: "+keys[key]))
        process.exit(0)
      }
    }
    axios
     .put(`${base_url}/Admin/users/update/${flags.moduser}`,body)
     .then((user : any) =>  {
      console.log(chalk.green(
        user.data.username + `'s new credentials:\n`))
      console.log(chalk.cyan(
        'Email : ' + user.data.email +
        '\nPassword :' + ` ${flags.passw}` +
        '\nQuotas : ' + user.data.quota
       ))
      })
     .catch((err : any) => catchError(err))
  }
  if (`${flags.newuser}`!== 'undefined'){
    let body = new Object ({
      username : `${flags.newuser}` ,
      email : `${flags.email}`,
      password : `${flags.passw}`,
      quota : `${flags.quota}`
    })
    let keys = Object.keys(body)
    let values = Object.values(body)
    for (let key in keys){
      if (values[key] === 'undefined'){
        console.error(chalk.red.bold("Missing required field: "+keys[key]))
        process.exit(0)
      }
    }

    axios
     .post(`${base_url}/Admin/users/signup`,body)
     .then((user : any) =>  {
        console.log(chalk.green.bold("\nNew User Added\n"))
        let str = JSON.stringify(user.data)
        api_key = str.slice(12,26)
        console.log(chalk.blue.bold("API Key: "+api_key))
      })
     .catch((err : any)  => catchError(err))
  }

      // User Status

    if (`${flags.userstatus}`!== 'undefined'){
      axios
       .get(`${base_url}/Admin/users/userstatus/${flags.userstatus}`)
       .then(( user : any ) => {
          console.log(chalk.blueBright("\n"+ `${flags.userstatus}` + " User Status\n"))
          console.log(user.data)
        })
        .catch((err : any) => catchError(err) )
       }
    }
  }
