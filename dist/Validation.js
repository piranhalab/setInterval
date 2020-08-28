"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChat = exports.checkProp = exports.checkRot = exports.checkPos = exports.checkName = exports.check = void 0;
const Users_js_1 = require("./Users.js");
//
//  validation for incoming data as we don't trust websocket incoming messages
function check(data) {
    if (!data)
        return false;
    if (!(Array.isArray(data)) ||
        data.length != 9)
        return false;
    const uuid = data[0];
    const nickname = data[1];
    const pos = {
        x: data[2],
        y: data[3],
        z: data[4],
    };
    const rot = {
        x: data[5],
        y: data[6],
        z: data[7],
    };
    const room = data[8];
    if (!(typeof uuid === "string") ||
        !(typeof nickname === "string" && nickname.length > 0 && nickname.length < 30) ||
        !(typeof room === "string") ||
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
    return {
        uuid: uuid,
        nickname: nickname,
        room: room,
        pos: pos,
        rot: rot
    };
}
exports.check = check;
function checkName(data) {
    if (!(Array.isArray(data) && data.length == 2) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "string" && data[1].length > 0 && data[1].length < 30))
        return false;
    let uuid = data[0];
    let nickname = data[1];
    if (!Users_js_1.Users.hasOwnProperty(uuid))
        return false;
    if (uuid == Users_js_1.Users.me.uuid)
        return false;
    if (nickname == Users_js_1.Users[uuid].nickname)
        return false;
    return { nickname: nickname, uuid: uuid };
}
exports.checkName = checkName;
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
        z: data[3]
    };
    if (!Users_js_1.Users.hasOwnProperty(uuid))
        return false;
    if (uuid == Users_js_1.Users.me.uuid)
        return false;
    if (pos == Users_js_1.Users[uuid].pos)
        return false;
    return {
        uuid: uuid,
        pos: pos
    };
}
exports.checkPos = checkPos;
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
        z: data[3]
    };
    if (!Users_js_1.Users.hasOwnProperty(uuid))
        return false;
    if (uuid == Users_js_1.Users.me.uuid)
        return false;
    if (rot == Users_js_1.Users[uuid].rot)
        return false;
    return {
        uuid: uuid,
        rot: rot
    };
}
exports.checkRot = checkRot;
function checkProp(data) {
    if (!(Array.isArray(data) && data.length == 3) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "string"))
        return false;
    let uuid = data[0];
    let prop = data[1];
    let value = data[2];
    if (!Users_js_1.Users.hasOwnProperty(uuid))
        return false;
    if (uuid == Users_js_1.Users.me.uuid)
        return false;
    if (!Users_js_1.Users[uuid].props.hasOwnProperty(prop))
        return false;
    if (value == Users_js_1.Users[uuid].props[prop])
        return false;
    return {
        uuid: uuid,
        prop: prop,
        value: value
    };
}
exports.checkProp = checkProp;
function checkChat(data) {
    if (!(Array.isArray(data) && data.length == 2) ||
        !(typeof data[0] === "string" && data[0].length == 13) ||
        !(typeof data[1] === "string"))
        return false;
    let uuid = data[0];
    let msg = data[1];
    if (uuid == Users_js_1.Users.me.uuid)
        return false;
    if (msg.length > 200)
        return false;
    return {
        uuid: uuid,
        msg: msg
    };
}
exports.checkChat = checkChat;
//# sourceMappingURL=Validation.js.map