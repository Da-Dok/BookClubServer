var express = require('express');
var router = express.Router();
const controller = require('./join.controller');

router.get('/login_get', controller.join);
router.post('/login', controller.loginCheck);//로그인 하면 db에 사용자 정보 저장하기

module.exports = router;

//이건 users 카테고리의 join과 login으로 나눠야 할 것 같은데..