const express = require('express')
const sessionRouter = express.Router()
const { parseError, sessionizeUser } = require('../util/helpers')
const SESS_NAME = process.env.SESS_NAME

sessionRouter.get('/', (req, res) => {
  res.send('helo')
})

sessionRouter.delete('/logout', ({ session }, res) => {
  try {
    const { user } = session
    if (user) {
      session.destroy(err => {
        if (err) throw err
        res.clearCookie(SESS_NAME)
        res.send(user)
      })
    } else {
      throw new Error('Something went wrong')
    }
  } catch (err) {
    res.status(422).send(parseError(err))
  }
})

sessionRouter.get('/checklogin', ({ session: { user } }, res) => {
  res.send({ user })
})

module.exports = sessionRouter
