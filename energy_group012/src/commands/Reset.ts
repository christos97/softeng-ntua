import {Command, flags} from '@oclif/command'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
import { sslPath } from '../path'
import { catchError } from '../catchError';
const client_cert = sslPath()
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})

const base_url = 'https://localhost:8765/energy/api'

export default class Reset extends Command {
  static description = 'Drop collections'

  async run() {

    try {
      const user =await axios.post(`${base_url}/Reset`)
      console.log(user.data)
     }
     catch (err) {
        if(err.response.status == 500) console.error(chalk.red('Reset failed'))
        catchError(err)
      }
    }
  }
