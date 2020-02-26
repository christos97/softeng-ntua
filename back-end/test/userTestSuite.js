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
let expect =chai.expect()
chai.use(chaiHttp);

let user_token = ''

// User Activity --- Functionality and Unit Testing

describe('User Test Cases', () => {
    
    // Login Existing User  
    
    it('it should log in user created in previous test case', (done) => {
        let user = {
          username: "user",
          password: "moduser"
        };
        chai.request(server)
        .post('/energy/api/login')
        .send(user)
        .end((err, res) => {
          res.should.exist
          res.should.have.status(200);
          res.body.should.have.property('token').that.is.a('string')
          user_token = res.body.token
          done();
        })
      })
      it('it should not authorize user creation', (done) => {

        let user = {
          username: "test",
          email: "test@test.com",
          password : "test",
          quota : '5'
        };
        
        chai.request(server)
        .post('/energy/api/Admin/users')
        .set('x-observatory-auth', user_token)
        .send(user)
        .end((err, res) => {
          res.should.exist
          res.should.have.status(401);
          res.body.should.not.be.null
          res.body.should.be.an('object')
          res.body.should.have.property('message').that.is.a('string').equal('Admin Priviliges Required')
          done();
        });
      });
      it('it should not return userstatus', (done) => {
          
        chai.request(server)
        .get(`/energy/api/Admin/users/user`)
        .set('x-observatory-auth', user_token)
        .send()
        .end((err, res) => {
          res.should.exist
          res.should.have.status(401)
          res.body.should.not.be.null
          res.body.should.be.an('object')
          res.body.should.have.property('message').that.is.a('string').equal('Admin Priviliges Required')
          done();
        });
      })
      it('it should not modify an existing user', (done) => {
        let user = {
          email: "moduser@user.com",
          password : "moduser",
          quota : '10'
        };
        
        chai.request(server)
        .put(`/energy/api/Admin/users/user`)
        .set('x-observatory-auth', user_token)
        .send(user)
        .end((err, res) => {
            res.should.exist
            res.should.have.status(401)
            res.body.should.not.be.null
            res.body.should.be.an('object')
            res.body.should.have.property('message').that.is.a('string').equal('Admin Priviliges Required')
            done()
        })
      })
      
      it('it should check e2e connectivity', (done) => {
        
        chai.request(server)
        .get('/energy/api/HealthCheck')
        .send()
        .end((err, res) => {
            res.should.exist
            res.should.have.status(200)
            res.body.should.not.be.null
            res.body.should.be.an('object')
            res.body.should.have.property('status').equal('ok')
            done()
        })
    })

    //it('it should GET /ActualTotalLoad/Austria/PT15M/date/2018-01-01 | 1.a.', (done) => {
      //  chai.request(server)
        //.get('/energy/api/ActualTotalLoad/Austria/PT15M/date/2018-01-01')
        //.set('x-observatory-auth', user_token)
        //.send()
        //.end((err, res) => {
          //  res.should.exist
            //res.should.have.status(200)
            //res.body.should.not.be.null
            
        //})
    //})
      
      after(() => User.findOneAndDelete({username: 'user'}).exec().then())
    })  