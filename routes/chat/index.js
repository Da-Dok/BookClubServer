var express = require('express');
var router = express.Router();
const controller = require('./chat.controller');

router.post('/chatRoomList_select', controller.selectChatList);//토큰이랑 userId 받음
router.post('/chatRoomList_insert', controller.insertChatListCheck);//토큰이랑 postId, timeStmap 받음
router.post('/latestChat_check', controller.checkChatLatest);//토큰이랑 postId, timeStmap 받음
module.exports = router;