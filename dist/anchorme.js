(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.anchorme = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function countOccurrences(string, subString, allowOverlapping) {
	return string.split(subString).length - 1;
}

function removeNotationEnds(str) {
	function removeThis(str, char) {
		if (str.endsWith(char)) {
			str = str.substring(0, str.length - 1);
			return removeThis(str, char);
		} else return str;
	}

	if (str.endsWith("?")) str = removeThis(str, "?");else if (str.endsWith(";")) str = removeThis(str, ";");else if (str.endsWith(":")) str = removeThis(str, ":");else if (str.endsWith(",")) str = removeThis(str, ",");else if (str.endsWith(".")) str = removeThis(str, ".");

	return str;
}

function defaultOptions(options) {
	if (!options) {
		options = {
			"attributes": false,
			"html": true,
			ips: true,
			emails: true,
			urls: true,
			TLDs: 20,
			truncate: 0,
			defaultProtocol: "http://"
		};
	}

	if (_typeof(options.attributes) !== "object") options.attributes = false;
	if (typeof options.html !== "boolean") options.html = true;
	if (typeof options.ips !== "boolean") options.ips = true;
	if (typeof options.emails !== "boolean") options.emails = true;
	if (typeof options.urls !== "boolean") options.urls = true;
	if (typeof options.defaultProtocol !== "string") options.defaultProtocol = "http://";
	if (typeof options.truncate !== "number") options.truncate = 0;
	return options;
}

function isInt(value) {
	if (typeof value === "string" && value.indexOf(".") > -1) return false;
	if (typeof value === "number" && Math.round(value) !== value) return false;else if (value === "") return false;else if (isNaN(value * 1)) return false;else return true;
}

function isPort(value) {
	if (!isInt(value)) return false;
	if (value * 1 > 65535) return false;else return true;
}

var allowedInEmailName = "abcdefghijklmnopqrstuvwxyz0123456789!#$%&'*+-/=?^_`{|}~.";
var allowedInHost = "abcdefghijklmnopqrstuvwxyz0123456789-.:";
var urlAllowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%";
var tlds = ['.com', '.net', '.org', '.edu', '.gov', '.uk', '.ca', '.de', '.jp', '.fr', '.au', '.us', '.ru', '.ch', '.it', '.nl', '.se', '.no', '.es', '.io', '.aaa', '.aarp', '.abarth', '.abb', '.abbott', '.abbvie', '.abc', '.able', '.abogado', '.abudhabi', '.ac', '.academy', '.accenture', '.accountant', '.accountants', '.aco', '.active', '.actor', '.ad', '.adac', '.ads', '.adult', '.ae', '.aeg', '.aero', '.aetna', '.af', '.afamilycompany', '.afl', '.ag', '.agakhan', '.agency', '.ai', '.aig', '.aigo', '.airbus', '.airforce', '.airtel', '.akdn', '.al', '.alfaromeo', '.alibaba', '.alipay', '.allfinanz', '.allstate', '.ally', '.alsace', '.alstom', '.am', '.americanexpress', '.americanfamily', '.amex', '.amfam', '.amica', '.amsterdam', '.analytics', '.android', '.anquan', '.anz', '.ao', '.apartments', '.app', '.apple', '.aq', '.aquarelle', '.ar', '.aramco', '.archi', '.army', '.arpa', '.art', '.arte', '.as', '.asda', '.asia', '.associates', '.at', '.athleta', '.attorney', '.au', '.auction', '.audi', '.audible', '.audio', '.auspost', '.author', '.auto', '.autos', '.avianca', '.aw', '.aws', '.ax', '.axa', '.az', '.azure', '.ba', '.baby', '.baidu', '.banamex', '.bananarepublic', '.band', '.bank', '.bar', '.barcelona', '.barclaycard', '.barclays', '.barefoot', '.bargains', '.bauhaus', '.bayern', '.bb', '.bbc', '.bbt', '.bbva', '.bcg', '.bcn', '.bd', '.be', '.beats', '.beauty', '.beer', '.bentley', '.berlin', '.best', '.bestbuy', '.bet', '.bf', '.bg', '.bh', '.bharti', '.bi', '.bible', '.bid', '.bike', '.bing', '.bingo', '.bio', '.biz', '.bj', '.black', '.blackfriday', '.blanco', '.blockbuster', '.blog', '.bloomberg', '.blue', '.bm', '.bms', '.bmw', '.bn', '.bnl', '.bnpparibas', '.bo', '.boats', '.boehringer', '.bofa', '.bom', '.bond', '.boo', '.book', '.booking', '.boots', '.bosch', '.bostik', '.bot', '.boutique', '.br', '.bradesco', '.bridgestone', '.broadway', '.broker', '.brother', '.brussels', '.bs', '.bt', '.budapest', '.bugatti', '.build', '.builders', '.business', '.buy', '.buzz', '.bv', '.bw', '.by', '.bz', '.bzh', '.ca', '.cab', '.cafe', '.cal', '.call', '.calvinklein', '.cam', '.camera', '.camp', '.cancerresearch', '.canon', '.capetown', '.capital', '.capitalone', '.car', '.caravan', '.cards', '.care', '.career', '.careers', '.cars', '.cartier', '.casa', '.cash', '.casino', '.cat', '.catering', '.cba', '.cbn', '.cbre', '.cbs', '.cc', '.cd', '.ceb', '.center', '.ceo', '.cern', '.cf', '.cfa', '.cfd', '.cg', '.ch', '.chanel', '.channel', '.chase', '.chat', '.cheap', '.chintai', '.chloe', '.christmas', '.chrome', '.chrysler', '.church', '.ci', '.cipriani', '.circle', '.cisco', '.citadel', '.citi', '.citic', '.city', '.cityeats', '.ck', '.cl', '.claims', '.cleaning', '.click', '.clinic', '.clinique', '.clothing', '.cloud', '.club', '.clubmed', '.cm', '.cn', '.co', '.coach', '.codes', '.coffee', '.college', '.cologne', '.comcast', '.commbank', '.community', '.company', '.compare', '.computer', '.comsec', '.condos', '.construction', '.consulting', '.contact', '.contractors', '.cooking', '.cookingchannel', '.cool', '.coop', '.corsica', '.country', '.coupon', '.coupons', '.courses', '.cr', '.credit', '.creditcard', '.creditunion', '.cricket', '.crown', '.crs', '.cruises', '.csc', '.cu', '.cuisinella', '.cv', '.cw', '.cx', '.cy', '.cymru', '.cyou', '.cz', '.dabur', '.dad', '.dance', '.date', '.dating', '.datsun', '.day', '.dclk', '.dds', '.de', '.deal', '.dealer', '.deals', '.degree', '.delivery', '.dell', '.deloitte', '.delta', '.democrat', '.dental', '.dentist', '.desi', '.design', '.dev', '.dhl', '.diamonds', '.diet', '.digital', '.direct', '.directory', '.discount', '.discover', '.dish', '.diy', '.dj', '.dk', '.dm', '.dnp', '.do', '.docs', '.doctor', '.dodge', '.dog', '.doha', '.domains', '.dot', '.download', '.drive', '.dtv', '.dubai', '.duck', '.dunlop', '.duns', '.dupont', '.durban', '.dvag', '.dvr', '.dz', '.earth', '.eat', '.ec', '.eco', '.edeka', '.edu', '.education', '.ee', '.eg', '.email', '.emerck', '.energy', '.engineer', '.engineering', '.enterprises', '.epost', '.epson', '.equipment', '.er', '.ericsson', '.erni', '.es', '.esq', '.estate', '.esurance', '.et', '.eu', '.eurovision', '.eus', '.events', '.everbank', '.exchange', '.expert', '.exposed', '.express', '.extraspace', '.fage', '.fail', '.fairwinds', '.faith', '.family', '.fan', '.fans', '.farm', '.farmers', '.fashion', '.fast', '.fedex', '.feedback', '.ferrari', '.ferrero', '.fi', '.fiat', '.fidelity', '.fido', '.film', '.final', '.finance', '.financial', '.fire', '.firestone', '.firmdale', '.fish', '.fishing', '.fit', '.fitness', '.fj', '.fk', '.flickr', '.flights', '.flir', '.florist', '.flowers', '.fly', '.fm', '.fo', '.foo', '.foodnetwork', '.football', '.ford', '.forex', '.forsale', '.forum', '.foundation', '.fox', '.fr', '.fresenius', '.frl', '.frogans', '.frontdoor', '.frontier', '.ftr', '.fujitsu', '.fujixerox', '.fund', '.furniture', '.futbol', '.fyi', '.ga', '.gal', '.gallery', '.gallo', '.gallup', '.game', '.games', '.gap', '.garden', '.gb', '.gbiz', '.gd', '.gdn', '.ge', '.gea', '.gent', '.genting', '.george', '.gf', '.gg', '.ggee', '.gh', '.gi', '.gift', '.gifts', '.gives', '.giving', '.gl', '.glade', '.glass', '.gle', '.global', '.globo', '.gm', '.gmail', '.gmbh', '.gmo', '.gmx', '.gn', '.godaddy', '.gold', '.goldpoint', '.golf', '.goo', '.goodhands', '.goodyear', '.goog', '.google', '.gop', '.got', '.gov', '.gp', '.gq', '.gr', '.grainger', '.graphics', '.gratis', '.green', '.gripe', '.group', '.gs', '.gt', '.gu', '.guardian', '.gucci', '.guge', '.guide', '.guitars', '.guru', '.gw', '.gy', '.hamburg', '.hangout', '.haus', '.hbo', '.hdfc', '.hdfcbank', '.health', '.healthcare', '.help', '.helsinki', '.here', '.hermes', '.hgtv', '.hiphop', '.hisamitsu', '.hitachi', '.hiv', '.hk', '.hkt', '.hm', '.hn', '.hockey', '.holdings', '.holiday', '.homedepot', '.homegoods', '.homes', '.homesense', '.honda', '.honeywell', '.horse', '.host', '.hosting', '.hot', '.hoteles', '.hotmail', '.house', '.how', '.hr', '.hsbc', '.ht', '.htc', '.hu', '.hughes', '.hyatt', '.hyundai', '.ibm', '.icbc', '.ice', '.icu', '.id', '.ie', '.ieee', '.ifm', '.iinet', '.ikano', '.il', '.im', '.imamat', '.imdb', '.immo', '.immobilien', '.in', '.industries', '.infiniti', '.info', '.ing', '.ink', '.institute', '.insurance', '.insure', '.int', '.intel', '.international', '.intuit', '.investments', '.io', '.ipiranga', '.iq', '.ir', '.irish', '.is', '.iselect', '.ismaili', '.ist', '.istanbul', '.it', '.itau', '.itv', '.iwc', '.jaguar', '.java', '.jcb', '.jcp', '.je', '.jeep', '.jetzt', '.jewelry', '.jlc', '.jll', '.jm', '.jmp', '.jnj', '.jo', '.jobs', '.joburg', '.jot', '.joy', '.jp', '.jpmorgan', '.jprs', '.juegos', '.juniper', '.kaufen', '.kddi', '.ke', '.kerryhotels', '.kerrylogistics', '.kerryproperties', '.kfh', '.kg', '.kh', '.ki', '.kia', '.kim', '.kinder', '.kindle', '.kitchen', '.kiwi', '.km', '.kn', '.koeln', '.komatsu', '.kosher', '.kp', '.kpmg', '.kpn', '.kr', '.krd', '.kred', '.kuokgroup', '.kw', '.ky', '.kyoto', '.kz', '.la', '.lacaixa', '.ladbrokes', '.lamborghini', '.lamer', '.lancaster', '.lancia', '.lancome', '.land', '.landrover', '.lanxess', '.lasalle', '.lat', '.latino', '.latrobe', '.law', '.lawyer', '.lb', '.lc', '.lds', '.lease', '.leclerc', '.lefrak', '.legal', '.lego', '.lexus', '.lgbt', '.li', '.liaison', '.lidl', '.life', '.lifeinsurance', '.lifestyle', '.lighting', '.like', '.lilly', '.limited', '.limo', '.lincoln', '.linde', '.link', '.lipsy', '.live', '.living', '.lixil', '.lk', '.loan', '.loans', '.locker', '.locus', '.loft', '.lol', '.london', '.lotte', '.lotto', '.love', '.lpl', '.lplfinancial', '.lr', '.ls', '.lt', '.ltd', '.ltda', '.lu', '.lundbeck', '.lupin', '.luxe', '.luxury', '.lv', '.ly', '.ma', '.macys', '.madrid', '.maif', '.maison', '.makeup', '.man', '.management', '.mango', '.market', '.marketing', '.markets', '.marriott', '.marshalls', '.maserati', '.mattel', '.mba', '.mc', '.mcd', '.mcdonalds', '.mckinsey', '.md', '.me', '.med', '.media', '.meet', '.melbourne', '.meme', '.memorial', '.men', '.menu', '.meo', '.metlife', '.mg', '.mh', '.miami', '.microsoft', '.mil', '.mini', '.mint', '.mit', '.mitsubishi', '.mk', '.ml', '.mlb', '.mls', '.mm', '.mma', '.mn', '.mo', '.mobi', '.mobily', '.moda', '.moe', '.moi', '.mom', '.monash', '.money', '.monster', '.montblanc', '.mopar', '.mormon', '.mortgage', '.moscow', '.motorcycles', '.mov', '.movie', '.movistar', '.mp', '.mq', '.mr', '.ms', '.msd', '.mt', '.mtn', '.mtpc', '.mtr', '.mu', '.museum', '.mutual', '.mutuelle', '.mv', '.mw', '.mx', '.my', '.mz', '.na', '.nab', '.nadex', '.nagoya', '.name', '.nationwide', '.natura', '.navy', '.nba', '.nc', '.ne', '.nec', '.netbank', '.netflix', '.network', '.neustar', '.new', '.news', '.next', '.nextdirect', '.nexus', '.nf', '.nfl', '.ng', '.ngo', '.nhk', '.ni', '.nico', '.nike', '.nikon', '.ninja', '.nissan', '.nissay', '.nl', '.no', '.nokia', '.northwesternmutual', '.norton', '.now', '.nowruz', '.nowtv', '.np', '.nr', '.nra', '.nrw', '.ntt', '.nu', '.nyc', '.nz', '.obi', '.observer', '.off', '.office', '.okinawa', '.olayan', '.olayangroup', '.oldnavy', '.ollo', '.om', '.omega', '.one', '.ong', '.onl', '.online', '.onyourside', '.ooo', '.open', '.oracle', '.orange', '.org', '.organic', '.orientexpress', '.origins', '.osaka', '.otsuka', '.ott', '.ovh', '.pa', '.page', '.pamperedchef', '.panasonic', '.panerai', '.paris', '.pars', '.partners', '.parts', '.party', '.passagens', '.pay', '.pccw', '.pe', '.pet', '.pf', '.pfizer', '.pg', '.ph', '.pharmacy', '.philips', '.photo', '.photography', '.photos', '.physio', '.piaget', '.pics', '.pictet', '.pictures', '.pid', '.pin', '.ping', '.pink', '.pioneer', '.pizza', '.pk', '.pl', '.place', '.play', '.playstation', '.plumbing', '.plus', '.pm', '.pn', '.pnc', '.pohl', '.poker', '.politie', '.porn', '.post', '.pr', '.pramerica', '.praxi', '.press', '.prime', '.pro', '.prod', '.productions', '.prof', '.progressive', '.promo', '.properties', '.property', '.protection', '.pru', '.prudential', '.ps', '.pt', '.pub', '.pw', '.pwc', '.py', '.qa', '.qpon', '.quebec', '.quest', '.qvc', '.racing', '.raid', '.re', '.read', '.realestate', '.realtor', '.realty', '.recipes', '.red', '.redstone', '.redumbrella', '.rehab', '.reise', '.reisen', '.reit', '.ren', '.rent', '.rentals', '.repair', '.report', '.republican', '.rest', '.restaurant', '.review', '.reviews', '.rexroth', '.rich', '.richardli', '.ricoh', '.rightathome', '.rio', '.rip', '.ro', '.rocher', '.rocks', '.rodeo', '.rogers', '.room', '.rs', '.rsvp', '.ru', '.ruhr', '.run', '.rw', '.rwe', '.ryukyu', '.sa', '.saarland', '.safe', '.safety', '.sakura', '.sale', '.salon', '.samsclub', '.samsung', '.sandvik', '.sandvikcoromant', '.sanofi', '.sap', '.sapo', '.sarl', '.sas', '.save', '.saxo', '.sb', '.sbi', '.sbs', '.sc', '.sca', '.scb', '.schaeffler', '.schmidt', '.scholarships', '.school', '.schule', '.schwarz', '.science', '.scjohnson', '.scor', '.scot', '.sd', '.se', '.seat', '.secure', '.security', '.seek', '.select', '.sener', '.services', '.ses', '.seven', '.sew', '.sex', '.sexy', '.sfr', '.sg', '.sh', '.shangrila', '.sharp', '.shaw', '.shell', '.shia', '.shiksha', '.shoes', '.shop', '.shopping', '.shouji', '.show', '.showtime', '.shriram', '.si', '.silk', '.sina', '.singles', '.site', '.sj', '.sk', '.ski', '.skin', '.sky', '.skype', '.sl', '.sling', '.sm', '.smart', '.smile', '.sn', '.sncf', '.so', '.soccer', '.social', '.softbank', '.software', '.sohu', '.solar', '.solutions', '.song', '.sony', '.soy', '.space', '.spiegel', '.spot', '.spreadbetting', '.sr', '.srl', '.srt', '.st', '.stada', '.staples', '.star', '.starhub', '.statebank', '.statefarm', '.statoil', '.stc', '.stcgroup', '.stockholm', '.storage', '.store', '.stream', '.studio', '.study', '.style', '.su', '.sucks', '.supplies', '.supply', '.support', '.surf', '.surgery', '.suzuki', '.sv', '.swatch', '.swiftcover', '.swiss', '.sx', '.sy', '.sydney', '.symantec', '.systems', '.sz', '.tab', '.taipei', '.talk', '.taobao', '.target', '.tatamotors', '.tatar', '.tattoo', '.tax', '.taxi', '.tc', '.tci', '.td', '.tdk', '.team', '.tech', '.technology', '.tel', '.telecity', '.telefonica', '.temasek', '.tennis', '.teva', '.tf', '.tg', '.th', '.thd', '.theater', '.theatre', '.tiaa', '.tickets', '.tienda', '.tiffany', '.tips', '.tires', '.tirol', '.tj', '.tjmaxx', '.tjx', '.tk', '.tkmaxx', '.tl', '.tm', '.tmall', '.tn', '.to', '.today', '.tokyo', '.tools', '.top', '.toray', '.toshiba', '.total', '.tours', '.town', '.toyota', '.toys', '.tr', '.trade', '.trading', '.training', '.travel', '.travelchannel', '.travelers', '.travelersinsurance', '.trust', '.trv', '.tt', '.tube', '.tui', '.tunes', '.tushu', '.tv', '.tvs', '.tw', '.tz', '.ua', '.ubank', '.ubs', '.uconnect', '.ug', '.uk', '.unicom', '.university', '.uno', '.uol', '.ups', '.us', '.uy', '.uz', '.va', '.vacations', '.vana', '.vanguard', '.vc', '.ve', '.vegas', '.ventures', '.verisign', '.versicherung', '.vet', '.vg', '.vi', '.viajes', '.video', '.vig', '.viking', '.villas', '.vin', '.vip', '.virgin', '.visa', '.vision', '.vista', '.vistaprint', '.viva', '.vivo', '.vlaanderen', '.vn', '.vodka', '.volkswagen', '.vote', '.voting', '.voto', '.voyage', '.vu', '.vuelos', '.wales', '.walmart', '.walter', '.wang', '.wanggou', '.warman', '.watch', '.watches', '.weather', '.weatherchannel', '.webcam', '.weber', '.website', '.wed', '.wedding', '.weibo', '.weir', '.wf', '.whoswho', '.wien', '.wiki', '.williamhill', '.win', '.windows', '.wine', '.winners', '.wme', '.wolterskluwer', '.woodside', '.work', '.works', '.world', '.wow', '.ws', '.wtc', '.wtf', '.xbox', '.xerox', '.xfinity', '.xihuan', '.xin', '.xn--11b4c3d', '.xn--1ck2e1b', '.xn--1qqw23a', '.xn--30rr7y', '.xn--3bst00m', '.xn--3ds443g', '.xn--3e0b707e', '.xn--3oq18vl8pn36a', '.xn--3pxu8k', '.xn--42c2d9a', '.xn--45brj9c', '.xn--45q11c', '.xn--4gbrim', '.xn--54b7fta0cc', '.xn--55qw42g', '.xn--55qx5d', '.xn--5su34j936bgsg', '.xn--5tzm5g', '.xn--6frz82g', '.xn--6qq986b3xl', '.xn--80adxhks', '.xn--80ao21a', '.xn--80asehdb', '.xn--80aswg', '.xn--8y0a063a', '.xn--90a3ac', '.xn--90ae', '.xn--90ais', '.xn--9dbq2a', '.xn--9et52u', '.xn--9krt00a', '.xn--b4w605ferd', '.xn--bck1b9a5dre4c', '.xn--c1avg', '.xn--c2br7g', '.xn--cck2b3b', '.xn--cg4bki', '.xn--clchc0ea0b2g2a9gcd', '.xn--czr694b', '.xn--czrs0t', '.xn--czru2d', '.xn--d1acj3b', '.xn--d1alf', '.xn--e1a4c', '.xn--eckvdtc9d', '.xn--efvy88h', '.xn--estv75g', '.xn--fct429k', '.xn--fhbei', '.xn--fiq228c5hs', '.xn--fiq64b', '.xn--fiqs8s', '.xn--fiqz9s', '.xn--fjq720a', '.xn--flw351e', '.xn--fpcrj9c3d', '.xn--fzc2c9e2c', '.xn--fzys8d69uvgm', '.xn--g2xx48c', '.xn--gckr3f0f', '.xn--gecrj9c', '.xn--gk3at1e', '.xn--h2brj9c', '.xn--hxt814e', '.xn--i1b6b1a6a2e', '.xn--imr513n', '.xn--io0a7i', '.xn--j1aef', '.xn--j1amh', '.xn--j6w193g', '.xn--jlq61u9w7b', '.xn--jvr189m', '.xn--kcrx77d1x4a', '.xn--kprw13d', '.xn--kpry57d', '.xn--kpu716f', '.xn--kput3i', '.xn--l1acc', '.xn--lgbbat1ad8j', '.xn--mgb9awbf', '.xn--mgba3a3ejt', '.xn--mgba3a4f16a', '.xn--mgba7c0bbn0a', '.xn--mgbaam7a8h', '.xn--mgbab2bd', '.xn--mgbayh7gpa', '.xn--mgbb9fbpob', '.xn--mgbbh1a71e', '.xn--mgbc0a9azcg', '.xn--mgbca7dzdo', '.xn--mgberp4a5d4ar', '.xn--mgbpl2fh', '.xn--mgbt3dhd', '.xn--mgbtx2b', '.xn--mgbx4cd0ab', '.xn--mix891f', '.xn--mk1bu44c', '.xn--mxtq1m', '.xn--ngbc5azd', '.xn--ngbe9e0a', '.xn--node', '.xn--nqv7f', '.xn--nqv7fs00ema', '.xn--nyqy26a', '.xn--o3cw4h', '.xn--ogbpf8fl', '.xn--p1acf', '.xn--p1ai', '.xn--pbt977c', '.xn--pgbs0dh', '.xn--pssy2u', '.xn--q9jyb4c', '.xn--qcka1pmc', '.xn--qxam', '.xn--rhqv96g', '.xn--rovu88b', '.xn--s9brj9c', '.xn--ses554g', '.xn--t60b56a', '.xn--tckwe', '.xn--unup4y', '.xn--vermgensberater-ctb', '.xn--vermgensberatung-pwb', '.xn--vhquv', '.xn--vuq861b', '.xn--w4r85el8fhu5dnra', '.xn--w4rs40l', '.xn--wgbh1c', '.xn--wgbl6a', '.xn--xhq521b', '.xn--xkc2al3hye2a', '.xn--xkc2dl3a5ee0h', '.xn--y9a3aq', '.xn--yfro4i67o', '.xn--ygbi2ammx', '.xn--zfr164b', '.xperia', '.xxx', '.xyz', '.yachts', '.yahoo', '.yamaxun', '.yandex', '.ye', '.yodobashi', '.yoga', '.yokohama', '.you', '.youtube', '.yt', '.yun', '.za', '.zappos', '.zara', '.zero', '.zip', '.zippo', '.zm', '.zone', '.zuerich', '.zw'];
var htmlAttrs = ["src=", "href=", "cite=", "formaction=", "icon=", "manifest=", "poster=", "codebase=", "background=", "profile=", "usemap="];

var emailChecker = function (str) {
	if (countOccurrences(str, "@") < 1) return false;

	// normalize
	str = str.toLowerCase();
	str = removeNotationEnds(str);

	var emailName = str.substring(0, str.indexOf("@"));
	var emailServer = str.substr(str.indexOf("@") + 1);

	// validate the part before @
	if (emailName.split("").filter(function (c) {
		return ~allowedInEmailName.indexOf(c);
	}).length !== emailName.length) return false;
	// validate the part after @
	if (emailServer.split("").filter(function (c) {
		return ~allowedInHost.indexOf(c);
	}).length !== emailServer.length) return false;
	// validate the tld
	if (emailServer.endsWith(".com")) return true; // for performance
	if (!~tlds.indexOf(emailServer.substr(emailServer.lastIndexOf(".")))) return false;

	return true;
};

var ipChecker = function (str) {

	if (countOccurrences(str, ".") < 3) return false;

	// normalize it	
	str = str.toLowerCase();
	str = removeNotationEnds(str);

	var IPArray = str.split("."),
	    oc1 = IPArray[0],
	    oc2 = IPArray[1],
	    oc3 = IPArray[2];

	// validate oc1,oc2,oc3
	if (!isInt(oc1) || oc1 > 255 || oc1 < 0) return false;
	if (!isInt(oc2) || oc2 > 255 || oc2 < 0) return false;
	if (!isInt(oc3) || oc3 > 255 || oc3 < 0) return false;

	/**
  * the IPArray[3] might be a number ..
  * might be just a number						0
  * might be a number with port 					0:3000
  * might be a number with slash 				0/route
  * might be a number with port and slash 		0:3000/one
 **/

	var lastBit = IPArray[3],
	    oc4,
	    port,
	    route;

	if (!lastBit) return false;

	// one: route
	if (~lastBit.indexOf("/")) {
		var ocAndRoute = lastBit.split("/");
		oc4 = ocAndRoute[0];
		route = ocAndRoute[1];
	}

	// both
	if (~lastBit.indexOf(":") && ~lastBit.indexOf("/") && lastBit.indexOf(":") < lastBit.indexOf("/")) {
		var aArr = lastBit.split(":");
		var bArr = aArr[1].split("/");
		oc4 = aArr[0];
		port = bArr[0];
	}

	// one: port
	if (~lastBit.indexOf(":") && lastBit.indexOf("/") < 0 && !IPArray.slice(4).join()) {
		var ocAndPort = lastBit.split(":");
		oc4 = ocAndPort[0];
		port = ocAndPort[1];
	}

	// non
	if (lastBit.indexOf(":") < 0 && lastBit.indexOf("/") < 0 && !IPArray.slice(4).join()) {
		oc4 = lastBit;
	}

	// validate the last bit
	if (!isInt(oc4) || oc4 > 255 || oc4 < 0) return false;
	if (port !== undefined && !isPort(port)) return false;
	if (!oc4) return false;
	return true;
};

var urlChecker = function (str) {
	// basic validations
	if (countOccurrences(str, ".") === 0) return false;
	if (countOccurrences(str, ".") === 1 && str.indexOf(".") === str.length - 1) return false;
	if (str.indexOf("/") < 3 && str.indexOf("/") > 0) return false;

	// normalize it	
	str = str.toLowerCase();
	str = removeNotationEnds(str);

	if (~str.indexOf("/")) {
		var slashIndex = str.indexOf("/");
		var preSlash = str.substring(0, slashIndex);
		if (~preSlash.indexOf("..")) return false;
		if (preSlash.split("").filter(function (c) {
			return ~allowedInHost.indexOf(c);
		}).length !== preSlash.length) return false;
		if (preSlash.endsWith(".com")) return true; // for performance
		if (preSlash.indexOf(":") > 0) {
			var portAndHost = preSlash.split(":");
			var host = portAndHost[0];
			var port = portAndHost[1];
			if (!port) return false;
			if (isNaN(port)) return false;
			if (parseInt(port) > 65535) return false;
			if (str.endsWith(".com")) return true; // for performance
			if (!~tlds.indexOf(host.substr(host.lastIndexOf(".")))) return false;
		} else if (!~tlds.indexOf(preSlash.substr(preSlash.lastIndexOf(".")))) return false;
	} else {
		if (~str.indexOf("..")) return false;
		if (str.split("").filter(function (c) {
			return ~allowedInHost.indexOf(c);
		}).length !== str.length) return false;
		if (str.endsWith(".com")) return true; // for performance
		if (str.indexOf(":") > 0) {
			var _portAndHost = str.split(":");
			var _host = _portAndHost[0];
			var _port = _portAndHost[1];
			if (!_port) return false;
			if (isNaN(_port)) return false;
			if (parseInt(_port) > 65535) return false;
			if (str.endsWith(".com")) return true; // for performance
			if (!~tlds.indexOf(_host.substr(_host.lastIndexOf(".")))) return false;
		} else if (!~tlds.indexOf(str.substr(str.lastIndexOf(".")))) return false;
	}

	return true;
};

var separators = ["\n", "\r", "\t", "(", ")", "[", "]", "<", ">", "'", '"'];

function fixSeparators(arr, sep1, sep2) {
	arr.forEach(function (bit, i) {
		if (bit.indexOf(".") > -1 && // it has a .
		!(arr[i - 1] === sep1 && arr[i + 1] === sep2) && ( // it's not surrounded by separators
		arr[i + 1] === sep1 || arr[i + 1] === sep2) // the one after it, is either sep1 or sep2
		) {
				arr[i] = arr[i] + arr[i + 1];
				if (typeof arr[i + 2] === "string") arr[i] = arr[i] + arr[i + 2];
				if (typeof arr[i + 3] === "string") arr[i] = arr[i] + arr[i + 3];
				if (typeof arr[i + 4] === "string") arr[i] = arr[i] + arr[i + 4];
				arr.splice(i + 1, 4);
				fixSeparators(arr, sep1, sep2);
			}
	});
	return arr;
}

var fix = function (arr) {
	arr = fixSeparators(arr, "(", ")");
	arr = fixSeparators(arr, "[", "]");
	arr = fixSeparators(arr, "\"", "\"");
	arr = fixSeparators(arr, "'", "'");
	return arr;
};

function padWithSpace(c) {
	return " " + c + " ";
}

function separate(input) {
	separators.forEach(function (separator) {
		input = input.split(separator).join(padWithSpace(separator));
	});
	input = fix(input.split(" "));
	return input;
}

function deSeparate(input) {
	input = input.join(" ");
	separators.forEach(function (separator) {
		input = input.split(padWithSpace(separator)).join(separator);
	});
	return input;
}

var hasProtocol = function (str) {
	str = str.toLowerCase();
	if (str.startsWith("http://")) return "http://";else if (str.startsWith("https://")) return "https://";else if (str.startsWith("ftp://")) return "ftp://";else if (str.startsWith("file:///")) return "file:///";else if (str.startsWith("mailto:")) return "mailto:";else return false;
};

var identify = function (inputArr, options) {
	return inputArr.map(function (fragment, index) {
		// quick validations
		// 1
		if (fragment.indexOf(".") < 1 && !hasProtocol(fragment)) return fragment;
		// 2
		if (fragment.split("").filter(function (c) {
			return ~urlAllowed.indexOf(c);
		}).length !== fragment.length) return fragment;

		var urlObj = false;

		// starting tests that might render a positive result
		// test 1: it begins with a protocol
		var protocol = hasProtocol(fragment);

		if (protocol) {
			urlObj = {
				reason: "protocol",
				protocol: protocol,
				url: fragment.substr(protocol.length)
			};
		}
		// test 2: it's a URL
		if (!urlObj && options.urls && urlChecker(fragment)) {
			urlObj = {
				reason: "url",
				protocol: options.defaultProtocol,
				url: fragment
			};
		}
		// test 3: it's an email
		if (!urlObj && options.emails && emailChecker(fragment)) {
			urlObj = {
				reason: "email",
				protocol: "mailto:",
				url: fragment
			};
		}
		// test 4: it's an IP
		if (!urlObj && options.ips && ipChecker(fragment)) {
			urlObj = {
				reason: "ip",
				protocol: options.defaultProtocol,
				url: fragment
			};
		}
		if (!urlObj) return fragment;else {
			var past = index - 1;
			var skip = false;
			if ((inputArr[index - 1] === "'" || inputArr[index - 1] === '"') && ~htmlAttrs.indexOf(inputArr[index - 2])) return fragment;
			return urlObj;
		}
	});
};

var url2tag = function (url, options) {
	var href = removeNotationEnds(url);
	var nice = options.truncate > 0 && url.length > options.truncate ? url.substring(0, options.truncate) + "..." : url;
	var tag = "<a href='" + href + "'";
	if (options.attributes) {
		for (var name in options.attributes) {
			if (options.attributes.hasOwnProperty(name)) {
				tag = tag + " " + name + "='" + options.attributes[name] + "' ";
			}
		}
	}
	tag = tag + ">" + nice + "</a>";
	return tag;
};

var transform = function (str, options) {
	var arr = separate(str);
	arr = identify(arr, options).map(function (fragment) {
		if (typeof fragment === "string") return fragment;
		url2tag(fragment.url, options);
		return url2tag(fragment.protocol + fragment.url, options);
	});
	return deSeparate(arr);
};

var anchorme = function anchorme(str, options) {
	options = defaultOptions(options);
	var result = transform(str, options);
	return result;
};

// exposing few functions for extra uses
anchorme.validate = {
	ip: ipChecker,
	url: urlChecker,
	email: emailChecker
};

return anchorme;

})));
