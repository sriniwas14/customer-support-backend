const express = require('express')
const router = express.Router()
const Ticket = require('../models/Ticket')
const {
    createTicket,
    updateTicket,
    validateBody,
} = require('../utils/validators')

router.post('/', validateBody(createTicket), async (req, res) => {
    try {
        const { user_id, title, description } = req.body
        const newTicket = new Ticket({ user_id, title, description })
        await newTicket.save()
        res.status(201).json({ success: true, newTicket })
    } catch (error) {
        console.error('Error creating ticket:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
})

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find()
        res.json({ success: true, tickets })
    } catch (error) {
        console.error('Error fetching tickets:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
})

// Get a single ticket by ID
router.get('/:ticketID', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.ticketID)
        if (!ticket) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' })
        }
        res.json({ success: true, ticket })
    } catch (error) {
        console.error('Error fetching ticket:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
})

// Update a ticket by ID
router.put('/:ticketID', validateBody(updateTicket), async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.ticketID,
            { $set: req.body },
            { new: true }
        )

        if (!updatedTicket) {
            return res
                .status(404)
                .json({ success: false, message: 'Ticket not found' })
        }

        res.json({ success: true, updatedTicket })
    } catch (error) {
        console.error('Error updating ticket:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
})

module.exports = router
