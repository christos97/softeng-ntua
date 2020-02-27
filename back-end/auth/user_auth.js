const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials')
const User          = require("../models/user");
const fs = require ("fs")
module.exports = async (req, res, next) => {
    const token =  req.headers['x-observatory-auth'];
    const decoded = jwt.verify(token, credentials.secret);
    //if (decoded.username == 'admin') next()
    let limit
    try {
      const user = await User.findOne({username : decoded.username})
      if(!user) throw new Error  
      else 
      limit = fs.readFileSync('../back-end/config/limit.txt','utf-8')
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
            message: 'Anauthorized Resource'
        });
    }
};