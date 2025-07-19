const express = require('express');
require('dotenv').config({ quiet: true });

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Secret Vault API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});