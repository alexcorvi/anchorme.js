"use strict";


function countOccurrences(string, subString, allowOverlapping) {
	return string.split(subString).length - 1;
}

function skipHtml(str) {
	["src","href","cite","formaction","icon","manifest","poster","codebase","background","profile","usemap"]
	.forEach((atr)=>{
		str = str.split(`${atr}=" `).join(`${atr}="`);
		str = str.split(`${atr}=' `).join(`${atr}='`);
	});
	return str;
}


function removeNotationEnds (str) {
	function removeThis(str,char) {
		if (str.endsWith(char)) {
			str = str.substring(0, str.length - 1);
			return removeThis(str,char);
		}
		else return str;
	}

	if(str.endsWith("?")) str = removeThis(str,"?");
	else if(str.endsWith(";")) str = removeThis(str,";");
	else if(str.endsWith(":")) str = removeThis(str,":");
	else if(str.endsWith(",")) str = removeThis(str,",");
	else if(str.endsWith(".")) str = removeThis(str,".");

	return str;
}

function defaultOptions(options){
	if(!options) {
		options = {
			"attributes":false,
			"html":true,
			ips:true,
			emails:true,
			urls:true,
			TLDs:20,
			truncate:0,
			defaultProtocol:"http://"
		};
	}

	if(typeof options.attributes 		!== "object") 	options.attributes = false;
	if(typeof options.html 				!== "boolean") 	options.html = true;
	if(typeof options.ips 				!== "boolean") 	options.ips = true;
	if(typeof options.emails 			!== "boolean") 	options.emails = true;
	if(typeof options.urls 				!== "boolean") 	options.urls = true;
	if(typeof options.defaultProtocol 	!== "string") 	options.defaultProtocol = "http://";
	if(typeof options.truncate		 	!== "number") 	options.truncate = 0;
	return options;
}

function isInt(value){
	if(typeof value === "string" && value.indexOf(".") > -1) return false;
	if(typeof value === "number" && Math.round(value) !== value) return false;
	else if(value === "") return false;
	else if(isNaN(value*1)) return false;
	else return true;
}

function isPort(value) {
	if(!isInt(value)) return false;
	if((value*1)>65535) return false;
	else return true;
}

export {countOccurrences as countOccurrences};
export {skipHtml as skipHtml};
export {removeNotationEnds as removeNotationEnds};
export {defaultOptions as defaultOptions};
export {isInt as isInt};
export {isPort as isPort};