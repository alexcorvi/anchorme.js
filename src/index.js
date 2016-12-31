"use strict";
import {defaultOptions as defaultOptions} from "./util.js";
import emailChecker from "./tests/email.js";
import ipChecker from "./tests/ip.js";
import urlChecker from "./tests/url.js";
import transform from "./transform/transform.js";
import identify from "./transform/identify.js";
import hasprotocol from "./tests/hasprotocol.js";

const anchorme = function(str,options){
	options = defaultOptions(options);
	var result = transform(str, options);
	return result;
};

// exposing few functions for extra uses
anchorme.validate = {
	ip:ipChecker,
	url:function(input){
		// simple wrapper that does what "identify.js" does initially
		// remove the protocal
		var protocol = hasprotocol(input) || "";
		input = input.substr(protocol.length);
		input = encodeURI(input);
		return urlChecker(input);
	},
	email:emailChecker
};

export default anchorme;