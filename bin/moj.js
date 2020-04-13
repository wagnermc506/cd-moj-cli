#!/usr/bin/env node

const {getInput} = require('../lib/inputHandle');
const {registerContest, verifyHash} = require('../lib/contestHandle');
const {saveContestFile, loadContestFile, loadAnswerFile} = require('../lib/fileHandle');
const {submit} = require('../lib/requests');

// const fs = require('fs');
//const path = require('path');

[,, ...args] = process.argv; 

if(args[0] == "init") {
    let input = getInput();
    input.then(
        (result) => {
            let contestData = registerContest(result);
            contestData.then((result) => {
                saveContestFile(result);
            })
        }
    ).catch((e) => {
        console.log(e);
    })
}

else if(args[0] == "submit") {
    if(args[1] == null) return console.log("No file selected");
    let obj = loadContestFile();
    
    verifyHash(obj)
    .then((result) => {
        if(result) {
            saveContestFile(result);
            obj = result;
        }
        const filename = process.cwd() + '/' + args[1];
        submit(obj, filename);
    })
    .catch((e) => {console.log(e)});
}