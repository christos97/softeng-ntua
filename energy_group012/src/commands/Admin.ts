import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import { catchError } from '../catchError'
import { isLoggedIn , setHeader,checkRequiredFields } from '../someChecks'
import { sslPath } from '../path'
import cli from 'cli-ux'
const https = require('https')
const request = require ( 'request')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');
const resolve = require('path').resolve
const csv = require('csvtojson')
const FormData = require ('form-data')
const client_cert = sslPath()
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})
https.globalAgent = new https.Agent({ca:client_cert})
const base_url = 'https://localhost:8765/energy/api'


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
    }),

    passw : flags.string({
      description : "Required , no spaces allowed",
      exclusive : ['newdata' ,'userstatus']
  }),
    email : flags.string({
      description : "Required",
      exclusive : ['newdata' ,'userstatus']
  }),
    quota : flags.string({
      description :'Add user quota',
      exclusive : ['newdata' ,'userstatus']
  }),

  }
  static args = []

  async run () {

  const {args, flags} = this.parse(Admin)

  let token = isLoggedIn()
  setHeader(token)

  //newdata

  if (`${flags.newdata}`!== 'undefined'){

    console.log(chalk.white('Locating file...'))
    let csvPath = resolve(__dirname,'../../../../') + `/${flags.source}`
    const jsonArray = await csv({delimiter: ';'}).fromFile(csvPath)
    cli.action.start(
      chalk.white('File located and transformed into JSON format!\n') +
      chalk.white('Readable stream created'),
      chalk.green.italic(' Sending Data...'),{stdout : true}
      )

    let json = JSON.stringify(jsonArray)
    fs.writeFileSync(resolve(__dirname,'../../csvtojson.json'),json,'utf-8' )
    let jsonPath = resolve(__dirname,'../../csvtojson.json')
    const options = {
      method: 'POST',
      url: `${base_url}/Admin/${flags.newdata}`,
      headers : {
        'X-Observatory-Auth' : token,
      }
    }

    function callback(err : any, response : any){
      if (!err && response.statusCode == 200){
        console.log(chalk.green('Uploading to database!'))
        console.log(response.body)
      }
      else{
        console.log(response.statusCode)
        //console.log(chalk.red('Upload Failed'))
        process.exit(0)
      }
    }
    const readStream = fs.createReadStream(jsonPath)
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

    checkRequiredFields(body)

    try {
        const user = await axios.put(`${base_url}/Admin/users/${flags.moduser}`,body)
        console.log(chalk.magenta(
          "username:  " + user.data.username,
          "\npassword:  " + `${flags.passw}`,
          "\nemail: " + user.data.email,
          "\nquota  " + user.data.quota
        ))
    }
    catch(err)  {
        if ( err.response.status == 403 ){
           console.log(chalk.red('Update failed'))
           process.exit(0)
        }
        else catchError(err)
      }
  }
  if (`${flags.newuser}`!== 'undefined'){
    let body = new Object ({
      username : `${flags.newuser}` ,
      email : `${flags.email}`,
      password : `${flags.passw}`,
      quota : `${flags.quota}`
    })


    checkRequiredFields(body)
    try {
      const user = await axios.post(`${base_url}/Admin/users`,body)
      if (user) console.log(chalk.green("User Created"))
    }
    catch (err) {
      catchError(err)
    }
  }

      // User Status

    if (`${flags.userstatus}`!== 'undefined'){
      try {
        const  user = await axios.get(`${base_url}/Admin/users/${flags.userstatus}`)
        if (user) console.log(user.data)
      }
      catch (err) {
        catchError(err)
       }
      }
    }
  }
