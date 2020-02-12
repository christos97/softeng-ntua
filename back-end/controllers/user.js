const mongoose      = require("mongoose");
const bcrypt        = require("bcrypt");
const jwt           = require('jsonwebtoken');
const RandExp       = require('randexp'); 
const User          = require("../models/user");
const credentials   = require('../config/credentials')
const  isNullOrUndefined = require( 'util')
const fs = require('fs')


exports.user_signup = (req, res, next) => {
  if(req.body.password>41 || req.body.password<5){
    return res.status(400).send("password should be between 4 and 40 characters")
  }
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        //console.log('here1')
        return res.status(400).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: "something went wrong"
            });
          } else {
            let possible_key = new RandExp('[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}').gen()
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username : req.body.username,
              email: req.body.email,
              password: hash,
              api_key: possible_key,
              quota: req.body.quota
              
            });
            user
              .save()
              .then(result => {
                //console.log(result);
                res.status(200).json({
                  api_key : result.api_key
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed at username"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed at password"
          });
        }
        if (result) {
          let expiration
          // admin check
          if(req.body.email==credentials.admin_user.email){ 
              expiration="1000h",
              req.session.admin=true 
            }
          else{ expiration = "100h"}
         

          const token = jwt.sign(
            {
              username: user[0].username,
              email:    user[0].email,
              userId:   user[0]._id,
              api_key:  user[0].api_key,
              quota : user[0].quota
            },
            credentials.secret,
            {
              expiresIn: expiration
            }
          );
          //req.session.api_key = user[0].api_key
          fs.writeFileSync('../back-end/config/limit.txt',user[0].quota,'utf-8')
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            api_key:  user[0].api_key
          });
        }
        
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.find_user = (req ,res , next) => {
  User.find({username : req.params.userId})
      .exec()
      .then(result => {
        let omfg = JSON.stringify(result)
        if (omfg!= '[]'){
          res.status(200).json({
          //message : 'user found',
          username : result[0].username,
          email : result[0].email,
          api_key : result[0].api_key,
          quota : result[0].quota
        })
      }else return res.status(403).send()
      
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
}
exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.user_logout = (req, res ,next) => {
   fs.writeFileSync('/home/xsrm/Desktop/TL19-12-master/back-end/config/limit.txt','','utf-8')
   res.status(200).send()
  }



exports.user_patch = (req, res, next) => {
  User.find({ username: req.params.userId })
  .then(user => {
    if (user.length == 0 ) {
      return res.status(400).json({
        message: "User Does not exist"
      });
    }
    else {
      let email = req.body.email; // {last_name : "smith", age: 44}
      let username = req.body.userId;
      db.users.update({_id  : ObjectId(id)}, {$set: updateObject});
}
})}

/*

jwt-blacklist cannot be installed for unkown reason :(

exports.logout = (req,res,next) => {
      const token =  req.headers['x-observatory-auth'];
      jwtBlacklist.blacklist(token);
}
*/
