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

  fs.createReadStream(path.resolve(__dirname, '../data/photos.csv'))
  .pipe(csv.parse({headers: true}))
  .on('error', (err) => (console.log('error reading photos', error)))
  .on('data', (row) => {
    const query = 'INSERT INTO photos(photos_id, current_product_id, photos_product_id) VALUES ($1, $2, $3)';
    const values = [Number(row.id), Number(row.current_product_id), Number(row.photos_product_id)];
    pool.query(query, values, (err, res) => {
      if (err) {
        return console.error('Error inserting photos', err.stack)
      }
    })
  })
  .on('close', (rowCount) => console.log(`Parsed ${rowCount} rows for photos`));