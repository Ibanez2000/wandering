
let dataURL ="https://raw.githubusercontent.com/Ibanez2000/wandering/main/data/"


let dataVocabulary = [
  "anime",
  "anime",
];

let dataJSONurl = [dataURL+dataVocabulary[0]+".json",dataURL+dataVocabulary[1]+".json"];

console.log(dataJSONurl[0]);

url = dataJSONurl[0];

var obj;


// reminder: async function will not wait until the response is received, it will continue to execute code line by line, to let it wait, need to use 'await'
  async function runProcess() {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    obj = json;
  }
  
  runProcess();
  console.log(obj);