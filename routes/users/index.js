var express = require('express');
var router = express.Router();
const controller = require('./users.controller');

/* GET home page. */
router.get('/', controller.users);

module.exports = router;