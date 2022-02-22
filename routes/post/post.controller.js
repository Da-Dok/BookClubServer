const { listen } = require('express/lib/application');
const getConnection = require('../../config/db');
const data = {};
//delete update도 만들기
selectPostDetail=(req, res, next)=>{//id에 맞는거 정보 가져오기
    let token = req.body.token;
    const {idx } = req.params;
    console.log("postId: ", idx);

    let sqlSelect = "select * from Post where postId = ?"//Post랑 PostTable 전부 조인

    getConnection((conn) => {//token이랑 PostID 받아옴

        conn.query(sqlSelect, idx, function (err, rows) {
            var resultCode = 404;
            var message = 'error on selectPostDetail';//15개 정도씩만 가져오면 좋겠다
    
            if (err) {
                console.log("selectPostDetail 실패");
                console.log(err);
            } else {
                resultCode = 200;
                message = 'selectPostDetail 성공';
                console.log('selectPostDetail 성공: ', rows);
                res.json({
                    'data': PostData,//select한 정보 보냄
                    'code': resultCode,
                    'message': message
                });
            }            
        });
        conn.release();
      });
}

selectPostList=(req, res, next)=>{//리스트에 넣을 포스트 정보 가져오기
    let token = req.body.token;
    let page = req.body.page;

    var sqlSelect = 'select * from Post';//Post랑 PostTable 조인해서 
    
    getConnection((conn) => {//token이랑 page 받아옴

        conn.query(sqlSelect, function (err, rows) {
            var resultCode = 404;
            var message = 'error on selectPostListt';//15개 정도씩만 가져오면 좋겠다
    
            if (err) {
                console.log("selectPostList 실패");
                console.log(err);
            } else {
                resultCode = 200;
                message = 'selectPostList 성공';
                console.log('selectPostList  성공');
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

insertPost=(req, res)=>{//토큰에서 userId 가져와서 postDB에 같이 저장하게 바꾸기
    console.log("hello");
    var userId = req.body.userId;//userID가 userEmail
    var title = req.body.title;
    var content = req.body.content;
    var contentImg = req.body.contentImg;
    var created = req.body.created;

    console.log("userId: " + userId)

    var sqlInsert = 'INSERT INTO Post (userId, title, content, contentImg, created, state, likeState) VALUES (?, ?, ?, ?, ?, "모집중", 0)';
    var params = [userId, title, content, contentImg, created];

    getConnection((conn) => {

        conn.query(sqlInsert, params, function (err) {
            var resultCode = 404;
            var message = 'error on sqlInsert Post';
    
            if (err) {
                console.log("postdb 저장 실패");
                console.log(err);
                
            } else {
                resultCode = 200;
                message = 'post db에 저장 성공';
                console.log('post db에 저장 성공');
                res.json({
                    //'data': rows,
                    'code': resultCode,
                    'message': message
                });
            }
        });
        conn.release();
      });
}
module.exports={
    selectPostDetail,
    selectPostList,
    insertPost
}