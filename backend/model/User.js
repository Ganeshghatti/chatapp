const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  age: Number,
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
