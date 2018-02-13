let db = require("../db/queries");
var express = require("express");
var router = express.Router();


const { loginRequired } = require("../auth/helpers");

router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.post("/follow/:following_id", loginRequired, db.follow);
router.post("/like/:post_id", loginRequired, db.likePost);
router.post("/comment/:post_id", loginRequired, db.comment);
router.post("/postImage", loginRequired, db.postImage);

router.get("/logout", loginRequired, db.logoutUser);
router.get("/:id/posts", loginRequired, db.getAllPictures);
router.get("/followers", loginRequired, db.getAllFollowers);

module.exports = router;
