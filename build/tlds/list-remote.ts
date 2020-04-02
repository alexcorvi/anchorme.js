import fetch from "node-fetch";
export async function listRemoteTLDs() {
	const remoteTLDs = (
		await (
			await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt")
		).text()
	)
		.replace(/^#.*\n/, "")
		.split(/\s/)
		.filter(x => x.replace(/\s/g, "").length);
	return remoteTLDs;
}
