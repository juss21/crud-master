const express = require('express')
const amqp = require('amqplib');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');

const app = express();

const { INVENTORY_IP,
    INVENTORY_PORT,
    RABBITMQ_USERNAME,
    RABBITMQ_PASSWORD,
    RABBITMQ_NAME,
    BILLING_IP,
    BILLING_PORT,
    GATEWAY_PORT
} = process.env

var channel, connection;

connectQueue()

async function connectQueue() {
    try {
        connection = await amqp.connect(`amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${BILLING_IP}:${BILLING_PORT}`);
        channel = await connection.createChannel()

        await channel.assertQueue(RABBITMQ_NAME)
    } catch (error) {
        console.log(error)
    }
}

const inventory = createProxyMiddleware({
    target: `http://${INVENTORY_IP}:${INVENTORY_PORT}/`,
    changeOrigin: true,
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