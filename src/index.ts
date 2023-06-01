import { list } from "./list"
import { transform } from "./transform";
import { Options } from "./types";
import {
	emailRegex,
	fileRegex,
	ipRegex,
	urlRegex,
} from "./regex";

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

	const found = list(input, (options || {}).skipHTML);
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

anchorme.list = list

anchorme.validate = {
	ip: (input: string) => ipRegex.test(input),
	email: (input: string) => emailRegex.test(input),
	file: (input: string) => fileRegex.test(input),
	url: (input: string) => urlRegex.test(input) || ipRegex.test(input),
};

export default anchorme;
