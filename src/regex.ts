import { nonLatinAlphabetRanges, TLDs } from "./dictionary";
const email_address =
	"([a-z0-9!#$%&'*+=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)";
const domainWithTLD = `([a-z0-9]+(-+[a-z0-9]+)*\\.)+(${TLDs})`;
const domainWithAnyTLD = `([a-z0-9]+(-+[a-z0-9]+)*\\.)+([a-z0-9][a-z0-9-]{0,${
	Math.max.apply(
		this,
		TLDs.split("|").map((x) => x.length)
	) - 2
}}[a-z0-9])`;
const allowedInPath = `a-zA-Z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()`;
const path = `(((\\/(([${allowedInPath}]+(\\/[${allowedInPath}]*)*))?)?)((\\?([${allowedInPath}\\/?]*))?)((\\#([${allowedInPath}\\/?]*))?))?`;
const ipv4 = `((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)`;
const ipv6 = `\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]`;
const port = `(:(\\d{1,5}))?`;
const protocol = `(https?:|ftps?:)\\/\\/`;
const confirmedByProtocol = `(${protocol})\\S+`;
const additionalSlashes = `(([\\/]?))+`;
const fqdn = `(((${protocol})?(${domainWithTLD}|${ipv4}|(${protocol})(${ipv6}|${domainWithAnyTLD}))(?!@\\w)${port})|(${confirmedByProtocol}))`;
const nonLatinMatches = `${fqdn}((((\\/(([${allowedInPath}]+(\\/[${allowedInPath}${nonLatinAlphabetRanges}]*)*))?)?)((\\?([${allowedInPath}\\/?]*))?)((\\#([${allowedInPath}\\/?]*))?))?\\b((([${allowedInPath}\\/${nonLatinAlphabetRanges}][a-zA-Z\\d\\-_~+=\\/${nonLatinAlphabetRanges}]+)?))+)`;

export const email = `\\b(mailto:)?${email_address}@(${domainWithTLD}|${ipv4})\\b`;
export const url = `(${nonLatinMatches})|(\\b${fqdn}${path}\\b${additionalSlashes})`;
export const file = `(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+`;
export const final = `(${url})|(${email})|(${file})`;
export const finalRegex = new RegExp(final, "gi");

// for validation purposes
export const ipRegex = new RegExp(`^(${ipv4}|${ipv6})$`, "i");
export const emailRegex = new RegExp(`^(${email})$`, "i");
export const fileRegex = new RegExp(`^(${file})$`, "i");
export const urlRegex = new RegExp(`^(${url})$`, "i");

// identifying parts of the link
// the initial value of this object is precomputed.
// https://github.com/alexcorvi/anchorme.js/blob/098843bc0d042601cff592c4f8c9f6d0424c09cd/src/regex.ts
const iidxes = {
	isURL: 2,
	isEmail: 84,
	isFile: 96,
	file: {
		fileName: 100,
		protocol: 97,
	},
	email: {
		protocol: 85,
		local: 86,
		host: 88,
	},
	url: {
		ipv4: 7,
		ipv6: 16,
		ipv4Confirmation: 12,
		byProtocol: 25,
		port: 24,
		// three places where protocol can appear
		protocol1: 5,
		protocol2: 26,
		protocol3: 15,
		protocolWithDomain: 3,
		path: 30,
		// sometimes path might be split into two parts
		secondPartOfPath: 41,
		query: 37,
		fragment: 40,
	},
};

export { iidxes };
