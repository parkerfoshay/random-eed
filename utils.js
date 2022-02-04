const {
  uniqueNamesGenerator,
  names,
  adjectives,
  animals,
  colors,
  countries,
} = require("unique-names-generator");

const axios = require('axios');

async function fetchAPI(url) {
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

function rndScore() {
  let arrayOfNumbers = [];

  for (let i = 0; i < 25; i++) {
    let rndNum = Math.floor(Math.random() * 100);
    arrayOfNumbers.push(rndNum);
  }

  return arrayOfNumbers;
}

function rndAmount() {
  let number = Math.random() * 1000;
  return parseFloat(number.toFixed(2))
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

async function rndInventory() {
  let arrayOfInventory = [];
  let numberOfItems = Math.floor(Math.random() * 25)

  let data = await fetchAPI(`https://random-data-api.com/api/appliance/random_appliance?size=${numberOfItems}`)

  for (let i = 0; i < numberOfItems; i++) {
    let randomNumber = Math.random() * 125;
    let inventoryObj = {
      uid: data[i].uid,
      brand: data[i].brand,
      item: data[i].equipment,
      price: parseFloat(randomNumber.toFixed(2))
    };
    
    arrayOfInventory.push(inventoryObj);
  }

  return arrayOfInventory;
}

function rndBool() {
  return Math.random() < 0.5;
}

module.exports = { rndBool, rndInventory, rndTags, fetchAPI, rndAmount, rndScore }