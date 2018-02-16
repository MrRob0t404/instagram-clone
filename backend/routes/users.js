let db = require("../db/queries");
var express = require("express");
var router = express.Router();


const { loginRequired } = require("../auth/helpers");

router.post("/new", db.registerUser);
router.post("/login", db.loginUser);
router.post("/follow/:username", loginRequired, db.follow);
router.post("/like/test", loginRequired, db.likePost);
router.post("/comment/it", loginRequired, db.comment);
router.post("/postImage", loginRequired, db.postImage);
router.post("/get/comments", loginRequired, db.getAllComments);

router.get("/logout", loginRequired, db.logoutUser);
router.get("/:username/posts", loginRequired, db.getAllPictures);
router.get("/followers", loginRequired, db.getAllFollowers);
router.get("/followees", loginRequired, db.getAllFollowees);
router.get("/:username", loginRequired, db.getSingleUser);
router.get("/", loginRequired, db.getAllImages);
router.get("/:username", db.getSingleUserNoPassword);
router.get("/feeds/all", loginRequired, db.getAllFeeds);
router.post("/get/likes", loginRequired, db.getAllLikes);
module.exports = router;
