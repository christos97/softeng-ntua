/*---------------------------------------------------------------------------------------------------*/
/*                                  FRAMEWORKS + EXTERNAL FILES                                      */
/*---------------------------------------------------------------------------------------------------*/
const express           =   require('express');
const app               =   express();
const bodyParser        =   require('body-parser'); // Body parser supports url,json formats,makes data easier to handle
const MongoClient       =   require('mongodb').MongoClient
const assert            =   require('assert')
const credentials       =   require('./config/credentials')
const mongoose          =   require('mongoose')
const config = require("dotenv").config({path: '../back-end/config/.env'})
NODE_EXTRA_CA_CERTS='/home/xsrm/Desktop/softeng-ntua-master/back-end/SSL/ca-crt.pem'
const baseUrl = '/energy/api'

/*---------------------------------------------------------------------------------------------------*/
/*                   Production ---> energy db / Development ---> energyTest db                                              */
/*---------------------------------------------------------------------------------------------------*/

const link = credentials.database
let URI = ''

if (process.env.NODE_ENV === 'development'){
     URI  =    'mongodb+srv://' + link.username + ':'+link.password+
                    '@' + link.cluster+ process.env.TEST_DB_NAME + link.options
}
if(process.env.NODE_ENV === 'production'){
     URI  =    'mongodb+srv://' + link.username + ':'+link.password+
                    '@' + link.cluster+ process.env.DB_NAME + link.options
    //  URL   = 'mongodb://' + process.env.DB_USER+':'+process.env.DB_PASS + '@localhost:27017/energy'
}

//console.log(URI)
mongoose.connect(URI,credentials.mongoose_options)

db = null // -> global variable to hold the connection 

MongoClient.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true 
    }, 
        (err, client) => {
            if (err) throw err; 
            assert.equal(null, err)
            if(URI.search(`${process.env.TEST_DB_NAME}`)== -1){
                db = client.db(`${process.env.DB_NAME}`)
                console.log(`Connected to ${process.env.DB_NAME} database`) 
            }
            else {
                db = client.db(`${process.env.TEST_DB_NAME}`)
                console.log(`Connected to ${process.env.TEST_DB_NAME} database`)
            }
        }
    )



/*---------------------------------------------------------------------------------------------------*/
/*                                  APPLY TO ALL REQUESTS                                            */
/*---------------------------------------------------------------------------------------------------*/


app.use(bodyParser.urlencoded({limit: Infinity ,extended:true, parameterLimit: Infinity}));
app.use(bodyParser.json({limit : Infinity}));


/*---------------------------------------------------------------------------------------------------*/
/*                                  API ROUTERS                                                      */
/*---------------------------------------------------------------------------------------------------*/

const ActualTotalLoadRouter             = require('./routes/ActualTotalLoad');
const AggregatedGenerationPerTypeRouter = require('./routes/AggregatedGenerationPerType');
const DayAheadTotalLoadForecastRouter   = require('./routes/DayAheadTotalLoadForecast');
const ActualvsForecastRouter            = require('./routes/ActualvsForecast');
const AdminRouter                        = require('./routes/user')
const freeResourceRouter                = require('./routes/freeResource')

// Authorized Resources

app.use(`${baseUrl}/ActualTotalLoad` , ActualTotalLoadRouter);
app.use(`${baseUrl}/DayAheadTotalLoadForecast`,DayAheadTotalLoadForecastRouter);
app.use(`${baseUrl}/AggregatedGenerationPerType`,AggregatedGenerationPerTypeRouter);
app.use(`${baseUrl}/ActualvsForecast`,ActualvsForecastRouter);
app.use(`${baseUrl}/Admin`,AdminRouter);
app.use(`${baseUrl}`,freeResourceRouter);

//Free Resources

    
/*---------------------------------------------------------------------------------------------------*/
/*  if u reach this line,no router was able to handle the request,so we return an error message      */
/*---------------------------------------------------------------------------------------------------*/

app.use((req,res,)=>{
    res.status(400).json({
            "error 400": "Bad request xd",
            "message" : "could be SSL"

    })
});

module.exports = app;