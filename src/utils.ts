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

export function isInsideAttribute(prevFragment: string) {
	return (
		/\s[a-z0-9-]+=('|")$/i.test(prevFragment) ||
		/: ?url\(('|")?$/i.test(prevFragment)
	);
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
