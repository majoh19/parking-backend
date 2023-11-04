const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    entries: {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
    }
})

module.exports = model('User', UserSchema);
