const getConnection = require('../../config/db');

selectProfile=(req, res)=>{
    sqlSelect= "select * from ChatRoomList where userId = ?"
    getConnection((conn) => {
        conn.query(sqlSelect, payload['sub'], function(err, rows){
            res.json({
                'data': rows,//select한 정보 보냄
                'code': resultCode,
                'message': message
            });
        });

        conn.release();
      });
}

updateProfile=(req, res)=>{
    sqlSelect= "select * from ChatRoomList where userId = ?"
    getConnection((conn) => {
        conn.query(sqlSelect, payload['sub'], function(err, rows){
            res.json({
                'data': rows,//select한 정보 보냄
                'code': resultCode,
                'message': message
            });
        });

        conn.release();
      });
}

module.exports={
    selectProfile,
    updateProfile
};