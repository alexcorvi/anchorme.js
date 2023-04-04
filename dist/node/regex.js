"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iidxes = exports.urlRegex = exports.fileRegex = exports.emailRegex = exports.ipRegex = exports.finalRegex = exports.final = exports.file = exports.url = exports.email = void 0;
var dictionary_1 = require("./dictionary");
var emailAddress = "([\\w!#$%&'*+=?^`{|}~-]+(?:\\.[\\w!#$%&'*+=?^`{|}~-]+)*)";
var domain = "(?:(?:(?:[a-z\\d]|[a-z\\d][\\w\\-]*[a-z\\d]))\\.)+(xn--[a-z\\d]{2,}|[a-z]{2,})(?=[^.]|\\b)";
var allowedInPath = "\\w\\-.~\\!$&*+,;=:@%'\"\\[\\]()?#";
var path = "((?:/|\\?)(?:([".concat(allowedInPath).concat(dictionary_1.nonLatinAlphabetRanges, "\\/](?:[\\w\\-~+=#&\\/").concat(dictionary_1.nonLatinAlphabetRanges, "]|\\b)+)*)+)");
var ipv4 = "((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?))";
var ipv6 = "\\[(?:(?:[a-f\\d:]+:+)+[a-f\\d]+)\\]";
var port = "(:(\\d{1,5}))?";
var protocol = "(ht{2}ps?:|ftps?:)\\/\\/";
var confirmedByProtocol = "(".concat(protocol, ")\\S+\\b");
var fqdn = "(((".concat(protocol, ")?(").concat(domain, "|").concat(ipv4, ")\\b").concat(port, ")|(?:").concat(confirmedByProtocol, "))");
exports.email = "\\b(mailto:)?".concat(emailAddress, "@(").concat(domain, "|").concat(ipv4, ")\\b");
exports.url = "(".concat(fqdn, ")").concat(path, "?");
exports.file = "(file:\\/\\/\\/)(?:[a-z]+:(?:\\/|\\\\)+)?([\\w.]+(?:[\\/\\\\]?)+)+";
exports.final = "\\b((".concat(exports.email, ")|(").concat(exports.file, ")|(").concat(exports.url, "))(\\b)?");
exports.finalRegex = new RegExp(exports.final, "gi");
// for validation purposes
exports.ipRegex = new RegExp("^(".concat(ipv4, "|").concat(ipv6, ")$"), "i");
exports.emailRegex = new RegExp("^(".concat(exports.email, ")$"), "i");
exports.fileRegex = new RegExp("^(".concat(exports.file, ")$"), "i");
exports.urlRegex = new RegExp("^(".concat(exports.url, ")$"), "i");
// identifying parts of the link
// the initial value of this object is precomputed.
// https://github.com/alexcorvi/anchorme.js/blob/098843bc0d042601cff592c4f8c9f6d0424c09cd/src/regex.ts
var iidxes = {
    isFile: 0,
    file: {
        fileName: 0,
        protocol: 0,
    },
    isEmail: 0,
    email: {
        protocol: 0,
        local: 0,
        host: 0,
    },
    isURL: 0,
    url: {
        // two places where TLD can appear (URL, email)
        TLD: [0, 0],
        // two places where protocol can appear
        protocol: [0, 0],
        host: [0],
        ipv4: 0,
        byProtocol: 0,
        port: 0,
        protocolWithDomain: 0,
        path: 0,
    },
};
exports.iidxes = iidxes;
/***
 * When Editing the regular expressions above the code below must be run
 * Before deployment and release the iidexes in console log must be copied to the object above
 *  --------------------------------
*/
var testers = [
    "file:///some/file/path/filename.pdf",
    "mailto:e+_mail.me@sub.domain.com",
    "http://sub.domain.co.uk:3000/p/a/t/h_(asd)/h?q=abc123#dfdf",
    "http://www.\u0639\u0631\u0628\u064A.com",
    "http://127.0.0.1:3000/p/a/t_(asd)/h?q=abc123#dfdf",
    "http://[2a00:1450:4025:401::67]/k/something",
    "a.ta/p",
    "a@b.cd",
    "www.github.com/path",
];
for (var i = 0; i < testers.length; i++) {
    var element = testers[i];
    var result = exports.finalRegex.exec(element);
    if (result === null) {
        continue;
    }
    if (i === 0) {
        iidxes.isFile = result.lastIndexOf(result[0]);
        iidxes.file.fileName = result.indexOf("filename.pdf");
        iidxes.file.protocol = result.indexOf("file:///");
    }
    if (i === 1) {
        iidxes.isEmail = result.lastIndexOf(result[0]);
        iidxes.email.protocol = result.indexOf("mailto:");
        iidxes.email.local = result.indexOf("e+_mail.me");
        iidxes.email.host = result.indexOf("sub.domain.com");
    }
    if (i === 2) {
        iidxes.isURL = result.lastIndexOf(result[0]);
        iidxes.url.protocol[0] = result.indexOf("http://");
        iidxes.url.protocolWithDomain = result.indexOf("http://sub.domain.co.uk:3000");
        iidxes.url.port = result.indexOf("3000");
        iidxes.url.path = result.indexOf("/p/a/t/h_(asd)/h?q=abc123#dfdf");
    }
    if (i === 3) {
        iidxes.url.byProtocol = result.lastIndexOf("http://www.عربي.com");
    }
    if (i === 4) {
        iidxes.url.ipv4 = result.lastIndexOf("127.0.0.1");
    }
    if (i === 5) {
        iidxes.url.protocol[1] = result.lastIndexOf("http://");
    }
    if (i === 6) {
        iidxes.url.TLD[0] = result.indexOf("ta");
    }
    if (i === 7) {
        iidxes.url.TLD[1] = result.indexOf("cd");
    }
    if (i === 8) {
        iidxes.url.host[0] = result.lastIndexOf("www.github.com");
    }
    exports.finalRegex.lastIndex = 0;
}
console.log(JSON.stringify(iidxes));
