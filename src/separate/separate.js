"use strict";
import separators from "./list.js";
import fix from "./fix.js";

function padWithSpace(c) {
	return " "+c+" ";
}

function separate(input) {
	separators.forEach((separator)=>{
		input = input.split(separator).join(padWithSpace(separator));
	});
	input = fix(input.split(" "));
	return input;
}

function deSeparate(input) {
	input = input.join(" ");
	separators.forEach((separator)=>{
		input = input.split(padWithSpace(separator)).join(separator);
	});
	return input;
}

export {separate as separate};
export {deSeparate as deSeparate};