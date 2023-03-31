import { nonLatinAlphabetRanges } from "./dictionary";
const email_address =
	"([a-z0-9!#$%&'*+=?^_`{|}~-]+(\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)";
const domainWithAnyTLD = `((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.]|\\b)`;
const allowedInPath = `a-z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()?#`;
const path = `(((\\/(([${allowedInPath}]+(\\/[${allowedInPath}]*)*))*?)?))?`;
const ipv4 = `((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)`;
const ipv6 = `\\[(([a-f0-9:]+:+)+[a-f0-9]+)\\]`;
const port = `(:(\\d{1,5}))?`;
const protocol = `(https?:|ftps?:)\\/\\/`;
const confirmedByProtocol = `(${protocol})\\S+`;
const additionalSlashes = `(([\\/]?))+`;
const fqdn = `(((${protocol})?(${domainWithAnyTLD}|${ipv4}|(${protocol})(${ipv6}|${domainWithAnyTLD}))(?!@\\w)${port})|(${confirmedByProtocol}))`;
const nonLatinMatches = `(((${protocol})?(((([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9]))\\.){1,}([a-z]{2,}|xn--[a-z0-9]{2,})(?=[^.])|${ipv4}|(${protocol})(${ipv6}|${domainWithAnyTLD}))(?!@\\w)${port})|(${confirmedByProtocol}))((((\\/(([${allowedInPath}]+(\\/[${allowedInPath}${nonLatinAlphabetRanges}]*)*))*?)?))?\\b((([${allowedInPath}\\/${nonLatinAlphabetRanges}][a-z\\d\\-_~+=\\/${nonLatinAlphabetRanges}]+)))+)`;

export const email = `\\b(mailto:)?${email_address}@(${domainWithAnyTLD}|${ipv4})\\b`;
export const url = `(${nonLatinMatches})|(\\b${fqdn}${path}\\b${additionalSlashes})`;
export const file = `(file:\\/\\/\\/)([a-z]+:(\\/|\\\\)+)?([\\w.]+([\\/\\\\]?)+)+`;
export const final = `\\b(${url})|(${email})|(${file})\\b`;
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
	isURL: 0,
	isEmail: 0,
	isFile: 0,
	file: {
		fileName: 0,
		protocol: 0,
	},
	email: {
		protocol: 0,
		local: 0,
		host: 0,
	},
	url: {
		// three places where TLD can appear
		// three places where protocol can appear
		TLD: [0,0,0],
		protocol: [0,0,0],
		ipv4: 0,
		ipv6: 0,
		ipv4Confirmation: 0,
		byProtocol: 0,
		port: 0,
		protocolWithDomain: 0,
		path: 0,
		// sometimes path might be split into two parts
		secondPartOfPath: 0,
		query: 0,
		fragment: 0,
	},
};

const testers = [
	`file:///some/file/path/filename.pdf`,
	`mailto:e+_mail.me@sub.domain.com`,
	`http://sub.domain.co.uk:3000/p/a/t/h_(asd)/h?q=abc123#dfdf`,
	`http://www.عربي.com`,
	`http://127.0.0.1:3000/p/a/t_(asd)/h?q=abc123#dfdf`,
	`http://[2a00:1450:4025:401::67]/k/something`,
	`a.org/abc/ი_გგ`,
	`a.ta/p`,
	`a.tb`,
	`a@b.cd`
].join(" ");

let result: RegExpExecArray | null = null;
let i = 0;

while ((result = finalRegex.exec(testers)) !== null) {
	if (i === 0) {
		iidxes.isFile = result.lastIndexOf(result[0]);
		iidxes.file.fileName = result.indexOf("filename.pdf");
		iidxes.file.protocol = result.indexOf("file:///");
	}

	if (i === 1) {
		iidxes.isEmail = result.lastIndexOf(result[0]);
		iidxes.email.protocol = result.indexOf("mailto:");
		iidxes.email.local = result.indexOf("e+_mail.me");
		iidxes.email.host = result.indexOf("sub.domain.com");
	}

	if (i === 2) {
		iidxes.isURL = result.lastIndexOf(result[0]);
		iidxes.url.protocol[0] = result.indexOf("http://");
		iidxes.url.protocolWithDomain = result.indexOf(
			"http://sub.domain.co.uk:3000"
		);
		iidxes.url.port = result.indexOf("3000");
		iidxes.url.path = result.indexOf("/p/a/t/h_(asd)/h");
		iidxes.url.query = result.indexOf("q=abc123");
		iidxes.url.fragment = result.indexOf("dfdf");
	}

	if (i === 3) {
		iidxes.url.byProtocol = result.lastIndexOf("http://www.عربي.com");
		iidxes.url.protocol[2] = result.lastIndexOf("http://");
	}
	if (i === 4) {
		iidxes.url.ipv4 = result.indexOf("127.0.0.1");
		iidxes.url.ipv4Confirmation = result.indexOf("0.");
	}
	if (i === 5) {
		iidxes.url.ipv6 = result.indexOf("2a00:1450:4025:401::67");
		iidxes.url.protocol[1] = result.lastIndexOf("http://");
	}
	if (i === 6) {
		iidxes.url.secondPartOfPath = result.indexOf("გგ");
	}
	if(i===7) {
		iidxes.url.TLD[0] = result.indexOf("ta")
	}
	if(i===8) {
		iidxes.url.TLD[1] = result.indexOf("tb")
	}
	if(i===9) {
		iidxes.url.TLD[2] = result.indexOf("cd")
	}
	i++;
}

// console.log(iidxes);

export { iidxes };