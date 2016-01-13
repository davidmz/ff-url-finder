/**
 * Shorten URL
 *
 * @param {string} url - URL to shorten
 * @param {int} limit - maximum length of url without proto://
 * @return {string}
 */
module.exports = function (url, limit) {
    var m = /^(https?:\/\/)?([^\/]+)(?:\/([^#?]*))?(?:\?([^#]*))?(?:#(.*))?/i.exec(url),
        proto = m[1] || "",
        host = m[2],
        path = m[3],
        query = m[4],
        hash = m[5],
        parts,
        href = buildHref(host, path, query, hash);

    if (href.length <= limit) {
        return proto + href;
    }

    if (hash) {
        var p1 = hash.indexOf("/"),
            p2 = hash.indexOf("&"),
            s = "";
        if (p1 === -1 && p2 === -1) {
            // nope
        } else if (p1 === -1) {
            s = "&";
        } else if (p2 === -1) {
            s = "/";
        } else if (p1 < p2) {
            s = "/";
        } else {
            s = "&";
        }

        if (s !== "") {
            parts = hash.split(s);
            while (parts.length > 1) {
                parts.pop();
                href = buildHref(host, path, query, parts.join(s)) + s + "\u2026";
                if (href.length <= limit) {
                    return proto + href;
                }
            }
        }

        href = buildHref(host, path, query) + "#\u2026";
        if (href.length <= limit) {
            return proto + href;
        }
    }

    if (query) {
        parts = query.split("&");
        while (parts.length > 1) {
            parts.pop();
            href = buildHref(host, path, parts.join("&")) + "&\u2026";
            if (href.length <= limit) {
                return proto + href;
            }
        }
        href = buildHref(host, path) + "?\u2026";
        if (href.length <= limit) {
            return proto + href;
        }
    }

    if (path) {
        parts = path.split("/");
        while (parts.length > 1) {
            var lastPart = parts.pop();
            var dashParts = lastPart.split("-");
            while (dashParts.length > 1) {
                dashParts.pop();
                href = buildHref(host, parts.join("/") + "/" + dashParts.join("-")) + "-\u2026";
                if (href.length <= limit) {
                    return proto + href;
                }
            }
            href = buildHref(host, parts.join("/")) + "/\u2026";
            if (href.length <= limit) {
                return proto + href;
            }
        }
        href = buildHref(host) + "/\u2026";
    }

    return proto + href;
};

function buildHref(host, path, query, hash) {
    return host
        + ((path || query || hash) ? "/" + path : "")
        + (query ? "?" + query : "")
        + (hash ? "#" + hash : "");
}