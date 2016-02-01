/**
 * Shorten URL
 *
 * @param {string} url - URL to shorten
 * @param {int} limit - maximum length of url without proto://
 * @return {string}
 */
module.exports = function (url, limit) {
    var m = /^(https?:\/\/)?([^\/]+)(.*)/i.exec(url),
        proto = m[1] || "",
        host = m[2],
        tail = m[3];

    if (tail === "" || tail === "/") return proto + host;

    var re = /[\/?&#_-]/g,
        prevPos = -1,
        parts = [];
    while ((m = re.exec(tail)) !== null) {
        parts.push(tail.substring(prevPos + 1, m.index + 1));
        prevPos = m.index;
    }
    if (prevPos < tail.length - 1) {
        parts.push(tail.substring(prevPos + 1));
    }

    var i, s = host, q;
    for (i = 0; i < parts.length; i++) {
        q = s + parts[i];
        if (q.length > limit - 1) {
            return proto + s + "\u2026";
        }
        s = q;
    }
    return proto + s;
};