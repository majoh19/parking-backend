const { Schema, model } = require('mongoose')

const EntrySchema = Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 6
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
        default: new Date().toLocaleDateString('eng-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        })
    },
    entryHour: {
        type: String,
        default: new Date().toLocaleTimeString('eng-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    },
    exitDate: {
        type: Date,
    },
    exitHour: {
        type: String
    }
})

module.exports = model('Entry', EntrySchema)