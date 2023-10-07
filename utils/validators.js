const { object, string, number, date, InferType } = require('yup')

let createUser = object({
    phone: string().min(10).max(15).required(),
    email: string().email().required(),
    password: string().min(8).required(),
})

let loginUser = object({
    // email: string().email().required(),
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
}
