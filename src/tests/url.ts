import {isPort} from "../util";
import {tlds as tlds} from "../lists";

const pattern = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;

export default function (str:string):boolean {


	// general pattern recognition https://regex101.com/r/RgKTA4/2
	const match = str.match(pattern);
	if(match === null) return false;

	
	// validate TLD
	if(typeof match[3] !== "string") return false;
	if(tlds.indexOf(match[3].toLowerCase()) === -1) return false;

	// validate port
	if(match[5] && (!isPort(match[5]))) return false;
	return true;
}