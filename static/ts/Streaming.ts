export interface Streaming {
	init: Function
	startStreaming: CustomEvent
	engine?:any
}
declare global {
	interface Window{ player : any;}
}

declare const p2pml: any;
declare const Clappr 

export const Streaming:Streaming = {
	init: function(){
		let streamingCont = document.createElement('div');
		streamingCont.style.display = "none"
		streamingCont.id = "streaming-main"
		document.body.appendChild(streamingCont)
		const videoSrc = "http://127.0.0.1:8000/live/test/index.m3u8"
		
		let player = new Clappr.Player({
			source: videoSrc,
			mute: false,
			autoPlay: false,
			disableErrorScreen:true,
			events: {
				onError: function(e) {
					window.setTimeout(()=>	retry(),500)
				},
				onPlay: function(e){
					Streaming.startStreaming.detail.id = "streaming-main"
					dispatchEvent( Streaming.startStreaming )
				}
			}
		});


			
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
			 
		function retry(){
			player.configure(player.options)
			player.play();
		}
		window.player = player
		player.attachTo(streamingCont)
		
		window.document.body.addEventListener("click",function(){
			player.play()
		})

	},
	startStreaming: new CustomEvent("startStream",{detail: { id: "streaming-main"}})
}

