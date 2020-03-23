const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  bDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  img: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  city: { type: String },
  zip: { type: String },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        size: { type: String, required: true },
        colour: { type: String, required: true },
        amount: { type: Number, required: true }
      }
    ]
  }
});

module.exports = mongoose.model("User", userSchema);
