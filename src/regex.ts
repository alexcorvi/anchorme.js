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
const nonLatinMatches = `${fqdn}((((\\/(([${allowedInPath}]+(\\/[${allowedInPath}${nonLatinAlphabetRanges}]*)*))?)?)((\\?([${allowedInPath}\\/?]*))?)((\\#([${allowedInPath}\\/?]*))?))?\\b((([${allowedInPath}\\/${nonLatinAlphabetRanges}][a-zA-Z\\d\\-_~+=\\/${nonLatinAlphabetRanges}]+$)?))+)`;

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
		ipv4: 0,
		ipv6: 0,
		ipv4Confirmation: 0,
		byProtocol: 0,
		port: 0,
		// three places where protocol can appear
		protocol1: 0,
		protocol2: 0,
		protocol3: 0,
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
		iidxes.url.protocol1 = result.indexOf("http://");
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
		iidxes.url.protocol2 = result.lastIndexOf("http://");
	}
	if (i === 4) {
		iidxes.url.ipv4 = result.indexOf("127.0.0.1");
		iidxes.url.ipv4Confirmation = result.indexOf("0.");
	}
	if (i === 5) {
		iidxes.url.ipv6 = result.indexOf("2a00:1450:4025:401::67");
		iidxes.url.protocol3 = result.lastIndexOf("http://");
	}
	if (i === 6) {
		iidxes.url.secondPartOfPath = result.indexOf("გგ");
	}
	i++;
}
export { iidxes };
