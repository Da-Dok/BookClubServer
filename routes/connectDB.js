var express = require('express');
const req = require('express/lib/request');
var router = express.Router();

  const getConnection = require('../db');

  getConnection((conn) => {
    conn.query('SELECT * from User', (error, rows, fields) => {
      if (error) throw error;
      console.log('User info is: ', rows);
    });
    conn.release();
  });

router.get('/', function(req, res, next) {
    res.send('this is login');
  });

module.exports = router;