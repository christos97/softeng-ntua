import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import { readFileSync } from 'fs'
import { isNullOrUndefined } from 'util'
import {cli} from 'cli-ux'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})
const base_url = 'https://localhost:8765/energy/api'
let api_key = ''
export default class Logout extends Command {
  static description = 'describe the command here'


  static flags = {
  }
  async run (){

  const {args, flags} = this.parse(Logout)

  let token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
  if(token == '') {
    console.log(chalk.blue.bold("No User is currently logged in "))
    process.exit(0)
  }
      axios.defaults.headers.common['X-Observatory-Auth']= token
      axios({
        method: 'post',
        url : `${base_url}/logout`,
      })
     .then()
     .catch()

      if(token) {
        console.log(chalk.magenta.bold("Bye bye !"))
        fs.writeFileSync('/home/xsrm/softeng19bAPI.token','',"utf-8")
      }
    }
  }
