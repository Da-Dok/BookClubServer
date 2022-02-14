const getConnection = require('../../db');

post_get=(req, res, next)=>{
    var sqlSelect = 'select * from Post';
    
    getConnection((conn) => {

        conn.query(sqlSelect, function (err, rows) {
            var resultCode = 404;
            var message = 'error on sqlSelect Post';//15개 정도씩만 가져오면 좋겠다
    
            if (err) {
                console.log("postdb 가져오기 실패");
                console.log(err);
            } else {
                resultCode = 200;
                message = 'post db 가져오기 성공';
                console.log('post db 가져오기  성공');
                res.json({
                    'data': rows,//select한 정보 보냄
                    'code': resultCode,
                    'message': message
                });
            }
    
            
        });
        conn.release();
      });
}

post=(req, res)=>{//sql instert 실행
    console.log("hello");
    var userId = req.body.userId;//userID가 userEmail
    var title = req.body.title;
    var content = req.body.content;
    var contentImg = req.body.contentImg;
    var created = req.body.created;
    //var updated = req.body.updated;->수정할 때 사용

    console.log("userId: " + userId)

    var sqlInsert = 'INSERT INTO Post (userId, title, content, contentImg, created) VALUES (?, ?, ?, ?, ?)';
    var params = [userId, title, content, contentImg, created];

    getConnection((conn) => {

        conn.query(sqlInsert, params, function (err, result) {
            var resultCode = 404;
            var message = 'error on sqlInsert Post';
    
            if (err) {
                console.log("postdb 저장 실패");
                console.log(err);
                
            } else {
                resultCode = 200;
                message = 'post db에 저장 성공';
                console.log('post db에 저장 성공');
                conn.query('SELECT * from Post', (error, rows, fields) => {
                    if (error) throw error;
                    console.log('남긴 글: ', rows);
                    res.json({
                        'data': rows,
                        'code': resultCode,
                        'message': message
                    });
                  });
            }
        });
        conn.release();
      });
}
module.exports={
    post_get,
    post
}