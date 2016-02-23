var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    
    io.emit('new', socket.id)
    
    socket.broadcast.emit('hi');
    console.log('a user connected ', socket.id);
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        //console.log('user disconnect');
    });
    
    
    socket.on('move', function(msg) {
       //console.log(msg); 
       io.emit('move', msg);
    });
    
    
});

http.listen(port, function () {
    console.log('listening on *:3000');
});



