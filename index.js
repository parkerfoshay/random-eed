const {
  rndBool,
  rndPromoCodes,
  fetchAPI,
  rndAmount,
  rndInventory,
} = require("./utils");
const fs = require("fs");

async function createData() {
  let dataArray = [];
  let numberOfUsers = 50;
  let getUserInfo = await fetchAPI(
    `https://randomuser.me/api/?results=${numberOfUsers}`
  );

  for (let i = 0; i < numberOfUsers; i++) {
    let seller = rndBool();
    let inventory = await rndInventory();
    let codes = await rndPromoCodes();
    let dataObj = {
      name: {
        firstName: getUserInfo.results[i].name.first,
        lastName: getUserInfo.results[i].name.last,
      },
      gender: getUserInfo.results[i].gender,
      address: {
        street: getUserInfo.results[i].location.street,
        city: getUserInfo.results[i].location.city,
        state: getUserInfo.results[i].location.state,
        postalZip: getUserInfo.results[i].location.postcode,
        cords: {
          latitude: getUserInfo.results[i].location.coordinates.latitude,
          longitude: getUserInfo.results[i].location.coordinates.longitude,
        },
      },
      phone: getUserInfo.results[i].phone,
      email: getUserInfo.results[i].email,
      loginInfo: {
        username: getUserInfo.results[i].login.username,
        password: getUserInfo.results[i].login.sha256,
      },
      birthdayInfo: {
        dob: getUserInfo.results[i].dob.date,
        age: getUserInfo.results[i].dob.age,
      },
      balance: rndAmount(),
      inventory: seller ? inventory : null,
      isSeller: seller,
      promoCodes: codes,
    };

    dataArray.push(dataObj);
  }

  let dictstring = JSON.stringify(dataArray);

  fs.writeFile("data.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });
}

createData();
