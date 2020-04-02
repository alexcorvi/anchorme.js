import { isInsideAnchorTag } from "../../src/utils";
import * as expect from "expect";

describe("UNIT: is anchor tag", () => {
	const str = `<a href="http://google.com">for more about the AAA.com</a>for more about the AAA.com  <a href="BBB.com">you can also download BBB.com by clicking here</a>CCC.com <a href="http://youtube.com">DDD.com</a>`;
	describe("Positive", () => {
		it("First AAA.com", () => {
			expect(isInsideAnchorTag("AAA.com", str, 54)).toBe(true);
		});
		it("BBB.com", () => {
			expect(isInsideAnchorTag("BBB.com", str, 133)).toBe(true);
		});
		it("DDD.com", () => {
			expect(isInsideAnchorTag("DDD.com", str, 198)).toBe(true);
		});
	});
	describe("Negative", () => {
		it("Second AAA.com", () => {
			expect(isInsideAnchorTag("AAA.com", str, 102)).toBe(false);
		});
		it("CCC.com", () => {
			expect(isInsideAnchorTag("CCC.com", str, 161)).toBe(false);
		});
	});
});
