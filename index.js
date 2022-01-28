const { rndBool, rndAddress, rndPets, rndTags, rndName, rndAmount, rndScore } = require("./utils")
const fs = require('fs');
let DateGenerator = require('random-date-generator');


function createData() {
    let data = [];

    for (let i = 0; i < 1000; i++) {
        let dataObj = {
            name: rndName(),
            amount: rndAmount(),
            scores: rndScore(),
            tags: rndTags(),
            pets: rndPets(),
            address: rndAddress(),
            isRemote: rndBool(),
            dateCreated: DateGenerator.getRandomDate()
        };

        data.push(dataObj);
    }

    let dictstring = JSON.stringify(data);

    fs.writeFile("data.json", dictstring, function(err, result) {
        if(err) console.log('error', err);
    });
}

createData()