const data = {
  JAAnime: {
    meta: {
      longName: "Japanese Anime",
      externalURL: "test",
      fieldToAskFor:"field1",
      field: {
        description: {
          field0: "number",
          field1: "hiragana",
          field2: "kanji",
          field3: "type",
          field4: "meaning",
          field5: "unused1",
          field6: "unused2",
          field7: "unused3",
        },
        type: {
          field0: "text",
          field1: "text",
          field2: "text",
          field3: "text",
          field4: "text",
          field5: "text",
          field6: "picture",
          field7: "audio",
        },
        initialVisibility: {
          field0: "shown",
          field1: "shown",
          field2: "shown",
          field3: "shown",
          field4: "hidden",
          field5: "hidden",
          field6: "hidden",
          field7: "hidden",
        },
      },
    },
    content: [
      {
        "field0": 1,
        "field1": "むきわらばうし",
        "field2": "麦わら帽子",
        "field3": "(名)",
        "field4": "straw hat",
        "field5": "",
        "field6": "",
        "field7": ""
      },
      {
        "field0": 2,
        "field1": "えをかく",
        "field2": "絵を描く",
        "field3": "(名)",
        "field4": "to paint (draw) a picture",
        "field5": "eokaku",
        "field6": "",
        "field7": ""
      },
      {
        "field0": 3,
        "field1": "ちきゅう",
        "field2": "地球",
        "field3": "(名)",
        "field4": "Earth; the globe",
        "field5": "chikyuu",
        "field6": "",
        "field7": ""
      },
    ],
  },
  JASimpleNouns: {
    meta: {
      longName: "Japanese Simple Nouns",
      externalURL: "test",
      fieldToAskFor:"field0",
      field: {
        description: {
          field0: "number",
          field1: "Bopomofo",
          field2: "kanji",
          field3: "type",
          field4: "Chinese Meaning",
          field5: "unused1",
          field6: "unused2",
          field7: "unused3",
        },
        type: {
          field0: "text",
          field1: "text",
          field2: "text",
          field3: "text",
          field4: "text",
          field5: "text",
          field6: "picture",
          field7: "audio",
        },
        initialVisibility: {
          field0: "shown",
          field1: "shown",
          field2: "shown",
          field3: "hidden",
          field4: "hidden",
          field5: "hidden",
          field6: "hidden",
          field7: "hidden",
        },
      },
    },
    content: [
      {
        field0: "1a",
        field1: "content1",
        field2: "content2",
        field3: "content3",
        field4: "content4",
        field5: "content5",
        field6: "content6",
        field7: "content7",
      },
      {
        field0: "2a",
        field1: "content1",
        field2: "content2",
        field3: "content3",
        field4: "content4",
        field5: "content5",
        field6: "content6",
        field7: "content7",
      },
    ],
  }
};


export default data;
//node
// module.exports.data = data;
