import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: '3306',
  user: "root",
  password: "0764",
  database: "pricemanager",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;