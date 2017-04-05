/// <reference path="../node_modules/@types/jest/index.d.ts"/>
import anchorme from "./index";



describe('options', function () {

	it('add attributes', function () {
		var result = anchorme("www.google.com",{
			attributes:[
				{
					name:"target",
					value:"_blank"
				}
			]
		});
		expect(result.split("_blank").length).toBe(2);
	});
	
	it('attributes with filters', function () {
		var result = anchorme("www.google.com www.yahoo.com",{
			attributes:[
				function(fragment){
					if(fragment.raw.indexOf("google")===-1) return {name:"target",value:"_blank"};
					else return {name:"target",value:"self"}; 
				}
			]
		});
		expect(result.split("_blank").length).toBe(2);
	});

	it('truncate', function () {
		var result = anchorme("https://github.com/alexcorvi/anchorme.js",{
			truncate:20
		});
		expect(result.substring(result.indexOf(">https")+1,result.indexOf("...")).length).toBe(20);

		var result2 = anchorme("https://github.com/alexcorvi/anchorme.js/blob/gh-pages/test/bench.js",{
			truncate:20
		});
		expect(result2.substring(result2.indexOf(">https")+1,result2.indexOf("...")).length).toBe(20);
	});

	it('truncate from the middle', function () {
		var result = anchorme("github.com/alexcorvi/anchorme.js",{
			truncate:[6,11],
		});
		expect(!!~result.indexOf(">github...")).toBe(true);
		expect(!!~result.indexOf("...anchorme.js<")).toBe(true);
	});

	it('set default protocol', function () {
		var result = anchorme("www.google.com",{
			defaultProtocol:"ftp://"
		});
		expect(result.split("ftp://").length).toBe(2);
	});

	it('set default protocol as a function', function () {
		var result = anchorme("www.google.com www.yahoo.com",{
			defaultProtocol:function(raw){
				if(raw.indexOf("google") === -1) return "ftp://";
				else return "https://";
			}
		});
		expect(result.split("ftp://").length).toBe(2);
	});

	it('custom exclude function',function(){
		var result = anchorme("something.zip",{
			exclude:function(URLObject){
				if(URLObject.raw.endsWith(".zip")) return true;
			}
		});
		expect(result.split("href").length).toBe(1);
	});

});

describe('Additional functionalities', function () {
	it('return a list of valid URLs', function () {
		var result = anchorme("www.google.com mail@gmail.com",{
			list:true
		});
		expect(typeof result).toBe("object");
		expect(result.length).toBe(2);
	});

	it('URLs validator works with emojis', function () {
		expect(anchorme.validate.url("http://🐌🍏⌚✨😐😍🐸🍑.🍕💩.ws")).toBe(true);
	});
});