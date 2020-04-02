import { emailRegex, fileRegex, ipRegex, protocolPresent } from "./regex";
import { DesiredValues, Options, TokenProps, TransformationOption } from "./types";

function applyOption<desiredValueType extends DesiredValues>(
	tokenProps: string,
	option: TransformationOption<desiredValueType>
): desiredValueType {
	// conditional
	if (typeof option === "function") {
		return option(tokenProps);
	}
	// all
	else {
		return option;
	}
}

export function transform(input: string, options?: Partial<Options>): string {
	let protocol = "";
	let truncation = Infinity;
	let attributes: { [key: string]: string | undefined } = {};
	let truncateFromTheMiddle = false;

	// special transformation
	if (options && options.specialTransform) {
		for (let index = 0; index < options.specialTransform.length; index++) {
			const transformer = options.specialTransform[index];
			if (transformer.test.test(input)) {
				return transformer.transform(input);
			}
		}
	}
	// exclude
	if (options && options.exclude) {
		if (applyOption(input, options.exclude)) return input;
	}

	// protocol
	if (options && options.protocol) {
		protocol = applyOption(input, options.protocol);
	}
	if (protocolPresent.test(input)) {
		protocol = "";
	} else if (!protocol) {
		protocol = emailRegex.test(input)
			? "mailto:"
			: fileRegex.test(input)
			? "file:///"
			: "http://";
	}

	// truncation
	if (options && options.truncate) {
		truncation = applyOption(input, options.truncate);
	}
	if (options && options.middleTruncation) {
		truncateFromTheMiddle = applyOption(input, options.middleTruncation);
	}
	// attributes
	if (options && options.attributes) {
		attributes = applyOption(input, options.attributes);
	}

	return `<a ${Object.keys(attributes)
		.filter(x => typeof attributes[x] !== "undefined")
		.map(key => `${key}="${attributes[key]}" `)
		.join(" ")}href="${protocol}${input}">${
		input.length > truncation
			? truncateFromTheMiddle
				? input.substring(0, Math.floor(truncation / 2)) +
				  "…" +
				  input.substring(
						input.length - Math.ceil(truncation / 2),
						input.length
				  )
				: input.substring(0, truncation) + "…"
			: input
	}</a>`;
}
