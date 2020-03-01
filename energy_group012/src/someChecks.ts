const chalk = require ('chalk')
const fs = require('fs');
const resolve = require('path').resolve
const axios = require ('axios')

export function isLoggedIn(){

  const token = fs.readFileSync(resolve(__dirname,'.././softeng19bAPI.token'),'utf-8' )
  if (token == ""){
    console.error(chalk.red('Please login first'))
    process.exit(0)
  }
  else return token
}

export function setHeader( token : any ){
  axios.defaults.headers.common['X-Observatory-Auth'] = token
}

export function checkRequiredFields( body : Object){
  let keys = Object.keys(body)
  let values = Object.values(body)
    for (let key in keys){
      if (values[key] === 'undefined'){
        console.error(chalk.red("Missing required field: "+keys[key]))
        process.exit(0)
      }
    }
}
export function checkDate(date : String   ) {

  function exit(){
    console.error(chalk.red('Wrong Date Format'))
    process.exit(0)
  }

  if (date.length < 4 && date.length != 0) exit()
  if (date.match(/[a-z]/i)) exit()
  let count = (date.match(/-/g)||[]).length
  if (count > 2) exit()
  if (date.length == 5 || date.length == 6 || date.length == 8 || date.length == 9 || date.length > 10 ) exit()
  if ((date.length == 4 && count!= 0 ) ) exit()
  if (date.length == 7 && count!= 1 ) exit()
  if (date.length == 10 && count!= 2 ) exit()

}

export function loginChecks(password : any){

  if (password.search(' ') >= 0){
    console.error(chalk.red.bold("Spaces are not allowed in password"))
    process.exit(0)
  }

}
