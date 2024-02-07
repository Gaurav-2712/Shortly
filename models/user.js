const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // Reference to URLs shortened by the user
    shortenedUrls: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'url',
    }],
  },
  { timestamps: true }
  );

  const User = mongoose.model('User', userSchema);

  module.exports = User;