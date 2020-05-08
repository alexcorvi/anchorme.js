import anchorme from "../../dist/node";
import * as expect from "expect";

const polluting = [
	(string: string) => `pollution:${string}, pollution ends`,
	(string: string) => `pollution: ${string} , pollution ends`,
	(string: string) => `pollution ${string},, pollution ends`,
	(string: string) => `pollution ${string}; pollution ends`,
	(string: string) => `pollution ${string}. pollution ends`,
];

const insideParenthesis = `()|[]|""|''|<>|{}`
	.split("|")
	.map((x) => (string: string) => `${x[0]}${string}${x[1]}`);

const surroundedWithPunctuation = `’':,!.«»?‘’“”&*`
	.split("")
	.map((x) => (string: string) => `${x}${string}${x}`);

const endsWithParenthesis = `()|[]|""|''`
	.split("|")
	.map((x) => (string: string) => `${string}/a_${x[0]}b${x[1]}`);

const AddingNonEnglishAlphabets = [
	(string: string) => `${string}/რომის`,
	(string: string) => `${string}/რომgmის`,
	(string: string) => `${string}/gmრომgmის`,
	(string: string) => `${string}/gmრომgmისgm`,
	(string: string) => `${string}/რომის_პაპი`,
	(string: string) => `${string}/რომის_პაპიabc`,
	(string: string) => `${string}/abcრომის_პაპი`,
	(string: string) => `${string}/რომის_პაპი/`,
	(string: string) => `${string}/რ/რ/რ`,
	(string: string) => `${string}/რ_(რ)`,
];

function putInsideHTMLAttribute(string: string) {
	return `<img src="${string}">`;
}

function putInsideHTMLAnchor(string: string) {
	return `<a href="${string}">${string}</a><a href="${string}">${string}</a><a href="${string}">${string}</a>`;
}

describe("Edge cases testing", () => {
	describe("having the path as a question mark query", () => {
		const str = "Wordpress.com?p=1263X";

		it("not found when inside HTML attr", () => {
			expect(anchorme.list(putInsideHTMLAttribute(str)).length).toBe(0);
		});

		it("not found when already an anchor", () => {
			expect(anchorme.list(putInsideHTMLAnchor(str)).length).toBe(0);
		});

		describe("Plain", () => {
			const plain = anchorme.list(str);
			it("Should be found", () => {
				expect(plain.length).toBe(1);
			});
			it("should start where the W is", () => {
				expect(plain[0].start).toBe(str.indexOf("W"));
			});
			it("should end where the X is", () => {
				expect(plain[0].end - 1).toBe(str.indexOf("X"));
			});
		});

		describe("Polluted", () => {
			polluting.forEach((func) => {
				const polluted = func(str);
				const res = anchorme.list(polluted);
				describe(polluted, () => {
					it("Should be found", () => {
						expect(res.length).toBe(1);
					});
					it("should start where the W is", () => {
						expect(res[0].start).toBe(polluted.indexOf("W"));
					});
					it("should end where the X is", () => {
						expect(res[0].end - 1).toBe(polluted.indexOf("X"));
					});
				});
			});
		});

		describe("Inside Parenthesis", () => {
			insideParenthesis.forEach((func) => {
				const inside = func(str);
				const res = anchorme.list(inside);
				describe(inside, () => {
					it("Should be found", () => {
						expect(res.length).toBe(1);
					});
					it("should start where the W is", () => {
						expect(res[0].start).toBe(inside.indexOf("W"));
					});
					it("should end where the X is", () => {
						expect(res[0].end - 1).toBe(inside.indexOf("X"));
					});
				});
			});
		});

		describe("Inside Parenthesis and polluted", () => {
			insideParenthesis.forEach((pa) => {
				polluting.forEach((po) => {
					const insideParen = pa(str);
					const pollutedAndInside = po(insideParen);
					const res = anchorme.list(pollutedAndInside);
					describe(pollutedAndInside, () => {
						it("Should be found", () => {
							expect(res.length).toBe(1);
						});
						it("should start where the W is", () => {
							expect(res[0].start).toBe(
								pollutedAndInside.indexOf("W")
							);
						});
						it("should end where the X is", () => {
							expect(res[0].end - 1).toBe(
								pollutedAndInside.indexOf("X")
							);
						});
					});
				});
			});
		});

		describe("Inside Parenthesis and polluted and ending with parenthesis", () => {
			insideParenthesis.forEach((inside) => {
				polluting.forEach((pollute) => {
					endsWithParenthesis.forEach((end) => {
						let sameParen = false;
						const endsWithParenthesis = end(str);
						const endingChar = endsWithParenthesis.charAt(
							endsWithParenthesis.length - 1
						);
						const insideAndEndsWith = inside(endsWithParenthesis);
						const pollutedAndInsideAndEnding = pollute(
							insideAndEndsWith
						);

						if (
							endsWithParenthesis.charAt(
								endsWithParenthesis.length - 1
							) ===
							insideAndEndsWith.charAt(
								insideAndEndsWith.length - 1
							)
						) {
							sameParen = true;
						}

						const res = anchorme.list(pollutedAndInsideAndEnding);

						describe(pollutedAndInsideAndEnding, () => {
							it("Should be found", () => {
								expect(res.length).toBe(1);
							});
							it("should start where the W is", () => {
								expect(res[0].start).toBe(
									pollutedAndInsideAndEnding.indexOf("W")
								);
							});
							it(
								"should end where the " + endingChar + " is",
								() => {
									expect(res[0].end - 1).toBe(
										sameParen
											? pollutedAndInsideAndEnding.lastIndexOf(
													endingChar
											  ) - 1
											: pollutedAndInsideAndEnding.lastIndexOf(
													endingChar
											  )
									);
								}
							);
						});
					});
				});
			});
		});

		describe("Surrounded with punctuation", () => {
			surroundedWithPunctuation.forEach((func) => {
				const surrounded = func(str);
				const res = anchorme.list(surrounded);
				describe(surrounded, () => {
					it("Should be found", () => {
						expect(res.length).toBe(1);
					});
					it("should start where the W is", () => {
						expect(res[0].start).toBe(surrounded.indexOf("W"));
					});
					it("should end where the X is", () => {
						expect(res[0].end - 1).toBe(surrounded.indexOf("X"));
					});
				});
			});
		});

		describe("Ends with parenthesis", () => {
			endsWithParenthesis.forEach((func) => {
				const endsWithParenthesis = func(str);
				const closingChar = endsWithParenthesis.charAt(
					endsWithParenthesis.length - 1
				);
				const res = anchorme.list(endsWithParenthesis);
				describe(endsWithParenthesis + " " + res[0].string, () => {
					it("Should be found", () => {
						expect(res.length).toBe(1);
					});
					it("should start where the W is", () => {
						expect(res[0].start).toBe(
							endsWithParenthesis.indexOf("W")
						);
					});
					it("should end where the X is", () => {
						expect(res[0].end - 1).toBe(
							endsWithParenthesis.lastIndexOf(closingChar)
						);
					});
				});
			});
		});

		describe("Non english alphabets added", () => {
			AddingNonEnglishAlphabets.forEach((func) => {
				const withNonEnglish = func(str);
				const closingChar = withNonEnglish.charAt(
					withNonEnglish.length - 1
				);
				const res = anchorme.list(withNonEnglish);
				describe(withNonEnglish + " " + res[0].string, () => {
					it("Should be found", () => {
						expect(res.length).toBe(1);
					});
					it("should start where the W is", () => {
						expect(res[0].start).toBe(withNonEnglish.indexOf("W"));
					});
					it("should end where the X is", () => {
						expect(res[0].end - 1).toBe(
							withNonEnglish.lastIndexOf(closingChar)
						);
					});
				});
			});
		});
	});

	describe("having the email local address as a valid domain name", () => {
		const str = `me.com@gmail.com`;
		polluting.forEach((p) => {
			it(str + " (polluted)", () => {
				expect(anchorme(p(str))).toBe(
					p(`<a href="mailto:${str}">${str}</a>`)
				);
			});
		});
	});

	describe("Having the link already inside an anchor tag", () => {
		const email = "mailto:alex@yahoo.com";
		const url = "http://127.2.2.1/query";
		describe("Should be found when not in query", () => {
			polluting.forEach((p) => {
				const pollutedEmail = p(email);
				const pollutedURL = p(url);
				it(pollutedEmail, () => {
					expect(anchorme.list(pollutedEmail).length).toBe(1);
				});
				it(pollutedURL, () => {
					expect(anchorme.list(pollutedURL).length).toBe(1);
				});
			});
		});

		describe("Should not be found when not in query", () => {
			const insideAnchorEmail = putInsideHTMLAnchor(email);
			const insideAnchorURL = putInsideHTMLAnchor(url);
			it(email, () => {
				expect(anchorme.list(insideAnchorEmail).length).toBe(0);
			});
			it(url, () => {
				expect(anchorme.list(insideAnchorURL).length).toBe(0);
			});
		});
	});

	describe("Invalid TLDs", () => {
		const link = `www.usinginvalidtld.inherE`;
		describe("Are invalid when not using protocol", () => {
			polluting.forEach((po) => {
				AddingNonEnglishAlphabets.forEach((nonEn) => {
					const polluted = po(link);
					const nonEnglish = nonEn(link);
					const nonEnglishAndPolluted = po(nonEnglish);

					it(link, () => {
						expect(anchorme.list(link).length).toBe(0);
					});

					it(nonEnglish, () => {
						expect(anchorme.list(nonEnglish).length).toBe(0);
					});

					it(polluted, () => {
						expect(anchorme.list(polluted).length).toBe(0);
					});

					it(nonEnglishAndPolluted, () => {
						expect(
							anchorme.list(nonEnglishAndPolluted).length
						).toBe(0);
					});
				});
			});
		});

		describe("Are valid when using protocol", () => {
			polluting.forEach((po) => {
				AddingNonEnglishAlphabets.forEach((nonEn) => {
					const withProtocol = "Http://" + link;
					const polluted = po(withProtocol);
					const nonEnglish = nonEn(withProtocol);
					const nonEnglishAndPolluted = po(nonEnglish);
					const lastChar = nonEnglish.charAt(nonEnglish.length - 1);

					it(withProtocol, () => {
						const res = anchorme.list(withProtocol);
						expect(res.length).toBe(1);
						expect(res[0].start).toBe(withProtocol.indexOf("H"));
						expect(res[0].end - 1).toBe(
							withProtocol.lastIndexOf("E")
						);
					});

					it(polluted, () => {
						const res = anchorme.list(polluted);
						expect(res.length).toBe(1);
						expect(res[0].start).toBe(polluted.indexOf("H"));
						expect(res[0].end - 1).toBe(polluted.lastIndexOf("E"));
					});

					it(nonEnglish, () => {
						const res = anchorme.list(nonEnglish);
						expect(res.length).toBe(1);
						expect(res[0].start).toBe(nonEnglish.indexOf("H"));
						expect(res[0].end - 1).toBe(
							nonEnglish.lastIndexOf(lastChar)
						);
					});

					it(nonEnglishAndPolluted, () => {
						const res = anchorme.list(nonEnglishAndPolluted);
						expect(res.length).toBe(1);
						expect(res[0].start).toBe(
							nonEnglishAndPolluted.indexOf("H")
						);
						expect(res[0].end - 1).toBe(
							nonEnglishAndPolluted.lastIndexOf(lastChar)
						);
					});
				});
			});
		});
	});

	describe("Edge domain names", () => {
		const edgeDomainNames = {
			valid: [
				"Agoogle.com:9000",
				"192.168.0.1:9000",
				"Akyong123.com",
				"Akyong-info.com",
				"Ansub.mkyong-info.com",
				"Akyong.com.au",
				"A.com",
				"Akyong.t.t.co",
				"Aomain.com",
				"Axample.domain.com",
				"Axample.domain-hyphen.com.au",
				"Aww.domain.com",
				"Axample.museum",
				"Aww.google.com",
				"Aoogle.com",
				"Akyong123.com",
				"Akyong-info.com",
				"Aub.mkyong.com",
				"Aub.mkyong-info.com",
				"Akyong.com.au",
				"A.co",
				"Akyong.t.t.co",
			],
			invalid: [
				"mkyong,com",
				"google",
				"mkyong",
				"mkyong.123",
				".com",
				"mkyong-.com",
				"sub.mkyong-.com",
				"ab:3000",
			],
		};

		describe("Valid domain names", () => {
			edgeDomainNames.valid
				.map((x) => x + "/some-patH")
				.forEach((validURL) => {
					it(validURL + " should be valid", () => {
						expect(anchorme(validURL)).toBe(
							`<a href="http://${validURL}">${validURL}</a>`
						);
					});
					polluting.forEach((po) => {
						const polluted = po(validURL);
						it(polluted + " should be valid", () => {
							expect(anchorme(polluted)).toBe(
								po(
									`<a href="http://${validURL}">${validURL}</a>`
								)
							);
						});
					});
				});
		});

		describe("invalid domain names", () => {
			edgeDomainNames.invalid
				.map((x) => x + "/some-patH")
				.forEach((invalidURL) => {
					it(invalidURL + " should be invalid", () => {
						expect(anchorme(invalidURL)).toBe(invalidURL);
					});
				});
		});
	});

	describe("Non english alphabets", () => {
		const base = "wikipedia.com";
		AddingNonEnglishAlphabets.forEach((addingFunc) => {
			const nonEnglishAdded = addingFunc(base);
			polluting.forEach((p) => {
				const polluted = p(nonEnglishAdded);
				it(polluted, () => {
					expect(anchorme(polluted)).toBe(
						p(
							`<a href="http://${nonEnglishAdded}">${nonEnglishAdded}</a>`
						)
					);
				});
			});
		});
	});

	describe("Emoji links", () => {
		const links = [
			"http://🐌🍏⌚✨😐😍🐸🍑.🍕💩.ws",
			"http://🐌🍏⌚✨😐😍🐸🍑.🍕💩.ws/someting",
			"https://🐌🍏⌚✨😐😍🐸🍑.🍕💩.ws",
			"https://🐌🍏⌚✨😐😍🐸🍑.🍕💩.ws/someting/",
		];

		links.forEach((x) => {
			polluting.forEach((p) => {
				it(p(x), () => {
					expect(anchorme(p(x))).toBe(p(`<a href="${x}">${x}</a>`));
				});
			});
		});
	});

	describe("HTML links", () => {
		const strings = [
			`<img src='http://dummyimage.com/50'>`,
			`<img src='http://dummyimage.com/50'> google.com`,
			`google.com <a href='http://dummyimage.com/50/a'></a> google.com`,
			`google.com <form formaction='http://dummyimage.com/50/a'></form> google.com google.com`,
		];

		strings.forEach((string, index) => {
			polluting.forEach((p) => {
				const target = p(string);
				it(target, () => {
					expect(anchorme.list(target).length).toBe(index);
				});
			});
		});
	});
});
