var login = require('./login');
var signup = require('./signup');
// var admin = require('./admin')
var Student = require('../models/student');

module.exports = function(passport){
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    // if it's a student, user will have an email
    // if(user.email)
    // {
      Student.findById(id, function(err, user) {
        console.log('deserializing user: ',user);
        done(err, user);
      });
    // }

    // if its an admin, user will just have a username
    // if(user.username) {
      // Admin.find({username: user.username}, function(err, user) {
      //   console.log('deserializing user: ',user);
      //   done(err, user);
    //   });
    // }
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
  signup(passport);
  // admin(passport);
}