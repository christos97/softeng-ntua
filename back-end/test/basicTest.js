//const app =require("../app")
process.env.NODE_ENV = 'development';

const credentials       =   require('../config/credentials')
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let User = require('../models/user');
let ActualTotalLoad = require('../models/ActualTotalLoadModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);


describe('/POST', () => {

    /**
     * No authentication
     */
    
    it('it should not add a user without authentication', (done) => {
        let user = {
          username: "user",
          email : "user@user.com",
          password: "user",
          quota : "10",
          api_key : "ABC1-DEF2-GHI3"
          
        };
        chai.request(server)
        .post('/energy/api/Admin/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
      })
    })
     /**
     * With authentication
     */

    it('it should add a user with  authentication', (done) => {
        let user = {
          username: "admin",
          password: "admin"
        };
        chai.request(server)
        .post('/energy/api/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.should.have.property('token');
          res.body.should.have.property('api_key')
          let token = JSON.stringify(res.body.token);
          let _token = token.replace(/"/g,'')
          let user1 = {
            username: "user",
            email: "user@user.com",
            password : "user",
            quota : 5
            
          };
          
          chai.request(server)
          .post('/energy/api/Admin/users/signup')
          .set('x-observatory-auth', _token)
          .send(user1)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('api_key');
            //res.body.should.have.property('token');
            //res.body.should.have.property('email').eql('user@user.com');
            done();
          });
        });
      });
    