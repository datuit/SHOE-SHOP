const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boughtedSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  cart: []
});

boughtedSchema.pre("save", function() {
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  this.date = date;
});

module.exports = mongoose.model("boughted", boughtedSchema);
