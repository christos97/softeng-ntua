const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials')
const User          = require("../models/user");
const fs = require ("fs")
module.exports = (req, res, next) => {
    try {
        const token =  req.headers['x-observatory-auth'];
        const decoded = jwt.verify(token, credentials.secret);
        req.userData = decoded;
        //console.log(req.userData.quota)
        if(  req.userData.api_key!= req.query.api_key ){ 
            return res.status(401).json({
                401: 'Auth failed',
                Details: 'Provide a valid api key' })
        }
      let limit = fs.readFileSync('../back-end/config/limit.txt','utf-8')
      if (limit != ""){
        if (limit == '0') {
            return res.status(402).json({
                message : 'Quota limit reached'
            })
        }
        let q= parseInt(limit)
        fs.writeFileSync('../back-end/config/limit.txt',--q ,'utf-8')
      }
    next();
    } 
    catch (error) {
        return res.status(401).json({
            message: 'Auth ---failed'
        });
    }
};