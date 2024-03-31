const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Client'); // Adjust the path as per your project structure

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const dbURI = "mongodb+srv://meyrushan29:Bookmari20.M@olms.motagl0.mongodb.net/Client";

// Connect to MongoDB
mongoose.connect(dbURI);

// Event handlers for MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Example route
app.post('/createClient', (req, res) => {
    UserModel.create(req.body)
    .then(clients => res.json(clients))
    .catch(err => res.json(err))
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
