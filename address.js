const {
  rndBool,
  rndPromoCodes,
  fetchAPI,
  rndAmount,
  rndInventory,
} = require("./utils");
const fs = require("fs");
const users = require("./accounts.json");

async function createData() {
  let dataArray = [];
  let numberOfUsers = 10;
  let getUserInfo = await fetchAPI(
    `https://randomuser.me/api/?results=${numberOfUsers}`
  );

  for (let i = 0; i < numberOfUsers; i++) {
    let acountIds = [];
    let counter = 0;
    for (let j = 0; j < 5; j++) {
      if (counter > users.length - 1) {
        return;
      }
      acountIds.push(users[counter].account_id);
      counter++;
    }
    console.log(`${i + 1}/${numberOfUsers} users created`);
    console.log(acountIds);
    let dataObj = {
      branch_id: `00${i + 1}`,
      street: getUserInfo.results[i].location.street,
      city: getUserInfo.results[i].location.city,
      state: getUserInfo.results[i].location.state,
      phone: getUserInfo.results[i].phone,
      postalZip: getUserInfo.results[i].location.postcode,
      primary_accounts: acountIds,
    };

    dataArray.push(dataObj);
  }

  let dictstring = JSON.stringify(dataArray);

  fs.writeFile("generated-addresses.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });
}

createData();
