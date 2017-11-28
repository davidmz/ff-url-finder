module.exports = [
    {
        text: "aa google.com bb",
        result: [
            {type: "text", text: "aa "},
            {type: "link", text: "google.com", url: "http://google.com/"},
            {type: "text", text: " bb"}
        ]
    },
    {
        text: "google.com",
        result: [
            {type: "link", text: "google.com", url: "http://google.com/"}
        ]
    },
    {
        text: "ftp://google.com",
        result: [
            {type: "link", text: "ftp://google.com", url: "ftp://google.com/"}
        ]
    },
    {
        text: "hxxp://google.com",
        result: [
            {type: "text", text: "hxxp://google.com"}
        ]
    },
    {
        text: "aa (google.com) bb",
        result: [
            {type: "text", text: "aa ("},
            {type: "link", text: "google.com", url: "http://google.com/"},
            {type: "text", text: ") bb"}
        ]
    },
    {
        text: "aa (google.com/((hi[)])), bb",
        result: [
            {type: "text", text: "aa ("},
            {type: "link", text: "google.com/((hi[)])", url: "http://google.com/((hi[)])"},
            {type: "text", text: "), bb"}
        ]
    },
    {
        text: "aa (google.com/, microsoft.com…), bb",
        result: [
            {type: "text", text: "aa ("},
            {type: "link", text: "google.com/", url: "http://google.com/"},
            {type: "text", text: ", "},
            {type: "link", text: "microsoft.com", url: "http://microsoft.com/"},
            {type: "text", text: "…), bb"}
        ]
    },
    {
        text: "aa freefeed.net/abc, m.freefeed.net/def bb",
        result: [
            {type: "text", text: "aa "},
            {type: "localLink", text: "freefeed.net/abc", uri: "/abc"},
            {type: "text", text: ", "},
            {type: "localLink", text: "m.freefeed.net/def", uri: "/def"},
            {type: "text", text: " bb"}
        ]
    },
    {
        text: "aa freefeed.net/abc, @def-xx bb",
        result: [
            {type: "text", text: "aa "},
            {type: "localLink", text: "freefeed.net/abc", uri: "/abc"},
            {type: "text", text: ", "},
            {type: "atLink", text: "@def-xx", username: "def-xx"},
            {type: "text", text: " bb"}
        ]
    },
    {
        text: "aa medium.com/@alice, @alice bb",
        result: [
            {type: "text", text: "aa "},
            {type: "link", text: "medium.com/@alice", url: "http://medium.com/@alice"},
            {type: "text", text: ", "},
            {type: "atLink", text: "@alice", username: "alice"},
            {type: "text", text: " bb"}
        ]
    },
    {
        text: "в телеграме выделяется ссылкой и БЕСИТ DNS:*.example.com - larhat",
        result: [
            {type: "text", text: "в телеграме выделяется ссылкой и БЕСИТ DNS:*.example.com - larhat"}
        ]
    },
    {
        text: "https://map.what3words.com/биоробот.мясной.малиновый",
        result: [
            {
                type: "link",
                text: "https://map.what3words.com/биоробот.мясной.малиновый",
                url: "https://map.what3words.com/биоробот.мясной.малиновый"
            }
        ]
    },
    {
        text: "вот эти http://замкинаокна.рф/p49195244-ogranichitel-otkryvaniya-okna.html/ от этих xn--80aaazglcmlcj.xn--p1ai/p49838778-blokirator-okna-bsl.html",
        result: [
            {type: "text", text: "вот эти "},
            {
                type: "link",
                text: "http://замкинаокна.рф/p49195244-ogranichitel-otkryvaniya-okna.html/",
                url: "http://замкинаокна.рф/p49195244-ogranichitel-otkryvaniya-okna.html/"
            },
            {type: "text", text: " от этих "},
            {
                type: "link",
                text: "замкинаокна.рф/p49838778-blokirator-okna-bsl.html",
                url: "http://xn--80aaazglcmlcj.xn--p1ai/p49838778-blokirator-okna-bsl.html"
            }
        ]
    },
    {
        text: "http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html",
        result: [
            {
                type: "link",
                text: "http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html",
                url: "http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html"
            }
        ]
    },
    {
        text: "https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%80%D1%80%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F_(%D1%84%D0%B8%D0%BB%D1%8C%D0%BC,_2015)",
        // urldecode for humans
        result: [
            {
                type: "link",
                text: "https://ru.wikipedia.org/wiki/Территория_(фильм,_2015)",
                url: "https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%80%D1%80%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F_(%D1%84%D0%B8%D0%BB%D1%8C%D0%BC,_2015)"
            }
        ]
    },
    {
        text: "aa@bb.ru bb@xn--80aaazglcmlcj.xn--p1ai",
        result: [
            {type: "email", text: "aa@bb.ru", address: "aa@bb.ru"},
            {type: "text", text: " "},
            {type: "email", text: "bb@замкинаокна.рф", address: "bb@xn--80aaazglcmlcj.xn--p1ai"}
        ]
    },
    {
        text: "aa http://\uD83C\uDF55\uD83D\uDCA9.ws/\uD83C\uDF56\uD83C\uDF53\uD83C\uDF52\uD83C\uDF71\uD83D\uDCE6\uD83D\uDC51\uD83C\uDFA8\uD83C\uDFB7 bb http://xn--vi8hiv.ws/%F0%9F%8D%96%F0%9F%8D%93%F0%9F%8D%92%F0%9F%8D%B1%F0%9F%93%A6%F0%9F%91%91%F0%9F%8E%A8%F0%9F%8E%B7 cc",
        result: [
            {type: "text", text: "aa "},
            {
                type: "link",
                text: "http://\uD83C\uDF55\uD83D\uDCA9.ws/\uD83C\uDF56\uD83C\uDF53\uD83C\uDF52\uD83C\uDF71\uD83D\uDCE6\uD83D\uDC51\uD83C\uDFA8\uD83C\uDFB7",
                url: "http://\uD83C\uDF55\uD83D\uDCA9.ws/\uD83C\uDF56\uD83C\uDF53\uD83C\uDF52\uD83C\uDF71\uD83D\uDCE6\uD83D\uDC51\uD83C\uDFA8\uD83C\uDFB7"
            },
            {type: "text", text: " bb "},
            {
                type: "link",
                text: "http://\uD83C\uDF55\uD83D\uDCA9.ws/\uD83C\uDF56\uD83C\uDF53\uD83C\uDF52\uD83C\uDF71\uD83D\uDCE6\uD83D\uDC51\uD83C\uDFA8\uD83C\uDFB7",
                url: "http://xn--vi8hiv.ws/%F0%9F%8D%96%F0%9F%8D%93%F0%9F%8D%92%F0%9F%8D%B1%F0%9F%93%A6%F0%9F%91%91%F0%9F%8E%A8%F0%9F%8E%B7"
            },
            {type: "text", text: " cc"}
        ]
    },


    // linkhum cases
    // https://github.com/zverok/linkhum/blob/master/spec%2Ffixtures%2Fexamples.yml
    {
        text: "Just http://google.com",
        result: [
            {type: "text", text: "Just "},
            {type: "link", text: "http://google.com", url: "http://google.com/"}
        ]
    },
    {
        text: "http://slashdot.org/, http://lwn.net/ and others. may be, http://opensource.org/?",
        result: [
            {type: "link", text: "http://slashdot.org/", url: "http://slashdot.org/"},
            {type: "text", text: ", "},
            {type: "link", text: "http://lwn.net/", url: "http://lwn.net/"},
            {type: "text", text: " and others. may be, "},
            {type: "link", text: "http://opensource.org/", url: "http://opensource.org/"},
            {type: "text", text: "?"}
        ]
    },
    {
        text: "it's a movie: https://en.wikipedia.org/wiki/Hours_(2013_film) but it works with just parens (https://www.youtube.com/watch?v=Q9Dv4Hmf_O8)",
        result: [
            {type: "text", text: "it's a movie: "},
            {
                type: "link",
                text: "https://en.wikipedia.org/wiki/Hours_(2013_film)",
                url: "https://en.wikipedia.org/wiki/Hours_(2013_film)"
            },
            {type: "text", text: " but it works with just parens ("},
            {
                type: "link",
                text: "https://www.youtube.com/watch?v=Q9Dv4Hmf_O8",
                url: "https://www.youtube.com/watch?v=Q9Dv4Hmf_O8"
            },
            {type: "text", text: ")"}
        ]
    },
    {
        text: "https://пивбар-хмель.рф/ for the record",
        result: [
            {type: "link", text: "https://пивбар-хмель.рф/", url: "https://пивбар-хмель.рф/"},
            {type: "text", text: " for the record"}
        ]
    },
    {
        text: "http://www.booking.com/searchresults.html?sid=79b5eeb441120b08fcd3ebe467b0a0b8;dcid=1;bb_asr=2&class_interval=1&csflt=%7B%7D&dest_id=-2167973&dest_type=city&dtdisc=0&group_adults=2&group_children=0&hlrd=0&hyb_red=0&idf=1&inac=0&nha_red=0&no_rooms=1&offset=0&redirected_from_city=0&redirected_from_landmark=0&redirected_from_region=0&review_score_group=empty&score_min=0&si=ai,co,ci,re,di&src=index&ss=Lisbon,%20Lisbon%20Region,%20Portugal&ss_all=0&ss_raw=Lisbon&ssb=empty&sshis=0&",
        // capturing final &, urldecode
        result: [
            {
                type: "link",
                text: "http://www.booking.com/searchresults.html?sid=79b5eeb441120b08fcd3ebe467b0a0b8;dcid=1;bb_asr=2&class_interval=1&csflt={}&dest_id=-2167973&dest_type=city&dtdisc=0&group_adults=2&group_children=0&hlrd=0&hyb_red=0&idf=1&inac=0&nha_red=0&no_rooms=1&offset=0&redirected_from_city=0&redirected_from_landmark=0&redirected_from_region=0&review_score_group=empty&score_min=0&si=ai,co,ci,re,di&src=index&ss=Lisbon, Lisbon Region, Portugal&ss_all=0&ss_raw=Lisbon&ssb=empty&sshis=0&",
                url: "http://www.booking.com/searchresults.html?sid=79b5eeb441120b08fcd3ebe467b0a0b8;dcid=1;bb_asr=2&class_interval=1&csflt=%7B%7D&dest_id=-2167973&dest_type=city&dtdisc=0&group_adults=2&group_children=0&hlrd=0&hyb_red=0&idf=1&inac=0&nha_red=0&no_rooms=1&offset=0&redirected_from_city=0&redirected_from_landmark=0&redirected_from_region=0&review_score_group=empty&score_min=0&si=ai,co,ci,re,di&src=index&ss=Lisbon,%20Lisbon%20Region,%20Portugal&ss_all=0&ss_raw=Lisbon&ssb=empty&sshis=0&"
            }
        ]
    },
    {
        text: "http://squadette.ru/foo?bar=1&baz=2 ampersands in URL",
        result: [
            {type: "link", text: "http://squadette.ru/foo?bar=1&baz=2", url: "http://squadette.ru/foo?bar=1&baz=2"},
            {type: "text", text: " ampersands in URL"}
        ]
    },
    {
        text: "XSS: http://example.com/foo?\">here.</a><script>window.alert(\"wow\");</script>",
        result: [
            {type: "text", text: "XSS: "},
            {type: "link", text: "http://example.com/foo", url: "http://example.com/foo"},
            {type: "text", text: "?\">here.</a><script>window.alert(\"wow\");</script>"}
        ]
    },
    {
        text: "I should go to http://lurkmore.to/!",
        result: [
            {type: "text", text: "I should go to "},
            {type: "link", text: "http://lurkmore.to/", url: "http://lurkmore.to/"},
            {type: "text", text: "!"}
        ]
    },
    {
        text: "I should go to lurkmore.to!",
        result: [
            // non-standard TLD
            {type: "text", text: "I should go to lurkmore.to!"}
        ]
    },
    {
        text: 'You are saying "go to http://google.com/", like it is something bad!',
        result: [
            {type: "text", text: 'You are saying "go to '},
            {type: "link", text: "http://google.com/", url: "http://google.com/"},
            {type: "text", text: '", like it is something bad!'}
        ]
    },
    {
        text: 'Lone http://',
        result: [
            {type: "text", text: 'Lone http://'}
        ]
    },
    {
        text: "IPs: http://127.0.0.1:3000/",
        result: [
            {type: "text", text: "IPs: "},
            {type: "link", text: "http://127.0.0.1:3000/", url: "http://127.0.0.1:3000/"}
        ]
    },
    {
        text: "https://ru.wikipedia.org/wiki/Эффект_Даннинга_—_Крюгера",
        result: [
            {
                type: "link",
                text: "https://ru.wikipedia.org/wiki/Эффект_Даннинга_—_Крюгера",
                url: "https://ru.wikipedia.org/wiki/Эффект_Даннинга_—_Крюгера"
            }
        ]
    },
    {
        text: 'uri = Addressable::URI.parse("http://www.\u8A79\u59C6\u65AF.com/"), why not?',
        result: [
            {type: "text", text: "uri = Addressable::URI.parse(\""},
            {type: "link", text: "http://www.\u8A79\u59C6\u65AF.com/", url: "http://www.\u8A79\u59C6\u65AF.com/"},
            {type: "text", text: "\"), why not?"}
        ]
    },
    {
        text: 'anchors: https://github.com/octopress/ink#usage',
        result: [
            {type: "text", text: "anchors: "},
            {
                type: "link",
                text: "https://github.com/octopress/ink#usage",
                url: "https://github.com/octopress/ink#usage"
            }
        ]
    },
    {
        text: 'Upcased HTTP://GOOGLE.COM',
        result: [
            {type: "text", text: "Upcased "},
            {type: "link", text: "HTTP://GOOGLE.COM", url: "HTTP://GOOGLE.COM/"}
        ]
    },
    {
        text: 'Skype bug  http://:',
        result: [
            {type: "text", text: "Skype bug  http://:"}
        ]
    },
    {
        text: 'а так же www.ridero.ru. фотографирую ',
        result: [
            {type: "text", text: "а так же "},
            {type: "link", text: "www.ridero.ru", url: "http://www.ridero.ru/"},
            {type: "text", text: ". фотографирую "}
        ]
    },
    {
        text: 'https://www.youtube.com/playlist?list=PLoN0DWDChjH9sPVc8m-aXdxmeMxgT1jG-',
        result: [
            {
                type: "link",
                text: "https://www.youtube.com/playlist?list=PLoN0DWDChjH9sPVc8m-aXdxmeMxgT1jG-",
                url: "https://www.youtube.com/playlist?list=PLoN0DWDChjH9sPVc8m-aXdxmeMxgT1jG-"
            }
        ]
    },
    {
        text: 'https://docs.google.com/document/d/1JcBOGg7rmAk9wOtSN9r-PFnCZx1zVIHNuLB2zT8LmGQ/edit#',
        result: [
            {
                type: "link",
                text: "https://docs.google.com/document/d/1JcBOGg7rmAk9wOtSN9r-PFnCZx1zVIHNuLB2zT8LmGQ/edit#",
                url: "https://docs.google.com/document/d/1JcBOGg7rmAk9wOtSN9r-PFnCZx1zVIHNuLB2zT8LmGQ/edit#"
            }
        ]
    },
    {
        text: 'ff.net+БФ',
        result: [
            {type: "link", text: "ff.net", url: "http://ff.net/"},
            {type: "text", text: "+БФ"}
        ]
    },
    {
        text: 'ff.net/+БФ',
        result: [
            {type: "link", text: "ff.net/+БФ", url: "http://ff.net/+БФ"}
        ]
    },
    {
        text: 'ff.net:8080+БФ',
        result: [
            {type: "link", text: "ff.net:8080", url: "http://ff.net:8080/"},
            {type: "text", text: "+БФ"}
        ]
    },
    // CP1251
    {
        text: "http://www.multitran.ru/c/m.exe?s=%F2%F0%EE%E9%EA%E0",
        result: [
            {
                type: "link",
                text: "http://www.multitran.ru/c/m.exe?s=%F2%F0%EE%E9%EA%E0",
                url: "http://www.multitran.ru/c/m.exe?s=%F2%F0%EE%E9%EA%E0"
            }
        ]
    },
    {
        text: "seminarist@lj:",
        result: [
            {type: "text", text: "seminarist@lj:"}
        ]
    },
    {
        text: "john+smith@gmail.com",
        result: [
            {type: "email", text: "john+smith@gmail.com", address: "john+smith@gmail.com"}
        ]
    },
    {
        text: "one #two three",
        result: [
            {type: "text", text: "one #two three"}
        ]
    },
    {
        text: "one #two three",
        withHashTags: true,
        result: [
            {type: "text", text: "one "},
            {type: "hashTag", text: "#two", hashTag: "two"},
            {type: "text", text: " three"}
        ]
    },
    {
        text: "#кошка-мышка-Ё-",
        withHashTags: true,
        result: [
            {type: "hashTag", text: "#кошка-мышка-Ё", hashTag: "кошка-мышка-Ё"},
            {type: "text", text: "-"}
        ]
    },
    {
        text: "#кошка-λ",
        withHashTags: true,
        result: [
            {type: "hashTag", text: "#кошка-λ", hashTag: "кошка-λ"}
        ]
    },
    {
        text: "23#кошка",
        withHashTags: true,
        result: [
            {type: "text", text: "23#кошка"}
        ]
    },
    {
        text: "23 #-кошка #_- #αβγ⅛- 32",
        withHashTags: true,
        result: [
            {type: "text", text: "23 #-кошка #_- "},
            {type: "hashTag", text: "#αβγ⅛", hashTag: "αβγ⅛"},
            {type: "text", text: "- 32"}
        ]
    },
    {
        text: "Например, он ловит #obrázek, но не ловит #obrázek.",
        withHashTags: true,
        result: [
            {type: "text", text: "Например, он ловит "},
            {type: "hashTag", text: "#obrázek", hashTag: "obrázek"},
            {type: "text", text: ", но не ловит "},
            {type: "hashTag", text: "#obrázek", hashTag: "obrázek"},
            {type: "text", text: "."}
        ]
    },
    {
        text: "URL типа freefeed.net//anything site.net//anything",
        result: [
            {type: "text", text: "URL типа "},
            {type: "localLink", text: "freefeed.net//anything", uri: "/.//anything"},
            {type: "text", text: " "},
            {type: "link", text: "site.net//anything", url: "http://site.net//anything"}
        ]
    },
    {
        text: "https://freefeed.net/ m.freefeed.net m.freefeed.net/xxx",
        result: [
            {type: "link", text: "https://freefeed.net/", url: "https://freefeed.net/"},
            {type: "text", text: " "},
            {type: "link", text: "m.freefeed.net", url: "http://m.freefeed.net/"},
            {type: "text", text: " "},
            {type: "localLink", text: "m.freefeed.net/xxx", uri: "/xxx"}
        ]
    },
    {
        text: "^,^^ ↑↑↑ !!!",
        result: [
            {type: "text", text: "^,^^ ↑↑↑ !!!"}
        ]
    },
    {
        text: "^,^^,↑↑↑!!! ^.",
        withArrows: true,
        result: [
            {type: "arrow", text: "^", count: 1},
            {type: "text", text: ","},
            {type: "arrow", text: "^^", count: 2},
            {type: "text", text: ","},
            {type: "arrow", text: "↑↑↑", count: 3},
            {type: "text", text: "!!! "},
            {type: "arrow", text: "^", count: 1},
            {type: "text", text: "."}
        ]
    },
    {
        text: "раз^W два",
        withArrows: true,
        result: [
            {type: "text", text: "раз^W два"}
        ]
    },
    {
        text: "=^-^= 10^21Bq например^this (=^・^=) >^_^< (^0_0^)",
        withArrows: true,
        result: [
            {type: "text", text: "=^-^= 10^21Bq например^this (=^・^=) >^_^< (^0_0^)"}
        ]
    },
    {
        text: "abc «http://example.com/»",
        result: [
            {type: "text", text: "abc «"},
            {type: "link", text: "http://example.com/", url: "http://example.com/"},
            {type: "text", text: "»"}
        ]
    },
    {
        text: "RT @okay_awesome",
        result: [
            {type: "text", text: "RT @okay_awesome"}
        ]
    },
    {
        text: "ru.wikipedia.org/wiki/Колода_«Русский_стиль»",
        result: [
            {type: "link", text: "ru.wikipedia.org/wiki/Колода_«Русский_стиль»", url: "http://ru.wikipedia.org/wiki/Колода_«Русский_стиль»"}
        ]
    },
    {
        text: "freefeed.net@gmail.com",
        result: [
            {type: "email", text: "freefeed.net@gmail.com", address: "freefeed.net@gmail.com"}
        ]
    },
    {
        text: "www.freefeed.net@gmail.com",
        result: [
            {type: "email", text: "www.freefeed.net@gmail.com", address: "www.freefeed.net@gmail.com"}
        ]
    },
    {
        text: "www.clips.com.au",
        result: [
            {type: "text", text: "www.clips.com.au"}
        ]
    }
];
