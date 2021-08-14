const express = require('express');
const path = require('path');
const db = require('./db.js');

const app = express();
const port = 3020;

app.use(express.json());

app.get('/products/:product_id', (req, res) => {
  db.getProductById(req, (err, data) => {
    if (err) {
      res.sendStatus(500).end('could not get product', err.stack)
    }
    res.send(data);
  })
})

app.get('/products/:product_id/', (req, res) => {
  db.getProductById(req, (err, data) => {
    if (err) {
      res.sendStatus(500).end('could not get product', err.stack)
    }
    res.send(data);
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});