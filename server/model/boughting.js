const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boughtingSchema = new Schema({
  userId: String,
  cart: [],
  date: { type: Date, default: Date.now }
});

const Boughting = mongoose.model("boughting", boughtingSchema);

module.exports = Boughting;
