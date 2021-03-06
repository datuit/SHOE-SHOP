const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const Joi = require("joi");
const { parseError, sessionizeUser } = require("../util/helpers");
const { sign } = require("../validations/user");
const User = require("../model/user");
const Order = require("../model/order");

userRouter.get("/", ensureAuthenticated, async function(req, res, next) {
  req.session.user = await req.user;
  res.redirect("/");
});

userRouter.get("/time", function(req, res) {
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  res.send({ [date]: 1 });
});

userRouter.post("/address", async (req, res) => {
  try {
    const { body, session } = req;
    const { userId } = session.user;
    if (session.user) {
      var user = await User.findById(userId);
      await user.address.push(body.address);
      user.save();
      const sessionUser = sessionizeUser(user);

      req.session.user = sessionUser;
      res.send(sessionUser);
    } else throw new Error("Vui lòng đăng nhập");
  } catch (err) {
    res.send(parseError(err)).status(401);
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    await Joi.validate({ username, password }, sign);

    const user = await User.findOne({ username });
    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user);

      req.session.user = sessionUser;
      res.send(sessionUser);
    } else {
      throw new Error("Tài khoản không tồn tại");
    }
  } catch (err) {
    res.send(parseError(err));
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    await Joi.validate({ username, password }, sign);
    const newUser = new User({ username, password, fullname });
    await newUser.save();
    const sessionUser = await sessionizeUser(newUser);
    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    res.send(parseError(err));
  }
});

userRouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/user",
    failureRedirect: "/loin"
  }),
  function(req, res) {
    console.log(req.user);
  }
);

module.exports = userRouter;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
