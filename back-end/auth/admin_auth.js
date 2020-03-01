const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials')

module.exports =  (req, res, next) => {
    const token =  req.headers['x-observatory-auth'];
    //console.log("server TOKEN \n", token)
    if(token == 'undefined') return res.status(401).json({
        message : "No token passed"
    })
    const decoded =  jwt.verify(token, credentials.secret);
    if( decoded.username!= credentials.admin_user.username ){ 
        return res.status(401).json({
            message: 'Admin Priviliges Required' })
        }
    next();
};    

