import {Command, flags} from '@oclif/command'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');

const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})

const base_url = 'https://localhost:8765/energy/api'

export default class Reset extends Command {
  static description = 'Drop collections'

  async run() {

    const {args, flags} = this.parse(Reset)


    let options = {
      method : 'POST',
      url : `${base_url}/Reset`,
    }

    axios(options)
     .then((user : any) => {
        console.log( user.data)
     })
     .catch((err :any)=> {
        if(err.response.status == 500) console.error(chalk.red('Reset failed'))
      })
    }
  }
