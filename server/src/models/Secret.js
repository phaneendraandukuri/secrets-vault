const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const secretSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    set: function (password) {
      return encrypt(password);
    },
    get: function (password) {
      return decrypt(password);
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

module.exports = mongoose.model('Secret', secretSchema);