const { Schema, model } = require('mongoose')

const ParkingSpotSchema = Schema({
    spotNumber: {
        type: String,
        required: true,
        unique: true,
    },
    isOccupied: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = model('ParkingSpot', ParkingSpotSchema);
