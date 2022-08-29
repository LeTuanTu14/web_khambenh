const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  port: process.env.SQL_PORT,
});

module.exports = con;
