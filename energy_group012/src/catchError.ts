const chalk = require ('chalk')

export function catchError(err : any){

  if (err.response == 'undefined') {
    console.error('Check Server')
    process.exit(-1)
  }

  let status = err.response.status

  if( status == 500 ){
    console.error(chalk.red('Error 500 : Internal server error'))
    process.exit(500)
  }

  if( status == 403  ){
    console.error(chalk.red('Error 403 : No data found'))
    process.exit(403)
  }

  if( status == 402 ){
    console.error(chalk.red(`Error 402 : Out of quota`))
    console.log(chalk.cyan('Please Logout'))
    process.exit(402)
  }

  if( status == 401  ){
    console.error(chalk.red(`Error 401 : Authorization Failed`))
    process.exit(401)
  }

  if( status == 400 ){
    console.error(chalk.red(`Error 400 : Bad Request`))
    process.exit(400)
  }
}
