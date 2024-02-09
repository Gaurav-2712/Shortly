const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

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

  userSchema.pre("save",async function(next){
      if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password,10);
      }
      next();
  })

  const User = mongoose.model('User', userSchema);



  module.exports = User;