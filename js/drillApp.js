var selectedVocabIndex;
var selectedVocabName;
const fieldCount = 8;

const baseURL =
  "https://raw.githubusercontent.com/Ibanez2000/wandering/main/files/drillData/";
const vocabulary = ["JAanime", "JAsimpleNouns"];

const JSONURL = () => {
  return vocabulary.map((item) => `${baseURL}${item}/${item}.json`);
};

const fetchPromises = () => {
  let array = [];
  JSONURL().forEach(function (item) {
    array.push(fetch(item));
  });
  return array;
};

async function makeRequests(promiseArray) {
  try {
    const responses = await Promise.all(promiseArray);
    const data = await Promise.all(
      responses.map((response) => response.json())
    );
    await main(data);
  } catch {
    console.error("Multiple fetch failed");
    alert("Fetching the vocabulary data failed.");
  }
}

//Invoke the main program, use readJSON for getting the data with asynchronous fetch command and call main(data);
// readJSON = makeRequests(fetchPromises());

//Invoke the main program, just read a mock db from test.js for testing purposes
readJS = main(testDB);

function main(data) {
  dataGlobal = data;
  console.log(dataGlobal);
  fieldDiv = createFields();
  createVocabularySelector();
  vocabularyChanged();
}

function vocabularyChanged() {
  var vocabSelectedName = document.getElementById(
    "vocabularySelectorSelect"
  ).value;
  var vocabSelectedIndex = mapVocabulary()[vocabSelectedName];
  var activeVocabulary = readSelectedVocabulary(
    vocabSelectedIndex,
    vocabSelectedName
  );

  activeVocabulary = readSelectedVocabulary(
    vocabSelectedIndex,
    vocabSelectedName
  );
  initDrill(activeVocabulary);
}

function deleteFieldContentElement() {
  for (let i; i < fieldCount; i++) {
    let element = document.getElementById(`${key}Content`);

    if (element !== null) {
      element.remove();
    }
  }
}

function createFieldContentElement(activeVocabulary) {
  let fieldDivContent = [];

  for (const [key, value] of Object.entries(activeVocabulary[0].fieldTypes)) {
    // console.log(`${key}: ${value}`);
    i = key.at(5);

    const fieldType = activeVocabulary[0].fieldTypes[key];

    if (fieldType == "text") {
      var elementToCreate = "p";
    }
    if (fieldType == "picture") {
      var elementToCreate = "img";
    }
    if (fieldType == "audio") {
      var elementToCreate = "p";
    }

    var element = document.createElement(elementToCreate);
    element.innerHTML = ``;
    element.id = `${key}Content`;
    element.class = "flexboxFieldContent";

    fieldDiv[i].appendChild(element);
    fieldDivContent.push(element);
  }
}

function initialFieldVisibility(activeVocabulary) {
  for (const [key, value] of Object.entries(
    activeVocabulary[0].fieldVisibility
  )) {
    // console.log(`${key}: ${value}`);
    const fieldVisibility = activeVocabulary[0].fieldVisibility[key];
    if (fieldVisibility == "shown") {
      var visibility = "block";
    } else if (fieldVisibility == "hidden") {
      var visibility = "none";
    }

    elementToChange = document.getElementById(key);
    elementToChange.style.display = visibility;
  }
}

function initDrill(activeVocabulary) {
  let index = 0;
  deleteFieldContentElement();
  let fieldDivContent = createFieldContentElement(activeVocabulary);
  initialFieldVisibility(activeVocabulary);
  writeContentToFields(activeVocabulary, index);

  // set fields visibility according to fieldVisibility
  // set index=0
  // write fields contents
}

function writeContentToFields(activeVocabulary, index) {
  entry = activeVocabulary[1].content[index];
  var count = Object.keys(entry).length;
  var keys = Object.keys(entry);
  //   console.log(Object.values(entry));

  for (let i = 0; i < count; i++) {
    elementName = `field${i}Content`;
    elementKey = keys[i];
    elementValue = activeVocabulary[1].content[index][elementKey];

    document.getElementById(elementName).innerHTML = "<p>"+elementValue+"<p>";

    console.log(elementName + " " + elementKey + " " + elementValue);


}
}

function readSelectedVocabulary(vocabSelectedIndex, vocabSelectedName) {
  activeVocabulary = dataGlobal[vocabSelectedIndex][vocabSelectedName];

  //   activeVocabulary[0].externalURL
  //   activeVocabulary[0].fieldNames
  //   activeVocabulary[0].fieldTypes
  //   activeVocabulary[0].fieldVisibility
  //   activeVocabulary[1].content

  return activeVocabulary;
}

function createFields() {
  let fieldDiv = [];

  for (let i = 0; i < fieldCount; i++) {
    var element = document.createElement("div");
    element.id = `field${i}`;
    element.class = "flexboxField";
    // element.innerHTML = `<p>field${i}</p>`;
    element.style.display = "block";

    document.getElementById("fieldContainer").appendChild(element);

    fieldDiv.push(document.getElementById("field" + i));
  }
  return fieldDiv;
}

function mapVocabulary() {
  var vocab = {};

  var entryNumber = [];
  for (let i = 0; i < dataGlobal.length; i++) {
    entryNumber.push(i);
  }
  const entryName = dataGlobal.map((obj) => Object.keys(obj)[0]);

  for (let i = 0; i < entryName.length; i++) {
    var key = entryName[i];
    var value = i;
    vocab[key] = value;
  }

  return vocab;
}

function createVocabularySelector() {
  const listOfVocabs = dataGlobal.map((obj) => Object.keys(obj)[0]);
  var vocabularySelectorSelect = document.createElement("select");
  vocabularySelectorSelect.id = "vocabularySelectorSelect";
  vocabularySelectorSelect.onclick = vocabularyChanged;

  document.getElementById("vocabulary").appendChild(vocabularySelectorSelect);

  listOfVocabs.forEach(function (optionText) {
    var optionElement = document.createElement("option");
    optionElement.text = optionText;
    vocabularySelectorSelect.add(optionElement);
  });

  vocabularySelectorSelect.selectedIndex = 0;
}
