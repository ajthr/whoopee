// Import Packages
const mongoose = require('mongoose')

// Schema Definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 512,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema)
