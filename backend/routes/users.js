let db = require("../db/queries");
var express = require("express");
var router = express.Router();


const { loginRequired } = require("../auth/helpers");

router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.get("/logout", loginRequired, db.logoutUser);
router.get("/:id/posts", loginRequired, db.getAllPictures);
router.post("/follow/:following_id", loginRequired, db.follow);
module.exports = router;
