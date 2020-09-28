"use strict";
exports.__esModule = true;
var redisAdapter = require("socket.io-redis");
var socketio = require("socket.io");
var http = require("http");
var node_osc_1 = require("node-osc");
var httpserver = http.createServer();
var io = socketio(httpserver);
io.adapter(redisAdapter({ host: '127.0.0.1', port: 6379 }));
var oscServer = new node_osc_1.Server(3333, '0.0.0.0', function () {
    console.log('OSC Server is listening');
});
oscServer.on('message', function (msg) {
    var dir = msg[0];
    var room = msg[1];
    var data = msg.slice(2);
    console.debug(dir, room, data);
    io.to(room).emit("api", [dir, data]);
});
httpserver.listen(4000);
