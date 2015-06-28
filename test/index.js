var should = require('chai').should();
var parse = require('../index');
var testData = require('./data');

var localDomains = ["freefeed.net", "m.freefeed.net"];

describe('Parser', function() {
    testData.forEach(function(task) {
        it('parses `' + task.text + '`', function() {
            parse(task.text, localDomains).should.deep.equal(task.result);
        });
    });
});
