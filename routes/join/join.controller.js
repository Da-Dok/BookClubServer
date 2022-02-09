const getConnection = require('../db');

exports.join = (req, res, next) =>{
    res.send('This is join page haha');
}

exports.login = (req, res) =>{
    //앱에서 정보 받아오기
    var userToken = req.body.userToken;
    var userEmail = req.body.userEmail;
    var userName = req.body.userName;
    var profileImg = req.body.profileImg;
    
    //userToken으로 가입된 정보인지 확인
    var sqlInsert = 'INSERT INTO User (userToken, userEmail, userName, profileImg) VALUES (?, ?, ?, ?)';
    var sqlCheck = 'select userToken from User where userToken = ?';
    var params = [userToken, userEmail, userName, profileImg];

    getConnection((conn) => {//정보 있으면 로그인, 없으면 저장하게
        //최초 로그인, 기존 로그인 판별
        conn.query(sqlCheck, userToken, function(err, result){
            var resultCode = 404;
            var message = '에러 발생 on join.controller'
            if (err){
                console.log(err);
            }else {
                //최초 로그인시 sqlInsert 실행
                if (result.length === 0){
                    resultCode = 204;
                    message = '최초 로그인 계정'
                }else{
                    resultCode = 200;
                    message = '기존 유저 로그인 성공!' + result[0].userName + '님 welcomeback';
                }
            }
            res.json({
                'code': resultCode,
                'message': message
            });
        });

        // sql 문의 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
        conn.query(sqlInsert, params, function (err, result) {
            var resultCode = 404;
            var message = 'error on sqlInsert 회원정보: 첫 로그인';

            if (err) {
                console.log(err);
            } else {
                resultCode = 200;
                message = '첫 로그인 성공. db에 저장 성공';
            }

            res.json({
                'code': resultCode,
                'message': message
            });
        });
        conn.release();
      });
      

}