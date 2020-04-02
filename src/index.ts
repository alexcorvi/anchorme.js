import { closingParenthesis, parenthesis } from "./dictionary";
import { emailRegex, fileRegex, final, ipRegex, urlRegex } from "./regex";
import { transform } from "./transform";
import { Options, TokenProps } from "./types";
import { checkParenthesis as parenthesisIsPartOfTheURL, isInsideAnchorTag, isInsideAttribute, maximumAttrLength } from "./utils";

const list = function(input: string) {
	const regex = new RegExp(final, "gi");
	const found: TokenProps[] = [];
	let result: RegExpExecArray | null = null;

	while ((result = regex.exec(input)) !== null) {
		const start = result.index;
		let end = start + result[0].length;
		let string = result[0];

		// Parenthesis problem
		/**
				As we're using the \b to tokenize the URL, sometimes the parenthesis are part of the URL
				and sometimes they are actually the last part, this makes the tokenization stops just
				before them.
				To fix this, we calculate how many parenthesis are open and how many are closed inside
				the URL and based on the number we should be able to know whether the aforementioned
				parenthesis character is part of the URL or not
			*/
		if (closingParenthesis.indexOf(input.charAt(end)) > -1) {
			parenthesis.forEach(str => {
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

		// HTML problem 1
		/**
				checking whether the token is already inside an HTML element by seeing if it's
				preceded by an HTML attribute that would hold a url (e.g. scr, cite ...etc)
			*/
		if (
			input.charAt(start - 1) === "'" ||
			input.charAt(start - 1) === '"'
		) {
			if (
				isInsideAttribute(
					input.charAt(start - 1),
					input.substring(start - maximumAttrLength - 5, start)
				)
			) {
				continue;
			}
		}

		// HTML problem 2
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

		found.push({
			start,
			end,
			string
		});
	}
	return found;
};

const anchorme = function(
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
	for (let index = 0; index < found.length; index++) {
		newStr =
			(newStr
				? newStr
				: index === 0
				? input.substring(0, found[index].start)
				: "") +
			transform(found[index].string, options) +
			(found[index + 1]
				? input.substring(found[index].end, found[index + 1].start)
				: input.substring(found[index].end));
	}
	return newStr ? newStr : input;
};

anchorme.list = function(input: string) {
	return list(input);
};

anchorme.validate = {
	ip: (input: string) => ipRegex.test(input),
	email: (input: string) => emailRegex.test(input),
	file: (input: string) => fileRegex.test(input),
	url: (input: string) => urlRegex.test(input) || ipRegex.test(input)
};

export default anchorme;
