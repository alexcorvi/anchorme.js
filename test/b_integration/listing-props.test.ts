import anchorme from "../../dist/node";
import { ListingProps } from "../../src/types";
import * as expect from "expect";

const URLsTestingSuite: { [key: string]: Partial<ListingProps> } = {
	"http://www.github.com": {
		isURL: true,
		protocol: "http://",
		host: "www.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: undefined,
		query: undefined,
		fragment: undefined,
	},
	"http://www.github.com/something": {
		isURL: true,
		protocol: "http://",
		host: "www.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/something",
		query: undefined,
		fragment: undefined,
	},
	"https://youtube.com": {
		isURL: true,
		protocol: "https://",
		host: "youtube.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: undefined,
		query: undefined,
		fragment: undefined,
	},
	"http://www.github.com/a/path": {
		isURL: true,
		protocol: "http://",
		host: "www.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/a/path",
		query: undefined,
		fragment: undefined,
	},
	"http://www.github.com/a/path/with?query=12345#and_fragment": {
		isURL: true,
		protocol: "http://",
		host: "www.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/a/path/with",
		query: "query=12345",
		fragment: "and_fragment",
	},
	"https://www.github.com/a/path/with?query=12345#and_fragment": {
		isURL: true,
		protocol: "https://",
		host: "www.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/a/path/with",
		query: "query=12345",
		fragment: "and_fragment",
	},
	"some.photography/a/path": {
		isURL: true,
		protocol: undefined,
		host: "some.photography",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/a/path",
		query: undefined,
		fragment: undefined,
	},
	"few.sub.domains.github.com?a=xyz": {
		isURL: true,
		protocol: undefined,
		host: "few.sub.domains.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: undefined,
		query: "a=xyz",
		fragment: undefined,
	},
	"few.sub.domains.github.com?a=xyz&b=xyz#!something": {
		isURL: true,
		protocol: undefined,
		host: "few.sub.domains.github.com",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: undefined,
		query: "a=xyz&b=xyz",
		fragment: "!something",
	},
	"127.0.0.1?a=xyz&b=xyz#!bang": {
		isURL: true,
		protocol: undefined,
		host: "127.0.0.1",
		port: undefined,
		ipv4: "127.0.0.1",
		ipv6: undefined,
		confirmedByProtocol: false,
		path: undefined,
		query: "a=xyz&b=xyz",
		fragment: "!bang",
	},
	"http://[2a00:1450:4025:401::67]/some/path/goes/here?abc=xyz#!title_fragment": {
		isURL: true,
		protocol: "http://",
		host: "[2a00:1450:4025:401::67]",
		port: undefined,
		ipv4: undefined,
		ipv6: "2a00:1450:4025:401::67",
		confirmedByProtocol: true,
		path: "/some/path/goes/here",
	},
	"http://[2a00:1450:4025:401::67]?abc=xyz#!title": {
		isURL: true,
		protocol: "http://",
		port: undefined,
		ipv4: undefined,
		confirmedByProtocol: true,
		path: undefined,
	},
	"127.0.0.1:3004?a=xyz": {
		isURL: true,
		protocol: undefined,
		host: "127.0.0.1",
		port: "3004",
		ipv4: "127.0.0.1",
		ipv6: undefined,
		confirmedByProtocol: false,
		path: undefined,
		query: "a=xyz",
		fragment: undefined,
	},
	"http://127.0.0.1:3004/a/b/c/d?q=1&a=2#title": {
		isURL: true,
		protocol: "http://",
		host: "127.0.0.1",
		port: "3004",
		ipv4: "127.0.0.1",
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/a/b/c/d",
		query: "q=1&a=2",
		fragment: "title",
	},
	"127.0.0.1:3004/a/b/c/d#title": {
		isURL: true,
		protocol: undefined,
		host: "127.0.0.1",
		port: "3004",
		ipv4: "127.0.0.1",
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/a/b/c/d",
		query: undefined,
		fragment: "title",
	},
	"https://🐌🍏⌚✨😐😍🐸🍑.🍕💩.ws/someting/": {
		isURL: true,
		protocol: "https://",
		host: undefined,
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/someting/",
		query: undefined,
		fragment: undefined,
	},
	"ka.wikipedia.org/wiki/მთავარი_გვერდი": {
		isURL: true,
		protocol: undefined,
		host: "ka.wikipedia.org",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/wiki/მთავარი_გვერდი",
		query: undefined,
		fragment: undefined,
	},
	"ka.wikipedia.org:3000/wiki/მთავარი_გვერდი?abc=12#bang": {
		isURL: true,
		protocol: undefined,
		host: "ka.wikipedia.org",
		port: "3000",
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/wiki/მთავარი_გვერდი",
		query: "abc=12",
		fragment: "bang",
	},
	"127.0.0.1:3000/wiki/მთავარი_გვერდი?abc=12#bang": {
		isURL: true,
		protocol: undefined,
		host: "127.0.0.1",
		port: "3000",
		ipv4: "127.0.0.1",
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/wiki/მთავარი_გვერდი",
		query: "abc=12",
		fragment: "bang",
	},
	"ftps://[2a00:1450:4025:401::67]:3000/wiki/მთავარი_გვერდი?abc=12#bang": {
		isURL: true,
		protocol: "ftps://",
		host: "[2a00:1450:4025:401::67]",
		ipv4: undefined,
		ipv6: "2a00:1450:4025:401::67",
		confirmedByProtocol: true,
		path: "/wiki/მთავარი_გვერდი",
		query: "abc=12",
		fragment: "bang",
	},
	"ftps://ka.wikipedia.org/wiki/მთავარი_გვერდი": {
		isURL: true,
		protocol: "ftps://",
		host: "ka.wikipedia.org",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: "/wiki/მთავარი_გვერდი",
		query: undefined,
		fragment: undefined,
	},
	"https://عرب.com/wiki/მთავარიგვერდი": {
		isURL: true,
		protocol: "https://",
		host: undefined,
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: true,
		path: '/wiki/მთავარიგვერდი',
		query: undefined,
		fragment: undefined,
	},
	"a.org:3000/abc/ი_გგ": {
		isURL: true,
		protocol: undefined,
		host: "a.org",
		port: "3000",
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/abc/ი_გგ",
		query: undefined,
		fragment: undefined,
	},
	"a.org/ი_გგ": {
		isURL: true,
		protocol: undefined,
		host: "a.org",
		port: undefined,
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/ი_გგ",
		query: undefined,
		fragment: undefined,
	},
	"a.org:3000/იგ": {
		isURL: true,
		protocol: undefined,
		host: "a.org",
		port: "3000",
		ipv4: undefined,
		ipv6: undefined,
		confirmedByProtocol: false,
		path: "/იგ",
		query: undefined,
		fragment: undefined,
	},
};

const emailsTestingSuite: { [key: string]: Partial<ListingProps> } = {
	"alex@gmail.com": {
		isEmail: true,
		protocol: undefined,
		local: "alex",
		host: "gmail.com",
	},
	"mailto:e+_mail.me@sub.domain.com": {
		isEmail: true,
		protocol: "mailto:",
		local: "e+_mail.me",
		host: "sub.domain.com",
	},
	"e+_mail.me@sub.domain.com": {
		isEmail: true,
		protocol: undefined,
		local: "e+_mail.me",
		host: "sub.domain.com",
	},
	"emaime@domain.com": {
		isEmail: true,
		protocol: undefined,
		local: "emaime",
		host: "domain.com",
	},
	"fake@some-thing.com": {
		isEmail: true,
		protocol: undefined,
		local: "fake",
		host: "some-thing.com",
	},
	"email@123.123.123.123": {
		isEmail: true,
		protocol: undefined,
		local: "email",
		host: "123.123.123.123",
	},
	"mailto:mail@xn--ngbrx4e.com": {
		isEmail: true,
		protocol: "mailto:",
		local: "mail",
		host: "xn--ngbrx4e.com",
	},
	"mail@xn--ngbrx4e.com": {
		isEmail: true,
		protocol: undefined,
		local: "mail",
		host: "xn--ngbrx4e.com",
	},
	"123.123@ex.com": {
		isEmail: true,
		protocol: undefined,
		local: "123.123",
		host: "ex.com",
	},
	"mailto:e_mail@example.com": {
		isEmail: true,
		protocol: "mailto:",
		local: "e_mail",
		host: "example.com",
	},
};

const filesTestingSuite: { [key: string]: Partial<ListingProps> } = {
	"file:///some/dir/file.zip": {
		protocol: "file:///",
		isFile: true,
		filename: "file.zip",
		filePath: "some/dir/file.zip",
		fileDirectory: "some/dir/",
	},
	"file:///c:/dir/file.zip": {
		protocol: "file:///",
		isFile: true,
		filename: "file.zip",
		filePath: "c:/dir/file.zip",
		fileDirectory: "c:/dir/",
	},
	"file:///c:/dir/file": {
		protocol: "file:///",
		isFile: true,
		filename: "file",
		filePath: "c:/dir/file",
		fileDirectory: "c:/dir/",
	},
	"file:///c://dir/file": {
		protocol: "file:///",
		isFile: true,
		filename: "file",
		filePath: "c://dir/file",
		fileDirectory: "c://dir/",
	},
	"file:///file.pdf": {
		protocol: "file:///",
		isFile: true,
		filename: "file.pdf",
		filePath: "file.pdf",
		fileDirectory: "",
	},
	"file:///file": {
		protocol: "file:///",
		isFile: true,
		filename: "file",
		filePath: "file",
		fileDirectory: "",
	},
	"file:///C:\\Users\\alias\\Pictures\\image.jpeg": {
		protocol: "file:///",
		isFile: true,
		filename: "image.jpeg",
		filePath: "C:\\Users\\alias\\Pictures\\image.jpeg",
		fileDirectory: "C:\\Users\\alias\\Pictures\\",
	},
};

describe("Listing props", () => {
	function testSuite(
		title: string,
		suite: { [key: string]: Partial<ListingProps> }
	) {
		describe(title, () => {
			const arrOfStrings = Object.keys(suite);
			arrOfStrings.forEach((url) => {
				describe(`Testing listing props for "${url}"`, () => {
					const res = anchorme.list(url)[0];
					const props = Object.keys((suite as any)[url]);
					props.forEach((prop) => {
						it(`URL matches: ${url}`, ()=>{
							expect(res).not.toBe(undefined);
						});
						if(res === undefined) {
							return;
						}
						it(`Testing prop: ${prop} / received "${
							(res as any)[prop]
						}" / expecting ${(suite as any)[url][prop]}`, () => {
							expect((res as any)[prop]).toBe(
								(suite as any)[url][prop]
							);
						});
					});
				});
			});
		});
	}

	testSuite("Testing URLS Props", URLsTestingSuite);
	testSuite("Testing Email Props", emailsTestingSuite);
	testSuite("Testing File Props", filesTestingSuite);
});
