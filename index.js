var punycode = require("punycode");
var shorten = require("./shorten");

// see hashtag-syntax.md
var hashtagWord = /[^\u0000-\u0020\u007F\u0080-\u00A0\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E\u00A1-\u00BF\u00D7\u00F7\u2000\u206F]+/.source;

var urlReString = "\\b(" +
    "((https?|ftp):\\/\\/|www\\.)[^\\s<>]+" +
    "|([a-zа-я0-9][a-zа-я0-9-]*\\.)+($TLD$xn--[a-z0-9]+)(?::\\d+)?(?:/[^\\s<>]*)?" +
    ")" +
    "|([a-z0-9\\.\\&\\~\\!\\%_+-]+@(?:[a-zа-я0-9-]+\\.)+[a-zа-я0-9-]+)\\b" +
    "|\\B@([a-z0-9]+(?:[_-][a-z0-9]+)*)" +
    "|\\B#(" + hashtagWord + "(?:[_-]" + hashtagWord + ")*)" +
    "|(\u2191+|\\^+)";

var finalPuncts = /[\x21\x22\x24\x25\x27-\x2a\x2c\x2e\x3a-\x3f\x5b-\x60\x7b-\x7e\u2026\xAB\xBB\u2018-\u201F]+$/; // Base latin punctuation except '/', '-', '+', '#' and '&' include ellipsis and quotes

function URLFinder(tlDomains, localDomains) {
    var tldString = tlDomains ? tlDomains.join("|") + "|" : "";
    this.localDomains = localDomains || [];
    this.urlRe = new RegExp(urlReString.replace("$TLD$", tldString), "ig");
    this.withHashTags = false;
    this.withArrows = false;
}

URLFinder.shorten = shorten;

URLFinder.prototype.parse = function (text) {
    var result = [],
        pos = 0,
        self = this;

    this.tokenize(text)
        .map(trimPunct)
        .filter(function (f) {
            // in case if after trimPunct we have invalid url
            self.urlRe.lastIndex = 0;
            return (f.type !== "url" || self.urlRe.test(f.match));
        })
        .map(function (f) {
            if (f.type !== "url") return f;

            // url-s: protocol and final slash
            f.url = f.withProtocol ? f.match : "http://" + f.match;
            delete f.withProtocol;

            if (/^\w+:\/\/[^\/]+$/.test(f.url)) f.url += "/";
            return f;
        })
        .forEach(function (f) {
            var t, m;
            if (f.pos != pos) {
                result.push({
                    type: "text",
                    text: text.substr(pos, f.pos - pos)
                });
            }
            if (f.type === "atLink") {
                if (f.match.indexOf('_') === -1) {
                    result.push({
                        type: "atLink",
                        text: f.match,
                        username: f.match.substr(1)
                    });
                } else {
                    result.push({
                        type: "text",
                        text: f.match
                    });
                }

            } else if (f.type === "hashTag") {
                if (self.withHashTags) {
                    result.push({
                        type: "hashTag",
                        text: f.match,
                        hashTag: f.match.substr(1)
                    });
                } else {
                    result.push({
                        type: "text",
                        text: f.match
                    });
                }

            } else if (f.type === "arrow") {
                if (self.withArrows) {
                    result.push({
                        type: "arrow",
                        text: f.match,
                        count: f.match.length
                    });
                } else {
                    result.push({
                        type: "text",
                        text: f.match
                    });
                }

            } else if (f.type === "email") {
                // beautify domain
                m = /^([^@]+@)(.+)/.exec(f.match);
                t = m[1] + punycode.toUnicode(m[2]);
                result.push({
                    type: "email",
                    text: t,
                    address: f.match
                });

            } else if (f.type === "url") {
                m = /^\w+:\/\/([^\/]+)(.*)/.exec(f.url);
                if (m !== null && self.localDomains.indexOf(m[1].toLowerCase()) !== -1 && m[2] !== "" && m[2] !== "/") {
                    result.push({
                        type: "localLink",
                        text: f.match,
                        uri: m[2].replace(/^\/\//, "/.//")
                    });
                } else {
                    // beautify url
                    t = f.match;
                    try {
                        t = decodeURIComponent(t);
                    } catch (e) {
                    }
                    m = /^(\w+:\/\/)?([^\/]+)(.*)/.exec(t);
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

    return mergeTexts(result);
};

URLFinder.prototype.tokenize = function (text) {
    var found, founds = [];

    this.urlRe.lastIndex = 0;
    while ((found = this.urlRe.exec(text)) !== null) {
        var f = {
            match: found[0],
            pos: found.index,
            withProtocol: !!found[2] && found[2].toLowerCase() !== "www.",
            type: "url"
        };
        if (found[6]) {
            f.type = "email";
        } else if (found[7]) {
            f.type = "atLink";
        } else if (found[8]) {
            f.type = "hashTag";
        } else if (found[9]) {
            f.type = "arrow";
            if (!checkArrow(f, text)) {
                continue;
            }
        }

        if (f.type === "url" && !f.withProtocol && f.pos > 0 && text.charAt(f.pos - 1) === ".") {
            // fix for test case '*.example.com'
            continue;
        }

        founds.push(f);
    }

    return founds;
};

function trimPunct(f) {
    if (f.type !== "url") return f;

    var m = finalPuncts.exec(f.match);
    if (m === null) return f;
    var fin = m[0];

    if (!/[)}\]]/.test(fin)) {
        // no closes brackets, just cut it all
        f.match = f.match.substr(0, f.match.length - fin.length);
        return f;
    }

    var b = bracketBalance(f.match.substr(0, f.match.length - fin.length));
    if (b === 0) {
        // brackets balanced, just cut it all
        f.match = f.match.substr(0, f.match.length - fin.length);
        return f;
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
            return f;
        }
    }

    return f;
}

/**
 *
 * @param {string} text
 * @return {number}
 */
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

function checkArrow(f, text) {
    if (
        f.match.charAt(0) == "\u2191"
        || f.match.length > 1
        || f.pos == 0 || f.pos == text.length - 1
    ) {
        return true;
    }

    var prevChar = text.charAt(f.pos - 1),
        nextChar = text.charAt(f.pos + 1);

    if (nextChar == "W") {
        return false;
    }

    var re = /[\s,.]/;

    return (re.test(prevChar) || re.test(nextChar));
}

/**
 * merge text nodes
 * @param {Array} nodes
 * @return {Array}
 */
function mergeTexts(nodes) {
    return nodes.reduce(function (res, node) {
        if (node.type === "text" && res.length > 0 && res[res.length - 1].type === "text") {
            res[res.length - 1].text += node.text;
        } else {
            res.push(node);
        }
        return res;
    }, []);
}

module.exports = URLFinder;
