process.env.NODE_ENV = 'development';
const chalk = require('chalk')
let User = require('../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

let user_token = ''

// User Activity --- Functionality and Unit Testing

describe(chalk.blue.bold('Verified User: Use Case Testing\n'), () => {
  
    // Login Existing User 
    
    it(chalk.cyan('Use Case 1:')+' Login user created (Admin use case 2) with modified password (Admin use case 4)', (done) => {
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
      
    describe(chalk.red.bold('\n    Deny access to restricted resources\n'), () => {
      
      it(chalk.red('Error: 401')+'  User should not create a new user', (done) => {

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
      
      
      it(chalk.red('Error: 401')+'  User should not GET userstatus', (done) => {
          
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
      
      
      it(chalk.red('Error: 401') + '  User should not modify an existing user', (done) => {
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
    })
    
      
    /*--------------------------------------------------------------------------------*/
    /*                     User Activity --- ACTUAL TOTAL LOAD                        */
    /*---------------------------------------------------------------- ---------------*/

      // GET DATE            
      it(chalk.cyan('Use Case 2 | 1.a:')+' GET /ActualTotalLoad/Austria/PT15M/date/2018-01-01', (done) => {
        chai.request(server)
        .get('/energy/api/ActualTotalLoad/Austria/PT15M/date/2018-01-01')
        .set('x-observatory-auth', user_token)
        .send()
        .end((err, res) => {
            res.should.exist
            res.should.have.status(200)
            res.body.should.not.be.null
            res.body.should.be.an('array')
            res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
            res.body[0].should.have.property('Dataset').that.is.a('string').equal('ActualTotalLoad')
            res.body[0].should.have.property('AreaName').that.is.a('string').equal('Austria')
            res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
            res.body[0].should.have.property('MapCode').that.is.a('string').equal('AT')
            res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
            res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
            res.body[0].should.have.property('Month').that.is.a('number').equal(1)
            res.body[0].should.have.property('Day').that.is.a('number').equal(1)
            res.body[0].should.have.property('DateTimeUTC').that.is.a('string')
            res.body[0].should.have.property('ActualTotalLoadValue').that.is.a('number')
            res.body[0].should.have.property('UpdateTimeUTC').that.is.a('string')
            done()
        })
    })

    
    console.log('\n')
/*---------------------------------------------------------------------------------------------------*/

// GET MONTH
    it(chalk.cyan('Use Case 2 | 1.b:')+' GET /ActualTotalLoad/Austria/PT15M/month/2018-01', (done) => {
      chai.request(server)
      .get('/energy/api/ActualTotalLoad/Austria/PT15M/month/2018-01')
      .set('x-observatory-auth', user_token)
      .send()
      .end((err, res) => {
          res.should.exist
          res.should.have.status(200)
          res.body.should.not.be.null
          res.body.should.be.an('array')
          res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
          res.body[0].should.have.property('Dataset').that.is.a('string').equal('ActualTotalLoad')
          res.body[0].should.have.property('AreaName').that.is.a('string').equal('Austria')
          res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
          res.body[0].should.have.property('MapCode').that.is.a('string').equal('AT')
          res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
          res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
          res.body[0].should.have.property('Month').that.is.a('number').equal(1)
          done()
      })
  })

 console.log('\n')
/*---------------------------------------------------------------------------------------------------*/


// GET YEAR
it(chalk.cyan('Use Case 2 | 1.c:')+' GET /ActualTotalLoad/Austria/PT15M/year/2018', (done) => {
  chai.request(server)
  .get('/energy/api/ActualTotalLoad/Austria/PT15M/year/2018')
  .set('x-observatory-auth', user_token)
  .send()
  .end((err, res) => {
      res.should.exist
      res.should.have.status(200)
      res.body.should.not.be.null
      res.body.should.be.an('array')
      res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
      res.body[0].should.have.property('Dataset').that.is.a('string').equal('ActualTotalLoad')
      res.body[0].should.have.property('AreaName').that.is.a('string').equal('Austria')
      res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
      res.body[0].should.have.property('MapCode').that.is.a('string').equal('AT')
      res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
      res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
      res.body[0].should.have.property('ActualTotalLoadByMonthValue').that.is.a('number')
      done()
  })
})

console.log('\n')
/*---------------------------------------------------------------------------------------------------*/
/*                   User Activity --- AGGREGATED GENERATION PER TYPE                                            */
/*---------------------------------------------------------------------------------------------------*/
        // GET DATE
    it(chalk.cyan('Use Case 2 | 2.a:')+' GET /AggregatedGenerationPerType/Netherlands/Solar/PT15M/date/2018-01-06', (done) => {
      chai.request(server)
      .get('/energy/api/AggregatedGenerationPerType/Netherlands/Solar/PT15M/date/2018-01-06')
      .set('x-observatory-auth', user_token)
      .send()
      .end((err, res) => {
          res.should.exist
          res.should.have.status(200)
          res.body.should.not.be.null
          res.body.should.be.an('array')
          res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
          res.body[0].should.have.property('Dataset').that.is.a('string').equal('AggregatedGenerationPerType')
          res.body[0].should.have.property('AreaName').that.is.a('string').equal('Netherlands')
          res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
          res.body[0].should.have.property('MapCode').that.is.a('string').equal('NL')
          res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
          res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
          res.body[0].should.have.property('Month').that.is.a('number').equal(1)
          res.body[0].should.have.property('Day').that.is.a('number').equal(6)
          res.body[0].should.have.property('ProductionType').that.is.a('string').equal('Solar')
          res.body[0].should.have.property('DateTimeUTC').that.is.a('string')
          res.body[0].should.have.property('ActualGenerationOutputValue').that.is.a('number')
          res.body[0].should.have.property('UpdateTimeUTC').that.is.a('string')
          done()
      })
  })


  console.log('\n')
/*---------------------------------------------------------------------------------------------------*/


  // GET MONTH    
  it(chalk.cyan('Use Case 2 | 2.b:')+' GET /AggregatedGenerationPerType/Netherlands/Solar/PT15M/month/2018-01', (done) => {
    chai.request(server)
    .get('/energy/api/AggregatedGenerationPerType/Netherlands/Solar/PT15M/month/2018-01')
    .set('x-observatory-auth', user_token)
    .send()
    .end((err, res) => {
        res.should.exist
        res.should.have.status(200)
        res.body.should.not.be.null
        res.body.should.be.an('array')
        res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
        res.body[0].should.have.property('Dataset').that.is.a('string').equal('AggregatedGenerationPerType')
        res.body[0].should.have.property('AreaName').that.is.a('string').equal('Netherlands')
        res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
        res.body[0].should.have.property('MapCode').that.is.a('string').equal('NL')
        res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
        res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
        res.body[0].should.have.property('Month').that.is.a('number').equal(1)
        res.body[0].should.have.property('ProductionType').that.is.a('string').equal('Solar')
        res.body[0].should.have.property('ActualGenerationOutputByDayValue').that.is.a('number')
        done()
    })
})

console.log('\n')
/*---------------------------------------------------------------------------------------------------*/

 // GET YEAR    
 it(chalk.cyan('Use Case 2 | 2.c:')+' GET /AggregatedGenerationPerType/Netherlands/Solar/PT15M/year/2018', (done) => {
  chai.request(server)
  .get('/energy/api/AggregatedGenerationPerType/Netherlands/Solar/PT15M/year/2018')
  .set('x-observatory-auth', user_token)
  .send()
  .end((err, res) => {
      res.should.exist
      res.should.have.status(200)
      res.body.should.not.be.null
      res.body.should.be.an('array')
      res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
      res.body[0].should.have.property('Dataset').that.is.a('string').equal('AggregatedGenerationPerType')
      res.body[0].should.have.property('AreaName').that.is.a('string').equal('Netherlands')
      res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
      res.body[0].should.have.property('MapCode').that.is.a('string').equal('NL')
      res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
      res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
      res.body[0].should.have.property('ProductionType').that.is.a('string').equal('Solar')
      res.body[0].should.have.property('ActualGenerationOutputByMonthValue').that.is.a('number')
      done()
  })
})

console.log('\n')


    /*--------------------------------------------------------------------------------*/
    /*                     User Activity --- Day Ahead Total Load Forecast            */
    /*--------------------------------------------------------------------------------*/

    // GET DATE
    it(chalk.cyan('Use Case 2 | 3.a:')+' GET /DayAheadTotalLoadForecast/Germany/PT15M/date/2018-01-04', (done) => {
      chai.request(server)
      .get('/energy/api/DayAheadTotalLoadForecast/Germany/PT15M/date/2018-01-04')
      .set('x-observatory-auth', user_token)
      .send()
      .end((err, res) => {
          res.should.exist
          res.should.have.status(200)
          res.body.should.not.be.null
          res.body.should.be.an('array')
          res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
          res.body[0].should.have.property('Dataset').that.is.a('string').equal('DayAheadTotalLoadForecast')
          res.body[0].should.have.property('AreaName').that.is.a('string').equal('Germany')
          res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
          res.body[0].should.have.property('MapCode').that.is.a('string').equal('DE')
          res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
          res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
          res.body[0].should.have.property('Month').that.is.a('number').equal(1)
          res.body[0].should.have.property('Day').that.is.a('number').equal(4)
          res.body[0].should.have.property('DateTimeUTC').that.is.a('string')
          res.body[0].should.have.property('DayAheadTotalLoadForecastValue').that.is.a('number')
          res.body[0].should.have.property('UpdateTimeUTC').that.is.a('string')
          done()
      })
  })

  console.log('\n')
/*---------------------------------------------------------------------------------------------------*/


  // GET MONTH
  it(chalk.cyan('Use Case 2 | 3.b:')+' GET /DayAheadTotalLoadForecast/Germany/PT15M/month/2018-01', (done) => {
    chai.request(server)
    .get('/energy/api/DayAheadTotalLoadForecast/Germany/PT15M/month/2018-01')
    .set('x-observatory-auth', user_token)
    .send()
    .end((err, res) => {
        res.should.exist
        res.should.have.status(200)
        res.body.should.not.be.null
        res.body.should.be.an('array')
        res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
        res.body[0].should.have.property('Dataset').that.is.a('string').equal('DayAheadTotalLoadForecast')
        res.body[0].should.have.property('AreaName').that.is.a('string').equal('Germany')
        res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
        res.body[0].should.have.property('MapCode').that.is.a('string').equal('DE')
        res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
        res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
        res.body[0].should.have.property('Month').that.is.a('number').equal(1)
        res.body[0].should.have.property('DayAheadTotalLoadForecastByDayValue').that.is.a('number')
        done()
    })
})

console.log('\n')
/*---------------------------------------------------------------------------------------------------*/


  // GET YEAR

it(chalk.cyan('Use Case 2 | 3.c:')+' GET /DayAheadTotalLoadForecast/Germany/PT15M/year/2018', (done) => {
    chai.request(server)
    .get('/energy/api/DayAheadTotalLoadForecast/Germany/PT15M/year/2018')
    .set('x-observatory-auth', user_token)
    .send()
    .end((err, res) => {
        res.should.exist
        res.should.have.status(200)
        res.body.should.not.be.null
        res.body.should.be.an('array')
        res.body[0].should.have.property('Source').that.is.a('string').equal('entso-e')
        res.body[0].should.have.property('Dataset').that.is.a('string').equal('DayAheadTotalLoadForecast')
        res.body[0].should.have.property('AreaName').that.is.a('string').equal('Germany')
        res.body[0].should.have.property('AreaTypeCode').that.is.a('string').equal('CTY')
        res.body[0].should.have.property('MapCode').that.is.a('string').equal('DE')
        res.body[0].should.have.property('ResolutionCode').that.is.a('string').equal('PT15M')
        res.body[0].should.have.property('Year').that.is.a('number').equal(2018)
        res.body[0].should.have.property('Month').that.is.a('number').equal(1)
        res.body[0].should.have.property('DayAheadTotalLoadForecastByMonthValue').that.is.a('number')
        done()
    })
})



    it(chalk.red('Error: 402') +'  Out of quota', (done) => {
      chai.request(server)
      .get('/energy/api/ActualTotalLoad/Austria/PT15M/date/2018-01-01')
        .set('x-observatory-auth', user_token)
        .send()
        .end((err, res) => {  
          res.should.exist
          res.should.have.status(402)
          res.body.should.not.be.null
          res.body.should.be.an('object')
          res.body.should.have.property('message').that.is.a('string').equal('Quota limit reached')
          done()
      })
    })
    console.log('\n')
    it(chalk.cyan('Use Case 3:')+' Logout user', (done) => {
      
      chai.request(server)
      .post(`/energy/api/logout`)
      .set('x-observatory-auth', user_token)
      .send()
      .end((err, res) => {
        res.should.exist
        res.should.have.status(200);
        res.body.should.be.empty
        done()
      })
    })

})

describe(chalk.white('\n  After logout...'), () => {


  it(chalk.white('it should check if quotas are updated'), (done) => {
  User.findOne({username: 'user'}).exec()
  .then(doc => {
    if (doc.quota == '0') done()
  })
})


describe(chalk.green('\n    Free Resources'), () => {
  
    it(chalk.white('HealthCheck'), (done) => {
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
  })
  
  after ( () => {User.findOneAndDelete( {username: 'user'}).exec().then()})
})