/*!
* Anchorme.js
* 0.3
*
* Copyright(c) 2015 Ali Saleem <ali.a.saleem@outlook.com>
* MIT Licensed. http://www.opensource.org/licenses/mit-license.php
*
* https://github.com/ali-saleem/anchorme.js
*/

var anchorme = {};
anchorme.occurrences = function (string, subString, allowOverlapping){

    string+=""; subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
};

anchorme.dontbreakHTML = function (str, tag, atributeWithURL) {
    var openingChars = "<"+tag+" ";
    var elemArr = str.split(">");
    for (var i = elemArr.length; i--; ) {
            var oneLine = elemArr[i].split(openingChars).pop().split(">").shift();
            var href_i = oneLine.indexOf(atributeWithURL);
            if (oneLine.charAt(href_i + 5) === "'" || oneLine.charAt(href_i + 5) === '"') {var frstQ_i = href_i + 5;         var Qmark = oneLine.charAt(frstQ_i)}
            else if (oneLine.charAt(href_i + 6) === "'" || oneLine.charAt(href_i + 6) === '"') {var frstQ_i = href_i + 6;    var Qmark = oneLine.charAt(frstQ_i)}
            else if (oneLine.charAt(href_i + 7) === "'" || oneLine.charAt(href_i + 7) === '"') {var frstQ_i = href_i + 7;    var Qmark = oneLine.charAt(frstQ_i)}
            var lenTofrstQ = frstQ_i + 1;
            var strFromfrstQ = oneLine.slice(lenTofrstQ);
            var scndQ_i = strFromfrstQ.indexOf(Qmark) + lenTofrstQ;
            var WS = oneLine.slice(href_i,scndQ_i + 1);
            var noWS = WS.split(" ").join("");
            elemArr[i] = elemArr[i].replace(WS,noWS);
    }
    return elemArr.join(">");
};

anchorme.order = function (str,seperator,addattrs) {
    var splitedArray = str.split(seperator);
    for (var i = 0; i < splitedArray.length; i++) {
        var isurl = false;
        var Protocol = false;
        var nextCheck;
        var allAllowed = true;
        var URLallowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=";
        var NAllowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.";
        var SAllowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:";
        var sm = splitedArray[i].toLowerCase();

        for (var x = 0; x < sm.length; x++) {
            var cr = sm[x];
            if (URLallowed.indexOf(cr) === -1) {x=sm.length;allAllowed = false}
        }
        
        if (allAllowed) {
            var i_http = sm.indexOf("http:/");
            var i_https = sm.indexOf("https:/");
            var i_ftp = sm.indexOf("ftp:/");
            var i_file = sm.indexOf("file:/");
            var TLDs = [".com", ".net", ".org", ".edu", ".gov", ".uk", ".ca", ".de", ".jp", ".info", ".cn", ".fr", ".in", ".pl", ".au", ".us", ".ru", ".ch", ".it", ".nl", ".se", ".no", ".es", ".mil", ".guru", ".berlin", ".photography", ".tips", ".today", ".email", ".technology", ".company", ".clothing", ".ir", ".biz", ".cz", ".kr", ".eu",  ".ua", ".za", ".co", ".gr", ".ro", ".tw", ".mx",  ".vn", ".at", ".dk", ".tv", ".me", ".hu", ".ar",  ".sk", ".fi", ".cl", ".id", ".nz", ".cc", ".pt", ".by", ".il", ".ie", ".my", ".mobi", ".ws", ".pro", ".asia", ".abb", ".abbott", ".abogado", ".ac", ".academy", ".accenture", ".accountant", ".accountants", ".active", ".actor", ".ad", ".ads", ".adult", ".ae", ".aeg", ".aero", ".af", ".afl", ".ag", ".agency", ".ai", ".aig", ".airforce", ".airtel", ".al", ".allfinanz", ".alsace", ".am", ".amsterdam", ".an", ".android", ".ao", ".apartments", ".app", ".aq", ".aquarelle",  ".archi", ".army", ".arpa", ".as", ".associates",  ".attorney", ".auction", ".audio", ".auto", ".autos", ".aw", ".ax", ".axa", ".az", ".azure", ".ba", ".band", ".bank", ".bar", ".barcelona", ".barclaycard", ".barclays", ".bargains", ".bauhaus", ".bayern", ".bb", ".bbc", ".bbva", ".bcn", ".bd", ".be", ".beer", ".bentley",  ".best", ".bf", ".bg", ".bh", ".bharti", ".bi", ".bible", ".bid", ".bike", ".bing", ".bingo", ".bio",  ".bj", ".black", ".blackfriday", ".bloomberg", ".blue", ".bm", ".bmw", ".bn", ".bnl", ".bnpparibas", ".bo", ".boats", ".bond", ".boo", ".boutique", ".br", ".bradesco", ".bridgestone", ".broker", ".brother", ".brussels", ".bs", ".bt", ".budapest", ".build", ".builders", ".business", ".buzz", ".bv", ".bw",  ".bz", ".bzh",  ".cab", ".cafe", ".cal", ".camera", ".camp", ".cancerresearch", ".canon", ".capetown", ".capital", ".caravan", ".cards", ".care", ".career", ".careers", ".cars", ".cartier", ".casa", ".cash", ".casino", ".cat", ".catering", ".cba", ".cbn",  ".cd", ".center", ".ceo", ".cern", ".cf", ".cfa", ".cfd", ".cg",  ".channel", ".chat", ".cheap", ".chloe", ".christmas", ".chrome", ".church", ".ci", ".cisco", ".citic", ".city", ".ck",  ".claims", ".cleaning", ".click", ".clinic",  ".cloud", ".club", ".cm",   ".coach", ".codes", ".coffee", ".college", ".cologne", ".commbank", ".community",  ".computer", ".condos", ".construction", ".consulting", ".contractors", ".cooking", ".cool", ".coop", ".corsica", ".country", ".coupons", ".courses", ".cr", ".credit", ".creditcard", ".cricket", ".crown", ".crs", ".cruises", ".cu", ".cuisinella", ".cv", ".cw", ".cx", ".cy", ".cymru", ".cyou", ".dabur", ".dad", ".dance", ".date", ".dating", ".datsun", ".day", ".dclk",  ".deals", ".degree", ".delivery", ".delta", ".democrat", ".dental", ".dentist", ".desi", ".design", ".dev", ".diamonds", ".diet", ".digital", ".direct", ".directory", ".discount", ".dj",  ".dm", ".dnp", ".do", ".docs", ".dog", ".doha", ".domains", ".doosan", ".download", ".drive", ".durban", ".dvag", ".dz", ".earth", ".eat", ".ec", ".education", ".ee", ".eg",  ".emerck", ".energy", ".engineer", ".engineering", ".enterprises", ".epson", ".equipment", ".er", ".erni",  ".esq", ".estate", ".et", ".eurovision", ".eus", ".events", ".everbank", ".exchange", ".expert", ".exposed", ".express", ".fail", ".faith", ".fan", ".fans", ".farm", ".fashion", ".feedback",  ".film", ".finance", ".financial", ".firmdale", ".fish", ".fishing", ".fit", ".fitness", ".fj", ".fk", ".flights", ".florist", ".flowers", ".flsmidth", ".fly", ".fm", ".fo", ".foo", ".football", ".forex", ".forsale", ".forum", ".foundation",  ".frl", ".frogans", ".fund", ".furniture", ".futbol", ".fyi", ".ga", ".gal", ".gallery", ".game", ".garden", ".gb", ".gbiz", ".gd", ".gdn", ".ge", ".gent", ".genting", ".gf", ".gg", ".ggee", ".gh", ".gi", ".gift", ".gifts", ".gives", ".gl", ".glass", ".gle", ".global", ".globo", ".gm", ".gmail", ".gmo", ".gmx", ".gn", ".gold", ".goldpoint", ".golf", ".goo", ".goog", ".google", ".gop",  ".gp", ".gq",  ".graphics", ".gratis", ".green", ".gripe", ".gs", ".gt", ".gu", ".guge", ".guide", ".guitars",  ".gw", ".gy", ".hamburg", ".hangout", ".haus", ".healthcare", ".help", ".here", ".hermes", ".hiphop", ".hitachi", ".hiv", ".hk", ".hm", ".hn", ".hockey", ".holdings", ".holiday", ".homedepot", ".homes", ".honda", ".horse", ".host", ".hosting", ".hoteles", ".hotmail", ".house", ".how", ".hr", ".hsbc", ".ht",  ".ibm", ".icbc", ".icu",   ".ifm", ".iinet",  ".im", ".immo", ".immobilien", ".industries", ".infiniti",  ".ing", ".ink", ".institute", ".insure", ".int", ".international", ".investments", ".io", ".iq",  ".irish", ".is", ".ist", ".istanbul",  ".iwc", ".java", ".jcb", ".je", ".jetzt", ".jewelry", ".jlc", ".jll", ".jm", ".jo", ".jobs", ".joburg",  ".jprs", ".juegos", ".kaufen", ".kddi", ".ke", ".kg", ".kh", ".ki", ".kim", ".kitchen", ".kiwi", ".km", ".kn", ".koeln", ".komatsu", ".kp",  ".krd", ".kred", ".kw", ".ky", ".kyoto", ".kz", ".la", ".lacaixa", ".land", ".lasalle", ".lat", ".latrobe", ".law", ".lawyer", ".lb", ".lc", ".lds", ".lease", ".leclerc", ".legal", ".lgbt", ".li", ".liaison", ".lidl", ".life", ".lighting", ".limited", ".limo", ".link", ".live", ".lk", ".loan", ".loans", ".lol", ".london", ".lotte", ".lotto", ".love", ".lr", ".ls", ".lt", ".ltda", ".lu", ".lupin", ".luxe", ".luxury", ".lv", ".ly", ".ma", ".madrid", ".maif", ".maison", ".management", ".mango", ".market", ".marketing", ".markets", ".marriott", ".mba", ".mc", ".md",  ".media", ".meet", ".melbourne", ".meme", ".memorial", ".men", ".menu", ".mg", ".mh", ".miami", ".microsoft",  ".mini", ".mk", ".ml", ".mm", ".mma", ".mn", ".mo",  ".moda", ".moe", ".monash", ".money", ".montblanc", ".mormon", ".mortgage", ".moscow", ".motorcycles", ".mov", ".movie", ".movistar", ".mp", ".mq", ".mr", ".ms", ".mt", ".mtn", ".mtpc", ".mu", ".museum", ".mv", ".mw",   ".mz", ".na", ".nadex", ".nagoya", ".name", ".navy", ".nc", ".ne", ".nec", ".netbank", ".network", ".neustar", ".new", ".news", ".nexus", ".nf", ".ng", ".ngo", ".nhk", ".ni", ".nico", ".ninja", ".nissan",   ".np", ".nr", ".nra", ".nrw", ".ntt", ".nu", ".nyc",  ".office", ".okinawa", ".om", ".omega", ".one", ".ong", ".onl", ".online", ".ooo", ".oracle", ".orange", ".organic", ".osaka", ".otsuka", ".ovh", ".pa", ".page", ".panerai", ".paris", ".partners", ".parts", ".party", ".pe", ".pf", ".pg", ".ph", ".pharmacy", ".philips", ".photo",  ".photos", ".physio", ".piaget", ".pics", ".pictet", ".pictures", ".pink", ".pizza", ".pk", ".place", ".play", ".plumbing", ".plus", ".pm", ".pn", ".pohl", ".poker", ".porn", ".post", ".pr", ".praxi", ".press",  ".prod", ".productions", ".prof", ".properties", ".property", ".ps",  ".pub", ".pw", ".py", ".qa", ".qpon", ".quebec", ".racing", ".re", ".realtor", ".realty", ".recipes", ".red", ".redstone", ".rehab", ".reise", ".reisen", ".reit", ".ren", ".rent", ".rentals", ".repair", ".report", ".republican", ".rest", ".restaurant", ".review", ".reviews", ".rich", ".ricoh", ".rio", ".rip",  ".rocks", ".rodeo", ".rs", ".rsvp",  ".ruhr", ".run", ".rw", ".ryukyu", ".sa", ".saarland", ".sakura", ".sale", ".samsung", ".sandvik", ".sandvikcoromant", ".sap", ".sarl", ".saxo", ".sb", ".sc", ".sca", ".scb", ".schmidt", ".scholarships", ".school", ".schule", ".schwarz", ".science", ".scor", ".scot", ".sd",  ".seat", ".sener", ".services", ".sew", ".sex", ".sexy", ".sg", ".sh", ".shiksha", ".shoes", ".show", ".shriram", ".si", ".singles", ".site", ".sj",  ".ski", ".sky", ".skype", ".sl", ".sm", ".sn", ".sncf", ".so", ".soccer", ".social", ".software", ".sohu", ".solar", ".solutions", ".sony", ".soy", ".space", ".spiegel", ".spreadbetting", ".sr", ".st", ".starhub", ".statoil", ".studio", ".study", ".style", ".su", ".sucks", ".supplies", ".supply", ".support", ".surf", ".surgery", ".suzuki", ".sv", ".swatch", ".swiss", ".sx", ".sy", ".sydney", ".systems", ".sz", ".taipei", ".tatar", ".tattoo", ".tax", ".taxi", ".tc", ".td", ".team", ".tech",  ".tel", ".telefonica", ".temasek", ".tennis", ".tf", ".tg", ".th", ".thd", ".theater", ".tickets", ".tienda",  ".tires", ".tirol", ".tj", ".tk", ".tl", ".tm", ".tn", ".to",  ".tokyo", ".tools", ".top", ".toray", ".toshiba", ".tours", ".town", ".toys", ".tr", ".trade", ".trading", ".training", ".travel", ".trust", ".tt", ".tui",   ".tz", ".ubs", ".ug",  ".university", ".uno", ".uol",  ".uy", ".uz", ".va", ".vacations", ".vc", ".ve", ".vegas", ".ventures", ".versicherung", ".vet", ".vg", ".vi", ".viajes", ".video", ".villas", ".vision", ".vista", ".vistaprint", ".vlaanderen",  ".vodka", ".vote", ".voting", ".voto", ".voyage", ".vu", ".wales", ".walter", ".wang", ".watch", ".webcam", ".website", ".wed", ".wedding", ".weir", ".wf", ".whoswho", ".wien", ".wiki", ".williamhill", ".win", ".windows", ".wme", ".work", ".works", ".world",  ".wtc", ".wtf", ".xbox", ".xerox", ".xin", ".xn--1qqw23a", ".xn--30rr7y", ".xn--3bst00m", ".xn--3ds443g", ".xn--3e0b707e", ".xn--45brj9c", ".xn--45q11c", ".xn--4gbrim", ".xn--55qw42g", ".xn--55qx5d", ".xn--6frz82g", ".xn--6qq986b3xl", ".xn--80adxhks", ".xn--80ao21a", ".xn--80asehdb", ".xn--80aswg", ".xn--90a3ac", ".xn--90ais", ".xn--9et52u", ".xn--b4w605ferd", ".xn--c1avg", ".xn--cg4bki", ".xn--clchc0ea0b2g2a9gcd", ".xn--czr694b", ".xn--czrs0t", ".xn--czru2d", ".xn--d1acj3b", ".xn--d1alf", ".xn--estv75g", ".xn--fiq228c5hs", ".xn--fiq64b", ".xn--fiqs8s", ".xn--fiqz9s", ".xn--fjq720a", ".xn--flw351e", ".xn--fpcrj9c3d", ".xn--fzc2c9e2c", ".xn--gecrj9c", ".xn--h2brj9c", ".xn--hxt814e", ".xn--i1b6b1a6a2e", ".xn--imr513n", ".xn--io0a7i", ".xn--j1amh", ".xn--j6w193g", ".xn--kcrx77d1x4a", ".xn--kprw13d", ".xn--kpry57d", ".xn--kput3i", ".xn--l1acc", ".xn--lgbbat1ad8j", ".xn--mgb9awbf", ".xn--mgba3a4f16a", ".xn--mgbaam7a8h", ".xn--mgbab2bd", ".xn--mgbayh7gpa", ".xn--mgbbh1a71e", ".xn--mgbc0a9azcg", ".xn--mgberp4a5d4ar", ".xn--mgbpl2fh", ".xn--mgbx4cd0ab", ".xn--mxtq1m", ".xn--ngbc5azd", ".xn--node", ".xn--nqv7f", ".xn--nqv7fs00ema", ".xn--nyqy26a", ".xn--o3cw4h", ".xn--ogbpf8fl", ".xn--p1acf", ".xn--p1ai", ".xn--pgbs0dh", ".xn--q9jyb4c", ".xn--qcka1pmc", ".xn--rhqv96g", ".xn--s9brj9c", ".xn--ses554g", ".xn--unup4y", ".xn--vermgensberater-ctb", ".xn--vermgensberatung-pwb", ".xn--vhquv", ".xn--vuq861b", ".xn--wgbh1c", ".xn--wgbl6a", ".xn--xhq521b", ".xn--xkc2al3hye2a", ".xn--xkc2dl3a5ee0h", ".xn--y9a3aq", ".xn--yfro4i67o", ".xn--ygbi2ammx", ".xn--zfr164b", ".xxx", ".xyz", ".yachts", ".yandex", ".ye", ".yodobashi", ".yoga", ".yokohama", ".youtube", ".yt",  ".zip", ".zm", ".zone", ".zuerich", ".zw"];            if (i_http === 0 || i_https === 0 || i_ftp === 0 || i_file === 0 ) {
                isurl = true;
            } else if (sm.indexOf(".") > 0) {
                if (anchorme.occurrences(sm,".") >= 3) {
                    var IPArray = sm.split(".");
                    var oc1 = IPArray[0];
                    var oc2 = IPArray[1];
                    var oc3 = IPArray[2];
                    if (IPArray[3].indexOf("/") > -1) {
                        var i_FoSlash = IPArray[3].indexOf("/");
                        var oc4 = IPArray[3].substring(0,i_FoSlash);
                        var proOC = IPArray[3].substring(i_FoSlash);
                    } else {
                        var oc4 = IPArray[3];
                        var proOC = false;
                    }
                    if (proOC === false || proOC.charAt(0) === "/") {
                        if (!isNaN(oc1) &&
                            !isNaN(oc2) &&
                            !isNaN(oc3) && 
                            !isNaN(oc4) && 
                            (oc1-1)<255 && 
                            (oc1-1)<255 && 
                            (oc1-1)<255 && 
                            (oc1-1)<255) {
                            isurl = true; Protocol = "http://"} else {nextCheck = "email"}
                    } else {nextCheck = "email"}
                } else {nextCheck = "email"}
                
                if (nextCheck === "email") {
                    if (anchorme.occurrences(sm,"@") == 1) {
                        
                        var i_at = sm.indexOf("@");
                        
                        var Ename = sm.substring(0,i_at);
                        var Eserver = sm.substring(i_at+1,sm.length);
                        
                        var EmailAllowed = true;
                        
                        for (var x = 0; x < Ename.length; x++) {
                            var cr = Ename[x];
                            if (NAllowed.indexOf(cr) === -1) {x=Ename.length;EmailAllowed = false}
                        }
                        
                        for (var x = 0; x < Eserver.length; x++) {
                            var cr = Eserver[x];
                            if (SAllowed.indexOf(cr) === -1) {x=Eserver.length;EmailAllowed = false}
                        }
                        
                        if (EmailAllowed) {
                            for (var x = 0; x < TLDs.length; x++) {
                                var d = TLDs[x];
                                if (sm.indexOf(d, sm.length - d.length) !== -1) {isurl = true; Protocol="mailto:"; x = TLDs.length; nextCheck = "";} else {nextCheck = "domains"}
                            }   
                        } else {nextCheck = "domains"}
                    } else {nextCheck = "domains"}
                }
                
                if (nextCheck === "domains") {
                    
                    var domainAllowed = true;
                    if (sm.indexOf("/") > 4) {
                        var i_FoSlash = sm.indexOf("/");
                        var pre_slash = sm.substring(0,i_FoSlash);
                        for (var x = 0; x < pre_slash.length; x++) {
                            var cr = pre_slash[x];
                            if (SAllowed.indexOf(cr) === -1) {x = pre_slash.length;domainAllowed = false}
                        }
                        
                    } else {
                        for (var x = 0; x < sm.length; x++) {
                            var cr = sm[x];
                            if (SAllowed.indexOf(cr) === -1) {x = sm.length;domainAllowed = false}
                        }                        
                    }
                    
                    if (domainAllowed) {
                        if (sm.indexOf("www.") === 0) {
                            isurl = true;
                            Protocol = "http://";
                        } else {
                            for (var x = 0; x < TLDs.length; x++) {
                                var d = TLDs[x];
                                var d_Fslash = d + "/";
                                var d_port = d + ":";
                                if (sm.indexOf(d, sm.length - d.length) !== -1) {isurl = true;  Protocol = "http://" ; x = TLDs.length;}
                                else if (sm.indexOf(d_Fslash) > -1) {isurl = true; Protocol = "http://" ;x = TLDs.length;}
                                else if (sm.indexOf(d_port) > -1) {isurl = true; Protocol = "http://" ;x = TLDs.length;}
                            }
                        }
                    }
                }
            }
            var url = Protocol ? Protocol+sm:sm;
            if (isurl) {
                if (typeof addattrs === "object") {
                    splitedArray[i] = "<a href='"+url+"'";
                    for (var name in addattrs) {
                        splitedArray[i] = splitedArray[i] + " "+name+"='"+addattrs[name]+"'";
                    }
                    splitedArray[i] = splitedArray[i] + ">"+sm+"</a>";
                } else {
                    splitedArray[i] = "<a href='"+url+"'>"+sm+"</a>";   
                }
            }
        }
    }
    return splitedArray.join(seperator);
};

anchorme.js = function (str,addattrs) {
    if (str.indexOf("</a>") > -1) str = anchorme.dontbreakHTML(str, "a","href");
    if (str.indexOf("</img>") > -1) str = anchorme.dontbreakHTML(str, "img","src");
    if (str.indexOf("</blockquote >") > -1) str = anchorme.dontbreakHTML(str, "blockquote","cite");
    if (str.indexOf("</del>") > -1) str = anchorme.dontbreakHTML(str, "del","cite");
    if (str.indexOf("</iframe>") > -1) str = anchorme.dontbreakHTML(str, "iframe","src");
    if (str.indexOf("</q>") > -1) str = anchorme.dontbreakHTML(str, "q","cite");
    if (str.indexOf("</script>") > -1) str = anchorme.dontbreakHTML(str, "script","src");
    if (str.indexOf("</audio>") > -1) str = anchorme.dontbreakHTML(str, "audio","src");
    if (str.indexOf("</button>") > -1) str = anchorme.dontbreakHTML(str, "button","formaction");
    if (str.indexOf("</command>") > -1) str = anchorme.dontbreakHTML(str, "command","icon");
    if (str.indexOf("</embed>") > -1) str = anchorme.dontbreakHTML(str, "embed","src");
    if (str.indexOf("</html>") > -1) str = anchorme.dontbreakHTML(str, "html","manifest");
    if (str.indexOf("</video>") > -1) str = anchorme.dontbreakHTML(str, "video","poster");
    if (str.indexOf("</video>") > -1) str = anchorme.dontbreakHTML(str, "video","src");
    if (str.indexOf("</applet>") > -1) str = anchorme.dontbreakHTML(str, "applet","codebase");
    if (str.indexOf("</area>") > -1) str = anchorme.dontbreakHTML(str, "area","href");
    if (str.indexOf("</base>") > -1) str = anchorme.dontbreakHTML(str, "base","href");
    if (str.indexOf("</body>") > -1) str = anchorme.dontbreakHTML(str, "body","background");
    if (str.indexOf("</frame>") > -1) str = anchorme.dontbreakHTML(str, "frame","src");
    if (str.indexOf("</head>") > -1) str = anchorme.dontbreakHTML(str, "head","profile");
    if (str.indexOf("longdesc") > -1) str = anchorme.dontbreakHTML(str, "img","longdesc");
    if (str.indexOf("longdesc") > -1) str = anchorme.dontbreakHTML(str, "iframe","longdesc");
    if (str.indexOf("usemap") > -1) str = anchorme.dontbreakHTML(str, "img","usemap");
    if (str.indexOf("</link>") > -1) str = anchorme.dontbreakHTML(str, "link","href");
    if (str.indexOf("</input>") > -1) str = anchorme.dontbreakHTML(str, "input","formaction");
    if (str.indexOf("</source>") > -1) str = anchorme.dontbreakHTML(str, "source","src");
    
    str = str.split("\n").join(" \n ");
    str = str.split(" (").join(" ( ");
    str = str.split(")").join(" )");
    var order1 = anchorme.order(str," ",addattrs);
    var order2 = anchorme.order(order1,"\n",addattrs);
    order2 = order2.split("( ").join("(");
    order2 = order2.split(" )").join(")");
    return order2;
};
