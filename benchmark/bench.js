const fs = require("fs");
const path = require("path");
const anchorme = require("../dist/node/index").default;
const bigData = fs.readFileSync(
	process.cwd() + "/benchmark/big.sample.txt",
	"utf-8"
);

const t1 = new Date().getTime();
anchorme(bigData);
console.log("Total runtime: " + (new Date().getTime() - t1) + " ms");
