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
  fs.createReadStream(path.resolve(__dirname, '../data/features.csv'))
  .pipe(csv.parse({headers: true}))
  .on('error', (err) => (console.log('error reading features', error)))
  .on('data', async (row) => {
    const query = 'INSERT INTO features(feature_id, product_id, feature, value) VALUES ($1, $2, $3, $4)';
    const values = [Number(row.id), Number(row.product_id), row.feature, row.value];
    await pool.query(query, values, (err, res) => {
      if (err) {
        return console.error('Error inserting features', err.stack)
      }
      count++;
      console.log(`row: ${count}`)
    })
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows for features`);
  });

