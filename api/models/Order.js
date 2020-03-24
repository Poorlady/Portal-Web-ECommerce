const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  order: {
    items: [
      {
        product: {
          type: Object,
          required: true
        },
        size: {
          type: String,
          required: true
        },
        colour: {
          type: String,
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        reviewed: {
          type: Boolean
        }
      }
    ]
  },
  orderDate: {
    type: Date,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
