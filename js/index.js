"use strict";

let startDate = null;
let showingSince = null;
let pauseSince = null;
let currentPartIndex = 0;

// Timer ticks in milliseconds
const TIMER_INTERVAL = 1000;

const TICKS_IN_INTERVAL = Math.round(AVERAGE_WORD_PERIOD / TIMER_INTERVAL);
const WORD_PROBABILITY = 1 / TICKS_IN_INTERVAL;

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

function updateTime() {
  const delta = Date.now() - startDate;
  const displayTime = convertTime(delta);

  $("#time").text(displayTime);
}

function timerTick() {
  updateTime();
  updateWordDisplay();
}

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getWord() {
  console.log(wordsData[currentPartIndex]);

  const end_time = wordsData[currentPartIndex].end_time;
  if (end_time != null) {
    const end_time_data = end_time.split(":");
    const minutes = end_time_data[0];
    const seconds = end_time_data[1];
    const end_time_milliseconds =
      (parseInt(minutes) * 60 + parseInt(seconds)) * 1000;

    if (Date.now() - startDate > end_time_milliseconds) {
      currentPartIndex++;
    }

    const words = wordsData[currentPartIndex].words;

    if (words.length > 0) {
      if (Math.random() > WORD_PROBABILITY) {
        return null;
      }

      const wordIndex = randomInteger(0, words.length - 1);
      return words[wordIndex];
    }

    return null;
  }

  return "Art";
}

function updateWordDisplay() {
  if (showingSince != null) {
    if (Date.now() - showingSince > DISPLAY_TIME) {
      $("#words").hide();
      showingSince = null;
      pauseSince = Date.now();
    }
  } else if (pauseSince != null) {
    if (Date.now() - pauseSince > PAUSE_TIME) {
      pauseSince = null;
    }
  }

  if (showingSince == null && pauseSince == null) {
    const word = getWord();

    if (word != null) {
      $("#words").text(word);
      $("#words").show();
      showingSince = Date.now();
    }
  }
}

$("document").ready(() => {
  $("#startButton").click(() => {
    startDate = Date.now();
    $("#startButton").hide();
    setInterval(() => timerTick(), TIMER_INTERVAL);
  });

  $("#toggleTimeDisplay").click(() => {
    $("#time").toggle();
  });
});
