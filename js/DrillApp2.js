const Vocab = {
  vocabularyData: data,

  set index(newValue) {
    this._index = newValue;
    this.indexChanged();
  },

  get index() {
    return this._index;
  },
  set vocabularyName(newValue) {
    this._vocabularyName = newValue;
    this.vocabularyChanged();
  },

  get vocabularyName() {
    return this._vocabularyName;
  },
  indexChanged: function () {

    const contentAtIndex = this.vocabularyData[this.vocabularyName].content[this.index];
    
  },
  vocabularyChanged: function () {
    this.longName = this.vocabularyData[this.vocabularyName].meta.longName;
    this.externalURL = this.vocabularyData[this.vocabularyName].meta.externalURL;
    this.name = this.vocabularyData[this.vocabularyName].meta.field.name;
    this.type = this.vocabularyData[this.vocabularyName].meta.field.type;

    this.initialVisibility =
      this.vocabularyData[this.vocabularyName].meta.field.initialVisibility;
    this.content = this.vocabularyData[this.vocabularyName].content;
  },

  availableVocab: function () {
    // available vocab [ [names], [longNames]]

    const availableVocab = [];
    // get the names
    const keys = Object.keys(this.vocabularyData);

    availableVocab.push(keys);

    let longNames = [];
    // get longNames
    keys.forEach((element) => {
      const longName = this.vocabularyData[element].meta.longName;
      longNames.push(longName);
    });
    availableVocab.push(longNames);

    return availableVocab;
  },
};

const UI = {
  fieldCount: 8,
  set index(newValue) {
    this._index = newValue;
    this.informVocabOfIndexUpdate();

  },

  get index() {
    return this._index;
  },
  set selectedVocabulary(newValue) {
    this._selectedVocabulary = newValue;
    this.informVocabOfVocabUpdate();
  },

  get selectedVocabulary() {
    return this._selectedVocabulary;
  },

  displayVocab: function () {},


  increaseIndex: function () {
    this.index++;
    console.log("index increased");
    this.informVocabOfIndexUpdate();
  },
  decreaseIndex: function () {
    this.index--;
    console.log("index decreased");
    this.informVocabOfIndexUpdate();
  },
  initialize: function () {
    this.selectedVocabulary = "JAAnime";
    this.index = 0;

    this.fieldDiv = this.initCreateFieldDiv();
    this.vocabSelect = this.initCreateVocabSelector();
    this.initButtons();
  },
  initButtons: function () {
    document.getElementById("increaseBtn").onclick = this.increaseIndex.bind(this);
    document.getElementById("decreaseBtn").onclick = this.decreaseIndex.bind(this);;
  },

  createOrUpdateFieldContentElements: function(){
      let fieldElements = [];

      const test = Vocab.type;
      console.log(test);
    
      // for (const [key, value] of Object.entries(activeVocabulary[0].fieldTypes)) {
      //   // console.log(`${key}: ${value}`);
      //   i = key.at(5);
    
      //   const fieldType = activeVocabulary[0].fieldTypes[key];
    
      //   if (fieldType == "text") {
      //     var elementToCreate = "p";
      //   }
      //   if (fieldType == "picture") {
      //     var elementToCreate = "img";
      //   }
      //   if (fieldType == "audio") {
      //     var elementToCreate = "p";
      //   }
    
      //   var element = document.createElement(elementToCreate);
      //   element.innerHTML = ``;
      //   element.id = `${key}Content`;
      //   element.class = "flexboxFieldContent";
    
      //   fieldDiv[i].appendChild(element);
      //   fieldElements.push(element);
      
    }

  ,

  initCreateFieldDiv: function () {
    let fieldDiv = [];

    for (let i = 0; i < this.fieldCount; i++) {
      var element = document.createElement("div");
      element.id = `field${i}`;
      element.class = "flexboxField";
      element.style.display = "block";

      document.getElementById("fieldContainer").appendChild(element);

      fieldDiv.push(document.getElementById("field" + i));
    }
    return fieldDiv;
  },
  initCreateVocabSelector: function () {
    var vocabSelect = document.createElement("select");
    vocabSelect.id = "vocabSelectorSelect";
    document.getElementById("vocabulary").appendChild(vocabSelect);
    const [names, longNames] = Vocab.availableVocab();
    longNames.forEach(function (option) {
      const optionElement = document.createElement("option");
      optionElement.text = option;
      vocabSelect.add(optionElement);
      vocabSelect.onclick = UI.vocabularyUserSelectedChange;
    });

    return vocabSelect;
  },
  informVocabOfVocabUpdate: function () {
    console.log("Inform Vocab of Vocabulary update.");
    Vocab.vocabularyName = UI.selectedVocabulary;
  },
  informVocabOfIndexUpdate: function () {
    console.log("Inform Vocab of Index update.");
    Vocab.index = this.index;
  },
  vocabularyUserSelectedChange: function () {
    const selectedLongName = UI.vocabSelect.value;
    const [names, longNames] = Vocab.availableVocab();
    const index = longNames.indexOf(selectedLongName);
    const selectedName = names[index];

    UI.selectedVocabulary = selectedName;
    UI.index = 0;
  },
};

UI.initialize();
UI.createOrUpdateFieldContentElements();
console.log(Vocab.type);