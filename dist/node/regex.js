"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iidxes = exports.urlRegex = exports.fileRegex = exports.emailRegex = exports.ipRegex = exports.finalRegex = exports.final = exports.file = exports.url = exports.email = void 0;
var dictionary_1 = require("./dictionary");
var email_address = "([a-z0-9!#$%&'*+=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)";
var domainWithTLD = "([a-z0-9]+(-+[a-z0-9]+)*\\.)+(".concat(dictionary_1.TLDs, ")");
var domainWithAnyTLD = "((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)";
var allowedInPath = "a-z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()?#";
var path = "(((\\/(([".concat(allowedInPath, "]+(\\/[").concat(allowedInPath, "]*)*))*?)?))?");
var ipv4 = "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
var ipv6 = "\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]";
var port = "(:(\\d{1,5}))?";
var protocol = "(https?:|ftps?:)\\/\\/";
var confirmedByProtocol = "(".concat(protocol, ")\\S+");
var additionalSlashes = "(([\\/]?))+";
var fqdn = "(((".concat(protocol, ")?(").concat(domainWithAnyTLD, "|").concat(ipv4, "|(").concat(protocol, ")(").concat(ipv6, "|").concat(domainWithAnyTLD, "))(?!@\\w)").concat(port, ")|(").concat(confirmedByProtocol, "))");
var nonLatinMatches = "(((".concat(protocol, ")?(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.])|").concat(ipv4, "|(").concat(protocol, ")(").concat(ipv6, "|").concat(domainWithAnyTLD, "))(?!@\\w)").concat(port, ")|(").concat(confirmedByProtocol, "))((((\\/(([").concat(allowedInPath, "]+(\\/[").concat(allowedInPath).concat(dictionary_1.nonLatinAlphabetRanges, "]*)*))*?)?))?\\b((([").concat(allowedInPath, "\\/").concat(dictionary_1.nonLatinAlphabetRanges, "][a-z\\d\\-_~+=\\/").concat(dictionary_1.nonLatinAlphabetRanges, "]+)))+)");
exports.email = "\\b(mailto:)?".concat(email_address, "@(").concat(domainWithAnyTLD, "|").concat(ipv4, ")\\b");
exports.url = "(".concat(nonLatinMatches, ")|(\\b").concat(fqdn).concat(path, "\\b").concat(additionalSlashes, ")");
//TODO: remove other than nonLatinMatches since it is matching everything?
// check
exports.file = "(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+";
exports.final = "\\b(".concat(exports.url, ")|(").concat(exports.email, ")|(").concat(exports.file, ")\\b");
/**
export const final = `\\b((((((https?:|ftps?:)\\/\\/)?(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.])|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((https?:|ftps?:)\\/\\/)(\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]|((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)))(?!@\\w)(:(\\d{1,5}))?)|(((https?:|ftps?:)\\/\\/)\\S+))((((\\/(([a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#]+(\\/[a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#${nonLatinAlphabetRanges}]*)*))*?)?))?\\b((([a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#\\/${nonLatinAlphabetRanges}][a-z\\d\\-_~+=\\/${nonLatinAlphabetRanges}]+)))+))|(\\b((((https?:|ftps?:)\\/\\/)?(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|((https?:|ftps?:)\\/\\/)(\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]|((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)))(?!@\\w)(:(\\d{1,5}))?)|(((https?:|ftps?:)\\/\\/)\\S+))(((\\/(([a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#]+(\\/[a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#]*)*))*?)?))?\\b(([\\/]?))+))|(\\b(mailto:)?([a-z0-9!#$%&'*+=?^_\`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_\`{|}~-]+)*)@(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\\b)|((file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+)\\b`;
*/
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
    isURL: 0,
    isEmail: 0,
    isFile: 0,
    file: {
        fileName: 0,
        protocol: 0,
    },
    email: {
        protocol: 0,
        local: 0,
        host: 0,
    },
    url: {
        // three places where TLD can appear
        // three places where protocol can appear
        TLD: [0, 0, 0],
        protocol: [0, 0, 0],
        ipv4: 0,
        ipv6: 0,
        ipv4Confirmation: 0,
        byProtocol: 0,
        port: 0,
        protocolWithDomain: 0,
        path: 0,
        // sometimes path might be split into two parts
        secondPartOfPath: 0,
        query: 0,
        fragment: 0,
    },
};
exports.iidxes = iidxes;
var testers = [
    "file:///some/file/path/filename.pdf",
    "mailto:e+_mail.me@sub.domain.com",
    "http://sub.domain.co.uk:3000/p/a/t/h_(asd)/h?q=abc123#dfdf",
    "http://www.\u0639\u0631\u0628\u064A.com",
    "http://127.0.0.1:3000/p/a/t_(asd)/h?q=abc123#dfdf",
    "http://[2a00:1450:4025:401::67]/k/something",
    "a.org/abc/\u10D8_\u10D2\u10D2",
    "a.ta/p",
    "a.tb",
    "a@b.cd"
].join(" ");
var result = null;
var i = 0;
while ((result = exports.finalRegex.exec(testers)) !== null) {
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
        iidxes.url.path = result.indexOf("/p/a/t/h_(asd)/h");
        iidxes.url.query = result.indexOf("q=abc123");
        iidxes.url.fragment = result.indexOf("dfdf");
    }
    if (i === 3) {
        iidxes.url.byProtocol = result.lastIndexOf("http://www.عربي.com");
        iidxes.url.protocol[2] = result.lastIndexOf("http://");
    }
    if (i === 4) {
        iidxes.url.ipv4 = result.indexOf("127.0.0.1");
        iidxes.url.ipv4Confirmation = result.indexOf("0.");
    }
    if (i === 5) {
        iidxes.url.ipv6 = result.indexOf("2a00:1450:4025:401::67");
        iidxes.url.protocol[1] = result.lastIndexOf("http://");
    }
    if (i === 6) {
        iidxes.url.secondPartOfPath = result.indexOf("გგ");
    }
    if (i === 7) {
        iidxes.url.TLD[0] = result.indexOf("ta");
    }
    if (i === 8) {
        iidxes.url.TLD[1] = result.indexOf("tb");
    }
    if (i === 9) {
        iidxes.url.TLD[2] = result.indexOf("cd");
    }
    i++;
}
console.log(iidxes);
