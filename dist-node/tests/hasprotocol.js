"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(str) {
    str = str.toLowerCase();
    if (str.startsWith("http://"))
        return "http://";
    else if (str.startsWith("https://"))
        return "https://";
    else if (str.startsWith("ftp://"))
        return "ftp://";
    else if (str.startsWith("ftps://"))
        return "ftps://";
    else if (str.startsWith("file:///"))
        return "file:///";
    else if (str.startsWith("mailto:"))
        return "mailto:";
    else
        return false;
}
exports.default = default_1;
