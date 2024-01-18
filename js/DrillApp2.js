// node
// var data = require("../files/drillData/testNew2.js") ;

import data from "../files/drillData/testNew2.js";

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
    this.initialAskForField =
      this.vocabularyData[this.vocabularyName].meta.initialAskForField;
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
    this.askForField = this.fieldAskForUpdateInitial();
    this.writeFieldVisibility();
    this.dropdownCheckboxesHideVisibility();
    this.dropdownCheckboxesHideAskFor();
  },
  get selectedVocabulary() {
    return this._selectedVocabulary;
  },
  increaseIndex: function () {
    console.log(this.index);
    console.log(Vocab.content.length);
    if (this.index < Vocab.content.length - 1) {
      this.index++;
    }
  },
  decreaseIndex: function () {
    if (this.index > 0) {
      this.index--;
    }
    console.log("index decreased");
  },
  initialize: function () {
    // First all the HTML Elements
    this.fieldDiv = this.initCreateFieldDiv();
    this.dropdownVisibility = this.createDropdownObject("fieldVisibility", "initialVisibility", "description", "shown", "hidden","empty","multiple","todo",Vocab);
    this.dropdownVisibility.initializeDropdown();

    this.initCreateDropdownCheckboxesVisibility();
    this.initCreateDropdownCheckboxesAskFor();

    this.selectedVocabulary = "JAAnime";
    this.index = 0;

    // This HTML element depends on Vocab read first
    this.vocabSelect = this.initCreateVocabSelector();
    this.initButtons();
    this.addEventListeners();
    this.adjustUserScore("initial");
  },
  backGroundFillElement(id, color, time) {
    console.log("test");
    const elementToAdjust = document.getElementById(id);
    const oldColor = elementToAdjust.style.backgroundColor;
    const newColor = color;
    elementToAdjust.style.backgroundColor = newColor;
    setTimeout(function () {
      elementToAdjust.style.backgroundColor = oldColor;
    }, 2000);
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
  writeAskFor: function (field) {
    console.log(this);
    this.askForField = field;
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
    console.log(this.hasOwnProperty("fieldElements"));

    if (this.hasOwnProperty("fieldElements")) {
      console.log("Field elements already exist, delete them!");

      for (let i = 0; i < this.fieldElements.length; i++) {
        this.fieldElements[i].remove();
      }

      console.log("elements have been removed. check!");
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

  fieldAskForUpdateInitial: function () {
    const askForField = Vocab.initialAskForField;
    return askForField;
  },

  userEvaluateInput: function (userEntryElement) {
    const userInputValue = userEntryElement.value;
    // this.askForField.charAt(5);

    const correctValue = Vocab.contentAtIndex[this.askForField.charAt(5)];
    console.log("Correct value is:" + correctValue);

    console.log(userInputValue);

    if (userInputValue == correctValue) {
      this.backGroundFillElement("userScoreContainer", "green", 1000);
      this.adjustUserScore("increase");
      this.nextCard();
      this.enterCounter = 0;
      userEntryElement.value = "";
      console.log("correct");
    } else {
      this.backGroundFillElement("userScoreContainer", "red", 2000);
      this.adjustUserScore("decrease");
      console.log("false");
    }
  },
  userReveal: function (userEntryElement) {
    const correctValue = Vocab.contentAtIndex[this.askForField.charAt(5)];
    userEntryElement.value = correctValue;
    this.backGroundFillElement("userScoreContainer", "red", 2000);
    this.adjustUserScore("decrease");
  },
  userGiveUp: function (userEntryElement) {
    const correctValue = Vocab.contentAtIndex[this.askForField.charAt(5)];
    console.log("Correct value is:" + correctValue);
    userEntryElement.value = correctValue;
    this.backGroundFillElement("userScoreContainer", "red", 2000);
    this.adjustUserScore("decrease");
    this.nextCard();
    this.enterCounter = 0;
    userEntryElement.value = "";
  },
  adjustUserScore: function (action) {
    if (action == "increase") {
      this.userScore++;
    } else if (action == "decrease") {
      if (this.userScore > 0) {
        this.userScore--;
      }
    } else if (action == "initial") {
      this.userScore = 0;
    }
    this.writeUserScore(this.userScore);
  },
  writeUserScore: function (score) {
    const element = document.getElementById("userScoreContent");
    element.innerHTML = score;
  },
  nextCard: function () {
    this.increaseIndex();
  },
  initCreateDropdownCheckboxesVisibility: function () {
    const dropdownContent = document.getElementById("dropdownContent");
    this.visibilityCheckboxes = [];
    this.visibilityLabels = [];

    for (var i = 0; i < this.fieldCount; i++) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkboxField" + i;
      // checkbox.className = ".checkbox-label";
      checkbox.addEventListener(
        "click",
        this.checkboxClickHandlerVisibility.bind(this, i)
      );

      var label = document.createElement("label");
      label.id = "visibilityLabel" + i;
      label.className = ".checkbox-label";
      label.htmlFor = "visbilityCheckboxField" + i;
      label.appendChild(document.createTextNode("Option" + i));

      dropdownContent.appendChild(checkbox);
      this.visibilityCheckboxes.push(checkbox);
      dropdownContent.appendChild(label);
      this.visibilityLabels.push(label);
    }

    this.dropdownCheckboxesHideVisibility();
  },
  initCreateDropdownCheckboxesAskFor: function () {
    const dropdownContent = document.getElementById("dropdownContent");
    this.askForCheckboxes = [];
    this.askForLabels = [];

    for (var i = 0; i < this.fieldCount; i++) {
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "AskForCheckboxField" + i;
      // checkbox.className = ".checkbox-label";
      checkbox.addEventListener(
        "click",
        this.checkboxClickHandlerAskFor.bind(this, i)
      );

      var label = document.createElement("label");
      label.id = "label" + i;
      label.className = ".checkbox-label";
      label.htmlFor = "askForCheckboxField" + i;
      label.appendChild(document.createTextNode("Option" + i));

      dropdownContent.appendChild(checkbox);
      this.askForCheckboxes.push(checkbox);
      dropdownContent.appendChild(label);
      this.askForLabels.push(label);
    }
    this.writeAskFor(Vocab.initialAskForField);
    this.dropdownCheckboxesHideAskFor();
  },
  showOrHideFieldOptionsVisibility: function (clickCount) {
    if (clickCount == 1) {
      this.dropdownCheckboxesShowVisibility();
    } else if ((clickCount = 2)) {
      this.dropdownCheckboxesHideVisibility();
    }
  },
  showOrHideFieldOptionsAskFor: function (clickCount) {
    if (clickCount == 1) {
      this.dropdownCheckboxesShowAskFor();
    } else if ((clickCount = 2)) {
      this.dropdownCheckboxesHideAskFor();
    }
  },
  dropdownCheckboxesHideVisibility: function () {
    for (var i = 0; i < this.fieldCount; i++) {
      this.visibilityCheckboxes[i].style.display = "none";
      this.visibilityLabels[i].style.display = "none";
    }

    this.clickCount = 0;
  },
  dropdownCheckboxesHideAskFor: function () {
    for (var i = 0; i < this.fieldCount; i++) {
      this.askForCheckboxes[i].style.display = "none";
      this.askForLabels[i].style.display = "none";
    }

    this.clickCount = 0;
  },
  dropdownCheckboxesShowVisibility: function () {
    for (var i = 0; i < this.fieldCount; i++) {
      this.visibilityCheckboxes[i].style.display = "inline-block";
      this.visibilityLabels[i].style.display = "inline-block";
      if (this.fieldVisibility[i] == "block") {
        this.visibilityCheckboxes[i].checked = true;
      } else {
        this.visibilityCheckboxes[i].checked = false;
      }
      this.visibilityLabels[i].innerHTML = Object.values(Vocab.description)[i];
    }
  },
  dropdownCheckboxesShowAskFor: function () {
    const askForFieldIndex = this.askForField.charAt(5);
    console.log(askForFieldIndex);

    for (var i = 0; i < this.fieldCount; i++) {
      this.askForCheckboxes[i].style.display = "inline-block";
      this.askForLabels[i].style.display = "inline-block";

      if (askForFieldIndex == i) {
        this.askForCheckboxes[i].checked = true;
      } else {
        this.askForCheckboxes[i].checked = false;
      }

      this.askForLabels[i].innerHTML = Object.values(Vocab.description)[i];
    }
  },
  checkboxClickHandlerVisibility: function (i) {
    const label = this.visibilityLabels[i];
    const isChecked = this.visibilityCheckboxes[i].checked;

    if (isChecked) {
      console.log("Checkbox " + i + " was not checked.");
      this.fieldVisibility[i] = "block";
      console.log("Checkbox " + i + " is now checked.");
    } else {
      console.log("Checkbox " + i + " was checked.");
      this.fieldVisibility[i] = "none";
      console.log("Checkbox " + i + " is now unchecked.");
    }
    this.writeFieldVisibility();
  },
  checkboxClickHandlerAskFor: function (i) {
    const isChecked = this.askForCheckboxes[i].checked;

    for (let i=0; i < this.fieldCount; i++) {
      console.log("checkbox at index "+i+" checked status: "+this.askForCheckboxes[i].checked);
    }
    console.log("was it checked?"+isChecked);

//deselect all
for (let i=0; i < this.fieldCount; i++) {
  this.askForCheckboxes[i].checked = false;
  console.log("break");
}
// if it was checked -> deselect it
// if it was not checked -> select it
console.log("was it checked?"+isChecked);

    if (isChecked) {      
      console.log("Checkbox " + i + " checked.");
      console.log("Checkbox " + i + " is now unchecked checked.");
    } else {
      console.log("Checkbox " + i + " was not checked.");
      this.askForCheckboxes[i].checked = true;
      console.log("Checkbox " + i + " is now checked.");
      this.askForField = "field" + i;

    }

    console.log("ask for "+this.askForField);
  },

  addEventListeners: function () {
    //userEntry
    const userEntryElement = document.getElementById("userEntry");
    this.enterCounter = 0;

    userEntryElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.enterCounter++;

        if (this.enterCounter == 1) {
          this.userEvaluateInput(userEntryElement);
        } else if (this.enterCounter == 2) {
          this.userReveal(userEntryElement);
        } else if (this.enterCounter == 3) {
          this.userGiveUp(userEntryElement);
        }
      }
    });

    const revealBtn = document.getElementById("revealBtn");
    revealBtn.addEventListener("click", () => {
      this.userReveal(userEntryElement);
    });

    const showFieldsBtn = document.getElementById("showFieldsBtn");

    this.showFieldsBtnClickCount = 0;
    showFieldsBtn.addEventListener("click", () => {
      this.showFieldsBtnClickCount++;

      if (this.showFieldsBtnClickCount == 1) {
        this.showOrHideFieldOptionsVisibility(1);
      } else if (this.showFieldsBtnClickCount == 2) {
        this.showOrHideFieldOptionsVisibility(2);

        this.showFieldsBtnClickCount = 0;
      }
    });

    const askForBtn = document.getElementById("askForBtn");

    console.log(askForBtn);
    this.askForBtnClickCount = 0;
    askForBtn.addEventListener("click", () => {
      this.askForBtnClickCount++;

      if (this.askForBtnClickCount == 1) {
        this.showOrHideFieldOptionsAskFor(1);
      } else if (this.askForBtnClickCount == 2) {
        this.showOrHideFieldOptionsAskFor(2);

        this.askForBtnClickCount = 0;
      }
    });
  },

  createDropdownObject: function (name, connecting, labeling, checked, unchecked,isIgnored,triggerType,triggerAction,Vocab) {
return {name:name,
  connecting: connecting,
  labeling: labeling,
  checked: checked,
  unchecked: unchecked,
  isIgnored: isIgnored,
  triggerType: triggerType,
  triggerAction,
  initializeDropdown: function(){
const initialStatus = this.readInitialStatus();
  

  },
  readInitialStatus: function (){
    const initialStatus = [];
    const values = Object.values(Vocab.initialVisibility);
    console.log(values);
    return "initialStatus";
  
  
  } 



}


  }

};

UI.initialize();

const testVariable = { UI, Vocab };
console.log("hello");
