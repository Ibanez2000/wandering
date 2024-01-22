import data from "../files/drillData/testNew2.js";
// const data = require("../files/drillData/testNew2.js").data;

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
    itsName: "",
    maxIndex: 0,
    askForField: "",
    fieldCount: 0,
    visibilityField: [],
  };

  let session = { index: 0, userScore: 0 };
  let settings = { hotkeysEnabled: false, autoPlayAudio: false };

  const increaseIndex = () => {
    if (session.index < deck.maxIndex) {
      session.index++;
    }
  };

  const decreaseIndex = () => {
    if (session.index > 0) {
      session.index--;
    }
  };

  const resetIndex = () => {
    session.index = 0;
  };

  const increaseUserScore = () => {
    session.userScore++;
  };

  const resetUserScore = () => {
    session.userScore = 0;
  };

  const decreaseUserScore = () => {
    if (session.userScore > -5) {
      session.userScore--;
    }
  };

  const initialize = () => {
    changeDeck(deckDatabase.api.deckNameShort[0]);
  };

  const changeDeck = (newDeckName) => {
    console.log("control.api.changedeck:");
    deck.itsName = newDeckName;
    deck.maxIndex =
      deckDatabase.api.deckDatabase[deck.itsName].content.length - 1;
    deck.askForField = returnFieldDescriptionForField(
      deckDatabase.api.deckDatabase[deck.itsName].meta.fieldToAskFor
    );

    deck.fieldCount = Object.keys(
      deckDatabase.api.deckDatabase[deck.itsName].meta.field.type
    ).length;
    deck.visibilityField =
      deckDatabase.api.deckDatabase[deck.itsName].meta.field.initialVisibility;
    console.log(deck.visibilityField);
    resetUserScore();
    resetIndex();
  };

  const changeAskForField = (newAskForField) => {
    deck.askForField = newAskForField; // as in field description
  };

  const returnFieldDescriptionForField = (field) => {
    const inputField = field;
    const fieldDescription =
      deckDatabase.api.deckDatabase[deck.itsName].meta.field.description[
        inputField
      ];
    return fieldDescription;
  };

  const returnFieldForFieldDescription = (fieldDescription) => {
    const discription = fieldDescription;

    const field = Object.keys(
      deckDatabase.api.deckDatabase[deck.itsName].meta.field.description
    ).find(
      (key) =>
        deckDatabase.api.deckDatabase[deck.itsName].meta.field.description[
          key
        ] === discription
    );
    return field;
  };

  return {
    api: {
      deck: deck,
      session: session,
      settings: settings,
      increaseIndex: increaseIndex,
      decreaseIndex: decreaseIndex,
      increaseUserScore: increaseUserScore,
      decreaseUserScore: decreaseUserScore,
      resetUserScore: resetUserScore,
      initialize: initialize,
      changeDeck: changeDeck,
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
    // this is based on the control state, i.e. which deck is chosen
    createUIElements();
    fieldUpdate();
    updateUserScore();
    userInputFieldClear(0);
    userEntryPlaceholderUpdate();
  };

  const createSingleHTMLElementNew = (
    targetFunctionalElement,
    newID,
    parentID,
    elementType,
    cssClass,
    HTMLtext,
    inputPlaceholder,
    inputType
  ) => {
    // createSingleHTMLElementNew("box","app", "box", "div", "flexboxContainer");
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
  const createUIElements = () => {

    // const createSingleHTMLElementNew = (targetFunctionalElement,newID,parentID,elementType,cssClass,HTMLtext,placeholder) => {
    createSingleHTMLElementNew("app","div0app", "box", "div", "flexboxWrapper");
    createSingleHTMLElementNew("userScore","div0userScore", "div0app", "div", "flexboxRowWrapper");
    createSingleHTMLElementNew("field","div0field", "div0app", "div", "flexboxColumnWrapper");
    createSingleHTMLElementNew("userInput","div0userInput", "div0app", "div", "flexboxRowWrapper");
    createSingleHTMLElementNew("control","div0control", "div0app", "div", "flexboxRowWrapper");
    createSingleHTMLElementNew("setting","div0setting", "div0app", "div", "flexboxRowWrapper");
    createSingleHTMLElementNew("dropdownAskFor","div0dropdownAskFor", "div0app", "div", "flexboxRowWrapper");
    createSingleHTMLElementNew("dropdownVisiblity","div0dropdownVisiblity", "div0app", "div", "flexboxRowWrapper");
    createSingleHTMLElementNew("dropdownDeck","div0dropdownDeck", "div0app", "div", "flexboxRowWrapper");

    createSingleHTMLElementNew("userScore","p0userScore", "div0userScore", "p", "userScore","n/a");

    createSingleHTMLElementNew("userInput","input0userInput", "div0userInput", "input", "userInput","","Type answer");

    createSingleHTMLElementNew("control","div1btn0control", "div0control", "div", "", "");
    createSingleHTMLElementNew("control","div2btn1control", "div0control", "div", "", "");
    createSingleHTMLElementNew("control","div3btn2control", "div0control", "div", "", "");

    createSingleHTMLElementNew("control","btn0previous", "div1btn0control", "button","flexboxButton", "Previous");
    createSingleHTMLElementNew("control","btn1next", "div2btn1control", "button", "flexboxButton", "Next");
    createSingleHTMLElementNew("control","btn2play", "div3btn2control", "button", "flexboxButton", "Play");

    createSingleHTMLElementNew("setting","div0btn0setting", "div0setting", "div", "", "");
    createSingleHTMLElementNew("setting","div1btn1setting", "div0setting", "div", "", "");
    createSingleHTMLElementNew("setting","div2btn2setting", "div0setting", "div", "", "");

    createSingleHTMLElementNew("setting","btn0askFor", "div0btn0setting", "button", "flexboxButton", "Ask for");
    createSingleHTMLElementNew("setting","btn1Visiblity", "div1btn1setting", "button", "flexboxButton", "Show/Hide");
    createSingleHTMLElementNew("setting","btn2Deck", "div2btn2setting", "button", "flexboxButton", "Deck");

    createSingleHTMLElementNew("dropdownDeck","select0Deck", "div0dropdownDeck", "select", "");


    //Dropdown "Deck"
        const createSelectOption = (targetSelectID,targetFunctionalElement) => {
          const longName = deckDatabase.api.deckNameLong;
          const targetElement = document.getElementById(targetSelectID);

          for (let i=0; i<longName.length; i++){
            const newOption = document.createElement("option");
            newOption.text = longName[i];
            targetElement.add(newOption);
            functionalElement[targetFunctionalElement]["option"+i] = newOption;
          }

          // select the current deck
          const currentDeck = deckDatabase.api.deckDatabase[control.api.deck.itsName].meta.longName;
          
          targetElement.value = currentDeck;

        };

    createSelectOption("select0Deck","dropdownDeck","field");


    // p fields
        const createFieldPar = (targetID,targetFunctionalElement,HTMLtext) => {
          const fieldCount = control.api.deck.fieldCount;
          const targetElement = document.getElementById(targetID);

          for (let i=0; i<fieldCount; i++){
          createSingleHTMLElementNew(targetFunctionalElement,"p"+i+"field", targetID, "p", "flexboxFieldPar", HTMLtext+i);

          }

        }

      createFieldPar("div0field","field","field");

   
      // Checkbox and Label elements of dropdowns (visibility) (askFor) (here labels and checkboxes are only created)
      const createCheckboxLabelElements = (targetID,targetFunctionalElement,dropboxType,CssClassAppendix) => {

        const checkboxCssClass = "flexboxCheckbox"+CssClassAppendix;
        const labelCssClass = "flexboxLabel"+CssClassAppendix;

        const fieldCount = control.api.deck.fieldCount;
        const targetElement = document.getElementById(targetID);
        const fieldName = Object.values(deckDatabase.api.deckDatabase[control.api.deck.itsName].meta.field.description)
        
        //add checkboxes
        for (let i=0; i<fieldCount; i++){
          createSingleHTMLElementNew(targetFunctionalElement,"ckb"+i+dropboxType, targetID, "input", checkboxCssClass, "","","checkbox");
          createSingleHTMLElementNew(targetFunctionalElement,"lbl"+i+dropboxType, targetID, "label", labelCssClass, fieldName[i],"","");

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
    // Get the element with the provided ID
    let element = document.getElementById(id);

    // If the element is currently visible (display !== 'none'), hide it
    if (element.style.display !== "none") {
      element.style.display = "none";
    }
    // If the element is currently hidden (display === 'none'), show it
    else {
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
    // field update is depending on the control deck state
    const fieldContentAtIndex =
      deckDatabase.api.deckDatabase[control.api.deck.itsName].content[
        control.api.session.index
      ];
    const fieldContentAtIndexValue = Object.values(fieldContentAtIndex);

    const fieldCount = control.api.deck.fieldCount;

    //for now this can only add paragraph elements, but consider also Audio and Picture elements
    for (let i = 0; i < fieldCount; i++) {
      functionalElement.field["p" + i + "field"].innerHTML =
        fieldContentAtIndexValue[i];
    }

    //according to visibility hide or show fields
    implementFieldVisibility();
  };
  const userEntryPlaceholderUpdate = () => {
    const askField = control.api.deck.askForField;

    const typeAnswerPlaceholder = "Type answer for (" + askField + ")";
    const targetElement = document.getElementById("input0userInput");
    targetElement.placeholder = typeAnswerPlaceholder;
  };
  const implementFieldVisibility = () => {
    const fieldVisibility = Object.values(control.api.deck.visibilityField);
    const fieldCount = control.api.deck.fieldCount;

    for (let i = 0; i < fieldCount; i++) {
      if (fieldVisibility[i] === "shown") {
        const element = document.querySelector("#p" + i + "field");
        element.style.display = "block";
      } else if (fieldVisibility[i] === "hidden") {
        const element = document.querySelector("#p" + i + "field");
        element.style.display = "none";
      }
    }
  };
  const updateUserScore = () => {
    const userScore = control.api.session.userScore;
    const targetElement = document.getElementById("p0userScore");
    targetElement.innerHTML = "Score:" + userScore;
  };
  const returnCorrectAnswer = () => {
    const askForField = control.api.deck.askForField;
    const fieldContentAtIndex =
      deckDatabase.api.deckDatabase[control.api.deck.itsName].content[
        control.api.session.index
      ];

    const correctAnswer = fieldContentAtIndex[askForField];
    return correctAnswer;
  };
  const userInputFieldCheckAnswer = () => {
    const userAnswer = userInputFieldGetAnswer();
    const correctAnswer = returnCorrectAnswer();

    return userAnswer === correctAnswer;
  };
  const userInputFieldShowAnswer = () => {
    const correctAnswer = returnCorrectAnswer();
    document.querySelector("#input0userInput").value = correctAnswer;
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
      returnCorrectAnswer: returnCorrectAnswer,
      userInputFieldCheckAnswer: userInputFieldCheckAnswer,
      userInputFieldShowAnswer: userInputFieldShowAnswer,
      userInputFieldClear: userInputFieldClear,
      changeFillColor: changeFillColor,
      userInputFieldGetAnswer: userInputFieldGetAnswer,
      initialize: initialize,
      userEntryPlaceholderUpdate: userEntryPlaceholderUpdate,
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
      console.log("initialize new session");

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
      control.api.increaseIndex();
      console.log(control.api.session.index);
      element.api.fieldUpdate();
    },
    previousCard: () => {
      control.api.decreaseIndex();
      console.log(control.api.session.index);
      element.api.fieldUpdate();
    },
    playAudio: () => {
      console.log("play audio");
    },
    showVisibilityDropdown: () => {
      element.api.toggleDropdownVisibility("div0dropdownVisiblity");
      // set the checkoxes to the current visibility
      const currentVisibilityField = Object.values(
        control.api.deck.visibilityField
      );
      const checkboxes = document.querySelectorAll(
        ".flexboxCheckboxVisibility"
      );

      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const visibility = currentVisibilityField[i];

        if (visibility === "shown") {
          checkbox.checked = true;
        } else if (visibility === "hidden") {
          checkbox.checked = false;
        }
      }
    },
    showAskForDropdown: () => {
      element.api.toggleDropdownVisibility("div0dropdownAskFor");

      const currentAskForField = control.api.returnFieldForFieldDescription(
        control.api.deck.askForField
      ); // description

      const currentAskForFieldIndex = currentAskForField.charAt(5);
      const checkboxes = document.querySelectorAll(".flexboxCheckboxAskFor");
      const labels = document.querySelectorAll(".flexboxLabelAskFor");

      console.log(control.api.deck.fieldCount);

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
      const currentCheckbox = checkbox;
      const visibilityField = control.api.deck.visibilityField;

      for (let i = 0; i < control.api.deck.fieldCount; i++) {
        if (checkboxes[i].checked === true) {
          visibilityField["field" + i] = "shown";
        } else visibilityField["field" + i] = "hidden";
      }
      control.api.deck.visibilityField = visibilityField;
      element.api.fieldUpdate();
    },
    askForCheckboxClicked: (checkbox, label) => {
      const checkboxes = document.querySelectorAll(".flexboxCheckboxAskFor");
      const currentCheckbox = checkbox;
      const currentLabel = label;
      const newAskForField = currentLabel.innerHTML;

      for (let element of checkboxes) {
        if (element === currentCheckbox) {
          element.checked = true;
          control.api.changeAskForField(newAskForField);
        } else {
          element.checked = false;
        }
      }
      element.api.userEntryPlaceholderUpdate();
    },
    userConfirmedUserInput: () => {
      const userAnswer = element.api.userInputFieldGetAnswer();
      const userAnswerIsCorrect = element.api.userInputFieldCheckAnswer();
      console.log("user pressed enter");

      if (
        // If no input provided and first enter
        (userAnswer === "") &
        (userState.enterCount === 0) &
        (userState.answerLock === false)
      ) {
        userState.enterCount++;
        console.log(userState.enterCount);
      } else if (
        // if no input provided and second enter
        (userAnswer === "") &
        (userState.enterCount === 1) &
        (userState.answerLock === false)
      ) {
        console.log("user answer is empty and second enter");
        element.api.userInputFieldShowAnswer();
        element.api.changeFillColor("input0userInput", "red", 4);
        control.api.decreaseUserScore();
        element.api.updateUserScore();
        element.api.changeFillColor("p0userScore", "red", 1);
        action.lockAnswer(5);
        element.api.userInputFieldClear(5);
        userState.enterCount = 0;
      } else if (
        userAnswerIsCorrect &
        (userState.enterCount === 0) &
        (userState.answerLock === false)
      ) {
        console.log("user answer is correct");
        element.api.changeFillColor("input0userInput", "green", 1);
        control.api.increaseUserScore();
        element.api.updateUserScore();
        element.api.changeFillColor("p0userScore", "green", 1);
        element.api.userInputFieldClear(0);
        action.nextCard();
        userState.enterCount = 0;
      } else if (
        !userAnswerIsCorrect &
        (userState.enterCount === 0) &
        (userState.answerLock === false)
      ) {
        element.api.changeFillColor("input0userInput", "red", 1);
        control.api.decreaseUserScore();
        element.api.updateUserScore();
        element.api.changeFillColor("p0userScore", "red", 1);
      }
    },

    chooseDeck: (selection) => {
      console.log("A new deck was chosen:" + selection);
      const deckNameShortLong = deckDatabase.api.deckNameShortLong;

      const selectionShortname = Object.keys(deckNameShortLong).find(function (
        key
      ) {
        return deckNameShortLong[key] === selection;
      });
      console.log("the shortname is: " + selectionShortname);

      control.api.changeDeck(selectionShortname); //resets index, user score, reads deck

      console.log("index: " + control.api.session.index);
      console.log("user score: " + control.api.session.userScore);

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
    userConfirmedUserInput: [action.userConfirmedUserInput],

    btn2play: [action.playAudio],

    btn0askFor: [action.showAskForDropdown],
    btn1Visiblity: [action.showVisibilityDropdown],
    btn2Deck: [action.showDeckDropdown],
    chooseDeck: action.chooseDeck,
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

control.api.initialize(); //    //initialize = changedeck to 0 and reset session user score and session reset index
element.api.initialize(); //    starts depending on control state,   createUIElements(); then fieldUpdate() and user score update
interaction.api.initialize();
