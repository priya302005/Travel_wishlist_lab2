const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory storage for wishlist entries
let wishlist = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API to get all wishlist entries
app.get('/api/wishlist', (req, res) => {
  res.json(wishlist);
});

// API to add a new entry
app.post('/api/wishlist', (req, res) => {
  const { currentLocation, destination, travelTime } = req.body;

  if (!currentLocation || !destination || !travelTime) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const entry = {
    currentLocation,
    destination,
    travelTime: Number(travelTime),
    addedAt: new Date()
  };

  wishlist.push(entry);
  res.status(201).json(entry);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
