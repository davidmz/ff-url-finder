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
        parts, s, parts1,
        href = buildHref(host, path, query, hash);

    if (href.length <= limit) {
        return proto + href;
    }

    if (hash) {
        s = closestDivider(hash, ["/", "&"]);
        if (s !== null) {
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
            s = closestDivider(lastPart, ["-", "_"]);
            if (s !== null) {
                parts1 = lastPart.split(s);
                while (parts1.length > 1) {
                    parts1.pop();
                    href = buildHref(host, parts.join("/") + "/" + parts1.join(s)) + s + "\u2026";
                    if (href.length <= limit) {
                        return proto + href;
                    }
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

function closestDivider(text, dividers) {
    var positions = dividers
        .map(function (d) { return [d, text.indexOf(d)]; })
        .filter(function (p) { return p[1] >= 0; })
        .sort(function (a, b) {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return 1;
            return 0;
        });

    if (positions.length == 0) return null;

    return positions[0][0];
}