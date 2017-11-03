const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err)
  {
    return console.log('Error in Connecting to Mongo DB Server');
  }
  console.log('Connected to MongoDB Server');

db.collection('Users').deleteMany({name: 'Bushanam'}).then((result) => {
  console.log(result);
}, (err) => {
  console.log('Error in deleting data', err);
});

// db.collection('Users').deleteOne({name: 'Raju'}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Error in deleting data');
// });

db.collection('Users').findOneAndDelete({_id: new ObjectID('59f7cff1ef1d6ec0c825b475')}).then((result) => {
  console.log(result);
});
  //db.close();
});
