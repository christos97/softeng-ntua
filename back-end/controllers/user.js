const mongoose      = require("mongoose");
const bcrypt        = require("bcrypt");
const jwt           = require('jsonwebtoken');
const RandExp       = require('randexp'); 
const User          = require("../models/user");
const credentials   = require('../config/credentials')
const fs            = require ('fs')

exports.user_signup = (req, res) => {
  if(req.body.password>41 || req.body.password<5){
    return res.status(400).send("password should be between 4 and 40 characters")
  }
  User.findOne({ $or: [{username: req.body.username}, {email :req.body.email}] })
    .exec()
    .then(user => {
        if(user) return res.status(400).json({
            message : 'Duplicate Credentials'
        })
        else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: "something went wrong"
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username : req.body.username,
              email: req.body.email,
              password: hash,
              quota: req.body.quota
              
            });
            user
              .save()
              .then(result => {
                res.status(200).send()
              })
              .catch(() => {
                res.status(400).json({
                  message: 'Username exists'
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res) => {
  User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user == null) return res.status(401).send()
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed at username"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed at password"
          });
        }
        if (result) {
         const token = jwt.sign(
            {
              username: user.username,
              email:    user.email,
              userId:   user._id,
              quota :   user.quota
            },
            credentials.secret,
          );

          fs.writeFileSync('../back-end/config/limit.txt',user.quota,'utf-8')
          return res.status(200).json({ token: token });
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

exports.find_user = (req ,res) => {

  User.findOne({username : req.params.userId})
      .exec()
      .then(result => {
      if(result){ 
        return res.status(200).json({
          username : result.username,
          email : result.email,
          quota : result.quota
        })
      } else return res.status(403).send()
    })
        .catch(err => {
        res.status(500).json({
          error: err
        });
      })
}

exports.user_logout = (req, res) => {
  const token =  req.headers['x-observatory-auth'];
  const decoded = jwt.verify(token, credentials.secret);
  let update_quota = fs.readFileSync('../back-end/config/limit.txt','utf-8')
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
      if (err) res.status(403).send()
      else return res.status(200).send()
    }
  )
}
  
exports.user_put = (req, res) => {
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
          if (doc == null) return res.status(403).send('Update Failed')
          else return res.status(200).send(doc)
        })
    }
  })
}

