"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socketio = require("socket.io");
const Users_1 = require("./Users");
const redisAdapter = require("socket.io-redis");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
app.use('/', express.static('static/'));
function check(query) {
    if (!query.hasOwnProperty('nickname') ||
        !query.hasOwnProperty('pos') ||
        !query.hasOwnProperty('rot') ||
        !query.hasOwnProperty('room') ||
        !query.hasOwnProperty('uuid'))
        return false;
    let { room, pos, rot, nickname, uuid } = query;
    try {
        pos = JSON.parse(pos);
        rot = JSON.parse(rot);
    }
    catch (e) {
        return false;
    }
    if (!(typeof nickname === "string") ||
        !(typeof room === "string") ||
        !(typeof uuid === "string") ||
        !(uuid.length == 13))
        return false;
    if (!pos.hasOwnProperty('x') || !(typeof pos.x === 'number') ||
        !pos.hasOwnProperty('y') || !(typeof pos.y === 'number') ||
        !pos.hasOwnProperty('z') || !(typeof pos.z === 'number'))
        return false;
    if (!rot.hasOwnProperty('x') || !(typeof rot.x === 'number') ||
        !rot.hasOwnProperty('y') || !(typeof rot.y === 'number') ||
        !rot.hasOwnProperty('z') || !(typeof rot.z === 'number'))
        return false;
    return { room: room, rot: rot, pos: pos, nickname: nickname, uuid: uuid };
}
function checkName(data) {
    if (!(Array.isArray(data) && data.length == 2) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "string"))
        return false;
    let uuid = data[0];
    let nickname = data[1];
    if (nickname == Users_1.Users[uuid].nickname)
        return false;
    return { nickname: nickname, uuid: uuid };
}
function checkPos(data) {
    if (!(Array.isArray(data) && data.length == 4) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "number") ||
        !(typeof data[2] === "number") ||
        !(typeof data[3] === "number"))
        return false;
    let uuid = data[0];
    let pos = {
        x: data[1],
        y: data[2],
        z: data[3],
    };
    if (pos == Users_1.Users[uuid].pos)
        return false;
    return {
        uuid: uuid,
        pos: pos
    };
}
function checkRot(data) {
    if (!(Array.isArray(data) && data.length == 4) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "number") ||
        !(typeof data[2] === "number") ||
        !(typeof data[3] === "number"))
        return false;
    let uuid = data[0];
    let rot = {
        x: data[1],
        y: data[2],
        z: data[3],
    };
    if (rot == Users_1.Users[uuid].rot)
        return false;
    return {
        uuid: uuid,
        rot: rot
    };
}
function checkProp(data) {
    if (!(Array.isArray(data) && data.length == 3) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "string"))
        return false;
    let uuid = data[0];
    let prop = data[1];
    let value = data[2];
    if (!Users_1.Users[uuid].props.hasOwnProperty(prop))
        return false;
    if (value == Users_1.Users[uuid].props[prop])
        return false;
    return {
        uuid: uuid,
        prop: prop,
        value: value
    };
}
io.on('connection', function (conn) {
    let res = check(conn.handshake.query);
    if (!res) {
        return;
    }
    let { room, pos, rot, nickname, uuid } = res;
    let user = new Users_1.User({
        uuid: uuid,
        nickname: nickname,
        pos: pos,
        rot: rot,
        room: room,
        conn: conn
    });
    Users_1.Users[uuid] = user;
    conn.join(room);
    console.info(`User '${nickname}' (${uuid}) enter.`);
    // tell everyone on its own that user camed
    io.to(room).emit("add", [uuid, nickname, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, room]);
    // tell everyone on other side that user camed
    io.of('/').adapter.customRequest([
        'add',
        [uuid, nickname, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, room]
    ], function (err, replies) {
        replies.forEach(function (reply) {
            reply.forEach(function (data) {
                // tell everyone on its own of other nodes
                conn.emit("add", data);
            });
        });
    });
    // tell about everyone on node
    Object.keys(Users_1.Users).forEach(function (_uuid) {
        let user = Users_1.Users[_uuid];
        if (user.uuid != uuid) {
            conn.emit("add", [
                user.uuid,
                user.nickname,
                user.pos.x,
                user.pos.y,
                user.pos.z,
                user.rot.x,
                user.rot.y,
                user.rot.z,
                user.room
            ]);
        }
    });
    conn.on('rename', function (data) {
        let res = checkName(data);
        if (!res)
            return;
        let { uuid, nickname } = res;
        console.info(`\tUser '${Users_1.Users[nickname]}' (${uuid}) renamed to '${nickname}'.`);
        Users_1.Users[uuid].nickname = nickname;
        io.to(room).emit("rename", [uuid, nickname]);
    });
    conn.on('move', function (data) {
        let res = checkPos(data);
        if (!res)
            return;
        let { uuid, pos } = res;
        Users_1.Users[uuid].pos = pos;
        io.to(room).emit("move", [uuid, pos.x, pos.y, pos.z]);
    });
    conn.on('rotate', function (data) {
        let res = checkRot(data);
        if (!res)
            return;
        let { uuid, rot } = res;
        Users_1.Users[uuid].rot = rot;
        io.to(room).emit("rotate", [uuid, rot.x, rot.y, rot.z]);
    });
    conn.on('change', function (data) {
        let res = checkProp(data);
        if (!res)
            return;
        console.debug("res change", res);
        let { uuid, prop, value } = res;
        Users_1.Users[uuid].props[prop] = value;
        io.to(room).emit("change", [uuid, prop, value]);
    });
    conn.on('disconnect', function () {
        console.info(`User '${nickname}' (${uuid}) left.`);
        io.to(room).emit("leave", uuid);
        delete Users_1.Users[uuid];
    });
});
io.of('/').adapter.customHook = function (data, cb) {
    let event = data[0];
    switch (event) {
        case "add":
            let uuid = data[1][0];
            if (!Users_1.Users.hasOwnProperty(uuid)) {
                let users = Object.keys(Users_1.Users).map(function (uuid) {
                    return [
                        Users_1.Users[uuid].uuid,
                        Users_1.Users[uuid].nickname,
                        Users_1.Users[uuid].pos.x,
                        Users_1.Users[uuid].pos.y,
                        Users_1.Users[uuid].pos.z,
                        Users_1.Users[uuid].rot.x,
                        Users_1.Users[uuid].rot.y,
                        Users_1.Users[uuid].rot.z,
                        Users_1.Users[uuid].room,
                    ];
                });
                cb(users);
            }
            else {
                cb([]);
            }
            break;
    }
};
const port = process.env.PORT ? process.env.PORT : 3000;
console.log(`starting server on port ${port}`);
server.listen(port);
//# sourceMappingURL=Server.js.map