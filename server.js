require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const rabbitmq = require('./utils/rabbitmq')

const mongoose = require('./utils/mongo')
const { startMySQL } = require('./utils/mysql')

// Routes
const usersRouter = require('./routes/users')
const ticketsRouter = require('./routes/tickets')
const agentsRouter = require('./routes/agents')

const authChecker = require('./middlewares/authChecker')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

app.use('/auth/users', usersRouter)
app.use('/tickets', authChecker, ticketsRouter)
app.use('/auth/agents', agentsRouter)

app.get('/', (req, res) => {
    res.send('Server Active!')
})

app.listen(port, () => console.log('Server Started on Port', port))
