
const URL =
  "https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/drillData/";

const vocabulary = ["JAanime", "JAsimpleNouns"];

var obj = [];

path = getJSONURL(URL, vocabulary);

function getJSONURL(dataURL, vocabulary) {
  let path = [];
  vocabulary.forEach(function (item) {
    path.push(dataURL + item + "/" + item + ".json");
  });
  return path;
}

// const array = [fetch(path[0]), fetch(path[1])];

import data from 'https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/drillData/JAanime/JAanime.json' assert {type: 'json'};
console.log(data);