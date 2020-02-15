const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    promotion: Number,
    images: [String],
    category: [String],
    color: [String],
    size: [Number],
    quantity: Number
  },
  { versionKey: false }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product
