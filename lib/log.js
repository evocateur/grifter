/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
var color = require('ansi-color').set;
var hasColor = false;
var stdio;
var quiet;
try {
    stdio = require("stdio");
    hasColor = stdio.isStderrATTY();
} catch (ex) {
    hasColor = true;
}

exports.isTTY = hasColor;

exports.quiet = function () {
    quiet = true;
};

exports.color = function (str, code) {
    if (!hasColor) {
        return str;
    }
    if (code === 'gray' || code === 'grey') {
        code = 'white';
    }
    return color(str, code);
};

var prefix = exports.color('grifter', 'magenta');

exports.info = function (str) {
    if (!quiet) {
        console.log(prefix, color('[info]', 'white'), str);
    }
};

exports.log = function (str) {
    if (!quiet) {
        console.log(prefix, color('[queu]', 'cyan'), str);
    }
};

exports.warn = function (str) {
    console.log(prefix, color('[warn]', 'yellow'), str);
};

exports.debug = function (str) {
    console.log(prefix, color('[debug]', 'yellow'), str);
};

exports.error = function (str) {
    console.error(prefix, color('[error]', 'red'), str);
    process.exit(1);
};

exports.err = exports.bail = function (str) {
    console.error(prefix, color('[err]', 'red'), str);
};
