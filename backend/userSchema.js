const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  created: {
    type: Date,
    default: Date.now,
    required: [true, 'Created date is required'],
  },
});

module.exports = userSchema;
