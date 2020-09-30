import { User, Users } from "./Users.js";
import { Environment, retrieveData } from "./Environment.js";
import { check, checkName, checkPos, checkRot, checkProp, checkChatdata } from "./Validation.js";
import { API } from "./API.js";
export const Server = {
    socket: null,
    reconnect: true,
    init: function () {
        let { nickname, uuid } = retrieveData();
        let pos = Environment.initialPos;
        let rot = Environment.initialRot;
        let room = Environment.room;
        let user = new User({
            uuid: uuid,
            nickname: nickname,
            pos: pos,
            rot: rot,
            room: room
        });
        const socket = io("http://192.168.1.131:3000", {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 99999,
            query: `uuid=${user.uuid}&room=${user.room}&nickname=${user.nickname}&pos=${JSON.stringify(user.pos)}&rot=${JSON.stringify(user.rot)}`
        });
        Users.me = user;
        socket.on("connect", function (conn) {
            Server.socket = socket;
            dispatchEvent(Users.me.add);
            socket.on("add", function (data) {
                let res = check(data);
                if (!res)
                    return;
                let { room, pos, rot, nickname, uuid, props } = res;
                if (!Users.hasOwnProperty(uuid) && Users.me.uuid != uuid) {
                    let user = new User({
                        uuid: uuid,
                        nickname: nickname,
                        pos: pos,
                        rot: rot,
                        room: room,
                        props: props
                    });
                    Users[uuid] = user;
                    dispatchEvent(user.add);
                }
            });
            socket.on("leave", function (uuid) {
                if (Users.me.uuid == uuid)
                    return;
                dispatchEvent(Users[uuid].leave);
                delete Users[uuid];
            });
            socket.on("rename", function (data) {
                let res = checkName(data);
                if (!res)
                    return;
                let { uuid, nickname } = res;
                Users[uuid].rename.detail.oldName = Users[uuid].nickname;
                Users[uuid].nickname = nickname;
                dispatchEvent(Users[uuid].rename);
            });
            socket.on("move", function (data) {
                let res = checkPos(data);
                if (!res)
                    return;
                let { uuid, pos } = res;
                Users[uuid].move.detail.pos = pos;
                Users[uuid].pos = pos;
                dispatchEvent(Users[uuid].move);
            });
            socket.on("rotate", function (data) {
                let res = checkRot(data);
                if (!res)
                    return;
                let { uuid, rot } = res;
                Users[uuid].rotate.detail.rot = rot;
                Users[uuid].rot = rot;
                dispatchEvent(Users[uuid].rotate);
            });
            socket.on("change", function (data) {
                let res = checkProp(data);
                if (!res)
                    return;
                let { uuid, prop, value } = res;
                if (Users.me.uuid != uuid) {
                    Users[uuid].change.detail.prop = prop;
                    Users[uuid].change.detail.value = value;
                    Users[uuid].props[prop] = value;
                    dispatchEvent(Users[uuid].change);
                }
            });
            socket.on("chat", function (data) {
                let res = checkChatdata(data);
                if (!res)
                    return false;
                let { uuid, msg } = res;
                let chatEvent = new CustomEvent("chat", {
                    detail: {
                        uuid: uuid,
                        msg: msg
                    }
                });
                dispatchEvent(chatEvent);
            });
            socket.on('api', function (data) {
                if (!Environment.api)
                    return;
                if (API[data[0]]) {
                    API[data[0]](data.slice(1));
                }
            });
            socket.on('disconnect', function () {
                console.info("disconnected, retrying...");
            });
        });
    },
    disconnect: function () {
    }
};
window.Server = Server;
window.addEventListener("renameUser", function (event) {
    const uuid = event.detail.uuid;
    let oldName = event.detail.oldName;
    if (uuid == "me" && Server.socket) {
        Server.socket.emit("rename", Users[uuid].nickname);
    }
});
window.addEventListener("moveUser", function (event) {
    const uuid = event.detail.uuid;
    let pos = event.detail.pos;
    if (uuid == "me" && Server.socket) {
        Server.socket.emit("move", [pos.x, pos.y, pos.z]);
    }
});
window.addEventListener("rotateUser", function (event) {
    const uuid = event.detail.uuid;
    let rot = event.detail.rot;
    if (uuid == "me" && Server.socket) {
        Server.socket.emit("rotate", [rot.x, rot.y, rot.z]);
    }
});
window.addEventListener("changeUser", function (event) {
    const uuid = event.detail.uuid;
    let prop = event.detail.prop;
    let value = event.detail.value;
    if (uuid == "me" && Server.socket) {
        Server.socket.emit("change", [prop, value]);
    }
});
window.addEventListener("chat", function (event) {
    const uuid = event.detail.uuid;
    let msg = event.detail.msg;
    if (uuid == "me" && Server.socket) {
        Server.socket.emit("chat", msg);
    }
});
