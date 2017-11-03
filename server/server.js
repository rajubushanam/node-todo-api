var {mongoose} = require('./db/mongoose');

var newUser = new User({
  userName: 'rajubushanam',
  email: ' srirajubushanam@gmail.com '
});

var newUser1 = new User({
  userName: 'rajubushanam123'
});

newUser.save().then((doc) => {
  console.log('Saved', doc);
}, (e) => {
  console.log(e);
});

newUser1.save().then((doc) => {
  console.log('Saved', doc);
}, (e) => {
  console.log(e);
});

var newTodo = new Todo({
  text: 'Eat Dinner'
});

var newTodo1 = new Todo({
  text: 'Coding',
  completed: true,
  completedAt: 123
});

newTodo.save().then((doc) => {
  console.log('Saved', doc);
}, (err) => {
  console.log('Unable to save', err);
});

newTodo1.save().then((doc) => {
  console.log('Saved', doc);
}, (err) => {
  console.log('Unable to save', err);
});
