function checkName(uuid, nickname) {
    if (uuid == Users[uuid].nickname)
        return false;
    return true;
}
function checkPos(uuid, pos) {
    if (!(pos.hasOwnProperty('x')) ||
        !(pos.hasOwnProperty('y')) ||
        !(pos.hasOwnProperty('z')) ||
        !(typeof pos.x == "number") ||
        !(typeof pos.y == "number") ||
        !(typeof pos.z == "number") ||
        (pos == Users[uuid].pos))
        return false;
    return true;
}
function checkRot(uuid, rot) {
    if (!(rot.hasOwnProperty('x')) ||
        !(rot.hasOwnProperty('y')) ||
        !(rot.hasOwnProperty('z')) ||
        !(typeof rot.x == "number") ||
        !(typeof rot.y == "number") ||
        !(typeof rot.z == "number") ||
        (rot == Users[uuid].rot))
        return false;
    return true;
}
export class User {
    constructor({ uuid = "", nickname = "", pos = {}, rot = {}, room }) {
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
            avatar: 0,
            pass: 0
        };
        this.add = new CustomEvent('addUser', {
            detail: { uuid: uuid }
        });
        this.leave = new CustomEvent('removeUser', {
            detail: {
                uuid: this.uuid,
                nickname: this.nickname,
                pos: this.pos,
                rot: this.rot,
                room: this.room,
            }
        });
        this.rename = new CustomEvent('renameUser', {
            detail: {
                uuid: uuid,
                oldName: nickname
            }
        });
        this.move = new CustomEvent('moveUser', {
            detail: {
                uuid: uuid,
                pos: pos
            }
        });
        this.rotate = new CustomEvent('rotateUser', {
            detail: {
                uuid: uuid,
                rot: rot
            }
        });
        this.change = new CustomEvent('changeUser', {
            detail: {
                uuid: uuid,
                prop: "",
                value: ""
            }
        });
    }
}
export const Users = new Proxy({}, {
    get: function (target, uuid) {
        return target[uuid];
    },
    set: function (target, uuid, user) {
        /*
        if(target.hasOwnProperty(uuid)){
            return false
        }*/
        if (uuid == 'me') {
            user.add.detail.uuid = 'me';
            user.rename.detail.uuid = 'me';
            user.leave.detail.uuid = 'me';
            user.change.detail.uuid = 'me';
            user.move.detail.uuid = 'me';
            user.rotate.detail.uuid = 'me';
            user.change.detail.uuid = 'me';
            target[uuid] = new Proxy(user, {
                get: function (target, prop) {
                    if (prop == "pos") {
                        return new Proxy(target.pos, {
                            get: function (pos, prop) {
                                return pos[prop];
                            },
                            set: function (pos, prop, value) {
                                if (!pos.hasOwnProperty(prop) ||
                                    !(typeof value == "number"))
                                    return false;
                                pos[prop] = value;
                                target.move.detail.pos = pos;
                                dispatchEvent(target.move);
                                return true;
                            }
                        });
                    }
                    if (prop == "rot") {
                        return new Proxy(target.rot, {
                            get: function (rot, prop) {
                                return rot[prop];
                            },
                            set: function (rot, prop, value) {
                                if (!rot.hasOwnProperty(prop) ||
                                    !(typeof value == "number"))
                                    return false;
                                rot[prop] = value;
                                target.move.detail.rot = rot;
                                dispatchEvent(target.rotate);
                                return true;
                            }
                        });
                    }
                    if (target.props.hasOwnProperty(prop))
                        return target.props[prop];
                    return target[prop];
                },
                set: function (target, prop, value) {
                    if (prop == 'uuid' || prop == 'room')
                        return false;
                    if (prop == 'nickname' && target.nickname != value) {
                        target.rename.detail.oldName = target.nickname;
                        target.nickname = value;
                        dispatchEvent(target.rename);
                        return true;
                    }
                    else if (prop == 'pos' && target.pos != value) {
                        if (!checkPos('me', value))
                            return;
                        target.pos = value;
                        target.move.detail.pos = value;
                        dispatchEvent(target.move);
                        return true;
                    }
                    else if (prop == 'rot' && target.rot != value) {
                        console.debug(checkRot('me', value), "asdfsdfdsf");
                        if (!checkRot('me', value))
                            return;
                        target.rot = value;
                        target.rotate.detail.rot = value;
                        dispatchEvent(target.rotate);
                        return true;
                    }
                    target.props[prop] = value;
                    target.change.detail.prop = prop;
                    target.change.detail.value = value;
                    dispatchEvent(target.change);
                    return true;
                }
            });
        }
        else {
            target[uuid] = user;
        }
        return true;
    },
    has: function (target, prop) {
        return target.hasOwnProperty(prop);
    }
});
window.Users = Users;
window.addEventListener("addUser", function (event) {
    const uuid = event.detail.uuid;
    console.info(`User '${Users[uuid].nickname}' (${uuid}) enter.`);
});
window.addEventListener("removeUser", function (event) {
    const uuid = event.detail.uuid;
    const nickname = event.detail.uuid;
    console.info(`User '${Users[uuid].nickname}' (${uuid}) left.`);
});
window.addEventListener("renameUser", function (event) {
    const uuid = event.detail.uuid;
    let oldName = event.detail.oldName;
    if (!(uuid == "me"))
        console.info(`\tUser '${oldName}' (${uuid}) renamed to ${Users[uuid].nickname}`);
});
window.addEventListener("changeUser", function (event) {
    const uuid = event.detail.uuid;
    let prop = event.detail.prop;
    let value = event.detail.value;
    console.debug("chasdf", prop, value);
    if (!(uuid == "me"))
        console.info(`\tUser '${Users[uuid].nickname}' (${Users[uuid].uuid}) changed ${prop} to ${value}`);
});
