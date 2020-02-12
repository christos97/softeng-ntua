const express       = require("express");
const router        = express.Router();
const admin_auth    = require('../auth/admin_auth')
const UserController = require('../controllers/user');
const checkAuth      = require('../auth/user_auth');
const app            = express()
//const quotas         = require('../config/Quotas')
//const rateLimit      = require("express-rate-limit");

// limit signup to 5 accounts per-hour for specific user
//app.use("/signup", rateLimit(quotas.limit_signup) );

router.post("/signup",admin_auth ,UserController.user_signup);
//router.post("/login",  UserController.user_login);
//router.post("/logout",  UserController.user_logout);
router.get("/:userId",admin_auth, UserController.find_user)
// only for admin
router.delete("/delete/:userId",admin_auth, UserController.user_delete );
router.patch("/patch/:userId",    UserController.user_patch  );

module.exports = router;