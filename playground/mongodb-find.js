const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err)
  {
    return console.log('Error in Connecting to Mongo DB Server');
  }
  console.log('Connected to MongoDB Server');

db.collection('Users').find({name: 'Bushanam'}).toArray().then((docs) => {
  console.log('Success');
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  console.log('Error in reading data', err);
});

  //db.close();
});
