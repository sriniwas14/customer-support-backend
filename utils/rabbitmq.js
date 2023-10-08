const amqp = require('amqplib/callback_api')

class RabbitMQ {
    constructor() {
        this.connection = null
        this.channel = null
    }

    connect(url) {
        return new Promise((resolve, reject) => {
            amqp.connect(url, (err, connection) => {
                if (err) {
                    reject(err)
                } else {
                    this.connection = connection
                    resolve(connection)
                }
            })
        })
    }

    createChannel() {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                return reject(new Error('Connection is not established.'))
            }

            this.connection.createChannel((err, channel) => {
                if (err) {
                    reject(err)
                } else {
                    this.channel = channel
                    resolve(channel)
                }
            })
        })
    }

    close() {
        if (this.channel) {
            this.channel.close()
        }

        if (this.connection) {
            this.connection.close()
        }
    }
}

module.exports = new RabbitMQ(process.env.RABBITMQ_URL)
