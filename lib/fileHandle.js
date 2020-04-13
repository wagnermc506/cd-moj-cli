const fs = require('fs');
const path = require('path');

function saveContestFile(obj) {
    fs.writeFileSync(`${process.cwd()}/contest.json`, Buffer.from(JSON.stringify(obj)));
    return;
}

function loadContestFile() {
    return JSON.parse(fs.readFileSync(`${process.cwd()}/contest.json`));
}

function loadAnswerFile(filename) {
    return fs.readFileSync(filename);
}

module.exports = {saveContestFile, loadContestFile, loadAnswerFile}
