const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'data_transfer',
  password: '1234',
  port: 5432, 
});

pool.connect();

module.exports = pool;

