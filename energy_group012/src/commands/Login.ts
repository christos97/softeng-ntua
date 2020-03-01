import {Command, flags} from '@oclif/command'
import {catchError} from '../catchError'
import { loginChecks } from '../someChecks'
import { readToken, sslPath } from '../path'
import { cli } from 'cli-ux'
const fs = require('fs');
const resolve = require('path').resolve
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const client_cert = sslPath()
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

    let new_password = `${flags.passw}`,
        new_username = `${flags.username}`,
        token=readToken()

    if (token != ""){
      console.error(chalk.red('Terminal already in use'))
      process.exit(0)
    }

    loginChecks(new_username)
    let body = {
      username : new_username,
      password : new_password,
    }

    let options = {
      method : 'POST',
      url : `${base_url}/login`,
      data : body
    }
    try {
     const user = await axios(options)
     console.log(chalk.green('Login Succesful'))
     let token = JSON.stringify(user.data.token)
     fs.writeFileSync(resolve(__dirname,'../../softeng19bAPI.token'),token.replace(/"/g,''),'utf-8' )
    }
    catch (err){ catchError(err) }
   }
  }
