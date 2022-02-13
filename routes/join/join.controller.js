const getConnection = require('../../db');
const checkGoogleJWT = require('../../checkJWT');

join = (req, res, next) =>{
    res.send('This is join page haha');
}

//userToken으로 가입된 정보인지 확인
loginCheck = (req, res) =>{
    //앱에서 정보 받아오기
    //var userEmail = req.body.userEmail;
    var {email, nickname, token, img} = req.body;//토큰 정보 보냄.

    var payload = checkGoogleJWT.verify(token);//토큰 검증
    var sqlCheck = 'select * from User where userId = ?';

    getConnection((conn) => {//최초 로그인, 기존 로그인 판별
        conn.query(sqlCheck, payload['sub'], function(err, result){//payload의 sub으로 구분
            var resultCode = 404;
            var message = '에러 발생 on join.controller'
            if (err){
                console.log("로그인 체크 실패");
                console.log(err);
            }else {
                //최초 로그인시 sqlInsert 실행->firstLogin 실행
                if (result.length === 0){
                    console.log("최초 로그인");
                    loginFirst(payload);//이게 되는지 모르겠다
                }else{
                    resultCode = 308;
                    message = '기존 유저 로그인 성공!' + result[0].userName + '님 welcomeback';
                    console.log("기존 계정");
                    res.json({
                        'success': "true",
                        'code': resultCode,
                        'message': message
                    });
                }
            }
            
        });

        conn.release();
      });
      

}

loginFirst = (payload)=>{
    // sql 문의 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.

    //var {email, nickname, token, img} = req.body;//여기까진 했어

    var sqlInsert = 'INSERT INTO User (userId, userEmail, userName, profileImg) VALUES (?, ?, ?, ?)';
    const {sub, email, name, picture} = payload;
    console.log("print info", sub, email, name, picture);

    //var params = [token, email, nickname, img]; 

    getConnection((conn) => {//정보 있으면 로그인, 없으면 저장하게
        //최초 로그인, 기존 로그인 판별
        conn.query(sqlInsert, [sub, email, name, picture], function (err, result) {
            var resultCode = 404;
            var message = 'error on sqlInsert 회원정보: 첫 로그인';
    
            if (err) {
                console.log("로그인 insert 실패");
                console.log(err);
            } else {
                resultCode = 200;
                message = '첫 로그인 성공. db에 저장 성공';
                console.log('첫 로그인 성공. db에 저장 성공');
                conn.query('SELECT * from User', (error, rows, fields) => {
                    if (error) throw error;
                    console.log('User info after insert is: ', rows);
                  });
            }
    
            res.json({
                'success': "true",
                'code': resultCode,
                'message': message
            });
        });
        conn.release();
      });
    
}

googleCheck = ()=>{

}

module.exports = {
    join,
    loginCheck,
    loginFirst
}
