import { listRemoteTLDs } from "./list-remote";
import * as fs from "fs";
import * as path from "path";

listRemoteTLDs().then(list => {
	fs.writeFileSync(
		path.resolve("src/tlds.ts"),
		`export const TLDs = \`(${list.join("|")})\`;`,
		{
			encoding: "UTF8"
		}
	);
});
