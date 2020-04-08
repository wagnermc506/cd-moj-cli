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

// function submit(obj, path, teste) {
//     return new Promise( resolve => {
//         restler.post(`'https://moj.naquadah.com.br/cgi-bin/submete.sh/${obj.contestName}`, {
//             multipart: true,
//             headers: {
//                 cookie: `simpleTabsCookie=simpleTabsCookie_5_0; login=${obj.username}; hash=${obj.hash}`
//             },
//             data: {
//                 problem: "0",
//                 filename: restler.file(path, null, 30000)
//             }
//         }).on("complete", () => {
//             resolve();
//         })
//     })
// }

function submit(obj, filebuf, filename) {
    superagent.post(`https://moj.naquadah.com.br/cgi-bin/submete.sh/${obj.contestName}`)
        //.set("user-agent", "node/superagent")
        .set("Cookie", `simpleTabsCookie=simpleTabsCookie_5_0; login=${obj.username}; hash=${obj.hash}`)
        .set("Accept", "*/*")
        .field("problem", "0")
        .attach("filename", filebuf, filename)
        .then(() => {
            console.log("ok")
        }).catch((e) => {console.log(e)})
}

module.exports = {getLoginInfo, submit}