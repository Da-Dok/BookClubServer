var express = require('express');
var router = express.Router();
const controller = require('./post.controller');

router.get("/", controller.post_get)

router.post("/post", controller.post)

module.exports = router;