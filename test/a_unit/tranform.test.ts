import { Options } from "../../dist/node/types";
import { transform } from "../../src/transform";
import * as expect from "expect";

function vanilla(input: string) {
	return `<a href="http://${input}">${input}</a>`;
}

describe("UNIT: transform", () => {
	it("vanilla transformation", () => {
		const transformRes = transform({ string: "X" });
		expect(transformRes).toBe(vanilla("X"));
	});
	describe("Applying options", () => {
		describe("Special transform", () => {
			const options: Partial<Options> = {
				specialTransform: [
					{
						test: /a/,
						transform: () => "X",
					},
					{
						test: /b/,
						transform: () => "Y",
					},
				],
			};
			describe("Special transformation should apply", () => {
				it("a", () =>
					expect(transform({ string: "a" }, options)).toBe("X"));
				it("b", () =>
					expect(transform({ string: "b" }, options)).toBe("Y"));
				it("ab", () =>
					expect(transform({ string: "ab" }, options)).toBe("X"));
				it("fffa", () =>
					expect(transform({ string: "fffa" }, options)).toBe("X"));
				it("fffb", () =>
					expect(transform({ string: "fffb" }, options)).toBe("Y"));
			});
			describe("Special transformation should not apply", () => {
				it("c", () => {
					const transformRes = transform({ string: "c" }, options);
					expect(transformRes).toBe(vanilla("c"));
				});
			});
		});
		describe("truncation", () => {
			const optionsAll: Partial<Options> = {
				truncate: 10,
			};
			const optionsConditional: Partial<Options> = {
				truncate: (string) =>
					string.startsWith("abc") ? 10 : Infinity,
			};

			describe("truncation options / all", () => {
				it("Should truncate", () => {
					const transformRes = transform(
						{ string: "aaaaaaaaaaaaaaaaaaaaaaaaaa" },
						optionsAll
					);
					expect(transformRes).not.toBe(
						vanilla("aaaaaaaaaaaaaaaaaaaaaaaaaa")
					);
					expect(transformRes.indexOf("…")).toBeGreaterThan(10);
				});
				it("should not truncate", () => {
					const transformRes = transform(
						{ string: "aaaaaaaaa" },
						optionsAll
					);
					expect(transformRes).toBe(vanilla("aaaaaaaaa"));
					expect(transformRes.indexOf("…")).toBe(-1);
				});
			});

			describe("truncation options / conditional", () => {
				it("Should truncate / starts with abc", () => {
					const transformRes = transform(
						{ string: "abc1234567890abc" },
						optionsConditional
					);
					expect(transformRes).not.toBe(vanilla("abc1234567890abc"));
					expect(transformRes.indexOf("abc1234567…")).toBeGreaterThan(
						-1
					);
				});
				it("should not truncate / does not start with abc", () => {
					const transformRes = transform(
						{ string: "1234567890abcabc" },
						optionsConditional
					);
					expect(transformRes).toBe(vanilla("1234567890abcabc"));
					expect(transformRes.indexOf("…")).toBe(-1);
				});
				it("should not truncate / less than specified length", () => {
					const transformRes = transform(
						{ string: "abc12" },
						optionsConditional
					);
					expect(transformRes).toBe(vanilla("abc12"));
					expect(transformRes.indexOf("…")).toBe(-1);
				});
			});
		});
		describe("middle truncation", () => {
			const optionsAll: Partial<Options> = {
				truncate: 6,
				middleTruncation: true,
			};
			const optionsConditional: Partial<Options> = {
				truncate: 6,
				middleTruncation: (string) => string.startsWith("aaa"),
			};

			describe("middle truncation options / all", () => {
				it("Should be middle", () => {
					const transformRes = transform(
						{ string: "aaaaaaaaaa" },
						optionsAll
					);
					expect(transformRes).not.toBe(vanilla("aaaaaaaaaa"));
					expect(transformRes.indexOf("aa…aa")).toBeGreaterThan(-1);
				});
			});

			describe("middle truncation options / conditional", () => {
				it("Should be middle / starts with aaa", () => {
					const transformRes = transform(
						{ string: "aaaaaaaaa" },
						optionsConditional
					);
					expect(transformRes).not.toBe(vanilla("aaaaaaaaaa"));
					expect(transformRes.indexOf("aa…aa")).toBeGreaterThan(-1);
				});
				it("should not be middle / does not start with aaa", () => {
					const transformRes = transform(
						{ string: "0aaaaaaaaaaaa" },
						optionsConditional
					);
					expect(transformRes.indexOf("aa…aa")).toBe(-1);
				});
			});
		});
		describe("exclusion", () => {
			const optionsAllTrue: Partial<Options> = {
				exclude: true,
			};
			const optionsAllFalse: Partial<Options> = {
				exclude: false,
			};
			const optionsConditional: Partial<Options> = {
				exclude: (string) => (string.startsWith("a") ? true : false),
			};

			describe("exclusion options / all", () => {
				it("Should exclude everything", () => {
					const transformRes = transform(
						{ string: "aaaa" },
						optionsAllTrue
					);
					expect(transformRes).toBe("aaaa");
				});
				it("Should exclude nothing", () => {
					const transformRes = transform(
						{ string: "aaaa" },
						optionsAllFalse
					);
					expect(transformRes).toBe(vanilla("aaaa"));
				});
			});

			describe("exclusion options / conditional", () => {
				it("Should exclude / starts with a", () => {
					const transformRes = transform(
						{ string: "abc1234567890abc" },
						optionsConditional
					);
					expect(transformRes).toBe("abc1234567890abc");
				});
				it("should not exclude / does not start a", () => {
					const transformRes = transform(
						{ string: "bc1234567890abc" },
						optionsConditional
					);
					expect(transformRes).toBe(vanilla("bc1234567890abc"));
				});
			});
		});

		describe("attributes", () => {
			const optionsAll: Partial<Options> = {
				attributes: {
					a: "b",
					x: "y",
				},
			};
			const optionsConditional: Partial<Options> = {
				attributes: (string) =>
					string.startsWith("a")
						? {
								a: "b",
								x: "y",
						  }
						: {},
			};

			describe("attributes options / all", () => {
				it("Should add attributes", () => {
					const transformRes = transform(
						{ string: "link" },
						optionsAll
					);
					expect(transformRes).not.toBe(vanilla("link"));
					expect(transformRes.indexOf(`a="b"`)).toBeGreaterThan(-1);
					expect(transformRes.indexOf(`x="y"`)).toBeGreaterThan(-1);
				});
			});

			describe("attributes options / conditional", () => {
				it("Should add attributes / starts with a", () => {
					const transformRes = transform(
						{ string: "alink" },
						optionsConditional
					);
					expect(transformRes).not.toBe(vanilla("alink"));
					expect(transformRes.indexOf(`a="b"`)).toBeGreaterThan(-1);
					expect(transformRes.indexOf(`x="y"`)).toBeGreaterThan(-1);
				});
				it("should not add attributes / does not start a", () => {
					const transformRes = transform(
						{ string: "link" },
						optionsConditional
					);
					expect(transformRes).toBe(vanilla("link"));
					expect(transformRes.indexOf(`a="b"`)).toBe(-1);
					expect(transformRes.indexOf(`x="y"`)).toBe(-1);
				});
			});
		});
	});
});
