#!/usr/bin/env node

const getInput = require('../src/utils/inputHandle').getInput;
const register = require('../src/utils/contestHandle').registerContest;
const {saveContestFile, loadAnswerFile} = require('../src/utils/fileHandle');
const submit = require('../src/utils/requests').submit;

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
    
    const obj = {
        contestName: "silistaopublicocompleto20192apc",
        username: "wagnermc506",
        hash: "73d08870c689ea80812eb67d057176f7"
    }

    let teste = fs.readFileSync(filename);

    // console.log(teste);
    // console.log(teste.toString());

    submit(obj, teste, filename);

    //submit(obj, filename).then().catch((e) => {console.log(e)})
}