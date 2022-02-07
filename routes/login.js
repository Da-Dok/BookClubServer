var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
    port: 3306
})

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
});

connection.query('SELECT * from User', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
  });

module.exports = router;