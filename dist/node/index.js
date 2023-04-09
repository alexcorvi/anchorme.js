"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./list");
var transform_1 = require("./transform");
var regex_1 = require("./regex");
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
    var found = (0, list_1.list)(input, (options || {}).skipHTML);
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
                (0, transform_1.transform)(found[index], options) +
                (found[index + 1]
                    ? input.substring(found[index].end, found[index + 1].start)
                    : input.substring(found[index].end));
    }
    return newStr ? newStr : input;
};
anchorme.list = list_1.list;
anchorme.validate = {
    ip: function (input) { return regex_1.ipRegex.test(input); },
    email: function (input) { return regex_1.emailRegex.test(input); },
    file: function (input) { return regex_1.fileRegex.test(input); },
    url: function (input) { return regex_1.urlRegex.test(input) || regex_1.ipRegex.test(input); },
};
exports.default = anchorme;
