const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

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
      console.log(err.detail);
      res.status(500).json({
        error: err,
        detail: err.detail
      });
    });
}

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
  console.log("kkkkk: ", req.user);
  db.any("SELECT post_id, post_descrip, img FROM posts INNER JOIN accounts ON(accounts.user_id=post.user_id) WHERE username=$1", req.params.username)
    .then(data => {
      console.log("all pictures");
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getAllImages(req, res, next) {
  console.log(req.user.username);
  db.any("SELECT post_id, post_descrip, img, username FROM posts INNER JOIN accounts ON(accounts.user_id=posts.user_id) WHERE username=$1", req.user.username)
    .then(data => {
      console.log(data);
      // console.log("test");
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
  console.log(req.body.post_id);
  return db.none(
    "INSERT INTO likes (post_id, user_id) VALUES (${post_id}, ${user_id})",
    {post_id: req.body.post_id, user_id: req.user.user_id}
  )
}

function comment(req, res, next) {
  console.log(req.body.post_id);
  console.log(req.body.comment);
  return db.none(
    "INSERT INTO comments (post_id, user_id, comment) VALUES (${post_id}, ${user_id}, ${comment})",
    { post_id: req.body.post_id, user_id: req.user.user_id, comment: req.body.comment }
  )
}

function getAllFollowers(req, res, next) {
  db.any("SELECT username FROM following WHERE user_id=$1", req.user.user_id)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getAllFollowees(req, res, next) {
  db.any("SELECT accounts.username FROM accounts INNER JOIN following ON(accounts.user_id=following.user_id) WHERE following.username=$1;", req.user.username)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function follow(req, res, next) {
  return db.none(
    "INSERT INTO following (user_id, username) VALUES (${user_id}, ${username})",
    { user_id: req.user.user_id, username: req.params.username }
  );
}

function getSingleUser(req, res, next) {
  db.any("SELECT user_id, username, email, bio FROM accounts WHERE username=$1", req.params.username)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getSingleUserNoPassword(req, res, next) {
  db.any("SELECT user_id, username, email, bio FROM accounts WHERE username=$1", req.params.username)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getAllFeeds(req, res, next) {
  db.any("SELECT post_descrip, posts.post_id, img, accounts.username, comment, likes_id FROM accounts INNER JOIN following ON(following.user_id=accounts.user_id) INNER JOIN posts ON(posts.user_id=following.user_id ) INNER JOIN comments ON(comments.post_id=posts.post_id)INNER JOIN likes ON(likes.post_id=posts.post_id) WHERE following.username=$1", req.user.username)
  // db.any("SELECT post_descrip, posts.post_id, img, accounts.username, comments FROM accounts INNER JOIN following ON(following.user_id=accounts.user_id) INNER JOIN posts ON(posts.user_id=following.user_id ) INNER JOIN comments ON(comments.post_id=posts.post_id)INNER JOIN likes ON(likes.post_id=posts.post_id) WHERE following.USERname='umed';")
  db.any("SELECT post_descrip, posts.post_id, img, USERname FROM posts INNER JOIN following ON(posts.user_id=following.user_id ) WHERE following.username=$1;", req.user.username)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  });
}

function getAllComments(req, res, next) {
  console.log(req.body.post_id);
  db.any("SELECT comment FROM comments WHERE post_id=$1", req.body.post_id)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  });
}

function getAllLikes(req, res, next) {
  console.log(req.body.post_id);
  db.any("SELECT likes_id FROM likes WHERE post_id=$1", req.body.post_id)
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  });
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
  getAllFollowers: getAllFollowers,
  getAllFollowees: getAllFollowees,
  getSingleUser: getSingleUser,
  getAllImages: getAllImages,
  getSingleUserNoPassword: getSingleUserNoPassword,
  getAllFeeds: getAllFeeds,
  getAllComments: getAllComments,
  getAllLikes: getAllLikes
};
