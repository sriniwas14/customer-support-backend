const { ObjectId } = require('mongodb')
const { mixed, object, string } = require('yup')

let createUser = object({
    phone: string().min(10).max(15).required(),
    email: string().email().required(),
    password: string().min(8).required(),
})

let createTicket = object({
    user_id: mixed((value) => ObjectId.isValid(value)),
    title: string().min(10).max(40).required(),
    description: string().min(10).max(100).required(),
})

let updateTicket = object({
    user_id: string().min(10).max(15),
    title: string().min(10).max(25),
    description: string().min(10).max(100),
})

let loginUser = object({
    email: string().email().required(),
    password: string().min(8).required(),
})

const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body)
            next()
        } catch (error) {
            res.status(400).json({ success: false, error: error.message })
        }
    }
}

module.exports = {
    validateBody,
    createUser,
    loginUser,
    createTicket,
    updateTicket,
}
