const fs = require("fs");
const path = require("path");

var exec = require('child_process').exec;
function execute(cmd){
	return new Promise((resolve,reject)=>{
		exec(cmd, (error, stdout, stderr) => {
			if(!error) resolve(stdout);
			else reject(error);
		});
	})
}


function build(){
	const rollup = require('rollup');
	const srcPath = path.join(process.cwd(),"dist-node","index.js");
	const distDir = path.join(process.cwd(),"dist-browser") + "/";
	const uglifyjs = require("uglify-js");
	const buble = require("rollup-plugin-buble");
	const commonjs = require('rollup-plugin-commonjs');

	rollup.rollup({
		entry: srcPath,
		plugins:[buble(),commonjs()]
	})
	.then((bundle) => {
		console.log("- Generating UMD bundle...");		
		// Universal
		var umd = bundle.generate({
			format:"umd",
			moduleName:"anchorme"
		});
		console.log("- Writing file...");		
		fs.writeFileSync(distDir+"anchorme.js",umd.code);
		console.log("- Minifying...");		
		var minified = uglifyjs.minify(umd.code,{fromString:true}).code;
		console.log("- Writing minified file...");	
		fs.writeFileSync(distDir+"anchorme.min.js",minified);
	})
	.catch((err)=>{
		console.log(err);
		process.exit(1);
	});
}

execute("jest")
.then((out)=>{
	console.log("Test passed successfully");
	return execute("tsc");
})
.then(()=>{
	console.log("Built from typescript")
	return build();
})
.catch(err=>console.error(err));