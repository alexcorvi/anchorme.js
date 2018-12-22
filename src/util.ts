export interface AttributeObj {
	name:string,
	value:string
}

export interface URLObj {
	reason:string,
	protocol:string,
	raw:string,
	encoded:string
}

export interface AttributeFunction {
	(obj:URLObj):AttributeObj
}

export interface Options {
	attributes?:Array<AttributeObj|AttributeFunction>,
	ips?:boolean,
	emails?:boolean,
	urls?:boolean,
	files?:boolean,
	truncate?:number|[number,number],
	defaultProtocol?:string|Function,
	list?:boolean,
	exclude?:(url:URLObj)=>boolean
}

/**
 * 
 * Options defaulting function
 * 
**/
export function defaultOptions(options:Options|undefined):Options{
	if(!options) {
		options = {
			attributes:[],
			ips:true,
			emails:true,
			urls:true,
			files:true,
			truncate:Infinity,
			defaultProtocol:"http://",
			list:false
		};
	}

	if(typeof options.attributes 		!== "object") 	options.attributes = [];
	if(typeof options.ips 				!== "boolean") 	options.ips = true;
	if(typeof options.emails 			!== "boolean") 	options.emails = true;
	if(typeof options.urls 				!== "boolean") 	options.urls = true;
	if(typeof options.files 			!== "boolean") 	options.files = true;
	if(typeof options.list				!== "boolean") 	options.list = false;
	if(typeof options.defaultProtocol 	!== "string" && typeof options.defaultProtocol 	!== "function") 	options.defaultProtocol = "http://";
	if(typeof options.truncate		 	!== "number" && (typeof options.truncate !== "object" || options.truncate === null)) options.truncate = Infinity;
	return options;
}

/**
 * 
 * Returns whether passed string
 * can be a valid port number or not
 * 
**/
export function isPort(value:string):boolean{
	if(isNaN(Number(value))) return false;
	if((Number(value))>65535) return false;
	else return true;
}
