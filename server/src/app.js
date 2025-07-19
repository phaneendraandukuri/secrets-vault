const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const auth = require('./middleware/auth.js');
const secretRoutes = require('./routes/secrets.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/secrets', auth, secretRoutes);

module.exports = app;