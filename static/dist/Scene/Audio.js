document.getElementById("startButton").addEventListener("click", function() {
  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then(stream => audioElement.srcObject = stream)
    .catch(err => log(err.name + ": " + err.message));
}, false);
