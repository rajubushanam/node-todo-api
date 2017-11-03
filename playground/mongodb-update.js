const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err)
  {
    return console.log('Error in Connecting to Mongo DB Server');
  }
  console.log('Connected to MongoDB Server');

db.collection('Users').findOneAndUpdate({_id: new ObjectID('59f6860d09c9358bc39f2f7c')},
{
  $set:{name: 'Raj'},
  $inc:{age: 1}
},
{
  returnOriginal: false
}).then((result) => {
  console.log(result);
}, (err) => {
  console.log('Error in updating data', err);
});

// db.collection('Users').deleteOne({name: 'Raju'}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Error in deleting data');
// });
  //db.close();
});
