const { Schema, model } = require('mongoose')

const ExitSchema = Schema({
    exitDate: {
        type: String,
        required: true 
    },
    exitHour: { 
        type: String, 
        required: true 
    }, 
    plateNumber: { 
        type: String, 
        required: true 
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
    },
})

module.exports = model('Exit', ExitSchema)