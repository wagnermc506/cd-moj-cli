const restler = require('restler');

function getLoginInfo() {
    restler.post('https://moj.naquadah.com.br/cgi-bin/login.sh/' + contestName, {
        multipart: true,
        data: {
            "login": username,
            "senha": senha,
        }
    })
    .on("complete", (data) => {

    })
}

function getContestPage() {
    restler.get('https://moj.naquadah.com.br/cgi-bin/contest.sh/' + contestName, {
        headers: {
            cookie: `simpleTabsCookie=simpleTabsCookie_5_0; \
            login=${username}; hash=${hash}`,
        }
    })
    .on("complete", (data, response) => {

    })
}