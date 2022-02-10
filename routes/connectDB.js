var express = require('express');
const req = require('express/lib/request');
var router = express.Router();


//const app = require('../app');

/*var connection = mysql.createConnection({
    host: process.env.dbHOST,
    user: process.env.dbUSER,
    database: process.env.dbLOGIN,
    password: process.env.dbPW,
    port: 3306
})
connection.connect(function(err) {
    if (err) throw err;
    console.log('database Connected!');
});
connection.query('SELECT * from User', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
  });*/

  const getConnection = require('../db');

  getConnection((conn) => {
    conn.query('SELECT * from User', (error, rows, fields) => {
      if (error) throw error;
      console.log('User info is: ', rows);
    });
    conn.release();
  });









  /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('this is login');
  });

module.exports = router;