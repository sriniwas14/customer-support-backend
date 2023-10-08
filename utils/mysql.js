const mysql = require('mysql2')

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}

let mysqlPool = mysql.createPool(dbConfig).promise()

module.exports = mysqlPool
