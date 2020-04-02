import * as child from "child_process";
import * as fs from "fs";
import * as path from "path";

function execute(cmd: string) {
	return new Promise((resolve, reject) => {
		child.exec(cmd, (error, stdout, stderr) => {
			if (!error) resolve(stdout);
			else reject(error);
		});
	});
}

const target = path.resolve("./test");
let testRunning = false;
fs.watch(target, { recursive: true }, async () => {
	if (testRunning) {
		return;
	}
	testRunning = true;
	const out = await execute("yarn run test");
	console.log(out);
});
