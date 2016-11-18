"use strict";
function fixSeparators(arr,sep1,sep2){
	arr.forEach((bit,i)=>{
		if(
			(bit.indexOf(".") > -1) && 							// it has a .
			(!(arr[i-1] === sep1 && arr[i+1] === sep2)) &&		// it's not surrounded by separators
			(arr[i+1] === sep1 || arr[i+1] === sep2)			// the one after it, is either sep1 or sep2
		) {
			arr[i] = arr[i]+arr[i+1];
			if (typeof arr[i+2] === "string") arr[i] = arr[i] + arr[i+2];
			if (typeof arr[i+3] === "string") arr[i] = arr[i] + arr[i+3];
			if (typeof arr[i+4] === "string") arr[i] = arr[i] + arr[i+4];
			arr.splice(i+1,4);
			fixSeparators(arr,sep1,sep2);
		}
	});
	return arr;
}

export default function (arr) {
	arr = fixSeparators(arr,"(",")");
	arr = fixSeparators(arr,"[","]");
	arr = fixSeparators(arr,`"`,`"`);
	arr = fixSeparators(arr,`'`,`'`);
	return arr;
}