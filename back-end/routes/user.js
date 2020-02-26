const express       = require("express");
const router        = express.Router();
const admin_auth    = require('../auth/admin_auth')
const UserController = require('../controllers/user');
const checkAuth      = require('../auth/user_auth');
const app            = express()

// Admin Priviliges

// newuser
router.post('*/users',admin_auth, UserController.user_signup);
// userstatus
router.get("*/users/:userId",admin_auth, UserController.find_user)
// moduser
router.put("*/users/:userId",admin_auth, UserController.user_put);
// newdata
router.post('*/:collection',admin_auth,UserController.add_csv)

module.exports = router;