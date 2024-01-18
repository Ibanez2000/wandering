// import data from"../files/drillData/testNew2.js";
const data = require('../files/drillData/testNew2.js').data;

console.log(data);

const Deck = (() => {
  const deck = data;

  const availableDeckNames = Object.keys(deck);
  console.log(availableDeckNames);

  return {
    api: {
      deck: deck,
      availableDeckNames: availableDeckNames,
    },
  };
  
})();

console.log(Deck.api.deck);

const control = (function () {
  let deck = {
    deckName: "test",
    index: 0,
    maxIndex: 0,
    userScore: 0,
    askForField: "",
    fieldCount: 0,
    visibilityField: [],
    test: "test",
  };

  const initialize = () => {
    deck.deckName = Deck.api.availableDeckNames[0];
    deck.maxIndex = Deck.api.deck[deckName].content.length - 1;
    deck.askForField = Deck.api.deck[deckName].meta.fieldToAskFor;
    deck.fieldCount = Object.keys(
      Deck.api.deck[deckName].meta.field.type
    ).length;
    deck.visibilityField = Object.keys(
      Deck.api.deck[deckName].meta.field.initialVisibility
    );

  };
  console.log(deck.test);

})();
