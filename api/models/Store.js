const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  etalase: [{ type: String }],
});

module.exports = mongoose.model("Store", storeSchema);
