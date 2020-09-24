const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "please put your mysql username",
  password: "please put your mysql password",
  database: "csc317db",
  connectionLimit: 50,
  // debug: true,
});

// const promisePool = pool.Promise();
module.exports = pool;
