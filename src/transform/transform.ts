import {Options} from "../util";
import {URLObj} from "../util";
import {deSeparate} from "../separate/separate";
import identify from "./identify";
import {separate} from "../separate/separate";

export default function(str,options:Options):string|Array<URLObj>{

	var arr:Array<string> = separate(str);
	var identified:Array<string|URLObj> = identify(arr,options);

	// custom filtering-out function
	if (options.exclude) {
		for (var index = 0; index < identified.length; index++) {
			var element = identified[index];
			if(typeof element === "object" && options.exclude(element))
				identified[index] = element.raw;
		}
	}

	// return the current list (with words being filtered out)
	if(options.list) {
		var listed:Array<URLObj> = [];
		for (var i = 0; i < identified.length; i++) {
			var fragment = identified[i];
			if(typeof fragment !== "string") listed.push(fragment);
		}
		return listed;
	}

	// transform objects to HTML tags
	identified = identified.map((fragment)=>{
		if(typeof fragment === "string") return fragment;
		return url2tag(fragment,options);
	});

	// join and return
	return deSeparate(identified);
}

function url2tag (fragment:URLObj,options:Options){
	var href = fragment.protocol + fragment.encoded;
	var original = fragment.raw;

	if(typeof options.truncate === "number") {
		if(original.length > options.truncate)
			original = original.substring(0,options.truncate) + "...";
	}

	if(typeof options.truncate === "object") {
		if(original.length > (options.truncate[0] + options.truncate[1]))
			original = original.substr(0, options.truncate[0]) + "..." + original.substr(original.length - options.truncate[1]);
	}

	if(options.attributes === undefined) options.attributes = [];

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