const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Date } }],
  },
  { timestamps: true }
);

const url = mongoose.model("url", urlSchema);

module.exports = url;
