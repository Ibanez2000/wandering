const Vocab = {
  vocabularyData: data,

  set index(newValue) {
    this._index = newValue;
    this.contentAtIndex = this.indexChanged();
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
    const contentAtIndex = [];

    const contentObjects =
      this.vocabularyData[this.vocabularyName].content[this.index];

    const values = Object.values(contentObjects);

    for (let i = 0; i < values.length; i++) {
      contentAtIndex.push(values[i]);
    }

    return contentAtIndex;
  },
  vocabularyChanged: function () {
    this.longName = this.vocabularyData[this.vocabularyName].meta.longName;
    this.externalURL =
      this.vocabularyData[this.vocabularyName].meta.externalURL;
    this.description =
      this.vocabularyData[this.vocabularyName].meta.field.description;
    this.type = this.vocabularyData[this.vocabularyName].meta.field.type;
    this.initialVisibility =
      this.vocabularyData[this.vocabularyName].meta.field.initialVisibility;
    this.content = this.vocabularyData[this.vocabularyName].content;
    this.contentLength =
      this.vocabularyData[this.vocabularyName].content.length;
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
    this.writeContent();
  },

  get index() {
    return this._index;
  },
  set selectedVocabulary(newValue) {
    this._selectedVocabulary = newValue;
    this.informVocabOfVocabUpdate();
    this.fieldElements = this.createOrUpdateFieldContentElements();
    this.fieldVisibility = this.fieldVisibilityUpdateInitial();
    this.writeFieldVisibility();
  },

  get selectedVocabulary() {
    return this._selectedVocabulary;
  },

  displayVocab: function () {},

  increaseIndex: function () {
    if (this.index < Vocab.content.length) {
      this.index++;
    }

    console.log("index increased");
  },
  decreaseIndex: function () {
    if (this.index > 0) {
      this.index--;
    }
    console.log("index decreased");
  },

  initialize: function () {
    this.fieldDiv = this.initCreateFieldDiv();
    this.selectedVocabulary = "JAAnime";
    this.index = 0;

    this.vocabSelect = this.initCreateVocabSelector();
    this.initButtons();
  },
  writeFieldVisibility: function () {
    for (let i = 0; i < this.fieldCount; i++) {
      if (this.fieldVisibility[i] == "block") {
        this.fieldDiv[i].style.display = "block";
      } else if (this.fieldVisibility[i] == "none") {
        this.fieldDiv[i].style.display = "none";
      }
    }
  },
  writeContent: function () {
    const contentAtIndex = Vocab.contentAtIndex;

    // need to add some logic here for images and audios
    for (let i = 0; i < this.fieldElements.length; i++) {
      this.fieldElements[i].innerHTML = Vocab.contentAtIndex[i];
    }
  },

  initButtons: function () {
    document.getElementById("increaseBtn").onclick =
      this.increaseIndex.bind(this);
    document.getElementById("decreaseBtn").onclick =
      this.decreaseIndex.bind(this);
  },
  createOrUpdateFieldContentElements: function () {
    if (this.hasOwnProperty("fieldElements")) {
      for (let i; i < this.fieldElements.length; i++) {
        element[i].remove();
      }
    }

    let fieldElements = [];
    const type = Vocab.type;

    for (const key in type) {
      const i = key.at(5);
      const value = type[key];

      if (value == "text") {
        var elementToCreate = "p";
      }
      if (value == "picture") {
        var elementToCreate = "img";
      }
      if (value == "audio") {
        var elementToCreate = "p";
      }
      var element = document.createElement(elementToCreate);

      element.innerHTML = ``;
      element.id = `${key}Content`;
      element.class = "flexboxFieldContent";

      this.fieldDiv[i].appendChild(element);
      fieldElements.push(element);
    }

    return fieldElements;
  },
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
    Vocab.vocabularyName = this.selectedVocabulary;
  },
  informVocabOfIndexUpdate: function () {
    console.log("Inform Vocab of Index update.");
    Vocab.index = this.index;
  },
  vocabularyUserSelectedChange: () => {
    const selectedLongName = UI.vocabSelect.value;
    const [names, longNames] = Vocab.availableVocab();
    const index = longNames.indexOf(selectedLongName);
    const selectedName = names[index];

    UI.selectedVocabulary = selectedName;
    UI.index = 0;
  },
  fieldVisibilityUpdateInitial: function () {
    const fieldVisibility = [];

    const values = Object.values(Vocab.initialVisibility);
    for (let i = 0; i < this.fieldCount; i++) {
      if (values[i] == "shown") {
        fieldVisibility.push("block");
      } else if (values[i] == "hidden") {
        fieldVisibility.push("none");
      }
    }

    return fieldVisibility;
  },
};

UI.initialize();

const testVariable = { UI, Vocab };
console.log("hello");
