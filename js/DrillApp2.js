
import data from '../files/testNew.json'  assert { type: 'json' };



console.log(data);

// const Vocab = {
//   // change the index property and this object will provide 6 dynamically updated vocab properties to the UI object
//   data: testDB,

//   _index: 0,
//   _vocabularyName: "JAanime",

//   longName: undefined,
//   externalURL: undefined,
//   fieldType: undefined,
//   fieldVisibility: undefined,
//   fieldName: undefined,
//   contentAtIndex: undefined,
//   availableVocabulary: undefined,


//   set index(newValue) {
//     this._index = newValue;
//     this.indexOrVocabularyChanged();
//   },

//   get index() {
//     return this._index;
//   },
//   set vocabularyName(newValue) {
//     this._vocabularyName = newValue;
//     this.indexOrVocabularyChanged();
//   },

//   get vocabularyName() {
//     return this._vocabularyName;
//   },

//   indexOrVocabularyChanged: function () {
//     const name = this._vocabularyName;
//     const index = this._index;

//     // console.log("Name:" + name + " Index:" + index);

//     // best to read json by the vocabulary index number -> find out
//     vocabIndex = this.mapVocabulary()[name];
//     vocabularyData = this.data[vocabIndex][name];

//     this.longName = vocabularyData[0].longName;
//     this.externalURL = vocabularyData[0].externalURL;
//     this.fieldType = vocabularyData[0].fieldType;
//     this.fieldVisibility = vocabularyData[0].fieldVisibility;
//     this.fieldName = vocabularyData[0].fieldName;
//     this.contentAtIndex = vocabularyData[1].content[index];
//   },

//   mapVocabulary: function () {
//     var vocab = {};

//     var entryNumber = [];
//     for (let i = 0; i < this.data.length; i++) {
//       entryNumber.push(i);
//     }
//     const entryName = this.data.map((obj) => Object.keys(obj)[0]);

//     for (let i = 0; i < entryName.length; i++) {
//       var key = entryName[i];
//       var value = i;
//       vocab[key] = value;
//     }

//     return vocab;
//   },

//   availableVocabulary: function(){
//    const vocab = this.mapVocabulary();

//    const name = [];

//    console.log(vocab);

    

    



//   }
// };

// const UI = {
//   selectedVocabulary: undefined, //this is the object name of the vocab in the db
//   index: 0,
//   fieldCount: 8,
//   fieldDiv: [],

//   displayVocab: function () {},
//   increaseIndex: function () {
//     this.index++;
//   },
//   initialize: function() {
//     this.fieldDiv = this.initCreateFieldDiv();
//   },

//   initCreateFieldDiv: function () {
//     let fieldDiv = [];

//     for (let i = 0; i < this.fieldCount; i++) {
//       var element = document.createElement("div");
//       element.id = `field${i}`;
//       element.class = "flexboxField";
//       element.style.display = "block";

//       document.getElementById("fieldContainer").appendChild(element);

//       fieldDiv.push(document.getElementById("field" + i));
//     }
//     return fieldDiv;
//   },
// };

// // test = Vocab.readVocabulary(0,"JAanime");

// UI.initialize();

// Vocab.index = 1;
// Vocab.availableVocabulary();

