const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String, // Change the type to String to store the username
    required: true,
  },
},
{
   timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;