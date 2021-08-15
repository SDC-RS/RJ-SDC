const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'racheljones',
  host: 'localhost',
  database: 'sdc',
  port: 5432,
})
const getAllProducts = (cb) => {
  const query = 'SELECT * FROM datasdc.products LIMIT 5'
  pool.query(query, null, (err, results) => {
    if (err) {
    cb(err);
    }
    cb(null, results.rows);
  })
}

const getProductById = (productId, cb) => {
  const query = `SELECT * FROM datasdc.products INNER JOIN datasdc.features \
   ON datasdc.products.product_id = datasdc.features.product_id WHERE \
   datasdc.features.product_id = ${productId}`;
  pool.query(query, null, (err, results) => {
    if (err) {
    cb(err);
    }
    const product = {
      product_id: results.rows[0].product_id,
      name: results.rows[0].name,
      slogan: results.rows[0].slogan,
      description: results.rows[0].description,
      category: results.rows[0].category,
      default_price: results.rows[0].default_price,
      features: []
    }
    results.rows.forEach((row) => {
      if (row.feature) {
        const feature = {
          feature: row.feature,
          value: row.value
        }
        product.features.push(feature);
      }
    })
    cb(null, product);
  })
}

const getRelatedProducts = (productId, cb) => {
  const query = `SELECT * FROM datasdc.related WHERE \
   datasdc.related.current_product_id = ${productId}`;
  pool.query(query, null, (err, results) => {
    if (err) {
    cb(err);
    }
    const related = [];
    results.rows.forEach((row) => {
      related.push(row.related_product_id)
    })
    cb(null, related);
  })
}

const getStyles = (productId, cb) => {
  const query1 = `SELECT s.*, ARRAY_AGG(json_build_object('thumbnail_url', p.thumbnail_url, 'url', \
  p.url)) AS photos FROM datasdc.styles s INNER JOIN datasdc.photos p ON s.styles_id = p.styles_id \
  WHERE s.product_id = ${productId} GROUP BY s.styles_id;`;
  const query2 = `SELECT s.styles_id, json_object_agg(sk.skus_id, json_build_object('size', sk.size, \
  'quantity', sk.quantity)) AS skus FROM datasdc.styles s INNER JOIN datasdc.skus sk ON s.styles_id = sk.styles_id \
  WHERE s.product_id = ${productId} GROUP BY s.styles_id;`
  pool.query(query1, null, (err, results) => {
    if (err) {
    cb(err);
    }
    let styles = results.rows;
    pool.query(query2, null, (err, results) => {
      if (err) {
      cb(err);
      }
      for (let i = 0; i < results.rows.length; i++) {
        styles[i].skus = results.rows[i].skus;
      }
      cb(null, styles);
    })
  })
}

module.exports = {
  getProductById,
  getRelatedProducts,
  getAllProducts,
  getStyles
}