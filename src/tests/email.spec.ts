/// <reference path="../../node_modules/@types/jest/index.d.ts"/>
import validateEmail from "./email";

describe('Valid emails return true', function () {
	it('alex@gmail.com', function () {
		expect(validateEmail("alex@gmail.com")).toBe(true);
	});
	it('alex@gmail.co.uk', function () {
		expect(validateEmail("alex@gmail.co.uk")).toBe(true);
	});
	it('alex@gmail.co', function () {
		expect(validateEmail("alex@gmail.co")).toBe(true);
	});
	it('alex.corvi@gmail.net', function () {
		expect(validateEmail("alex.corvi@gmail.net")).toBe(true);
	});
	it('alex-s@gmail.com', function () {
		expect(validateEmail("alex-s@gmail.com")).toBe(true);
	});
});


describe('Non email return false', function () {
	it('alex@gmail.nonvalidtld',function(){
		expect(validateEmail("alex@gmail.nonvalidtld")).toBe(false);
	});
	it('alexis.@6@gmail.com',function(){
		expect(validateEmail("alexis.@6@gmail.com")).toBe(false);
	});
	it('alexi\/\/\/\/\s.@6@gmail.com',function(){
		expect(validateEmail("alexi\/\/\/\/\s.@6@gmail.com")).toBe(false);
	});
});