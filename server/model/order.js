const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: {},
  bought: []
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
