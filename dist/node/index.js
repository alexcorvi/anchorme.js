"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dictionary_1 = require("./dictionary");
var regex_1 = require("./regex");
var transform_1 = require("./transform");
var utils_1 = require("./utils");
var list = function (input) {
    // early kill
    if (!regex_1.finalRegex.test(input)) {
        return [];
    }
    else {
        regex_1.finalRegex.lastIndex = 0;
    }
    var found = [];
    var result = null;
    var _loop_1 = function () {
        var start = result.index;
        var end = start + result[0].length;
        var string = result[0];
        // Parenthesis problem
        /**
                As we're using the \b to tokenize the URL, sometimes the parenthesis are part of the URL
                and sometimes they are actually the last part, this makes the tokenization stops just
                before them.
                To fix this, we calculate how many parenthesis are open and how many are closed inside
                the URL and based on the number we should be able to know whether the aforementioned
                parenthesis character is part of the URL or not
            */
        if (dictionary_1.closingParenthesis.indexOf(input.charAt(end)) > -1) {
            dictionary_1.parenthesis.forEach(function (str) {
                var opening = str.charAt(0);
                var closing = str.charAt(1);
                if (utils_1.checkParenthesis(opening, closing, string, input.charAt(end))) {
                    string = string + input.charAt(end);
                    end++;
                }
            });
        }
        // HTML problem 1
        /**
                checking whether the token is already inside an HTML element by seeing if it's
                preceded by an HTML attribute that would hold a url (e.g. scr, cite ...etc)
            */
        if (input.charAt(start - 1) === "'" ||
            input.charAt(start - 1) === '"') {
            if (utils_1.isInsideAttribute(input.charAt(start - 1), input.substring(start - utils_1.maximumAttrLength - 5, start))) {
                return "continue";
            }
        }
        // HTML problem 2
        /**
                Checking whether the token is the content of an actual anchor
                e.g. <a href="https://something.com">click to go to something.com and have fun</a>
            */
        if (input.substring(end, input.length).indexOf("</a>") > -1 &&
            input.substring(0, start).indexOf("<a") > -1 &&
            utils_1.isInsideAnchorTag(string, input, end)) {
            return "continue";
        }
        found.push({
            start: start,
            end: end,
            string: string
        });
    };
    while ((result = regex_1.finalRegex.exec(input)) !== null) {
        _loop_1();
    }
    return found;
};
var anchorme = function (arg) {
    var _a = typeof arg === "string"
        ? { input: arg, options: undefined, extensions: undefined }
        : arg, input = _a.input, options = _a.options, extensions = _a.extensions;
    if (extensions) {
        for (var index = 0; index < extensions.length; index++) {
            var extension = extensions[index];
            input = input.replace(extension.test, extension.transform);
        }
    }
    var found = list(input);
    var newStr = "";
    // the following code isn't very intuitive nor human readable
    // but faster than others
    for (var index = 0; index < found.length; index++) {
        newStr =
            (newStr
                ? newStr
                : index === 0
                    ? input.substring(0, found[index].start)
                    : "") +
                transform_1.transform(found[index].string, options) +
                (found[index + 1]
                    ? input.substring(found[index].end, found[index + 1].start)
                    : input.substring(found[index].end));
    }
    return newStr ? newStr : input;
};
anchorme.list = function (input) {
    return list(input);
};
anchorme.validate = {
    ip: function (input) { return regex_1.ipRegex.test(input); },
    email: function (input) { return regex_1.emailRegex.test(input); },
    file: function (input) { return regex_1.fileRegex.test(input); },
    url: function (input) { return regex_1.urlRegex.test(input) || regex_1.ipRegex.test(input); }
};
exports.default = anchorme;
