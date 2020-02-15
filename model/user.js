const mongoose = require('mongoose')
const { hashSync, compareSync } = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    },
    facebookId: {
      type: String
    },
    cart: [],
    bought: []
  },
  { versionKey: false }
)

UserSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10)
  }
})

UserSchema.methods.comparePasswords = function(password) {
  return compareSync(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
