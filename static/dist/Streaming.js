export const Streaming = {
    init: function () {
        let streamingCont = document.createElement('div');

	// let streamingCont = document.createElement('div');
        streamingCont.style.display = "none";
        streamingCont.id = "streaming-main";

	//streamingCont.style.display = "block";
	//streamingCont.style.position = "absolute";
	//streamingCont.style.top = "0%";
	//streamingCont.style.zIndex = "-2"; 
        //streamingCont.id = "streaming-main";
	
        document.body.appendChild(streamingCont);
        //const videoSrc = "http://127.0.0.1:8000/live/test/index.m3u8";

	    if (flvjs.isSupported()) {
		var videoElement = document.getElementById('videooo');
		var flvPlayer = flvjs.createPlayer({
		    type: 'flv',
		    url: 'http://157.245.123.52/live?port=1935&app=selma_trans&stream=app'
		});
		flvPlayer.attachMediaElement(videoElement);
		flvPlayer.load();
		flvPlayer.play();
	    }
	/*	
        const videoSrc = "http://198.211.106.132:8000/live/test/index.m3u8";
        let player = new Clappr.Player({
            source: videoSrc,
            mute: false,
            autoPlay: false,
            disableErrorScreen: true,
            events: {
                onError: function (e) {
                    window.setTimeout(() => retry(), 500);
                },
                onPlay: function (e) {
                    Streaming.startStreaming.detail.id = "streaming-main";
                    dispatchEvent(Streaming.startStreaming);
                }
            }
        });
	*/
 
        /*
            
        if (p2pml.hlsjs.Engine.isSupported()) {
            let engine = new p2pml.hlsjs.Engine();
            p2pml.hlsjs.initClapprPlayer(player);

            player.options.playback = {
                hlsjsConfig: {
                    liveSyncDurationCount: 7,
                    loader: engine.createLoaderClass()
                }
            }
        }
         */
        function retry() {
         //   player.configure(player.options);
         //   player.play();
        }
       //window.player = player;
       // player.attachTo(streamingCont);
	let comoSea = streamingCont.querySelector("video");
	// comoSea.style.display = "none";
       //window.document.body.addEventListener("click", function () {
       //     player.play();
       // });
    },
    startStreaming: new CustomEvent("startStream", { detail: { id: "videooo" } })
};
