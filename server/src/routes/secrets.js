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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const secret = await Secret.findById(id);

    if (!secret) {
      return res.status(404).json({
        message: 'Secret not found'
      });
    }

    res.json({
      id: secret._id,
      title: secret.title,
      password: secret.password,
      createdAt: secret.createdAt,
      updatedAt: secret.updatedAt
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching secret',
      error: error.message
    });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, password } = req.body;

    if (!title || !password) {
      return res.status(400).json({
        message: 'Title and password are required'
      });
    }


    const updatedSecret = await Secret.findByIdAndUpdate(
      id,
      {
        title,
        password,
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedSecret) {
      return res.status(404).json({
        message: 'Secret not found'
      });
    }

    res.json({
      message: 'Secret updated successfully',
      secret: {
        id: updatedSecret._id,
        title: updatedSecret.title,
        createdAt: updatedSecret.createdAt,
        updatedAt: updatedSecret.updatedAt
      }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error updating secret',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSecret = await Secret.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!deletedSecret) {
      return res.status(404).json({
        message: 'Secret not found'
      });
    }

    res.json({
      message: 'Secret deleted successfully',
      secret: {
        id: deletedSecret._id,
        title: deletedSecret.title,
        createdAt: deletedSecret.createdAt,
        deletedAt: new Date()
      }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error deleting secret',
      error: error.message
    });
  }
});

module.exports = router;