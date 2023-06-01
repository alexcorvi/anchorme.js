import { closingParenthesis, parenthesis } from "./dictionary";
import { ListingProps } from "./types";
import {
	finalRegex,
	iidxes,
} from "./regex";
import {
	checkParenthesis as parenthesisIsPartOfTheURL,
	isInsideAnchorTag,
	isInsideAttribute,
	maximumAttrLength,
} from "./utils";

import { TLDs } from "./dictionary";
let TLDsRgex = new RegExp(`^(${TLDs})$`,'i');

export const list = function (input: string, skipHTML:boolean=true) {
	const found: ListingProps[] = [];
	let result: RegExpExecArray | null = null;

	while ((result = finalRegex.exec(input)) !== null) {
		const start = result.index;
		let end = start + result[0].length;
		let string = result[0];

		const protocol =
		result[iidxes.url.protocol[0]] ||
		result[iidxes.url.protocol[1]] ||
		result[iidxes.url.protocol[2]];

		// ### Parenthesis problem
		/**
			As we're using the \b to tokenize the URL, sometimes the parenthesis are part of the URL
			and sometimes they are actually the last part, this makes the tokenization stops just
			before them.
			To fix this, we calculate how many parenthesis are open and how many are closed inside
			the URL and based on the number we should be able to know whether the aforementioned
			parenthesis character is part of the URL or not
		*/
		if (closingParenthesis.indexOf(input.charAt(end)) > -1) {
			parenthesis.forEach((str) => {
				const opening = str.charAt(0);
				const closing = str.charAt(1);
				if (
					parenthesisIsPartOfTheURL(
						opening,
						closing,
						string,
						input.charAt(end)
					)
				) {
					string = string + input.charAt(end);
					end++;
				}
			});
		}

		if(skipHTML) {
			// ### HTML problem 1
			/**
				checking whether the token is already inside an HTML element by seeing if it's
				preceded by an HTML attribute that would hold a url (e.g. src, cite ...etc)
				e.g. <a href="ab.com">ab.com</a>
			*/
			if (
				['""', "''", "()"].indexOf(
					input.charAt(start - 1) + input.charAt(end)
				) !== -1
			) {
				if (
					isInsideAttribute(
						input.substring(start - maximumAttrLength - 15, start)
					)
				) {
					continue;
				}
			}

			// ### HTML problem 2
			/**
				Checking whether the token is the content of an actual anchor
				e.g. <a href="https://something.com">click to go to something.com and have fun</a>
			*/
			if (
				input.substring(end, input.length).indexOf("</a>") > -1 &&
				input.substring(0, start).indexOf("<a") > -1 &&
				isInsideAnchorTag(string, input, end)
			) {
				continue;
			}
		}

		// filter out URLs that doesn't have a vaild TLD
		let tld = result[iidxes.url.TLD[0]] || result[iidxes.url.TLD[1]];
		if(tld && (!protocol) && (!result[iidxes.email.protocol]) && (!tld.startsWith("xn--") && !TLDsRgex.test(tld))) {
			continue;
		}

		if (result[iidxes.isURL]) {
			const host = result[iidxes.url.host[0]] || result[iidxes.url.host[1]] || result[iidxes.url.host[2]];
			const path = (string.match(/(?:[^\/:]|])((?:\/[^?#\s]+)+)/) || [])[1];
			const query = (string.match(/(?:\?)([^#]+)\b/) || [])[1];
			const fragment = (string.match(/(?:#)(.+)\b/) || [])[1];
			const ipv6 = host === undefined ? (string.match(/\/\/\[((?:(?:[a-f\d:]+:+)+[a-f\d]+))\]/) || [])[1] : undefined;

			found.push({
				start,
				end,
				string,
				isURL: true,
				protocol: protocol,
				port: result[iidxes.url.port],
				ipv4: result[iidxes.url.ipv4],
				ipv6: ipv6,
				host: ipv6 ? '['+ipv6+']' : host,
				confirmedByProtocol: !!protocol,
				path:  path || undefined,
				query:  query,
				fragment:  fragment,
				reason: "url",
			});
		} else if (result[iidxes.isFile]) {
			const filePath = string.substr(8);
			found.push({
				start,
				end,
				string,
				isFile: true,
				protocol: result[iidxes.file.protocol],
				filename: result[iidxes.file.fileName],
				filePath,
				fileDirectory: filePath.substr(
					0,
					filePath.length - result[iidxes.file.fileName].length
				),
				reason: "file",
			});
		} else if (result[iidxes.isEmail]) {
			found.push({
				start,
				end,
				string,
				isEmail: true,
				local: result[iidxes.email.local],
				protocol: result[iidxes.email.protocol],
				host: result[iidxes.email.host],
				reason: "email",
			});
		} else {
			found.push({
				start,
				end,
				string,
				reason: "unknown",
			});
		}
	}
	return found;
};
