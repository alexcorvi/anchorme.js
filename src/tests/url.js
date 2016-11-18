"use strict";

import {countOccurrences as countOccurrences, removeNotationEnds as removeNotationEnds} from "../util.js";
import {allowedInHost as allowedInHost, tlds as tlds} from "../lists.js";

export default function (str) {
	// basic validations
	if(countOccurrences(str,".") === 0) return false;  
	if(countOccurrences(str,".") === 1 && str.indexOf(".") === str.length - 1) return false;
	if(str.indexOf("/") < 3 && str.indexOf("/") > 0) return false;


	// normalize it	
	str = str.toLowerCase();
	str = removeNotationEnds(str);

	if(~str.indexOf("/")) {
		var slashIndex = str.indexOf("/");
		var preSlash = str.substring(0,slashIndex);
		if(~preSlash.indexOf("..")) return false;
		if(preSlash.split("").filter((c)=>~allowedInHost.indexOf(c)).length !== preSlash.length) return false;
		if(preSlash.endsWith(".com")) return true; // for performance
		if(preSlash.indexOf(":") > 0) {
			let portAndHost = preSlash.split(":");
			let host = portAndHost[0];
			let port = portAndHost[1];
			if(!port) return false;
			if(isNaN(port)) return false;
			if(parseInt(port) > 65535) return false;
			if(str.endsWith(".com")) return true; // for performance
			if(!~tlds.indexOf(host.substr(host.lastIndexOf(".")))) return false;
		}
		else if(!~tlds.indexOf(preSlash.substr(preSlash.lastIndexOf(".")))) return false;
	}

	else {
		if(~str.indexOf("..")) return false;
		if(str.split("").filter((c)=>~allowedInHost.indexOf(c)).length !== str.length) return false;
		if(str.endsWith(".com")) return true; // for performance
		if(str.indexOf(":") > 0) {
			let portAndHost = str.split(":");
			let host = portAndHost[0];
			let port = portAndHost[1];
			if(!port) return false;
			if(isNaN(port)) return false;
			if(parseInt(port) > 65535) return false;
			if(str.endsWith(".com")) return true; // for performance
			if(!~tlds.indexOf(host.substr(host.lastIndexOf(".")))) return false;
		}
		else if(!~tlds.indexOf(str.substr(str.lastIndexOf(".")))) return false;
	}

	return true;
}