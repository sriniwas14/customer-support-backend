require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('./utils/mongo')
const { mysqlInstance, startMySQL } = require('./utils/mysql')

// Routes
const usersRouter = require('./routes/users')
const ticketsRouter = require('./routes/tickets')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

app.use('/auth/users', usersRouter)
app.use('/tickets', ticketsRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

startMySQL()
app.listen(port, () => console.log('Server Started on Port ', port))
