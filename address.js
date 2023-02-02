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
  let acountIds = [];
  let counter = 0;
  let getUserInfo = await fetchAPI(
    `https://randomuser.me/api/?results=${numberOfUsers}`
  );

  for (let j = 0; j < users.length - 1; j++) {
    if (counter > users.length - 1) {
      return;
    }
    acountIds.push(users[counter].account_id);
    counter++;
  }

  let start = 0;
  let end = 5;

  for (let i = 0; i < numberOfUsers; i++) {
    console.log(start, end);
    console.log(acountIds.slice(start, end));
    let dataObj = {
      branch_id: `00${i + 1}`,
      street: getUserInfo.results[i].location.street,
      city: getUserInfo.results[i].location.city,
      state: getUserInfo.results[i].location.state,
      phone: getUserInfo.results[i].phone,
      postalZip: getUserInfo.results[i].location.postcode,
      primary_accounts: acountIds.slice(start, end),
    };

    start += 5;
    end += 5;

    dataArray.push(dataObj);
  }

  let dictstring = JSON.stringify(dataArray);

  fs.writeFile("generated-addresses.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });
}

createData();
