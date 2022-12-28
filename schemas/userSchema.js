const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: String,
    phone: String,
    address: String,
    gender: {
        type:String,
        enum:['male','female','others']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;