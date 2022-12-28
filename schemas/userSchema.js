const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  accountType: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = userSchema;
