import data from "../../drillAppData/deckDatabaseAll.js";
// const data = require("../files/drillData/testNew2.js").data;

//Achtung: hier alle decks und meta informationen zu allen decks, hier wird kein deck ausgewaehlt
const deckDatabase = (() => {
  const deckDatabase = data;

  const deckNameShort = Object.keys(deckDatabase);

  let deckNameLong = [];
  for (let deck in deckDatabase) {
    deckNameLong.push(deckDatabase[deck].meta.longName);
  }

  //watch YT video for reduce! Basic Knowledge of reduce() in JavaScript
  let deckNameShortLong = deckNameShort.reduce((obj, key, index) => {
    obj[key] = deckNameLong[index];
    return obj;
  }, {});

  return {
    api: {
      deckDatabase: deckDatabase,
      deckNameShort: deckNameShort,
      deckNameLong: deckNameLong,
      deckNameShortLong: deckNameShortLong,
    },
  };
})();

const control = (function () {
  let deck = {
    //On first bootup
    _selectedName: deckDatabase.api.deckNameShort[0],
    _askForField:
      deckDatabase.api.deckDatabase[deckDatabase.api.deckNameShort[0]].meta
        .fieldToAskFor,
    _fieldVisibility:
      deckDatabase.api.deckDatabase[deckDatabase.api.deckNameShort[0]].meta
        .field.initialVisibility,

    //Read and Write Accessors
    get selectedName() {
      return this._selectedName;
    },
    set selectedName(value) {
      //selectedName change means new deck has been chosen
      this._selectedName = value;

      //read initial values after deckchange
      (this._askForField =
        deckDatabase.api.deckDatabase[deck.selectedName].meta.fieldToAskFor),
        (this._fieldVisibility =
          deckDatabase.api.deckDatabase[
            deck.selectedName
          ].meta.field.initialVisibility),
        session.resetUserScore();
      session.resetIndex();
    },

    get askForField() {
      return this._askForField;
    },

    set askForField(value) {
      this._askForField = value;
    },

    get fieldVisibility() {
      //object key/values
      return this._fieldVisibility;
    },

    set fieldVisibility(inputObject) {
      this._fieldVisibility = inputObject;
    },

    //Read Only Accessors
    get visibilityFieldValue() {
      return Object.values(this._fieldVisibility);
    },

    get selectedDeck() {
      return deckDatabase.api.deckDatabase[deck._selectedName];
    },

    get maxIndex() {
      return this.selectedDeck.content.length - 1;
    },
    get fieldType() {
      return this.selectedDeck.meta.field.type;
    },

    get fieldTypeValue() {
      return Object.values(this.fieldType);
    },

    get externalURL() {
      return this.selectedDeck.meta.externalURL;
    },

    get fieldCount() {
      return Object.keys(this.selectedDeck.meta.field.type).length;
    },

    get longName() {
      return this.selectedDeck.meta.longName;
    },
    get fieldDescription() {
      return this.selectedDeck.meta.field.description;
    },
    get fieldDescriptionValue() {
      return Object.values(this.selectedDeck.meta.field.description);
    },
    get fieldContentAtCurrentIndex() {
      return this.selectedDeck.content[control.api.session.index];
    },
    get fieldContentAtCurrentIndexValue() {
      return Object.values(
        this.selectedDeck.content[control.api.session.index]
      );
    },
    get correctAnswer() {
      const askForField = this.askForField;
      const askForFieldAsDescription = control.api.returnFieldDescriptionForField(askForField);
      return control.api.deck.fieldContentAtCurrentIndex[askForFieldAsDescription];
      ;
    },
  };

  let session = {
    index: 0,
    userScore: 0,
    resetIndex: function () {
      this.index = 0;
    },
    resetUserScore: function () {
      this.userScore = 0;
    },
    decreaseUserScore: function () {
      if (this.userScore > -5) {
        this.userScore--;
      }
    },
    increaseUserScore: function () {
      this.userScore++;
    },
    increaseIndex: function () {
      if (this.index < deck.maxIndex) {
        this.index++;
      }
    },
    decreaseIndex: function () {
      if (this.index > 0) {
        this.index--;
      }
    },
  };
  let settings = { hotkeysEnabled: false, autoPlayAudio: false };

  const changeAskForField = (newAskForField) => {
    deck.askForField = newAskForField; // Description
  };
  const returnFieldDescriptionForField = (field) => {
    return control.api.deck.fieldDescription[field];
  };

  const returnFieldForFieldDescription = (fieldDescription) => {
    const description = fieldDescription;

    const field = Object.keys(control.api.deck.fieldDescriptionValue).find(
      (key) => control.api.deck.fieldDescriptionValue[key] === description
    );
    return "field"+field;
  };

  return {
    api: {
      deck: deck,
      session: session,
      settings: settings,
      changeAskForField: changeAskForField,
      returnFieldDescriptionForField: returnFieldDescriptionForField,
      returnFieldForFieldDescription: returnFieldForFieldDescription,
    },
  };
})();

const element = (() => {
  let functionalElement = {
    box: { div0box: document.getElementById("box") },
    app: {},
    userScore: {},
    field: {},
    userInput: {},
    control: {},
    setting: {},
    dropdownAskFor: {},
    dropdownVisiblity: {},
    dropdownDeck: {},
  };

  const initialize = () => {
    createUIElements(control.api.deck.selectedName);
    fieldUpdate();
    updateUserScore("p0userScore");
    userInputFieldClear(0);
    userEntryPlaceholderUpdate("input0userInput");
  };

  const createImageElement = (
    targetFunctionalElement,
    newID,
    parentID,
    cssClass,
    url,
    i
  ) => {
    const image = document.createElement("img");
    image.id = newID;
    image.src = url + "/image/" + i + ".mp3";
    image.className = cssClass;
    const targetElement = document.querySelector("#" + parentID);
    targetElement.appendChild(image);
    functionalElement[targetFunctionalElement][newID] = image;
  };

  const createAudioElement = (
    targetFunctionalElement,
    newID,
    parentID,
    cssClass,
    url,
    i
  ) => {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.id = newID;
    audio.className = cssClass;
    const source = document.createElement("source");
    source.src = url + "/mp3/" + i + ".mp3";
    source.type = "audio/mpeg";
    audio.appendChild(source);

    const targetElement = document.querySelector("#" + parentID);
    targetElement.appendChild(audio);
    functionalElement[targetFunctionalElement][newID] = audio;
  };

  const createElement = (
    targetFunctionalElement,
    newID,
    parentID,
    elementType,
    cssClass,
    HTMLtext,
    inputPlaceholder,
    inputType
  ) => {
    const newElement = document.createElement(elementType);

    newElement.id = newID;
    newElement.className = cssClass;

    if (typeof cssClass === "string" && cssClass.length > 0) {
      newElement.className = cssClass;
    }

    if (typeof inputPlaceholder === "string" && inputPlaceholder.length > 0) {
      newElement.placeholder = inputPlaceholder;
    }

    if (typeof HTMLtext === "string" && HTMLtext.length > 0) {
      newElement.innerHTML = HTMLtext;
    }
    if (typeof inputType === "string" && inputType.length > 0) {
      newElement.type = inputType;
    }

    const targetElement = document.getElementById(parentID);
    targetElement.appendChild(newElement);

    functionalElement[targetFunctionalElement][newID] = newElement;
  };

  //prettier-ignore
  const createUIElements = (selectedName) => {

    //APP
    createElement("app","div0app", "box", "div", "flexboxWrapper");
    
    //Userscore
    createElement("userScore","div0userScore", "div0app", "div", "flexboxRowWrapper");
    createElement("userScore","p0userScore", "div0userScore", "p", "userScore","n/a");

    //Fields
    createElement("field","div0field", "div0app", "div", "flexboxColumnWrapper");

    //Fields depending on content
    for (let i=0; i<control.api.deck.fieldCount; i++){

          if (control.api.deck.fieldTypeValue[i] === "text"){
            createElement("field","p"+i+"field", "div0field", "p", "flexboxFieldPar", "field");
          }
          else if (control.api.deck.fieldTypeValue[i] === "audio"){
            createAudioElement ("field","audio"+i+"field", "div0field", "flexboxAudio", control.api.externalURL,i);
          }
          else if (control.api.deck.fieldTypeValue[i] === "image"){
            createImageElement ("field","image"+i+"field", "div0field", "flexboxImage", control.api.externalURL,i);
          }
    }
    
    //User Input
    createElement("userInput","div0userInput", "div0app", "div", "flexboxRowWrapper");
    createElement("userInput","input0userInput", "div0userInput", "input", "userInput","","Type answer");

    //3 Control Buttons
    createElement("control","div0control", "div0app", "div", "flexboxRowWrapper");
    createElement("control","div1btn0control", "div0control", "div", "", "");
    createElement("control","div2btn1control", "div0control", "div", "", "");
    createElement("control","div3btn2control", "div0control", "div", "", "");
    createElement("control","btn0previous", "div1btn0control", "button","flexboxButtonInactive", "Previous");
    createElement("control","btn1next", "div2btn1control", "button", "flexboxButtonInactive", "Next");
    createElement("control","btn2play", "div3btn2control", "button", "flexboxButtonInactive", "Audio");
    
    //3 Setting Buttons
    createElement("setting","div0setting", "div0app", "div", "flexboxRowWrapper");
    createElement("setting","div0btn0setting", "div0setting", "div", "", "");
    createElement("setting","div1btn1setting", "div0setting", "div", "", "");
    createElement("setting","div2btn2setting", "div0setting", "div", "", "");
    createElement("setting","btn0askFor", "div0btn0setting", "button", "flexboxButtonInactive", "Ask for");
    createElement("setting","btn1Visiblity", "div1btn1setting", "button", "flexboxButtonInactive", "Show/Hide");
    createElement("setting","btn2Deck", "div2btn2setting", "button", "flexboxButtonInactive", "Deck");
    
    //Dropdown AskFor
    createElement("dropdownAskFor","div0dropdownAskFor", "div0app", "div", "flexboxRowWrapper");
    
    //Dropdown Visibility
    createElement("dropdownVisiblity","div0dropdownVisiblity", "div0app", "div", "flexboxRowWrapper");

    //Dropdown "Deck"
    createElement("dropdownDeck","div0dropdownDeck", "div0app", "div", "flexboxRowWrapper");
    createElement("dropdownDeck","select0Deck", "div0dropdownDeck", "select", "");

        const createSelectOption = (targetSelectID,targetFunctionalElement) => {
          const longName = deckDatabase.api.deckNameLong;
          const targetElement = document.getElementById(targetSelectID);

          for (let i=0; i<longName.length; i++){
            const newOption = document.createElement("option");
            newOption.text = longName[i];
            targetElement.add(newOption);
            functionalElement[targetFunctionalElement]["option"+i] = newOption;
          }
          targetElement.value = control.api.deck.longName;

        };

    createSelectOption("select0Deck","dropdownDeck","field");

     // Checkbox and Label elements AskFor and Visibility
     const createCheckboxLabelElements = (targetID,targetFunctionalElement,dropboxType,CssClassAppendix) => {

      const checkboxCssClass = "flexboxCheckbox"+CssClassAppendix;
      const labelCssClass = "flexboxLabel"+CssClassAppendix;

      const fieldCount = control.api.deck.fieldCount;
      const targetElement = document.getElementById(targetID);
      const fieldName = Object.values(control.api.deck.fieldDescriptionValue)
      
      //add checkboxes
      for (let i=0; i<fieldCount; i++){
        createElement(targetFunctionalElement,"ckb"+i+dropboxType, targetID, "input", checkboxCssClass, "","","checkbox");
        createElement(targetFunctionalElement,"lbl"+i+dropboxType, targetID, "label", labelCssClass, fieldName[i],"","");
        }
    }

    createCheckboxLabelElements("div0dropdownVisiblity","dropdownVisiblity","visibility","Visibility");
    createCheckboxLabelElements("div0dropdownAskFor","dropdownAskFor","askFor","AskFor");

    const dropdownIDs = ['div0dropdownAskFor', 'div0dropdownVisiblity', 'div0dropdownDeck'];
    for (let id of dropdownIDs) {

      toggleElementVisibilityByID(id);
    }

    


  };

  const toggleElementVisibilityByID = (id) => {
    let element = document.getElementById(id);

    if (element.style.display !== "none") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  };

  const deleteUIElements = () => {
    functionalElement.app.div0app.remove();
    functionalElement.app = {};
    functionalElement.userScore = {};
    functionalElement.field = {};
    functionalElement.userInput = {};
    functionalElement.control = {};
    functionalElement.setting = {};
    functionalElement.dropdownAskFor = {};
    functionalElement.dropdownVisiblity = {};
    functionalElement.dropdownDeck = {};
  };
  const fieldUpdate = () => {
    for (let i = 0; i < control.api.deck.fieldCount; i++) {
      if (control.api.deck.fieldTypeValue[i] === "text") {
        functionalElement.field["p" + i + "field"].innerHTML =
          control.api.deck.fieldContentAtCurrentIndexValue[i];
      } else if (control.api.deck.fieldTypeValue[i] === "audio") {
        const targetElement = functionalElement.field["audio" + i + "field"];
        targetElement.children[0].src =
          control.api.deck.externalURL +
          "mp3/" +
          control.api.session.index +
          ".mp3";
        targetElement.load();
      } else if (control.api.deck.fieldTypeValue[i] === "image") {
        const targetElement = functionalElement.field["audio" + i + "field"];

        // functionalElement.field["image" + i + "field"].source.src =
        // control.api.externalURL+"/mp3/"+control.api.session.index+".jpg";
        // targetElement.load();
      }

      //according to visibility hide or show fields
      implementFieldVisibility("div0field");
    }
  };
  const userEntryPlaceholderUpdate = (targetID) => {
    const askField = control.api.deck.askForField;
    const askFieldToDescription =
      control.api.returnFieldDescriptionForField(askField);

    const typeAnswerPlaceholder =
      "Type answer for (" + askFieldToDescription + ")";
    const targetElement = document.getElementById(targetID);
    targetElement.placeholder = typeAnswerPlaceholder;
  };
  const implementFieldVisibility = (targetID) => {
    const targetElement = document.getElementById(targetID);
    const targetElementChildren = targetElement.children;


    for (let i = 0; i < control.api.deck.fieldCount; i++) {
      if (control.api.deck.visibilityFieldValue[i] === "shown") {
        targetElementChildren[i].style.display = "block";
      } else if (control.api.deck.visibilityFieldValue[i] === "hidden") {
        targetElementChildren[i].style.display = "none";
      }
    }
  };
  const updateUserScore = (targetID) => {
    //"p0userScore"
    const userScore = control.api.session.userScore;
    const targetElement = document.getElementById(targetID);
    targetElement.innerHTML = "Score "+control.api.session.userScore;
  };

  const pressPlayInAudioControl = (targetID) => {
    //".flexboxAudio"
    const targetElement = document.querySelector(targetID);
    targetElement.play();
  };

  const playPreviousAudio = () => {
    const externalURL = control.api.deck.externalURL;
    const i = control.api.session.index;
    const path = externalURL + "/mp3/" + i + ".mp3";
    const audio = new Audio(path);
    audio.play();
  };

  
  const userInputFieldCheckAnswer = () => {
    const userAnswer = document.querySelector("#input0userInput").value;
    return userAnswer === control.api.deck.correctAnswer;
  };
  const userInputFieldShowAnswer = () => {
    document.querySelector("#input0userInput").value =
      control.api.deck.correctAnswer;
  };
  const userInputFieldClear = (time) => {
    setTimeout(function () {
      document.querySelector("#input0userInput").value = "";
    }, time * 1000);
  };
  const changeFillColor = (elementID, color, time) => {
    const element = document.querySelector("#" + elementID);
    const originalColor = element.style.backgroundColor;
    const newColor = color;
    element.style.backgroundColor = newColor;
    setTimeout(function () {
      element.style.backgroundColor = originalColor;
    }, time * 1000);
  };
  const userInputFieldGetAnswer = () => {
    const userInput = document.querySelector("#input0userInput").value;

    return userInput;
  };
  function toggleDropdownVisibility(dropdownID) {
    const dropdownIDs = [
      "div0dropdownAskFor",
      "div0dropdownVisiblity",
      "div0dropdownDeck",
    ];

    for (let id of dropdownIDs) {
      if (id === dropdownID) {
        toggleElementVisibilityByID(id);
      } else {
        let element = document.getElementById(id);
        if (element.style.display !== "none") {
          toggleElementVisibilityByID(id);
        }
      }
    }
  }

  const toggleDropdownButtonBackgroundFill = (buttonID) => {
    const targetElement = document.querySelector("#" + buttonID);

    if (targetElement.className == "flexboxButtonInactive") {
      targetElement.className = "flexboxButtonActive";
    } else {
      targetElement.className = "flexboxButtonInactive";
    }
  };

  return {
    //element API
    api: {
      createUIElements: createUIElements,
      functionalElement: functionalElement,
      deleteUIElements: deleteUIElements,
      fieldUpdate: fieldUpdate,
      toggleElementVisibilityByID: toggleElementVisibilityByID,
      toggleDropdownVisibility: toggleDropdownVisibility,
      updateUserScore: updateUserScore,
      userInputFieldCheckAnswer: userInputFieldCheckAnswer,
      userInputFieldShowAnswer: userInputFieldShowAnswer,
      userInputFieldClear: userInputFieldClear,
      changeFillColor: changeFillColor,
      userInputFieldGetAnswer: userInputFieldGetAnswer,
      initialize: initialize,
      userEntryPlaceholderUpdate: userEntryPlaceholderUpdate,
      toggleDropdownButtonBackgroundFill: toggleDropdownButtonBackgroundFill,
      playCurrentAudio: pressPlayInAudioControl,
      playPreviousAudio: playPreviousAudio,
    },
  };
})();

const interaction = (() => {
  const userState = {
    answerLock: false,
    enterCount: 0,
  };

  const action = {
    initializeSession: () => {
      //Event Listeners for checkboxes in "Ask for" dropdown
      for (let i = 0; i < control.api.deck.fieldCount; i++) {
        let checkbox = document.getElementById(`ckb${i}askFor`);
        let label = document.getElementById(`lbl${i}askFor`);

        checkbox.addEventListener("change", function () {
          event.askForCheckboxClicked(this, label);
        });
      }

      //Event Listeners for checkboxes in "Visibility" dropdown
      for (let i = 0; i < control.api.deck.fieldCount; i++) {
        let checkbox = document.getElementById(`ckb${i}visibility`);
        let label = document.getElementById(`lbl${i}visibility`);

        checkbox.addEventListener("change", function () {
          event.visibilityCheckboxClicked(this, label);
        });
      }

      //Event Listeners for deck dropdown
      document
        .querySelector("#select0Deck")
        .addEventListener("change", function () {
          const selection = this.value;
          event.chooseDeck(selection);
        });
    },
    nextCard: () => {
      control.api.session.increaseIndex();
      element.api.fieldUpdate();
    },
    previousCard: () => {
      control.api.session.decreaseIndex();
      element.api.fieldUpdate();
    },
    toggleAudioAutoPlay: () => {
      element.api.toggleDropdownButtonBackgroundFill("btn2play");
      control.api.settings.autoPlayAudio = !control.api.settings.autoPlayAudio;
    },
    showVisibilityDropdown: () => {
      element.api.toggleDropdownVisibility("div0dropdownVisiblity");

      const checkboxes = document.querySelectorAll(
        ".flexboxCheckboxVisibility"
      );

      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const visibility = control.api.deck.visibilityFieldValue[i];

        if (visibility === "shown") {
          checkbox.checked = true;
        } else if (visibility === "hidden") {
          checkbox.checked = false;
        }
      }
    },
    showAskForDropdown: () => {
      element.api.toggleDropdownVisibility("div0dropdownAskFor");

      const currentAskForFieldIndex = control.api.deck.askForField.charAt(5);

      const checkboxes = document.querySelectorAll(".flexboxCheckboxAskFor");
      const labels = document.querySelectorAll(".flexboxLabelAskFor");

      for (let i = 0; i < control.api.deck.fieldCount; i++) {
        if (i == currentAskForFieldIndex) {
          checkboxes[i].checked = true;
        } else {
          checkboxes[i].checked = false;
        }
      }
    },
    showDeckDropdown: () => {
      element.api.toggleDropdownVisibility("div0dropdownDeck");
    },
    lockAnswer: (time) => {
      userState.answerLock = true;
      setTimeout(function () {
        userState.answerLock = false;
      }, time * 1000);
    },

    visibilityCheckboxClicked: (checkbox, label) => {
      const checkboxes = document.querySelectorAll(
        ".flexboxCheckboxVisibility"
      );

      for (let i = 0; i < control.api.deck.fieldCount; i++) {
        if (checkboxes[i].checked === true) {
          control.api.deck.fieldVisibility["field" + i] = "shown";
        } else control.api.deck.fieldVisibility["field" + i] = "hidden";
      }
      element.api.fieldUpdate();
    },
    askForCheckboxClicked: (checkbox, label) => {
      const checkboxes = document.querySelectorAll(".flexboxCheckboxAskFor");
      const clickedCheckbox = checkbox;
      const currentLabel = label;

      const currentLabelToField = control.api.returnFieldForFieldDescription(
        currentLabel.innerHTML
      );

      for (let element of checkboxes) {
        if (element === clickedCheckbox) {
          element.checked = true;
          control.api.deck.askForField = currentLabelToField;
        } else {
          element.checked = false;
        }
      }
      element.api.userEntryPlaceholderUpdate("input0userInput");
    },
    userConfirmedUserInput: () => {
      const userAnswer = element.api.userInputFieldGetAnswer();
      const userAnswerIsCorrect = element.api.userInputFieldCheckAnswer();
      console.log("user pressed enter");

      if (
        (userAnswer === "") &
        (userState.enterCount === 0) &
        (userState.answerLock === false)
      ) {
        console.log("user answer is empty on first enter");

        userState.enterCount++;
      } else if (
        (userAnswer === "") &
        (userState.enterCount === 1) &
        (userState.answerLock === false)
      ) {
        console.log("user answer is empty on second enter");
        if (control.api.settings.autoPlayAudio === true) {
          element.api.playCurrentAudio();
        }
        element.api.userInputFieldShowAnswer();
        element.api.changeFillColor("input0userInput", "red", 4);
        control.api.session.decreaseUserScore();
        element.api.updateUserScore("p0userScore");
        element.api.changeFillColor("p0userScore", "red", 4);
        action.lockAnswer(5);
        element.api.userInputFieldClear(5);
        userState.enterCount = 0;
      } else if (
        userAnswerIsCorrect &
        (userState.enterCount === 0) &
        (userState.answerLock === false)
      ) {
        console.log("user answer is correct");
        if (control.api.settings.autoPlayAudio === true) {
          element.api.playPreviousAudio();
        }
        element.api.changeFillColor("input0userInput", "green", 1);
        control.api.session.increaseUserScore();
        element.api.updateUserScore("p0userScore");
        element.api.changeFillColor("p0userScore", "green", 1);
        element.api.userInputFieldClear(0);
        action.nextCard();
        userState.enterCount = 0;
      } else if (
        !userAnswerIsCorrect &
        (userState.enterCount === 0) &
        (userState.answerLock === false)
      ) {
        console.log("user answer is not correct");
        element.api.changeFillColor("input0userInput", "red", 1);
        control.api.session.decreaseUserScore();
        element.api.updateUserScore("p0userScore");
        element.api.changeFillColor("p0userScore", "red", 1);
      }
    },

    chooseDeck: (selection) => {
      const deckNameShortLong = deckDatabase.api.deckNameShortLong;

      const selectionShortname = Object.keys(deckNameShortLong).find(function (
        key
      ) {
        return deckNameShortLong[key] === selection;
      });

      console.log(selectionShortname);

      control.api.deck.selectedName = selectionShortname; //resets index, user score, reads deck


      element.api.deleteUIElements();
      element.api.initialize();
      interaction.api.initialize();
    },
  };

  //event and actions
  let event = {
    initializeSession: [action.initializeSession],
    askForCheckboxClicked: (checkbox, label) => {
      action.askForCheckboxClicked(checkbox, label);
    },
    visibilityCheckboxClicked: (checkbox, label) => {
      action.visibilityCheckboxClicked(checkbox, label);
    },
    btn0previous: [action.previousCard],
    btn1next: [action.nextCard],
    btn2play: [action.toggleAudioAutoPlay],
    userConfirmedUserInput: [action.userConfirmedUserInput],
    btn0askFor: [action.showAskForDropdown],
    btn1Visiblity: [action.showVisibilityDropdown],
    btn2Deck: [action.showDeckDropdown],
    chooseDeck: (selection) => {action.chooseDeck(selection)},
  };

  const initialize = () => {
    //add the permanent event handlers
    document
      .getElementById("btn0previous")
      .addEventListener("click", function () {
        for (let func of event.btn0previous) {
          func();
        }
      });

    document.getElementById("btn1next").addEventListener("click", function () {
      for (let func of event.btn1next) {
        func();
      }
    });

    document.getElementById("btn2play").addEventListener("click", function () {
      for (let func of event.btn2play) {
        func();
      }
    });

    document
      .getElementById("btn0askFor")
      .addEventListener("click", function () {
        for (let func of event.btn0askFor) {
          func();
        }
      });

    document
      .getElementById("btn1Visiblity")
      .addEventListener("click", function () {
        for (let func of event.btn1Visiblity) {
          func();
        }
      });

    document.getElementById("btn2Deck").addEventListener("click", function () {
      for (let func of event.btn2Deck) {
        func();
      }
    });

    //Event listener for user Input
    document
      .getElementById("input0userInput")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          for (let func of event.userConfirmedUserInput) {
            func();
          }
        }
      });

    //add all the other event handlers that got deleted when the html elements were deleted
    event.initializeSession[0]();
  };

  return {
    api: {
      initialize: initialize,
    },
  };
})();

element.api.initialize();
interaction.api.initialize();
