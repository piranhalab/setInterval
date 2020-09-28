export const Streaming = {
    init: function () {

	    if (flvjs.isSupported()) {
		var videoElement = document.getElementById('videooo');
		var flvPlayer = flvjs.createPlayer({
		    type: 'flv',
		    url: 'http://157.245.123.52/live?port=1935&app=selma_trans&stream=app'
		});
		flvPlayer.attachMediaElement(videoElement);
		flvPlayer.load();
		// flvPlayer.play();
	    }
    },
    startStreaming: new CustomEvent("startStream", { detail: { id: "videooo" } })
};
