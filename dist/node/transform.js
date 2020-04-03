"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = require("./regex");
function applyOption(tokenProps, option) {
    // conditional
    if (typeof option === "function") {
        return option(tokenProps);
    }
    // all
    else {
        return option;
    }
}
function transform(input, options) {
    var protocol = "";
    var truncation = Infinity;
    var attributes = {};
    var truncateFromTheMiddle = false;
    // special transformation
    if (options && options.specialTransform) {
        for (var index = 0; index < options.specialTransform.length; index++) {
            var transformer = options.specialTransform[index];
            if (transformer.test.test(input)) {
                return transformer.transform(input);
            }
        }
    }
    // exclude
    if (options && options.exclude) {
        if (applyOption(input, options.exclude))
            return input;
    }
    // protocol
    if (options && options.protocol) {
        protocol = applyOption(input, options.protocol);
    }
    if (regex_1.protocolPresent.test(input)) {
        protocol = "";
    }
    else if (!protocol) {
        protocol = regex_1.emailRegex.test(input)
            ? "mailto:"
            : regex_1.fileRegex.test(input)
                ? "file:///"
                : "http://";
    }
    // truncation
    if (options && options.truncate) {
        truncation = applyOption(input, options.truncate);
    }
    if (options && options.middleTruncation) {
        truncateFromTheMiddle = applyOption(input, options.middleTruncation);
    }
    // attributes
    if (options && options.attributes) {
        attributes = applyOption(input, options.attributes);
    }
    return "<a " + Object.keys(attributes)
        .map(function (key) {
        return attributes[key] === true ? key : key + "=\"" + attributes[key] + "\" ";
    })
        .join(" ") + "href=\"" + protocol + input + "\">" + (input.length > truncation
        ? truncateFromTheMiddle
            ? input.substring(0, Math.floor(truncation / 2)) +
                "…" +
                input.substring(input.length - Math.ceil(truncation / 2), input.length)
            : input.substring(0, truncation) + "…"
        : input) + "</a>";
}
exports.transform = transform;
