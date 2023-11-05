const { Schema, model } = require('mongoose')

const PaymentSchema = Schema({
    entry: {
        type: Schema.Types.ObjectId,
        ref: 'Entry'
    },
    exit: {
        type: Schema.Types.ObjectId,
        ref: 'Exit'
    },
    totalAmount: {
        type: Number,
        required: true
    }
})

module.exports = model('Payment', PaymentSchema)
