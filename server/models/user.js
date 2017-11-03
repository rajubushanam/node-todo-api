var mongoose = require('mongoose');

var User = mongoose.model('Users', {
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {User};
