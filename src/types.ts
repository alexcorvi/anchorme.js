export interface TokenProps {
	start: number;
	end: number;
	string: string;
}

export type DesiredValues =
	| { [key: string]: string | undefined }
	| number
	| string
	| boolean;

export type TransformationOption<desiredValue> =
	| desiredValue
	| ((props: string) => desiredValue);

export interface Options {
	specialTransform: {
		test: RegExp;
		transform: (input: string) => string;
	}[];
	protocol: TransformationOption<string>;
	truncate: TransformationOption<number>;
	middleTruncation: TransformationOption<boolean>;
	exclude: TransformationOption<boolean>;
	attributes: TransformationOption<{ [key: string]: string | undefined }>;
}
