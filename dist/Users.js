"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.User = void 0;
class User {
    constructor({ uuid = "", nickname = "", pos = {}, rot = {}, room, conn }) {
        if (!pos.hasOwnProperty('x') || !(typeof pos.x === 'number') ||
            !pos.hasOwnProperty('y') || !(typeof pos.y === 'number') ||
            !pos.hasOwnProperty('z') || !(typeof pos.z === 'number')) {
            pos = { x: 0, y: 0, z: 0 };
        }
        if (!rot.hasOwnProperty('x') || !(typeof rot.x === 'number') ||
            !rot.hasOwnProperty('y') || !(typeof rot.y === 'number') ||
            !rot.hasOwnProperty('z') || !(typeof rot.z === 'number')) {
            rot = { x: 0, y: 0, z: 0 };
        }
        if (!room) {
            room = "default";
        }
        if (!uuid || uuid.length != 13) {
            uuid = Math.random().toString(16).substr(2);
        }
        this.uuid = uuid;
        this.nickname = nickname;
        this.pos = pos;
        this.rot = rot;
        this.room = room;
        this.props = {
            avatar: 0
        };
        this.conn = conn;
    }
}
exports.User = User;
exports.Users = [];
//# sourceMappingURL=Users.js.map