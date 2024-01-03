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
  dataNew = data;
  //console.log(dataNew);
  createVocabularySelector();
 console.log("hello");  
}


function createVocabularySelector(){

  // var options = [];
        var options = ["Option 1", "Option 2", "Option 3"];


        

        var vocabularySelectorSelect = document.createElement("select");
        vocabularySelectorSelect.setAttribute("id", "vocabularySelectorSelect");
        document.getElementById("fieldContainer").appendChild(vocabularySelectorSelect);

        

        options.forEach(function (optionText) {
          var optionElement = document.createElement("option");
          optionElement.text = optionText;
          vocabularySelectorSelect.add(optionElement);
        });
}
