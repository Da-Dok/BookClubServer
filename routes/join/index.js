var express = require('express');
var router = express.Router();
const controller = require('./join.controller');

/* GET home page. */
router.get('/', controller.join);

module.exports = router;