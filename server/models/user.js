const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

var UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String
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

UserSchema.statics.getUserByToken = function(token) {
  var user = this;
  var decoded;
try{
  decoded = jwt.verify(token, 'abc123');
}
catch(e){return Promise.reject();}

  return user.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.getUserByCredentials = function(email, password) {
  var user = this;
  return user.findOne({email}).then((user) => {
    if(!user)
      return Promise.reject();

    return new Promise ((resolve, reject) => {
      bcryptjs.compare(password, user.password, (err, success) => {
        if(success)
           resolve(user);
        else {
        reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')){
    bcryptjs.genSalt(10, (err, salt) => {
      if(!err)
      {
      bcryptjs.hash(user.password, salt, (err, hash) => {
        if(!err)
        user.password = hash;
        next();
      });
    }
    else {

    }
    });
  }else {
    next();
  }
})

var User = mongoose.model('Users', UserSchema);

module.exports = {User};
