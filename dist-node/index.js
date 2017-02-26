"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var email_1 = require("./tests/email");
var ip_1 = require("./tests/ip");
var url_1 = require("./tests/url");
var transform_1 = require("./transform/transform");
var hasprotocol_1 = require("./tests/hasprotocol");
var anchorme = function (str, options) {
    options = util_1.defaultOptions(options);
    var result = transform_1.default(str, options);
    return result;
};
// exposing few functions for extra uses
anchorme.validate = {
    ip: ip_1.default,
    url: function (input) {
        // simple wrapper that does what "identify.ts" does initially
        // remove the protocal
        var protocol = hasprotocol_1.default(input) || "";
        input = input.substr(protocol.length);
        input = encodeURI(input);
        return url_1.default(input);
    },
    email: email_1.default
};
exports.default = anchorme;
