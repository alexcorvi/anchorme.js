import { closingParenthesis, parenthesis } from "./dictionary";
import { transform } from "./transform";
import { ListingProps, Options } from "./types";
import {
	emailRegex,
	fileRegex,
	finalRegex,
	ipRegex,
	urlRegex,
	iidxes,
} from "./regex";
import {
	checkParenthesis as parenthesisIsPartOfTheURL,
	isInsideAnchorTag,
	isInsideAttribute,
	maximumAttrLength,
} from "./utils";

const list = function (input: string) {
	const found: ListingProps[] = [];
	let result: RegExpExecArray | null = null;

	while ((result = finalRegex.exec(input)) !== null) {
		const start = result.index;
		let end = start + result[0].length;
		let string = result[0];

		// ### trailing slashes problem
		/**
		 * This is a quick and dirty fix for a problem that could be probably fixed with
		 * slight modification in the regex.
		 * The problem is that the library doesn't count the trailing slashes as part
		 * of the URL, unless there were multiple trailing slashes.
		 */
		if (input.charAt(end) === "/") {
			string = string + input.charAt(end);
			end++;
		}

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

		// ### HTML problem 1
		/**
				checking whether the token is already inside an HTML element by seeing if it's
				preceded by an HTML attribute that would hold a url (e.g. scr, cite ...etc)
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

		if (result[iidxes.isURL]) {
			const path =
				(result[iidxes.url.path] || "") +
					(result[iidxes.url.secondPartOfPath] || "") || undefined;
			const protocol =
				result[iidxes.url.protocol1] ||
				result[iidxes.url.protocol2] ||
				result[iidxes.url.protocol3];
			found.push({
				start,
				end,
				string,
				isURL: true,
				protocol: protocol,
				port: result[iidxes.url.port],
				ipv4: result[iidxes.url.ipv4Confirmation]
					? result[iidxes.url.ipv4]
					: undefined,
				ipv6: result[iidxes.url.ipv6],
				host: result[iidxes.url.byProtocol]
					? undefined
					: (result[iidxes.url.protocolWithDomain] || "").substr(
							(protocol || "").length
					  ),
				confirmedByProtocol: !!result[iidxes.url.byProtocol],
				path: result[iidxes.url.byProtocol] ? undefined : path,
				query: result[iidxes.url.query] || undefined,
				fragment: result[iidxes.url.fragment] || undefined,
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

const anchorme = function (
	arg:
		| string
		| {
				input: string;
				options?: Partial<Options>;
				extensions?: Array<{
					test: RegExp;
					transform: (string: string) => string;
				}>;
		  }
) {
	let { input, options, extensions } =
		typeof arg === "string"
			? { input: arg, options: undefined, extensions: undefined }
			: arg;
	if (extensions) {
		for (let index = 0; index < extensions.length; index++) {
			const extension = extensions[index];
			input = input.replace(extension.test, extension.transform);
		}
	}

	const found = list(input);
	let newStr = "";

	// the following code isn't very intuitive nor human readable
	// but faster than others
	for (let index = 0; index < found.length; index++) {
		newStr =
			(newStr
				? newStr
				: index === 0
				? input.substring(0, found[index].start)
				: "") +
			transform(found[index], options) +
			(found[index + 1]
				? input.substring(found[index].end, found[index + 1].start)
				: input.substring(found[index].end));
	}
	return newStr ? newStr : input;
};

anchorme.list = function (input: string) {
	return list(input);
};

anchorme.validate = {
	ip: (input: string) => ipRegex.test(input),
	email: (input: string) => emailRegex.test(input),
	file: (input: string) => fileRegex.test(input),
	url: (input: string) => urlRegex.test(input) || ipRegex.test(input),
};

export default anchorme;
