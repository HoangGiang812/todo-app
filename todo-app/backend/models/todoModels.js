const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);