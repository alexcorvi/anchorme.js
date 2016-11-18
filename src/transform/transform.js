"use strict";
import {separate as separate} from "../separate/separate.js";
import {deSeparate as deSeparate} from "../separate/separate.js";
import identify from "./identify.js";
import url2tag from "./url2tag.js";


export default function(str,options){
	var arr = separate(str);
	arr = identify(arr,options).map((fragment)=>{
		if(typeof fragment === "string") return fragment;
		url2tag(fragment.url,options);
		return url2tag(fragment.protocol+fragment.url,options);
	});
	return deSeparate(arr);
}