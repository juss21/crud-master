const amqp = require('amqplib');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: '192.168.75.126',
    database: 'orders',
    password: '123',
    port: 5678,
})

// RabbitMQ connection URL
const rabbitUrl = 'amqp://juss:123@192.168.75.126:55555/';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.post('/orders', async (req, res) => {
    try {
      const { user_id, number_of_items, total_amount } = req.body;
      
      const client = await pool.connect();
      const query = 'INSERT INTO orders (user_id, number_of_items, total_amount) VALUES ($1, $2, $3)';
      const values = [user_id, number_of_items, total_amount];
      await client.query(query, values);
      client.release();
  
      res.status(201).send('Order placed successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Billing API listening at http://localhost:${port}`);
  });