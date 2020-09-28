import * as redisAdapter from 'socket.io-redis'
import * as socketio from "socket.io"
const http = require("http")
import { Server } from 'node-osc';
const httpserver = http.createServer()
const io = socketio(httpserver)
io.adapter(redisAdapter({ host: '172.20.10.2', port: 6379 }));

const oscServer = new Server(3333, '0.0.0.0', () => {
	console.log('OSC Server is listening');
});
 
oscServer.on('message', function (msg) {
	let dir = msg[0]
	let room = msg[1]
	let data = msg.slice(2)
	io.to(room).emit("api", [dir, data])
});

httpserver.listen(4000)
