const getConnection = require('../../db');

join = (req, res, next) =>{
    res.send('This is join page haha');
}

//userToken으로 가입된 정보인지 확인
loginCheck = (req, res) =>{
    //앱에서 정보 받아오기
    var userEmail = req.body.userEmail;
    var sqlCheck = 'select * from User where userEmail = ?';
    

    getConnection((conn) => {//이메일 정보 있으면 로그인, 없으면 저장하게
        //최초 로그인, 기존 로그인 판별
        conn.query(sqlCheck, userEmail, function(err, result){
            var resultCode = 404;
            var message = '에러 발생 on join.controller'
            if (err){
                console.log(err);
            }else {
                //최초 로그인시 sqlInsert 실행->firstLogin 실행
                if (result.length === 0){
                    resultCode = 204;
                    message = '최초 로그인 계정';
                    console.log("최초 로그인");
                    loginFirst(req, res);//이렇게 되는지 모르겠다
                }else{
                    resultCode = 200;
                    message = '기존 유저 로그인 성공!' + result[0].userName + '님 welcomeback';
                    console.log("기존 계정");
                    res.json({
                        'code': resultCode,
                        'message': message
                    });
                }
            }
            
        });

        conn.release();
      });
      

}

loginFirst = (req, res)=>{
    // sql 문의 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
    var userToken = req.body.userToken;
    var userEmail = req.body.userEmail;
    var userName = req.body.userName;
    var profileImg = req.body.profileImg;

    var sqlInsert = 'INSERT INTO User (userToken, userEmail, userName, profileImg) VALUES (?, ?, ?, ?)';
    var params = [userToken, userEmail, userName, profileImg]; 

    getConnection((conn) => {//정보 있으면 로그인, 없으면 저장하게
        //최초 로그인, 기존 로그인 판별
        conn.query(sqlInsert, params, function (err, result) {
            var resultCode = 404;
            var message = 'error on sqlInsert 회원정보: 첫 로그인';
    
            if (err) {
                console.log(err);
            } else {
                resultCode = 200;
                message = '첫 로그인 성공. db에 저장 성공';
                console.log('첫 로그인 성공. db에 저장 성공');
            }
    
            res.json({
                'code': resultCode,
                'message': message
            });
        });
        conn.release();
      });
    
}

module.exports = {
    join,
    loginCheck,
    loginFirst
}
