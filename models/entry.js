const { Schema, model } = require('mongoose')

const EntrySchema = Schema({
    entryDate: {
        type: Date,
        required: true
    },
    entryHour: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Entry', EntrySchema)