var mongoose = require('mongoose');

module.exports = mongoose.model('Meet',{
  companyName: String,
  student1: String,
  student2: String,
  student3: String
});