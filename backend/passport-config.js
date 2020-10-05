const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

// require database for searching through database
const { User } = require('./database');

module.exports = function initialize(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        // if an error occur
        if (err) return done(err);

        // if no user is found
        if (!user) return done(null, false, { message: 'This email is not registered' });

        // user found
        if (bcrypt.compareSync(password, user.password)) return done(null, user);
        // if password is incorrect
        else return done(null, false, { message: 'Password incorrect' });
      });
    })
  );

  passport.serializeUser((user, done) => {
    // the MongoDB has a unique attribute called "_id". This is used for all the users ID
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
