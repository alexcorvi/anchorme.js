"use strict";
import {countOccurrences as countOccurrences, removeNotationEnds as removeNotationEnds} from "../util.js";
import {allowedInHost as allowedInHost, allowedInEmailName as allowedInEmailName, tlds as tlds} from "../lists.js";

export default function (str) {
	if (countOccurrences(str, "@") < 1) return false;


	// normalize
	str = str.toLowerCase();
	str = removeNotationEnds(str);

	const emailName = str.substring(0, str.indexOf("@"));
	const emailServer = str.substr(str.indexOf("@") + 1);

	// validate the part before @
	if(emailName.split("").filter((c)=>~allowedInEmailName.indexOf(c)).length !== emailName.length) return false;
	// validate the part after @
	if(emailServer.split("").filter((c)=>~allowedInHost.indexOf(c)).length !== emailServer.length) return false;
	// validate the tld
	if(emailServer.endsWith(".com")) return true; // for performance
	if(!~tlds.indexOf(emailServer.substr(emailServer.lastIndexOf(".")))) return false;

	return true;
}