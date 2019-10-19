var express = require('express');
var app = express();
//用http模块创建server
var server = require('http').createServer(app);
//创建服务端socket
var io = require('socket.io')(server);

var userNo = 0 //用户ID,模拟用用户名

// 监听客户端的socket链接
io.on('connect', function (socket) {
    var user = (++userNo);
    io.emit("msg-from-server", user + ':------>上线了')


    // 监听socket链接断开事件
    socket.on('disconnect', function () {
        io.emit("msg-from-server", user + ':------>下线了')
    });

    // 监听客户信息,接收客户端的消息
    socket.on("msg-from-client", function (data) {
        // 向客户发消息
        io.emit("msg-from-server", user + ": " + data)
    })
});
// 静态资源目录
app.use(express.static('public'));

server.listen('8000', function () {
    console.log("server is running on 8000")
})
