"use strict";

import {urlAllowed as urlAllowed} from "../lists.js";
import {htmlAttrs as htmlAttrs} from "../lists.js";
import hasProtocol from "../tests/hasprotocol.js";
import emailChecker from "../tests/email.js";
import ipChecker from "../tests/ip.js";
import urlChecker from "../tests/url.js";

export default function (inputArr, options) {
	return inputArr.map((fragment,index)=>{
		
		var encoded = encodeURI(fragment);

		// quick validations
		// 1
		if(fragment.indexOf(".")<1 && (!hasProtocol(fragment))) return fragment; 
		// 2
		if (fragment.split("").filter((c)=>~urlAllowed.indexOf(c)).length !== fragment.length) return fragment;

		var urlObj = false;

		// starting tests that might render a positive result
		// test 1: it begins with a protocol
		var protocol = hasProtocol(fragment);

		if(protocol) {
			urlObj = {
				reason:"protocol",
				protocol:protocol,
				url:fragment.substr(protocol.length)
			};
		}
		// test 2: it's a URL
		if((!urlObj) && options.urls && urlChecker(fragment)) {
			urlObj = {
				reason:"url",
				protocol:options.defaultProtocol,
				url:fragment
			};
		}
		// test 3: it's an email
		if((!urlObj) && options.emails && emailChecker(fragment)) {
			urlObj = {
				reason:"email",
				protocol:"mailto:",
				url:fragment
			};
		}
		// test 4: it's an IP
		if((!urlObj) && options.ips && ipChecker(fragment)) {
			urlObj = {
				reason:"ip",
				protocol:options.defaultProtocol,
				url:fragment
			};
		}
		if(!urlObj) return fragment;
		else {
			var past = index-1;
			var skip = false;
			if((inputArr[index-1] === "'" || inputArr[index-1] === '"') && ~htmlAttrs.indexOf(inputArr[index-2]))
				return fragment;
			return urlObj;
		}
	});
}