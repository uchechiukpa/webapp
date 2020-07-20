const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "uchechi",
  database: "users_database",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

module.exports = pool;