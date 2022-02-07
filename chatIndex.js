const express = require('express')
//var router = express.Router();

const path = require('path');
//const { send } = require('process');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

/*app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');*/

io.on('connection', function(socket){
  console.log('User Conncetion');

  socket.on('connect user', function(user){
    console.log("Connected user ");
    socket.join(user['roomName']);
    console.log("roomName : ",user['roomName']);
    console.log("state : ",socket.adapter.rooms);
    io.emit('connect user', user);
  });


  socket.on('on typing', function(typing){
    console.log("Typing.... ");
    io.emit('on typing', typing);
  });

  
  socket.on('chat message', function(msg){
    console.log("Message " + msg['message']);
    console.log(msg['roomName'] + "에서 보내는 메세지 : " + msg['script']);
    io.to(msg['roomName']).emit('chat message', msg);
  });
});


http.listen(app.get('port'), function() {
  console.log('chat is running on port ', app.get('port'));
});

/*router.get('/', function (req, res){
  res.send('this is get from chatServer! Hey! port 3000');
});*/

app.get('/', function (req, res){
  res.send('this is get from chatServer! Hey! port 5000');
});

