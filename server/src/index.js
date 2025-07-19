const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ quiet: true });

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets-vault';

const app = express(); 

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Secret Vault API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});