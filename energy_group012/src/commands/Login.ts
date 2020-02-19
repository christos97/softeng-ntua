import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import {catchError} from '../catchError'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');

const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})

const base_url = 'https://localhost:8765/energy/api'


export default class Login extends Command {
  static description = 'Login to use Energy CLI'

  static flags = {
    help: flags.help({char: 'h'}),
    username : flags.string({description: 'Required',required : true}),
    passw : flags.string({description : "Required ,no spaces allowed",required: true}),
  }

  async run() {

    const {args, flags} = this.parse(Login)

    function greet( user : any){
      console.log(chalk.magenta.bold.italic(`\n     ---     Welcome to Energy CLI!      ---     \n` ))
      console.log(chalk.cyan('Use your Api Key to search for data\n' + "Your Api Key: " + user.data.api_key))
    }

    let token_exists = fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8'),
        new_password = `${flags.passw}`,
        new_username = `${flags.username}`

    if (token_exists != ""){
      console.log(chalk.blue.bold("Terminal already in use. To switch account first log out "))
      process.exit(1)
    }

    if (new_password.search(' ') >= 0){
      console.error(chalk.red.bold("Spaces are not allowed in password"))
      process.exit(0)
    }

    let body = {
      username : new_username,
      password : new_password,
    }

    let options = {
      method : 'POST',
      url : `${base_url}/login`,
      data : body
    }

    axios(options)
     .then((user : any) => {
        greet(user)
        let token = JSON.stringify(user.data.token)
        fs.writeFileSync('/home/xsrm/softeng19bAPI.token',token.replace(/"/g,''))})
     .catch((err :any)=> {
        if (err.response.status == 401)
          console.error(chalk.red('Authentication failed'))
        else catchError(err)
      })
    }
  }
