const request = require('./requests');
const loginResponse = require('./searchString');

function registerContest(login) {
    newContest = {
        "contestName": login.contestName,
        "name": login.username,
        "password": login.password,
        "hash": null,
        "expireDate": null
    };
    getHash(newContest);
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
    return getHash(obj);
}

function getHash(obj) {
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

module.exports = {registerContest};