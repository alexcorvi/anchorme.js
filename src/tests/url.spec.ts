/// <reference path="../../node_modules/@types/jest/index.d.ts"/>
import validURL from "./url";

describe('domain URLs', function () {
	describe('Valid URLs return true', function () {
		it('google.com',function(){
			expect(validURL("google.com")).toBe(true)
		});
		it('www.google.com',function(){
			expect(validURL("www.google.com")).toBe(true)
		});
		it('www.google.co.uk',function(){
			expect(validURL("www.google.co.uk")).toBe(true)
		});
		it('www.google.com/route/',function(){
			expect(validURL("www.google.com/route/")).toBe(true)
		});
		it('www.google.com:458/route',function(){
			expect(validURL("www.google.com:458/route")).toBe(true)
		});
	});
	describe('Non valid URLs return false', function () {
		it('www.google.nonvalidtld',function(){
			expect(validURL("www.google.nonvalidtld")).toBe(false)
		});
		it('www.goog?le.com?',function(){
			expect(validURL("www.goog?le.com?")).toBe(false)
		});
	});
});