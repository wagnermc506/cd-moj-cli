const fs = require('fs');

function saveFile(obj) {
    fs.writeFileSync(`${process.cwd}/contest.json`, Buffer.from(JSON.stringify(obj)));
    return;
}

function loadFile() {
    return JSON.parse(fs.readFileSync(`${process.cwd}/contest.json`));
}

module.exports = {saveFile}