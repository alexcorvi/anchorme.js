/// <reference path="../../node_modules/@types/jest/index.d.ts"/>
import hasProtocol from "./hasprotocol";

describe('Valid protocols return true', function () {
	it('"http://www"', function () {
		expect(!!hasProtocol("http://www")).toBe(true);
	});
	it('"https://www"', function () {
		expect(!!hasProtocol("https://www")).toBe(true);
	});
	it('"ftp://www"', function () {
		expect(!!hasProtocol("ftp://www")).toBe(true);
	});
	it('"ftps://www"', function () {
		expect(!!hasProtocol("ftps://www")).toBe(true);
	});
	it('"mailto:www"', function () {
		expect(!!hasProtocol("mailto:www")).toBe(true);
	});
	it('"file://.www"', function () {
		expect(!!hasProtocol("file:///.www")).toBe(true);
	});
	it('"FILE://.www"', function () {
		expect(!!hasProtocol("FILE:///.www")).toBe(true);
	});
});


describe('Non protocols return false', function () {
	it('file://a',function(){
		expect(!!hasProtocol("file://a")).toBe(false);
	});
});