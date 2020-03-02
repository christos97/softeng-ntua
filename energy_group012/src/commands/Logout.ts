import {Command, flags} from '@oclif/command'
import {catchError} from '../catchError'
import {  isLoggedIn, setHeader } from '../someChecks'
import { sslPath, deleteToken } from '../path'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')

const client_cert = sslPath()
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})

const base_url = 'https://localhost:8765/energy/api'


export default class Logout extends Command {
  static description = 'Logout from Energy CLI'

  async run() {

    let token = isLoggedIn()
    setHeader(token)
    try {
      await axios.post(`${base_url}/logout`)
      deleteToken()
      console.log(chalk.green('Logout Succesful'))
    }
    catch (err) { catchError(err) }
  }
}
