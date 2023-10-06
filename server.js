require('dotenv').config();
const express = require("express")
const { mongoInstance, startMongo } = require("./utils/mongo")
const { mysqlInstance, startMySQL } = require("./utils/mysql")


const port = process.env.PORT

const app = express()

app.get('/', (req, res) => {
	res.send("Hello World!")
});

startMongo()
startMySQL()
app.listen(port, () => console.log("Server Started on Port ", port))
