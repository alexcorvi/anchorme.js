"use strict";
import {separate as separate} from "../separate/separate.js";
import {deSeparate as deSeparate} from "../separate/separate.js";
import {removeNotationEnds as removeNotationEnds} from "../util.js";
import identify from "./identify.js";

export default function(str,options){

	var arr = separate(str);
	arr = identify(arr,options);

	// return the current list (with words being filtered out)
	if(options.list) return arr.filter((fragment)=>typeof fragment !== "string");

	// transform objects to HTML tags
	arr = arr.map((fragment)=>{
		if(typeof fragment === "string") return fragment;
		return url2tag(fragment,options);
	});

	// join and return
	return deSeparate(arr);
}

function url2tag (fragment,options){
	var href = fragment.protocol + removeNotationEnds(fragment.encoded);
	var original = fragment.raw;
	original = (options.truncate > 0 && original.length > options.truncate) ?  original.substring(0,options.truncate) + "..." : original;
	return `<a href="${href}" ${options.attributes.map((attribute)=>{
		if(typeof attribute === 'function') {
			var name = (attribute(fragment) || {}).name;
			var value = (attribute(fragment) || {}).value;
			if(name && !value) return " name ";
			if(name && value) return ` ${name}="${value}" `;
		}
		else return ` ${attribute.name}="${attribute.value}" `;
	}).join("")}>${original}</a>`;
}