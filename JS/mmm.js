/**
 * Created by Administrator on 2016/6/30 0030.
 */
(function ($) {
    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    $.toJSON = typeof JSON === "object" && JSON.stringify ? JSON.stringify : function (o) {
        if (o === null) {
            return "null"
        }
        var type = typeof o;
        if (type === "undefined") {
            return undefined
        }
        if (type === "number" || type === "boolean") {
            return "" + o
        }
        if (type === "string") {
            return $.quoteString(o)
        }
        if (type === "object") {
            if (typeof o.toJSON === "function") {
                return $.toJSON(o.toJSON())
            }
            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1, day = o.getUTCDate(), year = o.getUTCFullYear(), hours = o.getUTCHours(), minutes = o.getUTCMinutes(), seconds = o.getUTCSeconds(), milli = o.getUTCMilliseconds();
                if (month < 10) {
                    month = "0" + month
                }
                if (day < 10) {
                    day = "0" + day
                }
                if (hours < 10) {
                    hours = "0" + hours
                }
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                if (milli < 100) {
                    milli = "0" + milli
                }
                if (milli < 10) {
                    milli = "0" + milli
                }
                return '"' + year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "." + milli + 'Z"'
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++) {
                    ret.push($.toJSON(o[i]) || "null")
                }
                return "[" + ret.join(",") + "]"
            }
            var name, val, pairs = [];
            for (var k in o) {
                type = typeof k;
                if (type === "number") {
                    name = '"' + k + '"'
                } else {
                    if (type === "string") {
                        name = $.quoteString(k)
                    } else {
                        continue
                    }
                }
                type = typeof o[k];
                if (type === "function" || type === "undefined") {
                    continue
                }
                val = $.toJSON(o[k]);
                pairs.push(name + ":" + val)
            }
            return "{" + pairs.join(",") + "}"
        }
    };
    $.evalJSON = typeof JSON === "object" && JSON.parse ? JSON.parse : function (src) {
        return eval("(" + src + ")")
    };
    $.secureEvalJSON = typeof JSON === "object" && JSON.parse ? JSON.parse : function (src) {
        var filtered = src.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval("(" + src + ")")
        } else {
            throw new SyntaxError("Error parsing JSON, source is not valid.")
        }
    };
    $.quoteString = function (string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function (a) {
                    var c = meta[a];
                    if (typeof c === "string") {
                        return c
                    }
                    c = a.charCodeAt();
                    return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                }) + '"'
        }
        return '"' + string + '"'
    }
})(jQuery || $);
function setCookieMills(b, c, e) {
    var d = new Date();
    d.setTime(d.getTime() + e);
    var a = window.document.domain.indexOf("360buy") >= 0 ? ".360buy.com" : ".jd.com";
    document.cookie = b + "=" + escape(c) + ";expires=" + d.toGMTString() + ";path=/;domain=" + a
}
function getCookie(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a != null) {
        return unescape(a[2])
    }
    return null
}
function deleteCookie(a) {
    var b = getCookie(a);
    if (b != null) {
        setCookieMills(a, "", -1)
    }
}
function seClick(b, d, f) {
    var a = "seWids" + b;
    var c = getCookie(a);
    if (c != null) {
        var e = c.toString().indexOf(f);
        if (e < 0) {
            c = c + "," + f
        }
    } else {
        c = f
    }
    setCookieMills(a, c, 86400000);
    log(2, 2, d, f)
}
function appendJSONCookie(cookieName, key, wid, Mills) {
    var ns = eval("(" + getCookie(cookieName) + ")");
    if (ns == null || ns == "") {
        ns = new Object()
    }
    if (ns[key] == null) {
        ns[key] = ""
    }
    var pos = ns[key].indexOf(wid);
    if (pos < 0) {
        ns[key] = ns[key] + "," + wid
    }
    setCookieMills(cookieName, $.toJSON(ns), Mills)
}
function reBook(b, f, a) {
    var e = "_rtbook";
    var c = f.toString().split("#")[0];
    appendJSONCookie(e, b, c, 86400000);
    log(3, b, c, a)
}
function fe(a, b, c) {
    log("f", a, b, c)
}
function reClick2012(a, e, b) {
    var d = "reHome2012";
    var c = e.toString().split("#")[0];
    appendJSONCookie(d, a, c, 86400000);
    log(3, a, c, b)
}
function reClickCube(e, b) {
    var a = "_rdCube";
    appendJSONCookie(a, "p" + e, b, 86400000)
}
function mark(b, a) {
    log(1, a, b)
}
function isMeta(b) {
    if (b.metaKey || b.altKey || b.ctrlKey || b.shiftKey) {
        return true
    }
    var c = b.which, a = b.button;
    if (!c && a !== undefined) {
        return (!a & 1) && (!a & 2) && (a & 4)
    } else {
        if (c === 2) {
            return true
        } else {
            if (a === 2) {
                return true
            }
        }
    }
    return false
}
document.onclick = function (i) {
    i = i || event;
    if (!i.clientX && !i.clientY && !i.pageX && !i.pageY) {
        return
    }
    var w = document, b = window;
    var a = tag = i.srcElement || i.target;
    var m = $(tag).attr("clstag"), p = $(tag).attr("href");
    var u = "";
    while (!m) {
        tag = tag.parentNode;
        if (!tag || (tag.nodeName == "BODY")) {
            break
        }
        m = $(tag).attr("clstag");
        if (!p) {
            p = $(tag).attr("href");
            a = tag
        }
    }
    if (m) {
        var f = m.split("|"), c = f[1], r = f[2], v = f[3];
        if (c === "keycount" && JA) {
            var h = JA.util.Nt();
            if (p) {
                JA.tracker.aloading(r, v, ["Q", p]);
                JA.tracker.ngloader("other.000000", {t1: r, t2: v, p0: JA.util.join(["Q", p]), cb: h.jdcb})
            } else {
                JA.tracker.aloading(r, v, ["Q"]);
                JA.tracker.ngloader("other.000000", {t1: r, t2: v, p0: JA.util.join(["Q"]), cb: h.jdcb})
            }
            u = r + "|" + v;
            if (p && /^(http:\/\/|https:\/\/|\/\/).*/.test(p) && $(a).attr("target") !== "_blank" && !isMeta(i)) {
                i.preventDefault ? i.preventDefault() : i.returnValue = false;
                setTimeout(function () {
                    var d = w.createElement("a");
                    d.href = p;
                    d.target = "_self";
                    w.body.appendChild(d);
                    if (typeof d.click !== "undefined") {
                        d.click()
                    } else {
                        b.location.href = p
                    }
                    w.body.removeChild(d)
                }, 200)
            }
        }
    }
    var l = this.location.hostname.toLowerCase();
    if (/(sale|mall|jmall|pop).(jd|360buy).(com|hk)/.test(l) || b.ja_heat_map) {
        var q = 0, o = 0, g = b.screen.width >= 1210 && l == "item.jd.com" ? 1210 : 990, n = w.body.clientWidth > g ? Math.round((w.body.clientWidth - g) / 2) : 0;
        if (i.pageX || i.pageY) {
            q = i.pageX;
            o = i.pageY
        } else {
            q = i.clientX + w.body.scrollLeft - w.body.clientLeft;
            o = i.clientY + w.body.scrollTop - w.body.clientTop
        }
        log("d", "c", u || "-", q + "x" + o, w.body.scrollWidth + "x" + w.body.scrollHeight, n)
    }
};
function HashMap() {
    this.values = new Object()
}
HashMap.prototype.Set = function (a, b) {
    this.values[a] = b
};
HashMap.prototype.Get = function (a) {
    return this.values[a]
};
HashMap.prototype.Contains = function (a) {
    return this.values.hasOwnProperty(a)
};
HashMap.prototype.Remove = function (a) {
    delete this.values[a]
};
var SucInfoMethod = {
    Init: function () {
        this.orderDetailMap = new HashMap();
        this.rSM = new HashMap();
        var b = SucInfo_OrderDetail.toString().split(",");
        for (var c = 0; c < b.length; c++) {
            var a = b[c].split(":");
            this.orderDetailMap.Set(a[0], a[1]);
            this.sku = a[0]
        }
    }, GetSkuNum: function (a) {
        return this.orderDetailMap.Get(a)
    }, Contains: function (a) {
        return this.orderDetailMap.Contains(a)
    }, GetDefaultSku: function () {
        return this.sku
    }, ARS: function (a) {
        this.rSM.Set(a, 0)
    }, RSContains: function (a) {
        if (this.rSM.Contains(a)) {
            return 1
        } else {
            return 0
        }
    }
};
function RecommendTrans(recName, tag, logtype) {
    var cookieNames = recName.split(",");
    for (var i = 0; i < cookieNames.length; i++) {
        var recCookies = eval("(" + getCookie(cookieNames[i]) + ")");
        for (var k in recCookies) {
            if (recCookies[k] != "") {
                if (k == "cai2012") {
                    loginfo(recCookies[k], k.toString(), "R", logtype)
                } else {
                    loginfo(recCookies[k], k.toString(), tag, logtype)
                }
            }
        }
    }
}
function simpleMold(d, a, g, f, b) {
    for (var e = 0; e < d.length; e++) {
        var c = getCookie(g + d[e]);
        if (c != null && c != "") {
            loginfo(c, d[e], a, f, b)
        }
    }
}
function complexMold(cookieArrary, tag, prefix, logtype, flag) {
    for (var i = 0; i < cookieArrary.length; i++) {
        var items = eval("(" + getCookie(prefix + cookieArrary[i]) + ")");
        if (items != null) {
            for (var k in items) {
                if (items[k] != "") {
                    loginfo(items[k], k.toString(), tag, logtype, flag)
                }
            }
        }
    }
}
function loginfo(k, j, a, e, h) {
    var g = k.split(",");
    var c = SucInfo_OrderId, f = SucInfo_OrderType, b = SucInfo_OrderDetail;
    for (var d = 0; d < g.length; d++) {
        if (g[d].length > 0) {
            var l = g[d].toString().split("#")[0];
            if (SucInfoMethod.Contains(l)) {
                if (h) {
                    log(e, a, j.concat(".o"), c, f, b, l + ":" + SucInfoMethod.GetSkuNum(l));
                    log("4", "R" + j.concat(".o"), c, f, b, l, SucInfoMethod.GetSkuNum(l))
                } else {
                    log(e, a + j, c, f, b, l, SucInfoMethod.GetSkuNum(l))
                }
            }
        }
    }
}
function isChecked() {
    SucInfo_OrderId = window.SucInfo_OrderId || JA.util.getParameter(document.location.href, "suc_orderid") || undefined;
    SucInfo_OrderType = window.SucInfo_OrderType || JA.util.getParameter(document.location.href, "suc_ordertype") || undefined;
    SucInfo_OrderDetail = window.SucInfo_OrderDetail || decodeURIComponent(JA.util.getParameter(document.location.href, "suc_sku")) || undefined;
    return SucInfo_OrderId && SucInfo_OrderDetail
}
function funLoad() {
    var a = getCookie("pin");
    if (a != null && a.length > 0) {
        setCookieMills("rpin", a, 259200000)
    }
}
function Clublog() {
    var b = this.location.pathname.toLowerCase();
    var a = this.location.hostname.toLowerCase();
    if ((b.indexOf("/cart.html", 0) >= 0) || (b.indexOf("shoppingcart", 0) >= 0)) {
        log("R2&Page", "Show")
    } else {
        if (b.indexOf("user_home", 0) >= 0) {
            log("R3&Page", "Show")
        } else {
            if ((b.indexOf("initcart.html", 0) >= 0) || (b.indexOf("addtocart.html", 0) >= 0) || (b.indexOf("initcart.aspx", 0) >= 0)) {
                log("R4R5&Page", "Show")
            } else {
                if ((b.indexOf("normal/list.action", 0) >= 0) || (b.indexOf("orderlist.aspx", 0) >= 0)) {
                    log("DDR&Page", "Show")
                } else {
                    if (a == "home.360buy.com") {
                        if (b == "/") {
                            log("R3&Page", "Show")
                        }
                    }
                }
            }
        }
    }
}
function getHistory() {
    var b = decodeURIComponent(escape(getCookie("pin")));
    var d = getCookie("_ghis");
    var c = window.document.location.host.toLowerCase().indexOf("360buy.com") >= 0 ? "360buy" : "jd";
    if (d == null && b != null) {
        var a = "//gh." + c + ".com/BuyHistory.aspx?mid=" + encodeURIComponent(b);
        $.ajax({
            url: a, type: "GET", dataType: "jsonp", success: function (e) {
                var f = e.SSkus;
                var g = e.UserInsterest;
                if (f.toString().length > 0) {
                    setCookieMills("_ghis", f.toString().substring(0, 51))
                }
                if (g.toString().length > 0) {
                    setCookieMills("_ghit", g)
                }
            }
        })
    }
}
(function () {
    function HashMap() {
        this.values = new Object()
    }

    HashMap.prototype.Set = function (key, value) {
        this.values[key] = value
    };
    HashMap.prototype.Get = function (key) {
        return this.values[key]
    };
    HashMap.prototype.Contains = function (key) {
        return this.values.hasOwnProperty(key)
    };
    HashMap.prototype.Remove = function (key) {
        delete this.values[key]
    };
    function SortedHashMap(IComparer, IGetKey) {
        this.IComparer = IComparer;
        this.IGetKey = IGetKey;
        this.a = new Array();
        this.h = new HashMap()
    }

    SortedHashMap.prototype.Add = function (key, value) {
        if (this.ContainsKey(key)) {
            this.Remove(key)
        }
        this.a.push(value);
        this.a.sort(this.IComparer);
        for (var i = 0; i < this.a.length; i++) {
            var key = this.IGetKey(this.a[i]);
            this.h.Set(key, i)
        }
    };
    SortedHashMap.prototype.Insert = function (value, maxlength) {
        for (var i = 0, l = this.a.length; i < l; i++) {
            if (this.a[i].s === value.s) {
                this.a.splice(i, 1);
                break
            }
        }
        if (this.a.length >= maxlength) {
            this.a.splice(maxlength - 1, 1)
        }
        this.a.unshift(value)
    };
    SortedHashMap.prototype.Get = function (key) {
        return this.a[this.h.Get(key)]
    };
    SortedHashMap.prototype.Count = function () {
        return this.a.length
    };
    SortedHashMap.prototype.Remove = function (key) {
        if (!this.h.Contains(key)) {
            return
        }
        var index = this.h.Get(key);
        this.a.splice(index, 1);
        this.h.Remove(key)
    };
    SortedHashMap.prototype.ContainsKey = function (key) {
        return this.h.Contains(key)
    };
    SortedHashMap.prototype.Clear = function () {
        this.a = new Array();
        this.h = new HashMap()
    };
    SortedHashMap.prototype.GetJson = function () {
        return $.toJSON(this.a)
    };
    function ThirdType(thirdType, sku, value) {
        this.t = thirdType;
        this.v = 5;
        this.s = 0;
        if (arguments.length > 1) {
            this.s = sku
        }
        if (arguments.length > 2) {
            this.v = value
        }
    }

    ThirdType.prototype.Increase = function () {
        this.v = this.v + 2
    };
    ThirdType.prototype.Decrease = function () {
        this.v = this.v - 1
    };
    ThirdType.prototype.SetSku = function (sku) {
        this.s = sku
    };
    Ttracker = {
        IComparer: function (a, b) {
            return b.v - a.v
        }, IGetKey: function (a) {
            return a.t
        }, isbook: function (id) {
            return id > 10000000 && id < 20000000
        }, trace: function () {
            if (typeof pageConfig != "object" || typeof pageConfig.product != "object") {
                return
            }
            var sortid = pageConfig.product.cat instanceof Array && pageConfig.product.cat[2];
            if (!sortid) {
                return
            }
            var wid = $("#name").attr("PshowSkuid") || pageConfig.product.skuid;
            this.view(sortid, wid);
            this.viewtypewid()
        }, viewtypewid: function () {
            var maps = Ttracker.util.Vv("typewid");
            if (maps) {
                Ttracker.util.Wv("typewid", "", -63072000000)
            }
        }, viewhisotry: function (t, s, cname) {
            var nview = {t: t, s: s};
            var bookmap = new SortedHashMap(this.IComparer, this.IGetKey);
            var bview = Ttracker.util.Vv(cname);
            if (bview) {
                try {
                    if (bview.indexOf(".") > 0) {
                        var viewarray = bview.split("|");
                        for (var j = viewarray.length - 1; j >= 0; j--) {
                            var book = viewarray[j].split(".");
                            bookmap.Insert({t: Number(book[0]), s: Number(book[1])}, 8)
                        }
                    } else {
                        var bviews = eval("(" + bview + ")");
                        if (bviews.length > 0 && bviews[0].d != undefined) {
                            Ttracker.util.Wv(cname, "", -63072000000)
                        } else {
                            for (var i = bviews.length - 1; i >= 0; i--) {
                                bookmap.Insert(bviews[i], 8)
                            }
                        }
                    }
                } catch (e) {
                    Ttracker.util.Wv(cname, "", -63072000000)
                }
            }
            bookmap.Insert(nview, 8);
            var cvalue = "";
            for (var k = 0, klen = bookmap.a.length; k < klen; k++) {
                cvalue += (bookmap.a[k].t + "." + bookmap.a[k].s + (k == klen - 1 ? "" : "|"))
            }
            cvalue && Ttracker.util.Wv(cname, cvalue, 63072000000)
        }, viewrate: function (t, s, cname) {
            var ntw = {t: t, s: s, v: 5};
            var sitesortmap = new SortedHashMap(this.IComparer, this.IGetKey);
            var vrate = Ttracker.util.Vv(cname);
            if (vrate) {
                try {
                    if (vrate.indexOf(".") > 0) {
                        var ratearray = vrate.split("|");
                        for (var j = ratearray.length - 1; j >= 0; j--) {
                            var tw = ratearray[j].split(".");
                            var tv = Number(tw[2] || 0), tid = Number(tw[0]);
                            tv = t === tid ? tv : (tv - 1);
                            sitesortmap.Add(Number(tw[0]), {t: Number(tw[0]), s: Number(tw[1]), v: tv}, 8)
                        }
                    } else {
                        var vrates = eval("(" + vrate + ")");
                        if (vrates.length > 0 && vrates[0].d != undefined) {
                            Ttracker.util.Wv(cname, "", -63072000000)
                        } else {
                            for (var i = 0; i < vrates.length; i++) {
                                var rate = vrates[i];
                                if (rate.t != t) {
                                    rate.v -= 1
                                }
                                sitesortmap.Add(rate.t, rate)
                            }
                        }
                    }
                } catch (e) {
                    Ttracker.util.Wv(cname, "", -63072000000)
                }
            }
            if (!sitesortmap.ContainsKey(t)) {
                sitesortmap.Add(t, ntw)
            } else {
                var curtt = sitesortmap.Get(t);
                curtt.s = s ? s : curtt.s;
                curtt.v += 2
            }
            if (sitesortmap.Count() > 8) {
                var del = sitesortmap.a[sitesortmap.Count() - 1];
                sitesortmap.Remove(del.t)
            }
            var cvalue = "";
            for (var k = 0, klen = sitesortmap.a.length; k < klen; k++) {
                cvalue += (sitesortmap.a[k].t + "." + sitesortmap.a[k].s + "." + sitesortmap.a[k].v + (k == klen - 1 ? "" : "|"))
            }
            cvalue && Ttracker.util.Wv(cname, cvalue, 63072000000)
        }, view: function (t, s) {
            var tid = Number(t), sku = Number(s), _this = this;
            $.ajax({
                url: "//diviner.jd.com/cookie?ck=" + tid + "." + sku,
                dataType: "jsonp",
                success: function (json) {
                    if (typeof(json) == "object" && json.errCode == 0) {
                        _this.util.Wv("atw", "", -63072000000);
                        if (_this.isbook(sku)) {
                            _this.util.Wv("btw", "", -63072000000);
                            _this.util.Wv("bview", "", -63072000000)
                        }
                    }
                }
            });
            $.ajax({
                url: "//x.jd.com/aview?ck=" + tid + "." + sku,
                dataType: "jsonp",
                success: function (res) {
                    if (typeof(res) == "object" && res.errCode == 0) {
                        _this.util.Wv("aview", "", -63072000000)
                    }
                }
            })
        }
    };
    Ttracker.util = {
        Wv: function (n, v, t) {
            var d = window.document.domain.indexOf("360buy") >= 0 ? ".360buy.com" : ".jd.com";
            n = n + "=" + v + "; path=/; ";
            t && (n += "expires=" + (new Date(new Date().getTime() + t)).toGMTString() + "; ");
            n += "domain=" + d + ";";
            document.cookie = n
        }, Vv: function (n) {
            for (var b = [], c = document.cookie.split(";"), n = RegExp("^\\s*" + n + "=\\s*(.*?)\\s*$"), d = 0; d < c.length; d++) {
                var e = c[d]["match"](n);
                e && b.push(e[1])
            }
            return b[0]
        }
    };
    Ttracker.trace()
})();
(function () {
    var ad = window, ap = document, aD = encodeURIComponent, ae = decodeURIComponent, S = void 0, P = "push", F = "join", M = "split", R = "length", w = "indexOf", m = "prototype", H = "toLowerCase";
    var r = {};
    r.util = {
        join: function (l) {
            if (l instanceof Array) {
                var s = "";
                for (var p = 0, g = l.length; p < g; p++) {
                    s += l[p] + ((p == g - 1) ? "" : "|||")
                }
                return s
            }
            return l
        }, getParameter: function (p, l) {
            var s = new RegExp("(?:^|&|[?]|[/])" + l + "=([^&]*)");
            var g = s.exec(p);
            return g ? aD(g[1]) : ""
        }, Wv: function (s, g, p, l) {
            s = s + "=" + g + "; path=/; ";
            l && (s += "expires=" + (new Date(new Date().getTime() + l)).toGMTString() + "; ");
            p && (s += "domain=" + p + ";");
            ap.cookie = s
        }, Vv: function (y) {
            for (var g = [], t = ap.cookie[M](";"), l = RegExp("^\\s*" + y + "=\\s*(.*?)\\s*$"), s = 0; s < t[R]; s++) {
                var p = t[s]["match"](l);
                p && g[P](p[1])
            }
            return g
        }
    };
    var aK = 0;

    function ai(g) {
        return (g ? "_" : "") + aK++
    }

    var am = ai(), af = ai(), ah = ai(), I = ai(), d = ai(), aM = ai(), Y = ai(), aq = ai(), ag = ai(), aj = ai(), aA = ai(), az = ai(), aI = ai(), aS = ai(), ab = ai(), V = ai(), B = ai(), z = ai(), N = ai(), aC = ai(), n = ai(), A = ai(), i = ai(), a = ai(), aP = ai(), ax = ai(), Q = ai(), aN = ai(), f = ai(), av = ai(), c = ai(), ar = ai(), aW = ai(), b = ai(), ay = ai(), aQ = ai(), al = ai();
    var aR = function () {
        var C = {};
        this.set = function (K, D) {
            C[K] = D
        };
        this.get = function (D) {
            return C[D] !== S ? C[D] : null
        };
        this.m = function (K) {
            var D = this.get(K);
            var L = D == S || D === "" ? 0 : 1 * D;
            C[K] = L + 1
        };
        this.set(am, "UA-J2011-1");
        var l = window.document.domain.indexOf("360buy") >= 0 ? "360buy.com" : "jd.com";
        this.set(I, l);
        this.set(ah, k());
        this.set(d, Math.round((new Date).getTime() / 1000));
        this.set(aM, 15552000000);
        this.set(Y, 1296000000);
        this.set(aq, 1800000);
        this.set(aS, U());
        var g = ac();
        this.set(ab, g.name);
        this.set(V, g.version);
        this.set(B, G());
        var t = aL();
        this.set(z, t.D);
        this.set(N, t.C);
        this.set(aC, t.language);
        this.set(n, t.javaEnabled);
        this.set(A, t.characterSet);
        this.set(aN, ao);
        this.set(aW, new Date().getTime());
        var s = r.util.Vv("pin");
        this.set(aQ, s[R] ? s[0] : "-");
        var p = "", y;
        if ((y = r.util.Vv("pinId")) && y[R]) {
            p = y[0]
        }
        this.set(al, p || "-")
    };
    var ao = "baidu:wd,baidu:word,haosou.com:q,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","), aV = function () {
        return Math.round((new Date).getTime() / 1000)
    }, v = function () {
        return Math.round(Math.random() * 2147483647)
    }, Z = function () {
        return v() ^ an() & 2147483647
    }, k = function () {
        return X(ap.domain)
    }, aL = function () {
        var l = {}, g = ad.navigator, p = ad.screen;
        l.D = p ? p.width + "x" + p.height : "-";
        l.C = p ? p.colorDepth + "-bit" : "-";
        l.language = (g && (g.language || g.browserLanguage) || "-")[H]();
        l.javaEnabled = g && g.javaEnabled() ? 1 : 0;
        l.characterSet = ap.characterSet || ap.charset || "-";
        return l
    }, U = function () {
        var D, C, y, t;
        y = "ShockwaveFlash";
        if ((D = (D = window.navigator) ? D.plugins : S) && D[R] > 0) {
            for (C = 0; C < D[R] && !t; C++) {
                y = D[C], y.name[w]("Shockwave Flash") > -1 && (t = y.description[M]("Shockwave Flash ")[1])
            }
        } else {
            y = y + "." + y;
            try {
                C = new ActiveXObject(y + ".7"), t = C.GetVariable("$version")
            } catch (s) {
            }
            if (!t) {
                try {
                    C = new ActiveXObject(y + ".6"), t = "WIN 6,0,21,0", C.AllowScriptAccess = "always", t = C.GetVariable("$version")
                } catch (p) {
                }
            }
            if (!t) {
                try {
                    C = new ActiveXObject(y), t = C.GetVariable("$version")
                } catch (l) {
                }
            }
            t && (t = t[M](" ")[1][M](","), t = t[0] + "." + t[1] + " r" + t[2])
        }
        var K = r.util.Vv("_r2");
        D = t ? (t + (K[R] > 0 ? ("_" + K[0]) : "")) : "-";
        var g = r.util.Vv("limgs");
        D = D + (g[R] > 0 ? ("_" + g[0]) : "");
        return D
    }, at = function (g) {
        return S == g || "-" == g || "" == g
    }, X = function (l) {
        var g = 1, s = 0, p;
        if (!at(l)) {
            g = 0;
            for (p = l[R] - 1; p >= 0; p--) {
                s = l.charCodeAt(p), g = (g << 6 & 268435455) + s + (s << 14), s = g & 266338304, g = s != 0 ? g ^ s >> 21 : g
            }
        }
        return g
    }, an = function () {
        var p = aL();
        for (var l = p, g = ad.navigator, l = g.appName + g.version + l.language + g.platform + g.userAgent + l.javaEnabled + l.D + l.C + (ap.cookie ? ap.cookie : "") + (ap.referrer ? ap.referrer : ""), g = l.length, s = ad.history.length; s > 0;) {
            l += s-- ^ g++
        }
        return X(l)
    }, ac = function () {
        var g = {name: "other", version: "0"}, s = navigator.userAgent.toLowerCase();
        browserRegExp = {
            se360: /360se/,
            se360_2x: /qihu/,
            ie: /msie[ ]([\w.]+)/,
            firefox: /firefox[|\/]([\w.]+)/,
            chrome: /chrome[|\/]([\w.]+)/,
            safari: /version[|\/]([\w.]+)(\s\w.+)?\s?safari/,
            opera: /opera[|\/]([\w.]+)/
        };
        for (var p in browserRegExp) {
            var l = browserRegExp[p].exec(s);
            if (l) {
                g.name = p;
                g.version = l[1] || "0";
                break
            }
        }
        return g
    }, G = function () {
        var g = /(win|android|linux|nokia|ipad|iphone|ipod|mac|sunos|solaris)/.exec(navigator.platform.toLowerCase());
        return g == null ? "other" : g[0]
    }, aJ = function () {
        var p = "", y = ["jwotest_product", "jwotest_list", "jwotest_cart", "jwotest_orderinfo", "jwotest_homepage", "jwotest_other1", "jwotest_other2", "jwotest_other3"];
        for (var t = 0, g = y.length; t < g; t++) {
            var s = r.util.Vv(y[t]);
            if (s[R] == 0) {
                continue
            }
            var C = ae(s[0]).match(/=(.*?)&/gi), l = [];
            if (C == null) {
                continue
            }
            $.each(C, function (K, D) {
                l.push(K == 0 ? "T" + D.substring(1, D.length - 1) : D.substring(1, D.length - 1))
            });
            p += l[F]("-") + ";"
        }
        return p
    }, aH = function (t) {
        t.set(ag, ap.location.hostname);
        t.set(aj, ap.title.replace(/\$/g, ""));
        t.set(aA, ap.location.pathname);
        t.set(az, ap.referrer.replace(/\$/g, ""));
        t.set(aI, ap.location.href);
        var g = r.util.Vv("__jda"), L = g[R] > 0 ? g[0][M](".") : null;
        t.set(af, L && !at(L[1]) ? L[1] : Z());
        t.set(i, L ? L[2] : t.get(d));
        t.set(a, L ? L[3] : t.get(d));
        t.set(aP, L ? L[4] : t.get(d));
        t.set(ax, L ? L[5] : 1);
        var C = r.util.Vv("__jdv"), y = C[R] > 0 ? C[0][M]("|") : null, l = y && y.length == 5 ? 1 : 0;
        t.set(f, y ? y[0 + l] : "direct");
        t.set(av, y ? y[1 + l] : "-");
        t.set(c, y ? y[2 + l] : "none");
        t.set(ar, y ? y[3 + l] : "-");
        var K = r.util.Vv("__jdb"), D = K[R] > 0 ? K[0][M](".") : null, l = D && D.length == 4 ? 1 : 0;
        t.set(Q, D ? D[0 + l] : 0);
        t.set(b, aJ() || "-");
        var s = JA.util.Vv("clickid"), p = s[R] && s[0];
        t.set(ay, p);
        return !0
    }, aF = function () {
        var l = r.util.Vv("__jdb"), g = l[R] > 0 ? l[0][M](".") : null;
        if (g && g.length == 1) {
            return g[0] * 1
        } else {
            if (g && g.length == 4) {
                return g[1] * 1
            } else {
                return 0
            }
        }
    }, aG = function (a2) {
        var s = ap.location.search, C = ap.referrer, aZ = a2.get(I), y = r.util.getParameter(s, "utm_source"), t = [], W = a2.get(f), O = a2.get(av), L = a2.get(c), g = r.util.Vv("__jdb")[R] == 0;
        var a3 = false;
        if (y) {
            var l = r.util.getParameter(s, "utm_campaign"), a1 = r.util.getParameter(s, "utm_medium"), aa = r.util.getParameter(s, "utm_term");
            t[P](y);
            t[P](l || "-");
            t[P](a1 || "-");
            t[P](aa || "not set");
            a2.set(ar, t[3]);
            a3 = true
        } else {
            var p = C && C[M]("/")[2], a0 = false;
            if (p && p[w](aZ) < 0) {
                for (var ak = a2.get(aN), aX = 0; aX < ak.length; aX++) {
                    var aY = ak[aX][M](":");
                    if (p[w](aY[0][H]()) > -1 && C[w]((aY[1] + "=")[H]()) > -1) {
                        var K = r.util.getParameter(C, aY[1]);
                        t[P](aY[0]);
                        t[P]("-");
                        t[P]("organic");
                        t[P](K || "not set");
                        a2.set(ar, t[3]);
                        a0 = true;
                        break
                    }
                }
                if (!a0) {
                    if (p[w]("zol.com.cn") > -1) {
                        t[P]("zol.com.cn");
                        t[P]("-");
                        t[P]("cpc");
                        t[P]("not set")
                    } else {
                        t[P](p);
                        t[P]("-");
                        t[P]("referral");
                        t[P]("-")
                    }
                }
            }
        }
        var D = t[R] > 0 && (t[0] !== W || t[1] !== O || t[2] !== L) && t[2] !== "referral";
        if (g || (!g && D)) {
            a2.set(f, t[0] || a2.get(f));
            a2.set(av, t[1] || a2.get(av));
            a2.set(c, t[2] || a2.get(c));
            a2.set(ar, t[3] || a2.get(ar));
            au(a2)
        } else {
            h(a2)
        }
        return D || a3
    }, j = function (l, g) {
        var p = g.split(".");
        l.set(i, p[2]);
        l.set(a, p[4]);
        l.set(aP, aV());
        l.m(ax);
        l.set(Q, 1)
    }, E = function (l) {
        var g = l.get(d);
        l.set(af, Z());
        l.set(i, g);
        l.set(a, g);
        l.set(aP, g);
        l.set(ax, 1);
        l.set(Q, 1)
    }, h = function (g) {
        g.m(Q)
    }, u = function (g) {
        return [g.get(ah), g.get(af) || "-", g.get(i) || "-", g.get(a) || "-", g.get(aP) || "-", g.get(ax) || 1][F](".")
    }, e = function (g) {
        return [g.get(ah), g.get(Q) || 1, g.get(af) + "|" + g.get(ax) || 1, g.get(aP) || g.get(d)][F](".")
    }, x = function (g) {
        return [g.get(ah), g.get(f) || ap.domain, g.get(av) || "(direct)", g.get(c) || "direct", g.get(ar) || "-"][F]("|")
    }, au = function (g) {
        var l = r.util.Vv("__jda");
        l.length == 0 ? E(g) : j(g, l[0])
    };
    var q = new aR(), aw = function () {
        this.a = {};
        this.add = function (g, l) {
            this.a[g] = l
        };
        this.get = function (g) {
            return this.a[g]
        };
        this.toString = function () {
            return this.a[F]("&")
        }
    }, o = function (l, g) {
        g.add("jdac", l.get(am)), g.add("jduid", l.get(af)), g.add("jdsid", l.get(af) + "|" + l.get(ax)), g.add("jdje", l.get(n)), g.add("jdsc", l.get(N)), g.add("jdsr", l.get(z)), g.add("jdul", l.get(aC)), g.add("jdcs", l.get(A)), g.add("jddt", l.get(aj) || "-"), g.add("jdmr", aD(l.get(az))), g.add("jdhn", l.get(ag) || "-"), g.add("jdfl", l.get(aS)), g.add("jdos", l.get(B)), g.add("jdbr", l.get(ab)), g.add("jdbv", l.get(V)), g.add("jdwb", l.get(i)), g.add("jdxb", l.get(a)), g.add("jdyb", l.get(aP)), g.add("jdzb", l.get(ax)), g.add("jdcb", l.get(Q)), g.add("jdusc", l.get(f) || "direct"), g.add("jducp", l.get(av) || "-"), g.add("jdumd", l.get(c) || "-"), g.add("jduct", l.get(ar) || "-"), g.add("jdlt", typeof jdpts != "object" ? 0 : jdpts._st == undefined ? 0 : l.get(aW) - jdpts._st), g.add("jdtad", l.get(b)), g.add("jdak", l.get(ay)), g.add("pinid", l.get(al))
    }, aU = function (l, g, p, s) {
        g.add("jdac", l.get(am)), g.add("jduid", l.get(af)), g.add("jdsid", l.get(af) + "|" + l.get(ax)), g.add("jdje", "-"), g.add("jdsc", "-"), g.add("jdsr", "-"), g.add("jdul", "-"), g.add("jdcs", "-"), g.add("jddt", "-"), g.add("jdmr", aD(l.get(az))), g.add("jdhn", "-"), g.add("jdfl", "-"), g.add("jdos", "-"), g.add("jdbr", "-"), g.add("jdbv", "-"), g.add("jdwb", "-"), g.add("jdxb", "-"), g.add("jdyb", "-"), g.add("jdzb", l.get(ax)), g.add("jdcb", s ? (aF() + s) : l.get(Q)), g.add("jdusc", "-"), g.add("jducp", "-"), g.add("jdumd", "-"), g.add("jduct", "-"), g.add("jdlt", 0), g.add("jdtad", p), g.add("jdak", l.get(ay)), g.add("pinid", l.get(al))
    }, aT = function () {
        aH(q);
        var p = aG(q), g = r.util.Vv("__jdv");
        var s = new aw(), l = q.get(I);
        o(q, s);
        r.util.Wv("__jda", u(q), l, q.get(aM));
        r.util.Wv("__jdb", e(q), l, q.get(aq));
        r.util.Wv("__jdc", q.get(ah), l);
        if (p || !g.length) {
            r.util.Wv("__jdv", x(q), l, q.get(Y))
        }
        r.util.Wv("clickid", "0", l, -84600000);
        return s.a
    }, aB = function () {
        var g = new aw();
        o(q, g);
        return g.a
    }, aO = function (g, l) {
        var p = new aw();
        aU(q, p, g, l);
        return p.a
    }, J = function (l) {
        var g = document.createElement("img");
        g.width = 1;
        g.height = 1;
        g.src = l;
        return g
    }, aE = function (l) {
        var g = J(l);
        g.onload = g.onerror = function () {
            g.onload = null;
            g.onerror = null
        }
    };
    r.util.Nt = aB;
    r.tracker = {
        sendOld: function (s, p, l, t) {
            return;
            var y = l && (l.jdac + "||" + l.jdje + "||" + l.jdsc + "||" + l.jdsr + "||" + l.jdul + "||" + l.jdcs + "||" + aD(l.jddt) + "||" + l.jdhn + "||" + l.jdfl + "||" + l.jdos + "||" + l.jdbr + "||" + l.jdbv + "||" + l.jdwb + "||" + l.jdxb + "||" + l.jdyb + "||" + l.jdzb + "||" + l.jdcb + "||" + l.jdusc + "||" + l.jducp + "||" + l.jdumd + "||" + l.jduct + "||" + l.jdlt + "||" + l.jdtad);
            if (y) {
                y += "||" + aD(l.pinid)
            }
            var g = ("https:" == document.location.protocol ? "https://cscssl" : "http://csc") + ".jd.com/log.ashx?type1=" + aD(s) + "&type2=" + aD(p) + "&pin=" + aD(q.get(aQ)) + "&uuid=" + l.jduid + "&sid=" + l.jdsid + (l.jdak ? ("&utmp=" + document.location.href + aD("&clickid=" + l.jdak)) : "") + "&referrer=" + aD(l.jdmr || "-") + "&jinfo=" + y + "&data=" + aD(t) + "&callback=?";
            $.getJSON(g, function () {
            })
        }, sendNew: function (l, s) {
            var p = aB();
            var g = ("https:" == document.location.protocol ? "https://mercury" : "http://mercury") + ".jd.com/log.gif?t=" + l + "&m=" + q.get(am) + "&pin=" + aD(q.get(aQ)) + "&uid=" + p.jduid + "&sid=" + p.jdsid + (p.jdak ? ("&cul=" + document.location.href + aD("&clickid=" + p.jdak)) : "") + "&v=" + aD(s) + "&ref=" + aD(ap.referrer) + "&rm=" + (new Date).getTime();
            aE(g)
        }, ngloader: function (g, p) {
            var l = aB();
            var s = {
                je: l.jdje,
                sc: l.jdsc,
                sr: l.jdsr,
                ul: l.jdul,
                cs: l.jdcs,
                dt: l.jddt,
                hn: l.jdhn,
                fl: l.jdfl,
                os: l.jdos,
                br: l.jdbr,
                bv: l.jdbv,
                wb: l.jdwb,
                xb: l.jdxb,
                yb: l.jdyb,
                zb: l.jdzb,
                cb: l.jdcb,
                usc: l.jdusc,
                ucp: l.jducp,
                umd: l.jdumd,
                uct: l.jduct,
                ct: new Date().getTime(),
                lt: l.jdlt,
                tad: l.jdtad
            };
            this.ngaloader(g, s, p)
        }, ngaloader: function (l, y, p) {
            var s = "";
            for (var g in y) {
                s += ((g + "=" + y[g]) + "$")
            }
            if (p) {
                for (var g in p) {
                    s += ((g + "=" + p[g]) + "$")
                }
            }
            s += "pinid=" + q.get(al) + "$";
            s = s.substring(0, s.length - 1);
            this.sendNew(l, s)
        }, ngloaderJSON: function (g, p) {
            var l = aB();
            p.pinid = q.get(al);
            p.je = l.jdje;
            p.sc = l.jdsc;
            p.sr = l.jdsr;
            p.ul = l.jdul;
            p.cs = l.jdcs;
            p.dt = l.jddt;
            p.hn = l.jdhn;
            p.fl = l.jdfl;
            p.os = l.jdos;
            p.br = l.jdbr;
            p.bv = l.jdbv;
            p.wb = l.jdwb;
            p.xb = l.jdxb;
            p.yb = l.jdyb;
            p.zb = l.jdzb;
            p.cb = l.jdcb;
            p.usc = l.jdusc;
            p.ucp = l.jducp;
            p.umd = l.jdumd;
            p.uct = l.jduct;
            p.ct = new Date().getTime();
            p.lt = l.jdlt;
            p.tad = l.jdtad;
            this.sendNew(g, $.toJSON(p))
        }, bloading: function (p, g, s) {
            var l = aT();
            this.loading(p, g, l, s);
            var t = {
                je: l.jdje,
                sc: l.jdsc,
                sr: l.jdsr,
                ul: l.jdul,
                cs: l.jdcs,
                dt: l.jddt,
                hn: l.jdhn,
                fl: l.jdfl,
                os: l.jdos,
                br: l.jdbr,
                bv: l.jdbv,
                wb: l.jdwb,
                xb: l.jdxb,
                yb: l.jdyb,
                zb: l.jdzb,
                cb: l.jdcb,
                usc: l.jdusc,
                ucp: l.jducp,
                umd: l.jdumd,
                uct: l.jduct,
                lt: l.jdlt,
                ct: s,
                tad: l.jdtad
            };
            this.ngaloader("www.100000", t);
            (l.jduid % 1000) === 1 && this.ngloader("jsver.000000", {jsfile: "wl", jsver: "20141223"})
        }, loading: function (p, l, g, s) {
            this.sendOld(p, l, g, JA.util.join(s))
        }, aloading: function (p, l, s) {
            var g = aB();
            this.loading(p, l, g, s)
        }, aloadingJSON: function (p, l, s) {
            var g = aB();
            this.sendOld(p, l, g, $.toJSON(s))
        }, adshow: function (l) {
            var g = aO(l);
            this.loading("AD", "IM", g, "")
        }, adclick: function (l) {
            var g = aO(l, 1);
            this.loading("AD", "CL", g, "")
        }
    };
    window.JA = r;
    r.tracker.bloading("J", "A", new Date().getTime());
    var T = $(".w .crumb a").length === 5 && /e.jd.com\/products\/(\d*)-(\d*)-(\d*).html[\w\W]*?e.jd.com\/(\d*).html/.exec($(".w .crumb").html());
    if ((window.pageConfig && window.pageConfig.product && window.pageConfig.product.cat) || T) {
        r.tracker.ngloader("item.010001", {
            sku: T[4] || window.pageConfig.product.skuid,
            cid1: T[1] || window.pageConfig.product.cat[0],
            cid2: T[2] || window.pageConfig.product.cat[1],
            cid3: T[3] || window.pageConfig.product.cat[2],
            brand: T ? "0" : window.pageConfig.product.brand
        })
    }
    (function () {
        if (isChecked()) {
            SucInfoMethod.Init();
            var y = getCookie("_distM");
            if (y && y == SucInfo_OrderId) {
                return true
            }
            var g = ["p000", "p100", "np000", "np100"];
            for (var s = 0; s < g.length; s++) {
                var D = getCookie(g[s]);
                if (D != null && D != "") {
                    log("HomePageOrder", g[s])
                }
            }
            var p = "1:2:3:4:5:1a:1b:BR1:BR2:BR3:BR4:BR5:DDR:GR1:GR2:GR3:GR4:VR1:VR2:VR3:VR4:VR5:NR:CR1:CR2:CR3:SR1:SR2:SR3:SR4:Indiv&Simi:Indiv&OthC:Indiv&AllC:Zd";
            simpleMold(p.split(":"), "R", "reWids", "4");
            var C = "Club,ThirdRec,AttRec,OCRec,SORec,EBRec,BookSpecial,BookTrack,BookHis,Coupon,GlobalTrack,GlobalHis,History,historyreco_s,historyreco_c";
            complexMold(C.split(","), "R", "reWids", "4");
            var l = ["v", "TrackRec", "TrackHis", "CouDan", "CarAcc", "Zd", "Tc", "g", "s", "Book", "BookSpecial", "BookTrack", "BookHis", "GlobalTrack", "GlobalHis", "History", "Hiss", "Hisc", "simi", "GThirdRec", "PtoAccy", "AtoAccy"];
            complexMold(l, "o", "rod", "d", true);
            RecommendTrans("reHome2012,_rtbook", "N", "4");
            complexMold(["_rdCube"], "Cube", "", "4");
            simpleMold(["SEO"], "S", "seWids", "4");
            setCookieMills("_distM", SucInfo_OrderId, 86400000);
            setCookieMills("_ghis", "", -1);
            log("7", "2", SucInfo_OrderId, SucInfo_OrderType, SucInfo_OrderDetail);
            var t = aB();
            JA && JA.tracker.ngloader("order.100000", {
                orderid: SucInfo_OrderId,
                ordertype: SucInfo_OrderType,
                orderdetail: SucInfo_OrderDetail,
                cb: t.jdcb
            })
        }
    })()
})();
function log(c, b) {
    var d = new Date().getTime();
    if (1447088400000 < d && d < 1447343999000) {
        if ("d" == c && "c" == b) {
            return
        }
    }
    var a = Array.prototype.slice.call(arguments);
    a = a && a.slice(2);
    JA && JA.tracker.aloading(c, b, a);
    JA && JA.tracker.ngloader("other.000000", {t1: c, t2: b, p0: encodeURIComponent(JA.util.join(a))})
}
function logJSON(b, a, d) {
    if (!JA) {
        return !1
    }
    var c = new Date().getTime();
    if (1447088400000 < c && c < 1447343999000) {
        if ("pv_stock" == b && "sku" == a) {
            return
        }
    }
    JA.tracker.aloadingJSON(b, a, d);
    JA.tracker.ngloaderJSON("other.000000", {t1: b, t2: a, p0: d})
}
(function () {
    if (typeof jdpts != "object") {
        return
    }
    if (jdpts._cls) {
        log(jdpts._cls.split(".")[0], jdpts._cls.split(".")[1])
    }
})();
Clublog();