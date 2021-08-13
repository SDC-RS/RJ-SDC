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
let count = 0;
  fs.createReadStream(path.resolve(__dirname, '../data/related.csv'))
  .pipe(csv.parse({headers: true}))
  .on('error', (err) => (console.log('error reading related', error)))
  .on('data', async (row) => {
    const query = 'INSERT INTO related(related_id, current_product_id, \
      related_product_id) VALUES ($1, $2, $3)';
    const values = [
      Number(row.id),
      Number(row.current_product_id),
      Number(row.related_product_id)
    ];
    await pool.query(query, values, (err, res) => {
      if (err) {
        return console.error('Error inserting related', err.stack)
      }
      count++;
      console.log(`row: ${count}`)
    })
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows for features`);
  });