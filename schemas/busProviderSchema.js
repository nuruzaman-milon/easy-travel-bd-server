const mongoose = require("mongoose");
const busProviderSchema = mongoose.Schema({
  busName: {
    type: String,
    required: true,
  },
  email: String,
  isVerified: Boolean,
  licenseNumber: String,
});

module.exports = busProviderSchema;
