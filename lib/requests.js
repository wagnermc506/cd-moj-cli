const restler = require('restler');
const superagent = require('superagent');

function getLoginInfo(obj) {
    return new Promise( resolve => {
        restler.post(`https://moj.naquadah.com.br/cgi-bin/login.sh/${obj.contestName}`, {
            multipart: true,
            data: {
                "login": obj.name,
                "senha": obj.password,
            }
        })
        .on("complete", (data) => {
            resolve(data);
        })
    }) 
}

function getContestPage(obj) {
    restler.get(`https://moj.naquadah.com.br/cgi-bin/contest.sh/${obj.contestName}`, {
        headers: {
            cookie: `simpleTabsCookie=simpleTabsCookie_5_0; \
            login=${obj.name}; hash=${obj.hash}`,
        }
    })
    .on("complete", (data, response) => {

    })
}

function submit(obj, filename) {
    superagent.post(`https://moj.naquadah.com.br/cgi-bin/submete.sh/${obj.contestName}`)
        //.set("user-agent", "node/superagent")
        .set("Cookie", `simpleTabsCookie=simpleTabsCookie_5_0; login=${obj.name}; hash=${obj.hash}`)
        .set("Accept", "*/*")
        .field("problem", "0")
        .attach("filename", filename)
        .then(() => {
            return;
        }).catch((e) => {console.log(e)})
}

module.exports = {getLoginInfo, submit}