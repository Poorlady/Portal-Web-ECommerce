const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  img: String,
  fName: String,
  lName: String,
  bDate: Date,
  address: String,
  city: String,
  zip: Number,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
