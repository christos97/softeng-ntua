process.env.NODE_ENV = 'development';
const chalk = require('chalk')
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

let admin_token = ''

// Admin Activity --- Functionality and Unit Testing

describe(chalk.blue.bold('Admin: Use Case Testing\n'), () => {
      
  before(() => User.findOneAndDelete({username: 'user'}).exec().then())

  // Login Admin

  it(chalk.cyan('Use Case 1:') + '  Login admin', (done) => {
      let user = {
        username: "admin",
        password: "321nimda"
      };
      chai.request(server)
      .post('/energy/api/login')
      .send(user)
      .end((err, res) => {
        res.should.exist
        res.should.have.status(200);
        res.body.should.have.property('token').that.is.a('string')
        admin_token = res.body.token
        done();
      })
    })

// Create new user
        
        it(chalk.cyan('Use Case 2:') + '  Create user without admin priviliges', (done) => {

          let user = {
            username: "user",
            email: "user@user.com",
            password : "user",
            quota : '5'
          };
          
          chai.request(server)
          .post('/energy/api/Admin/users')
          .set('x-observatory-auth', admin_token)
          .send(user)
          .end((err, res) => {
            res.should.exist
            res.should.have.status(200);
            res.body.should.be.empty
            done();
          });
        });

    it(chalk.red('Error: 400') + '   Should not create user with duplicate credentials', (done) => {

      let user = {
        username: "user",
        email: "user@user.com",
        password : "user",
        quota : '5'
      };
      
      chai.request(server)
      .post('/energy/api/Admin/users')
      .set('x-observatory-auth', admin_token)
      .send(user)
      .end((err, res) => {
        res.should.exist
        res.should.have.status(400);
        res.body.should.have.property("message").equals('Username exists')
        done();
      });
    });
      // Get UserStatus

      it(chalk.cyan('Use Case 3:') + '  GET userstatus', (done) => {
          
          chai.request(server)
          .get(`/energy/api/Admin/users/user`)
          .set('x-observatory-auth', admin_token)
          .send()
          .end((err, res) => {
            res.should.exist
            res.should.have.status(200);
            res.body.should.not.be.null
            res.body.should.be.an('object');
            res.body.should.have
              .property('username').that.is.a('string')
              .equal('user')
            res.body.should.have
              .property('email').that.is.a('string')
              .equal('user@user.com')
            res.body.should.have
              .property('quota').that.is.a('string')
              .equal('5')
            done();
          });
        })
        // Modify User

        it(chalk.cyan('Use Case 4:') + '  Modify user credentials & Set quota = 1', (done) => {
          let user = { 
            email: "moduser@user.com",
            password : "moduser",
            quota : '1'
          };
          
          chai.request(server)
          .put(`/energy/api/Admin/users/user`)
          .set('x-observatory-auth', admin_token)
          .send(user)
          .end((err, res) => {
            res.should.exist
            res.should.have.status(200);
            res.body.should.not.be.null
            res.body.should.be.an('object');
            res.body.should.have
              .property('email').that.is.a('string')
              .equal('moduser@user.com')
            res.body.should.have
              .property('password').that.is.a('string')
            res.body.should.have
              .property('quota').that.is.a('string')
              .equal('1')
            done()
          })
        })
      
      // Logout Admin

      it(chalk.cyan('Use Case 5:') + '  Logout admin', (done) => {
          chai.request(server)
          .post(`/energy/api/logout`)
          .set('x-observatory-auth', admin_token)
          .send()
          .end((err, res) => {
            res.should.exist
            res.should.have.status(200);
            res.body.should.be.empty
            done()
          })
        })
      });
