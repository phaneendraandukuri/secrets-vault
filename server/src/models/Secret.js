const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Secret', secretSchema);