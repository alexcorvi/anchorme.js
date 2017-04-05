/// <reference path="../node_modules/@types/jest/index.d.ts"/>
import * as utils from "./util";

describe('isPort', function () {
	it('123', function () {
		expect(utils.isPort("123")).toBe(true);
	});
	it('1', function () {
		expect(utils.isPort("1")).toBe(true);
	});
	it('100', function () {
		expect(utils.isPort("100")).toBe(true);
	});
	it('8080', function () {
		expect(utils.isPort("8080")).toBe(true);
	});
	it('80', function () {
		expect(utils.isPort("80")).toBe(true);
	});
	it('21', function () {
		expect(utils.isPort("21")).toBe(true);
	});
	it('22', function () {
		expect(utils.isPort("22")).toBe(true);
	});
	it('65536', function () {
		expect(utils.isPort("65536")).toBe(false);
	});
	it('abc', function () {
		expect(utils.isPort("abc")).toBe(false);
	});
	it('somethingElse', function () {
		expect(utils.isPort("somethingElse")).toBe(false);
	});
	it('.', function () {
		expect(utils.isPort(".")).toBe(false);
	});
	it(':', function () {
		expect(utils.isPort(":")).toBe(false);
	});
});