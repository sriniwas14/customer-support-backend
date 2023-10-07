const jwt = require('jsonwebtoken')
require('dotenv').config()

function authChecker(req, res, next) {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return res
            .status(401)
            .json({
                success: false,
                message: 'Unauthorized: No token provided',
            })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res
            .status(401)
            .json({
                success: false,
                message: 'Unauthorized: Invalid token format',
            })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token',
        })
    }
}

module.exports = authChecker
