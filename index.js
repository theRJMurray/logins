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

///////////
//ROUTES//
////////////
//REGISTER//
////////////
app.post('/api/register', async (req, res) => {
    try {
		const { username, password, email } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: 'Invalid email format' });
		}

		//TODO: DISPLAY THIS ON FRONTEND FOR USER

		const hashedPassword = await bcrypt.hash(password, 10);

		if (!username || !password || !email) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		//TODO: DISPLAY THIS ON FRONTEND FOR USER
  
		// Check if the username or email already exists in the database
		const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });

		if (existingUser) {
			return res.status(409).json({ error: 'Username or email already exists' });
		}

		//TODO: DISPLAY THIS ON FRONTEND FOR USER
  
      // If all validation checks pass, proceed with user registration
      // Insert the user data into the database
		try {
			const newUser = {
				username: username,
				password: hashedPassword,
				email: email
			};
			
			await db.collection('users').insertOne(newUser);
			res.json({ message: 'Registration successful' });
		} catch (error) {
			console.error(error)
		}
	} catch (error) {
		console.error('Error during registration:', error);
		res.status(500).json({ error: 'An error occurred during registration' });
	}
  });

/////////
//LOGIN//
/////////
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
		const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET);
		return res.json({ message: 'Login successful', token, user });
		} else {
		// Passwords do not match, authentication failed
		return res.status(401).json({ error: 'Invalid password' });
		}
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ error: 'An error occurred during login' });
	}
});

// Server-side route for fetching a user profile by username
app.get('/:username', async (req, res) => {
	try {
	  const { username } = req.params;
	  // Fetch the user's profile data from the database based on the username
	  const userProfile = await db.collection('users').findOne({ username });
  
	  if (userProfile) {
		res.json(userProfile);
	  } else {
		res.status(404).json({ error: 'User not found' });
	  }
	} catch (error) {
	  console.error('Error fetching user profile:', error);
	  res.status(500).json({ error: 'An error occurred while fetching user profile' });
	}
  });

///////////
//VERIFY//
/////////
app.post('/api/verify', async (req, res) => {
	try {
		const token = req.body.token; 
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const username = decodedToken.username;
		// const email = decodedToken.email;
		const user = await db.collection('users').findOne({ username }); // You can use 'email' instead if you prefer

		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json({ message: 'Protected route accessed successfully', username, email: user.email, bio: user.bio});
	} catch (error) {
		console.error('Error during verification:', error);
		res.status(401).json({ error: 'Unauthorized' });
	}
});
  
//////////////
//UPDATE BIO//
/////////////
app.post('/api/update-bio', async (req, res) => {
	try {
		const token = req.body.token; 
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const username = decodedToken.username;
		const { bio } = req.body;

		const updateResult = await db.collection('users').updateOne(
			{ username }, // Filter to find the user by their username
			{ $set: { bio } }, // Set the 'bio' field to the updated value
		);
  
		if (updateResult.modifiedCount === 1) {
			res.json({ message: 'Bio updated successfully', bio});
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		console.error('Error updating bio:', error);
		res.status(500).json({ error: 'An error occurred while updating bio' });
	}
  });

app.listen(port, () => {
  console.log(`Ready for takeoff on port ${port}`);
});