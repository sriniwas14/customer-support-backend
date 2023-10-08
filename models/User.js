const mongoose = require('mongoose')
const { Schema } = mongoose

// Define the user schema
const userSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.index({ email: 1 }, { unique: true })

const User = mongoose.model('User', userSchema)

module.exports = User
