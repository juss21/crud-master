const amqp = require('amqplib');
const Order = require("./controllers/order.js");

const { RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD,
    RABBITMQ_NAME,
    BILLING_IP,
    BILLING_PORT,
} = process.env


// RabbitMQ connection URL
const rabbitUrl = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${BILLING_IP}:${BILLING_PORT}`;

var channel, connection;
connectQueue()  
 
async function connectQueue() {
    try {
        connection = await amqp.connect(rabbitUrl);
        channel = await connection.createChannel();
        
        await channel.assertQueue(RABBITMQ_NAME)
        
        channel.consume(RABBITMQ_NAME, data => {
            const content = JSON.parse(Buffer.from(data.content));
            console.log("data: ", content)
            Order.create(content)
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}