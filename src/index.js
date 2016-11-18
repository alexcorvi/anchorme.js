"use strict";
import {defaultOptions as defaultOptions} from "./util.js";
import emailChecker from "./tests/email.js";
import ipChecker from "./tests/ip.js";
import urlChecker from "./tests/url.js";
import transform from "./transform/transform.js";
import identify from "./transform/identify.js";

const anchorme = function(str,options){
	options = defaultOptions(options);
	var result = transform(str, options);
	return result;
};

// exposing few functions for extra uses
anchorme.validate = {
	ip:ipChecker,
	url:urlChecker,
	email:emailChecker
};

export default anchorme;