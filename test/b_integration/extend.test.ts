import anchorme from "../../dist/node";
import * as expect from "expect";

describe("Extending", () => {
	const test = /#(\w|_)+/gim;
	const string = "flew right out there once I heard it. #speed";
	const transform = (string: string) =>
		`<a href="http://example.com/search/${string.substring(
			1
		)}">${string}</a>`;
	it("Extending works", () => {
		expect(
			anchorme({
				input: string,
				extensions: [
					{
						test,
						transform
					}
				]
			})
		).toBe(`flew right out there once I heard it. ${transform("#speed")}`);
	});
});
