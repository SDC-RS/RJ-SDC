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

fs.createReadStream(path.resolve(__dirname, '../data/styles.csv'))
.pipe(csv.parse({headers: true}))
.on('error', (err) => (console.log('error reading styles', error)))
.on('data', (row) => {
  const query = 'INSERT INTO styles(styles_id, product_id, name, sale_price, original_price, default_style) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [Number(row.id), Number(row.productId), row.name, row.sale_price, Number(row.original_price), !!Number(row.default_style)]
  pool.query(query, values, (err, res) => {
    if (err) {
      return console.error('Error inserting products', err.stack);
    }
  })
})
.on('end', (rowCount) => console.log(`Parsed ${rowCount} rows for styles`));
