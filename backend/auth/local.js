const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/index");
const init = require("./passport");
const authHelpers = require("./helpers");

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    db
      .any("SELECT * FROM users WHERE username=$1", [username])
      .then(rows => {
        const user = rows[0];
        if (!user) {
          return done(null, false);
        }
        if (authHelpers.comparePass(password, user.password_digest)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        return done(err);
      });
  })
);

module.exports = passport;
