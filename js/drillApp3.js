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
    if (deck.index < deck.maxIndex) {
      deck.index++;
    }
  };

  const decreaseIndex = () => {
    if (deck.index > 0) {
      deck.index--;
    }
  };

  const increaseUserScore = () => {
    session.userScore++;
  };

  const decreaseUserScore = () => {
    if (session.userScore > 0) {
      session.userScore--;
    }
  };

  const initialize = () => {
    changeDeck(deckDatabase.api.deckNameShort[0]);
  };

  const changeDeck = (newDeckName) => {
    deck.itsName = newDeckName;
    deck.maxIndex =
      deckDatabase.api.deckDatabase[deck.itsName].content.length - 1;
    deck.askForField =
      deckDatabase.api.deckDatabase[deck.itsName].meta.fieldToAskFor;
    deck.fieldCount = Object.keys(
      deckDatabase.api.deckDatabase[deck.itsName].meta.field.type
    ).length;
    deck.visibilityField = Object.keys(
      deckDatabase.api.deckDatabase[deck.itsName].meta.field.initialVisibility
    );
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
      initialize: initialize,
      changeDeck: changeDeck,
    },
  };
})();

const element = (() => {

  let functionalElement = {
    box:{div0box:document.getElementById("box")},
    app:{},
    userScore:{},
    field:{},
    userInput:{},
    control:{},
    setting:{},
    dropdownAskFor:{},
    dropdownVisiblity:{},
    dropdownDeck:{}
    }

    const createSingleHTMLElementNew = (targetFunctionalElement,newID,parentID,elementType,cssClass,HTMLtext) => {
      // createSingleHTMLElementNew("box","app", "box", "div", "flexboxContainer");
      const newElement = document.createElement(elementType);
      newElement.className = cssClass;
      newElement.id = newID;
  
      if (typeof HTMLtext === "string") {
        newElement.innerHTML = HTMLtext;
      }
  
      const targetElement = document.getElementById(parentID);
      targetElement.appendChild(newElement);
  
      if (elementType == "div") {
        functionalElement[targetFunctionalElement][newID] = newElement;
      }
      if (elementType == "button") {
        functionalElement[targetFunctionalElement][newID] = newElement;
      }
      if (elementType == "select") {
        functionalElement[targetFunctionalElement][newID] = newElement;
      }
      if (elementType == "p") {
        functionalElement[targetFunctionalElement][newID] = newElement;
      }

      if (elementType == "option") {
        functionalElement[targetFunctionalElement][newID] = newElement;
      }

    }



  // const createContentField = (targetID) => {
  //   const targetElement = document.getElementById(targetID);

  //   for (let i = 0; i < control.api.deck.fieldCount; i++) {
  //     const divName = "contentSubfield" + i;
  //     const newElement = document.createElement("div");
  //     newElement.id = divName;
  //     targetElement.appendChild(newElement);
  //     htmlElements.subFieldCollection[newElement.id] = newElement;
  //   }
  // };

  // const createContentFieldParagraph = (text) => {
  //   const targetSubField = Object.values(htmlElements.subFieldCollection);

  //   for (let i = 0; i < targetSubField.length; i++) {
  //     const newElement = document.createElement("p");
  //     newElement.innerHTML = text + i;
  //     newElement.id = "subFieldParagraph" + i;
  //     targetSubField[i].appendChild(newElement);
  //     htmlElements.subFieldParagraphCollection[newElement.id] = newElement;
  //   }
  // };


  const createUIElements = () => {

    // const createSingleHTMLElementNew = (targetFunctionalElement,newID,parentID,elementType,cssClass,HTMLtext) => {
    createSingleHTMLElementNew("app","div0app", "box", "div", "flexboxContainer");
    createSingleHTMLElementNew("userScore","div0userScore", "div0app", "div", "flexboxRowContainer");
    createSingleHTMLElementNew("field","div0field", "div0app", "div", "flexboxColumnContainer");
    createSingleHTMLElementNew("userInput","div0userInput", "div0app", "div", "flexboxRowContainer");
    createSingleHTMLElementNew("control","div0control", "div0app", "div", "flexboxRowContainer");
    createSingleHTMLElementNew("setting","div0setting", "div0app", "div", "flexboxRowContainer");
    createSingleHTMLElementNew("dropdownAskFor","div0dropdownAskFor", "div0app", "div", "flexboxRowContainer");
    createSingleHTMLElementNew("dropdownVisiblity","div0dropdownVisiblity", "div0app", "div", "flexboxRowContainer");
    createSingleHTMLElementNew("dropdownDeck","div0dropdownDeck", "div0app", "div", "flexboxRowContainer");

    createSingleHTMLElementNew("userScore","p0userScore", "div0userScore", "p", "");

    createSingleHTMLElementNew("control","btn0previous", "div0control", "button", "", "Previous");
    createSingleHTMLElementNew("control","btn1next", "div0control", "button", "", "Next");
    createSingleHTMLElementNew("control","btn2play", "div0control", "button", "", "Play");

    createSingleHTMLElementNew("control","btn0AskFor", "div0control", "button", "", "Ask for");
    createSingleHTMLElementNew("control","btn1Visiblity", "div0control", "button", "", "Show/Hide");
    createSingleHTMLElementNew("control","btn2Deck", "div0control", "button", "", "Deck");

    createSingleHTMLElementNew("dropdownDeck","select0Deck", "div0dropdownDeck", "select", "");


    
        const createSelectOption = (targetSelectID,targetFunctionalElement) => {
          const longName = deckDatabase.api.deckNameLong;
          const targetElement = document.getElementById(targetSelectID);

          for (let i=0; i<longName.length; i++){
            const newOption = document.createElement("option");
            newOption.text = longName[i];
            targetElement.add(newOption);
            functionalElement[targetFunctionalElement]["option"+i] = newOption;


          }
        };

    createSelectOption("select0Deck","dropdownDeck");


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

  return {
    api: {
      createUIElements: createUIElements,
      functionalElement: functionalElement,
      deleteUIElements: deleteUIElements,
    },
  };
})();

control.api.initialize();
element.api.createUIElements();
element.api.deleteUIElements();
console.log(element.api.functionalElement)
