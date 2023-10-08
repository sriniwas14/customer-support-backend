const amqp = require('amqplib')

class RabbitMQ {
    constructor() {
        this.connection = null
        this.channel = null
    }

    async connect(url) {
        try {
            this.connection = await amqp.connect(url)
            return this.connection
        } catch (error) {
            throw error
        }
    }

    async createChannel() {
        try {
            if (!this.connection) {
                throw new Error('Connection is not established.')
            }

            this.channel = await this.connection.createChannel()
            return this.channel
        } catch (error) {
            throw error
        }
    }

    async sendMessage(queueName, messageObject) {
        try {
            if (!this.channel) {
                throw new Error('Channel is not created.')
            }

            // Assert the queue and send the message
            await this.channel.assertQueue(queueName)
            this.channel.sendToQueue(
                queueName,
                Buffer.from(JSON.stringify(messageObject))
            )

            console.log(
                `Sent: ${JSON.stringify(messageObject)} to ${queueName}`
            )
        } catch (error) {
            throw error
        }
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

const getBrokerInstance = async () => {
    let brokerInstance

    try {
        if (brokerInstance) return brokerInstance
        brokerInstance = new RabbitMQ()
        await brokerInstance.connect(process.env.RABBITMQ_URI)
        await brokerInstance.createChannel()
        console.log('Connected to RabbitMQ')
        return brokerInstance
    } catch (error) {
        console.log('Error in Connecting to RabbitMQ', error)
    }
}

module.exports = {
    getBrokerInstance,
}
