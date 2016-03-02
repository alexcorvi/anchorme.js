/**
 *
 *
 * Anchorme.js
 * 0.6.0
 * @auth: Ali Saleem <ali.a.saleem@outlook.com>
 * @repo: https://github.com/ali-saleem/anchorme.js
 * 
 *
 *
 **/



(function(window) {

	'use strict';
	
	// ES6 endsWith polyfill
	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function(searchString, position) {
			var subjectString = this.toString();
			if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
				position = subjectString.length;
			}
			position -= searchString.length;
			var lastIndex = subjectString.indexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		};
	}
	
	// ES6 startsWith polyfill
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(searchString, position) {
			position = position || 0;
			return this.substr(position, searchString.length) === searchString;
		};
	}

	var anchorme = {};

	// helper function that counts the occurences of a specific substring in a string
	anchorme.occurrences = function(string, subString, allowOverlapping) {
		string += "";
		subString += "";
		if (subString.length <= 0) return string.length + 1;
		var n = 0,
			pos = 0;
		var step = (allowOverlapping) ? (1) : (subString.length);
		while (true) {
			pos = string.indexOf(subString, pos);
			if (pos >= 0) {
				n++;
				pos += step;
			}
			else break;
		}
		return (n);
	};
	
	// function to avoid breaking of the HTML
	anchorme.dontbreakHTML = function(str) {
		var atrs = ["src","href","cite","formaction","icon","manifest","poster","codebase","background","profile","usemap"]; 
		for (var i = atrs.length; i--;) {
			var needles = [atrs[i]+'=" ', atrs[i]+"=' "];
			var replacements = [atrs[i]+'="', atrs[i]+"='"];
			str = str.split(needles[0]).join(replacements[0]);
			str = str.split(needles[1]).join(replacements[1]);
		}
		return str;
	};


	anchorme.removeCharifItEndsWithIt = function(url,char) {
		if (url.endsWith(char)) {
			url = url.substring(0, url.length - 1);
			return anchorme.removeCharifItEndsWithIt(url,char);
		}
		else return url;
	};


	anchorme.TLDs = ['.com','.org','.edu','.gov','.uk','.net','.ca','.de','.jp','.fr','.au','.us','.ru','.ch','.it','.nl','.se','.no','.es','.io','.aero','.mil','.biz','.cat','.coop','.info','.jobs','.mobi','.museum','.name','.pro','.travel','.ac','.ad','.ae','.af','.ag','.ai','.al','.am','.an','.ao','.ap','.aq','.ar','.as','.at','.aw','.az','.ax','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm','.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.cc','.cd','.cf','.cg','.ci','.ck','.cl','.cm','.cn','.co','.cr','.cs','.cu','.cv','.cx','.cy','.cz','.dj','.dk','.dm','.do','.dz','.ec','.ee','.eg','.eh','.er','.et','.eu','.fi','.fj','.fk','.fm','.fo','.ga','.gb','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm','.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gw','.gy','.hk','.hm','.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq','.ir','.is','.je','.jm','.jo','.ke','.kg','.kh','.ki','.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li','.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg','.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt','.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng','.ni','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf','.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py','.qa','.re','.ro','.rw','.sa','.sb','.sc','.sd','.sg','.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv','.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tl','.tm','.tn','.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.um','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.wf','.ws','.ye','.yt','.yu','.za','.zm','.zw','.guru','.berlin','.photography','.tips','.today','.email','.technology','.company','.clothing','.me','.asia','.abb','.academy','.active','.actor','.ads','.adult','.afl','.agency','.aig','.airforce','.alsace','.amsterdam','.android','.apartments','.app','.aquarelle','.archi','.army','.associates','.attorney','.auction','.audio','.auto','.autos','.axa','.azure','.band','.bank','.bar','.barcelona','.barclays','.bargains','.bauhaus','.bayern','.bbc','.bbva','.bcn','.beer','.bentley','.best','.bharti','.bible','.bid','.bike','.bing','.bingo','.bio','.black','.blackfriday','.bloomberg','.blue','.bmw','.bnl','.bnpparibas','.boats','.bond','.boo','.boutique','.bradesco','.bridgestone','.broker','.brother','.brussels','.budapest','.build','.builders','.business','.buzz','.bzh','.cab','.cafe','.cal','.camera','.camp','.canon','.capetown','.capital','.caravan','.cards','.care','.career','.careers','.cars','.cartier','.casa','.cash','.casino','.catering','.cba','.cbn','.center','.ceo','.cern','.cfa','.cfd','.channel','.chat','.cheap','.chloe','.christmas','.chrome','.church','.cisco','.citic','.city','.claims','.cleaning','.click','.clinic','.cloud','.club','.coach','.codes','.coffee','.college','.cologne','.community','.computer','.condos','.construction','.consulting','.contractors','.cooking','.cool','.corsica','.country','.coupons','.courses','.credit','.creditcard','.cricket','.crown','.crs','.cruises','.cuisinella','.cw','.cymru','.cyou','.dabur','.dad','.dance','.date','.dating','.datsun','.day','.dclk','.deals','.degree','.delivery','.delta','.democrat','.dental','.dentist','.desi','.design','.dev','.diamonds','.diet','.digital','.direct','.directory','.discount','.dnp','.docs','.dog','.doha','.domains','.doosan','.download','.drive','.durban','.dvag','.earth','.eat','.education','.emerck','.energy','.engineer','.engineering','.enterprises','.epson','.equipment','.erni','.esq','.estate','.eus','.events','.everbank','.exchange','.expert','.exposed','.express','.fail','.faith','.fan','.fans','.farm','.fashion','.feedback','.film','.finance','.financial','.firmdale','.fish','.fishing','.fit','.fitness','.flights','.florist','.flowers','.flsmidth','.fly','.foo','.football','.forex','.forsale','.forum','.foundation','.frl','.frogans','.fund','.furniture','.futbol','.fyi','.gal','.gallery','.game','.garden','.gbiz','.gdn','.gent','.genting','.ggee','.gift','.gifts','.gives','.glass','.gle','.global','.globo','.gmail','.gmo','.gmx','.gold','.goldpoint','.golf','.goo','.goog','.google','.gop','.graphics','.gratis','.green','.gripe','.guge','.guide','.guitars','.hamburg','.hangout','.haus','.healthcare','.help','.here','.hermes','.hiphop','.hitachi','.hiv','.hockey','.holdings','.holiday','.homedepot','.homes','.honda','.horse','.host','.hosting','.hoteles','.hotmail','.house','.how','.hsbc','.ibm','.icbc','.icu','.ifm','.iinet','.immo','.immobilien','.industries','.infiniti','.ing','.ink','.institute','.insure','.int','.international','.investments','.irish','.ist','.istanbul','.iwc','.java','.jcb','.jetzt','.jewelry','.jlc','.jll','.joburg','.jprs','.juegos','.kaufen','.kddi','.kim','.kitchen','.kiwi','.koeln','.komatsu','.krd','.kred','.kyoto','.lacaixa','.land','.lasalle','.lat','.latrobe','.law','.lawyer','.lds','.lease','.leclerc','.legal','.lgbt','.liaison','.lidl','.life','.lighting','.limited','.limo','.link','.live','.loan','.loans','.lol','.london','.lotte','.lotto','.love','.ltda','.lupin','.luxe','.luxury','.madrid','.maif','.maison','.management','.mango','.market','.marketing','.markets','.marriott','.mba','.media','.meet','.melbourne','.meme','.memorial','.men','.menu','.miami','.microsoft','.mini','.mma','.moda','.moe','.monash','.money','.montblanc','.mormon','.mortgage','.moscow','.motorcycles','.mov','.movie','.movistar','.mtn','.mtpc','.nadex','.nagoya','.navy','.nec','.netbank','.network','.neustar','.new','.news','.nexus','.ngo','.nhk','.nico','.ninja','.nissan','.nra','.nrw','.ntt','.nyc','.office','.okinawa','.omega','.one','.ong','.onl','.online','.ooo','.oracle','.orange','.organic','.osaka','.otsuka','.ovh','.page','.panerai','.paris','.partners','.parts','.party','.pharmacy','.philips','.photo','.photos','.physio','.piaget','.pics','.pictet','.pictures','.pink','.pizza','.place','.play','.plumbing','.plus','.pohl','.poker','.porn','.post','.praxi','.press','.prod','.productions','.prof','.properties','.property','.pub','.qpon','.quebec','.racing','.realtor','.realty','.recipes','.red','.redstone','.rehab','.reise','.reisen','.reit','.ren','.rent','.rentals','.repair','.report','.republican','.rest','.restaurant','.review','.reviews','.rich','.ricoh','.rio','.rip','.rocks','.rodeo','.rs','.rsvp','.ruhr','.run','.ryukyu','.saarland','.sakura','.sale','.samsung','.sandvik','.sap','.sarl','.saxo','.sca','.scb','.school','.schule','.schwarz','.science','.seat','.sener','.services','.sew','.sex','.sexy','.shiksha','.shoes','.show','.shriram','.singles','.site','.ski','.sky','.skype','.sncf','.soccer','.social','.software','.sohu','.solar','.solutions','.sony','.soy','.space','.spiegel','.spreadbetting','.starhub','.statoil','.studio','.study','.style','.su','.sucks','.supplies','.supply','.support','.surf','.surgery','.suzuki','.swatch','.swiss','.sx','.sydney','.systems','.taipei','.tatar','.tattoo','.tax','.taxi','.team','.tech','.tel','.telefonica','.temasek','.tennis','.thd','.theater','.tickets','.tienda','.tires','.tirol','.tokyo','.tools','.top','.toray','.toshiba','.tours','.town','.toys','.trade','.trading','.training','.trust','.tui','.ubs','.university','.uno','.uol','.vacations','.vegas','.ventures','.versicherung','.vet','.viajes','.video','.villas','.vision','.vista','.vistaprint','.vlaanderen','.vodka','.vote','.voting','.voto','.voyage','.wales','.walter','.wang','.watch','.webcam','.website','.wed','.wedding','.weir','.wien','.wiki','.win','.windows','.wme','.work','.works','.world','.wtc','.wtf','.xbox','.xerox','.xin','.xxx','.xyz','.yandex','.youtube','.zip','.zone','.zuerich'];
	anchorme.checks = {};
	anchorme.checks.ip = function (str) {
		if (anchorme.occurrences(str, ".") > 2) {
			var IPArray = str.split(".");
			var oc1 = IPArray[0];
			var oc2 = IPArray[1];
			var oc3 = IPArray[2];
			if (IPArray[3].indexOf(":") > 0) {
				var i_colon = IPArray[3].indexOf(":");
				var oc4 = IPArray[3].substring(0, i_colon);
				var proOC = IPArray[3].substring(i_colon);
			}
			else if (IPArray[3].indexOf("/") > 0) {
				var i_FoSlash = IPArray[3].indexOf("/");
				var oc4 = IPArray[3].substring(0, i_FoSlash);
				var proOC = IPArray[3].substring(i_FoSlash);
			}
			else {
				var oc4 = IPArray[3];
				var proOC = false;
			}
			if (proOC === false || proOC.charAt(0) === "/" || proOC.charAt(0) === ":") {
				if (
					!isNaN(oc1) && 
					!isNaN(oc2) && 
					!isNaN(oc3) && 
					!isNaN(oc4) &&
					oc1 - 1 <= 254 &&
					oc2 - 1 <= 254 &&
					oc3 - 1 <= 254 &&
					oc4 - 1 <= 254 &&
					oc1.length > 0 &&
					oc2.length > 0 &&
					oc3.length > 0 &&
					oc4.length > 0
				) {return true;}
			} return false;
		} return false;
	};
	anchorme.checks.email = function (str,howManyTLDsToCheck) {
		str = str.toLowerCase();
		if (anchorme.occurrences(str, "@") == 1) {
			str = anchorme.removeCharifItEndsWithIt(str,".");
			str = anchorme.removeCharifItEndsWithIt(str,",");
			str = anchorme.removeCharifItEndsWithIt(str,";");
			var i_at = str.indexOf("@");
			var Ename = str.substring(0, i_at);
			var Eserver = str.substring(i_at + 1, str.length);
			
			var EmailAllowed = true;
			for (var x = 0; x < Ename.length; x++) {
				var char = Ename[x];
				if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.".indexOf(char) === -1) {
					x = Ename.length;
					EmailAllowed = false;
				}
			}
			
			for (var x = 0; x < Eserver.length; x++) {
				var cr = Eserver[x];
				if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:".indexOf(cr) === -1) {
					x = Eserver.length;
					EmailAllowed = false;
				}
			}
			
			if (EmailAllowed) {
				var validTLD = false;
				for (var x = 0; x < howManyTLDsToCheck; x++) {
					var d = anchorme.TLDs[x];
					if (str.endsWith(d)) {
						x = anchorme.TLDs.length;
						validTLD = true;
					}
				}
				if (validTLD === true) return true;
				else return false;
			} else return false;
		} return false;
	};
	anchorme.checks.url = function (str,howManyTLDsToCheck) {
		str = str.toLowerCase();
		if(str.indexOf(".") > 0 && (str.indexOf("/") > 3 || str.indexOf("/") < 0)) {
			str = anchorme.removeCharifItEndsWithIt(str,".");
			str = anchorme.removeCharifItEndsWithIt(str,",");
			str = anchorme.removeCharifItEndsWithIt(str,";");
			if(anchorme.occurrences(str,".") == 1 && str.indexOf(".") === str.length - 1) return false;
			var domainAllowed = true;
			if (str.indexOf("/") > 3) {
				var i_FoSlash = str.indexOf("/");
				var pre_slash = str.substring(0, i_FoSlash);
				if(pre_slash.indexOf("..") > -1) return false;
				for (var x = 0; x < pre_slash.length; x++) {
					var cr = pre_slash[x];
					if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:".indexOf(cr) === -1) {
						x = pre_slash.length;
						domainAllowed = false;
					}
				}
			} else {
				if(str.indexOf("..") > -1) return false;
				for (var x = 0; x < str.length; x++) {
					var cr = str[x];
					if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:".indexOf(cr) === -1) {
						x = str.length;
						domainAllowed = false;
					}
				}
			}
			if (domainAllowed) {
				if (str.endsWith(".com")) return true;
					for (var x = 0; x < howManyTLDsToCheck; x++) {
						var tld = anchorme.TLDs[x];
						if (str.endsWith(tld) || str.indexOf(tld+"/") > -1 || str.indexOf(tld+":") > -1) {
							x = anchorme.TLDs.length;
							return true;
						}
					}
					return false;
			} else return false;
		} else return false;
	};
	anchorme.order = function(input, options) {
		// split the input (the text we will work on) into an array
		// and do checks on each item of this array
		var splitedArray = input.split(" ");
		for (var i = 0; i < splitedArray.length; i++) {
			var fragment = splitedArray[i];
			var isurl = false;
			var protocol = false;
			
			/**
			 * 
			 * First check is to check the number of dots
			 * if there are more than 0 (i.e one or more)
			 * then this might by a URL
			 * else, this is surely not a URL
			 * 
			 **/
			if(fragment.indexOf(".") > -1) {
				/**
				 * second check, is to see if the fragment has any charecters
				 * that are not allowed neither in a URL, nor in an
				 * email, nor in an IP.
				 **/
				var allAllowed = true;
				var URLallowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=%";
				
				for (var x = 0; x < fragment.length; x++) {
					var cr = fragment[x];
					if (URLallowed.indexOf(cr) === -1) {
						x = fragment.length;
						allAllowed = false;
					}
				}
				if (allAllowed) {
					
					/**
					 * third check is to see if the fragment begins with
					 * a protocol, it it does, then it's a URL no other
					 * tests will be done.
					 **/
					
					if( 	options.urls 	&& 	(fragment.startsWith("http://") 	||	fragment.startsWith("HTTP://"))) 	isurl = true;
					else if(options.urls 	&&	(fragment.startsWith("https://") 	||	fragment.startsWith("HTTPS://"))) 	isurl = true;
					else if(options.urls 	&&	(fragment.startsWith("ftp://") 		||	fragment.startsWith("FTP://"))) 	isurl = true;
					else if(options.urls	&&	(fragment.startsWith("file:///") 	||	fragment.startsWith("FILE:///"))) 	isurl = true;
					else if(options.emails 	&&	(fragment.startsWith("mailto:") 	||	fragment.startsWith("MAILTO:"))) 	isurl = true;
					
					/**
					 * 
					 * Other checks are written in seperate functions
					 * they are:
					 * 	* a check for IP
					 * 	* a checK for email
					 * 	* a check for URL
					 **/
					
					else if (anchorme.checks.ip(fragment) && options.ips && fragment.indexOf(".") > 0) {
						isurl = true;
						protocol = options.defaultProtocol;
					}
					
					else if (anchorme.checks.email(fragment,options.TLDs) && options.emails && fragment.indexOf(".") > -1 && fragment.indexOf("@") > -1) {
						isurl = true;
						protocol = "mailto:";
					}
					
					else if (anchorme.checks.url(fragment,options.TLDs) && options.urls) {
						isurl = true;
						protocol = options.defaultProtocol;
					}
					
					/**
					 * 
					 * All checks are done now
					 * At this point, we either have a true value or false value
					 * of isurl
					 * if it's true, we need to modify the splittedArray fragment
					 * if it's false, no modifications will be done
					 * 
					 **/
					
					if (isurl) {
						
						var url = protocol ? protocol + fragment : fragment;
						
						url = anchorme.removeCharifItEndsWithIt(url,".");
						url = anchorme.removeCharifItEndsWithIt(url,",");
						url = anchorme.removeCharifItEndsWithIt(url,";");
						
						if (options.attributes) {
							splitedArray[i] = "<a href='" + url + "'";
							for (var name in options.attributes) {
								splitedArray[i] = splitedArray[i] + " " + name + "='" + options.attributes[name] + "' ";
							}
							splitedArray[i] = splitedArray[i] + ">" + fragment + "</a>";
						}
						else {
							splitedArray[i] = "<a href='" + url + "'>" + fragment + "</a>";
						}
					}
				}
			}
		}
		return splitedArray.join(" ");
	};
	
	// function to be called by user
	anchorme.js = function(str, options) {
		
		// Starts by assigning the default options
		// if the whole options object is ommited
		if(typeof options !== "object") {
			options = {
				"attributes":false,
				"html":true,
				ips:true,
				emails:true,
				urls:true,
				TLDs:20,
				defaultProtocol:"http://"
			};
		}
		
		// if some options were ommited and some options were given:
		else {
			if(typeof options.attributes 		!= "object") 	options.attributes = false;
			if(typeof options.html 				!= "boolean") 	options.html = true;
			if(typeof options.ips 				!= "boolean") 	options.ips = true;
			if(typeof options.emails 			!= "boolean") 	options.emails = true;
			if(typeof options.urls 				!= "boolean") 	options.urls = true;
			if(typeof options.TLDs 				!= "number") 	options.TLDs = 20;
			if(typeof options.defaultProtocol 	!= "string") 	options.defaultProtocol = "http://";
		}
		
		if(options.html){
			if(
				str.indexOf("</a>") 		> -1	||
				str.indexOf("<img ") 		> -1 	||
				str.indexOf("<blockquote ") > -1 	||
				str.indexOf("<del ") 		> -1 	||
				str.indexOf("<iframe ") 	> -1 	||
				str.indexOf("<script  ") 	> -1 	||
				str.indexOf("<audio ") 		> -1	||
				str.indexOf("<button ") 	> -1 	||
				str.indexOf("<command ") 	> -1 	||
				str.indexOf("<embed ") 		> -1 	||
				str.indexOf("<html ") 		> -1 	||
				str.indexOf("<video ") 		> -1 	||
				str.indexOf("<applet ") 	> -1 	||
				str.indexOf("<area ") 		> -1 	||
				str.indexOf("<base ") 		> -1 	||
				str.indexOf("<body ") 		> -1 	||
				str.indexOf("<frame ") 		> -1 	||
				str.indexOf("<head ") 		> -1 	||
				str.indexOf("<usemap ") 	> -1 	||
				str.indexOf("<link ") 		> -1 	||
				str.indexOf("<input ") 		> -1 	||
				str.indexOf("<source ") 	> -1 	||
				str.indexOf("<q ") 			> -1
			) str = anchorme.dontbreakHTML(str);
		}
		
		/**
		 * 
		 * Since anchorme.js runs by seperating words by spaces,
		 * we have to take in consideration if there were other
		 * charecters seperating the URL from other words,
		 * such as: line breaks, braces and angle brackets
		 * 
		 **/
		
		str = str.split("\n").join(" \n ");
		str = str.split("(").join(" ( ");
		str = str.split(")").join(" ) ");
		str = str.split("<").join(" < ");
		str = str.split(">").join(" > ");
		
		/**
		 * 
		 * The "order" method will actually do all the heavy lifting
		 * and return the end result
		 * 
		 **/
		 
		var result = anchorme.order(str, options);
		
		/**
		 * 
		 * After getting the end result, we need to remove
		 * the extra spaces we added from the result
		 * 
		 **/
		
		result = result.split(" \n ").join("\n");
		result = result.split(" ( ").join("(");
		result = result.split(" ) ").join(")");
		result = result.split(" < ").join("<");
		result = result.split(" > ").join(">");
		
		// return the result
		return result;
	};
	
	
	// check js environment
	if (typeof exports !== "undefined") {
		// nodejs env
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = anchorme;
		}
		exports.anchorme = anchorme;
	}
	else {
		// requirejs env (optional)
		if (typeof define === "function" && define.amd) {
			define("anchorme", [], function() {
				return anchorme;
			});
		}
		else {
			// browser env
			window.anchorme = anchorme;
		}
	}

})(typeof window === 'object' ? window : this /* it runs in node */ );