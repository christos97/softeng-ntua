import {Command, flags} from '@oclif/command'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');
import {catchError} from '../catchError'

const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})

const base_url = 'https://localhost:8765/energy/api'

export default class HealthCheck extends Command {
  static description = 'Check e2e connectivity'

  async run() {
    try {
      const status = await axios.get(`${base_url}/HealthCheck`)
      console.log(status.data)
     }
    catch (err) {
      if (err.response == 'undefined') catchError(err)
      else if(err.response.status == 500) console.error(chalk.red('e2e check failed'))
    }
  }
}
