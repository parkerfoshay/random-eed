const {
  uniqueNamesGenerator,
  names,
  adjectives,
  animals,
  colors,
  countries,
} = require("unique-names-generator");

function rndScore() {
  let arrayOfNumbers = [];

  for (let i = 0; i < 25; i++) {
    let rndNum = Math.floor(Math.random() * 100);
    arrayOfNumbers.push(rndNum);
  }

  return arrayOfNumbers;
}

function rndAmount() {
  return Math.random() * 1000;
}

function rndName() {
  const config = {
    dictionaries: [names],
  };

  const characterName = uniqueNamesGenerator(config);

  return characterName;
}

function rndTags() {
  let tagsArray = [];

  const config = {
    dictionaries: [adjectives],
  };

  for (let i = 0; i < 10; i++) {
    let tagName = uniqueNamesGenerator(config);
    tagsArray.push(tagName);
  }

  return tagsArray;
}

function rndPets() {
  let arrayOfPets = [];

  const config = {
    dictionaries: [adjectives],
  };

  for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
    let petObj = {
      petName: uniqueNamesGenerator({ dictionaries: [names] }),
      animal: uniqueNamesGenerator({ dictionaries: [animals] }),
      age: Math.floor(Math.random() * 14),
    };
    arrayOfPets.push(petObj);
  }

  return arrayOfPets;
}

function rndAddress() {
  let address = {
    streetNumber: Math.floor(Math.random() * 9999),
    street: uniqueNamesGenerator({ dictionaries: [colors, ["ST"]] }),
    country: uniqueNamesGenerator({ dictionaries: [countries] }),
  };

  return address;
}

function rndBool() {
  return Math.random() < 0.5;
}

module.exports = { rndBool, rndAddress, rndPets, rndTags, rndName, rndAmount, rndScore }