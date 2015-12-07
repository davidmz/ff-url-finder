require('chai').should();
var URLFinder = require('../index');
var testData = require('./data');

var finder = new URLFinder(["ru", "com", "net", "org", "рф"], ["freefeed.net", "m.freefeed.net"]);

describe('Parser', function () {
    testData.forEach(function (task) {
        it('parses `' + task.text + '`', function () {
            finder.parse(task.text).should.deep.equal(task.result);
        });
    });
});
