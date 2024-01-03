// Read JSON to drillData

const dataURL =
  "https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/drillData/";

const vocabulary = ["JAanime", "JAsimpleNouns"];

function getDrillData(dataURL, vocabulary) {
  pathVocabulary = getJSONURL(dataURL);
  drillData = getJSONContents(pathVocabulary);
  return drillData;
}

function getJSONContents(pathVocabulary) {
  let drillData = [];
  pathVocabulary.forEach(function (item) {
    drillData.push(runProcess(item));
  });
  return drillData;
}

function getJSONURL(url) {
  let pathVocabulary = [];
  vocabulary.forEach(function (item) {
    pathVocabulary.push(dataURL + item + "/" + item + ".json");
  });
  return pathVocabulary;
}


// function gets url and returns the data array
function runProcessOne(url){






}
