const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    userId: String,
    items: []
  },
  { versionKey: true }
)

const Order = mongoose.model('orders', orderSchema)

module.exports = Order
