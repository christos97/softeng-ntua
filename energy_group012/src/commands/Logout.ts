import {Command, flags} from '@oclif/command'
import {catchError} from '../catchError'
import { loginChecks, isLoggedIn, setHeader } from '../someChecks'
import { cli } from 'cli-ux'
import { sslPath, readToken ,deleteToken } from '../path'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')

const client_cert = sslPath()
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
    let options = {
      method : 'POST',
      url : `${base_url}/logout`,
    }
    try {
      const user = await axios(options)
      deleteToken()
      console.log(chalk.green('Logout Succesful'))
    }
    catch (err) { catchError(err) }
  }
}
