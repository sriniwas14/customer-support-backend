const mysqlPool = require('../utils/mysql')
const bcrypt = require('bcrypt')
class Agent {
    async createAgent(agent) {
        try {
            const conn = await mysqlPool.getConnection()
            const hashedPassword = await bcrypt.hash(agent.password, 10)
            agent.password = hashedPassword

            const [rows] = await conn.query(
                'SELECT id, name, email FROM agents WHERE email = ?',
                [agent.email]
            )

            if (rows.length === 1) {
                throw new Error('User Already Exists!')
            }

            const [results] = await conn.query(
                'INSERT INTO agents (name, email, password) VALUES (?, ?, ?)',
                [agent.name, agent.email, agent.password]
            )
            conn.release()
            return results.insertId
        } catch (error) {
            throw error
        }
    }

    async getAgent(email) {
        try {
            const conn = await mysqlPool.getConnection()
            const [rows] = await conn.query(
                'SELECT * FROM agents WHERE email = ?',
                [email]
            )
            conn.release()

            if (rows.length === 1) {
                return rows[0]
            } else {
                return null // Agent not found
            }
        } catch (error) {
            throw error
        }
    }
}

module.exports = Agent
