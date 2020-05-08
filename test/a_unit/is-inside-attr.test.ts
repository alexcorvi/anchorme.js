import { isInsideAttribute } from "../../src/utils";
import * as expect from "expect";

const attributesThatCanHaveURL = [
	"src",
	"data",
	"href",
	"cite",
	"formaction",
	"icon",
	"manifest",
	"poster",
	"codebase",
	"background",
	"profile",
	"usemap",
	"itemtype",
	"action",
	"longdesc",
	"classid",
	"archive",
	"other",
	"non-standard",
];

describe("UNIT: is inside attribute", () => {
	describe("Positive", () => {
		attributesThatCanHaveURL.forEach((attr) => {
			it(`${attr} with "`, () => {
				expect(isInsideAttribute(` ${attr}="`)).toBe(true);
			});
			it(`${attr} with '`, () => {
				expect(isInsideAttribute(` ${attr}='`)).toBe(true);
			});
		});
	});
	describe("Negative", () => {
		it("not preceded with a quote", () => {
			expect(isInsideAttribute(` src=`)).toBe(false);
		});
	});
});
