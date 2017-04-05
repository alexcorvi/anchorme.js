export default function (str:string):false|"http://"|"https://"|"ftp://"|"ftps://"|"file:///"|"mailto:" {
	str = str.toLowerCase();
	if(str.indexOf("http://") === 0) return "http://";
	else if(str.indexOf("https://") === 0) return "https://";
	else if(str.indexOf("ftp://") === 0) return "ftp://";
	else if(str.indexOf("ftps://") === 0) return "ftps://";
	else if(str.indexOf("file:///") === 0) return "file:///";
	else if(str.indexOf("mailto:") === 0) return "mailto:";
	else return false;
}