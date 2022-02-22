//url 관리

const express = require('express');
const router = express.Router();

const join = require('./join/index.js');
const post = require("./post/index.js");
const chatting = require('./chat/index.js');
const profile = require('./profile/index.js');

router.use('/join', join);//회원가입
router.use('/post', post);
router.use('/chat', chatting);
router.use('/profile', profile);
///////////////////
const chatServer = require('./chatServer.js');
const connect = require('../config/connectDB.js');
router.use('/chatServer', chatServer);//채팅 서버
router.use('/connect', connect);//db 연결하기
module.exports = router;