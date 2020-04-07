#!/usr/bin/env node

const getInput = require('../src/utils/inputHandle').getInput;
const register = require('../src/utils/contestHandle').registerContest;
const {saveContestFile, loadAnswerFile} = require('../src/utils/fileHandle');

[,, ...args] = process.argv; 

if(args.includes("init")) {
    let input = getInput();
    input.then(
        (result) => {
            let contestData = register(result);
            contestData.then((result) => {
                saveContestFile(result);
            })
        }
    ).catch((e) => {
        console.log(e);
    })
}

else if(args[0] == "submit") {
    if(args[1] == null) return console.log("No path");
    const filename = loadAnswerFile(process.cwd() + '/' + args[1]);
    
}