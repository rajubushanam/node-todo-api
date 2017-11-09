var mongoose = require('mongoose');
var validator = require('validator');

var User = mongoose.model('Users', {
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{Value} is not a valid email'
    }
  },
  password: {
    required: true,
    type: String,
    minlength: 6
  },
  tokens: [{
    access: {

    },
    token: {

    }
  }]
});

module.exports = {User};
