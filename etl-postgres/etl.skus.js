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

  fs.createReadStream(path.resolve(__dirname, '../data/skus.csv'))
  .pipe(csv.parse({headers: true}))
  .on('error', (err) => (console.log('error reading skus', error)))
  .on('data', async (row) => {
    const query = 'INSERT INTO skus(skus_id, styles_id, size, quantity) VALUES ($1, $2, $3, $4)';
    const values = [Number(row.id), Number(row.styleId), row.size, Number(row.quantity)];
    const count = 0;
    await pool.query(query, values, (err, res) => {
      if (err) {
        return console.error('Error inserting skus', err.stack)
      }
      console.log(`row: ${count++}`);
    })
  })
  .on('end', (res, rowCount) => {
    console.log(`Parsed ${rowCount} rows for skus`);
    res.end()
  });