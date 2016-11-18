export default function (str) {
	str = str.toLowerCase();
	if(str.startsWith("http://")) return "http://";
	else if(str.startsWith("https://")) return "https://";
	else if(str.startsWith("ftp://")) return "ftp://";
	else if(str.startsWith("file:///")) return "file:///";
	else if(str.startsWith("mailto:")) return "mailto:";
	else return false;
}