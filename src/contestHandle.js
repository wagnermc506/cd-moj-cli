const fs = require('fs');
const request = require('./requests');
const loginResponse = require('./loginResponse');

function SearchContest(name) {
    const list = loadFile();
    list.contests.map( (contest) => {
        if(contest.contestName == name) {
            return contest;
        }
    });
    return registerContest();
}

function registerContest() {
    newContest = {
        "contestName": null,
        "name": null,
        "senha": null,
        "hash": null,
        "expireDate": null
    };
    createHash(newContest);
    return newContest;
}

function changeHash(hash, obj) {
    obj.hash = hash;
}

function changeExpireDate(date, obj) {
    obj.expireDate = date;
}

function verifyHash(obj) {
    if (verifyDate(obj.expireDate)) return;
    return createHash(obj);
}

function createHash(obj) {
    let promise = request.getLoginInfo();
    promise.then(
        (result) => {
            let data = loginResponse.sendData(result);
            changeHash(data.hash, obj);
            changeExpireDate(data.expireDate, obj);
            saveFile(obj);
            return;
        }
    ).catch(e => {
        console.log(e);
    })
}

function verifyDate(expireDate) {
    if(expireDate < Date.now()) {
        return true;
    }
    return false;
}

function loadFile() {
    return JSON.parse(fs.readFileSync("./src/contestLogin.json"));
}

function saveFile(obj) {
    fs.writeFileSync("./src/contestLogin.json", Buffer.from(JSON.stringify(obj)));
    return;
}
