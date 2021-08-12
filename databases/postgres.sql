CREATE DATABASE IF NOT EXISTS sdc;

\c sdc;
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
CREATE TABLE IF NOT EXISTS products (
  product_id integer NOT NULL PRIMARY KEY,
  name VARCHAR(35) NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(35) NOT NULL,
  default_price integer NOT NULL
);

CREATE TABLE IF NOT EXISTS features (
  feature_id integer NOT NULL PRIMARY KEY,
  product_id integer REFERENCES products (product_id),
  feature VARCHAR(35) NOT NULL,
  value VARCHAR(35) NOT NULL
);

CREATE TABLE IF NOT EXISTS styles (
  styles_id integer NOT NULL PRIMARY KEY,
  product_id integer REFERENCES products (product_id),
  name VARCHAR(35) NOT NULL,
  sale_price integer,
  original_price integer NOT NULL,
  default_style BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS skus (
  skus_id integer NOT NULL PRIMARY KEY,
  styles_id integer REFERENCES styles (styles_id),
  size VARCHAR(35) NOT NULL,
  quantity integer NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id integer NOT NULL PRIMARY KEY,
  styles_id integer REFERENCES styles (styles_id),
  thumbnail_url VARCHAR(258) NOT NULL,
  url VARCHAR(258) NOT NULL
);

CREATE TABLE IF NOT EXISTS related (
  related_id integer NOT NULL PRIMARY KEY,
  current_product_id integer REFERENCES products (product_id),
  related_product_id integer NOT NULL
);

\dt;


