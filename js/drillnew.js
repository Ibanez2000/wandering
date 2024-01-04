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

const array = [fetch(path[0]), fetch(path[1])];

async function makeRequests() {
  try {
    const responses = await Promise.all(array);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    main(data);
  } catch {
    console.error("Multiple fetch failed");
    alert("Fetching the vocabulary data failed.");
  }
}

makeRequests();

// Reminder: we cannot continue with code on the top level because we don't know when makeRequests finishes, so we have to initiate everything else from within there

function main(data) {
  // let dataNew = data;

  dataNew = data;


 keys = Object.keys(dataNew);


  
  console.log(dataNew.keys());

  dataNew.forEach(function (item) {
    // console.log(item.keys());

    designation = "";

    // console.log(item.JAanime);
  });

  vocab = [];

  // for each element

  //console.log(dataNew);
  // createVocabularySelector();
  // console.log("hello");

  createVocabularySelector(dataNew);

  // console.log(vocSelected);
}

function createVocabularySelector(dataNew) {
  const options = dataNew.map((obj) => Object.keys(obj)[0]);

  var vocabularySelectorSelect = document.createElement("select");
  vocabularySelectorSelect.setAttribute("id", "vocabularySelectorSelect");
  document
    .getElementById("fieldContainer")
    .appendChild(vocabularySelectorSelect);

  options.forEach(function (optionText) {
    var optionElement = document.createElement("option");
    optionElement.text = optionText;
    vocabularySelectorSelect.add(optionElement);
  });

  document.getElementById("vocabularySelectorSelect").onchange = vocSelected;
  vocSelected();
}

function vocSelected() {
  // console.log("new vocabulary selected");
  vocSelected = document.getElementById("vocabularySelectorSelect").value;
  // console.log(vocSelected);
}
