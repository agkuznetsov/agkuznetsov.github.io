"use strict";

let startDate = null;
let silenceSince = null;
let started = false;

function convertTime(delta) {
  let minutes = Math.floor(delta / 60000);
  let seconds = ((delta % 60000) / 1000).toFixed(0);
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
}

$("document").ready(() => {
  $("#dbLevel").change(() => {
    $("#dbLevelDisplay").text($("#dbLevel").val() + " db");

    if (!started) {
      started = true;
      startDate = Date.now();
      $("#words").show();
    } else {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
    }

    console.log($("#dbLevel").val());

    function detectSilence(
      stream,
      onSoundEnd = _ => {},
      onSoundStart = _ => {},
      silence_delay = 500,
      min_decibels = parseInt($("#dbLevel").val())
    ) {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      const streamNode = ctx.createMediaStreamSource(stream);
      streamNode.connect(analyser);
      analyser.minDecibels = min_decibels;

      const data = new Uint8Array(analyser.frequencyBinCount); // will hold our data
      let silence_start = performance.now();
      let triggered = false; // trigger only once per silence event

      function loop(time) {
        requestAnimationFrame(loop); // we'll loop every 60th of a second to check
        analyser.getByteFrequencyData(data); // get current data
        if (data.some(v => v)) {
          // if there is data above the given db limit
          if (triggered) {
            triggered = false;
            onSoundStart();
          }
          silence_start = time; // set it to now
        }
        if (!triggered && time - silence_start > silence_delay) {
          onSoundEnd();
          triggered = true;
        }
      }
      loop();
    }

    function onSilence() {
      console.log("silence");
      $("#words").text("Тишина");
      silenceSince = Date.now();
    }
    function onSpeak() {
      console.log("speaking");
      $("#words").text("Звук");
      silenceSince = null;
    }

    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then(stream => {
        detectSilence(stream, onSilence, onSpeak);
        window.localStream = stream;
      })
      .catch(console.error);
  });
});
