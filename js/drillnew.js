const URL =
  "https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/drillData/";

const vocabulary = ["JAanime", "JAsimpleNouns"];

var selectedVocabIndex;
var selectedVocabName;
const fieldAmount = 8; 
// find a way to read this from json

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
  dataNew = data;

  fieldDiv = createFields(fieldAmount);
  createVocabularySelector();
  vocSelected();
  contentField = initializeContentFields(dataNew);


}

function toggleDropdown(){
const dropdown = document.getElementById("dropdownContent");

dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";



}


function initializeContentFields(dataNew) {
  const dataSelectedVocab = dataNew[0][vocSelectedName][0];
  const fieldTypes = dataNew[0][vocSelectedName][0].fieldTypes;
  contentField = []

  for (let i = 0; i < Object.keys(fieldTypes).length; i++) {
    let fieldContent = fieldTypes["field" + i];
    let parentDiv = "field" + i + "Div";

    if (fieldContent == "text") {
      var element = document.createElement("p");
      element.innerHTML = "hello";
      element.setAttribute("id", "field" + i + "Text");
    }
    if (fieldContent == "picture") {
      var element = document.createElement("img");
      element.setAttribute("id", "field" + i + "Picture");
    }
    if (fieldContent == "audio") {
      var element = document.createElement("audio");
      element.setAttribute("id", "field" + i + "Audio");
    }

    document.getElementById(parentDiv).appendChild(element);
    contentField.push(element.id);
    
    
  }
  return contentField;
}

function visibilityToggle(element) {
  elementToToggle = document.getElementById(element);

  if (elementToToggle.style.display == "none") {
    elementToToggle.style.display = "block";
  } else {
    elementToToggle.style.display = "none";
  }
}

function createFields(fieldAmount) {
  console.log("Div fields are created.");

  const field =[]
  for (let i=0; i< fieldAmount; i++){field.push("field"+i)};

  let fieldDiv = [];

  for (let i = 0; i < fieldAmount; i++) {
    var element = document.createElement("div");
    element.setAttribute("id", "field" + i + "Div");
    document.getElementById("fieldContainer").appendChild(element);
    document.getElementById("field" + i + "Div").style.display = "none";
    fieldDiv.push(document.getElementById("field" + i + "Div"));
  }
  return fieldDiv;
}

function createVocabularySelector() {
  const listOfVocabs = dataNew.map((obj) => Object.keys(obj)[0]);
  var vocabularySelectorSelect = document.createElement("select");
  vocabularySelectorSelect.setAttribute("id", "vocabularySelectorSelect");
  document
    .getElementById("fieldContainer")
    .appendChild(vocabularySelectorSelect);

  listOfVocabs.forEach(function (optionText) {
    var optionElement = document.createElement("option");
    optionElement.text = optionText;
    vocabularySelectorSelect.add(optionElement);
  });

  document.getElementById("vocabularySelectorSelect").onchange = vocSelected;
}

function vocSelected() {
  vocSelectedName = document.getElementById("vocabularySelectorSelect").value;

  const listOfVocabs = dataNew.map((obj) => Object.keys(obj)[0]);
  var vocSelectedIndex = listOfVocabs.indexOf(vocSelectedName);

  // console.log(
  //   "Vocabulary selected " + vocSelectedName + " at index " + vocSelectedIndex
  // );

  // add a function call to do what needs to be done after new vocabulary chosen
}
