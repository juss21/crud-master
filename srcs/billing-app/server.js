const amqp = require('amqplib');
const db = require("./models");
const Order = require("./controllers/order.js");

const { RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD,
    RABBITMQ_NAME,
    BILLING_IP,
    BILLING_PORT,
} = process.env

// RabbitMQ connection URL
//const rabbitUrl = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${BILLING_IP}:${BILLING_PORT}`;

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

var channel, connection;
connectQueue()  
 
async function connectQueue() {
    try {
        connection = await amqp.connect(`amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${BILLING_IP}:${BILLING_PORT}`);
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