var express = require('express');
var router = express.Router();
const controller = require('./post.controller');

router.get("/postList", controller.selectPostList);
router.get("/postDetail/:idx", controller.selectPostDetail)

router.post("/insertPost", controller.insertPost);

module.exports = router;

///////////////////////////////post 주소 변경