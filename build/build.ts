import * as rollupPluginBuble from "@rollup/plugin-buble";
import * as rollupPluginCommonjs from "@rollup/plugin-commonjs";
import { exec } from "child_process";
import { watch } from "chokidar";
import * as fs from "fs";
import * as path from "path";
import * as rollup from "rollup";
import * as uglify from "uglify-js";

let currentlyBuilding = false;

function execute(cmd: string) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (!error) {
				if (stdout) {
					console.log("🔨", stdout);
				}
			} else {
				console.log("🔨", "ERROR");
				console.log("🔨", error);
				console.log("🔨", stderr);
			}
			resolve();
		});
	});
}

async function startBuild() {
	const srcPath = path.join(process.cwd(), "dist/node", "index.js");
	const distDir = path.join(process.cwd(), "dist/browser") + "/";

	console.log("🔨 🏁 START BUILD");
	console.log("🔨 🧱 - Compiling from Typescript");
	await execute("tsc");
	const bundle = await rollup.rollup({
		input: srcPath,
		plugins: [(rollupPluginBuble as any)(), (rollupPluginCommonjs as any)()]
	});

	console.log("🔨 📦 - Generating UMD bundle");
	// Universal
	var code = (
		await bundle.generate({
			format: "umd",
			name: "anchorme"
		})
	).output[0].code;
	console.log("🔨 📄 - Writing browser file");
	fs.writeFileSync(distDir + "anchorme.js", code);
	console.log("🔨 🔩 - Minifying");
	var minified = uglify.minify(code).code;
	console.log("🔨 📄 - Writing browser minified file");
	fs.writeFileSync(distDir + "anchorme.min.js", minified);
	console.log("🔨 🏁 END BUILD");
}

startBuild().then(x => {
	if (process.argv.indexOf("-w") > -1) {
		console.log("🔨 👀 - Watching for changes");
		watch(path.resolve("src/")).on("all", ev => {
			if (currentlyBuilding) {
				return;
			}
			if (["change", "unlink", "unlinkDir"].indexOf(ev) > -1) {
				console.log(
					"🔨 🏁 CHANGE OCCURRED AT",
					new Date().toLocaleTimeString()
				);
				currentlyBuilding = true;
				startBuild().then(() => {
					currentlyBuilding = false;
				});
			}
		});
	}
});
