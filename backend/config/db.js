//Import the mysql module
const mysql = require("mysql2/promise");
//Create a connection to the database
const db = mysql.createPool({
  host: "localhost",
  user: "medical-research",
  password: "1234567",
  database: "medical-research",
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    connection.release();
  }
})
module.exports = db;
