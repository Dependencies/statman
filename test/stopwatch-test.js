/*jslint node: true */
"use strict";

var Stopwatch = require('../lib/Stopwatch');

exports.initStopwatch = function(test) {
    var stopwatch = new Stopwatch('mystopwatch');
    test.equal(stopwatch.name, 'mystopwatch');
    test.done();
};

exports.initStopwatchWithoutName = function(test) {
    var stopwatch = new Stopwatch();
    test.ok(stopwatch.name !== undefined);
    test.done();
};

exports.startAndReadStopwatch = function(test) {
    var stopwatch = new Stopwatch('mystopwatch');
    console.log('starting stopwatch');
    stopwatch.start();
    console.log('started stopwatch');
    setTimeout(function() {
        console.log('finishing stopwatch');
        var delta = stopwatch.read();
        console.log('read stopwatch [%s]', delta);
        verifyDelta(test, 1000, delta, 10);
        test.done();
        console.log('done!');
    }, 1000);
};

function verifyDelta(test, expected, actual, acceptedVariance) {
    var lowerThreshold = expected - acceptedVariance;
    var upperThreshold = expected + acceptedVariance;
    var message = "Expected " + expected + " ± " + acceptedVariance + ", but was " + actual + ".";
    console.log(message);
    test.ok((actual >= lowerThreshold) && (actual <= upperThreshold), message);
}