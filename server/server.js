require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const path = require("path");
const MONGODB_URL = process.env.MONGODB_URL;
const NODE_ENV = process.env.NODE_ENV;
const SESS_TIMELIFE = process.env.SESS_TIMELIFE;
const SESS_NAME = process.env.SESS_NAME;
const SESS_SECRET = process.env.SESS_SECRET;
const PORT = process.env.PORT || 5000;
const config = require("./config");
const { parseError, sessionizeUser } = require("./util/helpers");
const User = require("./model/user");
(async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });
    passport.use(
      new FacebookStrategy(
        {
          clientID: config.facebook_api_key,
          clientSecret: config.facebook_api_secret,
          callbackURL: config.callback_url
        },
        function(accessToken, refreshToken, profile, done) {
          User.findOne({ facebookId: profile.id }, function(error, user) {
            if (error) {
              return done(error);
            }
            if (!user) {
              const userdata = new User({
                fullname: profile.displayName,
                facebookId: profile.id
              });
              userdata.save();
              const sessionUser = sessionizeUser(userdata);
              return done(null, sessionUser);
            } else {
              user.username = profile.displayName;
              user.save();
              const sessionUser = sessionizeUser(user);
              return done(null, sessionUser);
            }
          });
        }
      )
    );

    const app = express();
    app.use(cors());
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          ttl: parseInt(SESS_TIMELIFE) / 1000,
          collection: "sesions"
        }),
        cookie: {
          sameSite: true,
          secure: NODE_ENV === "production",
          maxAge: parseInt(SESS_TIMELIFE)
        }
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, "dist")));

    const apiRouter = require("./routes/api.route");
    app.use("/api", apiRouter);

    app.get("*.js", (req, res, next) => {
      req.url = req.url + ".gz"; // eslint-disable-line
      res.set("Content-Encoding", "gzip");
      next();
    });

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });

    app.listen(PORT, () => {
      console.log(`listened to port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
