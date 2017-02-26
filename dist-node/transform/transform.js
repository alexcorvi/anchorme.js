"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const separate_1 = require("../separate/separate");
const separate_2 = require("../separate/separate");
const identify_1 = require("./identify");
function default_1(str, options) {
    var arr = separate_1.separate(str);
    var identified = identify_1.default(arr, options);
    // return the current list (with words being filtered out)
    if (options.list) {
        var listed = [];
        for (var i = 0; i < identified.length; i++) {
            var fragment = identified[i];
            if (typeof fragment !== "string")
                listed.push(fragment);
        }
        return listed;
    }
    // transform objects to HTML tags
    identified = identified.map((fragment) => {
        if (typeof fragment === "string")
            return fragment;
        return url2tag(fragment, options);
    });
    // join and return
    return separate_2.deSeparate(identified);
}
exports.default = default_1;
function url2tag(fragment, options) {
    var href = fragment.protocol + fragment.encoded;
    var original = fragment.raw;
    if (typeof options.truncate === "number") {
        if (original.length > options.truncate)
            original = original.substring(0, options.truncate) + "...";
    }
    if (typeof options.truncate === "object") {
        if (original.length > (options.truncate[0] + options.truncate[1]))
            original = original.substr(0, options.truncate[0]) + "..." + original.substr(original.length - options.truncate[1]);
    }
    if (options.attributes === undefined)
        options.attributes = [];
    return `<a href="${href}" ${options.attributes.map((attribute) => {
        if (typeof attribute === 'function') {
            var name = (attribute(fragment) || {}).name;
            var value = (attribute(fragment) || {}).value;
            if (name && !value)
                return " name ";
            if (name && value)
                return ` ${name}="${value}" `;
        }
        else
            return ` ${attribute.name}="${attribute.value}" `;
    }).join("")}>${original}</a>`;
}
