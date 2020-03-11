"use strict";

// Time to display word in milliseconds
const DISPLAY_TIME = 3000;

// Garantueed silence time after word display in milliseconds
const PAUSE_TIME = 2000;

// Average period for apperance of one word in milliseconds
const AVERAGE_WORD_PERIOD = 10 * 1000;

const wordsData = [
  { name: "часть 1", words: [], start_time: "00:00", end_time: "00:35" },
  {
    name: "часть 2",
    words: [
      "восхитительно",
      "класс",
      "круто",
      "это топ",
      "блеск",
      "кайф",
      "мега",
      "супер",
      "ты супер",
      "это нормально",
      "ты лучшая",
      "вау",
      "ура",
      "ооооо еееее",
      "интересно",
      "точно!"
    ],
    start_time: "00:35",
    end_time: "04:25"
  },
  {
    name: "часть 3",
    words: ["проснулись улыбнулись", "доброе утро", "соня"],
    start_time: "04:25",
    end_time: "05:05"
  },
  { name: "часть 4", words: [], start_time: "05:05", end_time: "10:35" },
  {
    name: "часть 5",
    words: [
      "баю бай",
      "потянушки потягушки",
      "сладких снов",
      "сон в руку",
      "ранняя пташка",
      "гасите свечи",
      "счастье радость",
      "полежи",
      "прикол",
      "плюсую",
      "слава богу",
      "дела"
    ],
    start_time: "10:35",
    end_time: "12:55"
  },
  { name: "часть 6", words: [], start_time: "12:55", end_time: "13:55" },
  {
    name: "часть 7",
    words: [
      "крыса",
      "бык",
      "тигр",
      "кролик кот",
      "дракон",
      "змея",
      "лошадь",
      "коза овца",
      "обезьяна",
      "петух",
      "собака",
      "свинья кабан"
    ],
    start_time: "13:55",
    end_time: "16:00"
  },
  { name: "часть 8", words: [], start_time: "16:00", end_time: "17:15" },
  { name: "часть 9", words: [], start_time: "17:15", end_time: "20:30" },
  { name: "часть 10", words: [], start_time: "20:30", end_time: "25:00" },
  {
    name: "часть 11",
    words: [
      "сто триллионов миллиардов лет",
      "бесконечно вечное",
      "почти пять миллиардов лет",
      "сотни триллионов",
      "одну маленькую песчиночку"
    ],
    start_time: "25:00",
    end_time: "28:00"
  },
  { name: "часть 12", words: [], start_time: "28:00" }
];
