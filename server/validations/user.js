const Joi = require('joi')

const messageUser = 'Tài khoản phải từ 3-20 kí tự'
const username = Joi.string()
  .regex(/^[a-zA-Z0-9!@#$%^&*]{3,20}$/)
  .required()
  .options({
    language: {
      string: {
        regex: {
          base: messageUser
        }
      }
    }
  })

const messagePass = 'Mật khẩu phải từ 6-16 kí tự'

const password = Joi.string()
  .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  .required()
  .options({
    language: {
      string: {
        regex: {
          base: messagePass
        }
      }
    }
  })

module.exports.sign = Joi.object().keys({
  username,
  password
})
