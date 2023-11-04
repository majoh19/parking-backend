const { Schema, model } = require('mongoose')

const PaymentSchema = Schema({
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: new Date()
    },
    parkingSpot: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSpot',
    },
})

module.exports = model('Payment', PaymentSchema);
