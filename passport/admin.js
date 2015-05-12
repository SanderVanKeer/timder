var LocalStrategy   = require('passport-local').Strategy;
var Admin = require('../models/admin');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
  passport.use('admin', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    Admin.findOne({username: username}, function(err, user) {
      // error
      if(err) {
        return done(err);
      }

      // user does not exist
      if(!user) {
        console.log('admin with username ' + username + ' not found.');
        return done(null, false, req.flash('message', 'Admin not found.'));
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