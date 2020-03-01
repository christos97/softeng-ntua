const express           = require('express');
const router            = express.Router();
const controller        = require('../controllers/AggregatedGenerationPerTypeController')
const isLoggedIn        = require('../auth/user_auth')

//  2.a
router.get('/:_AreaName/:_ProductionType/:_Resolution/date/:_date_str',isLoggedIn, controller.GetDay )

//  2.b
router.get('/:_AreaName/:_ProductionType/:_Resolution/month/:_date_str',isLoggedIn, controller.GetMonth )

//  2.c
router.get('/:_AreaName/:_ProductionType/:_Resolution/year/:_Year',isLoggedIn, controller.GetYear )

module.exports = router;