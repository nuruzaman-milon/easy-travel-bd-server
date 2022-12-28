const mongoose = require('mongoose');
const partnerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image: String,
    aboutUs: String,
    famousRoutes: Array,
    facilities: Array,
    // created_at: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = partnerSchema;