export const mElement = {
    init: function(){
	let fftSize = 2048 / 8;
	const listener = new THREE.AudioListener();
	let audio = new THREE.Audio( listener );
	steinReact.audio = audio; 
	audio.setMediaElementSource(  document.querySelector("#streaming-video") );
	let analyser = new THREE.AudioAnalyser( audio, fftSize );
	this.analyser = analyser; 
    }
}
