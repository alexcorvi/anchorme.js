"use strict";

import {countOccurrences as countOccurrences, removeNotationEnds as removeNotationEnds, isInt as isInt, isPort as isPort} from "../util.js";

export default function (str) {

	if(countOccurrences(str,".") < 3) return false;

	// normalize it	
	str = str.toLowerCase();
	str = removeNotationEnds(str);

	var IPArray = str.split("."),
	oc1 = IPArray[0],
	oc2 = IPArray[1],
	oc3 = IPArray[2];

	// validate oc1,oc2,oc3
	if((!isInt(oc1)) || oc1 > 255 || oc1 < 0) return false;
	if((!isInt(oc2)) || oc2 > 255 || oc2 < 0) return false;
	if((!isInt(oc3)) || oc3 > 255 || oc3 < 0) return false;


	/**
	 * the IPArray[3] might be a number ..
	 * might be just a number						0
	 * might be a number with port 					0:3000
	 * might be a number with slash 				0/route
	 * might be a number with port and slash 		0:3000/one
	**/

	var lastBit = IPArray[3],
	oc4,port,route;

	if(!lastBit) return false;

	// one: route
	if(~lastBit.indexOf("/")) {
		var ocAndRoute = lastBit.split("/");
		oc4 = ocAndRoute[0];
		route = ocAndRoute[1];
	}

	// both
	if(~lastBit.indexOf(":") && ~lastBit.indexOf("/") && lastBit.indexOf(":") < lastBit.indexOf("/")) {
		var aArr = lastBit.split(":");
		var bArr = aArr[1].split("/");
		oc4 = aArr[0];
		port = bArr[0];
	}

	// one: port
	if(~lastBit.indexOf(":") && lastBit.indexOf("/") < 0 && !IPArray.slice(4).join()) {
		var ocAndPort = lastBit.split(":");
		oc4 = ocAndPort[0];
		port = ocAndPort[1];
	}

	// non
	if(lastBit.indexOf(":") < 0 && lastBit.indexOf("/") < 0 && !IPArray.slice(4).join()) {
		oc4 = lastBit;
	}

	// validate the last bit
	if((!isInt(oc4)) || oc4 > 255 || oc4 < 0) return false;
	if(port !== undefined && (!isPort(port))) return false;
	if(!oc4) return false;
	return true;
}