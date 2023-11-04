const { Schema, model } = require('mongoose')

const EntrySchema = Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    entryDate: {
        type: Date,
        default: new Date()
    },
    exitDate: {
        type: Date,
    }
})

module.exports = model('Entry', EntrySchema);
