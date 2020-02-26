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
let expect =chai.expect()
chai.use(chaiHttp);

let admin_token = ''

describe('Admin Use Cases', () => {
    
    it('it should log in admin', (done) => {
      let user = {
        username: "admin",
        password: "321nimda"
      };
      chai.request(server)
      .post('/energy/api/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        admin_token = res.body.token
        done();
      })
    })

    it('it should add a new user', (done) => {

          let user = {
            username: "user",
            email: "user@user.com",
            password : "user",
            quota : '5'
          };
          
          chai.request(server)
          .post('/energy/api/Admin/users/signup')
          .set('x-observatory-auth', admin_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
      it('it should return userstatus', (done) => {
          
          chai.request(server)
          .get(`/energy/api/Admin/users/userstatus/user`)
          .set('x-observatory-auth', admin_token)
          .send()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('username')
            res.body.should.have.property('email')
            res.body.should.have.property('quota')
            done();
          });
        })
      });
