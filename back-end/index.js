const https = require('https');
const app = require('./app');
const url = require ('url')
const delayedStream = require('delayed-stream')
var fs = require('fs');
const env =(process.env.NODE_ENV)?process.env.NODE_ENV:'production'
const port = (env === 'production')?8765:5000 
 
var options = { 
    key: fs.readFileSync('SSL/server-key.pem'), 
    cert: fs.readFileSync('SSL/server-crt.pem'), 
    ca: fs.readFileSync('SSL/ca-crt.pem'), 
}; 
let server =https.createServer(options,app).listen(port, () => {
    console.log(`Server is running for ${env} on port ${port}`)
});
