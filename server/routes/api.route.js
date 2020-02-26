const express = require("express");
const Router = express.Router();
const Product = require("../model/Product");

Router.get("/", (req, res) => {
  res.send("a");
});

Router.post("/item", (req, res) => {
  Product.find({ category: req.body.category }, function(err, products) {
    if (err) {
      res.send("co loi say ra");
    } else {
      res.send(products);
    }
  });
});

module.exports = Router;
