import { URLObj } from "../util";
/**
 *
 * Split the string with word separators
 * such as punctuation marks and spaces
 *
**/
export declare function separate(input: string): Array<string>;
/**
 *
 * Join the resulting array into a string
 *
**/
export declare function deSeparate(input: Array<URLObj | string>): string;
