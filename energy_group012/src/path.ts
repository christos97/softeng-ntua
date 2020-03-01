const fs = require('fs');
const resolve = require('path').resolve

export function sslPath () {
  const client_cert = fs.readFileSync(resolve(__dirname,'.././SSL/ca-crt.pem'),'utf-8' )
  return client_cert
}

export function readToken () {
  const token = fs.readFileSync(resolve(__dirname,'.././softeng19bAPI.token'),'utf-8' )
  return token
}

export function deleteToken () {
  fs.writeFileSync(resolve(__dirname,'.././softeng19bAPI.token'),'','utf-8' )
}
