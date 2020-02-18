/*---------------------------------------------------------------------------------------------------*/
/*                                  FRAMEWORKS + EXTERNAL FILES                                      */
/*---------------------------------------------------------------------------------------------------*/
const express           =   require('express');
const app               =   express();
const bodyParser        =   require('body-parser'); // Body parser supports url,json formats,makes data easier to handle
const MongoClient       =   require('mongodb').MongoClient
const assert            =   require('assert')
const credentials       =   require('./config/credentials')
const cookieParser      =   require('cookie-parser')
const mongoose          =   require('mongoose')
const cors              =   require('cors')
const session           =   require('express-session')
const MongoStore        =   require('connect-mongo')(session);
const rateLimit         =   require("express-rate-limit");
const config = require("dotenv").config({path: '../back-end/config/.env'})

/*---------------------------------------------------------------------------------------------------*/
/*                                  CONNECT TO DB                                                    */
/*---------------------------------------------------------------------------------------------------*/

const link =   credentials.database
let URL =''
//console.log(process.env.TEST_DB_NAME)
if (process.env.NODE_ENV==='development'){
     URL  =    'mongodb+srv://' + link.username + ':'+link.password+
                    '@' + link.cluster+ process.env.TEST_DB_NAME + link.options
}
if(process.env.NODE_ENV==='production'){
     URL  =    'mongodb+srv://' + link.username + ':'+link.password+
                    '@' + link.cluster+ process.env.DB_NAME + link.options
}
//let _URL = toString(URL)
    mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true})

    db = null // -> global variable to hold the connection 

MongoClient.connect(URL, 
    {useNewUrlParser: true,useUnifiedTopology:true }, 
    function(err, client) {
                        if (err) throw err; 
                        //else console.log(`Connected to ${process.env.TEST_DB_NAME}`);
                        assert.equal(null, err)
                        if(URL.search(`${process.env.TEST_DB_NAME}`)== -1){
                            db = client.db(`${process.env.DB_NAME}`)
                            console.log(`Connected to ${process.env.DB_NAME}`) // once connected, assign the connection to the global variable
                        }
                        else {
                            db = client.db(`${process.env.TEST_DB_NAME}`)
                            console.log(`Connected to ${process.env.TEST_DB_NAME}`)
                        }
                })



/*---------------------------------------------------------------------------------------------------*/
/*                                  APPLY TO ALL REQUESTS                                            */
/*---------------------------------------------------------------------------------------------------*/




//  Add bodyParser middleware to parse POST request body
app.use(bodyParser.urlencoded({limit: '300mb' ,extended:true, parameterLimit: Infinity}));
app.use(bodyParser.json({limit : '300mb'}));
app.use(cors())
//app.use(bodyParser({limit : '50mb'}))
app.use(cookieParser());
app.use(session({
    ...credentials.session_options,
    store: new MongoStore({ mongooseConnection:mongoose.connection })
}));
//app.use( rateLimit({ ...credentials.limiter_all }) );   // limit requests : hourly + daily
//app.use( rateLimit({ ...credentials.limiter_all_daily }) );


/*---------------------------------------------------------------------------------------------------*/
/*                                  API ROUTERS                                                      */
/*---------------------------------------------------------------------------------------------------*/
const ActualTotalLoadRouter             = require('./routes/ActualTotalLoad');
const AggregatedGenerationPerTypeRouter = require('./routes/AggregatedGenerationPerType');
const DayAheadTotalLoadForecastRouter   = require('./routes/DayAheadTotalLoadForecast');
const ActualvsForecastRouter            = require('./routes/ActualvsForecast');
const UserRouter                        = require('./routes/user')
const UserController = require('./controllers/user');

app.use('/energy/api/ActualTotalLoad' , ActualTotalLoadRouter);
app.use('/energy/api/DayAheadTotalLoadForecast',DayAheadTotalLoadForecastRouter);
app.use('/energy/api/AggregatedGenerationPerType',AggregatedGenerationPerTypeRouter);
app.use('/energy/api/ActualvsForecast',ActualvsForecastRouter);
app.use('/energy/api/Admin/users',UserRouter);
app.post("/energy/api/logout",  UserController.user_logout);
app.post("/energy/api/login",  UserController.user_login);


/*---------------------------------------------------------------------------------------------------*/
/*  if u reach this line,no router was able to handle the request,so we return an error message      */
/*---------------------------------------------------------------------------------------------------*/
app.use((req,res,)=>{
    res.status(400).json({
            "error 400": "Bad request"
        
    })
});



module.exports = app;