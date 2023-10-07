const mongoose = require('mongoose')
const { Schema } = mongoose

const ticketSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
