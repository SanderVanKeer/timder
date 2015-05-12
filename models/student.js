var mongoose = require('mongoose');

module.exports = mongoose.model('Student',{
  email: String,
  password: String
});