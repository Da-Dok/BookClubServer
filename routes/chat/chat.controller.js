const getConnection = require('../../config/db');
const checkGoogleJWT = require('../../config/checkJWT');

//채팅방 삭제 기능
//채팅목록 가져올 때 최근 채팅 순으로
//api 정리 문서 만들기

selectChatList= async(req, res, next)=>{//채팅 카테고리 누르면
    //req로 토큰 받아와서 유저 아이디 받아오기
    //let token = req.body.token;
    let token = "";
    var payload = await checkGoogleJWT.verify(token);
    console.log("userId: ", payload['sub']);
    
    sqlSelect= "select P.title, P.contentImg from Post as P join GroupMember as G on P.postId=G.groupId where G.userId = ?"//userId, groupId, latest(GroupMember랑 Post랑 join해서 title, groupImg)//latest랑 content 나중에
    //user의 채팅방 목록을 가져옴
    getConnection((conn) => {
        conn.query(sqlSelect, payload['sub'], function(err, rows){
            if (err){
                console.log("에러 발생 on chat.selectChatList");
                console.log(err);
            }
            var resultCode = 200;//성공하면 200으로
            var message = '성공'
            res.json({
                'data': rows,//select한 정보 보냄
                'code': resultCode,
                'message': message
            });
            console.log("userId에 맞는 rows들: ", rows);
        });

        conn.release();
      });
}



insertChatListCheck= async(req, res)=>{//참여자를 그룹에 넣기 위한 작업
    //let token = req.body.token;
    let token = "";
    let groupId = req.body.groupId;

    var payload = await checkGoogleJWT.verify(token);
    console.log("userId: ", payload['sub']);

    let params = [payload['sub'], groupId];

    //req로 토큰이랑 postID
    sqlCheck = "select * from GroupMember where userId = ? and groupId = ?"
    getConnection((conn) => {
        conn.query(sqlCheck, params, function(err, rows){

            if (err){
                console.log("에러 발생 on chat.insertChatListCheck");
                console.log(err);
            }

            if (rows.length === 0){
                console.log("첫 채팅방 참여");
                insertUser(payload, groupId, res);//이게 되는지 모르겠다
            }else{
                console.log("이미 있는 채팅방");
                res.json({//이미 있음
                    'code': 308,
                    'message': "이미 참여한 채팅방입니다"
                });
            }
        });

        conn.release();
      });
}

//토큰을 저장해서 토큰을 보내서 insertChatList를 만들자!
insertUser=(payload, groupId, res)=>{//채팅하기 누르면
    let params = [groupId, payload['sub']];
    var resultCode = 404;

    //req로 토큰이랑 postID
    sqlInsert = "insert into GroupMember (groupId, userId) values (?, ?)"
    getConnection((conn) => {
        conn.query(sqlInsert, params, function(err, rows){
            if (err){
                console.log("에러 발생 on chat.insertChatList");
                console.log(err);
            }
            res.json({
                'code': 308,
                'message': "유저 채팅룸 생성 성공"
            });
            console.log("유저 채팅룸 생성 성공");
        });

        conn.release();
      });
}

//처음 생성된 소켓이면 insertChatLatest, 존재하는 소켓이면 updateChatLatest
checkChatLatest=(req, res)=>{//채팅 전송할 때마다 토큰 받아서 검증하고 //userId랑 groupId 받아서 latest랑 latestContent 갱신하기
    /*let token = req.body.token;*/
    let groupId = req.body.groupId;
    let token = "";
    var payload = await checkGoogleJWT.verify(token);
    console.log("userId: ", payload['sub']);
    
    sqlCheck= "select * from LatestChat where groupId = ?";
    getConnection((conn) => {
        conn.query(sqlCheck, groupId, function(err, rows){
            if (err){
                console.log("에러 발생 on chat.checkChatLatest");
                console.log(err);
            }

            if (rows.length === 0){
                console.log("처음 보내는 문자");//-> insert(이건 내부 db로 확인해도 되겠다)
                insertChatLatest(payload, groupId, res);//이게 되는지 모르겠다
            }else{
                updateChatLatest(payload, groupId, res);
            }
        });

        conn.release();
      });
}

updateChatLatest=(payload, groupId, res)=>{//채팅 전송할 때마다 최근 채팅 내용 업데이트 하기
    console.log("userId: ", payload['sub']);
    sqlUpdate = "update LatestChat set latestContent = ?, latest = ? where groupId = ?";
    let params = [최근채팅, 시간, groupId];
    getConnection((conn) => {
        conn.query(sqlUpdate, params, function(err, rows){
            if (err){
                console.log("에러 발생 on chat.updateChatLatest");
                console.log(err);
            }
            var resultCode = 200;//성공하면 200으로
            var message = '성공'
            res.json({
                'code': resultCode,
                'message': message
            });
        });

        conn.release();
      });
}
//이놈의 insesrt를 소켓에서 해야하는건가..?
insertChatLatest=(payload, groupId, res)=>{//채팅 전송할 때마다 최근 채팅 내용 업데이트 하기
    console.log("userId: ", payload['sub']);
    
    sqlInsert= "insert into LatestChat (groupId, latestContent, latest) values (?, ?, ?)";
    let params = [groupId, 최근채팅, 시간];
    getConnection((conn) => {
        conn.query(sqlInsert, params, function(err, rows){
            if (err){
                console.log("에러 발생 on chat.updateChatLatest");
                console.log(err);
            }

            if (rows.length === 0){
                console.log("처음 보내는 문자");//-> insert(이건 내부 db로 확인해도 되겠다)
                insertChatLatest(payload, groupId, res);//이게 되는지 모르겠다
            }else{
                var resultCode = 200;//성공하면 200으로
                var message = '성공'
                res.json({
                    'code': resultCode,
                    'message': message
                });
            }
        });

        conn.release();
      });
}

module.exports={
    selectChatList,
    insertUser,
    insertChatListCheck,
    checkChatLatest,
    updateChatLatest,
    insertChatLatest
};