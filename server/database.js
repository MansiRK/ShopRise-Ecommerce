const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_LIMIT,
});

db.getConnection((error, connection) => {
  if (error) {
    console.log("Database connection failed: ", error);
  } else {
    console.log("Database connection established successfully");
    connection.release();
  }
});

module.exports = db;
