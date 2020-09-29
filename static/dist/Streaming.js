export const Streaming = {
    init: function () {
        document.querySelector("#info").click();
        document.querySelector("#close-info").addEventListener("click", function () {
            if (flvjs.isSupported()) {
                let flvPlayer = flvjs.createPlayer({
                    type: "flv",
                    isLive: true,
                    url: 'https://edges.piranhalab.cc/live'
                });
                flvPlayer.attachMediaElement(document.querySelector('#streaming-video'));
                flvPlayer.load();
                flvPlayer.play();
                flvPlayer.on('error', function (err) {
                    if (err === "NetworkError") {
                        flvPlayer.unload();
                        flvPlayer.load();
                        flvPlayer.play();
                    }
                });
                let evt = new CustomEvent("startStream", { detail: { id: "streaming-video" } });
                dispatchEvent(evt);
            }
        });
    },
    startStreaming: new CustomEvent("startStream", { detail: { id: "streaming-video" } })
};
