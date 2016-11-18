const fs = require("fs");
const path = require("path");
fs.find = (file,dir) => {
	if(!fs.isDir(dir)) throw new Error("The second argument should be an accessible directory");
	return fs.readdirRec(dir)
	.filter((filePath)=>filePath.toLowerCase().endsWith(file.toLowerCase()));
};
fs.isDir = function(dpath) {
	try {
		if(fs.lstatSync(dpath).isDirectory()) return true;
		else return false;
	} catch(e) {
		return false;
	}
};
fs.fileExists = function(filePath){
	try {
		fs.accessSync(filePath);
		return true;
	}
	catch(e) {
		return false;
	}
};
fs.readdirRec = function (dir) {
	if(!fs.isDir(dir)) throw new Error("The directory to be read must be valid and accessible");
	return fs.readdirSync(dir)
	.map((fileName)=>path.join(dir,fileName)) // add the directory
	.reduce((arr,fileDir)=>{
		if(fs.isDir(fileDir)) fs.readdirRec(fileDir).forEach((x)=>arr.push(x));
		else arr.push(fileDir);
		return arr;
	},[]);
};