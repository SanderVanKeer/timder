var mongoose = require('mongoose');

module.exports = mongoose.model('Meet',{
  companyName: String,
  student: Object,
});