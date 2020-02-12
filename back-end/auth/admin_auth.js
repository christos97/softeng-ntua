const jwt = require('jsonwebtoken');
const credentials = require('../config/credentials')

module.exports = (req, res, next) => {
    try {
        const token =  req.headers['x-observatory-auth'];
        const decoded = jwt.verify(token, credentials.secret);
        req.userData = decoded;
        //console.log(req.query.api_key)
        if(  req.userData.username!= credentials.admin_user.username ){ 
            return res.status(401).json({
                401: 'Auth failed',
                Details: 'Admin Priviliges Required' })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Admin Only'
        });
    }
};    

