const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema(
  {
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
  }
);

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.genAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc123');

  user.tokens.push({access, token});

return user.save().then(() => {
  return token;
});
};

var User = mongoose.model('Users', UserSchema);

module.exports = {User};
