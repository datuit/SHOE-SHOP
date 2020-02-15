const express = require('express')
const Router = express.Router()
const Product = require('../model/Product')

Router.get('/', (req, res) => {
  res.send('a')
})

Router.get('/shoes-man', (req, res) => {
  Product.find({ category: req.query.category }, function(err, products) {
    if (err) {
      res.send('co loi say ra')
    } else {
      res.send(products)
    }
  })
})

Router.get('/shoes-woman', (req, res) => {
  Product.find({ category: req.query.category }, function(err, products) {
    if (err) {
      res.send('co loi say ra')
    } else {
      res.send(products)
    }
  })
})

Router.get('/shoes-couple', (req, res) => {
  Product.find({ category: req.query.category }, function(err, products) {
    if (err) {
      res.send('co loi say ra')
    } else {
      res.send(products)
    }
  })
})

module.exports = Router
