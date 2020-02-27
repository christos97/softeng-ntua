import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import {catchError} from '../catchError'
import { loginChecks, isLoggedIn, setHeader } from '../someChecks'
import { cli } from 'cli-ux'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');

const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})

const base_url = 'https://localhost:8765/energy/api'


export default class Logout extends Command {
  static description = 'Logout from Energy CLI'

  static flags = {
    help: flags.help({char: 'h'})
  }

  async run() {

    const {flags} = this.parse(Logout)

    let token = isLoggedIn()
    setHeader(token)
    cli.action.start('Logging out','...',{stdout: true})


    let options = {
      method : 'POST',
      url : `${base_url}/logout`,
    }

    axios(options)
     .then((user : any) => {
       cli.action.stop('done')
       console.log(chalk.magenta.bold('\n             ---     Bye Bye    ---\n'))
       fs.writeFileSync('/home/xsrm/softeng19bAPI.token','','utf-8')
      })
     .catch((err :any)=> catchError(err))
    }
  }
