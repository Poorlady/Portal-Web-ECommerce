const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storeSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: String,
  desc: String,
  location: String,
  img: String,
  etalase: [String]
});

module.exports = mongoose.model("Store", storeSchema);
