const amqp = require('amqplib');
//const db = require("./models");
const Order = require("./controllers/order.js");

// RabbitMQ connection URL
const rabbitUrl = 'amqp://juss:123@192.168.75.11:5672/'; //15672

var channel, connection;
connectQueue()  // call the connect function
 
async function connectQueue() {
    try {
        connection = await amqp.connect(rabbitUrl);
        channel = await connection.createChannel();
        
        await channel.assertQueue("new-order")
        
        channel.consume("new-order", data => {
            const content = JSON.parse(Buffer.from(data.content));
            console.log("data: ", content)
            Order.create(content)
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}