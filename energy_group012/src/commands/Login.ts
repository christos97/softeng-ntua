import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import { readFileSync } from 'fs'
import { isNullOrUndefined } from 'util'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})
const base_url = 'https://localhost:8765/energy/api'
let api_key = ''



export default class Login extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    username : flags.string({description: 'Required',required : true}),
    passw : flags.string({description : "Required ,no spaces allowed",required: true}),
  }

  //static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Login)
    let new_password = `${flags.passw}`
    let new_username = `${flags.username}`
    if (new_password.search(' ') >= 0){
      console.error(chalk.red.bold("Spaces are not allowed in password"))
      process.exit(0)
    }

         var body = {
            username : new_username,
            password : new_password,
          }
      var token_exists = fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
      if (token_exists != ""){
        console.log(chalk.blue.bold("Terminal already in use. To switch account first log out "))
        process.exit(1)
      }
      axios({
        method: 'post',
        url : `${base_url}/login`,
        data : body,
        headers: {'Content-Type' : 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin' : '*' ,
                  'Accept' : 'application/json'
                  }
                })
      .then((user : any) => {
          console.log(chalk.magenta.bold.italic(`\n     ---     Welcome to Energy CLI!      ---     \n` ))
          console.log(chalk.cyan('Use your Api Key to search for data\n'))
          console.log(chalk.cyan("Your Api Key: " + user.data.api_key))
          let token = JSON.stringify(user.data.token)
          fs.writeFileSync('/home/xsrm/softeng19bAPI.token',token.replace(/"/g,''))})
          .catch((err :any)=> {
          if (err.response.status == 403)
            console.error(chalk.red.bold('Username does not exist. Sign up first please'))
          else if (err.response.status == 400){
            console.error(chalk.red.bold('Error 400 : Bad Request'))
          }
          })
    }
  }
