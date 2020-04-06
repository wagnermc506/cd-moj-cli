const prompt = require('prompt');

//prompt.start();

let contestName = {
    "name": "contestName",
    "description": "Enter the contest name",
    "required": true
}

let username = {
    "name": "username",
    "description": "Enter your username",
    "required": true
};

let password = {
    "name": "password",
    "description": "Enter your password",
    "required": true,
    "hidden": true,
    "replace": "*"
};

function getInput() {
    return new Promise(resolve => {
        prompt.get([contestName, username, password],
            (err, result) => {
                resolve(result);
                // console.log(result.username);
                // console.log(result.password);
            }    
        )
    })   
}

module.exports = {getInput};