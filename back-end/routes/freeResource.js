const express       = require("express");
const router        = express.Router();
const UserController = require('../controllers/user');
const checkAuth      = require('../auth/user_auth');
const app            = express()

router.post(`*/login`, UserController.user_login)

router.post(`*/logout`, UserController.user_logout);

router.get(`*/HealthCheck`, (req,res) => {
    if (db == 'undefined') res.status(500).send()
    if (db.namespace == 'energy' || db.namespace == 'energyTest') res.status(200).json({status : 'ok'})
})  

router.post (`*/Reset`,(req,res) => {

    db.collection('users').remove({username :{$ne : 'admin'}})
    db.collection('ActualTotalLoad').drop()
    db.collection('DayAheadTotalLoadForecast').drop()
    db.collection('MapCode').drop()
    db.collection('ResolutionCode').drop()
    db.collection('ProductionType').drop()
    db.collection('AllocatedEICDetail').drop()
    db.collection('AggregatedGenerationPerType').drop()
   
    return res.status(200).json({'status': 'ok'}) 
})

module.exports = router;