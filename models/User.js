const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Please enter your username"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
   },
   {
      timestamps: true
   }
);

const User = mongoose.model('User', userSchema)

module.exports = User;