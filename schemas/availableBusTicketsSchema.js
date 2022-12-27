const mongoose = require('mongoose');
const busTicketSchema = mongoose.Schema({
    BusName: {
        type: String,
        required: [true, "Bus name is required"]
    },
    BusNumber: {
        type: String,
        unique: true,
        required: [true, "Bus Number is required"]
    },
    Image: {
        type: String,
        required: [true, "Bus image is required"]
    },
    ReportingTime: {
        type: String,
        required: [true, "Passenger reporting time is required"]
    },
    DepartureTime: {
        type: String,
        required: [true, "Bus depareture time is required"]
    },
    Date: {
        type: Date,
        required: [true, "Date is required"]
    },
    From: {
        type: String,
        required: [true, "Journey start location is required"]
    },
    To: {
        type: String,
        required: [true, "Destination location is required"]
    },
    CoachType: {
        type: String,
        enum: {
            values: ["AC", "Non AC"],
            message: "{VALUE} is  not a valid coach type. AC & Non AC is the valid Coach Type"
        },
        required: [true, "Coach type is required"]
    },
    Fare: {
        type: Number,
        required: [true, "Ticket amount is required"]
    },
    Facilities: {
        type: Array,
        required: [true, "Bus facilities is required"]
    },
    SeatCapacity: {
        type: Number,
        required: [true, "Bus seat number is required"]
    },
    SeatCombination: {
        type: Array,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = busTicketSchema;