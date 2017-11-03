const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err)
  {
    return console.log('Error in Connecting to Mongo DB Server');
  }
  console.log('Connected to MongoDB Server');

db.collection('Users').insertOne({
  name: 'Raju',
  age: 28,
  location: 'Tampa'
}, (err, result) => {
  if(err)
  {
    console.log('Could not insert the collection');
  }
  console.log(JSON.stringify(result.ops, undefined, 2));
});

db.collection('Todos').insertOne({
  text: 'Test',
  completed: false
}, (err, result) => {
  if(err)
  {
    console.log('Could not insert the collection');
  }
  console.log(JSON.stringify(result.ops, undefined, 2));
});

  db.close();
});
