var express = require('express');
var router = express.Router();
const controller = require('./main.controller');

/* GET home page. */
router.get('/', controller.main);

module.exports = router;
