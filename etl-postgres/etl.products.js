const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'racheljones',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
})

  fs.createReadStream(path.resolve(__dirname, '../data/products.csv'))
  .pipe(csv.parse({headers: true}))
  .on('error', (err) => (console.log('error reading products', error)))
  .on('data', (row) => {
    const query = 'INSERT INTO products(product_id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [Number(row.id), row.name, row.slogan, row.description, row.category, Number(row.default_price)]
    pool.query(query, values, (err, res) => {
      if (err) {
        return console.error('Error inserting products', err.stack)
      }
    })
  })
  .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows for products`));



