const express = require("express");
const OrderRoute = express.Router();
const { parseError, sessionizeUser } = require("../util/helpers");
const SESS_NAME = process.env.SESS_NAME;
const Order = require("../model/order");
const Boughting = require("../model/boughting");

OrderRoute.get("/", (req, res) => {
  res.send("OrderRoute");
});

OrderRoute.post("/buycart", async (req, res) => {
  //   console.log(req.body);
  //   try {
  //     const { userId } = req.session.user;
  //     const { cart } = req.body;
  // if (userId) {
  //   var user = await Order.findOne({ userId }, "boughting");
  //   Order.agg;
  //   var today = new Date();
  //   var date =
  //     today.getDate() +
  //     "/" +
  //     (today.getMonth() + 1) +
  //     "/" +
  //     today.getFullYear();
  //   if (user) {
  //     console.log("cccc 1");
  //     console.log(user.boughting.hasOwnProperty(date));
  //     //If the order already exists, don't create a new objecb
  //     user.boughting.hasOwnProperty(date)
  //       ? (user.boughting[date] = await user.boughting[date].concat(cart))
  //       : (user.boughting[date] = await cart);
  //     await user.save();

  //     res.status(200);
  //   } else {
  //   console.log("cccc 2");
  //   const boughting = new Boughting({ userId, cart });
  //   boughting.save();
  //     Order.aggregate({
  //       {$group: { "_id": { month: { $month: "$date"}, name: "$Name" } } }
  //     })
  res.send("hello").status(200);
  //   }
  // } else {
  //   res.redirect("/");
  // }
  //   } catch (err) {
  //     res.send(parseError(err));
  //   }
});

module.exports = OrderRoute;
