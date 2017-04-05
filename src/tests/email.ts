import {tlds as tlds} from "../lists";

// pattern that an emails MUST have
const pattern = /^[a-z0-9!#$%&'*+\-/=?^_`{|}~.]+@([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?$/i

// patterns that an email can not have
const negativePatterns = [
	/^[!#$%&'*+\-/=?^_`{|}~.]/,
	/[.]{2,}[a-z0-9!#$%&'*+\-/=?^_`{|}~.]+@/i,
	/\.@/
]

export default function (str:string):boolean {

	// general pattern recognition
	const match = str.match(pattern);
	if(match === null) return false;

	// doesn't have a negative pattern
	for (var i = negativePatterns.length - 1; i >= 0; i--) {
		if(negativePatterns[i].test(str)) return false;
	}

	// valid TLD
	var tld = match[2];
	if(!tld) return false;
	if(tlds.indexOf(tld) === -1) return false;	

	return true;
}