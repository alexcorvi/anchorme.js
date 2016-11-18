const assert = require('assert');
const path = require("path");
const anchorme = require(path.join(process.cwd(),"dist","anchorme.js"));
const Bench = require(path.join(process.cwd(),"test","bench","index.js"));

describe('Basic Tests', function () {
	describe('Emails', function () {
		describe('Valid emails return true', function () {
			it('alex@gmail.com', function () {
				assert.ok(anchorme.validate.email("alex@gmail.com"));
			});
			it('alex@gmail.co.uk', function () {
				assert.ok(anchorme.validate.email("alex@gmail.co.uk"));
			});
			it('alex@gmail.co', function () {
				assert.ok(anchorme.validate.email("alex@gmail.co"));
			});
			it('alex.corvi@gmail.net', function () {
				assert.ok(anchorme.validate.email("alex.corvi@gmail.net"));
			});
			it('alex-s@gmail.com', function () {
				assert.ok(anchorme.validate.email("alex-s@gmail.com"));
			});
		});
		describe('Non email return false', function () {
			it('alex@gmail.nonvalidtld',() =>assert.equal(anchorme.validate.email("alex@gmail.nonvalidtld"),false));
			it('alexis.@6@gmail.com',() =>assert.equal(anchorme.validate.email("alexis.@6@gmail.com"),false));
			it('alexi\/\/\/\/\s.@6@gmail.com',() =>assert.equal(anchorme.validate.email("alexi\/\/\/\/\s.@6@gmail.com"),false));
		});
	});
	describe('ports', function () {
		describe('Valid IPs return true', function () {
			it('1.2.3.4',()=>assert.ok(anchorme.validate.ip("1.2.3.4")));
			it('1.2.3.4:3',()=>assert.ok(anchorme.validate.ip("1.2.3.4:3")));
			it('1.2.3.4:3/route',()=>assert.ok(anchorme.validate.ip("1.2.3.4:3/route")));
			it('1.2.3.4:3/route:47',()=>assert.ok(anchorme.validate.ip("1.2.3.4:3/route:47")));
			it('1.2.3.4/route:47',()=>assert.ok(anchorme.validate.ip("1.2.3.4/route:47")));
		});
		describe('Non valid IPs return false', function () {
			it('500.3.3.5',()=>assert.equal(anchorme.validate.ip("500.3.3.5"),false));
			it('1.2.2.500',()=>assert.equal(anchorme.validate.ip("1.2.2.500"),false));
			it('1.2.3.4....b',()=>assert.equal(anchorme.validate.ip("1.2.3.4....b"),false));
			it('6.7.8.9:abc/dsada',()=>assert.equal(anchorme.validate.ip("6.7.8.9:abc/dsada"),false));
			it('6.7.8.9:/dsada',()=>assert.equal(anchorme.validate.ip("6.7.8.9:/dsada"),false));
		});
	});

	describe('domain URLs', function () {
		describe('Valid URLs return true', function () {
			it('www.google.com',()=>assert.ok(anchorme.validate.url("www.google.com")));
			it('www.google.com?',()=>assert.ok(anchorme.validate.url("www.google.com?")));
			it('www.facebook.com.',()=>assert.ok(anchorme.validate.url("www.facebook.com.")));
			it('www.google.co.uk',()=>assert.ok(anchorme.validate.url("www.google.co.uk")));
			it('www.google.com/route/',()=>assert.ok(anchorme.validate.url("www.google.com/route/")));
			it('www.google.com:458/route',()=>assert.ok(anchorme.validate.url("www.google.com:458/route")));
		});
		describe('Non valid URLs return false', function () {
			it('www.google.nonvalidtld',()=>assert.equal(anchorme.validate.url("www.google.nonvalidtld"),false));
			it('www.goog?le.com?',()=>assert.equal(anchorme.validate.url("www.goog?le.com?"),false));
		});
	});
});