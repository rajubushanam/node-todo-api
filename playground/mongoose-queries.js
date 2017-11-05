const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '59f7f03cb2aee89263bb0cec';

User.findById(id).then((user) => {
  if(!user)
  {
    return console.log('Id not found');
  }
  console.log('User By ID', user);
}).catch((e) => {
  console.log(e);
});
