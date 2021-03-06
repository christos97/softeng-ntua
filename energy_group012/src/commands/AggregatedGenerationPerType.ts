import {Command, flags} from '@oclif/command'
import {catchError} from '../catchError'
import { isLoggedIn , setHeader, checkDate } from '../someChecks'
import { cli } from 'cli-ux'
import { sslPath } from '../path'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const fs = require('fs');

const client_cert = sslPath()
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
      default : 'AllTypes',
      options:['Fossil Gas','Hydro Run-of-river and poundage','Hydro Pumped Storage','Hydro Water Reservoir','Fossil Hard coal','Nuclear','Fossil Brown coal/Lignite','Fossil Oil','Fossil Oil shale','Biomass','Fossil Peat','Wind Onshore','Other','Wind Offshore','Fossil Coal-derived gas','Waste','Solar','Geothermal','Other renewable','Marine','AC Link','Transformer','DC Link','Substation','AllTypes']
    })

  }


  async run() {

    const {flags} = this.parse(AggregatedGenerationPerType)

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

    if (count == 2) {
      let url : String = `${base_url}/${dataset}/${areaName}/${producion}/${Resolution}/date/${_date}`
      try{
        const response = await axios(url,options)
        console.log(response.data)
      }
      catch (err) { catchError(err) } }
    else if (count == 1) {
      let url : String = `${base_url}/${dataset}/${areaName}/${producion}/${Resolution}/month/${_date}`
      try{
        const response = await axios(url,options)
        console.log(response.data)
      }
      catch (err) { catchError(err) } }
    else {
      let url : String = `${base_url}/${dataset}/${areaName}/${producion}/${Resolution}/year/${_date}`
      try{
        const response = await axios(url,options)
        console.log(response.data)
      }
      catch (err) { catchError(err) } }
  }
}
