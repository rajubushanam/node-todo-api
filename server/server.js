const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');
require('./config/config');



var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });


  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    console.log('Error with reading data', e);
  })
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
if(ObjectID.isValid(id))
{
  Todo.findById(id).then((todo) => {
    if(!todo)
      return res.status(404).send();
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
}
else {
  return res.status(404).send();
}
}, () => {
  console.log('Error in reading the data by ID');
});

app.delete('/todos/:id', (req, res) => {
  var id =req.params.id;
  if(ObjectID.isValid(id))
  {
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo)
        return res.status(404).send();
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  }
  else {
      return res.status(404).send();
    }
});

app.patch('/todos/:id', (req, res) => {
  var id =req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new : true}).then((todo) => {
    if(!todo)
     return res.status(404).send();
     res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['userName', 'email', 'password']);
  console.log(body);
  var user = new User(body);
  user.save().then((user) => {
    return user.genAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  })
  .catch((e) => {
    res.status(400).send(e);
    console.log('Error in Creating user', e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);


  User.getUserByCredentials(body.email, body.password).then((user) => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send();
  });
  //res.send(body);
  // var user = getUserByToken(req.header('x-auth'));
  // if(user != null){
  //   res.send(user);
  // }
});

app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
