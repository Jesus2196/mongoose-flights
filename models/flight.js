var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"]
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function () {
            date = new Date();
            let year = date.getFullYear() + 1;
            let month = date.getMonth();
            let day = date.getDate();
            let fDate = new Date(year, month, day);
            return fDate;
        }
    },
    destinations: [destinationSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);