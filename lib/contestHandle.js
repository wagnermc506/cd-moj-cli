const request = require('./requests');
const searchString = require('./searchString');

function registerContest(login) {
    return new Promise( resolve => {
        const newContest = {
            "contestName": login.contestName,
            "name": login.username,
            "password": login.password,
            "hash": null,
            "expireDate": null
        };
        let wait = getHash(newContest);
        wait.then((result) => {
            resolve(result);
        }).catch((e) => {
            console.log(e);
        })
    })
}

function changeHash(hash, obj) {
    obj.hash = hash;
}

function changeExpireDate(date, obj) {
    obj.expireDate = date;
}

function getHash(obj) {
    return new Promise( resolve => {
        let promise = request.getLoginInfo(obj);
        promise.then(
            (result) => {
                let data = searchString.sendData(result);
                changeHash(data.hash, obj);
                changeExpireDate(data.expireDate, obj);
                // saveContestFile(obj);
                resolve(obj);
            }
        ).catch(e => {
            console.log(e);
        })
    })
}

function verifyHash(obj) {
    if (verifyDate(obj.expireDate)){
        return new Promise( resolve => resolve(null))
    }
    return new Promise( resolve => {
        getHash(obj)
        .then( (obj) => {
            resolve(obj)
        }
        ).catch((e) => {console.log(e)})
    })
}

function verifyDate(expireDate) {
    if(Date.now() < new Date(expireDate)) {
        return true;
    }
    return false;
}

module.exports = {registerContest, verifyHash, verifyDate};