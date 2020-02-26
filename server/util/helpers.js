module.exports.parseError = err => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

module.exports.sessionizeUser = user => ({
  userId: user.id,
  username: user.username,
  cart: user.cart,
  address: user.address,
  fullname: user.fullname || ""
});
