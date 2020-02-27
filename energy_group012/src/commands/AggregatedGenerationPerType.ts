import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import {catchError} from '../catchError'
import { isLoggedIn , setHeader, checkDate } from '../someChecks'
import { cli } from 'cli-ux'

const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');

const client_cert = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/energy_group012/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})
const base_url = 'https://localhost:8765/energy/api'

export default class AggregatedGenerationPerType extends Command {
  static description = 'Search AggregatedGenerationPerType Dataset'

  static flags = {
    area : flags.string({
      description : "Give Area Name to Search",
      required: true
    }),
    timeres: flags.string({
      description : "Give Time Resolution",
      required : true,
      options : ['PT15M','PT30M','PT60M']
    }),
    date: flags.string({
      description : "Date format : YYYY-MM-DD. Exclude to get Current Date"
    }),
    format : flags.string({
      description: "Output format : json | csv",
      options :['json','csv'],
      default: 'json'
    }),
    prodtype : flags.string({
      description: 'Give Generation Type',
      default : 'AllTypes'
    })

  }


  async run() {

    const {args, flags} = this.parse(AggregatedGenerationPerType)

    let token = isLoggedIn()
    setHeader(token)

    let areaName = `${flags.area}`,
        Resolution = `${flags.timeres}`,
        _date= `${flags.date}`,
        format = `${flags.format}`,
        producion = `${flags.prodtype}`,
        count = (_date.match(/-/g)||[]).length,
        dataset = 'AggregatedGenerationPerType',
        options = {
          params : {
            format: format
          }
        }


    checkDate(_date)

    cli.action.start('Request sent','Fetching Data',{stdout : true})

    if (count == 2) {
      let url : String = `${base_url}/${dataset}/${areaName}/${producion}/${Resolution}/date/${_date}`
      axios
        .get(url,options)
        .then(( response : any ) =>{
          cli.action.stop('done')
          console.log(response.data)
        })
        .catch(( err : any ) => catchError(err) )
    }
    else if (count == 1){
      let url : String = `${base_url}/${dataset}/${areaName}/${producion}/${Resolution}/month/${_date}`
      axios
        .get(url,options)
        .then(( response : any ) =>{
          cli.action.stop('done')
          console.log(response.data)
        })
        .catch(( err : any ) => catchError(err) )
    }
    else {
      let url : String = `${base_url}/${dataset}/${areaName}/${producion}/${Resolution}/year/${_date}`
      axios
       .get(url,options)
       .then(( response : any ) => {
          cli.action.stop('done')
          console.log(response.data)
        })
       .catch(( err : any ) => catchError(err) )
    }

  }
}
