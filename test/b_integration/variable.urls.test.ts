import anchorme from "../../dist/node/index";
import * as expect from "expect";

const input = ['example.net',
'sub.example.com/path/to/resource',
'example.com.net/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path',
'ex-amp-le.com.net/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path',
'1ex-amp-le.com.net/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path',
'1ex-amp-le.com.net:4221/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path',
'example.com.net.argvb/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path',
'example.com/path/to/resource#section1',
'example.xn--p1ai/path/to/resource#section1',
'example.xn--p1ai:12345/path/to/resource#section1',
'https://username:password@example.com/path/to/resource',
'example.com:8080/path/to/resource',
'192.168.0.1/path/to/resource',
'https://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/path/to/resource?query=a#fragment',
'example.com/',
'example.com:443/path/to/resource',
'my-domain-name.com/path/to/resource',
'my_domain_name.com/path/to/resource',
'my_sub_domain_name.example.com/path/to/resource',
'subdomain.example.com/path/to/resource',
'https://مثال.إختبار/path/to/resource',
'example.com/path/to%20resource',
'example.com/path/to/resource?param1=value%20with%20space',
'example.com/path/to/resource#section%202',
'https://user+name:password@example.com/path/to/resource',
'example.com/path+to+resource',
'example.com/path:to:resource',
'example.com/path/to/resource',
'http://user%name:p$assword@example.com/path/to/resource',
'example.com/path/to/resource?param=value,with,comma',
'example.com/path/to/resource?param=[value]',
'example.com/path/to/resource#fragment[value]',
'http://[user:name]@[example.com]/path/to/resource',
'example.com/path/to/resource?param=valuewith',
'example.com/path/to/resource#fragmentwith',
'example.com/path/to/resource?param=value',
'example.com/path/to/resource#fragment',
'exam.plexo',
'http://https://example.com/path/to/resource',
'256.256.256.256/path/to/resource',
'example.notadomain/path/to/resource',
'example.com/path/to/resource',
'http:///path/to/resource',
'http://user:pa$$word@example.com/path/to/resource',
'example.com/path/to/resource#<fragment>',
'example.com/path/to/resource?param=<value>',
'http://userñame:pássword@example.com/path/to/resource',
'[example.com]/path/to/resource',
'example.com/path/to/resource#fragment1#fragment2',
'example.com/path/to/resource?url=https://google.com',
'ftp://user:name:password@example.com/path/to/resource',
'http://üsernäme:paßwörd@example.com/path/to/resource',
'example.com/path/to/%zz/resource',
'example.invalid/path/to/resource',
'mysql://example.com/path/to/resource',
'example.com:65536/path/to/resource',
'example.com/path/to/<resource>',
'example.com/path/to/resource?param=<value>',
'192.168.1.1/path/to/resource',
'example.com:12345/path/to/resource',
'müller.com/path/to/resource',
'example.com/über/uns',
'ftp://user:pa$$word@example.com/path/to/resource',
'example.com/path/to/%20resource',
'this-is-a-really-long-domain-name-that-excemum-length-for-a-domain-name.com/path/to/resource',
'example.com/path/to/resource?param=value1&param=value2',
'example.com/path/to/?query#fragment',
'example.com/path/to/resource?param=value#fragment',
'example..com/path/to/resource?param=value#fragment',
'example.com/path/to/resource?param=value&invalid==syntax#fragment',
'example.com/path/to/resource?param=value#invalid==syntax',
'_usts.com_',
'_usts.co.uk_',
'_usts.co.uk/path/to/resource#frag_ment_',
'_user@usts.co.uk_',
'lists.sr.ht/~sircmpwn/email-test-drive/<8433650D-8153-4DFC-B2CE-A73B78969083%40nixnetmail>?query=123#fragment',
'<a href="https://a.com">click to go to a.com and have fun</a> a.com'
];

const savedResult = [
    {
     "string": "example.net",
      "host": "example.net",
      "confirmedByProtocol": false},
    {
     "string": "sub.example.com/path/to/resource",
      "host": "sub.example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com.net/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path",
      "host": "example.com.net",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param1=value1&param2=value2",
      "fragment": "!frgmnt/with/path"},
    {
     "string": "ex-amp-le.com.net/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path",
      "host": "ex-amp-le.com.net",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param1=value1&param2=value2",
      "fragment": "!frgmnt/with/path"},
    {
     "string": "1ex-amp-le.com.net/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path",
      "host": "1ex-amp-le.com.net",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param1=value1&param2=value2",
      "fragment": "!frgmnt/with/path"},
    {
     "string": "1ex-amp-le.com.net:4221/path/to/resource?param1=value1&param2=value2#!frgmnt/with/path",
      "port": "4221",
      "host": "1ex-amp-le.com.net",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param1=value1&param2=value2",
      "fragment": "!frgmnt/with/path"},
    {
     "string": "example.com/path/to/resource#section1",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "section1"},
    {
     "string": "example.xn--p1ai/path/to/resource#section1",
      "host": "example.xn--p1ai",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "section1"},
    {
     "string": "example.xn--p1ai:12345/path/to/resource#section1",
      "port": "12345",
      "host": "example.xn--p1ai",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "section1"},
    {
     "string": "https://username:password@example.com/path/to/resource",
      "protocol": "https://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com:8080/path/to/resource",
      "port": "8080",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "192.168.0.1/path/to/resource",
      "ipv4": "192.168.0.1",
      "host": "192.168.0.1",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "https://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]/path/to/resource?query=a#fragment",
      "protocol": "https://",
      "ipv6": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "host": "[2001:0db8:85a3:0000:0000:8a2e:0370:7334]",
      "confirmedByProtocol": true,
      "path": "/path/to/resource",
      "query": "query=a",
      "fragment": "fragment"},
    {
     "string": "example.com/",
      "host": "example.com",
      "confirmedByProtocol": false},
    {
     "string": "example.com:443/path/to/resource",
      "port": "443",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "my-domain-name.com/path/to/resource",
      "host": "my-domain-name.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
    "string": "my_domain_name.com/path/to/resource",
    "host": "my_domain_name.com",
    "confirmedByProtocol": false,
    "path": "/path/to/resource"},
    {
    "string": "my_sub_domain_name.example.com/path/to/resource",
    "host": "my_sub_domain_name.example.com",
    "confirmedByProtocol": false,
    "path": "/path/to/resource"},
    {
     "string": "subdomain.example.com/path/to/resource",
      "host": "subdomain.example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "https://مثال.إختبار/path/to/resource",
      "protocol": "https://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to%20resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to%20resource"},
    {
     "string": "example.com/path/to/resource?param1=value%20with%20space",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param1=value%20with%20space"},
    {
     "string": "example.com/path/to/resource#section%202",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "section%202"},
    {
     "string": "https://user+name:password@example.com/path/to/resource",
      "protocol": "https://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path+to+resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path+to+resource"},
    {
     "string": "example.com/path:to:resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path:to:resource"},
    {
     "string": "example.com/path/to/resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "http://user%name:p$assword@example.com/path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/resource?param=value,with,comma",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=value,with,comma"},
    {
     "string": "example.com/path/to/resource?param=[value]",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=[value"},
    {
     "string": "example.com/path/to/resource#fragment[value]",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "fragment[value"},
    {
     "string": "http://[user:name]@[example.com]/path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/resource?param=valuewith",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=valuewith"},
    {
     "string": "example.com/path/to/resource#fragmentwith",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "fragmentwith"},
    {
     "string": "example.com/path/to/resource?param=value",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=value"},
    {
     "string": "example.com/path/to/resource#fragment",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "fragment"},
    {
     "string": "http://https://example.com/path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "http:///path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/to/resource"},
    {
     "string": "http://user:pa$$word@example.com/path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/resource#",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/resource?param=",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param"},
    {
     "string": "http://userñame:pássword@example.com/path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com",
      "host": "example.com",
      "confirmedByProtocol": false},
    {
     "string": "example.com/path/to/resource#fragment1#fragment2",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "fragment": "fragment1#fragment2"},
    {
     "string": "example.com/path/to/resource?url=https://google.com",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "url=https://google.com"},
    {
     "string": "ftp://user:name:password@example.com/path/to/resource",
      "protocol": "ftp://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "http://üsernäme:paßwörd@example.com/path/to/resource",
      "protocol": "http://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/%zz/resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/%zz/resource"},
    {
     "string": "example.com/path/to/resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com:65536/path/to/resource",
      "port": "65536",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/"},
    {
     "string": "example.com/path/to/resource?param=",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param"},
    {
     "string": "192.168.1.1/path/to/resource",
      "ipv4": "192.168.1.1",
      "host": "192.168.1.1",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com:12345/path/to/resource",
      "port": "12345",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "ller.com/path/to/resource",
      "host": "ller.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com/über/uns",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/über/uns"},
    {
     "string": "ftp://user:pa$$word@example.com/path/to/resource",
      "protocol": "ftp://",
      "confirmedByProtocol": true,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/%20resource",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/%20resource"},
    {
     "string": "this-is-a-really-long-domain-name-that-excemum-length-for-a-domain-name.com/path/to/resource",
      "host": "this-is-a-really-long-domain-name-that-excemum-length-for-a-domain-name.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource"},
    {
     "string": "example.com/path/to/resource?param=value1&param=value2",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=value1&param=value2"},
    {
     "string": "example.com/path/to/?query#fragment",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/",
      "query": "query",
      "fragment": "fragment"},
    {
     "string": "example.com/path/to/resource?param=value#fragment",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=value",
      "fragment": "fragment"},
    {
     "string": "example.com/path/to/resource?param=value&invalid==syntax#fragment",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=value&invalid==syntax",
      "fragment": "fragment"},
    {
     "string": "example.com/path/to/resource?param=value#invalid==syntax",
      "host": "example.com",
      "confirmedByProtocol": false,
      "path": "/path/to/resource",
      "query": "param=value",
      "fragment": "invalid==syntax"},
    {
      "string": "usts.com",
      "host": "usts.com",
      "confirmedByProtocol": false},
    {
      "string": "usts.co.uk",
      "host": "usts.co.uk",
      "confirmedByProtocol": false},
    {
      "string": "usts.co.uk/path/to/resource#frag_ment_",
      "host": "usts.co.uk",
      "path": "/path/to/resource",
      "fragment": "frag_ment_",
      "confirmedByProtocol": false},
    {
      "string": "_user@usts.co.uk",
      "host": "usts.co.uk",
      "isEmail": true
    },
    {
      "string": "lists.sr.ht/~sircmpwn/email-test-drive/",
      "host": "lists.sr.ht",
      "confirmedByProtocol": false,
      "path": "/~sircmpwn/email-test-drive/",
    },
    {
      "string": "a.com",
      "host": "a.com",
    }
];

const pollution = [
  [`PS (`,`) PE`],
  [`PS <`,`> PE`],
  [`PS {`,`} PE`],
  [`PS [`,`] PE`],
  [`PS =`,`, PE`],
  [`PS `,`. PE`],
  [`PS :`,`... PE`]
];


const pollutedInputs = pollution.map(pollutionStrings=>{
  let string = '';
  input.forEach(url=>{
    string = string + pollutionStrings[0] + url + pollutionStrings[1]
  });
  return string;
});

describe("variable URLs", ()=>{
  describe("variable urls without pollution", ()=>{
    const res = anchorme.list(input.join(" "));
    if(res.length !== savedResult.length) {
        if(res.length > savedResult.length) {
          const discrepancy = res.find(x=>savedResult.map(x=>x.string).indexOf(x.string) === -1);
          it(`result matched an extra URL: ${discrepancy?.string}`, ()=>{
            expect(res.length).toBe(savedResult.length);
          });       
        }
        if(res.length < savedResult.length) {
          const discrepancy = savedResult.find(x=>res.map(x=>x.string).indexOf(x.string) === -1);
          it(`result is missing a URL: ${discrepancy?.string}`, ()=>{
            expect(res.length).toBe(savedResult.length);
          });       
        }
      return;
    }
    res.forEach((resItem, i) => {
      const savedResultItem = savedResult[i];
      Object.keys(savedResultItem).forEach(key=>{
        it(`in ${savedResultItem.string} testing ${key}`, ()=>{
          expect((resItem as any)[key]).toBe((savedResultItem as any)[key]);
        });
      });
    });
  });
  describe("variable urls with pollution", ()=>{
    pollution.forEach((pollutionItem, i)=>{
      describe(`variable urls with ${pollutionItem[0]}pollution${pollutionItem[1]}`, ()=>{
        const res = anchorme.list(pollutedInputs[i]);
        if(res.length !== savedResult.length) {
          if(res.length > savedResult.length) {
            const discrepancy = res.find(x=>savedResult.map(x=>x.string).indexOf(x.string) === -1);
            it(`result matched an extra URL: ${discrepancy?.string}`, ()=>{
              expect(res.length).toBe(savedResult.length);
            });       
          }
          if(res.length < savedResult.length) {
            const discrepancy = savedResult.find(x=>res.map(x=>x.string).indexOf(x.string) === -1);
            it(`result is missing a URL: ${discrepancy?.string}`, ()=>{
              expect(res.length).toBe(savedResult.length);
            });       
          }
        return;
      }
        it("same number of matches", ()=>{
          expect(res.length).toBe(savedResult.length);
          if(res.length !== savedResult.length) {
  
          }
        });
        res.forEach((resItem, i) => {
          const savedResultItem = savedResult[i];
          Object.keys(savedResultItem).forEach(key=>{
            it(`in ${savedResultItem.string} testing ${key}`, ()=>{
              expect((resItem as any)[key]).toBe((savedResultItem as any)[key]);
            });
          });
        });
      });
    });
  });
});