(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.anchorme = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Options defaulting function
 *
**/
function defaultOptions(options) {
    if (!options) {
        options = {
            attributes: [],
            ips: true,
            emails: true,
            urls: true,
            files: true,
            truncate: Infinity,
            defaultProtocol: "http://",
            list: false
        };
    }
    if (typeof options.attributes !== "object")
        { options.attributes = []; }
    if (typeof options.ips !== "boolean")
        { options.ips = true; }
    if (typeof options.emails !== "boolean")
        { options.emails = true; }
    if (typeof options.urls !== "boolean")
        { options.urls = true; }
    if (typeof options.files !== "boolean")
        { options.files = true; }
    if (typeof options.list !== "boolean")
        { options.list = false; }
    if (typeof options.defaultProtocol !== "string" && typeof options.defaultProtocol !== "function")
        { options.defaultProtocol = "http://"; }
    if (typeof options.truncate !== "number" && (typeof options.truncate !== "object" || options.truncate === null))
        { options.truncate = Infinity; }
    return options;
}
exports.defaultOptions = defaultOptions;
/**
 *
 * Returns whether passed string
 * can be a valid port number or not
 *
**/
function isPort(value) {
    if (isNaN(Number(value)))
        { return false; }
    if ((Number(value)) > 65535)
        { return false; }
    else
        { return true; }
}
exports.isPort = isPort;
});

var lists = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tlds = ["com", "org", "net", "uk", "gov", "edu", "io", "cc", "co", "aaa", "aarp", "abarth", "abb", "abbott", "abbvie", "abc", "able", "abogado", "abudhabi", "ac", "academy", "accenture", "accountant", "accountants", "aco", "active", "actor", "ad", "adac", "ads", "adult", "ae", "aeg", "aero", "aetna", "af", "afamilycompany", "afl", "africa", "ag", "agakhan", "agency", "ai", "aig", "aigo", "airbus", "airforce", "airtel", "akdn", "al", "alfaromeo", "alibaba", "alipay", "allfinanz", "allstate", "ally", "alsace", "alstom", "am", "americanexpress", "americanfamily", "amex", "amfam", "amica", "amsterdam", "analytics", "android", "anquan", "anz", "ao", "aol", "apartments", "app", "apple", "aq", "aquarelle", "ar", "aramco", "archi", "army", "arpa", "art", "arte", "as", "asda", "asia", "associates", "at", "athleta", "attorney", "au", "auction", "audi", "audible", "audio", "auspost", "author", "auto", "autos", "avianca", "aw", "aws", "ax", "axa", "az", "azure", "ba", "baby", "baidu", "banamex", "bananarepublic", "band", "bank", "bar", "barcelona", "barclaycard", "barclays", "barefoot", "bargains", "baseball", "basketball", "bauhaus", "bayern", "bb", "bbc", "bbt", "bbva", "bcg", "bcn", "bd", "be", "beats", "beauty", "beer", "bentley", "berlin", "best", "bestbuy", "bet", "bf", "bg", "bh", "bharti", "bi", "bible", "bid", "bike", "bing", "bingo", "bio", "biz", "bj", "black", "blackfriday", "blanco", "blockbuster", "blog", "bloomberg", "blue", "bm", "bms", "bmw", "bn", "bnl", "bnpparibas", "bo", "boats", "boehringer", "bofa", "bom", "bond", "boo", "book", "booking", "boots", "bosch", "bostik", "boston", "bot", "boutique", "box", "br", "bradesco", "bridgestone", "broadway", "broker", "brother", "brussels", "bs", "bt", "budapest", "bugatti", "build", "builders", "business", "buy", "buzz", "bv", "bw", "by", "bz", "bzh", "ca", "cab", "cafe", "cal", "call", "calvinklein", "cam", "camera", "camp", "cancerresearch", "canon", "capetown", "capital", "capitalone", "car", "caravan", "cards", "care", "career", "careers", "cars", "cartier", "casa", "case", "caseih", "cash", "casino", "cat", "catering", "catholic", "cba", "cbn", "cbre", "cbs", "cd", "ceb", "center", "ceo", "cern", "cf", "cfa", "cfd", "cg", "ch", "chanel", "channel", "chase", "chat", "cheap", "chintai", "chloe", "christmas", "chrome", "chrysler", "church", "ci", "cipriani", "circle", "cisco", "citadel", "citi", "citic", "city", "cityeats", "ck", "cl", "claims", "cleaning", "click", "clinic", "clinique", "clothing", "cloud", "club", "clubmed", "cm", "cn", "coach", "codes", "coffee", "college", "cologne", "comcast", "commbank", "community", "company", "compare", "computer", "comsec", "condos", "construction", "consulting", "contact", "contractors", "cooking", "cookingchannel", "cool", "coop", "corsica", "country", "coupon", "coupons", "courses", "cr", "credit", "creditcard", "creditunion", "cricket", "crown", "crs", "cruise", "cruises", "csc", "cu", "cuisinella", "cv", "cw", "cx", "cy", "cymru", "cyou", "cz", "dabur", "dad", "dance", "data", "date", "dating", "datsun", "day", "dclk", "dds", "de", "deal", "dealer", "deals", "degree", "delivery", "dell", "deloitte", "delta", "democrat", "dental", "dentist", "desi", "design", "dev", "dhl", "diamonds", "diet", "digital", "direct", "directory", "discount", "discover", "dish", "diy", "dj", "dk", "dm", "dnp", "do", "docs", "doctor", "dodge", "dog", "doha", "domains", "dot", "download", "drive", "dtv", "dubai", "duck", "dunlop", "duns", "dupont", "durban", "dvag", "dvr", "dz", "earth", "eat", "ec", "eco", "edeka", "education", "ee", "eg", "email", "emerck", "energy", "engineer", "engineering", "enterprises", "epost", "epson", "equipment", "er", "ericsson", "erni", "es", "esq", "estate", "esurance", "et", "eu", "eurovision", "eus", "events", "everbank", "exchange", "expert", "exposed", "express", "extraspace", "fage", "fail", "fairwinds", "faith", "family", "fan", "fans", "farm", "farmers", "fashion", "fast", "fedex", "feedback", "ferrari", "ferrero", "fi", "fiat", "fidelity", "fido", "film", "final", "finance", "financial", "fire", "firestone", "firmdale", "fish", "fishing", "fit", "fitness", "fj", "fk", "flickr", "flights", "flir", "florist", "flowers", "fly", "fm", "fo", "foo", "food", "foodnetwork", "football", "ford", "forex", "forsale", "forum", "foundation", "fox", "fr", "free", "fresenius", "frl", "frogans", "frontdoor", "frontier", "ftr", "fujitsu", "fujixerox", "fun", "fund", "furniture", "futbol", "fyi", "ga", "gal", "gallery", "gallo", "gallup", "game", "games", "gap", "garden", "gb", "gbiz", "gd", "gdn", "ge", "gea", "gent", "genting", "george", "gf", "gg", "ggee", "gh", "gi", "gift", "gifts", "gives", "giving", "gl", "glade", "glass", "gle", "global", "globo", "gm", "gmail", "gmbh", "gmo", "gmx", "gn", "godaddy", "gold", "goldpoint", "golf", "goo", "goodhands", "goodyear", "goog", "google", "gop", "got", "gp", "gq", "gr", "grainger", "graphics", "gratis", "green", "gripe", "group", "gs", "gt", "gu", "guardian", "gucci", "guge", "guide", "guitars", "guru", "gw", "gy", "hair", "hamburg", "hangout", "haus", "hbo", "hdfc", "hdfcbank", "health", "healthcare", "help", "helsinki", "here", "hermes", "hgtv", "hiphop", "hisamitsu", "hitachi", "hiv", "hk", "hkt", "hm", "hn", "hockey", "holdings", "holiday", "homedepot", "homegoods", "homes", "homesense", "honda", "honeywell", "horse", "hospital", "host", "hosting", "hot", "hoteles", "hotmail", "house", "how", "hr", "hsbc", "ht", "htc", "hu", "hughes", "hyatt", "hyundai", "ibm", "icbc", "ice", "icu", "id", "ie", "ieee", "ifm", "ikano", "il", "im", "imamat", "imdb", "immo", "immobilien", "in", "industries", "infiniti", "info", "ing", "ink", "institute", "insurance", "insure", "int", "intel", "international", "intuit", "investments", "ipiranga", "iq", "ir", "irish", "is", "iselect", "ismaili", "ist", "istanbul", "it", "itau", "itv", "iveco", "iwc", "jaguar", "java", "jcb", "jcp", "je", "jeep", "jetzt", "jewelry", "jio", "jlc", "jll", "jm", "jmp", "jnj", "jo", "jobs", "joburg", "jot", "joy", "jp", "jpmorgan", "jprs", "juegos", "juniper", "kaufen", "kddi", "ke", "kerryhotels", "kerrylogistics", "kerryproperties", "kfh", "kg", "kh", "ki", "kia", "kim", "kinder", "kindle", "kitchen", "kiwi", "km", "kn", "koeln", "komatsu", "kosher", "kp", "kpmg", "kpn", "kr", "krd", "kred", "kuokgroup", "kw", "ky", "kyoto", "kz", "la", "lacaixa", "ladbrokes", "lamborghini", "lamer", "lancaster", "lancia", "lancome", "land", "landrover", "lanxess", "lasalle", "lat", "latino", "latrobe", "law", "lawyer", "lb", "lc", "lds", "lease", "leclerc", "lefrak", "legal", "lego", "lexus", "lgbt", "li", "liaison", "lidl", "life", "lifeinsurance", "lifestyle", "lighting", "like", "lilly", "limited", "limo", "lincoln", "linde", "link", "lipsy", "live", "living", "lixil", "lk", "loan", "loans", "locker", "locus", "loft", "lol", "london", "lotte", "lotto", "love", "lpl", "lplfinancial", "lr", "ls", "lt", "ltd", "ltda", "lu", "lundbeck", "lupin", "luxe", "luxury", "lv", "ly", "ma", "macys", "madrid", "maif", "maison", "makeup", "man", "management", "mango", "market", "marketing", "markets", "marriott", "marshalls", "maserati", "mattel", "mba", "mc", "mcd", "mcdonalds", "mckinsey", "md", "me", "med", "media", "meet", "melbourne", "meme", "memorial", "men", "menu", "meo", "metlife", "mg", "mh", "miami", "microsoft", "mil", "mini", "mint", "mit", "mitsubishi", "mk", "ml", "mlb", "mls", "mm", "mma", "mn", "mo", "mobi", "mobile", "mobily", "moda", "moe", "moi", "mom", "monash", "money", "monster", "montblanc", "mopar", "mormon", "mortgage", "moscow", "moto", "motorcycles", "mov", "movie", "movistar", "mp", "mq", "mr", "ms", "msd", "mt", "mtn", "mtpc", "mtr", "mu", "museum", "mutual", "mv", "mw", "mx", "my", "mz", "na", "nab", "nadex", "nagoya", "name", "nationwide", "natura", "navy", "nba", "nc", "ne", "nec", "netbank", "netflix", "network", "neustar", "new", "newholland", "news", "next", "nextdirect", "nexus", "nf", "nfl", "ng", "ngo", "nhk", "ni", "nico", "nike", "nikon", "ninja", "nissan", "nissay", "nl", "no", "nokia", "northwesternmutual", "norton", "now", "nowruz", "nowtv", "np", "nr", "nra", "nrw", "ntt", "nu", "nyc", "nz", "obi", "observer", "off", "office", "okinawa", "olayan", "olayangroup", "oldnavy", "ollo", "om", "omega", "one", "ong", "onl", "online", "onyourside", "ooo", "open", "oracle", "orange", "organic", "orientexpress", "origins", "osaka", "otsuka", "ott", "ovh", "pa", "page", "pamperedchef", "panasonic", "panerai", "paris", "pars", "partners", "parts", "party", "passagens", "pay", "pccw", "pe", "pet", "pf", "pfizer", "pg", "ph", "pharmacy", "philips", "phone", "photo", "photography", "photos", "physio", "piaget", "pics", "pictet", "pictures", "pid", "pin", "ping", "pink", "pioneer", "pizza", "pk", "pl", "place", "play", "playstation", "plumbing", "plus", "pm", "pn", "pnc", "pohl", "poker", "politie", "porn", "post", "pr", "pramerica", "praxi", "press", "prime", "pro", "prod", "productions", "prof", "progressive", "promo", "properties", "property", "protection", "pru", "prudential", "ps", "pt", "pub", "pw", "pwc", "py", "qa", "qpon", "quebec", "quest", "qvc", "racing", "radio", "raid", "re", "read", "realestate", "realtor", "realty", "recipes", "red", "redstone", "redumbrella", "rehab", "reise", "reisen", "reit", "reliance", "ren", "rent", "rentals", "repair", "report", "republican", "rest", "restaurant", "review", "reviews", "rexroth", "rich", "richardli", "ricoh", "rightathome", "ril", "rio", "rip", "rmit", "ro", "rocher", "rocks", "rodeo", "rogers", "room", "rs", "rsvp", "ru", "ruhr", "run", "rw", "rwe", "ryukyu", "sa", "saarland", "safe", "safety", "sakura", "sale", "salon", "samsclub", "samsung", "sandvik", "sandvikcoromant", "sanofi", "sap", "sapo", "sarl", "sas", "save", "saxo", "sb", "sbi", "sbs", "sc", "sca", "scb", "schaeffler", "schmidt", "scholarships", "school", "schule", "schwarz", "science", "scjohnson", "scor", "scot", "sd", "se", "seat", "secure", "security", "seek", "select", "sener", "services", "ses", "seven", "sew", "sex", "sexy", "sfr", "sg", "sh", "shangrila", "sharp", "shaw", "shell", "shia", "shiksha", "shoes", "shop", "shopping", "shouji", "show", "showtime", "shriram", "si", "silk", "sina", "singles", "site", "sj", "sk", "ski", "skin", "sky", "skype", "sl", "sling", "sm", "smart", "smile", "sn", "sncf", "so", "soccer", "social", "softbank", "software", "sohu", "solar", "solutions", "song", "sony", "soy", "space", "spiegel", "spot", "spreadbetting", "sr", "srl", "srt", "st", "stada", "staples", "star", "starhub", "statebank", "statefarm", "statoil", "stc", "stcgroup", "stockholm", "storage", "store", "stream", "studio", "study", "style", "su", "sucks", "supplies", "supply", "support", "surf", "surgery", "suzuki", "sv", "swatch", "swiftcover", "swiss", "sx", "sy", "sydney", "symantec", "systems", "sz", "tab", "taipei", "talk", "taobao", "target", "tatamotors", "tatar", "tattoo", "tax", "taxi", "tc", "tci", "td", "tdk", "team", "tech", "technology", "tel", "telecity", "telefonica", "temasek", "tennis", "teva", "tf", "tg", "th", "thd", "theater", "theatre", "tiaa", "tickets", "tienda", "tiffany", "tips", "tires", "tirol", "tj", "tjmaxx", "tjx", "tk", "tkmaxx", "tl", "tm", "tmall", "tn", "to", "today", "tokyo", "tools", "top", "toray", "toshiba", "total", "tours", "town", "toyota", "toys", "tr", "trade", "trading", "training", "travel", "travelchannel", "travelers", "travelersinsurance", "trust", "trv", "tt", "tube", "tui", "tunes", "tushu", "tv", "tvs", "tw", "tz", "ua", "ubank", "ubs", "uconnect", "ug", "unicom", "university", "uno", "uol", "ups", "us", "uy", "uz", "va", "vacations", "vana", "vanguard", "vc", "ve", "vegas", "ventures", "verisign", "versicherung", "vet", "vg", "vi", "viajes", "video", "vig", "viking", "villas", "vin", "vip", "virgin", "visa", "vision", "vista", "vistaprint", "viva", "vivo", "vlaanderen", "vn", "vodka", "volkswagen", "volvo", "vote", "voting", "voto", "voyage", "vu", "vuelos", "wales", "walmart", "walter", "wang", "wanggou", "warman", "watch", "watches", "weather", "weatherchannel", "webcam", "weber", "website", "wed", "wedding", "weibo", "weir", "wf", "whoswho", "wien", "wiki", "williamhill", "win", "windows", "wine", "winners", "wme", "wolterskluwer", "woodside", "work", "works", "world", "wow", "ws", "wtc", "wtf", "xbox", "xerox", "xfinity", "xihuan", "xin", "xn--11b4c3d", "xn--1ck2e1b", "xn--1qqw23a", "xn--30rr7y", "xn--3bst00m", "xn--3ds443g", "xn--3e0b707e", "xn--3oq18vl8pn36a", "xn--3pxu8k", "xn--42c2d9a", "xn--45brj9c", "xn--45q11c", "xn--4gbrim", "xn--54b7fta0cc", "xn--55qw42g", "xn--55qx5d", "xn--5su34j936bgsg", "xn--5tzm5g", "xn--6frz82g", "xn--6qq986b3xl", "xn--80adxhks", "xn--80ao21a", "xn--80aqecdr1a", "xn--80asehdb", "xn--80aswg", "xn--8y0a063a", "xn--90a3ac", "xn--90ae", "xn--90ais", "xn--9dbq2a", "xn--9et52u", "xn--9krt00a", "xn--b4w605ferd", "xn--bck1b9a5dre4c", "xn--c1avg", "xn--c2br7g", "xn--cck2b3b", "xn--cg4bki", "xn--clchc0ea0b2g2a9gcd", "xn--czr694b", "xn--czrs0t", "xn--czru2d", "xn--d1acj3b", "xn--d1alf", "xn--e1a4c", "xn--eckvdtc9d", "xn--efvy88h", "xn--estv75g", "xn--fct429k", "xn--fhbei", "xn--fiq228c5hs", "xn--fiq64b", "xn--fiqs8s", "xn--fiqz9s", "xn--fjq720a", "xn--flw351e", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--fzys8d69uvgm", "xn--g2xx48c", "xn--gckr3f0f", "xn--gecrj9c", "xn--gk3at1e", "xn--h2brj9c", "xn--hxt814e", "xn--i1b6b1a6a2e", "xn--imr513n", "xn--io0a7i", "xn--j1aef", "xn--j1amh", "xn--j6w193g", "xn--jlq61u9w7b", "xn--jvr189m", "xn--kcrx77d1x4a", "xn--kprw13d", "xn--kpry57d", "xn--kpu716f", "xn--kput3i", "xn--l1acc", "xn--lgbbat1ad8j", "xn--mgb9awbf", "xn--mgba3a3ejt", "xn--mgba3a4f16a", "xn--mgba7c0bbn0a", "xn--mgbaam7a8h", "xn--mgbab2bd", "xn--mgbai9azgqp6j", "xn--mgbayh7gpa", "xn--mgbb9fbpob", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgbca7dzdo", "xn--mgberp4a5d4ar", "xn--mgbi4ecexp", "xn--mgbpl2fh", "xn--mgbt3dhd", "xn--mgbtx2b", "xn--mgbx4cd0ab", "xn--mix891f", "xn--mk1bu44c", "xn--mxtq1m", "xn--ngbc5azd", "xn--ngbe9e0a", "xn--node", "xn--nqv7f", "xn--nqv7fs00ema", "xn--nyqy26a", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1acf", "xn--p1ai", "xn--pbt977c", "xn--pgbs0dh", "xn--pssy2u", "xn--q9jyb4c", "xn--qcka1pmc", "xn--qxam", "xn--rhqv96g", "xn--rovu88b", "xn--s9brj9c", "xn--ses554g", "xn--t60b56a", "xn--tckwe", "xn--tiq49xqyj", "xn--unup4y", "xn--vermgensberater-ctb", "xn--vermgensberatung-pwb", "xn--vhquv", "xn--vuq861b", "xn--w4r85el8fhu5dnra", "xn--w4rs40l", "xn--wgbh1c", "xn--wgbl6a", "xn--xhq521b", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--y9a3aq", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zfr164b", "xperia", "xxx", "xyz", "yachts", "yahoo", "yamaxun", "yandex", "ye", "yodobashi", "yoga", "yokohama", "you", "youtube", "yt", "yun", "za", "zappos", "zara", "zero", "zip", "zippo", "zm", "zone", "zuerich", "zw"];
exports.htmlAttrs = ["src=", "data=", "href=", "cite=", "formaction=", "icon=", "manifest=", "poster=", "codebase=", "background=", "profile=", "usemap="];
});

var email = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// pattern that an emails MUST have
var pattern = /^[a-z0-9!#$%&'*+\-/=?^_`{|}~.]+@([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?$/i;
// patterns that an email can not have
var negativePatterns = [
    /^[!#$%&'*+\-/=?^_`{|}~.]/,
    /[.]{2,}[a-z0-9!#$%&'*+\-/=?^_`{|}~.]+@/i,
    /\.@/
];
function default_1(str) {
    // general pattern recognition
    var match = str.match(pattern);
    if (match === null)
        { return false; }
    // doesn't have a negative pattern
    for (var i = negativePatterns.length - 1; i >= 0; i--) {
        if (negativePatterns[i].test(str))
            { return false; }
    }
    // valid TLD
    var tld = match[2];
    if (!tld)
        { return false; }
    if (lists.tlds.indexOf(tld) === -1)
        { return false; }
    return true;
}
exports.default = default_1;
});

var ip = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

// general IP pattern https://regex101.com/r/rzUcJ4/1
var pattern = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;
function default_1(str) {
    if (!pattern.test(str))
        { return false; }
    var IPArray = str.split(".");
    // validate oc1
    var oc1 = Number(IPArray[0]);
    if ((isNaN(oc1)) || oc1 > 255 || oc1 < 0)
        { return false; }
    // validate oc2
    var oc2 = Number(IPArray[1]);
    if ((isNaN(oc2)) || oc2 > 255 || oc2 < 0)
        { return false; }
    // validate oc3
    var oc3 = Number(IPArray[2]);
    if ((isNaN(oc3)) || oc3 > 255 || oc3 < 0)
        { return false; }
    // validate oc4
    var oc4 = Number((IPArray[3].match(/^\d+/) || [])[0]);
    if ((isNaN(oc4)) || oc4 > 255 || oc4 < 0)
        { return false; }
    // validate port
    var port = (IPArray[3].match(/(^\d+)(:)(\d+)/) || [])[3];
    if (port && (!util.isPort(port)))
        { return false; }
    return true;
}
exports.default = default_1;
});

var url = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var pattern = /^(https?:\/\/|ftps?:\/\/)?([a-z0-9%\-]+\.){1,}([a-z0-9\-]+)?(:(\d{1,5}))?(\/([a-z0-9\-._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+)?)?$/i;
function default_1(str) {
    // general pattern recognition https://regex101.com/r/RgKTA4/2
    var match = str.match(pattern);
    if (match === null)
        { return false; }
    // validate TLD
    if (typeof match[3] !== "string")
        { return false; }
    if (lists.tlds.indexOf(match[3].toLowerCase()) === -1)
        { return false; }
    // validate port
    if (match[5] && (!util.isPort(match[5])))
        { return false; }
    return true;
}
exports.default = default_1;
});

var fix = createCommonjsModule(function (module, exports) {
/**
 *
 * @hack
 *
 * This is a dirty hack to fix URLs that have parenthesis and quotation marks in them
 * For example take this paragraph:
 *
 * """"
 * I visited this url: "http://www.wikipedia.com/some_article(with_paranthesis)"
 * and this URL: (http://www.wikipedia.com/some_article(with_paranthesis))
 * """"
 *
 * The quotation marks `'` `"` and parenthesis `(` `)` `[` `]`
 * can be considered to be part of the URL, and as a
 * punctuation marks surrounding the URL.
 * While this hack works for the most part, it's quite dirty and
 * I may replace it with something better in the future.
 *
 *
 * Another fix is removing punctuation marks that may appear at the end of URL
 * Example:
 *
 * """"
 * I've visited google.com, facebook.com, and yahoo.com.
 * """"
 *
 * @todo: replace the following function with something cleaner.
 *
 *
**/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fixSeparators(arr, sep1, sep2) {
    arr.forEach(function (bit, i) {
        if ((bit.indexOf(".") > -1) &&
            (!(arr[i - 1] === sep1 && arr[i + 1] === sep2)) &&
            (arr[i + 1] === sep1 || arr[i + 1] === sep2) // the one after it, is either sep1 or sep2
        ) {
            arr[i] = arr[i] + arr[i + 1];
            if (typeof arr[i + 2] === "string")
                { arr[i] = arr[i] + arr[i + 2]; }
            if (typeof arr[i + 3] === "string")
                { arr[i] = arr[i] + arr[i + 3]; }
            if (typeof arr[i + 4] === "string")
                { arr[i] = arr[i] + arr[i + 4]; }
            arr.splice(i + 1, 4);
            fixSeparators(arr, sep1, sep2);
        }
    });
    return arr;
}
exports.fixSeparators = fixSeparators;
function default_1(arr) {
    arr = fixSeparators(arr, "(", ")");
    arr = fixSeparators(arr, "[", "]");
    arr = fixSeparators(arr, "\"", "\"");
    arr = fixSeparators(arr, "'", "'");
    return arr;
}
exports.default = default_1;
});

var separate_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

/**
 *
 * Split the string with word separators
 * such as punctuation marks and spaces
 *
**/
function separate(input) {
    var splitted = input
        .replace(/([\s\(\)\[\]<>"'])/g, "\0$1\0")
        .replace(/([?;:,.!]+)(?=(\0|$|\s))/g, "\0$1\0")
        .split("\0");
    var fixed = fix.default(splitted);
    return fixed;
}
exports.separate = separate;
/**
 *
 * Join the resulting array into a string
 *
**/
function deSeparate(input) {
    return input.join("");
}
exports.deSeparate = deSeparate;
});

var hasprotocol = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(str) {
    str = str.toLowerCase();
    if (str.indexOf("http://") === 0)
        { return "http://"; }
    else if (str.indexOf("https://") === 0)
        { return "https://"; }
    else if (str.indexOf("ftp://") === 0)
        { return "ftp://"; }
    else if (str.indexOf("ftps://") === 0)
        { return "ftps://"; }
    else if (str.indexOf("file:///") === 0)
        { return "file:///"; }
    else if (str.indexOf("mailto:") === 0)
        { return "mailto:"; }
    else
        { return false; }
}
exports.default = default_1;
});

var identify = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });





function default_1(inputArr, options) {
    return inputArr.map(function (fragment, index) {
        var encoded = encodeURI(fragment);
        // quick validations
        // 1
        if (encoded.indexOf(".") < 1 && (!hasprotocol.default(encoded)))
            { return fragment; }
        var urlObj = null;
        var protocol = hasprotocol.default(encoded) || "";
        // remove the protocol before proceeding to any other test
        if (protocol)
            { encoded = encoded.substr(protocol.length); }
        // test 1: it's a file
        if (options.files && protocol === "file:///" && encoded.split(/\/|\\/).length - 1) {
            urlObj = {
                reason: "file",
                protocol: protocol,
                raw: fragment,
                encoded: encoded,
            };
        }
        // test 2: it's a URL
        if ((!urlObj) && options.urls && url.default(encoded)) {
            urlObj = {
                reason: "url",
                protocol: protocol ? protocol : typeof options.defaultProtocol === "function" ? options.defaultProtocol(fragment) : options.defaultProtocol,
                raw: fragment,
                encoded: encoded,
            };
        }
        // test 3: it's an email
        if ((!urlObj) && options.emails && email.default(encoded)) {
            urlObj = {
                reason: "email",
                protocol: "mailto:",
                raw: fragment,
                encoded: encoded,
            };
        }
        // test 4: it's an IP
        if ((!urlObj) && options.ips && ip.default(encoded)) {
            urlObj = {
                reason: "ip",
                protocol: protocol ? protocol : typeof options.defaultProtocol === "function" ? options.defaultProtocol(fragment) : options.defaultProtocol,
                raw: fragment,
                encoded: encoded,
            };
        }
        if (!urlObj)
            { return fragment; }
        else {
            if ((inputArr[index - 1] === "'" || inputArr[index - 1] === '"') && ~lists.htmlAttrs.indexOf(inputArr[index - 2]))
                { return fragment; }
            return urlObj;
        }
    });
}
exports.default = default_1;
});

var transform = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var separate_2 = separate_1;
function default_1(str, options) {
    var arr = separate_2.separate(str);
    var identified = identify.default(arr, options);
    // custom filtering-out function
    if (options.exclude) {
        for (var index = 0; index < identified.length; index++) {
            var element = identified[index];
            if (typeof element === "object" && options.exclude(element))
                { identified[index] = element.raw; }
        }
    }
    // return the current list (with words being filtered out)
    if (options.list) {
        var listed = [];
        for (var i = 0; i < identified.length; i++) {
            var fragment = identified[i];
            if (typeof fragment !== "string")
                { listed.push(fragment); }
        }
        return listed;
    }
    // transform objects to HTML tags
    identified = identified.map(function (fragment) {
        if (typeof fragment === "string")
            { return fragment; }
        return url2tag(fragment, options);
    });
    // join and return
    return separate_1.deSeparate(identified);
}
exports.default = default_1;
function url2tag(fragment, options) {
    var href = fragment.protocol + fragment.encoded;
    var original = fragment.raw;
    if (typeof options.truncate === "number") {
        if (original.length > options.truncate)
            { original = original.substring(0, options.truncate) + "..."; }
    }
    if (typeof options.truncate === "object") {
        if (original.length > (options.truncate[0] + options.truncate[1]))
            { original = original.substr(0, options.truncate[0]) + "..." + original.substr(original.length - options.truncate[1]); }
    }
    if (options.attributes === undefined)
        { options.attributes = []; }
    return "<a href=\"" + href + "\" " + options.attributes.map(function (attribute) {
        if (typeof attribute === 'function') {
            var name = (attribute(fragment) || {}).name;
            var value = (attribute(fragment) || {}).value;
            if (name && !value)
                { return " name "; }
            if (name && value)
                { return " " + name + "=\"" + value + "\" "; }
        }
        else
            { return " " + attribute.name + "=\"" + attribute.value + "\" "; }
    }).join("") + ">" + original + "</a>";
}
});

var index = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






var anchorme = function (str, options) {
    options = util.defaultOptions(options);
    var result = transform.default(str, options);
    return result;
};
// exposing few functions for extra uses
anchorme.validate = {
    ip: ip.default,
    url: function (input) {
        // simple wrapper that does what "identify.ts" does initially
        // remove the protocal
        var protocol = hasprotocol.default(input) || "";
        input = input.substr(protocol.length);
        input = encodeURI(input);
        return url.default(input);
    },
    email: email.default
};
exports.default = anchorme;
});

var index$1 = unwrapExports(index);

return index$1;

})));
