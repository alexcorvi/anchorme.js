"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dictionary_1 = require("./dictionary");
function checkParenthesis(opening, closing, target, nextChar) {
    if (nextChar !== closing) {
        return false;
    }
    if (target.split(opening).length - target.split(closing).length === 1 ||
        (opening === closing && target.split(opening).length % 2 === 0)) {
        return true;
    }
}
exports.checkParenthesis = checkParenthesis;
exports.maximumAttrLength = dictionary_1.htmlAttributes.sort(function (a, b) { return b.length - a.length; })[0].length;
function isInsideAttribute(prevFragment) {
    return (/\s[a-z0-9-]+=('|")$/i.test(prevFragment) ||
        /: ?url\(('|")?$/i.test(prevFragment));
}
exports.isInsideAttribute = isInsideAttribute;
function isInsideAnchorTag(target, fullInput, targetEnd) {
    var escapedTarget = target.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    var regex = new RegExp("(?=(<a))(?!([\\s\\S]*)(<\\/a>)(" + escapedTarget + "))[\\s\\S]*?(" + escapedTarget + ")(?!\"|')", "gi");
    var result = null;
    while ((result = regex.exec(fullInput)) !== null) {
        var end = result.index + result[0].length;
        if (end === targetEnd) {
            return true;
        }
    }
    return false;
}
exports.isInsideAnchorTag = isInsideAnchorTag;
