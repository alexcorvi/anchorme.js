import anchorme from "../../dist/node";
import * as expect from "expect";

describe("Basic testing", () => {
	describe("Library loaded properly", () => {
		it("Type of default export is a function", () => {
			expect(typeof anchorme).toBe("function");
		});
		it("Utility function: validate is present / url", () => {
			expect(typeof anchorme.validate.url).toBe("function");
		});
		it("Utility function: validate is present / email", () => {
			expect(typeof anchorme.validate.email).toBe("function");
		});
		it("Utility function: validate is present / ip", () => {
			expect(typeof anchorme.validate.ip).toBe("function");
		});
		it("Utility function: validate is present / file", () => {
			expect(typeof anchorme.validate.file).toBe("function");
		});
		it("Utility function: list is present", () => {
			expect(typeof anchorme.list).toBe("function");
		});
	});

	describe("Basic usage of the library", () => {
		describe("Argument types", () => {
			it("library can accept just a string", () => {
				expect(anchorme("string")).toEqual("string");
			});
			it("library can accept an object", () => {
				expect(anchorme({ input: "string" })).toEqual("string");
			});
			it("Both of the argument have the same result", () => {
				expect(anchorme("string")).toEqual(
					anchorme({ input: "string" })
				);
			});
		});

		describe("Basic transformation", () => {
			describe("pure URL string", () => {
				it("Transformation of a URL", () => {
					expect(anchorme("www.google.com")).not.toBe(
						"www.google.com"
					);
					expect(anchorme("www.google.com")).toBe(
						`<a href="http://www.google.com">www.google.com</a>`
					);
				});
				it("Transformation of an email", () => {
					expect(anchorme("alex@arrayy.com")).not.toBe(
						"alex@arrayy.com"
					);
					expect(anchorme("alex@arrayy.com")).toBe(
						`<a href="mailto:alex@arrayy.com">alex@arrayy.com</a>`
					);
				});
				it("Transformation of a file", () => {
					expect(
						anchorme("file:///C:/Users/alias/file.zip")
					).not.toBe("file:///C:/Users/alias/file.zip");
					expect(anchorme("file:///C:/Users/alias/file.zip")).toBe(
						`<a href="file:///C:/Users/alias/file.zip">file:///C:/Users/alias/file.zip</a>`
					);
				});
				it("Transformation of an ip", () => {
					expect(anchorme("192.168.0.1/admin_panel")).not.toBe(
						"192.168.0.1/admin_panel"
					);
					expect(anchorme("192.168.0.1/admin_panel")).toBe(
						`<a href="http://192.168.0.1/admin_panel">192.168.0.1/admin_panel</a>`
					);
				});
			});

			describe("polluted URL string", () => {
				function pollute(string: string) {
					return `pollution starts:${string}, pollution ends`;
				}
				it("Transformation of a URL", () => {
					expect(anchorme(pollute("www.google.com"))).not.toBe(
						pollute("www.google.com")
					);
					expect(anchorme(pollute("www.google.com"))).toBe(
						pollute(
							`<a href="http://www.google.com">www.google.com</a>`
						)
					);
				});
				it("Transformation of an email", () => {
					expect(anchorme(pollute("alex@arrayy.com"))).not.toBe(
						pollute("alex@arrayy.com")
					);
					expect(anchorme(pollute("alex@arrayy.com"))).toBe(
						pollute(
							`<a href="mailto:alex@arrayy.com">alex@arrayy.com</a>`
						)
					);
				});
				it("Transformation of a file", () => {
					expect(
						anchorme(pollute("file:///C:/Users/alias/file.zip"))
					).not.toBe(pollute("file:///C:/Users/alias/file.zip"));
					expect(
						anchorme(pollute("file:///C:/Users/alias/file.zip"))
					).toBe(
						pollute(
							`<a href="file:///C:/Users/alias/file.zip">file:///C:/Users/alias/file.zip</a>`
						)
					);
				});
				it("Transformation of an ip", () => {
					expect(
						anchorme(pollute("192.168.0.1/admin_panel"))
					).not.toBe(pollute("192.168.0.1/admin_panel"));
					expect(anchorme(pollute("192.168.0.1/admin_panel"))).toBe(
						pollute(
							`<a href="http://192.168.0.1/admin_panel">192.168.0.1/admin_panel</a>`
						)
					);
				});
			});
		});
	});

	describe("Basic usage of the library utility functions", () => {
		describe("Validation functions", () => {
			const examples = {
				urls: {
					valid: [
						"http://www.google.com",
						"google.com",
						"123.12.1.1/something",
						"https://admin.landing.test",
						"https://2001:0db8:85a3:0000:0000:8a2e:0370:7334/sdsd",
					],
					invalid: [
						"http:github.com",
						"http:something.invalidTld",
						"1119.23131.32131.3222/something",
						"400.211.1.32/something",
						"a.b@something.com",
					],
				},
				emails: {
					valid: ["ali@gmail.com", "fake@some-thing.com"],
					invalid: [
						"foobar@dk",
						"ali@ gmail.com",
						"in..valid@example.com",
						"#@%^%#$@#$@#.com",
						"@example.com",
						"Joe Smith <email@example.com>",
						"email.example.com",
						"email@example@example.com",
						".email@example.com",
						"email.@example.com",
						"email..email@example.com",
						"あいうえお@example.com",
						"email@example.com (Joe Smith)",
						"email@example",
						"email@-example.com",
						"email@example.web",
						"email@111.222.333.44444",
						"email@example..com",
						"Abc..123@example.com",
					],
				},
				files: {
					valid: ["file:///c:/something/somefile.zip"],
					invalid: ["file://c:/something.zip"],
				},
			};

			describe("URLs", () => {
				describe("valid URLs", () => {
					for (
						let index = 0;
						index < examples.urls.valid.length;
						index++
					) {
						const element = examples.urls.valid[index];
						it(`Should be valid ${element}`, () => {
							expect(anchorme.validate.url(element)).toBe(true);
						});
					}
				});
				describe("invalid URLs", () => {
					for (
						let index = 0;
						index < examples.urls.invalid.length;
						index++
					) {
						const element = examples.urls.invalid[index];
						it(`Should be invalid ${element}`, () => {
							expect(anchorme.validate.url(element)).toBe(false);
						});
					}
				});
			});

			describe("Emails", () => {
				describe("valid emails", () => {
					for (
						let index = 0;
						index < examples.emails.valid.length;
						index++
					) {
						const element = examples.emails.valid[index];
						it(`Should be valid ${element}`, () => {
							expect(anchorme.validate.email(element)).toBe(true);
						});
					}
				});
				describe("invalid emails", () => {
					for (
						let index = 0;
						index < examples.emails.invalid.length;
						index++
					) {
						const element = examples.emails.invalid[index];
						it(`Should be invalid ${element}`, () => {
							expect(anchorme.validate.email(element)).toBe(
								false
							);
						});
					}
				});
			});

			describe("Files", () => {
				describe("valid files", () => {
					for (
						let index = 0;
						index < examples.files.valid.length;
						index++
					) {
						const element = examples.files.valid[index];
						it(`Should be valid ${element}`, () => {
							expect(anchorme.validate.file(element)).toBe(true);
						});
					}
				});
				describe("invalid files", () => {
					for (
						let index = 0;
						index < examples.files.invalid.length;
						index++
					) {
						const element = examples.files.invalid[index];
						it(`Should be invalid ${element}`, () => {
							expect(anchorme.validate.file(element)).toBe(false);
						});
					}
				});
			});
		});
	});
});
