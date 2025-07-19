const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ quiet: true });
const authRoutes = require('./routes/auth.js');
const auth = require('./middleware/auth.js');
const secretRoutes = require('./routes/secrets');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/secrets-vault';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/secrets', auth, secretRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});