var mongoose = require('mongoose');

module.exports = mongoose.model('Student',{
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  work1: String,
  work2: String, 
  work3: String,
  skill: String
});