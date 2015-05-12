var LocalStrategy   = require('passport-local').Strategy;
var Student = require('../models/student');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true, // allows us to pass back the entire request to the callback
    usernameField: 'email',
    passwordField: 'password'
  },
  function(req, username, password, done) {

    findOrCreateStudent = function(){
      // find a user in Mongo with provided username
      Student.findOne({ email :  username }, function(err, user) {
        // In case of any error, return using the done method
        if (err)
        {
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user)
        {
          console.log('User already exists with username: '+username);
          return done(null, false, req.flash('message','User Already Exists'));
        }
        else
        {
          // if there is no user with that email
          // create the user
          var newStudent = new Student();

          // set the user's local credentials
          newStudent.email = req.param('email');
          newStudent.password = createHash(password);
          newStudent.firstName = req.param('firstName');
          newStudent.lastName = req.param('lastName');

          // save the user
          newStudent.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;  
            }
            console.log('User Registration succesful');
            return done(null, newStudent);
          });
        }
      });
    };
    
    // Delay the execution of findOrCreateUser and execute the method
    // in the next tick of the event loop
    process.nextTick(findOrCreateStudent);
  }));

  // Generates hash using bCrypt
  var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
}