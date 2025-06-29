// backend/server.js
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const { connectToDB } = require("./db");

app.use(cors({
  origin: 'http://localhost:5173', // or the port your React app runs on
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB first
connectToDB().then(() => {
  console.log("Connected to MongoDB");

  // Basic route
  app.get('/', (req, res) => {
    res.send('Hello from Express backend!');
  });

  app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from the nd!!!!!' });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


