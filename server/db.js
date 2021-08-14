const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'racheljones',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
})

const getProductById = (req, cb) => {
  const query = `SELECT * FROM datasdc.products INNER JOIN datasdc.features ON datasdc.products.product_id = ${req.params.product_id} AND datasdc.features.product_id = ${req.params.product_id}`;
  pool.query(query, null, (err, results) => {
    if (err) {
    cb(err);
    }
    cb(null, results.rows);
  })
}

module.exports = {
  getProductById
}