//required module for mysql
const mysql = require('mysql2');

require('dotenv').config({
  path:'./process.env'
});
//create the connection the mysql server (LOCAL ONLY)
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  });
  
  
  // test mysql database connection
  connection.getConnection((err) => {
    if (err) throw err;
    console.log('Connected to database!');
  });

  module.exports = connection;
