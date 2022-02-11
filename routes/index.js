//url 관리

const express = require('express');
const router = express.Router();

const main = require('./main/index.js');
const users = require('./users/index.js');
const connect = require('./connectDB.js');
const join = require('./join/index.js');
const chatServer = require('./chatServer.js');
const post = require("./post/index.js");

router.use('/main', main);
router.use('/users', users);
router.use('/connect', connect);//db 연결하기
router.use('/join', join);//회원가입
router.use('/chat', chatServer);//채팅 서버
router.use('/post', post);

module.exports = router;