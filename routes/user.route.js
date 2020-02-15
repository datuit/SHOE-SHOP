const express = require('express')
const userRouter = express.Router()
const passport = require('passport')
const Joi = require('joi')
const { parseError, sessionizeUser } = require('../util/helpers')
const { sign } = require('../validations/user')
const User = require('../model/user')
const Order = require('../model/order')

userRouter.get('/', ensureAuthenticated, async function(req, res, next) {
  req.session.user = await req.user
  res.redirect('/')
})

userRouter.get('/time', function(req, res) {
  var today = new Date()
  var date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  res.send({ [date]: 1 })
})

userRouter.post('/buycart', async (req, res) => {
  try {
    const { userId, cart } = req.body
    if (req.session.user.userId) {
      var user = await User.findById(userId, 'bought')
      if (user) {
        var today = new Date()
        var date =
          today.getDate() +
          '/' +
          (today.getMonth() + 1) +
          '/' +
          today.getFullYear()
        await user.bought.push({ [date]: cart })
        await user.save()
        res.send('ok')
      }
    } else {
      res.redirect('/')
    }
  } catch (err) {
    res.send(parseError(err))
  }
})

userRouter.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body
    await Joi.validate({ username, password }, sign)

    const user = await User.findOne({ username })
    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user)

      req.session.user = sessionUser
      res.send(sessionUser)
    } else {
      throw new Error('Tài khoản không tồn tại')
    }
  } catch (err) {
    res.send(parseError(err))
  }
})

userRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    await Joi.validate({ username, password }, sign)
    const newUser = new User({ username, password })
    await newUser.save()
    const sessionUser = await sessionizeUser(newUser)
    req.session.user = sessionUser
    res.send(sessionUser)
  } catch (err) {
    res.send(parseError(err))
  }
})

userRouter.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
)

userRouter.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/user',
    failureRedirect: '/loin'
  }),
  function(req, res) {
    console.log(req.user)
  }
)

module.exports = userRouter

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
