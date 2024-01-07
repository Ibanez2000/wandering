var selectedVocabIndex;
var selectedVocabName;

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
    main(data);
  } catch {
    console.error("Multiple fetch failed");
    alert("Fetching the vocabulary data failed.");
  }
}


//Invoke the main program, use readJSON for getting the data with asynchronous fetch command and call main(data);
readJSON = makeRequests(fetchPromises());

//Invoke the main program, just read a mock db from test.js for testing purposes
// readJS =   JAanime;




function main(data) {
    dataNew = data;
  // this stuff depends on whole vocab db
  fieldDiv = createFields();
  vocabList = createVocabularySelector(data);
// vocabSelected = document.getElementById("vocabularySelectorSelect").value;

//   selectedVoc = retrieveData(vocabList, vocabSelected);

//   function retrieveData(vocabList, vocabSelected) {}
}

function initializeVocabulary(fieldDiv) {
  // initial Visibility
}

function initialVisibilityToggle() {}

function createFields() {
  let fieldDiv = [];

  for (let i = 0; i < 8; i++) {
    var element = document.createElement("div");
    element.id = `field${i}`;
    element.class = "flexboxField";
    element.innerHTML = `<p>field${i}</p>`;
    element.style.display = "block";

    document.getElementById("fieldContainer").appendChild(element);

    fieldDiv.push(document.getElementById("field" + i));
  }
  return fieldDiv;
}

function createVocabularySelector(data) {
  const listOfVocabs = data.map((obj) => Object.keys(obj)[0]);
  var vocabularySelectorSelect = document.createElement("select");
  vocabularySelectorSelect.setAttribute.id = "vocabularySelectorSelect";
  document.getElementById("vocabulary").appendChild(vocabularySelectorSelect);

  listOfVocabs.forEach(function (optionText) {
    var optionElement = document.createElement("option");
    optionElement.text = optionText;
    vocabularySelectorSelect.add(optionElement);
  });

  vocabularySelectorSelect.selectedIndex = 0;

  return listOfVocabs;
}
