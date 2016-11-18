const fs = require('fs');
const path = require("path");
const anchorme = require(path.join(process.cwd(),"dist","anchorme.js"));
const Bench = require(path.join(process.cwd(),"test","bench","index.js"));
const bigData = fs.readFileSync(process.cwd()+"/test/big.sample.txt","utf-8");
var bench = new Bench("Benchmark a long document 10000 lines");
anchorme(bigData);
bench.mark("Anchorme.js");
bench.end().graph();