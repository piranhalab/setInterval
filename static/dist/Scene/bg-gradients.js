import { Users } from "../Users.js";
export const bgGradient = {
    //0: "background: rgb(238,174,202); background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,157,233,1) 100%);",
    grads: {
        0: "radial-gradient(circle, rgba(155,130,179,1) 0%, rgba(201,164,201,1) 100%)",
        1: "radial-gradient(circle, rgba(156,187,184,1) 0%, rgba(138,182,201,1) 100%)",
        2: "radial-gradient(circle, rgba(217,146,161,1) 0%, rgba(139,153,230,1) 100%)",
        3: "linear-gradient(90deg, rgba(146,217,205,1) 0%, rgba(143,157,236,1) 81%)",
        4: "linear-gradient(90deg, rgba(146,217,205,1) 0%, rgba(224,236,143,1) 85%)",
        5: "linear-gradient(90deg, rgba(197,148,171,1) 18%, rgba(114,179,217,1) 51%, rgba(155,136,235,1) 100%)",
        6: "linear-gradient(90deg, rgba(148,196,197,1) 18%, rgba(165,202,174,1) 27%, rgba(145,162,209,1) 38%, rgba(200,208,102,1) 50%, rgba(173,114,217,1) 57%, rgba(114,217,206,1) 75%, rgba(209,217,114,1) 82%, rgba(114,172,217,1) 87%)",
        7: "linear-gradient(90deg, rgba(0,0,0,1) 6%, rgba(0,0,0,1) 87%)",
        8: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)",
        9: "linear-gradient(90deg, rgba(143,143,143,1) 0%, rgba(117,117,117,1) 100%)"
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
