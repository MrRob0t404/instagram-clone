let db = require("../db/queries");
var express = require("express");
var router = express.Router();


const { loginRequired } = require("../auth/helpers");

router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.get("/logout", loginRequired, db.logoutUser);

module.exports = router;
