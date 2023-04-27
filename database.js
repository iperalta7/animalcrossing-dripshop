//required module for mysql
const mysql = require('mysql2');

//create the connection the mysql server (LOCAL ONLY)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
  });
  
  
  // test mysql database connection
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
  });

module.exports = connection;
