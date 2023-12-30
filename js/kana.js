var index, correctCounter;
var mp3FilePath;
let number, hiragana, kanji, type, meaning, romaji;
var vocablist = [jlpt5, simpleNouns, anime];
var vocablistBasePath =
  "https://github.com/Ibanez2000/wandering/raw/main/files/japanese/";
var vocablistSelected;
var obj;

// First initialize

vocablistSelected = "jlpt5";

// initialize takes an object as a parameter!
initialize(jlpt5);

function selectChange() {
  if (document.getElementById("vocabulary").value == "jlpt5") {
    vocablistSelected = "jlpt5";
    initialize(jlpt5);
  }
  if (document.getElementById("vocabulary").value == "simpleNouns") {
    vocablistSelected = "simpleNouns";
    initialize(simpleNouns);
  }
  if (document.getElementById("vocabulary").value == "anime") {
    vocablistSelected = "anime";
    initialize(anime);
  }
}

function initialize(whichList) {
  index = 0;
  obj = whichList;

  readDataByIndex();
  updateElements();
}

function readDataByIndex() {
  number = obj[index].number;
  hiragana = obj[index].hiragana;
  kanji = obj[index].kanji;
  type = obj[index].type;
  meaning = obj[index].meaning;
  romaji = obj[index].romaji;
}

function updateElements() {
  document.getElementById("hiraganaTxt").innerHTML = hiragana;
  //   console.log(hiragana);
  document.getElementById("kanjiTxt").innerHTML = kanji;
  //   console.log(kanji);
  document.getElementById("meaningTxt").innerHTML = meaning;
  console.log(meaning);
  document.getElementById("romajiTxt").innerHTML = romaji;
  //   console.log(romaji);
  document.getElementById("userAnswerInp").value = "";
  document
    .getElementById("audiotest")
    .setAttribute(
      "src",
      vocablistBasePath + vocablistSelected + "/mp3/" + index + ".mp3"
    );
}

function visibilityToggle(element) {
  div = document.getElementById(element + "Div");
  btn = document.getElementById(element + "Btn");

  if (div.style.display == "none") {
    div.style.display = "block";
    btn.style.border = "solid";
  } else {
    div.style.display = "none";
    btn.style.border = "none";
  }
}

function focusUserAnswerInp() {
  document.getElementById("userAnswerInp").focus();
  document.getElementById("userAnswerInp").select();
}

function indexDecrease() {
  if (index > 0) {
    index--;
    readDataByIndex();
    updateElements();
  }
}

function indexIncrease() {
  if (index <= obj.length) {
    index++;
    readDataByIndex();
    updateElements();
  }
}

function reveal() {
  document.getElementById("userAnswerInp").value = romaji;
}

function answerSubmit() {
  console.log("answer was submitted");
  let adjusted = document.getElementById("userAnswerInp").value.toLowerCase();
  console.log(adjusted);

  let userAnswer = adjusted;

  console.log("userAnswer:" + userAnswer);
  console.log("correct romaji:" + romaji);

  if ((userAnswer == romaji) | (userAnswer == hiragana)| (userAnswer == kanji)) {
    // what to do if correct? -> just go to next entry
    playAudio();
    indexIncrease();
  } else {
    console.log("wrong answer");
  }
}


// for android, only keypress works! not keydown
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    answerSubmit();
  }
});

// // for physical keyboards
// document.addEventListener("keydown", function (event) {
//   // if (event.keyCode==13) {
//   //   answerSubmit();
//   // }

//   if (event.ctrlKey && event.key === " ") {
//     playAudio();
//   }
// });

function playAudio() {
  document.getElementById("audiotest").play();
}
