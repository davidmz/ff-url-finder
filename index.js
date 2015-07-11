var punycode = require('punycode');

var urlRe = /\b(((https?|ftp):\/\/|www\.)[^\s<>]+|([a-zа-я0-9][a-zа-я0-9-]*\.)+(ru|com|net|org|рф|xn--[a-z0-9]+)(?![a-zа-я0-9-])[^\s<>]*)|([a-z0-9\.\&\~\!\%_-]+@(?:[a-zа-я0-9-]+\.)+[a-zа-я0-9-]+)\b|@([a-z0-9]+(-[a-z0-9]+)*)/ig;
var finalPuncts = /[\x21-\x25\x27-\x2e\x3a-\x3f\x5b-\x60\x7b-\x7e\u2026]+$/; // Base latin punctuation except '/' and '&' include ellipsis

function tokenize(text) {
    var found, founds = [];

    urlRe.lastIndex = 0;
    while ((found = urlRe.exec(text)) !== null) {
        var f = {
            match: found[0],
            pos: found.index,
            withProtocol: !!found[2],
            type: "url"
        };
        if (found[6]) {
            f.type = "email";
        } else if (found[7]) {
            f.type = "atLink";
        }

        if (f.type === "url" && !f.withProtocol && f.pos > 0 && text.charAt(f.pos - 1) === ".") {
            // fix for test case '*.example.com'
            continue;
        }
        /*
        if (f.type === "atLink" && f.pos > 0 && /\w/.test(text.charAt(f.pos - 1))) {
            // fix for email addresses
            continue;
        }
        */
        founds.push(f);
    }

    return founds;
}

function trimPunct(f) {
    if (f.type !== "url") return;

    var m = finalPuncts.exec(f.match);
    if (m === null) return;
    var fin = m[0];

    if (!/[)}\]]/.test(fin)) {
        // no closes brackets, just cut it all
        f.match = f.match.substr(0, f.match.length - fin.length);
        return;
    }

    var b = bracketBalance(f.match.substr(0, f.match.length - fin.length));
    if (b === 0) {
        // brackets balanced, just cut it all
        f.match = f.match.substr(0, f.match.length - fin.length);
        return;
    }

    m = /[^)}\]]+$/.exec(fin);
    if (m !== null) {
        // trim non-brackets
        fin = fin.substr(0, fin.length - m[0].length);
        f.match = f.match.substr(0, f.match.length - m[0].length);
    }

    for (var i = 0; i < fin.length; i++) {
        b += bracketBalance(fin.charAt(i));
        if (b === 0) {
            f.match = f.match.substr(0, f.match.length - fin.length + i + 1);
            return;
        }
    }
}

function parse(text, localDomains) {
    localDomains = localDomains || [];

    var result = [],
        pos = 0;

    tokenize(text)
        .map(function(f) {
            trimPunct(f);
            return f;
        })
        .filter(function(f) {
            // in case if after trimPunct we have invalid url
            urlRe.lastIndex = 0;
            return (f.type !== "url" || urlRe.test(f.match));
        })
        .map(function(f) {
            if (f.type !== "url") return f;

            // url-s: protocol and final slash
            f.url = f.withProtocol ? f.match : "http://" + f.match;
            delete f.withProtocol;

            if (/^\w+:\/\/[^\/]+$/.test(f.url)) f.url += "/";
            return f;
        })
        .forEach(function(f) {
            if (f.pos != pos) {
                result.push({
                    type: "text",
                    text: text.substr(pos, f.pos - pos)
                });
            }
            if (f.type === "atLink") {
                result.push({
                    type: "atLink",
                    text: f.match,
                    username: f.match.substr(1)
                });

            } else if (f.type === "email") {
                // beautify domain
                var m = /^([^@]+@)(.+)/.exec(f.match);
                t = m[1] + punycode.toUnicode(m[2]);
                result.push({
                    type: "email",
                    text: t,
                    address: f.match
                });

            } else if (f.type === "url") {
                var m = /^\w+:\/\/([^\/]+)(.*)/.exec(f.url);
                if (localDomains.indexOf(m[1].toLowerCase()) !== -1) {
                    result.push({
                        type: "localLink",
                        text: f.match,
                        uri: m[2]
                    });
                } else {
                    // beautify url
                    var t = decodeURIComponent(f.match);
                    var m = /^(\w+:\/\/)?([^\/]+)(.*)/.exec(t);
                    t = (m[1] ? m[1] : "") + punycode.toUnicode(m[2]) + m[3];

                    result.push({
                        type: "link",
                        text: t,
                        url: f.url
                    });
                }
            }

            pos = f.pos + f.match.length;
        });
    if (pos < text.length) {
        result.push({
            type: "text",
            text: text.substr(pos)
        });
    }

    return result;
}

function bracketBalance(text) {
    var brackets = {
            "(": 1,
            ")": -1,
            "[": 100,
            "]": -100,
            "{": 10000,
            "}": -10000
        },
        i, c, b = 0;
    for (i = 0; i < text.length; i++) {
        c = text.charAt(i);
        if (c in brackets) b += brackets[c];
    }
    return b;
}

module.exports = parse;