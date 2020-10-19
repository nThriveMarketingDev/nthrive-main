(function (e, t, i) {
    "use strict";
    var s,
        o,
        n,
        a,
        r,
        l,
        d,
        c,
        p,
        u,
        h,
        f,
        m,
        v,
        g,
        b,
        y,
        $,
        w,
        k,
        C = "accessibleMegaMenu",
        T = {
            uuidPrefix: "accessible-megamenu",
            menuClass: "accessible-megamenu",
            topNavItemClass: "accessible-megamenu-top-nav-item",
            panelClass: "accessible-megamenu-panel",
            panelGroupClass: "accessible-megamenu-panel-group",
            hoverClass: "hover",
            focusClass: "focus",
            openClass: "open",
            toggleButtonClass: "accessible-megamenu-toggle",
            openDelay: 0,
            closeDelay: 250,
            openOnMouseover: !1,
        },
        S = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            keyMap: {
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                190: ".",
            },
        },
        x = t.clearTimeout,
        A = t.setTimeout,
        O = t.opera && "[object Opera]" === t.opera.toString();
    function E(t, i) {
        (this.element = t), (this.settings = e.extend({}, T, i)), (this._defaults = T), (this._name = C), (this.mouseTimeoutID = null), (this.focusTimeoutID = null), (this.mouseFocused = !1), (this.justFocused = !1), this.init();
    }
    function P(t) {
        return (
            e.expr.filters.visible(t) &&
            !e(t)
                .parents()
                .addBack()
                .filter(function () {
                    return "hidden" === e.css(this, "visibility");
                }).length
        );
    }
    function N(t, i) {
        var s,
            o,
            n,
            a = t.nodeName.toLowerCase();
        return "area" === a
            ? ((o = (s = t.parentNode).name), !(!t.href || !o || "map" !== s.nodeName.toLowerCase()) && !!(n = e("img[usemap=#" + o + "]")[0]) && P(n))
            : (/input|select|textarea|button|object/.test(a) ? !t.disabled : ("a" === a && t.href) || i) && P(t);
    }
    (E.prototype =
        (($ = 0),
            (w = ""),
            (k = "ontouchstart" in t || t.navigator.msMaxTouchPoints),
            (s = function (t) {
                return e(t)
                    .closest(":data(plugin_" + C + ")")
                    .data("plugin_" + C);
            }),
            (o = function (t) {
                t = e(t);
                var i = this.settings;
                t.attr("id") || t.attr("id", i.uuidPrefix + "-" + new Date().getTime() + "-" + ++$);
            }),
            (n = function (t, s) {
                var o,
                    n = e(t.target),
                    a = this,
                    r = this.settings,
                    l = this.menu,
                    d = n.closest("." + r.topNavItemClass),
                    c = n.hasClass(r.panelClass) ? n : n.closest("." + r.panelClass);
                if ((g.call(this, !0), s))
                    if ((d = l.find("." + r.topNavItemClass + " ." + r.openClass + ":first").closest("." + r.topNavItemClass)).is(t.relatedTarget) || d.has(t.relatedTarget).length > 0)
                        0 === d.length &&
                            l
                                .find("[aria-expanded=true]")
                                .attr("aria-expanded", "false")
                                .removeClass(r.openClass)
                                .filter("." + r.panelClass)
                                .attr("aria-hidden", "true");
                    else {
                        if (("mouseout" === t.type || "focusout" === t.type) && d.has(i.activeElement).length > 0) return;
                        d
                            .find("[aria-expanded]")
                            .attr("aria-expanded", "false")
                            .removeClass(r.openClass)
                            .filter("." + r.panelClass)
                            .attr("aria-hidden", "true"),
                            (("keydown" === t.type && t.keyCode === S.ESCAPE) || "DOMAttrModified" === t.type) &&
                            ((o = d.find(":tabbable:first")),
                                A(function () {
                                    l.find("[aria-expanded]." + a.settings.panelClass).off("DOMAttrModified.accessible-megamenu"), o.focus(), (a.justFocused = !1);
                                }, 99));
                    }
                else {
                    x(a.focusTimeoutID),
                        d
                            .siblings()
                            .find("[aria-expanded]")
                            .attr("aria-expanded", "false")
                            .removeClass(r.openClass)
                            .filter("." + r.panelClass)
                            .attr("aria-hidden", "true"),
                        d
                            .find("[aria-expanded]")
                            .attr("aria-expanded", "true")
                            .addClass(r.openClass)
                            .filter("." + r.panelClass)
                            .attr("aria-hidden", "false");
                    var p = e("html")[0].scrollTop,
                        u = e("." + r.panelClass + "." + r.openClass).parent();
                    if (u.length) var h = u.offset().top;
                    p > h && (e("html")[0].scrollTop = h), "mouseover" === t.type && n.is(":tabbable") && 1 === d.length && 0 === c.length && l.has(i.activeElement).length > 0 && (n.focus(), (a.justFocused = !1)), g.call(a);
                }
            }),
            (a = function (t) {
                var i = e(t.target).closest(":tabbable"),
                    s = i.closest("." + this.settings.topNavItemClass),
                    o = i.closest("." + this.settings.panelClass);
                1 === s.length &&
                    0 === o.length &&
                    1 === s.find("." + this.settings.panelClass).length &&
                    (i.hasClass(this.settings.openClass)
                        ? this.justFocused
                            ? (t.preventDefault(), t.stopPropagation(), (this.justFocused = !1))
                            : (k || (!k && !this.settings.openOnMouseover)) && (t.preventDefault(), t.stopPropagation(), n.call(this, t, i.hasClass(this.settings.openClass)))
                        : (t.preventDefault(), t.stopPropagation(), n.call(this, t), (this.justFocused = !1)));
            }),
            (r = function () {
                this.justMoved = !0;
            }),
            (l = function (t) {
                0 === e(t.target).closest(this.menu).length && (t.preventDefault(), t.stopPropagation(), n.call(this, t, !0));
            }),
            (d = function (t) {
                "aria-expanded" === t.originalEvent.attrName && "false" === t.originalEvent.newValue && e(t.target).hasClass(this.settings.openClass) && (t.preventDefault(), t.stopPropagation(), n.call(this, t, !0));
            }),
            (c = function (t) {
                x(this.focusTimeoutID);
                var i = e(t.target),
                    s = i.closest("." + this.settings.panelClass);
                i.addClass(this.settings.focusClass),
                    (this.justFocused = !this.mouseFocused || (!this.settings.openOnMouseover && this.mouseFocused)),
                    (this.mouseFocused = !1),
                    this.justFocused && this.panels.not(s).filter("." + this.settings.openClass).length && n.call(this, t);
            }),
            (p = function (i) {
                this.justFocused = !1;
                var s = this,
                    o = e(i.target),
                    a = o.closest("." + this.settings.topNavItemClass);
                o.removeClass(this.settings.focusClass),
                    t.cvox
                        ? (s.focusTimeoutID = A(function () {
                            t.cvox.Api.getCurrentNode(function (e) {
                                a.has(e).length
                                    ? x(s.focusTimeoutID)
                                    : (s.focusTimeoutID = A(
                                        function (e, t, i) {
                                            n.call(e, t, i);
                                        },
                                        275,
                                        s,
                                        i,
                                        !0
                                    ));
                            });
                        }, 25))
                        : (s.focusTimeoutID = A(function () {
                            (s.mouseFocused && null === i.relatedTarget) || n.call(s, i, !0);
                        }, 300));
            }),
            (u = function (t) {
                var i,
                    o,
                    r,
                    l,
                    d,
                    c,
                    p = this.constructor === E ? this : s(this),
                    u = p.settings,
                    h = e(e(this).is("." + u.hoverClass + ":tabbable") ? this : t.target),
                    f = p.menu,
                    m = p.topnavitems,
                    v = h.closest("." + u.topNavItemClass),
                    g = f.find(":tabbable"),
                    b = h.hasClass(u.panelClass) ? h : h.closest("." + u.panelClass),
                    y = b.find("." + u.panelGroupClass),
                    $ = h.closest("." + u.panelGroupClass),
                    k = t.keyCode || t.which,
                    C = !1,
                    T = S.keyMap[t.keyCode] || "",
                    P = 1 === v.length && 0 === b.length;
                if (!h.is("input:focus, select:focus, textarea:focus, button:focus")) {
                    switch ((h.is("." + u.hoverClass + ":tabbable") && e("html").off("keydown.accessible-megamenu"), k)) {
                        case S.ESCAPE:
                            (this.mouseFocused = !1), n.call(p, t, !0);
                            break;
                        case S.DOWN:
                            t.preventDefault(),
                                (this.mouseFocused = !1),
                                P ? (n.call(p, t), (C = 1 === v.find("." + u.panelClass + " :tabbable:first").focus().length)) : (C = 1 === g.filter(":gt(" + g.index(h) + "):first").focus().length),
                                !C && O && (t.ctrlKey || t.metaKey) && ((r = (g = e(":tabbable")).index(h)), (C = 1 === e(":tabbable:gt(" + e(":tabbable").index(h) + "):first").focus().length));
                            break;
                        case S.UP:
                            t.preventDefault(),
                                (this.mouseFocused = !1),
                                P && h.hasClass(u.openClass)
                                    ? (n.call(p, t, !0),
                                        (i = m.filter(":lt(" + m.index(v) + "):last")).children("." + u.panelClass).length &&
                                        (C =
                                            1 ===
                                            i
                                                .find("[aria-expanded]")
                                                .attr("aria-expanded", "true")
                                                .addClass(u.openClass)
                                                .filter("." + u.panelClass)
                                                .attr("aria-hidden", "false")
                                                .find(":tabbable:last")
                                                .focus()))
                                    : P || (C = 1 === g.filter(":lt(" + g.index(h) + "):last").focus().length),
                                !C && O && (t.ctrlKey || t.metaKey) && ((r = (g = e(":tabbable")).index(h)), (C = 1 === e(":tabbable:lt(" + e(":tabbable").index(h) + "):first").focus().length));
                            break;
                        case S.RIGHT:
                            t.preventDefault(),
                                (this.mouseFocused = !1),
                                P
                                    ? (C =
                                        1 ===
                                        m
                                            .filter(":gt(" + m.index(v) + "):first")
                                            .find(":tabbable:first")
                                            .focus().length)
                                    : (y.length &&
                                        $.length &&
                                        (C =
                                            1 ===
                                            y
                                                .filter(":gt(" + y.index($) + "):first")
                                                .find(":tabbable:first")
                                                .focus().length),
                                        C || (C = 1 === v.find(":tabbable:first").focus().length));
                            break;
                        case S.LEFT:
                            t.preventDefault(),
                                (this.mouseFocused = !1),
                                P
                                    ? (C =
                                        1 ===
                                        m
                                            .filter(":lt(" + m.index(v) + "):last")
                                            .find(":tabbable:first")
                                            .focus().length)
                                    : (y.length &&
                                        $.length &&
                                        (C =
                                            1 ===
                                            y
                                                .filter(":lt(" + y.index($) + "):last")
                                                .find(":tabbable:first")
                                                .focus().length),
                                        C || (C = 1 === v.find(":tabbable:first").focus().length));
                            break;
                        case S.TAB:
                            (this.mouseFocused = !1),
                                (r = g.index(h)),
                                t.shiftKey && P && h.hasClass(u.openClass)
                                    ? (n.call(p, t, !0),
                                        (i = m.filter(":lt(" + m.index(v) + "):last")).children("." + u.panelClass).length &&
                                        (C = i
                                            .children()
                                            .attr("aria-expanded", "true")
                                            .addClass(u.openClass)
                                            .filter("." + u.panelClass)
                                            .attr("aria-hidden", "false")
                                            .find(":tabbable:last")
                                            .focus()))
                                    : t.shiftKey && r > 0
                                        ? (C = 1 === g.filter(":lt(" + r + "):last").focus().length)
                                        : !t.shiftKey && r < g.length - 1
                                            ? (C = 1 === g.filter(":gt(" + r + "):first").focus().length)
                                            : O &&
                                            ((r = (g = e(":tabbable")).index(h)),
                                                (C = t.shiftKey ? 1 === e(":tabbable:lt(" + e(":tabbable").index(h) + "):last").focus().length : 1 === e(":tabbable:gt(" + e(":tabbable").index(h) + "):first").focus().length)),
                                C && t.preventDefault();
                            break;
                        case S.SPACE:
                        case S.ENTER:
                            if (!P) return !0;
                            t.preventDefault(), a.call(p, t);
                            break;
                        default:
                            if ((x(this.keydownTimeoutID), 0 === (w += T !== w ? T : "").length)) return;
                            for (
                                this.keydownTimeoutID = A(function () {
                                    w = "";
                                }, 1e3),
                                g = P && !h.hasClass(u.openClass) ? g.filter(":not(." + u.panelClass + " :tabbable)") : v.find(":tabbable"),
                                t.shiftKey && (g = e(g.get().reverse())),
                                r = 0;
                                r < g.length;
                                r++
                            )
                                if ((l = g.eq(r)).is(h)) {
                                    o = 1 === w.length ? r + 1 : r;
                                    break;
                                }
                            for (c = new RegExp("^" + w.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), "i"), r = o; r < g.length; r++)
                                if (((l = g.eq(r)), (d = e.trim(l.text())), c.test(d))) {
                                    (C = !0), l.focus();
                                    break;
                                }
                            if (!C)
                                for (r = 0; r < o; r++)
                                    if (((l = g.eq(r)), (d = e.trim(l.text())), c.test(d))) {
                                        l.focus();
                                        break;
                                    }
                    }
                    p.justFocused = !1;
                }
            }),
            (h = function (t) {
                (e(t.target).closest(this.settings.panelClass) || e(t.target).closest(":focusable").length) &&
                    ((this.mouseFocused = !0), e(t.target).closest(this.settings.menuClass) && e("html").on("keydown.accessible-megamenu", e.proxy(u, t.target))),
                    x(this.mouseTimeoutID),
                    (this.mouseTimeoutID = A(function () {
                        x(this.focusTimeoutID);
                    }, 1));
            }),
            (f = function (t) {
                x(this.mouseTimeoutID);
                var i = this;
                i.settings.openOnMouseover &&
                    (this.mouseTimeoutID = A(function () {
                        e(t.target).addClass(i.settings.hoverClass), n.call(i, t), e(t.target).closest(i.settings.menuClass) && e("html").on("keydown.accessible-megamenu", e.proxy(u, t.target));
                    }, this.settings.openDelay));
            }),
            (m = function (t) {
                x(this.mouseTimeoutID);
                var i = this;
                i.settings.openOnMouseover &&
                    (e(t.target).removeClass(i.settings.hoverClass),
                        (i.mouseTimeoutID = A(function () {
                            n.call(i, t, !0);
                        }, this.settings.closeDelay)),
                        e(t.target).is(":tabbable") && e("html").off("keydown.accessible-megamenu"));
            }),
            (v = function () {
                var e = "true" === this.toggleButton.attr("aria-expanded");
                this.toggleButton.attr({ "aria-expanded": !e, "aria-pressed": !e });
            }),
            (g = function (t) {
                var i = this.menu;
                t
                    ? (e("html").off("mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu"),
                        i.find("[aria-expanded]." + this.settings.panelClass).off("DOMAttrModified.accessible-megamenu"))
                    : (e("html").on("mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu", e.proxy(l, this)),
                        i.find("[aria-expanded=true]." + this.settings.panelClass).on("DOMAttrModified.accessible-megamenu", e.proxy(d, this)));
            }),
            (b = function () {
                var t = this.menu,
                    s = this.toggleButton;
                t
                    .on("focusin.accessible-megamenu", ":focusable, ." + this.settings.panelClass, e.proxy(c, this))
                    .on("focusout.accessible-megamenu", ":focusable, ." + this.settings.panelClass, e.proxy(p, this))
                    .on("keydown.accessible-megamenu", e.proxy(u, this))
                    .on("mouseover.accessible-megamenu", e.proxy(f, this))
                    .on("mouseout.accessible-megamenu", e.proxy(m, this))
                    .on("mousedown.accessible-megamenu", e.proxy(h, this))
                    .on("click.accessible-megamenu", e.proxy(a, this)),
                    s.on("click.accessible-megamenu", e.proxy(v, this)),
                    k && t.on("touchmove.accessible-megamenu", e.proxy(r, this)),
                    e(i.activeElement).closest(t).length && e(i.activeElement).trigger("focusin.accessible-megamenu");
            }),
            (y = function () {
                var e = this.menu,
                    t = this.toggleButton;
                e.off(".accessible-megamenu"), e.find("[aria-expanded=true]." + this.settings.panelClass).length && g.call(this, !0), t.off(".accessible-megamenu");
            }),
        {
            constructor: E,
            init: function () {
                var t = this.settings,
                    i = e(this.element),
                    s = i.children("ol,ul").first(),
                    o = s.children(),
                    n = i.children("button").first();
                this.start(t, i, s, o, n);
            },
            start: function (t, i, s, n, a) {
                var r = this;
                (this.settings = t),
                    (this.menu = s),
                    (this.topnavitems = n),
                    (this.toggleButton = a),
                    i.attr("role", "navigation"),
                    o.call(r, s),
                    s.addClass(t.menuClass),
                    s.addClass(["js", t.menuClass].join("-")),
                    n.each(function (i, s) {
                        var n, a;
                        (s = e(s)).addClass(t.topNavItemClass),
                            (n = s.find(":tabbable:first")),
                            (a = s.children(":not(:tabbable):last")),
                            o.call(r, n),
                            a.length &&
                            (o.call(r, a),
                                n.attr({ role: "button", "aria-controls": a.attr("id"), "aria-expanded": !1, tabindex: 0 }),
                                a.attr({ role: "region", "aria-expanded": !1, "aria-hidden": !0 }).addClass(t.panelClass).not("[aria-labelledby]").attr("aria-labelledby", n.attr("id")));
                    }),
                    (this.panels = s.find("." + t.panelClass)),
                    s.find("hr").attr("role", "separator"),
                    a.addClass(t.toggleButtonClass),
                    a.attr({ "aria-expanded": !1, "aria-pressed": !1, "aria-controls": s.attr("id") }),
                    b.call(this);
            },
            destroy: function () {
                this.menu.removeClass(["js", this.settings.menuClass].join("-")), y.call(this, !0);
            },
            getDefaults: function () {
                return this._defaults;
            },
            getOption: function (e) {
                return this.settings[e];
            },
            getAllOptions: function () {
                return this.settings;
            },
            setOption: function (e, t, i) {
                (this.settings[e] = t), i && this.init();
            },
        })),
        (e.fn[C] = function (t) {
            return this.each(function () {
                var i = e.data(this, "plugin_" + C);
                i ? "function" == typeof i[t] && i[t].apply(i, Array.prototype.slice.call(arguments, 1)) : e.data(this, "plugin_" + C, new e.fn[C].AccessibleMegaMenu(this, t));
            });
        }),
        (e.fn[C].AccessibleMegaMenu = E),
        e.extend(e.expr[":"], {
            data: e.expr.createPseudo
                ? e.expr.createPseudo(function (t) {
                    return function (i) {
                        return !!e.data(i, t);
                    };
                })
                : function (t, i, s) {
                    return !!e.data(t, s[3]);
                },
            focusable: function (t) {
                return N(t, !isNaN(e.attr(t, "tabindex")));
            },
            tabbable: function (t) {
                var i = e.attr(t, "tabindex"),
                    s = isNaN(i);
                return (s || i >= 0) && N(t, !s);
            },
        });
})(jQuery, window, document),
    jQuery &&
    (function (e) {
        "use strict";
        e(document).ready(function () {
            e(".nth-content").accessibleMegaMenu({
                uuidPrefix: "menu",
                menuClass: "menu",
                topNavItemClass: "nav-top-level",
                panelClass: "menu-panel",
                panelGroupClass: "menu-panel-group",
                hoverClass: "hover",
                focusClass: "focus",
                openClass: "open",
                openOnMouseover: !0,
            }),
                setTimeout(function () {
                    e("body").removeClass("init");
                }, 500);
        });
    })(jQuery),
    window.addEventListener
        ? window.addEventListener(
            "hashchange",
            function (e) {
                var t = document.getElementById(location.hash.substring(1));
                t && (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) || (t.tabIndex = -1), t.focus());
            },
            !1
        )
        : window.attachEvent(
            "hashchange",
            function (e) {
                var t = document.getElementById(location.hash.substring(1));
                t && (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) || (t.tabIndex = -1), t.focus());
            },
            !1
        ),
    $(document).ready(function () {
        $("#page-nav").length && $("#page-nav").offset().top,
            $(window).scroll(function () {
                var e = $(this).scrollTop();
                window.location.href.indexOf("com/hub/") > -1
                    ? e >= 100
                        ? ($("#page-nav").addClass("fixed"), $(".logo-anim").addClass("move"))
                        : ($("#page-nav").removeClass("fixed"), $(".logo-anim").removeClass("move"))
                    : e >= 446
                        ? ($("#page-nav").addClass("fixed"), $(".logo-anim").addClass("move"))
                        : ($("#page-nav").removeClass("fixed"), $(".logo-anim").removeClass("move"));
            }),
            $("a").on("keydown", function (e) {
                9 === e.keyCode && $("body").addClass("tab");
            }),
            $("a").on("keyup", function (e) {
                9 === e.keyCode && $("body").addClass("tab");
            }),
            $("button").on("keydown", function (e) {
                9 === e.keyCode && $("body").addClass("tab");
            }),
            $("button").on("keyup", function (e) {
                9 === e.keyCode && $("body").addClass("tab");
            }),
            $(".logo-wrap").prepend('<div id="toggleMenu" role="button" aria-controls="main-nav"> <a href="#"><span class="icon-menu">&#9776;</span><span class="icon-menu-closed">X</span></a></div>'),
            $("#main-nav").attr("aria-labelledby", "main-nav-label").attr("role", "region"),
            $('li.nav-top-level:has("div.panel-wrap")').on("keyup click", function (e) {
                9 === e.keyCode &&
                    ($(this).children("a").addClass("open").attr("aria-expanded", !0), $("div.panel-wrap").removeClass("open"), $(this).children("div.panel-wrap").addClass("open").attr("aria-expanded", !0).attr("aria-hidden", !1));
            }),
            $("li.nav-top-level")
                .not(':has("div.panel-wrap")')
                .on("keyup not click", function (e) {
                    9 === e.keyCode && $("div.panel-wrap").removeClass("open").attr("aria-expanded", !1);
                }),
            $(document).on("keydown", function (e) {
                27 === e.keyCode && $("div.panel-wrap").removeClass("open").attr("aria-expanded", !1);
            }),
            $("html").removeClass("no-js"),
            $("#toggleMenu").on("click", function () {
                return (
                    $("body").toggleClass("m-open"),
                    $(".main-nav").attr("aria-expanded", function (e, t) {
                        return "true" == t ? "false" : "true";
                    }),
                    !1
                );
            }),
            $(".nth-link-search").click(function (e) {
                $("#primary-nav").toggleClass("search-open"), e.stopPropagation();
            }),
            $("#nth-searchview").click(function (e) {
                e.stopPropagation();
            }),
            $(document).click(function () {
                $("#primary-nav").removeClass("search-open");
            }),
            $("#nth-searchview-close").click(function (e) {
                $("#primary-nav").removeClass("search-open");
            }),
            $(".skip-nav").on("click", function () {
                $("#section-2").length
                    ? ($("#section-2").focus(), $("#section-2").attr("tabindex", 1))
                    : $("#search-bar").length
                        ? ($("#search-bar").focus(), $("#search-bar").attr("tabindex", 1))
                        : ($("article").focus(), $("article").attr("tabindex", 1));
            });
    });

$(document).ready(function (e) {
    e(".dropdown-toggle").click(function () {
        $(".submenu-change").removeClass("active-link"), $(".right-column-wrap > div.submenu-change-default:nth-of-type(1)").show();
        var t = e(this).parent(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".dropdown-menu").hide(), e(".dropdown-toggle").removeClass("active"), t && e(this).parent(".button-dropdown").children(".dropdown-menu").toggle().parent(".button-dropdown").children(".dropdown-toggle").addClass("active");
    }),
        e(document).bind("click", function (t) {
            e(t.target).parents().hasClass("button-dropdown") || e(".button-dropdown .dropdown-menu").hide();
        }),
        e(document).bind("click", function (t) {
            e(t.target).parents().hasClass("button-dropdown") || e(".button-dropdown .dropdown-toggle").removeClass("active");
        });
});

$(document).ready(function () {
    $(".accordion-toggle").removeClass("accordion-open"),
        $(window).width() <= 840 &&
        ($(".accordion").attr({ role: "tablist", multiselectable: "true" }),
            $(".accordion-content").attr("id", function (e) {
                return "panel-" + e;
            }),
            $(".accordion-content").attr("aria-labelledby", function (e) {
                return "control-panel-" + e;
            }),
            $(".accordion-content").attr("aria-hidden", "true"),
            $(".accordion .accordion-content").attr("role", "tabpanel"),
            $(".accordion-toggle").each(function (e) {
                ($target = $(this).children(".accordion-content")[0].id),
                    $(this)
                        .attr("aria-expanded", "false")
                        .attr("aria-controls", $target)
                        .attr("id", "control-" + $target)
                        .removeClass("accordion-open");
            }),
            $(".dropdown-toggle").click(function (e) {
                return (
                    e.preventDefault(),
                    "false" == $(this).parent(".accordion-toggle").attr("aria-expanded")
                        ? ($(this).parent().parent(".accordion").find(".accordion-toggle").not(this).attr("aria-expanded", !1).removeClass("accordion-open").children(".accordion-content").attr("aria-hidden", "true").slideUp(200),
                            $(this).parent(".accordion-toggle").attr("aria-expanded", !0).removeClass("accordion-open").addClass("accordion-open").children(".accordion-content").slideToggle(200))
                        : $(this).parent(".accordion-toggle").attr("aria-expanded", !1).removeClass("accordion-open").children(".accordion-content").slideUp(200).attr("aria-hidden", "true"),
                    !1
                );
            }));
});
