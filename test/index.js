require('chai').should();
var URLFinder = require('../index');
var testData = require('./data');
var shortenTestData = require('./shorten-data');

var finder = new URLFinder(["ru", "com", "net", "org", "рф"], ["freefeed.net", "m.freefeed.net"]);

describe('Parser', function () {
    testData.forEach(function (task) {
        it('parses `' + task.text + '`', function () {
            finder.parse(task.text).should.deep.equal(task.result);
        });
    });
});

describe('Shortener', function () {
    var MAX_LEN = 30;
    shortenTestData.forEach(function (url) {
        it('shortens `' + url + '`', function () {
            var shUrl = URLFinder.shorten(url, MAX_LEN);
            var m = /^(https?:\/\/)?(.*)/i.exec(shUrl);
            var tail = m[2];
            // Хвост должен быть не длиннее лимита
            tail.should.have.length.most(MAX_LEN);

            if (/^(https?:\/\/)?[^\/]+\/$/i.test(url)) {
                // Если путь состоит из одного слэша и за ним ничего нет, то он обрезается
                shUrl.should.be.equal(url.substr(0, url.length - 1));

            } else if (shUrl.charAt(shUrl.length - 1) === "\u2026") {
                // Если URL обрезан, то только после символа /?&#-
                shUrl.charAt(shUrl.length - 2).should.match(/[\/?&#-]/);
                var head = shUrl.substr(0, shUrl.length - 1);
                // Часть до обрезки должна совпадать с началом урла
                url.substr(0, head.length).should.be.equal(head);

            } else {
                // Урлы должны совпадать
                url.should.be.equal(shUrl);
            }
        });
    });
});
