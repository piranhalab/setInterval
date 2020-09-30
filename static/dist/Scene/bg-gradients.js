import { Users } from "../Users.js";
export const bgGradient = {
    //0: "background: rgb(238,174,202); background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,157,233,1) 100%);",
    grads: {
        0: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,157,233,1) 100%)",
        1: "linear-gradient(315deg, rgba(174,207,238,1) 0%, rgba(176,148,233,1) 100%)",
        2: "radial-gradient(circle, rgba(48,246,255,1) 0%, rgba(120,118,253,1) 100%)"
    },
    init: function () {
        window.addEventListener("changeUser", function (data) {
            let uuid = data.detail.uuid;
            let prop = data.detail.prop;
            let value = data.detail.value;
            if (Users[uuid].uuid != "01800-api-666")
                return;
            if (prop == "bg") {
                if (bgGradient.grads.hasOwnProperty(value)) {
                    document.body.style.backgroundImage = bgGradient.grads[value];
                }
            }
        });
        window.addEventListener("addUser", function (data) {
            let uuid = data.detail.uuid;
            if (Users[uuid].uuid != "01800-api-666") {
                return false;
            }
            document.body.style.backgroundImage = bgGradient.grads[Users[uuid].props.bg];
        });
    }
};
