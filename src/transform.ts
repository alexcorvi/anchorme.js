import {
	DesiredValues,
	Options,
	TransformationOption,
	ListingProps,
} from "./types";

function applyOption<desiredValueType extends DesiredValues>(
	string: string,
	props: Partial<ListingProps> & { string: string },
	option: TransformationOption<desiredValueType>
): desiredValueType {
	// conditional
	if (typeof option === "function") {
		return option(string, props);
	}
	// all
	else {
		return option;
	}
}

export function transform(
	input: Partial<ListingProps> & { string: string },
	options?: Partial<Options>
): string {
	let protocol = "";
	let truncation = Infinity;
	let attributes: { [key: string]: string | undefined | true } = {};
	let truncateFromTheMiddle = false;

	// special transformation
	if (options && options.specialTransform) {
		for (let index = 0; index < options.specialTransform.length; index++) {
			const transformer = options.specialTransform[index];
			if (transformer.test.test(input.string)) {
				return transformer.transform(input.string, input);
			}
		}
	}
	// exclude
	if (options && options.exclude) {
		if (applyOption(input.string, input, options.exclude))
			return input.string;
	}

	// protocol
	if (options && options.protocol) {
		protocol = applyOption(input.string, input, options.protocol);
	}
	if (input.protocol) {
		protocol = "";
	} else if (!protocol) {
		protocol = input.isEmail
			? "mailto:"
			: input.isFile
			? "file:///"
			: "http://";
	}

	// truncation
	if (options && options.truncate) {
		truncation = applyOption(input.string, input, options.truncate);
	}
	if (options && options.middleTruncation) {
		truncateFromTheMiddle = applyOption(
			input.string,
			input,
			options.middleTruncation
		);
	}
	// attributes
	if (options && options.attributes) {
		attributes = applyOption(input.string, input, options.attributes);
	}

	return `<a ${Object.keys(attributes)
		.map((key) =>
			attributes[key] === true ? key : `${key}="${attributes[key]}" `
		)
		.join(" ")}href="${protocol}${input.string}">${
		input.string.length > truncation
			? truncateFromTheMiddle
				? input.string.substring(0, Math.floor(truncation / 2)) +
				  "…" +
				  input.string.substring(
						input.string.length - Math.ceil(truncation / 2),
						input.string.length
				  )
				: input.string.substring(0, truncation) + "…"
			: input.string
	}</a>`;
}
