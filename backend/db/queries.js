const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.status(500).send("error while trying to log in");
      } else if (!user) {
        res.status(401).send("invalid username/password");
      } else if (user) {
        req.logIn(user, function(err) {
          if (err) {
            res.status(500).send("error");
          } else {
            res.status(200).send(user);
          }
        });
      }
    })(req, res, next);
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function getAllPictures(req, res, next) {
  db.any("SELECT * FROM posts WHERE user_id=$1", req.params.id)
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function postImage(req, res, next) {
  return db.none(
    "INSERT INTO posts (user_id, post_descrip, img) VALUES (${user_id}, ${post_descrip}, ${img})",
    { user_id: req.user.user_id, post_descrip: req.body.post_descrip, img: req.body.img }
  )
}

function likePost(req, res, next) {
  return db.none(
    "INSERT INTO likes (post_id, user_id) VALUES (${post_id}, ${user_id})",
    { post_id: req.params.post_id, user_id: req.user.user_id }
  )
}

function comment(req, res, next) {
  return db.none(
    "INSERT INTO comments (post_id, user_id, comment) VALUES (${post_id}, ${user_id}, ${comment})",
    { post_id: req.params.post_id, user_id: req.user.user_id, comment: req.body.comment }
  )
}

function getAllFollowers(req, res, next) {
  db.any("SELECT following_id FROM following WHERE user_id=$1", req.user.user_id)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function registerUser(req, res, next) {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      res.status(500).json({
        status: "error",
        error: err,
      });
    });
}

function follow(req, res, next) {
  return db.none(
    "INSERT INTO following (user_id, following_id) VALUES (${user_id}, ${following_id})",
    { user_id: req.user.user_id, following_id: req.params.following_id }
  );
}

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  logoutUser: logoutUser,
  getAllPictures: getAllPictures,
  follow: follow,
  postImage: postImage,
  likePost: likePost,
  comment: comment,
  getAllFollowers: getAllFollowers
};
