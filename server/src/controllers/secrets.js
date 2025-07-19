const Secret = require('../models/Secret.js');

const addNewSecret = async (req, res) => {
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
}

const getAllSecretsByUser = async (req, res) => {
  try {
    const secrets = await Secret.find({ userId: req.user.id })
      .select('_id title password createdAt updatedAt')
      .sort({ createdAt: -1 });

    res.json({
      count: secrets.length,
      secrets: secrets.map(secret => ({
        id: secret._id,
        title: secret.title,
        password: secret.password,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt
      }))
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching secrets',
      error: error.message
    });
  }
}

const getSecretById = async (req, res) => {
  try {
    const { id } = req.params;

    const secret = await Secret.findOne({
      _id: id,
      userId: req.user.id
    });

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
}

const updateSecretById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, password } = req.body;

    if (!title || !password) {
      return res.status(400).json({
        message: 'Title and password are required'
      });
    }

    const updatedSecret = await Secret.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id
      },
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
}

const deleteSecretById = async (req, res) => {
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
}


module.exports = { addNewSecret, getAllSecretsByUser, getSecretById, updateSecretById, deleteSecretById }