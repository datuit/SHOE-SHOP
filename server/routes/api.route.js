const express = require("express");
const Router = express.Router();

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
const Product = require("../model/Product");
const Data = require("../data/Product.data");
Router.get("/allitem", (req, res) => {
  Product.insertMany(Data);
});

const userRouter = require("./user.route");
const sessionRouter = require("./session.route");
const orderRouteer = require("./order.route");
Router.use("/user", userRouter);
Router.use("/session", sessionRouter);
Router.use("/order", orderRouteer);

module.exports = Router;
