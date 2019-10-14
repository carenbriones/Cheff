var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Tells passport that we want to use a Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },

    // Function runs when the user tries to sign in
    function(email, password, done) {
      db.Chef.findOne({
        where: {
          email: email
        }
      }).then(function(dbChef) {
        // If there's no user with the given email
        if (!dbChef) {
          return done(null, false, {
            message: "Incorrect email."
          });
          // If there is user with given email, but the password the user gives is incorrect
        } else if (!dbChef.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }

        // If none of the above, return user
        return done(null, dbChef);
      });
    }
  )
);

// Sequelize needs to serialize and deserialize user
// To keep authentication state across HTTP requests
passport.serializeUser(function(chef, cb) {
  cb(null, chef);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
