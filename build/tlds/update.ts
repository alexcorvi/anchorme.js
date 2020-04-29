import { listRemoteTLDs } from "./list-remote";
import * as fs from "fs";
import * as path from "path";

const localTLDs = ["TEST"];

listRemoteTLDs().then(list => {

	const listWithLocalTLDs = localTLDs.reduce((list, localTLD) => {
		if (! list.includes(localTLD)) {
			return list.concat(localTLD)
		}
		return list
	}, list)

	fs.writeFileSync(
		path.resolve("src/tlds.ts"),
		`export const TLDs = \`(${listWithLocalTLDs.join("|")})\`;`,
		{
			encoding: "UTF8"
		}
	);
});
