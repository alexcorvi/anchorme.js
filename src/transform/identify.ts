import {Options} from "../util";
import {URLObj} from "../util";
import emailChecker from "../tests/email";
import hasProtocol from "../tests/hasprotocol";
import {htmlAttrs} from "../lists";
import ipChecker from "../tests/ip";
import urlChecker from "../tests/url";

export default function (inputArr:Array<string>, options:Options) {
	return inputArr.map((fragment,index)=>{
		
		var encoded: string;
		
		try {
			// prevent double encoding
			encoded = encodeURI(decodeURI(fragment))
		} catch (e) {
			// if the above fails it probably means that a genuine "%" char is present in the fragmet
			encoded = encodeURI(fragment);
		}

		// quick validations
		// 1
		if(encoded.indexOf(".")<1 && (!hasProtocol(encoded))) return fragment;

		var urlObj:URLObj|null = null;

		var protocol = hasProtocol(encoded) || "";
		// remove the protocol before proceeding to any other test
		if(protocol) encoded = encoded.substr(protocol.length);

		// test 1: it's a file
		if(options.files && protocol === "file:///" && encoded.split(/\/|\\/).length - 1) {
			urlObj = {
				reason:"file",
				protocol:protocol,
				raw:fragment,
				encoded:encoded,
			};
		}


		// test 2: it's a URL
		if((!urlObj) && options.urls && urlChecker(encoded)) {
			urlObj = {
				reason:"url",
				protocol:protocol ? protocol : typeof options.defaultProtocol === "function" ? options.defaultProtocol(fragment) : options.defaultProtocol,
				raw:fragment,
				encoded:encoded,
			};
		}

		// test 3: it's an email
		if((!urlObj) && options.emails && emailChecker(encoded)) {
			urlObj = {
				reason:"email",
				protocol:"mailto:",
				raw:fragment,
				encoded:encoded,
			};
		}

		// test 4: it's an IP
		if((!urlObj) && options.ips && ipChecker(encoded)) {
			urlObj = {
				reason:"ip",
				protocol:protocol ? protocol : typeof options.defaultProtocol === "function" ? options.defaultProtocol(fragment) : options.defaultProtocol,
				raw:fragment,
				encoded:encoded,
			};
		}

		if(!urlObj) return fragment;
		
		else {
			if((inputArr[index-1] === "'" || inputArr[index-1] === '"') && ~htmlAttrs.indexOf(inputArr[index-2]))
				return fragment;
			return urlObj;
		}
	});
}