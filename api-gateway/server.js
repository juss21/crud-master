const express = require('express')
const amqp = require('amqplib');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const app = express();


const INVENTORY_IP = '192.168.75.10'
const INVENTORY_PORT = '8080'
const RABBITMQ_USERNAME = 'juss'
const RABBITMQ_PASSWORD = '123'
const RABBITMQ_NAME = 'new-order'
const BILLING_IP = '192.168.75.11'
const BILLING_PORT = '5672'
const GATEWAY_PORT = '8083'


//console.log(JSON.stringify(process.env, 0, 2));
var channel, connection;
connectQueue() // call connectQueue function
async function connectQueue() {
    try {
        connection = await amqp.connect(`amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${BILLING_IP}:${BILLING_PORT}`);
        channel = await connection.createChannel()
        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue(RABBITMQ_NAME)
    } catch (error) {
        console.log(error)
    }
}

const inventory = createProxyMiddleware({
    target: `http://${INVENTORY_IP}:${INVENTORY_PORT}/`,// target host with the same base path
    changeOrigin: true, // needed for virtual hosted sites
    logLevel: 'debug',
    onProxyReq: fixRequestBody,
});

app.use(express.json());
app.use('/api/movies', inventory);
app.post("/api/billing", async (req, res) => {
    const data = req.body;
    await channel.sendToQueue(RABBITMQ_NAME, Buffer.from(JSON.stringify(data)));
    res.send("Message Sent:");
});

app.listen(GATEWAY_PORT, () => {
    console.log(`Server is running on port ${GATEWAY_PORT}.`);
});