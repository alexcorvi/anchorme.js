import anchorme from "../../dist/node/index";
import * as expect from "expect";
const input = `Library works with (http://www.google.com) or without (www.google.com) protocols in link. It works well on paths [www.github.io/something/something] and queries <wordpress.com/post.php?p=112> and even when query starts immediately after the TLDS "wordpress.com?p=112". This library does validation against a full IANA list, so for example this link will be detected: 'alex.photography', yet this one will not 'alex.photograph'. Some links might also have ports in them like this one (https://a.co:8999/ab.php?p=12). Some are actually an IP (127.0.0.1/should_(be)_detected, invalid:127.0.0.300/should/not(be)_detected). Local machine names URLs are detected only when preceded by a protocol (https://localhost/abc, ftps://hostname, http://local:123?abc=xyz.)
Links with non-english alphabets are considered as non-valid, yet they are commonly used in chat application and so, so we supported them (to some degree). (examples: ka.wikipedia.org/wiki/მთავარი_გვერდი, ka.wikipedia.org/wiki/ბაქო, ka.wikipedia.org/wiki/2_აპრილი, ka.wikipedia.org/wiki/მერი_(სპილო)). Encoded links works too (example:ka.wikipedia.org/wiki/%E1%83%91, mailto:mail@xn--ngbrx4e.com).
Emails are detected too: (valid: email@ex.com e.mail@ex.com e-mail@ex.com e+mail@ex.com e_mail@example.com 123@ex.com 123.123@ex.com email@sub.domain.com email@ex.co.jp  email@123.123.123.123) (invalid email.@example.web email@example email@example.abcd email@111.222.333.444).
Files (when starting with file:/// protocol) are detected too. (file:///c:/somefile.zip).
Tokenization is as accurate as it can get, you can see from the above text that we've tried almost all common punctuation marks and the library detected links from between them.
Library doesn't break your HTML, so an HTML attribute that has a link in it will not be broken <img src='http://dummyimage.com/30'> or a link that is already inside an attribute, will not be broken (e.g. <a href="https://github.io">https://github.io</a>).`;
const snapshot = [
	"http://www.google.com",
	"www.google.com",
	"www.github.io/something/something",
	"wordpress.com/post.php?p=112",
	"wordpress.com?p=112",
	"alex.photography",
	"https://a.co:8999/ab.php?p=12",
	"127.0.0.1/should_(be)_detected",
	"https://localhost/abc",
	"ftps://hostname",
	"http://local:123?abc=xyz",
	"ka.wikipedia.org/wiki/მთავარი_გვერდი",
	"ka.wikipedia.org/wiki/ბაქო",
	"ka.wikipedia.org/wiki/2_აპრილი",
	"ka.wikipedia.org/wiki/მერი_(სპილო)",
	"ka.wikipedia.org/wiki/%E1%83%91",
	"mailto:mail@xn--ngbrx4e.com",
	"email@ex.com",
	"e.mail@ex.com",
	"e-mail@ex.com",
	"e+mail@ex.com",
	"e_mail@example.com",
	"123@ex.com",
	"123.123@ex.com",
	"email@sub.domain.com",
	"email@ex.co.jp",
	"email@123.123.123.123",
	"file:///c:/somefile.zip",
];
describe("Demo testing: should be the same as snapshot", () => {
	anchorme.list(input).forEach((res, index) => {
		it(res.string, () => {
			expect(res.string).toBe(snapshot[index]);
		});
	});
});

// TODO: update this to the latest demo
