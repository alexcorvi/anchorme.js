"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var lists_1 = require("../lists");
var pattern = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;
function default_1(str) {
    // general pattern recognition https://regex101.com/r/RgKTA4/2
    var match = str.match(pattern);
    if (match === null)
        return false;
    // validate TLD
    if (typeof match[3] !== "string")
        return false;
    if (lists_1.tlds.indexOf(match[3].toLowerCase()) === -1)
        return false;
    // validate port
    if (match[5] && (!util_1.isPort(match[5])))
        return false;
    return true;
}
exports.default = default_1;
