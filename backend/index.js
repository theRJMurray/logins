const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;
// const url = process.env.MONGODB_URL;
const dbName = 'dashboard';

app.use(express.json(), cors())

// Connect to MongoDB
const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@hypecluster.wqd70l2.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users' });
  }
});

// app.post('/users', async (req, res) => {
//   try {
//     const newUser = req.body;
//     const result = await db.collection('users').insertOne(newUser);
//     res.status(201).json(result.ops[0]);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'An error occurred while creating the user' });
//   }
// });

//working route for creating a user
app.post('/users', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = { username, password };
  
      //database=dashboard, collection=users
      const result = await db.collection('users').insertOne(user);
    //   res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    }
  });
  

app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const result = await db.collection('users').updateOne({ _id: ObjectID(userId) }, { $set: updatedUser });
    res.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await db.collection('users').deleteOne({ _id: ObjectID(userId) });
    res.json(result);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});