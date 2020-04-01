module.exports = {SearchHash, SearchExpireDate};

function SearchWord(string, word) {
    const letter_h = string.indexOf(word);
    if (letter_h < 0) {
        console.log("Falha em encontrar o hash, tente novamente");
        process.exit()
    }
    return letter_h;
}

function SearchHash(string) {
    letter_h = SearchWord(string, "hash");

    let begin_hash = string.indexOf("=", letter_h) + 1;
    let end_hash = string.indexOf(";", letter_h);
    return string.slice(begin_hash, end_hash);
}

function SearchExpireDate(string) {
    letter_e = SearchWord(string, "expires");

    let begin_date = string.indexOf("=", letter_e) + 1;
    let end_date = string.indexOf(";", letter_e);
    return string.slice(begin_date, end_date)
}