const express = require('express');
const router = express.Router();

const Secret = require('../models/Secret.js');

router.post('/', async (req, res) => {
  try {
    const { title, password } = req.body;

    if (!title || !password) {
      return res.status(400).json({
        message: 'Title and password are required'
      });
    }

    const secret = new Secret({
      title,
      password,
      userId: req.user.id
    });

    await secret.save();

    res.status(201).json({
      message: 'Secret created successfully',
      secret: {
        id: secret._id,
        title: secret.title,
        createdAt: secret.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error creating secret',
      error: error.message
    });
  }
});

module.exports = router;