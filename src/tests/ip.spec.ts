/// <reference path="../../node_modules/@types/jest/index.d.ts"/>
import validateIP from "./ip";


describe('Valid IPs return true', function () {
	it('1.2.3.4',function(){
		expect(validateIP("1.2.3.4")).toBe(true)
	});
	it('1.2.3.4:3',function(){
		expect(validateIP("1.2.3.4:3")).toBe(true)
	});
	it('1.2.3.4:3/route',function(){
		expect(validateIP("1.2.3.4:3/route")).toBe(true)
	});
	it('1.2.3.4:3/route:47',function(){
		expect(validateIP("1.2.3.4:3/route:47")).toBe(true)
	});
	it('1.2.3.4/route:47',function(){
		expect(validateIP("1.2.3.4/route:470000")).toBe(true)
	});
});

describe('Non valid IPs return false', function () {
	it('500.3.3.5',function(){
		expect(validateIP("500.3.3.5")).toBe(false)
	});
	it('1.2.2.500',function(){
		expect(validateIP("1.2.2.500")).toBe(false)
	});
	it('1.2.3.4....b',function(){
		expect(validateIP("1.2.3.4....b")).toBe(false)
	});
	it('6.7.8.9:abc/dsada',function(){
		expect(validateIP("6.7.8.9:abc/dsada")).toBe(false)
	});
	it('6.7.8.9:/dsada',function(){
		expect(validateIP("6.7.8.9:/dsada")).toBe(false)
	});
});