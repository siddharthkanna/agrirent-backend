const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, required: true, unique: true },
  photoURL: { type: String },
  mobileNumber: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
