const restler = require('restler');

function getLoginInfo() {
    return new Promise( resolve => {
        restler.post(`https://moj.naquadah.com.br/cgi-bin/login.sh/${contestName}`, {
            multipart: true,
            data: {
                "login": username,
                "senha": senha,
            }
        })
        .on("complete", (data) => {
            resolve(data);
        })
    }) 
}

function getContestPage() {
    restler.get(`https://moj.naquadah.com.br/cgi-bin/contest.sh/${contestName}`, {
        headers: {
            cookie: `simpleTabsCookie=simpleTabsCookie_5_0; \
            login=${username}; hash=${hash}`,
        }
    })
    .on("complete", (data, response) => {

    })
}

function submit() {
    return new Promise( resolve => {
        restler.post(`'https://moj.naquadah.com.br/cgi-bin/submite.sh/${contestName}`, {
            multipart: true,
            headers: {
                cookie: `simpleTabsCookie=simpleTabsCookie_5_0; login=${username}; hash=${hash}`
            },
            data: {
                problem: problemValue,
                filename: restler.file(path, filename, null, null, text/x-csrc)
            }
        })
    })
}

module.exports = {getLoginInfo}