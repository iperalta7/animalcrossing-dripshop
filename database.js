//required module for mysql
const mysql = require('mysql2');

//create the connection the mysql server (LOCAL ONLY)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'User',
    password: 'User1234',
    database: '436proj'
  });
  
  // test mysql database connection
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
  });

module.exports = connection;
