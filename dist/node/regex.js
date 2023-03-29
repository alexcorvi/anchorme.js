"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iidxes = exports.urlRegex = exports.fileRegex = exports.emailRegex = exports.ipRegex = exports.finalRegex = exports.final = exports.file = exports.url = exports.email = void 0;
var dictionary_1 = require("./dictionary");
var email_address = "([a-z0-9!#$%&'*+=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)";
var domainWithTLD = "([a-z0-9]+(-+[a-z0-9]+)*\\.)+(".concat(dictionary_1.TLDs, ")");
var domainWithAnyTLD = "([a-z0-9]+(-+[a-z0-9]+)*\\.)+([a-z0-9][a-z0-9-]{0,".concat(Math.max.apply(this, dictionary_1.TLDs.split("|").map(function (x) { return x.length; })) - 2, "}[a-z0-9])");
var allowedInPath = "a-zA-Z\\d\\-._~\\!$&*+,;=:@%'\"\\[\\]()";
var path = "(((\\/(([".concat(allowedInPath, "]+(\\/[").concat(allowedInPath, "]*)*))?)?)((\\?([").concat(allowedInPath, "\\/?]*))?)((\\#([").concat(allowedInPath, "\\/?]*))?))?");
var ipv4 = "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
var ipv6 = "\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]";
var port = "(:(\\d{1,5}))?";
var protocol = "(https?:|ftps?:)\\/\\/";
var confirmedByProtocol = "(".concat(protocol, ")\\S+");
var additionalSlashes = "(([\\/]?))+";
var fqdn = "(((".concat(protocol, ")?(").concat(domainWithTLD, "|").concat(ipv4, "|(").concat(protocol, ")(").concat(ipv6, "|").concat(domainWithAnyTLD, "))(?!@\\w)").concat(port, ")|(").concat(confirmedByProtocol, "))");
var nonLatinMatches = "".concat(fqdn, "((((\\/(([").concat(allowedInPath, "]+(\\/[").concat(allowedInPath).concat(dictionary_1.nonLatinAlphabetRanges, "]*)*))?)?)((\\?([").concat(allowedInPath, "\\/?]*))?)((\\#([").concat(allowedInPath, "\\/?]*))?))?\\b((([").concat(allowedInPath, "\\/").concat(dictionary_1.nonLatinAlphabetRanges, "][a-zA-Z\\d\\-_~+=\\/").concat(dictionary_1.nonLatinAlphabetRanges, "]+)?))+)");
exports.email = "\\b(mailto:)?".concat(email_address, "@(").concat(domainWithTLD, "|").concat(ipv4, ")\\b");
exports.url = "(".concat(nonLatinMatches, ")|(\\b").concat(fqdn).concat(path, "\\b").concat(additionalSlashes, ")");
exports.file = "(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+";
exports.final = "(".concat(exports.url, ")|(").concat(exports.email, ")|(").concat(exports.file, ")");
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
    isURL: 2,
    isEmail: 84,
    isFile: 96,
    file: {
        fileName: 100,
        protocol: 97,
    },
    email: {
        protocol: 85,
        local: 86,
        host: 88,
    },
    url: {
        ipv4: 7,
        ipv6: 18,
        ipv4Confirmation: 12,
        byProtocol: 25,
        port: 24,
        // three places where protocol can appear
        protocol1: 5,
        protocol2: 26,
        protocol3: 15,
        protocolWithDomain: 3,
        path: 30,
        // sometimes path might be split into two parts
        secondPartOfPath: 41,
        query: 37,
        fragment: 40,
    },
};
exports.iidxes = iidxes;
