const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  order: {
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
  },
  orderDate: { type: Date, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Order", orderSchema);
