const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { createUser, loginUser, validateBody } = require('../utils/validators')

router.post('/', validateBody(createUser), async (req, res) => {
    try {
        const { phone, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ phone, email, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ message: error?.message })
    }
})

router.post('/signin', validateBody(loginUser), async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: 'Authentication failed' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res
            .status(401)
            .json({ success: false, message: 'Authentication failed' })
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    )

    res.status(200).json({
        success: true,
        message: 'Authentication successful',
        token,
    })
})

module.exports = router
