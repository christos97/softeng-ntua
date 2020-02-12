import {Command, flags} from '@oclif/command'
import { userInfo, type } from 'os'
import { format } from 'path'
import { readFileSync } from 'fs'
import { isNullOrUndefined } from 'util'
const https = require('https')
const axios = require ('axios')
const chalk = require ('chalk')
const jwt = require('jsonwebtoken');
const credentials = require('/home/xsrm/Desktop/TL19-12-master/back-end/config/credentials.js')
const fs = require('fs');
//axios.defaults.headers.common['X-Observatory-Auth']= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiZW1haWwiOiJoZWxsb0BoZXkuY29tIiwidXNlcklkIjoiNWUxZjJlYjNlN2Y0Y2EyNjNiNzdlY2M0IiwiYXBpX2tleSI6ImFwOWotaDg0MS1yYm96IiwiaWF0IjoxNTc5MTAyMDUyLCJleHAiOjE1NzkxMDU2NTJ9.IbnUPAlvrA-blaLnmOTevxcEGRrqxA0-L97f-Tz32Lg'
const client_cert = fs.readFileSync('/home/xsrm/Desktop/TL19-12-master/back-end/SSL/ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert})
const base_url = 'https://localhost:8765/energy/api'
let api_key = ''

class EnergyGroup012 extends Command {
  static flags = {
    help: flags.help({char: 'h'}),
    newuser: flags.string({description: 'Create new User: Admin Scope'}),
    userstatus :flags.string({description :'Show User Status: Admin Scope'}),
    username : flags.string(),
    passw : flags.string({description : "Required , no spaces allowed"}),
    email : flags.string({description : "Required"}),
    quota : flags.string({description :'Add User Quota: Admin Scope'}),
    area : flags.string({description : "Give Area Name to Search"}),
    timeres: flags.string({description : "Give Time Resolution"}),
    date: flags.string({description : "Give date like this : YYYY-MM-DD. Omit to get Current Date"}),
    format : flags.string({description: "json | csv",
                          options :['json','csv'],
                          default: 'json'
                        }),
    apikey : flags.string({}),
    productiontype : flags.string({description: "ProductionType | AllTypes",default: 'AllTypes'}),
    moduser :flags.string({description: "Modify user" })
  }


  static args = [{name: 'SCOPE',
  options : [
              "Logout",
              "Login",
              "Admin",
              "ActualTotalLoad",
              "AggregatedGenerationPerType",
              "DayAheadTotalLoadForecast",
              "ActualVsForecast"
            ]}]

  async run() {

    const {args, flags} = this.parse(EnergyGroup012)





    //LOGIN

    if (`${args.SCOPE}` == 'Login'){
      var new_password = `${flags.passw}`
      var new_username = `${flags.username}`

         var body = {
            username : new_username,
            password : new_password,
          }
      var token_exists = fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
      if (token_exists != ""){
        console.log(chalk.blue.bold("Terminal already in use. To switch account first log out "))
        process.exit(1)
      }
      axios({
        method: 'post',
        url : `${base_url}/login`,
        data : body,
        headers: {'Content-Type' : 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin' : '*' ,
                  'Accept' : 'application/json'
                  }

          }).then((user : any) => {
            console.log(chalk.cyan.bold(`Welcome to energy CLI, Use the Api Key given to search for data!\n`))
            console.log(chalk.yellowBright.bold("Your Api Key: " + user.data.api_key))
            let token = JSON.stringify(user.data.token)
            fs.writeFileSync('/home/xsrm/softeng19bAPI.token',token.replace(/"/g,''))
          }).catch((err :any)=> {
            console.log(err)
            //console.log(chalk.red.bold('We cant find that user. Sign up first or make sure you keep the format'))
          })
    }
        //LOGOUT

    else if (`${args.SCOPE}` == 'Logout') {
      var token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
      axios.defaults.headers.common['X-Observatory-Auth']= token
      axios({
        method: 'post',
        url : `${base_url}/logout`,
      })
     .then()
     .catch((err:any) => {
       console.log(err)
     })
      token =fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
      if (!token){
        console.log(chalk.cyan.bold("No User is currently logged in "))
      }else {
        console.log(chalk.green.bold("Bye bye !"))
        fs.writeFileSync('/home/xsrm/softeng19bAPI.token','',"utf-8")
      }
    }

      //ADMIN

    else if (`${args.SCOPE}` == 'Admin'){
      var new_username = `${flags.newuser}`,
          new_password = `${flags.passw}`,
          new_email = `${flags.email}`,
          new_quota = `${flags.quota}`
      var _body = {
            username : new_username ,
            email : new_email,
            password : new_password,
            quota : new_quota
          }
          //token =fs.readFileSync('/home/xsrm/Desktop/test-NewVersion/public-keys','utf-8')
          //if (!isNullOrUndefined(token)){const decoded = jwt.verify(token, credentials.secret)
            //if (decoded.email != credentials.admin_user.email ){
              //console.log(chalk.red.bold("Unauthorized access: Admin privileges required"))
              //process.exit(0)
            //}
          //}
          if (`${flags.moduser}`!== 'undefined'){
            axios(`${base_url}/Admin/users/patch/${flags.moduser}`,{
             method : 'patch',
             data : _body,
             headers: {'Content-Type' : 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin" : "*" ,
                        'Accept' : 'application/json'
                       }
           })
           .then((user : any) =>  {
              console.log(user.data)

           })
           .catch((err:any) => {
             console.log(err)
           })
          }

        if (`${flags.newuser}`!== 'undefined'){
          var token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
          axios.defaults.headers.common['X-Observatory-Auth']= token
          axios(`${base_url}/Admin/users/signup`,{
            method : 'post',
            data : _body,
            headers: {'Content-Type' : 'application/json;charset=UTF-8',
                       "Access-Control-Allow-Origin" : "*" ,
                       'Accept' : 'application/json'
                      }
          })
          .then((user : any) =>  {
                                  console.log(chalk.green.bold("\nNew User Added\n"))
                                  //console.log(user.data)
                                  let str = JSON.stringify(user.data)
                                  api_key = str.slice(12,26)
                                  console.log(chalk.blue.bold("API Key: "+api_key))


                                })
          .catch((err : any)  => {

            console.log(err+ chalk.red( "\nTry again please"))
          })
        }

        // User Status

        else if (`${flags.userstatus}`!== 'undefined'){
          var _userstatus =`${flags.userstatus}`
          var token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
          axios.defaults.headers.common['X-Observatory-Auth']= token
                axios({
                      method: 'get',
                      url :`${base_url}/Admin/users/${flags.userstatus}`,
                      //params: _params


                    })
                      .then(( user : any ) => {
                        console.log(chalk.blueBright("\n"+_userstatus + " User Status\n"))
                        console.log(user.data)
                      })
                      .catch((err : any) => {
                        //console.log(err)
                        if(err.response.status== 401){
                          console.error(chalk.red.bold("401 : Admin Priviliges Required") )
                          process.exit(0)
                          }
                          else if (err.response.status ==403){
                        console.error(chalk.red.bold("403: No User Found ") )
                       } })
            }
    }
    // DATASET QUERRIES

    else if (`${args.SCOPE}`!= 'AggregatedGenerationPerType') {
      if ((`${flags.productiontype}`!= null) &&(`${flags.productiontype}`!= 'AllTypes')){
        console.log(chalk.red("You can't use production type with this Dataset,try again"))
        process.exit(0)
      }
      var token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
      axios.defaults.headers.common['X-Observatory-Auth']= token
      var dataset = `${args.SCOPE}`
      var areaName = `${flags.area}`
      var Resolution = `${flags.timeres}`
      var _date= `${flags.date}`
      var apikey = `${flags.apikey}`
      var format = `${flags.format}`
      var count = (_date.match(/-/g)||[]).length
      if (count== 2) {
        let _url : String = `${base_url}/${dataset}/${areaName}/${Resolution}/date/${_date}`
        axios.get(_url,{params : {format: format, api_key : apikey}})
        .then(( response : any ) => {
          console.log(response.data)
        })
        .catch((err : any) => {

          if(err.response.status== 403){
            console.log(chalk.red.bold('No data found,please try again'))
            process.exit(0)
            }
            else if(err.response.status == 401){

          console.log(chalk.red.bold(`Not Authorized : Invalid Api Key\n`))
          console.log(chalk.cyan.bold('To use the CLI first login then use the api_key given to you'))
            }else if(err.response.status == 402){
              console.log(chalk.red.bold(`Error 402 : Out of quota `))
              console.log(chalk.blue.bold('Please Logout :) '))
            }
        })
      }else if (count == 1){

      let _url : String = `${base_url}/${dataset}/${areaName}/${Resolution}/month/${_date}?`
      axios.get(_url,{params : {format : format ,api_key : apikey}})
           .then(( response : any ) => {
            console.log(response.data)
          })
      .catch((err : any) => {
        if(err.response.status== 403){
          console.log(chalk.red.bold('No data found,please try again'))
          process.exit(0)
          }
        console.log(chalk.red.bold(`Invalid Api Key\n`))
        console.log(chalk.cyan('To use the CLI first login then use the api_key given to you'))})
      }else {
      let _url : String = `${base_url}/${dataset}/${areaName}/${Resolution}/year/${_date}`
      axios.get(_url,{params : { format : format ,api_key : apikey}})
      .then(( response : any ) => {
        console.log(response.data)

      }).catch((err : any) => {
        if(err.response.status== 403){
          console.log(chalk.red.bold('No data found,please try again'))
          process.exit(0)
          }
        console.log(chalk.red.bold(`Something went wrong\n`))
        console.log(chalk.cyan('To use the CLI first login then use the api_key given to you,make sure you keep the format!'))})
    }
    // PER TYPE ONLY
  }else {
    var token=fs.readFileSync('/home/xsrm/softeng19bAPI.token','utf-8')
    axios.defaults.headers.common['X-Observatory-Auth']= token
    var dataset = `${args.SCOPE}`,
        areaName = `${flags.area}`,
        Resolution = `${flags.timeres}`,
        _date= `${flags.date}`,
        apikey = `${flags.apikey}`,
        format = `${flags.format}`,
        prod_type = `${flags.productiontype}`

    var count = (_date.match(/-/g)||[]).length
    if (count== 2) {
      let _url : String = `${base_url}/${dataset}/${areaName}/${prod_type}/${Resolution}/date/${_date}`
      axios.get(_url,{params : {format: format, api_key : apikey}})
      .then(( response : any ) => {
        console.log(response.data)
      })
      .catch((err : any) => {
        if(err.response.status == 403){
          console.log(chalk.red.bold('No data found,please try again'))
          process.exit(0)
        }else if(err.response.status == 401){
          console.log(chalk.red.bold(`Invalid Api Key\nAnauthorized Access `))}
          console.log(chalk.cyan.bold('To use the CLI first login then use the Api Key given to you'))
        })
    }else if (count == 1){

    let _url : String = `${base_url}/${dataset}/${areaName}/${prod_type}/${Resolution}/month/${_date}`
    axios.get(_url,{params : {format : format ,api_key : apikey}})
         .then(( response : any ) => {
          console.log(response.data)
        })
    .catch((err : any) => {
      if(err.response.status== 403){
        console.log(chalk.red.bold('No data found,please try again'))
        process.exit(0)
        }
        console.log(err)
      console.log(chalk.red.bold(`Invalid Api Key\n`))
      console.log(chalk.cyan('To use the CLI first login then use the api_key given to you'))})
    }else {
    let _url : String = `${base_url}/${dataset}/${areaName}/${prod_type}/${Resolution}/year/${_date}`
    axios.get(_url,{params : { format : format ,api_key : apikey}})
    .then(( response : any ) => {
      console.log(response.data)

    }).catch((err : any) => {
      if(err.response.status== 403){
        console.log(chalk.red.bold('No data found,please try again'))
        process.exit(0)
      }
      console.log(chalk.red.bold(`Something went wrong\n`))
      console.log(chalk.cyan('To use the CLI first login then use the api_key given to you,make sure you keep the format!'))})
  }

  }
  }
}

export = EnergyGroup012
