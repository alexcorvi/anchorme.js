import { htmlAttributes } from "./dictionary";
export function checkParenthesis(
	opening: string,
	closing: string,
	target: string,
	nextChar: string
) {
	if (nextChar !== closing) {
		return false;
	}
	if (
		target.split(opening).length - target.split(closing).length === 1 ||
		(opening === closing && target.split(opening).length % 2 === 0)
	) {
		return true;
	}
}

export const maximumAttrLength = htmlAttributes.sort(
	(a, b) => b.length - a.length
)[0].length;

export function isInsideAttribute(quoteType: string, prevFragment: string) {
	for (let index = 0; index < htmlAttributes.length; index++) {
		const atr = htmlAttributes[index];
		const targetString = `${atr.toLowerCase()}=${quoteType}`;
		if (
			prevFragment.toLowerCase().indexOf(targetString) !== -1 &&
			prevFragment.toLowerCase().indexOf(targetString) ===
				prevFragment.length - targetString.length
		) {
			return true;
		}
	}
	return false;
}

export function isInsideAnchorTag(
	target: string,
	fullInput: string,
	targetEnd: number
) {
	const escapedTarget = target.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	const regex = new RegExp(
		`(?=(<a))(?!([\\s\\S]*)(<\\/a>)(${escapedTarget}))[\\s\\S]*?(${escapedTarget})(?!"|')`,
		"gi"
	);
	let result: RegExpExecArray | null = null;
	while ((result = regex.exec(fullInput)) !== null) {
		let end = result.index + result[0].length;
		if (end === targetEnd) {
			return true;
		}
	}
	return false;
}
