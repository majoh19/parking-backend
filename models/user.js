const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMINISTRADOR', 'OPERADOR']
    }
})

module.exports = model('User', UserSchema)
