const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Agent = require('../models/Agent')
const { validateBody, createAgent, loginAgent } = require('../utils/validators')

router.post('/', validateBody(createAgent), async (req, res) => {
    try {
        const agentData = req.body
        const agent = new Agent()
        const insertedId = await agent.createAgent(agentData)
        res.status(201).json({
            success: true,
            message: 'Agent added',
            agent_id: insertedId,
        })
    } catch (error) {
        console.error('Error adding agent:', error)
        res.status(500).json({
            success: false,
            message: error?.message,
        })
    }
})

router.post('/signin', validateBody(loginAgent), async (req, res) => {
    try {
        const { email, password } = req.body
        const agent = new Agent()
        const existingAgent = await agent.getAgent(email)

        if (existingAgent) {
            // Agent with the provided email exists; now verify the password
            const passwordMatch = await bcrypt.compare(
                password,
                existingAgent.password
            )

            if (passwordMatch) {
                // Password matches; create and send a JWT
                const token = jwt.sign(
                    { agentId: existingAgent.id, userType: 'agent' },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '8h',
                    }
                )

                res.json({
                    success: true,
                    message: 'Sign-in successful',
                    userType: 'agent',
                    token,
                })
            } else {
                res.json({
                    success: false,
                    message: 'Sign-in failed: Incorrect password',
                })
            }
        } else {
            res.json({
                success: false,
                message: 'Sign-in failed: Agent not found',
            })
        }
    } catch (error) {
        console.error('Error signing in agent:', error)
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        })
    }
})

module.exports = router
