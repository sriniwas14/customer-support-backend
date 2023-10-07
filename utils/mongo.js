const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB_URI

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose
    .connect(mongoURI, dbOptions)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err)
    })

module.exports = mongoose.connection
