export const Chat = {
    init: function () {
    },
    send: function (msg) {
        Chat.chat.detail.uuid = "me";
        Chat.chat.detail.msg = msg;
        dispatchEvent(Chat.chat);
    },
    receive: function (sender, msg) {
        console.info(`${sender} -> "${msg}"`);
    },
    log: function () {
    },
    chat: new CustomEvent("chat", {
        detail: {
            uuid: "me",
            msg: ""
        }
    }),
};
window.addEventListener("chat", function (event) {
    const uuid = event.detail.uuid;
    let msg = event.detail.msg;
    if (uuid != "me") {
        Chat.receive(uuid, msg);
    }
});
window.Chat = Chat;
