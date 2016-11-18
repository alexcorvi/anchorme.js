"use strict";

import {removeNotationEnds as removeNotationEnds} from "../util.js";
export default function (url,options){
	var href = removeNotationEnds(url);
	var nice = (options.truncate > 0 && url.length > options.truncate) ?  url.substring(0,options.truncate) + "..." : url;
	var tag = "<a href='"+href+"'";
	if(options.attributes) {
		for (var name in options.attributes) {
			if(options.attributes.hasOwnProperty(name)){
				tag = tag + " " + name + "='" + options.attributes[name] + "' ";
			}
		}
	}
	tag = tag + ">" + nice + "</a>";
	return tag;
}