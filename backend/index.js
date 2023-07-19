const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const dbName = 'dashboard';

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"]
}))

// Connect to MongoDB
const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@hypecluster.wqd70l2.mongodb.net/?retryWrites=true&w=majority&ssl=true`, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function connect() {
  try {
    await client.connect();
    console.log('Database in orbit');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();

// Routes
app.post('/api/register', async (req, res) => {
    console.log('axios post reached backend')
    try {
		// Retrieve the user input from the request body
		const { username, password, email } = req.body;
  
		// Validate email format using regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
		  return res.status(400).json({ error: 'Invalid email format' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Perform server-side validation
		if (!username || !password || !email) {
			// If any required field is missing, respond with a validation error
			return res.status(400).json({ error: 'All fields are required' });
		}
  
      // Check if the username or email already exists in the database
      const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(409).json({ error: 'Username or email already exists' });
      }
  
      // If all validation checks pass, proceed with user registration
      // Insert the user data into the database or perform any other necessary registration logic
      try {
        const newUser = {
          username: username,
          password: hashedPassword,
          email: email
        };

        await db.collection('users').insertOne(newUser);
        res.json({ message: 'Registration successful' });
      } catch (error) {
        console.log(error)
      }

  
      // Save the new user to the database
    

      // Send a success response
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'An error occurred during registration' });
    }
  });
  
  app.post('/api/login', async (req, res) => {
	try {
	  const { username, password } = req.body;
  
	  // Retrieve the user data from the database based on the username
	  const user = await db.collection('users').findOne({ username });
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  // Compare the provided password with the hashed password stored in the user object
	  const isPasswordValid = await bcrypt.compare(password, user.password);
  
	  if (isPasswordValid) {
		// Passwords match, authentication successful
		const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
		return res.json({ message: 'Login successful', token });
	  } else {
		// Passwords do not match, authentication failed
		return res.status(401).json({ error: 'Invalid password' });
	  }
	} catch (error) {
	  console.error('Error during login:', error);
	  res.status(500).json({ error: 'An error occurred during login' });
	}
  });

  app.post('/api/logout', (req, res) => {
	try {
	  // Perform any necessary logout actions, such as invalidating the token or cleaning up session data
	  // ...
  
	  // Send a success response
	  res.json({ message: 'Logout successful' });
	} catch (error) {
	  console.error('Error during logout:', error);
	  res.status(500).json({ error: 'An error occurred during logout' });
	}
  });
  
  
// app.post('/users', async (req, res) => {
//   try {
//     const newUser = req.body;
//     
//     res.status(201).json(result.ops[0]);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'An error occurred while creating the user' });
//   }
// });

app.get('/api/protected-route', (req, res) => {
	try {
	  // Extract the token from the request header or other sources
	  const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the 'Authorization' header as 'Bearer <token>'
  
	  // Verify and decode the token
	  const decodedToken = jwt.verify(token, 'your-secret-key');
  
	  // Access the user data from the decoded token
	  const userId = decodedToken.userId;
	  const userRole = decodedToken.role;
  
	  // Perform actions for the protected route
	  // ...
  
	  res.json({ message: 'Protected route accessed successfully' });
	} catch (error) {
	  console.error('Error during verification:', error);
	  res.status(401).json({ error: 'Unauthorized' });
	}
  });

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
  console.log(`Ready for takeoff on port ${port}`);
});