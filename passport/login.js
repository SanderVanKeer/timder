var LocalStrategy   = require('passport-local').Strategy;
var Student = require('../models/student');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
  passport.use('login', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email',
    passwordField: 'password'
  },
  function(req, username, password, done) {
    Student.findOne({email: username}, function(err, user) {
      // error
      if(err) {
        return done(err);
      }

      // user does not exist
      if(!user) {
        console.log('user with email ' + username + ' not found.');
        return done(null, false, req.flash('message', 'User not found.'));
      }

      // user exists but wrong password
      if(!isValidPassword(user, password)) {
        console.log('Invalid password.');
        return done(null, false, req.flash('message', 'Invalid Password'));
      }

      // user exists and passwod is correct
      return done(null, user);
    });
  }));

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  }
}