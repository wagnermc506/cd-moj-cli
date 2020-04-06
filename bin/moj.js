#!/usr/bin/env node

const getInput = require('../src/utils/inputHandle').getInput;
const register = require('../src/utils/contestHandle').registerContest;
const saveFile = require('../src/utils/fileHandle').saveFile;

[,, ...args] = process.argv; 

if(args.includes("init")) {
    let input = getInput();
    input.then(
        (result) => {
            let contestData = register(result);
            saveFile(contestData);
        }
    ).catch((e) => {
        console.log(e);
    })
}