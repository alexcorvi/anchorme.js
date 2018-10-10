const fs = require('fs');
const path = require("path");
const anchorme = require(path.join(process.cwd(),"dist-node","index.js")).default;
const bigData = fs.readFileSync(process.cwd()+"/benchmark/big.sample.txt","utf-8");
const t0 = new Date().getTime();
anchorme(bigData);
console.log("Total runtime: " + (new Date().getTime() - t0) + " ms");
