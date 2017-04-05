import fix from "./fix";
import {URLObj} from "../util";


/**
 * 
 * Split the string with word separators
 * such as punctuation marks and spaces
 * 
**/
export function separate(input:string):Array<string> {
	var splitted = input
	.replace(/([\s\(\)\[\]<>"'])/g,"\0$1\0")
	.replace(/([?;:,.!]+)(?=(\0|$|\s))/g,"\0$1\0")
	.split("\0");
	var fixed = fix(splitted);
	return fixed
}

/**
 * 
 * Join the resulting array into a string
 * 
**/
export function deSeparate(input:Array<URLObj|string>):string {
	return input.join("");
}