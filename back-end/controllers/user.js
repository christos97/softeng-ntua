const mongoose      = require("mongoose");
const bcrypt        = require("bcrypt");
const jwt           = require('jsonwebtoken');
const RandExp       = require('randexp'); 
const User          = require("../models/user");
const credentials   = require('../config/credentials')
const  isNullOrUndefined = require( 'util')
const fs = require('fs')
const csvtojson     =  require('csvtojson')


exports.add_csv = (req,res,next ) => {

  let collection  = db.collection(req.params.collection)
  let jsonArray = req.body
  let jsonChunks =[]
  
  while(jsonArray.length > 0){
    jsonChunks.push(jsonArray.splice(0,1500))  
  }
  
  // Bulk Onordered Insert
  for (let chunk in jsonChunks){
    collection.insertMany(jsonChunks[chunk],{ordered: false})
  } 
  
  return res.status(200).send()
}


exports.user_signup = (req, res, next) => {
  if(req.body.password>41 || req.body.password<5){
    return res.status(400).send("password should be between 4 and 40 characters")
  }
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        
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
                res.status(400).json({
                  message: 'Username exists'
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
  console.log(req.protocol)

  User.find({username : req.params.userId})
      .exec()
      .then(result => {
        let omfg = JSON.stringify(result)
        if (omfg!= '[]'){
          res.status(200).json({
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

exports.user_logout = (req, res ,next) => {
  
  const token =  req.headers['x-observatory-auth'];
  const decoded = jwt.verify(token, credentials.secret);
  let update_quota = fs.readFileSync('/home/xsrm/Desktop/softeng-ntua-master/back-end/config/limit.txt')
  fs.writeFileSync('../back-end/config/limit.txt','','utf-8')
  
  User.findOneAndUpdate({ 
    username: decoded.username 
  },
  {
    $set: {
      quota : update_quota
    }
  },
  {
    new: true
  },(err,doc) => {
      console.log(doc)
      if (err) res.status(400).send()
      else return res.status(200).send()
      })
    }



exports.user_put = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: "hash error"
      })
    }else {
      
    User.findOneAndUpdate({ 
      username: req.params.userId 
    },
    {
      $set: {
        email: req.body.email,
        quota : req.body.quota,
        password : hash
      }
    },
    {
      new: true
    },(err,doc) => {
        if (err) return res.status(403).send()
        else return res.status(200).send()
      })
    }
  })
}

