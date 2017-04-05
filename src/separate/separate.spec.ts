/// <reference path="../../node_modules/@types/jest/index.d.ts"/>
import {separate} from "./separate";
import {deSeparate} from "./separate";


const string = `URL "alex@gmail.com" www.google.com??!! URL (mail.google.com) URL http://www.wikipedia.com/somearticle_(abc) URL (http://www.wikipedia.com/somearticle_(efg))`;





describe('something', function () {
	const result = separate(string);
	it('alex@gmail.com', function () {
		expect(result.indexOf("alex@gmail.com")).toBeGreaterThanOrEqual(0)
	});
	it('www.google.com', function () {
		expect(result.indexOf("www.google.com")).toBeGreaterThanOrEqual(0)
	});
	it('mail.google.com', function () {
		expect(result.indexOf("mail.google.com")).toBeGreaterThanOrEqual(0)
	});
	it('http://www.wikipedia.com/somearticle_(abc)', function () {
		expect(result.indexOf("http://www.wikipedia.com/somearticle_(abc)")).toBeGreaterThanOrEqual(0)
	});
	it('http://www.wikipedia.com/somearticle_(efg)', function () {
		expect(result.indexOf("http://www.wikipedia.com/somearticle_(efg)")).toBeGreaterThanOrEqual(0)
	});
})




