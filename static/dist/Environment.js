import { Users } from "./Users.js";
export const Environment = {
    room: "edges",
    initialPos: { x: 0, y: 14, z: 0 },
    initialRot: { x: 0, y: 0, z: 0 },
    api: false
};
export function retrieveData() {
    let params = {};
    // get params from local Storage
    let uuid = localStorage.getItem("uuid");
    let nickname = localStorage.getItem("nickname");
    let props = localStorage.getItem("props");
    if (!uuid || uuid.length != 13) {
        uuid = Math.random().toString(16).substr(2);
    }
    if (!nickname) {
        nickname = `anon-${Math.random().toString(16).substr(2, 4)}`;
    }
    if (props) {
        try {
            props = JSON.parse(props);
        }
        catch (e) {
            props = {};
        }
    }
    let url = new URL(window.location.href);
    let api = url.searchParams.get("api");
    let nickname_url = url.searchParams.get("nickname");
    let props_url = url.searchParams.get("props");
    if (nickname_url) {
        nickname = nickname_url;
    }
    if (props_url) {
        try {
            props_url = JSON.parse(nickname_url);
        }
        catch (e) {
            props_url = {};
        }
    }
    if (api) {
        Environment.api = true;
        uuid = "01800-api-666";
    }
    props = props_url;
    localStorage.setItem("uuid", uuid);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("props", props);
    return {
        uuid: uuid,
        nickname: nickname,
        props: props
    };
}
window.addEventListener("renameUser", function (event) {
    const uuid = event.detail.uuid;
    if (uuid == "me") {
        localStorage.setItem("nickname", Users.me.nickname);
    }
});
window.addEventListener("changeUser", function (event) {
    const uuid = event.detail.uuid;
    let prop = event.detail.prop;
    let value = event.detail.value;
    if (uuid == "me") {
        let props = localStorage.getItem("props");
        if (!props) {
            try {
                props = JSON.parse(props);
            }
            catch (e) {
                props = {};
            }
        }
        else {
            props = {};
        }
        props[prop] = value;
        localStorage.setItem("props", JSON.stringify(props));
    }
});
