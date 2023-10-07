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

// Create the User model
const User = mongoose.model('User', userSchema)

module.exports = User
