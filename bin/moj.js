#!/usr/bin/env node

const getInput = require('../lib/inputHandle').getInput;
const register = require('../lib/utils/contestHandle').registerContest;
const {saveContestFile, loadAnswerFile} = require('../lib/fileHandle');
const submit = require('../lib/requests').submit;

const fs = require('fs');
//const path = require('path');

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
    // if(args[1] == null) return console.log("No path");
    //const filename = loadAnswerFile(process.cwd() + '/' + args[1]);
    //filename = path.parse(filename);
    const filename = process.cwd() + '/' + args[1];

    let teste = fs.readFileSync(filename);

    // console.log(teste);
    // console.log(teste.toString());

    submit(obj, teste, filename);
    console.log("first");
    //submit(obj, filename).then().catch((e) => {console.log(e)})
}