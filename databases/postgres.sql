-- CREATE DATABASE IF NOT EXISTS sdc;

\c sdc;
-- DROP SCHEMA IF EXISTS public CASCADE;
-- CREATE SCHEMA public;
-- DROP SCHEMA IF EXISTS datasdc CASCADE;
-- CREATE SCHEMA datasdc;

-- CREATE TABLE IF NOT EXISTS datasdc.products (
--   product_id SERIAL PRIMARY KEY,
--   name VARCHAR(35) NOT NULL,
--   slogan TEXT NOT NULL,
--   description TEXT NOT NULL,
--   category VARCHAR(35) NOT NULL,
--   default_price integer NOT NULL
-- );

-- COPY datasdc.products FROM '/Users/racheljones/hack-reactor-work/RJ-SDC/data/products.csv' CSV HEADER;

-- CREATE TABLE IF NOT EXISTS datasdc.features (
--   feature_id SERIAL PRIMARY KEY,
--   product_id integer REFERENCES datasdc.products,
--   feature VARCHAR(35) NOT NULL,
--   value VARCHAR(35) NOT NULL
-- );

-- COPY datasdc.features FROM '/Users/racheljones/hack-reactor-work/RJ-SDC/data/features.csv' CSV HEADER;

-- CREATE TABLE IF NOT EXISTS datasdc.styles (
--   styles_id SERIAL PRIMARY KEY,
--   product_id integer REFERENCES datasdc.products,
--   name VARCHAR(35) NOT NULL,
--   sale_price integer NULL,
--   original_price integer NOT NULL,
--   default_style BOOLEAN NOT NULL
-- );

-- COPY datasdc.styles FROM '/Users/racheljones/hack-reactor-work/RJ-SDC/data/styles.csv' WITH NULL AS 'null' CSV HEADER;

-- CREATE TABLE IF NOT EXISTS datasdc.skus (
--   skus_id SERIAL PRIMARY KEY,
--   styles_id integer REFERENCES datasdc.styles,
--   size VARCHAR(35) NOT NULL,
--   quantity integer NOT NULL
-- );

-- COPY datasdc.skus FROM '/Users/racheljones/hack-reactor-work/RJ-SDC/data/skus.csv' CSV HEADER;

-- CREATE TABLE IF NOT EXISTS datasdc.photos (
--   photo_id SERIAL PRIMARY KEY,
--   styles_id integer REFERENCES datasdc.styles,
--   thumbnail_url text NOT NULL,
--   url text NOT NULL
-- );

-- COPY datasdc.photos FROM '/Users/racheljones/hack-reactor-work/RJ-SDC/data/photos.csv' CSV HEADER;

-- CREATE TABLE IF NOT EXISTS datasdc.related (
--   related_id SERIAL PRIMARY KEY,
--   current_product_id integer REFERENCES datasdc.products,
--   related_product_id integer NOT NULL
-- );

-- COPY datasdc.related FROM '/Users/racheljones/hack-reactor-work/RJ-SDC/data/related.csv' CSV HEADER;

-- CREATE INDEX idx_product_id ON datasdc.products(product_id);
CREATE INDEX idx_product_id1 ON datasdc.related(related_id);
