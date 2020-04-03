import { nonLatinAlphabetRanges, TLDs } from "./dictionary";
const email_address =
	"([a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*)";
const domainWithTLD = `([a-z0-9]+(-+[a-z0-9]+)*\\.)+(${TLDs})`;
const domainWithAnyTLD = `([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]`;
const allowedInPath = `a-zA-Z\\d\\-._~\\!$&*+,;=:@%'"\\[\\]()`;
const path = `(((\\/(?:(?:[${allowedInPath}]+(?:\\/[${allowedInPath}]*)*))?)?)((?:\\?([${allowedInPath}\\/?]*))?)((?:\\#([${allowedInPath}\\/?]*))?))?`;
const ipv4 = `(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)`;
const ipv6 = `(([a-f0-9:]+:+)+[a-f0-9]+)`;
const port = `(:\\d{1,5})?`;
const protocol = `(https?:|ftps?:)\\/\\/`;
const confirmedByProtocol = `${protocol}\\S+`;
const additionalSlashes = `(([\\/]?))+`;
const nonLatinMatches = `(((${protocol})?${domainWithTLD})|${protocol}${domainWithAnyTLD})(${port})((((\\/(?:(?:[${allowedInPath}]+(?:\\/[${allowedInPath}${nonLatinAlphabetRanges}]*)*))?)?)((?:\\?([${allowedInPath}\\/?]*))?)((?:\\#([${allowedInPath}\\/?]*))?))?\\b((([${allowedInPath}\\/${nonLatinAlphabetRanges}][a-zA-Z\\d\\-_~+=\\/${nonLatinAlphabetRanges}]+)?))+)`;

export const email = `\\b(mailto:)?${email_address}@(${domainWithTLD}|${ipv4})\\b`;
export const url = `(${nonLatinMatches})|(\\b(((${protocol})?(${domainWithTLD}|${ipv4}|${protocol}(${ipv6}|${domainWithAnyTLD}))(?!@\\w)${port}${path})|(${confirmedByProtocol}))\\b${additionalSlashes})`;
export const file = `file:\\/\\/\\/([a-z]+:\\/)?([\\w.]+[\\/\\\\]?)+`;
export const final = `${url}|${email}|${file}`;

// for validation purposes
export const ipRegex = new RegExp(`^(${ipv4}|${ipv6})$`, "i");
export const emailRegex = new RegExp(`^(${email})$`, "i");
export const fileRegex = new RegExp(`^(${file})$`, "i");
export const urlRegex = new RegExp(`^(${url})$`, "i");
export const protocolPresent = /^((file:\/\/\/)|(https?:|ftps?:)\/\/|(mailto:))/i;
