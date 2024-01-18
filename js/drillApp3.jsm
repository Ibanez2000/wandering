import data from "../files/drillData/testNew2.js";


const Deck = (()=> {

    meta = deckData.meta;
    content = deckData.content;

    return {
        API: {
            meta: meta,
            content: content,
        }
    }


})();











const Control = (() => {
  let deck = {
    name: "",
    index: 0,
    maxIndex: 0,
    userScore: 0,
    askForField: "",
    fieldCount: 0,
    visibilityField: [],
  };
  settings = {
    hotkeysEnabled: false,
    audioAfterReveal: false,
  };

  const indexIncrease = () => {
    if (deck.index < deck.maxIndex) {
      deck.index++;
    }
  };

  const indexDecrease = () => {
    if (deck.index > 0) {
      deck.index--;
    }
  };
  const increaseUserScore = () => {};
  const init = () => {};

  return {
    API: {
      deck: deck,
      settings: settings,
      init: init,
    },
  };
})();
