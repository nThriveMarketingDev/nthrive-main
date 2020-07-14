import $ from "jquery";

!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? e(require("jquery"))
    : e(jQuery);
})(function (e) {
  function t(e) {
    return n.raw ? e : encodeURIComponent(e);
  }
  function i(e) {
    return n.raw ? e : decodeURIComponent(e);
  }
  function s(t, i) {
    var s = n.raw
      ? t
      : (function (e) {
          0 === e.indexOf('"') &&
            (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
          try {
            return (
              (e = decodeURIComponent(e.replace(o, " "))),
              n.json ? JSON.parse(e) : e
            );
          } catch (e) {}
        })(t);
    return e.isFunction(i) ? i(s) : s;
  }
  var o = /\+/g,
    n = (e.cookie = function (o, a, r) {
      if (void 0 !== a && !e.isFunction(a)) {
        if ("number" == typeof (r = e.extend({}, n.defaults, r)).expires) {
          var l = r.expires,
            d = (r.expires = new Date());
          d.setTime(+d + 864e5 * l);
        }
        return (document.cookie = [
          t(o),
          "=",
          (function (e) {
            return t(n.json ? JSON.stringify(e) : String(e));
          })(a),
          r.expires ? "; expires=" + r.expires.toUTCString() : "",
          r.path ? "; path=" + r.path : "",
          r.domain ? "; domain=" + r.domain : "",
          r.secure ? "; secure" : "",
        ].join(""));
      }
      for (
        var c = o ? void 0 : {},
          p = document.cookie ? document.cookie.split("; ") : [],
          u = 0,
          h = p.length;
        h > u;
        u++
      ) {
        var f = p[u].split("="),
          m = i(f.shift()),
          v = f.join("=");
        if (o && o === m) {
          c = s(v, a);
          break;
        }
        o || void 0 === (v = s(v)) || (c[m] = v);
      }
      return c;
    });
  (n.defaults = {}),
    (e.removeCookie = function (t, i) {
      return (
        void 0 !== e.cookie(t) &&
        (e.cookie(t, "", e.extend({}, i, { expires: -1 })), !e.cookie(t))
      );
    });
}),
  $(".accept-close").click(function () {
    $.cookie("visited", "yes", { expires: 30 }),
      $(this).parent().parent().parent(".notification-bar").remove();
  }),
  $("header .popup-close").click(function () {
    $("body").addClass("notification-close"),
      $.cookie("headerNotification", "yes", { expires: 7 });
  }),
  $(document).ready(function () {
    $('.first:has(".panel-wrap")').on("keyup click", function (e) {
      9 === e.keyCode &&
        ($(this).children("a").addClass("open").attr("aria-expanded", !0),
        $(".panel-wrap").removeClass("open"),
        $(this)
          .children(".panel-wrap")
          .addClass("open")
          .attr("aria-expanded", !0)
          .attr("aria-hidden", !1));
    }),
      $(".first")
        .not(':has(".panel-wrap")')
        .on("keyup not click", function (e) {
          9 === e.keyCode &&
            ($(this).children("a").addClass("open").attr("aria-expanded", !0),
            $(".panel-wrap").removeClass("open"),
            $(this)
              .children(".panel-wrap")
              .addClass("open")
              .attr("aria-expanded", !0)
              .attr("aria-hidden", !1));
        }),
      ($boxMove = $(".news-box > a, .webinar-wrap a")),
      ($boxes = ".news-box, .webinar-wrap"),
      $boxMove.hover(
        function () {
          $(this).closest($boxes).addClass("hover-move");
        },
        function () {
          $(this).closest($boxes).removeClass("hover-move");
        }
      ),
      "yes" != $.cookie("visited")
        ? $("footer .notification-bar").removeClass("hide")
        : $("footer .notification-bar").removeClass("hide").addClass("hide"),
      ($.fn.capitalize = function () {
        return (
          $.each(this, function () {
            for (var e = this.value.split(" "), t = 0, i = e.length; t < i; t++)
              e[t] = e[t].charAt(0).toUpperCase() + e[t].slice(1).toLowerCase();
            this.value = e.join(" ");
          }),
          this
        );
      }),
      $(".capitalize")
        .on("keyup", function () {
          $(this).capitalize();
        })
        .capitalize(),
      $(".country").click(function () {
        ($dialCode = $(".highlight").data("country-code")),
          console.log($dialCode),
          $(".intl-tel-input")
            .removeClass("dial-us")
            .removeClass("dial-" + $dialCode)
            .addClass("dial-" + $dialCode);
      }),
      $(".dial-us input[type='tel']").length &&
        $(".dial-us input[type='tel']")
          .attr("onkeydown", "javascript:backspacerDOWN(this,event);")
          .attr("onkeyup", "javascript:backspacerUP(this,event);"),
      $.validator.addMethod(
        "alphabetFormat",
        function (e, t) {
          return this.optional(t) || /^[a-z\d\-'.\s]+$/i.test(e);
        },
        "No special characters, do not use all caps. (i.e. John)."
      ),
      $.validator.addMethod(
        "hasLowercase",
        function (e, t) {
          return !!this.optional(t) || /[a-z]/.test(e);
        },
        "Please do not use all caps."
      ),
      $.validator.addMethod(
        "notEqual",
        function (e, t, i) {
          var s = $(t).parents("form").find(i[0]),
            o = e,
            n = 0;
          if (
            (jQuery.each(s, function () {
              (thisVal = $(this).val()), thisVal == o && n++;
            }),
            this.optional(t) || n <= 1)
          )
            return !0;
        },
        "Please enter a Unique Value."
      ),
      $("#sales-question").validate({
        rules: {
          first_name: {
            required: !0,
            minlength: 2,
            alphabetFormat: !0,
            hasLowercase: !0,
            notEqual: [".std-input3"],
          },
          last_name: {
            required: !0,
            minlength: 2,
            alphabetFormat: !0,
            hasLowercase: !0,
            notEqual: [".std-input3"],
          },
          company: { required: !1, alphabetFormat: !0, hasLowercase: !0 },
          job_title: { required: !1, hasLowercase: !0 },
          phone: { required: !0, minlength: 7 },
          email: { required: !0, email: !0 },
          State: { required: !0 },
          permission_received: { required: !0 },
          Sales_Question: { required: !0, minlength: 5 },
        },
        messages: {
          first_name: {
            required: "Please enter your first name",
            minlength: "Your first name must consist of at least 2 characters",
            alphabetFormat: "No special characters.",
            hasLowercase: "Please do not use all caps. (i.e. John).",
            notEqual: "First Name cannot be the same as Last Name",
          },
          last_name: {
            required: "Please enter your last name",
            minlength: "Your last name must consist of at least 2 characters",
            alphabetFormat: "No special characters.",
            hasLowercase: "Please do not use all caps. (i.e. Doe).",
            notEqual: "First Name cannot be the same as Last Name",
          },
          company: {
            minlength: "Company name must consist of at least 3 characters",
            alphabetFormat: "No special characters.",
            hasLowercase: "Please do not use all caps.",
          },
          job_title: {
            minlength: "Job Title must consist of at least 3 characters",
            hasLowercase: "Please do not use all caps.",
          },
          phone: {
            required: "Please enter your phone number.(XXX) XXX-XXXX",
            minlength:
              "Your phone number must consist of at least 7 characters",
          },
          email: "Please enter a valid email address",
          State: "Please select your State",
          permission_received: "This checkbox is required.",
          Sales_Question: {
            required: "Please enter your question",
            minlength: "Your question must consist of at least 5 characters",
          },
        },
      });
  }),
  $(window).load(function () {
    var e,
      t = $(".left-column-wrap > div");
    $(window).keydown(function (i) {
      40 === i.which
        ? e
          ? (e.removeClass("key-selected"),
            (next = e.next()),
            (e =
              next.length > 0
                ? next.addClass("key-selected")
                : t.eq(0).addClass("key-selected")))
          : (e = t.eq(0).addClass("key-selected"))
        : 38 === i.which &&
          (e
            ? (e.removeClass("key-selected"),
              (next = e.prev()),
              (e =
                next.length > 0
                  ? next.addClass("key-selected")
                  : t.last().addClass("key-selected")))
            : (e = t.last().addClass("key-selected")));
    });
  }),
  $(document).ready(function () {
    $("#subscribe-form").validate({
      rules: { email: { required: !0, email: !0 } },
      messages: { email: { required: "Please enter a valid email address" } },
    }),
      $("#subscribe-form :input").focus(function () {
        $(this)
          .parent()
          .addClass("valid-group")
          .children("label.label-focus")
          .removeClass("label-focus")
          .addClass("label-blur");
      }),
      window.location.href.indexOf("b309b5f2-3dd0-40b1-92c0-c0c605ff664e") >
        -1 &&
        ($("#subscribe-form").addClass("hide"),
        $(".thank-you").removeClass("hide"),
        $("html, body").animate(
          { scrollTop: $("#popup-fixed").offset().top - 150 },
          "fast"
        )),
      $("#subscribe-form").submit(function () {
        $.ajax({
          type: "POST",
          url: "http://info.nthrive.com/l/311601/2017-06-14/d34n",
          data: { email: $("input[name=email]#email-1").val() },
          success: function () {
            $("#subscribe-form").addClass("hide"),
              $(".thank-you").removeClass("hide");
          },
        });
      }),
      $("#subscribe-form-body").validate({
        rules: { email: { required: !0, email: !0 } },
        messages: { email: { required: "Please enter a valid email address" } },
      }),
      $("#subscribe-form-body :input").focus(function () {
        $(this)
          .parent()
          .addClass("valid-group")
          .children("label.label-focus")
          .removeClass("label-focus")
          .addClass("label-blur");
      }),
      window.location.href.indexOf(
        "WcoFormId=e03e8096-9bb4-4cf4-9006-1d86466b63a2"
      ) > -1 &&
        ($("#subscribe-form-body").addClass("hide"),
        $("#thank-you-body").removeClass("hide"),
        $("html, body").animate(
          { scrollTop: $("#subscribe-body-anchor").offset().top - 150 },
          "fast"
        )),
      $("#subscribe-form-body").submit(function () {
        $.ajax({
          type: "POST",
          url: "http://info.nthrive.com/l/311601/2017-06-14/d34n",
          data: { email: $("input[name=email]#email-2").val() },
          success: function () {
            $("#subscribe-form-body").addClass("hide"),
              $(".thank-you-body").removeClass("hide");
          },
        });
      }),
      $("#form-download").validate({
        rules: {
          first_name: { required: !0, minlength: 3 },
          last_name: { required: !0, minlength: 3 },
          email: { required: !0, email: !0 },
        },
        messages: {
          first_name: {
            required: "Please enter your first name",
            minlength: "Your first name must consist of at least 3 characters",
          },
          last_name: {
            required: "Please enter your last name",
            minlength: "Your last name must consist of at least 3 characters",
          },
          email: "Please enter a valid email address",
        },
      });
  }),
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
      (this.element = t),
        (this.settings = e.extend({}, T, i)),
        (this._defaults = T),
        (this._name = C),
        (this.mouseTimeoutID = null),
        (this.focusTimeoutID = null),
        (this.mouseFocused = !1),
        (this.justFocused = !1),
        this.init();
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
        ? ((o = (s = t.parentNode).name),
          !(!t.href || !o || "map" !== s.nodeName.toLowerCase()) &&
            !!(n = e("img[usemap=#" + o + "]")[0]) &&
            P(n))
        : (/input|select|textarea|button|object/.test(a)
            ? !t.disabled
            : ("a" === a && t.href) || i) && P(t);
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
        t.attr("id") ||
          t.attr("id", i.uuidPrefix + "-" + new Date().getTime() + "-" + ++$);
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
          if (
            (d = l
              .find("." + r.topNavItemClass + " ." + r.openClass + ":first")
              .closest("." + r.topNavItemClass)).is(t.relatedTarget) ||
            d.has(t.relatedTarget).length > 0
          )
            0 === d.length &&
              l
                .find("[aria-expanded=true]")
                .attr("aria-expanded", "false")
                .removeClass(r.openClass)
                .filter("." + r.panelClass)
                .attr("aria-hidden", "true");
          else {
            if (
              ("mouseout" === t.type || "focusout" === t.type) &&
              d.has(i.activeElement).length > 0
            )
              return;
            d
              .find("[aria-expanded]")
              .attr("aria-expanded", "false")
              .removeClass(r.openClass)
              .filter("." + r.panelClass)
              .attr("aria-hidden", "true"),
              (("keydown" === t.type && t.keyCode === S.ESCAPE) ||
                "DOMAttrModified" === t.type) &&
                ((o = d.find(":tabbable:first")),
                A(function () {
                  l
                    .find("[aria-expanded]." + a.settings.panelClass)
                    .off("DOMAttrModified.accessible-megamenu"),
                    o.focus(),
                    (a.justFocused = !1);
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
          p > h && (e("html")[0].scrollTop = h),
            "mouseover" === t.type &&
              n.is(":tabbable") &&
              1 === d.length &&
              0 === c.length &&
              l.has(i.activeElement).length > 0 &&
              (n.focus(), (a.justFocused = !1)),
            g.call(a);
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
              ? (t.preventDefault(),
                t.stopPropagation(),
                (this.justFocused = !1))
              : (k || (!k && !this.settings.openOnMouseover)) &&
                (t.preventDefault(),
                t.stopPropagation(),
                n.call(this, t, i.hasClass(this.settings.openClass)))
            : (t.preventDefault(),
              t.stopPropagation(),
              n.call(this, t),
              (this.justFocused = !1)));
      }),
      (r = function () {
        this.justMoved = !0;
      }),
      (l = function (t) {
        0 === e(t.target).closest(this.menu).length &&
          (t.preventDefault(), t.stopPropagation(), n.call(this, t, !0));
      }),
      (d = function (t) {
        "aria-expanded" === t.originalEvent.attrName &&
          "false" === t.originalEvent.newValue &&
          e(t.target).hasClass(this.settings.openClass) &&
          (t.preventDefault(), t.stopPropagation(), n.call(this, t, !0));
      }),
      (c = function (t) {
        x(this.focusTimeoutID);
        var i = e(t.target),
          s = i.closest("." + this.settings.panelClass);
        i.addClass(this.settings.focusClass),
          (this.justFocused =
            !this.mouseFocused ||
            (!this.settings.openOnMouseover && this.mouseFocused)),
          (this.mouseFocused = !1),
          this.justFocused &&
            this.panels.not(s).filter("." + this.settings.openClass).length &&
            n.call(this, t);
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
                (s.mouseFocused && null === i.relatedTarget) ||
                  n.call(s, i, !0);
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
          switch (
            (h.is("." + u.hoverClass + ":tabbable") &&
              e("html").off("keydown.accessible-megamenu"),
            k)
          ) {
            case S.ESCAPE:
              (this.mouseFocused = !1), n.call(p, t, !0);
              break;
            case S.DOWN:
              t.preventDefault(),
                (this.mouseFocused = !1),
                P
                  ? (n.call(p, t),
                    (C =
                      1 ===
                      v.find("." + u.panelClass + " :tabbable:first").focus()
                        .length))
                  : (C =
                      1 ===
                      g.filter(":gt(" + g.index(h) + "):first").focus().length),
                !C &&
                  O &&
                  (t.ctrlKey || t.metaKey) &&
                  ((r = (g = e(":tabbable")).index(h)),
                  (C =
                    1 ===
                    e(
                      ":tabbable:gt(" + e(":tabbable").index(h) + "):first"
                    ).focus().length));
              break;
            case S.UP:
              t.preventDefault(),
                (this.mouseFocused = !1),
                P && h.hasClass(u.openClass)
                  ? (n.call(p, t, !0),
                    (i = m.filter(":lt(" + m.index(v) + "):last")).children(
                      "." + u.panelClass
                    ).length &&
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
                  : P ||
                    (C =
                      1 ===
                      g.filter(":lt(" + g.index(h) + "):last").focus().length),
                !C &&
                  O &&
                  (t.ctrlKey || t.metaKey) &&
                  ((r = (g = e(":tabbable")).index(h)),
                  (C =
                    1 ===
                    e(
                      ":tabbable:lt(" + e(":tabbable").index(h) + "):first"
                    ).focus().length));
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
                    (i = m.filter(":lt(" + m.index(v) + "):last")).children(
                      "." + u.panelClass
                    ).length &&
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
                    (C = t.shiftKey
                      ? 1 ===
                        e(
                          ":tabbable:lt(" + e(":tabbable").index(h) + "):last"
                        ).focus().length
                      : 1 ===
                        e(
                          ":tabbable:gt(" + e(":tabbable").index(h) + "):first"
                        ).focus().length)),
                C && t.preventDefault();
              break;
            case S.SPACE:
            case S.ENTER:
              if (!P) return !0;
              t.preventDefault(), a.call(p, t);
              break;
            default:
              if (
                (x(this.keydownTimeoutID), 0 === (w += T !== w ? T : "").length)
              )
                return;
              for (
                this.keydownTimeoutID = A(function () {
                  w = "";
                }, 1e3),
                  g =
                    P && !h.hasClass(u.openClass)
                      ? g.filter(":not(." + u.panelClass + " :tabbable)")
                      : v.find(":tabbable"),
                  t.shiftKey && (g = e(g.get().reverse())),
                  r = 0;
                r < g.length;
                r++
              )
                if ((l = g.eq(r)).is(h)) {
                  o = 1 === w.length ? r + 1 : r;
                  break;
                }
              for (
                c = new RegExp(
                  "^" + w.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                  "i"
                ),
                  r = o;
                r < g.length;
                r++
              )
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
        (e(t.target).closest(this.settings.panelClass) ||
          e(t.target).closest(":focusable").length) &&
          ((this.mouseFocused = !0),
          e(t.target).closest(this.settings.menuClass) &&
            e("html").on("keydown.accessible-megamenu", e.proxy(u, t.target))),
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
            e(t.target).addClass(i.settings.hoverClass),
              n.call(i, t),
              e(t.target).closest(i.settings.menuClass) &&
                e("html").on(
                  "keydown.accessible-megamenu",
                  e.proxy(u, t.target)
                );
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
          e(t.target).is(":tabbable") &&
            e("html").off("keydown.accessible-megamenu"));
      }),
      (v = function () {
        var e = "true" === this.toggleButton.attr("aria-expanded");
        this.toggleButton.attr({ "aria-expanded": !e, "aria-pressed": !e });
      }),
      (g = function (t) {
        var i = this.menu;
        t
          ? (e("html").off(
              "mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu"
            ),
            i
              .find("[aria-expanded]." + this.settings.panelClass)
              .off("DOMAttrModified.accessible-megamenu"))
          : (e("html").on(
              "mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu",
              e.proxy(l, this)
            ),
            i
              .find("[aria-expanded=true]." + this.settings.panelClass)
              .on("DOMAttrModified.accessible-megamenu", e.proxy(d, this)));
      }),
      (b = function () {
        var t = this.menu,
          s = this.toggleButton;
        t
          .on(
            "focusin.accessible-megamenu",
            ":focusable, ." + this.settings.panelClass,
            e.proxy(c, this)
          )
          .on(
            "focusout.accessible-megamenu",
            ":focusable, ." + this.settings.panelClass,
            e.proxy(p, this)
          )
          .on("keydown.accessible-megamenu", e.proxy(u, this))
          .on("mouseover.accessible-megamenu", e.proxy(f, this))
          .on("mouseout.accessible-megamenu", e.proxy(m, this))
          .on("mousedown.accessible-megamenu", e.proxy(h, this))
          .on("click.accessible-megamenu", e.proxy(a, this)),
          s.on("click.accessible-megamenu", e.proxy(v, this)),
          k && t.on("touchmove.accessible-megamenu", e.proxy(r, this)),
          e(i.activeElement).closest(t).length &&
            e(i.activeElement).trigger("focusin.accessible-megamenu");
      }),
      (y = function () {
        var e = this.menu,
          t = this.toggleButton;
        e.off(".accessible-megamenu"),
          e.find("[aria-expanded=true]." + this.settings.panelClass).length &&
            g.call(this, !0),
          t.off(".accessible-megamenu");
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
                  n.attr({
                    role: "button",
                    "aria-controls": a.attr("id"),
                    "aria-expanded": !1,
                    tabindex: 0,
                  }),
                  a
                    .attr({
                      role: "region",
                      "aria-expanded": !1,
                      "aria-hidden": !0,
                    })
                    .addClass(t.panelClass)
                    .not("[aria-labelledby]")
                    .attr("aria-labelledby", n.attr("id")));
            }),
            (this.panels = s.find("." + t.panelClass)),
            s.find("hr").attr("role", "separator"),
            a.addClass(t.toggleButtonClass),
            a.attr({
              "aria-expanded": !1,
              "aria-pressed": !1,
              "aria-controls": s.attr("id"),
            }),
            b.call(this);
        },
        destroy: function () {
          this.menu.removeClass(["js", this.settings.menuClass].join("-")),
            y.call(this, !0);
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
          i
            ? "function" == typeof i[t] &&
              i[t].apply(i, Array.prototype.slice.call(arguments, 1))
            : e.data(
                this,
                "plugin_" + C,
                new e.fn[C].AccessibleMegaMenu(this, t)
              );
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
          t &&
            (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) ||
              (t.tabIndex = -1),
            t.focus());
        },
        !1
      )
    : window.attachEvent(
        "hashchange",
        function (e) {
          var t = document.getElementById(location.hash.substring(1));
          t &&
            (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) ||
              (t.tabIndex = -1),
            t.focus());
        },
        !1
      ),
  $(document).ready(function () {
    $("#page-nav").length && $("#page-nav").offset().top,
      $(window).scroll(function () {
        var e = $(this).scrollTop();
        window.location.href.indexOf("com/hub/") > -1
          ? e >= 100
            ? ($("#page-nav").addClass("fixed"),
              $(".logo-anim").addClass("move"))
            : ($("#page-nav").removeClass("fixed"),
              $(".logo-anim").removeClass("move"))
          : e >= 446
          ? ($("#page-nav").addClass("fixed"), $(".logo-anim").addClass("move"))
          : ($("#page-nav").removeClass("fixed"),
            $(".logo-anim").removeClass("move"));
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
      $(".logo-wrap").prepend(
        '<div id="toggleMenu" role="button" aria-controls="main-nav"> <a href="#"><span class="icon-menu">&#9776;</span><span class="icon-menu-closed">X</span></a></div>'
      ),
      $("#main-nav")
        .attr("aria-labelledby", "main-nav-label")
        .attr("role", "region"),
      $('li.nav-top-level:has("div.panel-wrap")').on("keyup click", function (
        e
      ) {
        9 === e.keyCode &&
          ($(this).children("a").addClass("open").attr("aria-expanded", !0),
          $("div.panel-wrap").removeClass("open"),
          $(this)
            .children("div.panel-wrap")
            .addClass("open")
            .attr("aria-expanded", !0)
            .attr("aria-hidden", !1));
      }),
      $("li.nav-top-level")
        .not(':has("div.panel-wrap")')
        .on("keyup not click", function (e) {
          9 === e.keyCode &&
            $("div.panel-wrap").removeClass("open").attr("aria-expanded", !1);
        }),
      $(document).on("keydown", function (e) {
        27 === e.keyCode &&
          $("div.panel-wrap").removeClass("open").attr("aria-expanded", !1);
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
var num =
  $("#section-1").length > 0
    ? $('[id^="section-"]:not("#section-1")')[0]
    : $('[id^="section-"]');
$(".skip-to-main").attr("href", "#" + num),
  $(
    '.ask-a-question[href="mailto:experts@answers-nthrive.com"], .ask-a-question[href="https://www.nthrive.com/contact-us/"], .chat-us-now[href="mailto:experts@answers-nthrive.com"], #open-video'
  ).click(function () {
    $("body").addClass("no-scroll");
  }),
  $(".popup-option-overlay, .popup-close").click(function () {
    $("body").removeClass("no-scroll");
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "undefined" != typeof exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (e) {
    "use strict";
    var t = window.Slick || {};
    ((t = (function () {
      var t = 0;
      return function (i, s) {
        var o,
          n = this;
        (n.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: e(i),
          appendDots: e(i),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (t, i) {
            return e(
              '<button type="button" data-role="none" role="button" tabindex="0" />'
            ).text(i + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          e.extend(n, n.initials),
          (n.activeBreakpoint = null),
          (n.animType = null),
          (n.animProp = null),
          (n.breakpoints = []),
          (n.breakpointSettings = []),
          (n.cssTransitions = !1),
          (n.focussed = !1),
          (n.interrupted = !1),
          (n.hidden = "hidden"),
          (n.paused = !0),
          (n.positionProp = null),
          (n.respondTo = null),
          (n.rowCount = 1),
          (n.shouldClick = !0),
          (n.$slider = e(i)),
          (n.$slidesCache = null),
          (n.transformType = null),
          (n.transitionType = null),
          (n.visibilityChange = "visibilitychange"),
          (n.windowWidth = 0),
          (n.windowTimer = null),
          (o = e(i).data("slick") || {}),
          (n.options = e.extend({}, n.defaults, s, o)),
          (n.currentSlide = n.options.initialSlide),
          (n.originalSettings = n.options),
          void 0 !== document.mozHidden
            ? ((n.hidden = "mozHidden"),
              (n.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((n.hidden = "webkitHidden"),
              (n.visibilityChange = "webkitvisibilitychange")),
          (n.autoPlay = e.proxy(n.autoPlay, n)),
          (n.autoPlayClear = e.proxy(n.autoPlayClear, n)),
          (n.autoPlayIterator = e.proxy(n.autoPlayIterator, n)),
          (n.changeSlide = e.proxy(n.changeSlide, n)),
          (n.clickHandler = e.proxy(n.clickHandler, n)),
          (n.selectHandler = e.proxy(n.selectHandler, n)),
          (n.setPosition = e.proxy(n.setPosition, n)),
          (n.swipeHandler = e.proxy(n.swipeHandler, n)),
          (n.dragHandler = e.proxy(n.dragHandler, n)),
          (n.keyHandler = e.proxy(n.keyHandler, n)),
          (n.instanceUid = t++),
          (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          n.registerBreakpoints(),
          n.init(!0);
      };
    })()).prototype.activateADA = function () {
      this.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
      (t.prototype.addSlide = t.prototype.slickAdd = function (t, i, s) {
        var o = this;
        if ("boolean" == typeof i) (s = i), (i = null);
        else if (i < 0 || i >= o.slideCount) return !1;
        o.unload(),
          "number" == typeof i
            ? 0 === i && 0 === o.$slides.length
              ? e(t).appendTo(o.$slideTrack)
              : s
              ? e(t).insertBefore(o.$slides.eq(i))
              : e(t).insertAfter(o.$slides.eq(i))
            : !0 === s
            ? e(t).prependTo(o.$slideTrack)
            : e(t).appendTo(o.$slideTrack),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          o.$slides.each(function (t, i) {
            e(i).attr("data-slick-index", t);
          }),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
      (t.prototype.animateHeight = function () {
        var e = this;
        if (
          1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical
        ) {
          var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
          e.$list.animate({ height: t }, e.options.speed);
        }
      }),
      (t.prototype.animateSlide = function (t, i) {
        var s = {},
          o = this;
        o.animateHeight(),
          !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
          !1 === o.transformsEnabled
            ? !1 === o.options.vertical
              ? o.$slideTrack.animate(
                  { left: t },
                  o.options.speed,
                  o.options.easing,
                  i
                )
              : o.$slideTrack.animate(
                  { top: t },
                  o.options.speed,
                  o.options.easing,
                  i
                )
            : !1 === o.cssTransitions
            ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
              e({ animStart: o.currentLeft }).animate(
                { animStart: t },
                {
                  duration: o.options.speed,
                  easing: o.options.easing,
                  step: function (e) {
                    (e = Math.ceil(e)),
                      !1 === o.options.vertical
                        ? ((s[o.animType] = "translate(" + e + "px, 0px)"),
                          o.$slideTrack.css(s))
                        : ((s[o.animType] = "translate(0px," + e + "px)"),
                          o.$slideTrack.css(s));
                  },
                  complete: function () {
                    i && i.call();
                  },
                }
              ))
            : (o.applyTransition(),
              (t = Math.ceil(t)),
              !1 === o.options.vertical
                ? (s[o.animType] = "translate3d(" + t + "px, 0px, 0px)")
                : (s[o.animType] = "translate3d(0px," + t + "px, 0px)"),
              o.$slideTrack.css(s),
              i &&
                setTimeout(function () {
                  o.disableTransition(), i.call();
                }, o.options.speed));
      }),
      (t.prototype.getNavTarget = function () {
        var t = this.options.asNavFor;
        return t && null !== t && (t = e(t).not(this.$slider)), t;
      }),
      (t.prototype.asNavFor = function (t) {
        var i = this.getNavTarget();
        null !== i &&
          "object" == typeof i &&
          i.each(function () {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0);
          });
      }),
      (t.prototype.applyTransition = function (e) {
        var t = this,
          i = {};
        !1 === t.options.fade
          ? (i[t.transitionType] =
              t.transformType +
              " " +
              t.options.speed +
              "ms " +
              t.options.cssEase)
          : (i[t.transitionType] =
              "opacity " + t.options.speed + "ms " + t.options.cssEase),
          !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
      }),
      (t.prototype.autoPlay = function () {
        var e = this;
        e.autoPlayClear(),
          e.slideCount > e.options.slidesToShow &&
            (e.autoPlayTimer = setInterval(
              e.autoPlayIterator,
              e.options.autoplaySpeed
            ));
      }),
      (t.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
      }),
      (t.prototype.autoPlayIterator = function () {
        var e = this,
          t = e.currentSlide + e.options.slidesToScroll;
        e.paused ||
          e.interrupted ||
          e.focussed ||
          (!1 === e.options.infinite &&
            (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1
              ? (e.direction = 0)
              : 0 === e.direction &&
                ((t = e.currentSlide - e.options.slidesToScroll),
                e.currentSlide - 1 == 0 && (e.direction = 1))),
          e.slideHandler(t));
      }),
      (t.prototype.buildArrows = function () {
        var t = this;
        !0 === t.options.arrows &&
          ((t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow")),
          (t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow")),
          t.slideCount > t.options.slidesToShow
            ? (t.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              t.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              t.htmlExpr.test(t.options.prevArrow) &&
                t.$prevArrow.prependTo(t.options.appendArrows),
              t.htmlExpr.test(t.options.nextArrow) &&
                t.$nextArrow.appendTo(t.options.appendArrows),
              !0 !== t.options.infinite &&
                t.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : t.$prevArrow
                .add(t.$nextArrow)
                .addClass("slick-hidden")
                .attr({ "aria-disabled": "true", tabindex: "-1" }));
      }),
      (t.prototype.buildDots = function () {
        var t,
          i,
          s = this;
        if (!0 === s.options.dots && s.slideCount > s.options.slidesToShow) {
          for (
            s.$slider.addClass("slick-dotted"),
              i = e("<ul />").addClass(s.options.dotsClass),
              t = 0;
            t <= s.getDotCount();
            t += 1
          )
            i.append(
              e("<li />").append(s.options.customPaging.call(this, s, t))
            );
          (s.$dots = i.appendTo(s.options.appendDots)),
            s.$dots
              .find("li")
              .first()
              .addClass("slick-active")
              .attr("aria-hidden", "false");
        }
      }),
      (t.prototype.buildOut = function () {
        var t = this;
        (t.$slides = t.$slider
          .children(t.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (t.slideCount = t.$slides.length),
          t.$slides.each(function (t, i) {
            e(i)
              .attr("data-slick-index", t)
              .data("originalStyling", e(i).attr("style") || "");
          }),
          t.$slider.addClass("slick-slider"),
          (t.$slideTrack =
            0 === t.slideCount
              ? e('<div class="slick-track"/>').appendTo(t.$slider)
              : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (t.$list = t.$slideTrack
            .wrap('<div aria-live="polite" class="slick-list"/>')
            .parent()),
          t.$slideTrack.css("opacity", 0),
          (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
            (t.options.slidesToScroll = 1),
          e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
          t.setupInfinite(),
          t.buildArrows(),
          t.buildDots(),
          t.updateDots(),
          t.setSlideClasses(
            "number" == typeof t.currentSlide ? t.currentSlide : 0
          ),
          !0 === t.options.draggable && t.$list.addClass("draggable");
      }),
      (t.prototype.buildRows = function () {
        var e,
          t,
          i,
          s,
          o,
          n,
          a,
          r = this;
        if (
          ((s = document.createDocumentFragment()),
          (n = r.$slider.children()),
          r.options.rows > 1)
        ) {
          for (
            a = r.options.slidesPerRow * r.options.rows,
              o = Math.ceil(n.length / a),
              e = 0;
            e < o;
            e++
          ) {
            var l = document.createElement("div");
            for (t = 0; t < r.options.rows; t++) {
              var d = document.createElement("div");
              for (i = 0; i < r.options.slidesPerRow; i++) {
                var c = e * a + (t * r.options.slidesPerRow + i);
                n.get(c) && d.appendChild(n.get(c));
              }
              l.appendChild(d);
            }
            s.appendChild(l);
          }
          r.$slider.empty().append(s),
            r.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / r.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (t.prototype.checkResponsive = function (t, i) {
        var s,
          o,
          n,
          a = this,
          r = !1,
          l = a.$slider.width(),
          d = window.innerWidth || e(window).width();
        if (
          ("window" === a.respondTo
            ? (n = d)
            : "slider" === a.respondTo
            ? (n = l)
            : "min" === a.respondTo && (n = Math.min(d, l)),
          a.options.responsive &&
            a.options.responsive.length &&
            null !== a.options.responsive)
        ) {
          for (s in ((o = null), a.breakpoints))
            a.breakpoints.hasOwnProperty(s) &&
              (!1 === a.originalSettings.mobileFirst
                ? n < a.breakpoints[s] && (o = a.breakpoints[s])
                : n > a.breakpoints[s] && (o = a.breakpoints[s]));
          null !== o
            ? null !== a.activeBreakpoint
              ? (o !== a.activeBreakpoint || i) &&
                ((a.activeBreakpoint = o),
                "unslick" === a.breakpointSettings[o]
                  ? a.unslick(o)
                  : ((a.options = e.extend(
                      {},
                      a.originalSettings,
                      a.breakpointSettings[o]
                    )),
                    !0 === t && (a.currentSlide = a.options.initialSlide),
                    a.refresh(t)),
                (r = o))
              : ((a.activeBreakpoint = o),
                "unslick" === a.breakpointSettings[o]
                  ? a.unslick(o)
                  : ((a.options = e.extend(
                      {},
                      a.originalSettings,
                      a.breakpointSettings[o]
                    )),
                    !0 === t && (a.currentSlide = a.options.initialSlide),
                    a.refresh(t)),
                (r = o))
            : null !== a.activeBreakpoint &&
              ((a.activeBreakpoint = null),
              (a.options = a.originalSettings),
              !0 === t && (a.currentSlide = a.options.initialSlide),
              a.refresh(t),
              (r = o)),
            t || !1 === r || a.$slider.trigger("breakpoint", [a, r]);
        }
      }),
      (t.prototype.changeSlide = function (t, i) {
        var s,
          o,
          n = this,
          a = e(t.currentTarget);
        switch (
          (a.is("a") && t.preventDefault(),
          a.is("li") || (a = a.closest("li")),
          (s =
            n.slideCount % n.options.slidesToScroll != 0
              ? 0
              : (n.slideCount - n.currentSlide) % n.options.slidesToScroll),
          t.data.message)
        ) {
          case "previous":
            (o =
              0 === s ? n.options.slidesToScroll : n.options.slidesToShow - s),
              n.slideCount > n.options.slidesToShow &&
                n.slideHandler(n.currentSlide - o, !1, i);
            break;
          case "next":
            (o = 0 === s ? n.options.slidesToScroll : s),
              n.slideCount > n.options.slidesToShow &&
                n.slideHandler(n.currentSlide + o, !1, i);
            break;
          case "index":
            var r =
              0 === t.data.index
                ? 0
                : t.data.index || a.index() * n.options.slidesToScroll;
            n.slideHandler(n.checkNavigable(r), !1, i),
              a.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (t.prototype.checkNavigable = function (e) {
        var t, i;
        if (((i = 0), e > (t = this.getNavigableIndexes())[t.length - 1]))
          e = t[t.length - 1];
        else
          for (var s in t) {
            if (e < t[s]) {
              e = i;
              break;
            }
            i = t[s];
          }
        return e;
      }),
      (t.prototype.cleanUpEvents = function () {
        var t = this;
        t.options.dots &&
          null !== t.$dots &&
          e("li", t.$dots)
            .off("click.slick", t.changeSlide)
            .off("mouseenter.slick", e.proxy(t.interrupt, t, !0))
            .off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
          t.$slider.off("focus.slick blur.slick"),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
            t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)),
          t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
          t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
          t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
          t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
          t.$list.off("click.slick", t.clickHandler),
          e(document).off(t.visibilityChange, t.visibility),
          t.cleanUpSlideEvents(),
          !0 === t.options.accessibility &&
            t.$list.off("keydown.slick", t.keyHandler),
          !0 === t.options.focusOnSelect &&
            e(t.$slideTrack).children().off("click.slick", t.selectHandler),
          e(window).off(
            "orientationchange.slick.slick-" + t.instanceUid,
            t.orientationChange
          ),
          e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
          e("[draggable!=true]", t.$slideTrack).off(
            "dragstart",
            t.preventDefault
          ),
          e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition),
          e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition);
      }),
      (t.prototype.cleanUpSlideEvents = function () {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
          t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1));
      }),
      (t.prototype.cleanUpRows = function () {
        var e,
          t = this;
        t.options.rows > 1 &&
          ((e = t.$slides.children().children()).removeAttr("style"),
          t.$slider.empty().append(e));
      }),
      (t.prototype.clickHandler = function (e) {
        !1 === this.shouldClick &&
          (e.stopImmediatePropagation(),
          e.stopPropagation(),
          e.preventDefault());
      }),
      (t.prototype.destroy = function (t) {
        var i = this;
        i.autoPlayClear(),
          (i.touchObject = {}),
          i.cleanUpEvents(),
          e(".slick-cloned", i.$slider).detach(),
          i.$dots && i.$dots.remove(),
          i.$prevArrow &&
            i.$prevArrow.length &&
            (i.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
          i.$nextArrow &&
            i.$nextArrow.length &&
            (i.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
          i.$slides &&
            (i.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                e(this).attr("style", e(this).data("originalStyling"));
              }),
            i.$slideTrack.children(this.options.slide).detach(),
            i.$slideTrack.detach(),
            i.$list.detach(),
            i.$slider.append(i.$slides)),
          i.cleanUpRows(),
          i.$slider.removeClass("slick-slider"),
          i.$slider.removeClass("slick-initialized"),
          i.$slider.removeClass("slick-dotted"),
          (i.unslicked = !0),
          t || i.$slider.trigger("destroy", [i]);
      }),
      (t.prototype.disableTransition = function (e) {
        var t = this,
          i = {};
        (i[t.transitionType] = ""),
          !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
      }),
      (t.prototype.fadeSlide = function (e, t) {
        var i = this;
        !1 === i.cssTransitions
          ? (i.$slides.eq(e).css({ zIndex: i.options.zIndex }),
            i.$slides
              .eq(e)
              .animate({ opacity: 1 }, i.options.speed, i.options.easing, t))
          : (i.applyTransition(e),
            i.$slides.eq(e).css({ opacity: 1, zIndex: i.options.zIndex }),
            t &&
              setTimeout(function () {
                i.disableTransition(e), t.call();
              }, i.options.speed));
      }),
      (t.prototype.fadeSlideOut = function (e) {
        var t = this;
        !1 === t.cssTransitions
          ? t.$slides
              .eq(e)
              .animate(
                { opacity: 0, zIndex: t.options.zIndex - 2 },
                t.options.speed,
                t.options.easing
              )
          : (t.applyTransition(e),
            t.$slides.eq(e).css({ opacity: 0, zIndex: t.options.zIndex - 2 }));
      }),
      (t.prototype.filterSlides = t.prototype.slickFilter = function (e) {
        var t = this;
        null !== e &&
          ((t.$slidesCache = t.$slides),
          t.unload(),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slidesCache.filter(e).appendTo(t.$slideTrack),
          t.reinit());
      }),
      (t.prototype.focusHandler = function () {
        var t = this;
        t.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*:not(.slick-arrow)", function (i) {
            i.stopImmediatePropagation();
            var s = e(this);
            setTimeout(function () {
              t.options.pauseOnFocus &&
                ((t.focussed = s.is(":focus")), t.autoPlay());
            }, 0);
          });
      }),
      (t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
        return this.currentSlide;
      }),
      (t.prototype.getDotCount = function () {
        var e = this,
          t = 0,
          i = 0,
          s = 0;
        if (!0 === e.options.infinite)
          for (; t < e.slideCount; )
            ++s,
              (t = i + e.options.slidesToScroll),
              (i +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
        else if (!0 === e.options.centerMode) s = e.slideCount;
        else if (e.options.asNavFor)
          for (; t < e.slideCount; )
            ++s,
              (t = i + e.options.slidesToScroll),
              (i +=
                e.options.slidesToScroll <= e.options.slidesToShow
                  ? e.options.slidesToScroll
                  : e.options.slidesToShow);
        else
          s =
            1 +
            Math.ceil(
              (e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll
            );
        return s - 1;
      }),
      (t.prototype.getLeft = function (e) {
        var t,
          i,
          s,
          o = this,
          n = 0;
        return (
          (o.slideOffset = 0),
          (i = o.$slides.first().outerHeight(!0)),
          !0 === o.options.infinite
            ? (o.slideCount > o.options.slidesToShow &&
                ((o.slideOffset = o.slideWidth * o.options.slidesToShow * -1),
                (n = i * o.options.slidesToShow * -1)),
              o.slideCount % o.options.slidesToScroll != 0 &&
                e + o.options.slidesToScroll > o.slideCount &&
                o.slideCount > o.options.slidesToShow &&
                (e > o.slideCount
                  ? ((o.slideOffset =
                      (o.options.slidesToShow - (e - o.slideCount)) *
                      o.slideWidth *
                      -1),
                    (n =
                      (o.options.slidesToShow - (e - o.slideCount)) * i * -1))
                  : ((o.slideOffset =
                      (o.slideCount % o.options.slidesToScroll) *
                      o.slideWidth *
                      -1),
                    (n = (o.slideCount % o.options.slidesToScroll) * i * -1))))
            : e + o.options.slidesToShow > o.slideCount &&
              ((o.slideOffset =
                (e + o.options.slidesToShow - o.slideCount) * o.slideWidth),
              (n = (e + o.options.slidesToShow - o.slideCount) * i)),
          o.slideCount <= o.options.slidesToShow &&
            ((o.slideOffset = 0), (n = 0)),
          !0 === o.options.centerMode && !0 === o.options.infinite
            ? (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2) -
                o.slideWidth)
            : !0 === o.options.centerMode &&
              ((o.slideOffset = 0),
              (o.slideOffset +=
                o.slideWidth * Math.floor(o.options.slidesToShow / 2))),
          (t =
            !1 === o.options.vertical
              ? e * o.slideWidth * -1 + o.slideOffset
              : e * i * -1 + n),
          !0 === o.options.variableWidth &&
            ((s =
              o.slideCount <= o.options.slidesToShow ||
              !1 === o.options.infinite
                ? o.$slideTrack.children(".slick-slide").eq(e)
                : o.$slideTrack
                    .children(".slick-slide")
                    .eq(e + o.options.slidesToShow)),
            (t =
              !0 === o.options.rtl
                ? s[0]
                  ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                  : 0
                : s[0]
                ? -1 * s[0].offsetLeft
                : 0),
            !0 === o.options.centerMode &&
              ((s =
                o.slideCount <= o.options.slidesToShow ||
                !1 === o.options.infinite
                  ? o.$slideTrack.children(".slick-slide").eq(e)
                  : o.$slideTrack
                      .children(".slick-slide")
                      .eq(e + o.options.slidesToShow + 1)),
              (t =
                !0 === o.options.rtl
                  ? s[0]
                    ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                    : 0
                  : s[0]
                  ? -1 * s[0].offsetLeft
                  : 0),
              (t += (o.$list.width() - s.outerWidth()) / 2))),
          t
        );
      }),
      (t.prototype.getOption = t.prototype.slickGetOption = function (e) {
        return this.options[e];
      }),
      (t.prototype.getNavigableIndexes = function () {
        var e,
          t = this,
          i = 0,
          s = 0,
          o = [];
        for (
          !1 === t.options.infinite
            ? (e = t.slideCount)
            : ((i = -1 * t.options.slidesToScroll),
              (s = -1 * t.options.slidesToScroll),
              (e = 2 * t.slideCount));
          i < e;

        )
          o.push(i),
            (i = s + t.options.slidesToScroll),
            (s +=
              t.options.slidesToScroll <= t.options.slidesToShow
                ? t.options.slidesToScroll
                : t.options.slidesToShow);
        return o;
      }),
      (t.prototype.getSlick = function () {
        return this;
      }),
      (t.prototype.getSlideCount = function () {
        var t,
          i,
          s = this;
        return (
          (i =
            !0 === s.options.centerMode
              ? s.slideWidth * Math.floor(s.options.slidesToShow / 2)
              : 0),
          !0 === s.options.swipeToSlide
            ? (s.$slideTrack.find(".slick-slide").each(function (o, n) {
                if (n.offsetLeft - i + e(n).outerWidth() / 2 > -1 * s.swipeLeft)
                  return (t = n), !1;
              }),
              Math.abs(e(t).attr("data-slick-index") - s.currentSlide) || 1)
            : s.options.slidesToScroll
        );
      }),
      (t.prototype.goTo = t.prototype.slickGoTo = function (e, t) {
        this.changeSlide({ data: { message: "index", index: parseInt(e) } }, t);
      }),
      (t.prototype.init = function (t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") ||
          (e(i.$slider).addClass("slick-initialized"),
          i.buildRows(),
          i.buildOut(),
          i.setProps(),
          i.startLoad(),
          i.loadSlider(),
          i.initializeEvents(),
          i.updateArrows(),
          i.updateDots(),
          i.checkResponsive(!0),
          i.focusHandler()),
          t && i.$slider.trigger("init", [i]),
          !0 === i.options.accessibility && i.initADA(),
          i.options.autoplay && ((i.paused = !1), i.autoPlay());
      }),
      (t.prototype.initADA = function () {
        var t = this;
        t.$slides
          .add(t.$slideTrack.find(".slick-cloned"))
          .attr({ "aria-hidden": "true", tabindex: "-1" })
          .find("a, input, button, select")
          .attr({ tabindex: "-1" }),
          t.$slideTrack.attr("role", "listbox"),
          t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (i) {
            e(this).attr({
              role: "option",
              "aria-describedby": "slick-slide" + t.instanceUid + i,
            });
          }),
          null !== t.$dots &&
            t.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (i) {
                e(this).attr({
                  role: "presentation",
                  "aria-selected": "false",
                  "aria-controls": "navigation" + t.instanceUid + i,
                  id: "slick-slide" + t.instanceUid + i,
                });
              })
              .first()
              .attr("aria-selected", "true")
              .end()
              .find("button")
              .attr("role", "button")
              .end()
              .closest("div")
              .attr("role", "toolbar"),
          t.activateADA();
      }),
      (t.prototype.initArrowEvents = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow
            .off("click.slick")
            .on("click.slick", { message: "previous" }, e.changeSlide),
          e.$nextArrow
            .off("click.slick")
            .on("click.slick", { message: "next" }, e.changeSlide));
      }),
      (t.prototype.initDotEvents = function () {
        var t = this;
        !0 === t.options.dots &&
          t.slideCount > t.options.slidesToShow &&
          e("li", t.$dots).on(
            "click.slick",
            { message: "index" },
            t.changeSlide
          ),
          !0 === t.options.dots &&
            !0 === t.options.pauseOnDotsHover &&
            e("li", t.$dots)
              .on("mouseenter.slick", e.proxy(t.interrupt, t, !0))
              .on("mouseleave.slick", e.proxy(t.interrupt, t, !1));
      }),
      (t.prototype.initSlideEvents = function () {
        var t = this;
        t.options.pauseOnHover &&
          (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
          t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)));
      }),
      (t.prototype.initializeEvents = function () {
        var t = this;
        t.initArrowEvents(),
          t.initDotEvents(),
          t.initSlideEvents(),
          t.$list.on(
            "touchstart.slick mousedown.slick",
            { action: "start" },
            t.swipeHandler
          ),
          t.$list.on(
            "touchmove.slick mousemove.slick",
            { action: "move" },
            t.swipeHandler
          ),
          t.$list.on(
            "touchend.slick mouseup.slick",
            { action: "end" },
            t.swipeHandler
          ),
          t.$list.on(
            "touchcancel.slick mouseleave.slick",
            { action: "end" },
            t.swipeHandler
          ),
          t.$list.on("click.slick", t.clickHandler),
          e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
          !0 === t.options.accessibility &&
            t.$list.on("keydown.slick", t.keyHandler),
          !0 === t.options.focusOnSelect &&
            e(t.$slideTrack).children().on("click.slick", t.selectHandler),
          e(window).on(
            "orientationchange.slick.slick-" + t.instanceUid,
            e.proxy(t.orientationChange, t)
          ),
          e(window).on(
            "resize.slick.slick-" + t.instanceUid,
            e.proxy(t.resize, t)
          ),
          e("[draggable!=true]", t.$slideTrack).on(
            "dragstart",
            t.preventDefault
          ),
          e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
          e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition);
      }),
      (t.prototype.initUI = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.show(), e.$nextArrow.show()),
          !0 === e.options.dots &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.show();
      }),
      (t.prototype.keyHandler = function (e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === e.keyCode && !0 === t.options.accessibility
            ? t.changeSlide({
                data: { message: !0 === t.options.rtl ? "next" : "previous" },
              })
            : 39 === e.keyCode &&
              !0 === t.options.accessibility &&
              t.changeSlide({
                data: { message: !0 === t.options.rtl ? "previous" : "next" },
              }));
      }),
      (t.prototype.lazyLoad = function () {
        var t,
          i,
          s = this;
        function o(t) {
          e("img[data-lazy]", t).each(function () {
            var t = e(this),
              i = e(this).attr("data-lazy"),
              o = document.createElement("img");
            (o.onload = function () {
              t.animate({ opacity: 0 }, 100, function () {
                t.attr("src", i).animate({ opacity: 1 }, 200, function () {
                  t.removeAttr("data-lazy").removeClass("slick-loading");
                }),
                  s.$slider.trigger("lazyLoaded", [s, t, i]);
              });
            }),
              (o.onerror = function () {
                t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  s.$slider.trigger("lazyLoadError", [s, t, i]);
              }),
              (o.src = i);
          });
        }
        !0 === s.options.centerMode
          ? !0 === s.options.infinite
            ? (i =
                (t = s.currentSlide + (s.options.slidesToShow / 2 + 1)) +
                s.options.slidesToShow +
                2)
            : ((t = Math.max(
                0,
                s.currentSlide - (s.options.slidesToShow / 2 + 1)
              )),
              (i = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide))
          : ((t = s.options.infinite
              ? s.options.slidesToShow + s.currentSlide
              : s.currentSlide),
            (i = Math.ceil(t + s.options.slidesToShow)),
            !0 === s.options.fade && (t > 0 && t--, i <= s.slideCount && i++)),
          o(s.$slider.find(".slick-slide").slice(t, i)),
          s.slideCount <= s.options.slidesToShow
            ? o(s.$slider.find(".slick-slide"))
            : s.currentSlide >= s.slideCount - s.options.slidesToShow
            ? o(
                s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)
              )
            : 0 === s.currentSlide &&
              o(
                s.$slider
                  .find(".slick-cloned")
                  .slice(-1 * s.options.slidesToShow)
              );
      }),
      (t.prototype.loadSlider = function () {
        var e = this;
        e.setPosition(),
          e.$slideTrack.css({ opacity: 1 }),
          e.$slider.removeClass("slick-loading"),
          e.initUI(),
          "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
      }),
      (t.prototype.next = t.prototype.slickNext = function () {
        this.changeSlide({ data: { message: "next" } });
      }),
      (t.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition();
      }),
      (t.prototype.pause = t.prototype.slickPause = function () {
        this.autoPlayClear(), (this.paused = !0);
      }),
      (t.prototype.play = t.prototype.slickPlay = function () {
        var e = this;
        e.autoPlay(),
          (e.options.autoplay = !0),
          (e.paused = !1),
          (e.focussed = !1),
          (e.interrupted = !1);
      }),
      (t.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked ||
          (t.$slider.trigger("afterChange", [t, e]),
          (t.animating = !1),
          t.setPosition(),
          (t.swipeLeft = null),
          t.options.autoplay && t.autoPlay(),
          !0 === t.options.accessibility && t.initADA());
      }),
      (t.prototype.prev = t.prototype.slickPrev = function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
      (t.prototype.preventDefault = function (e) {
        e.preventDefault();
      }),
      (t.prototype.progressiveLazyLoad = function (t) {
        t = t || 1;
        var i,
          s,
          o,
          n = this,
          a = e("img[data-lazy]", n.$slider);
        a.length
          ? ((i = a.first()),
            (s = i.attr("data-lazy")),
            ((o = document.createElement("img")).onload = function () {
              i
                .attr("src", s)
                .removeAttr("data-lazy")
                .removeClass("slick-loading"),
                !0 === n.options.adaptiveHeight && n.setPosition(),
                n.$slider.trigger("lazyLoaded", [n, i, s]),
                n.progressiveLazyLoad();
            }),
            (o.onerror = function () {
              t < 3
                ? setTimeout(function () {
                    n.progressiveLazyLoad(t + 1);
                  }, 500)
                : (i
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  n.$slider.trigger("lazyLoadError", [n, i, s]),
                  n.progressiveLazyLoad());
            }),
            (o.src = s))
          : n.$slider.trigger("allImagesLoaded", [n]);
      }),
      (t.prototype.refresh = function (t) {
        var i,
          s,
          o = this;
        (s = o.slideCount - o.options.slidesToShow),
          !o.options.infinite && o.currentSlide > s && (o.currentSlide = s),
          o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
          (i = o.currentSlide),
          o.destroy(!0),
          e.extend(o, o.initials, { currentSlide: i }),
          o.init(),
          t || o.changeSlide({ data: { message: "index", index: i } }, !1);
      }),
      (t.prototype.registerBreakpoints = function () {
        var t,
          i,
          s,
          o = this,
          n = o.options.responsive || null;
        if ("array" === e.type(n) && n.length) {
          for (t in ((o.respondTo = o.options.respondTo || "window"), n))
            if (
              ((s = o.breakpoints.length - 1),
              (i = n[t].breakpoint),
              n.hasOwnProperty(t))
            ) {
              for (; s >= 0; )
                o.breakpoints[s] &&
                  o.breakpoints[s] === i &&
                  o.breakpoints.splice(s, 1),
                  s--;
              o.breakpoints.push(i), (o.breakpointSettings[i] = n[t].settings);
            }
          o.breakpoints.sort(function (e, t) {
            return o.options.mobileFirst ? e - t : t - e;
          });
        }
      }),
      (t.prototype.reinit = function () {
        var t = this;
        (t.$slides = t.$slideTrack
          .children(t.options.slide)
          .addClass("slick-slide")),
          (t.slideCount = t.$slides.length),
          t.currentSlide >= t.slideCount &&
            0 !== t.currentSlide &&
            (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          t.registerBreakpoints(),
          t.setProps(),
          t.setupInfinite(),
          t.buildArrows(),
          t.updateArrows(),
          t.initArrowEvents(),
          t.buildDots(),
          t.updateDots(),
          t.initDotEvents(),
          t.cleanUpSlideEvents(),
          t.initSlideEvents(),
          t.checkResponsive(!1, !0),
          !0 === t.options.focusOnSelect &&
            e(t.$slideTrack).children().on("click.slick", t.selectHandler),
          t.setSlideClasses(
            "number" == typeof t.currentSlide ? t.currentSlide : 0
          ),
          t.setPosition(),
          t.focusHandler(),
          (t.paused = !t.options.autoplay),
          t.autoPlay(),
          t.$slider.trigger("reInit", [t]);
      }),
      (t.prototype.resize = function () {
        var t = this;
        e(window).width() !== t.windowWidth &&
          (clearTimeout(t.windowDelay),
          (t.windowDelay = window.setTimeout(function () {
            (t.windowWidth = e(window).width()),
              t.checkResponsive(),
              t.unslicked || t.setPosition();
          }, 50)));
      }),
      (t.prototype.removeSlide = t.prototype.slickRemove = function (e, t, i) {
        var s = this;
        if (
          ((e =
            "boolean" == typeof e
              ? !0 === (t = e)
                ? 0
                : s.slideCount - 1
              : !0 === t
              ? --e
              : e),
          s.slideCount < 1 || e < 0 || e > s.slideCount - 1)
        )
          return !1;
        s.unload(),
          !0 === i
            ? s.$slideTrack.children().remove()
            : s.$slideTrack.children(this.options.slide).eq(e).remove(),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
      (t.prototype.setCSS = function (e) {
        var t,
          i,
          s = this,
          o = {};
        !0 === s.options.rtl && (e = -e),
          (t = "left" == s.positionProp ? Math.ceil(e) + "px" : "0px"),
          (i = "top" == s.positionProp ? Math.ceil(e) + "px" : "0px"),
          (o[s.positionProp] = e),
          !1 === s.transformsEnabled
            ? s.$slideTrack.css(o)
            : ((o = {}),
              !1 === s.cssTransitions
                ? ((o[s.animType] = "translate(" + t + ", " + i + ")"),
                  s.$slideTrack.css(o))
                : ((o[s.animType] = "translate3d(" + t + ", " + i + ", 0px)"),
                  s.$slideTrack.css(o)));
      }),
      (t.prototype.setDimensions = function () {
        var e = this;
        !1 === e.options.vertical
          ? !0 === e.options.centerMode &&
            e.$list.css({ padding: "0px " + e.options.centerPadding })
          : (e.$list.height(
              e.$slides.first().outerHeight(!0) * e.options.slidesToShow
            ),
            !0 === e.options.centerMode &&
              e.$list.css({ padding: e.options.centerPadding + " 0px" })),
          (e.listWidth = e.$list.width()),
          (e.listHeight = e.$list.height()),
          !1 === e.options.vertical && !1 === e.options.variableWidth
            ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)),
              e.$slideTrack.width(
                Math.ceil(
                  e.slideWidth * e.$slideTrack.children(".slick-slide").length
                )
              ))
            : !0 === e.options.variableWidth
            ? e.$slideTrack.width(5e3 * e.slideCount)
            : ((e.slideWidth = Math.ceil(e.listWidth)),
              e.$slideTrack.height(
                Math.ceil(
                  e.$slides.first().outerHeight(!0) *
                    e.$slideTrack.children(".slick-slide").length
                )
              ));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth &&
          e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
      }),
      (t.prototype.setFade = function () {
        var t,
          i = this;
        i.$slides.each(function (s, o) {
          (t = i.slideWidth * s * -1),
            !0 === i.options.rtl
              ? e(o).css({
                  position: "relative",
                  right: t,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                })
              : e(o).css({
                  position: "relative",
                  left: t,
                  top: 0,
                  zIndex: i.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          i.$slides
            .eq(i.currentSlide)
            .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
      }),
      (t.prototype.setHeight = function () {
        var e = this;
        if (
          1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical
        ) {
          var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
          e.$list.css("height", t);
        }
      }),
      (t.prototype.setOption = t.prototype.slickSetOption = function () {
        var t,
          i,
          s,
          o,
          n,
          a = this,
          r = !1;
        if (
          ("object" === e.type(arguments[0])
            ? ((s = arguments[0]), (r = arguments[1]), (n = "multiple"))
            : "string" === e.type(arguments[0]) &&
              ((s = arguments[0]),
              (o = arguments[1]),
              (r = arguments[2]),
              "responsive" === arguments[0] && "array" === e.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          a.options[s] = o;
        else if ("multiple" === n)
          e.each(s, function (e, t) {
            a.options[e] = t;
          });
        else if ("responsive" === n)
          for (i in o)
            if ("array" !== e.type(a.options.responsive))
              a.options.responsive = [o[i]];
            else {
              for (t = a.options.responsive.length - 1; t >= 0; )
                a.options.responsive[t].breakpoint === o[i].breakpoint &&
                  a.options.responsive.splice(t, 1),
                  t--;
              a.options.responsive.push(o[i]);
            }
        r && (a.unload(), a.reinit());
      }),
      (t.prototype.setPosition = function () {
        var e = this;
        e.setDimensions(),
          e.setHeight(),
          !1 === e.options.fade
            ? e.setCSS(e.getLeft(e.currentSlide))
            : e.setFade(),
          e.$slider.trigger("setPosition", [e]);
      }),
      (t.prototype.setProps = function () {
        var e = this,
          t = document.body.style;
        (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
          "top" === e.positionProp
            ? e.$slider.addClass("slick-vertical")
            : e.$slider.removeClass("slick-vertical"),
          (void 0 === t.WebkitTransition &&
            void 0 === t.MozTransition &&
            void 0 === t.msTransition) ||
            (!0 === e.options.useCSS && (e.cssTransitions = !0)),
          e.options.fade &&
            ("number" == typeof e.options.zIndex
              ? e.options.zIndex < 3 && (e.options.zIndex = 3)
              : (e.options.zIndex = e.defaults.zIndex)),
          void 0 !== t.OTransform &&
            ((e.animType = "OTransform"),
            (e.transformType = "-o-transform"),
            (e.transitionType = "OTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.webkitPerspective &&
              (e.animType = !1)),
          void 0 !== t.MozTransform &&
            ((e.animType = "MozTransform"),
            (e.transformType = "-moz-transform"),
            (e.transitionType = "MozTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.MozPerspective &&
              (e.animType = !1)),
          void 0 !== t.webkitTransform &&
            ((e.animType = "webkitTransform"),
            (e.transformType = "-webkit-transform"),
            (e.transitionType = "webkitTransition"),
            void 0 === t.perspectiveProperty &&
              void 0 === t.webkitPerspective &&
              (e.animType = !1)),
          void 0 !== t.msTransform &&
            ((e.animType = "msTransform"),
            (e.transformType = "-ms-transform"),
            (e.transitionType = "msTransition"),
            void 0 === t.msTransform && (e.animType = !1)),
          void 0 !== t.transform &&
            !1 !== e.animType &&
            ((e.animType = "transform"),
            (e.transformType = "transform"),
            (e.transitionType = "transition")),
          (e.transformsEnabled =
            e.options.useTransform && null !== e.animType && !1 !== e.animType);
      }),
      (t.prototype.setSlideClasses = function (e) {
        var t,
          i,
          s,
          o,
          n = this;
        (i = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
          n.$slides.eq(e).addClass("slick-current"),
          !0 === n.options.centerMode
            ? ((t = Math.floor(n.options.slidesToShow / 2)),
              !0 === n.options.infinite &&
                (e >= t && e <= n.slideCount - 1 - t
                  ? n.$slides
                      .slice(e - t, e + t + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((s = n.options.slidesToShow + e),
                    i
                      .slice(s - t + 1, s + t + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === e
                  ? i
                      .eq(i.length - 1 - n.options.slidesToShow)
                      .addClass("slick-center")
                  : e === n.slideCount - 1 &&
                    i.eq(n.options.slidesToShow).addClass("slick-center")),
              n.$slides.eq(e).addClass("slick-center"))
            : e >= 0 && e <= n.slideCount - n.options.slidesToShow
            ? n.$slides
                .slice(e, e + n.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : i.length <= n.options.slidesToShow
            ? i.addClass("slick-active").attr("aria-hidden", "false")
            : ((o = n.slideCount % n.options.slidesToShow),
              (s = !0 === n.options.infinite ? n.options.slidesToShow + e : e),
              n.options.slidesToShow == n.options.slidesToScroll &&
              n.slideCount - e < n.options.slidesToShow
                ? i
                    .slice(s - (n.options.slidesToShow - o), s + o)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : i
                    .slice(s, s + n.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
          "ondemand" === n.options.lazyLoad && n.lazyLoad();
      }),
      (t.prototype.setupInfinite = function () {
        var t,
          i,
          s,
          o = this;
        if (
          (!0 === o.options.fade && (o.options.centerMode = !1),
          !0 === o.options.infinite &&
            !1 === o.options.fade &&
            ((i = null), o.slideCount > o.options.slidesToShow))
        ) {
          for (
            s =
              !0 === o.options.centerMode
                ? o.options.slidesToShow + 1
                : o.options.slidesToShow,
              t = o.slideCount;
            t > o.slideCount - s;
            t -= 1
          )
            (i = t - 1),
              e(o.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i - o.slideCount)
                .prependTo(o.$slideTrack)
                .addClass("slick-cloned");
          for (t = 0; t < s; t += 1)
            (i = t),
              e(o.$slides[i])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", i + o.slideCount)
                .appendTo(o.$slideTrack)
                .addClass("slick-cloned");
          o.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              e(this).attr("id", "");
            });
        }
      }),
      (t.prototype.interrupt = function (e) {
        e || this.autoPlay(), (this.interrupted = e);
      }),
      (t.prototype.selectHandler = function (t) {
        var i = this,
          s = e(t.target).is(".slick-slide")
            ? e(t.target)
            : e(t.target).parents(".slick-slide"),
          o = parseInt(s.attr("data-slick-index"));
        if ((o || (o = 0), i.slideCount <= i.options.slidesToShow))
          return i.setSlideClasses(o), void i.asNavFor(o);
        i.slideHandler(o);
      }),
      (t.prototype.slideHandler = function (e, t, i) {
        var s,
          o,
          n,
          a,
          r,
          l,
          d = this;
        if (
          ((t = t || !1),
          (!0 !== d.animating || !0 !== d.options.waitForAnimate) &&
            !(
              (!0 === d.options.fade && d.currentSlide === e) ||
              d.slideCount <= d.options.slidesToShow
            ))
        )
          if (
            (!1 === t && d.asNavFor(e),
            (s = e),
            (r = d.getLeft(s)),
            (a = d.getLeft(d.currentSlide)),
            (d.currentLeft = null === d.swipeLeft ? a : d.swipeLeft),
            !1 === d.options.infinite &&
              !1 === d.options.centerMode &&
              (e < 0 || e > d.getDotCount() * d.options.slidesToScroll))
          )
            !1 === d.options.fade &&
              ((s = d.currentSlide),
              !0 !== i
                ? d.animateSlide(a, function () {
                    d.postSlide(s);
                  })
                : d.postSlide(s));
          else if (
            !1 === d.options.infinite &&
            !0 === d.options.centerMode &&
            (e < 0 || e > d.slideCount - d.options.slidesToScroll)
          )
            !1 === d.options.fade &&
              ((s = d.currentSlide),
              !0 !== i
                ? d.animateSlide(a, function () {
                    d.postSlide(s);
                  })
                : d.postSlide(s));
          else {
            if (
              (d.options.autoplay && clearInterval(d.autoPlayTimer),
              (o =
                s < 0
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                    : d.slideCount + s
                  : s >= d.slideCount
                  ? d.slideCount % d.options.slidesToScroll != 0
                    ? 0
                    : s - d.slideCount
                  : s),
              (d.animating = !0),
              d.$slider.trigger("beforeChange", [d, d.currentSlide, o]),
              (n = d.currentSlide),
              (d.currentSlide = o),
              d.setSlideClasses(d.currentSlide),
              d.options.asNavFor &&
                (l = (l = d.getNavTarget()).slick("getSlick")).slideCount <=
                  l.options.slidesToShow &&
                l.setSlideClasses(d.currentSlide),
              d.updateDots(),
              d.updateArrows(),
              !0 === d.options.fade)
            )
              return (
                !0 !== i
                  ? (d.fadeSlideOut(n),
                    d.fadeSlide(o, function () {
                      d.postSlide(o);
                    }))
                  : d.postSlide(o),
                void d.animateHeight()
              );
            !0 !== i
              ? d.animateSlide(r, function () {
                  d.postSlide(o);
                })
              : d.postSlide(o);
          }
      }),
      (t.prototype.startLoad = function () {
        var e = this;
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow.hide(), e.$nextArrow.hide()),
          !0 === e.options.dots &&
            e.slideCount > e.options.slidesToShow &&
            e.$dots.hide(),
          e.$slider.addClass("slick-loading");
      }),
      (t.prototype.swipeDirection = function () {
        var e,
          t,
          i,
          s,
          o = this;
        return (
          (e = o.touchObject.startX - o.touchObject.curX),
          (t = o.touchObject.startY - o.touchObject.curY),
          (i = Math.atan2(t, e)),
          (s = Math.round((180 * i) / Math.PI)) < 0 && (s = 360 - Math.abs(s)),
          s <= 45 && s >= 0
            ? !1 === o.options.rtl
              ? "left"
              : "right"
            : s <= 360 && s >= 315
            ? !1 === o.options.rtl
              ? "left"
              : "right"
            : s >= 135 && s <= 225
            ? !1 === o.options.rtl
              ? "right"
              : "left"
            : !0 === o.options.verticalSwiping
            ? s >= 35 && s <= 135
              ? "down"
              : "up"
            : "vertical"
        );
      }),
      (t.prototype.swipeEnd = function (e) {
        var t,
          i,
          s = this;
        if (
          ((s.dragging = !1),
          (s.interrupted = !1),
          (s.shouldClick = !(s.touchObject.swipeLength > 10)),
          void 0 === s.touchObject.curX)
        )
          return !1;
        if (
          (!0 === s.touchObject.edgeHit &&
            s.$slider.trigger("edge", [s, s.swipeDirection()]),
          s.touchObject.swipeLength >= s.touchObject.minSwipe)
        ) {
          switch ((i = s.swipeDirection())) {
            case "left":
            case "down":
              (t = s.options.swipeToSlide
                ? s.checkNavigable(s.currentSlide + s.getSlideCount())
                : s.currentSlide + s.getSlideCount()),
                (s.currentDirection = 0);
              break;
            case "right":
            case "up":
              (t = s.options.swipeToSlide
                ? s.checkNavigable(s.currentSlide - s.getSlideCount())
                : s.currentSlide - s.getSlideCount()),
                (s.currentDirection = 1);
          }
          "vertical" != i &&
            (s.slideHandler(t),
            (s.touchObject = {}),
            s.$slider.trigger("swipe", [s, i]));
        } else
          s.touchObject.startX !== s.touchObject.curX &&
            (s.slideHandler(s.currentSlide), (s.touchObject = {}));
      }),
      (t.prototype.swipeHandler = function (e) {
        var t = this;
        if (
          !(
            !1 === t.options.swipe ||
            ("ontouchend" in document && !1 === t.options.swipe) ||
            (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))
          )
        )
          switch (
            ((t.touchObject.fingerCount =
              e.originalEvent && void 0 !== e.originalEvent.touches
                ? e.originalEvent.touches.length
                : 1),
            (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
            !0 === t.options.verticalSwiping &&
              (t.touchObject.minSwipe =
                t.listHeight / t.options.touchThreshold),
            e.data.action)
          ) {
            case "start":
              t.swipeStart(e);
              break;
            case "move":
              t.swipeMove(e);
              break;
            case "end":
              t.swipeEnd(e);
          }
      }),
      (t.prototype.swipeMove = function (e) {
        var t,
          i,
          s,
          o,
          n,
          a = this;
        return (
          (n = void 0 !== e.originalEvent ? e.originalEvent.touches : null),
          !(!a.dragging || (n && 1 !== n.length)) &&
            ((t = a.getLeft(a.currentSlide)),
            (a.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX),
            (a.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY),
            (a.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))
            )),
            !0 === a.options.verticalSwiping &&
              (a.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(a.touchObject.curY - a.touchObject.startY, 2)
                )
              )),
            "vertical" !== (i = a.swipeDirection())
              ? (void 0 !== e.originalEvent &&
                  a.touchObject.swipeLength > 4 &&
                  e.preventDefault(),
                (o =
                  (!1 === a.options.rtl ? 1 : -1) *
                  (a.touchObject.curX > a.touchObject.startX ? 1 : -1)),
                !0 === a.options.verticalSwiping &&
                  (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1),
                (s = a.touchObject.swipeLength),
                (a.touchObject.edgeHit = !1),
                !1 === a.options.infinite &&
                  ((0 === a.currentSlide && "right" === i) ||
                    (a.currentSlide >= a.getDotCount() && "left" === i)) &&
                  ((s = a.touchObject.swipeLength * a.options.edgeFriction),
                  (a.touchObject.edgeHit = !0)),
                !1 === a.options.vertical
                  ? (a.swipeLeft = t + s * o)
                  : (a.swipeLeft =
                      t + s * (a.$list.height() / a.listWidth) * o),
                !0 === a.options.verticalSwiping && (a.swipeLeft = t + s * o),
                !0 !== a.options.fade &&
                  !1 !== a.options.touchMove &&
                  (!0 === a.animating
                    ? ((a.swipeLeft = null), !1)
                    : void a.setCSS(a.swipeLeft)))
              : void 0)
        );
      }),
      (t.prototype.swipeStart = function (e) {
        var t,
          i = this;
        if (
          ((i.interrupted = !0),
          1 !== i.touchObject.fingerCount ||
            i.slideCount <= i.options.slidesToShow)
        )
          return (i.touchObject = {}), !1;
        void 0 !== e.originalEvent &&
          void 0 !== e.originalEvent.touches &&
          (t = e.originalEvent.touches[0]),
          (i.touchObject.startX = i.touchObject.curX =
            void 0 !== t ? t.pageX : e.clientX),
          (i.touchObject.startY = i.touchObject.curY =
            void 0 !== t ? t.pageY : e.clientY),
          (i.dragging = !0);
      }),
      (t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
        var e = this;
        null !== e.$slidesCache &&
          (e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.appendTo(e.$slideTrack),
          e.reinit());
      }),
      (t.prototype.unload = function () {
        var t = this;
        e(".slick-cloned", t.$slider).remove(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.htmlExpr.test(t.options.prevArrow) &&
            t.$prevArrow.remove(),
          t.$nextArrow &&
            t.htmlExpr.test(t.options.nextArrow) &&
            t.$nextArrow.remove(),
          t.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (t.prototype.unslick = function (e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy();
      }),
      (t.prototype.updateArrows = function () {
        var e = this;
        Math.floor(e.options.slidesToShow / 2),
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            !e.options.infinite &&
            (e.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            e.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === e.currentSlide
              ? (e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                !1 === e.options.centerMode
              ? (e.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : e.currentSlide >= e.slideCount - 1 &&
                !0 === e.options.centerMode &&
                (e.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                e.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (t.prototype.updateDots = function () {
        var e = this;
        null !== e.$dots &&
          (e.$dots
            .find("li")
            .removeClass("slick-active")
            .attr("aria-hidden", "true"),
          e.$dots
            .find("li")
            .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
            .addClass("slick-active")
            .attr("aria-hidden", "false"));
      }),
      (t.prototype.visibility = function () {
        var e = this;
        e.options.autoplay &&
          (document[e.hidden] ? (e.interrupted = !0) : (e.interrupted = !1));
      }),
      (e.fn.slick = function () {
        var e,
          i,
          s = this,
          o = arguments[0],
          n = Array.prototype.slice.call(arguments, 1),
          a = s.length;
        for (e = 0; e < a; e++)
          if (
            ("object" == typeof o || void 0 === o
              ? (s[e].slick = new t(s[e], o))
              : (i = s[e].slick[o].apply(s[e].slick, n)),
            void 0 !== i)
          )
            return i;
        return s;
      });
  });
var swfobject = (function () {
  var e = "undefined",
    t = "object",
    i = "application/x-shockwave-flash",
    s = "SWFObjectExprInst",
    o = window,
    n = document,
    a = navigator,
    r = [],
    l = [],
    d = null,
    c = null,
    p = null,
    u = !1,
    h = !1,
    f = (function () {
      var i =
          typeof n.getElementById != e &&
          typeof n.getElementsByTagName != e &&
          typeof n.createElement != e &&
          typeof n.appendChild != e &&
          typeof n.replaceChild != e &&
          typeof n.removeChild != e &&
          typeof n.cloneNode != e,
        s = [0, 0, 0],
        r = null;
      if (typeof a.plugins != e && typeof a.plugins["Shockwave Flash"] == t)
        (r = a.plugins["Shockwave Flash"].description) &&
          ((r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1")),
          (s[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10)),
          (s[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10)),
          (s[2] = /r/.test(r)
            ? parseInt(r.replace(/^.*r(.*)$/, "$1"), 10)
            : 0));
      else if (typeof o.ActiveXObject != e) {
        var l = null,
          d = !1;
        try {
          l = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        } catch (e) {
          try {
            (l = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")),
              (s = [6, 0, 21]),
              (l.AllowScriptAccess = "always");
          } catch (e) {
            6 == s[0] && (d = !0);
          }
          if (!d)
            try {
              l = new ActiaveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (e) {}
        }
        if (!d && l)
          try {
            (r = l.GetVariable("$version")) &&
              ((r = r.split(" ")[1].split(",")),
              (s = [
                parseInt(r[0], 10),
                parseInt(r[1], 10),
                parseInt(r[2], 10),
              ]));
          } catch (e) {}
      }
      var c = a.userAgent.toLowerCase(),
        p = a.platform.toLowerCase();
      return {
        w3cdom: i,
        pv: s,
        webkit:
          !!/webkit/.test(c) &&
          parseFloat(c.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
        ie: !1,
        win: /win/.test(p || c),
        mac: /mac/.test(p || c),
      };
    })();
  function m() {
    if (!u) {
      if (f.ie && f.win) {
        var e = x("span");
        try {
          var t = n.getElementsByTagName("body")[0].appendChild(e);
          t.parentNode.removeChild(t);
        } catch (e) {
          return;
        }
      }
      (u = !0), d && (clearInterval(d), (d = null));
      for (var i = r.length, s = 0; s < i; s++) r[s]();
    }
  }
  function v(e) {
    u ? e() : (r[r.length] = e);
  }
  function g(t) {
    if (typeof o.addEventListener != e) o.addEventListener("load", t, !1);
    else if (typeof n.addEventListener != e) n.addEventListener("load", t, !1);
    else if (typeof o.attachEvent != e) o.attachEvent("onload", t);
    else if ("function" == typeof o.onload) {
      var i = o.onload;
      o.onload = function () {
        i(), t();
      };
    } else o.onload = t;
  }
  function b() {
    for (var e = l.length, t = 0; t < e; t++) {
      var i = l[t].id;
      if (f.pv[0] > 0) {
        var s = S(i);
        s &&
          ((l[t].width = s.getAttribute("width")
            ? s.getAttribute("width")
            : "0"),
          (l[t].height = s.getAttribute("height")
            ? s.getAttribute("height")
            : "0"),
          A(l[t].swfVersion)
            ? (f.webkit && f.webkit < 312 && y(s), E(i, !0))
            : l[t].expressInstall && !h && A("6.0.65") && (f.win || f.mac)
            ? $(l[t])
            : w(s));
      } else E(i, !0);
    }
  }
  function y(e) {
    var i = e.getElementsByTagName(t)[0];
    if (i) {
      var s = x("embed"),
        o = i.attributes;
      if (o)
        for (var n = o.length, a = 0; a < n; a++)
          "data" == o[a].nodeName.toLowerCase()
            ? s.setAttribute("src", o[a].nodeValue)
            : s.setAttribute(o[a].nodeName, o[a].nodeValue);
      var r = i.childNodes;
      if (r)
        for (var l = r.length, d = 0; d < l; d++)
          1 == r[d].nodeType &&
            "param" == r[d].nodeName.toLowerCase() &&
            s.setAttribute(
              r[d].getAttribute("name"),
              r[d].getAttribute("value")
            );
      e.parentNode.replaceChild(s, e);
    }
  }
  function $(e) {
    h = !0;
    var t = S(e.id);
    if (t) {
      if (e.altContentId) {
        var i = S(e.altContentId);
        i && ((c = i), (p = e.altContentId));
      } else c = k(t);
      !/%$/.test(e.width) && parseInt(e.width, 10) < 310 && (e.width = "310"),
        !/%$/.test(e.height) &&
          parseInt(e.height, 10) < 137 &&
          (e.height = "137"),
        (n.title = n.title.slice(0, 47) + " - Flash Player Installation");
      var a = f.ie && f.win ? "ActiveX" : "PlugIn",
        r = n.title,
        l =
          "MMredirectURL=" +
          o.location +
          "&MMplayerType=" +
          a +
          "&MMdoctitle=" +
          r,
        d = e.id;
      if (f.ie && f.win && 4 != t.readyState) {
        var u = x("div");
        (d += "SWFObjectNew"),
          u.setAttribute("id", d),
          t.parentNode.insertBefore(u, t),
          (t.style.display = "none"),
          o.attachEvent("onload", function () {
            t.parentNode.removeChild(t);
          });
      }
      C(
        { data: e.expressInstall, id: s, width: e.width, height: e.height },
        { flashvars: l },
        d
      );
    }
  }
  function w(e) {
    if (f.ie && f.win && 4 != e.readyState) {
      var t = x("div");
      e.parentNode.insertBefore(t, e),
        t.parentNode.replaceChild(k(e), t),
        (e.style.display = "none"),
        o.attachEvent("onload", function () {
          e.parentNode.removeChild(e);
        });
    } else e.parentNode.replaceChild(k(e), e);
  }
  function k(e) {
    var i = x("div");
    if (f.win && f.ie) i.innerHTML = e.innerHTML;
    else {
      var s = e.getElementsByTagName(t)[0];
      if (s) {
        var o = s.childNodes;
        if (o)
          for (var n = o.length, a = 0; a < n; a++)
            (1 == o[a].nodeType && "param" == o[a].nodeName.toLowerCase()) ||
              8 == o[a].nodeType ||
              i.appendChild(o[a].cloneNode(!0));
      }
    }
    return i;
  }
  function C(s, n, a) {
    var r,
      l = S(a);
    if ((typeof s.id == e && (s.id = a), f.ie && f.win)) {
      var d = "";
      for (var c in s)
        s[c] != Object.prototype[c] &&
          ("data" == c
            ? (n.movie = s[c])
            : "styleclass" == c.toLowerCase()
            ? (d += ' class="' + s[c] + '"')
            : "classid" != c && (d += " " + c + '="' + s[c] + '"'));
      var p = "";
      for (var u in n)
        n[u] != Object.prototype[u] &&
          (p += '<param name="' + u + '" value="' + n[u] + '" />');
      (l.outerHTML =
        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
        d +
        ">" +
        p +
        "</object>"),
        (function (e) {
          f.ie &&
            f.win &&
            A("8.0.0") &&
            o.attachEvent("onunload", function () {
              var t = S(e);
              if (t) {
                for (var i in t)
                  "function" == typeof t[i] && (t[i] = function () {});
                t.parentNode.removeChild(t);
              }
            });
        })(s.id),
        (r = S(s.id));
    } else if (f.webkit && f.webkit < 312) {
      var h = x("embed");
      for (var m in (h.setAttribute("type", i), s))
        s[m] != Object.prototype[m] &&
          ("data" == m
            ? h.setAttribute("src", s[m])
            : "styleclass" == m.toLowerCase()
            ? h.setAttribute("class", s[m])
            : "classid" != m && h.setAttribute(m, s[m]));
      for (var v in n)
        n[v] != Object.prototype[v] && "movie" != v && h.setAttribute(v, n[v]);
      l.parentNode.replaceChild(h, l), (r = h);
    } else {
      var g = x(t);
      for (var b in (g.setAttribute("type", i), s))
        s[b] != Object.prototype[b] &&
          ("styleclass" == b.toLowerCase()
            ? g.setAttribute("class", s[b])
            : "classid" != b && g.setAttribute(b, s[b]));
      for (var y in n)
        n[y] != Object.prototype[y] && "movie" != y && T(g, y, n[y]);
      l.parentNode.replaceChild(g, l), (r = g);
    }
    return r;
  }
  function T(e, t, i) {
    var s = x("param");
    s.setAttribute("name", t), s.setAttribute("value", i), e.appendChild(s);
  }
  function S(e) {
    return n.getElementById(e);
  }
  function x(e) {
    return n.createElement(e);
  }
  function A(e) {
    var t = f.pv,
      i = e.split(".");
    return (
      (i[0] = parseInt(i[0], 10)),
      (i[1] = parseInt(i[1], 10)),
      (i[2] = parseInt(i[2], 10)),
      t[0] > i[0] ||
        (t[0] == i[0] && t[1] > i[1]) ||
        (t[0] == i[0] && t[1] == i[1] && t[2] >= i[2])
    );
  }
  function O(i, s) {
    if (!f.ie || !f.mac) {
      var o = n.getElementsByTagName("head")[0],
        a = x("style");
      if (
        (a.setAttribute("type", "text/css"),
        a.setAttribute("media", "screen"),
        (f.ie && f.win) ||
          typeof n.createTextNode == e ||
          a.appendChild(n.createTextNode(i + " {" + s + "}")),
        o.appendChild(a),
        f.ie && f.win && typeof n.styleSheets != e && n.styleSheets.length > 0)
      ) {
        var r = n.styleSheets[n.styleSheets.length - 1];
        typeof r.addRule == t && r.addRule(i, s);
      }
    }
  }
  function E(e, t) {
    var i = t ? "inherit" : "hidden";
    u ? (S(e).style.visibility = i) : O("#" + e, "visibility:" + i);
  }
  return (
    (function () {
      if (f.w3cdom) {
        if ((v(b), f.ie && f.win))
          try {
            n.write("<script id=__ie_ondomload defer=true src=//:></script>");
            var t = S("__ie_ondomload");
            t &&
              (t.onreadystatechange = function () {
                "complete" == this.readyState &&
                  (this.parentNode.removeChild(this), m());
              });
          } catch (e) {}
        f.webkit &&
          typeof n.readyState != e &&
          (d = setInterval(function () {
            /loaded|complete/.test(n.readyState) && m();
          }, 10)),
          typeof n.addEventListener != e &&
            n.addEventListener("DOMContentLoaded", m, null),
          g(m);
      }
    })(),
    {
      registerObject: function (e, t, i) {
        if (f.w3cdom && e) {
          var s = document.getElementById(e),
            o = (function (e) {
              if (!e) return "";
              for (var t = e.childNodes, i = t.length, s = 0; s < i; s++)
                if (
                  (1 == t[s].nodeType &&
                    "object" == t[s].nodeName.toLowerCase() &&
                    ((i = (t = t[s].childNodes).length), (s = 0)),
                  1 == t[s].nodeType &&
                    "param" == t[s].nodeName.toLowerCase() &&
                    "expressinstall" == t[s].getAttribute("name"))
                )
                  return t[s].getAttribute("value");
              return "";
            })(s),
            n = {};
          (n.id = e),
            (n.swfVersion =
              t ||
              (function (e) {
                if (!e) return 0;
                for (var t = e.childNodes, i = t.length, s = 0; s < i; s++)
                  if (
                    (1 == t[s].nodeType &&
                      "object" == t[s].nodeName.toLowerCase() &&
                      ((i = (t = t[s].childNodes).length), (s = 0)),
                    1 == t[s].nodeType &&
                      "param" == t[s].nodeName.toLowerCase() &&
                      "swfversion" == t[s].getAttribute("name"))
                  )
                    return t[s].getAttribute("value");
                return 0;
              })(s)),
            (n.expressInstall = i || ("" != o && o)),
            (l[l.length] = n),
            E(e, !1);
        }
      },
      getObjectById: function (i) {
        var s = null;
        if (f.w3cdom && u) {
          var o = S(i);
          if (o) {
            var n = o.getElementsByTagName(t)[0];
            !n || (n && typeof o.SetVariable != e)
              ? (s = o)
              : typeof n.SetVariable != e && (s = n);
          }
        }
        return s;
      },
      embedSWF: function (i, s, o, n, a, r, l, d, c) {
        if (f.w3cdom && i && s && o && n && a)
          if (((o += ""), (n += ""), A(a))) {
            E(s, !1);
            var p = typeof c == t ? c : {};
            (p.data = i), (p.width = o), (p.height = n);
            var u = typeof d == t ? d : {};
            if (typeof l == t)
              for (var m in l)
                l[m] != Object.prototype[m] &&
                  (typeof u.flashvars != e
                    ? (u.flashvars += "&" + m + "=" + l[m])
                    : (u.flashvars = m + "=" + l[m]));
            v(function () {
              C(p, u, s), p.id == s && E(s, !0);
            });
          } else
            r &&
              !h &&
              A("6.0.65") &&
              (f.win || f.mac) &&
              (E(s, !1),
              v(function () {
                var e = {};
                (e.id = e.altContentId = s),
                  (e.width = o),
                  (e.height = n),
                  (e.expressInstall = r),
                  $(e);
              }));
      },
      getFlashPlayerVersion: function () {
        return { major: f.pv[0], minor: f.pv[1], release: f.pv[2] };
      },
      hasFlashPlayerVersion: A,
      createSWF: function (e, t, i) {
        return f.w3cdom && u ? C(e, t, i) : void 0;
      },
      createCSS: function (e, t) {
        f.w3cdom && O(e, t);
      },
      addDomLoadEvent: v,
      addLoadEvent: g,
      getQueryParamValue: function (e) {
        var t = n.location.search || n.location.hash;
        if (null == e) return t;
        if (t)
          for (var i = t.substring(1).split("&"), s = 0; s < i.length; s++)
            if (i[s].substring(0, i[s].indexOf("=")) == e)
              return i[s].substring(i[s].indexOf("=") + 1);
        return "";
      },
      expressInstallCallback: function () {
        if (h && c) {
          var e = S(s);
          e &&
            (e.parentNode.replaceChild(c, e),
            p && (E(p, !0), f.ie && f.win && (c.style.display = "block")),
            (c = null),
            (p = null),
            (h = !1));
        }
      },
    }
  );
})();
function sticky_relocate() {
  var e = $(window).scrollTop(),
    t = $("#sticky-anchor");
  t.length &&
    (e > t.offset().top - 80
      ? ($(".search-bar").addClass("stick"),
        $("#sticky-anchor").height($(".search-bar").outerHeight()))
      : ($(".search-bar").removeClass("stick"), $("#sticky-anchor").height(0)));
}
!(function (e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "undefined" != typeof module && module.exports
    ? (module.exports = e(require("jquery")))
    : e(jQuery);
})(function (e) {
  var t = -1,
    i = -1,
    s = function (e) {
      return parseFloat(e) || 0;
    },
    o = function (t) {
      var i = e(t),
        o = null,
        n = [];
      return (
        i.each(function () {
          var t = e(this),
            i = t.offset().top - s(t.css("margin-top")),
            a = n.length > 0 ? n[n.length - 1] : null;
          null === a
            ? n.push(t)
            : Math.floor(Math.abs(o - i)) <= 1
            ? (n[n.length - 1] = a.add(t))
            : n.push(t),
            (o = i);
        }),
        n
      );
    },
    n = function (t) {
      var i = { byRow: !0, property: "height", target: null, remove: !1 };
      return "object" == typeof t
        ? e.extend(i, t)
        : ("boolean" == typeof t
            ? (i.byRow = t)
            : "remove" === t && (i.remove = !0),
          i);
    },
    a = (e.fn.matchHeight = function (t) {
      var i = n(t);
      if (i.remove) {
        var s = this;
        return (
          this.css(i.property, ""),
          e.each(a._groups, function (e, t) {
            t.elements = t.elements.not(s);
          }),
          this
        );
      }
      return this.length <= 1 && !i.target
        ? this
        : (a._groups.push({ elements: this, options: i }),
          a._apply(this, i),
          this);
    });
  (a.version = "0.7.0"),
    (a._groups = []),
    (a._throttle = 80),
    (a._maintainScroll = !1),
    (a._beforeUpdate = null),
    (a._afterUpdate = null),
    (a._rows = o),
    (a._parse = s),
    (a._parseOptions = n),
    (a._apply = function (t, i) {
      var r = n(i),
        l = e(t),
        d = [l],
        c = e(window).scrollTop(),
        p = e("html").outerHeight(!0),
        u = l.parents().filter(":hidden");
      return (
        u.each(function () {
          var t = e(this);
          t.data("style-cache", t.attr("style"));
        }),
        u.css("display", "block"),
        r.byRow &&
          !r.target &&
          (l.each(function () {
            var t = e(this),
              i = t.css("display");
            "inline-block" !== i &&
              "flex" !== i &&
              "inline-flex" !== i &&
              (i = "block"),
              t.data("style-cache", t.attr("style")),
              t.css({
                display: i,
                "padding-top": "0",
                "padding-bottom": "0",
                "margin-top": "0",
                "margin-bottom": "0",
                "border-top-width": "0",
                "border-bottom-width": "0",
                height: "100px",
                overflow: "hidden",
              });
          }),
          (d = o(l)),
          l.each(function () {
            var t = e(this);
            t.attr("style", t.data("style-cache") || "");
          })),
        e.each(d, function (t, i) {
          var o = e(i),
            n = 0;
          if (r.target) n = r.target.outerHeight(!1);
          else {
            if (r.byRow && o.length <= 1) return void o.css(r.property, "");
            o.each(function () {
              var t = e(this),
                i = t.attr("style"),
                s = t.css("display");
              "inline-block" !== s &&
                "flex" !== s &&
                "inline-flex" !== s &&
                (s = "block");
              var o = { display: s };
              (o[r.property] = ""),
                t.css(o),
                t.outerHeight(!1) > n && (n = t.outerHeight(!1)),
                i ? t.attr("style", i) : t.css("display", "");
            });
          }
          o.each(function () {
            var t = e(this),
              i = 0;
            (r.target && t.is(r.target)) ||
              ("border-box" !== t.css("box-sizing") &&
                ((i +=
                  s(t.css("border-top-width")) +
                  s(t.css("border-bottom-width"))),
                (i += s(t.css("padding-top")) + s(t.css("padding-bottom")))),
              t.css(r.property, n - i + "px"));
          });
        }),
        u.each(function () {
          var t = e(this);
          t.attr("style", t.data("style-cache") || null);
        }),
        a._maintainScroll &&
          e(window).scrollTop((c / p) * e("html").outerHeight(!0)),
        this
      );
    }),
    (a._applyDataApi = function () {
      var t = {};
      e("[data-match-height], [data-mh]").each(function () {
        var i = e(this),
          s = i.attr("data-mh") || i.attr("data-match-height");
        t[s] = s in t ? t[s].add(i) : i;
      }),
        e.each(t, function () {
          this.matchHeight(!0);
        });
    });
  var r = function (t) {
    a._beforeUpdate && a._beforeUpdate(t, a._groups),
      e.each(a._groups, function () {
        a._apply(this.elements, this.options);
      }),
      a._afterUpdate && a._afterUpdate(t, a._groups);
  };
  (a._update = function (s, o) {
    if (o && "resize" === o.type) {
      var n = e(window).width();
      if (n === t) return;
      t = n;
    }
    s
      ? -1 === i &&
        (i = setTimeout(function () {
          r(o), (i = -1);
        }, a._throttle))
      : r(o);
  }),
    e(a._applyDataApi),
    e(window).bind("load", function (e) {
      a._update(!1, e);
    }),
    e(window).bind("resize orientationchange", function (e) {
      a._update(!0, e);
    });
}),
  $(function () {
    $(".home-slider").slick({
      arrows: !1,
      infinite: !0,
      autoplay: !0,
      pauseOnFocus: !1,
      dots: !0,
      fade: !0,
      autoplaySpeed: 6e3,
      speed: 400,
    }),
      $(".home-slider").on("afterChange", function (e, t, i) {
        var s = $(t.$slides[i]).find("video");
        s.length > 0 && $(s).get(0).play();
      }),
      $(".carousel-box").slick({
        dots: !1,
        infinite: !0,
        arrows: !0,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: { slidesToShow: 4, slidesToScroll: 1 },
          },
          { breakpoint: 960, settings: { slidesToShow: 3, slidesToScroll: 1 } },
          { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      }),
      $(".partner-companies-carousel").slick({
        dots: !1,
        arrows: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: !0,
              autoplay: !0,
            },
          },
          { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
          { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        ],
      }),
      $(".c-arrows .ar-prev").on("click", function () {
        $(".carousel-box .slick-prev").trigger("click");
      }),
      $(".c-arrows .ar-next").on("click", function () {
        $(".carousel-box .slick-next").trigger("click");
      }),
      $(".mobile-carousel").slick({
        dots: !0,
        arrows: !1,
        infinite: !1,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      }),
      $(".backbg").each(function () {
        var e = $(this).attr("src");
        $(this)
          .parent(".backbgbox")
          .css("background-image", "url(" + e + ")");
      }),
      $(".tab-links ul li a").on("click", function () {
        $(this).parent("li").removeClass("open").addClass("open"),
          $(this).parent("li").siblings("li").removeClass("open");
        var e = $(this).attr("href");
        return (
          $(e).siblings("div.tab-detail").addClass("tab-current").hide(),
          $(e).show(),
          !1
        );
      }),
      $(".contact-tabs ul li a").on("click", function () {
        $(this).parent("div").parent("li").removeClass("open").addClass("open"),
          $(this).parent("div").parent("li").siblings("li").removeClass("open");
        var e = $(this).attr("href");
        return (
          $(e).siblings("div.tab-detail").addClass("tab-current").hide(),
          $(e).show(),
          !1
        );
      }),
      $(".mobile-select ul li a").on("click", function () {
        $(this).parent("li").parent("ul").slideToggle(200);
        var e = $(this).text();
        $(this)
          .parent("li")
          .parent("ul")
          .siblings("div")
          .children("span.drtext")
          .text(e),
          $(this).parent("li").toggleClass("open"),
          $(this).parent("li").siblings("li").removeClass("open");
        var t = $(this).attr("href");
        return $(t).show(), !1;
      }),
      $(".tabs-box .tab-links ul").clone().appendTo(".tab-links-mobile"),
      $(".tab-links-mobile .dropdown").click(function () {
        $(this).next("ul").slideToggle(200);
      }),
      $(".tab-links-mobile ul li").on("click", function () {
        var e = $(this).find("a").text();
        $(".tab-links-mobile ul").slideUp(),
          $(".drtext").text(e),
          $(this).toggleClass("open"),
          $(this).siblings("li").removeClass("open");
        var t = $(this).children("a").attr("href");
        return (
          $(t).siblings("div.tab-detail").addClass("tab-current").hide(),
          $(t).show(),
          $(this).children("a").attr("href"),
          $(t).parent("li").siblings("li").removeClass("showme"),
          $(t).parent("li").addClass("showme"),
          $(".mobile-carousel").slick("setPosition"),
          !1
        );
      }),
      $(".mobile-select .dropdown").click(function () {
        $(this).next("ul").slideToggle(200);
      }),
      $(".mobile-select ul li").on("click", function () {
        var e = $(this).find("a").text();
        $(".drtext-c").text(e),
          $(this).toggleClass("open"),
          $(this).siblings("li").removeClass("open");
        var t = $(this).children("a").attr("href");
        return (
          $(t).siblings("div.tab-detail").addClass("tab-current").hide(),
          $(t).show(),
          $(this).children("a").attr("href"),
          $(t).parent("li").siblings("li").removeClass("showme"),
          $(t).parent("li").addClass("showme"),
          $(".mobile-carousel").slick("setPosition"),
          !1
        );
      }),
      $(window).width() < 960 &&
        $(".mainnav > ul > li:has(>ul)").on("click", function () {
          $(this).find(">ul").slideToggle(),
            $(this).siblings("li:has(>ul)").find(">ul").hide();
        }),
      $(".mobilemenu_btn").on("click", function () {
        $(".mainnav").slideToggle(),
          $(".mainnav ul li ul").is(":visible") &&
            $(".mainnav ul li ul").slideUp();
      }),
      $(".th-dots").on("click", function () {
        $("body").toggleClass("mobmenuopen");
      }),
      $("marquee")
        .on("mouseover", function () {
          $(this).attr("scrollamount", 0);
        })
        .mouseout(function () {
          $(this).attr("scrollamount", 5);
        }),
      $(window).scroll(function () {
        $(this).scrollTop() > 20
          ? $("body").addClass("sticky")
          : $("body").removeClass("sticky");
      }),
      $(this).scrollTop() > 20
        ? $("body").addClass("sticky")
        : $("body").removeClass("sticky");
  }),
  $(function () {
    $(window).scroll(sticky_relocate), sticky_relocate();
  });
var dir = 1,
  MIN_TOP = 200,
  MAX_TOP = 350;
function autoscroll() {
  var e = $(window).scrollTop() + dir;
  e >= MAX_TOP
    ? ((e = MAX_TOP), (dir = -1))
    : e <= MIN_TOP && ((e = MIN_TOP), (dir = 1)),
    $(window).scrollTop(e),
    window.setTimeout(autoscroll, 100);
}
function wordTrim(e, t, i) {
  if (e.length <= t) return e;
  for (
    var s = e.split(" "), o = s[0].length, n = 1;
    n < s.length && !(o == t || o + s[n].length + 1 > t);
    n++
  )
    o += s[n].length + 1;
  return s.slice(0, n).join(" ") + (i || "");
}
function videoClose() {
  location.reload();
}
$(document).ready(function (e) {
  e(".dropdown-toggle").click(function () {
    $(".submenu-change").removeClass("active-link"),
      $(
        ".right-column-wrap > div.submenu-change-default:nth-of-type(1)"
      ).show();
    var t = e(this)
      .parent(".button-dropdown")
      .children(".dropdown-menu")
      .is(":hidden");
    e(".dropdown-menu").hide(),
      e(".dropdown-toggle").removeClass("active"),
      t &&
        e(this)
          .parent(".button-dropdown")
          .children(".dropdown-menu")
          .toggle()
          .parent(".button-dropdown")
          .children(".dropdown-toggle")
          .addClass("active");
  }),
    e(document).bind("click", function (t) {
      e(t.target).parents().hasClass("button-dropdown") ||
        e(".button-dropdown .dropdown-menu").hide();
    }),
    e(document).bind("click", function (t) {
      e(t.target).parents().hasClass("button-dropdown") ||
        e(".button-dropdown .dropdown-toggle").removeClass("active");
    });
}),
  $("div.first-sub").hover(function () {
    var e = $(this).data("menulink");
    $("#secondsub-" + e).toggleClass("active-link"),
      $(
        ".right-column-wrap > div.submenu-change-default:nth-of-type(1)"
      ).toggleClass("hide-default");
  }),
  $("div.submenu-change").hover(function () {
    $(this).toggleClass("active-link"),
      $(
        ".right-column-wrap > div.submenu-change-default:nth-of-type(1)"
      ).toggleClass("hide-default");
  }),
  $(".dropdown-menu").mouseleave(function () {
    $(".right-column-wrap > div.submenu-change-default:nth-of-type(1)").show();
  }),
  $(".left-column-wrap").hover(function () {
    $(this).toggleClass("active-default");
  }),
  $("#show-mobile-menu").on("click", function () {
    $("body").toggleClass("mobmenuopen");
  }),
  $(".contact-tabs ul li a").on("click", function () {
    $(this).parent("div").parent("li").toggleClass("open"),
      $(this).parent("div").parent("li").siblings("li").removeClass("open");
    var e = $(this).attr("href");
    return (
      $(e).siblings("div.tab-detail").addClass("tab-current").hide(),
      $(e).show(),
      !1
    );
  }),
  (function (e) {
    var t = e('<span class="arrow"></span>');
    e("#mobile-main-menu > li:has(ul) > a").on("click", function () {
      e(this).parent("li").toggleClass("open");
    }),
      e(".mobile-sub-menu > li:has(ul) > a").append(t),
      e(".mobile-sub-menu > li:has(ul) > a ").on("click", function () {
        e(this).parent("li").toggleClass("open-sub");
      });
  })(jQuery),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (i) {
          return t(e, i);
        })
      : "object" == typeof exports
      ? t(e, require("jquery"))
      : t(e, e.jQuery || e.Zepto);
  })(this, function (e, t) {
    "use strict";
    var i,
      s,
      o,
      n = "popup",
      a = (e.REMODAL_GLOBALS && e.REMODAL_GLOBALS.NAMESPACE) || n,
      r = t
        .map(
          [
            "animationstart",
            "webkitAnimationStart",
            "MSAnimationStart",
            "oAnimationStart",
          ],
          function (e) {
            return e + "." + a;
          }
        )
        .join(" "),
      l = t
        .map(
          [
            "animationend",
            "webkitAnimationEnd",
            "MSAnimationEnd",
            "oAnimationEnd",
          ],
          function (e) {
            return e + "." + a;
          }
        )
        .join(" "),
      d = t.extend(
        {
          hashTracking: !0,
          closeOnConfirm: !0,
          closeOnCancel: !0,
          closeOnEscape: !0,
          closeOnOutsideClick: !0,
          modifier: "",
        },
        e.REMODAL_GLOBALS && e.REMODAL_GLOBALS.DEFAULTS
      ),
      c = {
        CLOSING: "closing",
        CLOSED: "closed",
        OPENING: "opening",
        OPENED: "opened",
      },
      p = { CONFIRMATION: "confirmation", CANCELLATION: "cancellation" },
      u =
        void 0 !== (i = document.createElement("div").style).animationName ||
        void 0 !== i.WebkitAnimationName ||
        void 0 !== i.MozAnimationName ||
        void 0 !== i.msAnimationName ||
        void 0 !== i.OAnimationName,
      h = /iPad|iPhone|iPod/.test(navigator.platform);
    function f(e) {
      if (
        u &&
        "none" === e.css("animation-name") &&
        "none" === e.css("-webkit-animation-name") &&
        "none" === e.css("-moz-animation-name") &&
        "none" === e.css("-o-animation-name") &&
        "none" === e.css("-ms-animation-name")
      )
        return 0;
      var t,
        i,
        s,
        o,
        n =
          e.css("animation-duration") ||
          e.css("-webkit-animation-duration") ||
          e.css("-moz-animation-duration") ||
          e.css("-o-animation-duration") ||
          e.css("-ms-animation-duration") ||
          "0s",
        a =
          e.css("animation-delay") ||
          e.css("-webkit-animation-delay") ||
          e.css("-moz-animation-delay") ||
          e.css("-o-animation-delay") ||
          e.css("-ms-animation-delay") ||
          "0s",
        r =
          e.css("animation-iteration-count") ||
          e.css("-webkit-animation-iteration-count") ||
          e.css("-moz-animation-iteration-count") ||
          e.css("-o-animation-iteration-count") ||
          e.css("-ms-animation-iteration-count") ||
          "1";
      for (
        n = n.split(", "),
          a = a.split(", "),
          r = r.split(", "),
          o = 0,
          i = n.length,
          t = Number.NEGATIVE_INFINITY;
        o < i;
        o++
      )
        (s = parseFloat(n[o]) * parseInt(r[o], 10) + parseFloat(a[o])) > t &&
          (t = s);
      return s;
    }
    function m() {
      if (t(document.body).height() <= t(window).height()) return 0;
      var e,
        i,
        s = document.createElement("div"),
        o = document.createElement("div");
      return (
        (s.style.visibility = "hidden"),
        (s.style.width = "100px"),
        document.body.appendChild(s),
        (e = s.offsetWidth),
        (s.style.overflow = "scroll"),
        (o.style.width = "100%"),
        s.appendChild(o),
        (i = o.offsetWidth),
        s.parentNode.removeChild(s),
        e - i
      );
    }
    function v() {
      if (!h) {
        var e,
          i,
          s = t("html"),
          o = $("is-locked");
        s.hasClass(o) &&
          ((i = t(document.body)),
          (e = parseInt(i.css("padding-right"), 10) - m()),
          i.css("padding-right", e + "px"),
          s.removeClass(o));
      }
    }
    function g(e, t, i, s) {
      var o = $("is", t),
        n = [
          $("is", c.CLOSING),
          $("is", c.OPENING),
          $("is", c.CLOSED),
          $("is", c.OPENED),
        ].join(" ");
      e.$bg.removeClass(n).addClass(o),
        e.$overlay.removeClass(n).addClass(o),
        e.$wrapper.removeClass(n).addClass(o),
        e.$modal.removeClass(n).addClass(o),
        (e.state = t),
        !i && e.$modal.trigger({ type: t, reason: s }, [{ reason: s }]);
    }
    function b(e, i, s) {
      var o = 0,
        n = function (e) {
          e.target === this && o++;
        },
        a = function (e) {
          e.target === this &&
            0 == --o &&
            (t.each(["$bg", "$overlay", "$wrapper", "$modal"], function (e, t) {
              s[t].off(r + " " + l);
            }),
            i());
        };
      t.each(["$bg", "$overlay", "$wrapper", "$modal"], function (e, t) {
        s[t].on(r, n).on(l, a);
      }),
        e(),
        0 === f(s.$bg) &&
          0 === f(s.$overlay) &&
          0 === f(s.$wrapper) &&
          0 === f(s.$modal) &&
          (t.each(["$bg", "$overlay", "$wrapper", "$modal"], function (e, t) {
            s[t].off(r + " " + l);
          }),
          i());
    }
    function y(e) {
      e.state !== c.CLOSED &&
        (t.each(["$bg", "$overlay", "$wrapper", "$modal"], function (t, i) {
          e[i].off(r + " " + l);
        }),
        e.$bg.removeClass(e.settings.modifier),
        e.$overlay.removeClass(e.settings.modifier).hide(),
        e.$wrapper.hide(),
        v(),
        g(e, c.CLOSED, !0));
    }
    function $() {
      for (var e = a, t = 0; t < arguments.length; ++t) e += "-" + arguments[t];
      return e;
    }
    function w() {
      var e,
        i,
        o = location.hash.replace("#", "");
      if (o) {
        try {
          i = t("[data-" + n + '-id="' + o + '"]');
        } catch (e) {}
        i &&
          i.length &&
          (e = t[n].lookup[i.data(n)]) &&
          e.settings.hashTracking &&
          e.open();
      } else s && s.state === c.OPENED && s.settings.hashTracking && s.close();
    }
    function k(e, i) {
      var s = t(document.body),
        o = this;
      (o.settings = t.extend({}, d, i)),
        (o.index = t[n].lookup.push(o) - 1),
        (o.state = c.CLOSED),
        (o.$overlay = t("." + $("overlay"))),
        o.$overlay.length ||
          ((o.$overlay = t("<div>")
            .addClass($("overlay") + " " + $("is", c.CLOSED))
            .hide()),
          s.append(o.$overlay)),
        (o.$bg = t("." + $("bg")).addClass($("is", c.CLOSED))),
        (o.$modal = e
          .addClass(
            a +
              " " +
              $("is-initialized") +
              " " +
              o.settings.modifier +
              " " +
              $("is", c.CLOSED)
          )
          .attr("tabindex", "-1")),
        (o.$wrapper = t("<div>")
          .addClass(
            $("wrapper") + " " + o.settings.modifier + " " + $("is", c.CLOSED)
          )
          .hide()
          .append(o.$modal)),
        s.append(o.$wrapper),
        o.$wrapper.on(
          "click." + a,
          "[data-" + n + '-action="close"]',
          function (e) {
            e.preventDefault(), o.close();
          }
        ),
        o.$wrapper.on(
          "click." + a,
          "[data-" + n + '-action="cancel"]',
          function (e) {
            e.preventDefault(),
              o.$modal.trigger(p.CANCELLATION),
              o.settings.closeOnCancel && o.close(p.CANCELLATION);
          }
        ),
        o.$wrapper.on(
          "click." + a,
          "[data-" + n + '-action="confirm"]',
          function (e) {
            e.preventDefault(),
              o.$modal.trigger(p.CONFIRMATION),
              o.settings.closeOnConfirm && o.close(p.CONFIRMATION);
          }
        ),
        o.$wrapper.on("click." + a, function (e) {
          t(e.target).hasClass($("wrapper")) &&
            o.settings.closeOnOutsideClick &&
            o.close();
        });
    }
    (k.prototype.open = function () {
      var e,
        i = this;
      i.state !== c.OPENING &&
        i.state !== c.CLOSING &&
        ((e = i.$modal.attr("data-" + n + "-id")) &&
          i.settings.hashTracking &&
          ((o = t(window).scrollTop()), (location.hash = e)),
        s && s !== i && y(s),
        (s = i),
        (function () {
          if (!h) {
            var e,
              i,
              s = t("html"),
              o = $("is-locked");
            s.hasClass(o) ||
              ((i = t(document.body)),
              (e = parseInt(i.css("padding-right"), 10) + m()),
              i.css("padding-right", e + "px"),
              s.addClass(o));
          }
        })(),
        i.$bg.addClass(i.settings.modifier),
        i.$overlay.addClass(i.settings.modifier).show(),
        i.$wrapper.show().scrollTop(0),
        i.$modal.focus(),
        b(
          function () {
            g(i, c.OPENING);
          },
          function () {
            g(i, c.OPENED);
          },
          i
        ));
    }),
      (k.prototype.close = function (e) {
        var i = this;
        i.state !== c.OPENING &&
          i.state !== c.CLOSING &&
          (i.settings.hashTracking &&
            i.$modal.attr("data-" + n + "-id") === location.hash.substr(1) &&
            ((location.hash = ""), t(window).scrollTop(o)),
          b(
            function () {
              g(i, c.CLOSING, !1, e);
            },
            function () {
              i.$bg.removeClass(i.settings.modifier),
                i.$overlay.removeClass(i.settings.modifier).hide(),
                i.$wrapper.hide(),
                v(),
                location.reload(),
                g(i, c.CLOSED, !1, e);
            },
            i
          ));
      }),
      (k.prototype.getState = function () {
        return this.state;
      }),
      (k.prototype.destroy = function () {
        var e = t[n].lookup;
        y(this),
          this.$wrapper.remove(),
          delete e[this.index],
          0 ===
            t.grep(e, function (e) {
              return !!e;
            }).length &&
            (this.$overlay.remove(),
            this.$bg.removeClass(
              $("is", c.CLOSING) +
                " " +
                $("is", c.OPENING) +
                " " +
                $("is", c.CLOSED) +
                " " +
                $("is", c.OPENED)
            ));
      }),
      (t[n] = { lookup: [] }),
      (t.fn[n] = function (e) {
        var i, s;
        return (
          this.each(function (o, a) {
            null == (s = t(a)).data(n)
              ? ((i = new k(s, e)),
                s.data(n, i.index),
                i.settings.hashTracking &&
                  s.attr("data-" + n + "-id") === location.hash.substr(1) &&
                  i.open())
              : (i = t[n].lookup[s.data(n)]);
          }),
          i
        );
      }),
      t(document).ready(function () {
        t(document).on("click", "[data-" + n + "-target]", function (e) {
          e.preventDefault();
          var i = e.currentTarget.getAttribute("data-" + n + "-target"),
            s = t("[data-" + n + '-id="' + i + '"]');
          t[n].lookup[s.data(n)].open();
        }),
          t(document)
            .find("." + a)
            .each(function (e, i) {
              var s = t(i),
                o = s.data(n + "-options");
              o
                ? ("string" == typeof o || o instanceof String) &&
                  (o = (function (e) {
                    var t,
                      i,
                      s,
                      o,
                      n = {};
                    for (
                      o = 0,
                        i = (t = (e = e
                          .replace(/\s*:\s*/g, ":")
                          .replace(/\s*,\s*/g, ",")).split(",")).length;
                      o < i;
                      o++
                    )
                      (t[o] = t[o].split(":")),
                        ("string" == typeof (s = t[o][1]) ||
                          s instanceof String) &&
                          (s = "true" === s || ("false" !== s && s)),
                        ("string" == typeof s || s instanceof String) &&
                          (s = isNaN(s) ? s : +s),
                        (n[t[o][0]] = s);
                    return n;
                  })(o))
                : (o = {}),
                s[n](o);
            }),
          t(document).on("keydown." + a, function (e) {
            s &&
              s.settings.closeOnEscape &&
              s.state === c.OPENED &&
              27 === e.keyCode &&
              s.close();
          }),
          t(window).on("hashchange." + a, w);
      });
  }),
  (jQuery.fn.nTicker = function (e) {
    return (
      (e = jQuery.extend({ speed: 100, pause: !0, buttons: !1 }, e)),
      this.each(function () {
        var t,
          i,
          s = jQuery,
          o = s(this),
          n = "ER_" + new Date().getTime();
        o.wrap('<div id="' + n + '"></div>'),
          o.css({ margin: "0 !important", padding: "0 !important" });
        var a = !0,
          r = o.offset().left,
          l = 1;
        o.children("li.tick-clones").remove(),
          o.addClass("newsticker"),
          o.wrap("<div class='mask'></div>");
        for (
          var d = o.parent().wrap("<div class='tickercontainer'></div>"),
            c = o.children("li"),
            p = d.outerWidth(!0);
          l < p;

        )
          (l = 1),
            o.append(c.clone(!0).addClass("tick-clones")),
            o.children("li").each(function (e) {
              l += s(this, e).outerWidth(!0);
            });
        function u(e, s) {
          o.animate({ left: "-=" + e }, s, "linear", function () {
            o.children("li:first").appendTo(o),
              o.css("left", 0),
              (t = o.children("li:first").outerWidth(!0)),
              (i = (s / e) * t),
              a && u(t, i);
          });
        }
        function h() {
          o.hover(f, m);
        }
        function f() {
          (a = !1), o.stop();
        }
        function m() {
          a = !0;
          var e = o.offset().left + o.children("li:first").outerWidth(!0) - r;
          u(e, (i / t) * e);
        }
        if (
          (o.width(l),
          o.height(o.parent().height()),
          (t = o.children("li:first").outerWidth(!0)),
          (i = (t / e.speed) * 1e3),
          u(t, i),
          e.pause && h(),
          e.buttons)
        ) {
          s(
            '<ul class="ticker-controls"><li class="prev nthriveticker nthriveticker-left"></li><li class="pause nthriveticker nthriveticker-pause"></li><li class="next nthriveticker nthriveticker-right"></li></ul>'
          ).insertAfter(d),
            s("body").on(
              "click",
              "#" + n + " .ticker-controls > .pause",
              function () {
                if (!a) return !1;
                s(this).toggleClass(
                  "pause nthriveticker-pause play nthriveticker-play"
                ),
                  o.unbind("mouseenter mouseleave"),
                  (a = !1);
              }
            ),
            s("body").on(
              "click",
              "#" + n + " .ticker-controls > .play",
              function () {
                if (a) return !1;
                s(this).toggleClass(
                  "pause nthriveticker-pause play nthriveticker-play"
                ),
                  (a = !0),
                  h();
                var e =
                  o.offset().left + o.children("li:first").outerWidth(!0) - r;
                u(e, (i / t) * e);
              }
            );
          var v = !1;
          s("body").on(
            "click",
            "#" + n + " .ticker-controls > .next",
            function () {
              if (a)
                return (
                  s("#" + n + " .ticker-controls > .pause").toggleClass(
                    "pause nthriveticker-pause play nthriveticker-play"
                  ),
                  void (a = !1)
                );
              if (v) return !1;
              var t = o.children("li:first").outerWidth(!0),
                i = (t / e.speed) * 1e3;
              (v = !0),
                o
                  .stop(!0, !0)
                  .animate({ left: "-=" + t }, i, "linear", function () {
                    o.children("li:first").appendTo(o),
                      o.css("left", 0),
                      (v = !1);
                  });
            }
          ),
            s("body").on(
              "click",
              "#" + n + " .ticker-controls > .prev",
              function () {
                if (a)
                  return (
                    s("#" + n + " .ticker-controls > .pause").toggleClass(
                      "pause nthriveticker-pause play nthriveticker-play"
                    ),
                    void (a = !1)
                  );
                if (v) return !1;
                var t = o.children("li:last").outerWidth(!0);
                o.css("left", "-" + t + "px"),
                  o.children("li:last").prependTo(o);
                var i = (t / e.speed) * 1e3;
                (v = !0),
                  o
                    .stop(!0, !0)
                    .animate({ left: "+=" + t }, i, "linear", function () {
                      v = !1;
                    });
              }
            );
        }
      })
    );
  }),
  $(document).ready(function () {
    $(":input", "form")
      .not(":button, :submit, :reset, :hidden, :checkbox")
      .val("")
      .prop("checked", !1)
      .prop("selected", !1);
  }),
  $("#back").click(function () {
    $(this)
      .parent("div")
      .parent("div")
      .parent("div.l-double-width")
      .animate({ left: "0" }, "fast");
  }),
  $("#back").on("keyup", function (e) {
    9 === e.keyCode &&
      ($(this)
        .parent("div")
        .parent("div")
        .parent("div.l-double-width")
        .animate({ left: "0" }, "fast"),
      $("#form-sec-1 input").filter(":first").focus());
  }),
  $("#form-next").click(function () {
    $("#next-button").attr("aria-hidden", "true"),
      $("#next-button").addClass("hidden"),
      $("input#question-field").valid()
        ? ($(this)
            .parent("div")
            .parent("div")
            .parent("div")
            .parent("div.l-double-width")
            .animate({ left: "-100%" }, "fast"),
          $("#form-sec-2 input").filter(":first").focus())
        : $("input.error").filter(":first").focus();
  }),
  $("#question-field").on("keydown", function (e) {
    39 === e.keyCode && $("#form-next").focus(),
      37 == e.keyCode && $("a:focus").prev().focus();
  }),
  $("#form-next").on("keydown", function (e) {
    if (
      (9 === e.keyCode &&
        (e.preventDefault(),
        $("#next-button").attr("aria-hidden", "false"),
        $("#next-button").removeClass("hidden"),
        $("input#question-field").valid()
          ? ($(this)
              .parent("div")
              .parent("div")
              .parent("div")
              .parent("div.l-double-width")
              .animate({ left: "-100%" }, "fast"),
            $("#form-sec-2 input").filter(":first").focus())
          : $("input.error").filter(":first").focus()),
      27 == e.keyCode)
    )
      return (
        $("#next-button").attr("aria-hidden", "true"),
        $("#next-button").addClass("hidden"),
        ev.preventDefault(),
        !1
      );
    39 === e.keyCode && $("#privacy-policy-footer").focus();
  }),
  $("#privacy-policy-footer").on("focus", function () {
    $("#question-field")
      .removeClass("error")
      .next("label")
      .attr("id", "question-field")
      .removeClass("error")
      .addClass("label-focus"),
      $("#next-button").attr("aria-hidden", "true"),
      $("#next-button").addClass("hidden");
  }),
  $(document).ready(function () {
    $("#footer-form").validate({
      rules: {
        first_name: { required: !0, minlength: 3 },
        last_name: { required: !0, minlength: 3 },
        email: { required: !0, email: !0 },
        General_Question: { required: !0, minlength: 5 },
      },
      messages: {
        first_name: {
          required: "Please enter your first name",
          minlength: "Your first name must consist of at least 3 characters",
        },
        last_name: {
          required: "Please enter your last name",
          minlength: "Your last name must consist of at least 3 characters",
        },
        email: "Please enter a valid email address",
        General_Question: {
          required: "Please enter your question",
          minlength: "Your question must consist of at least 5 characters",
        },
      },
    });
  }),
  $(document).ready(function () {
    $("input[type='tel']").attr("autocomplete", "none"),
      $("form :input").focus(function () {
        $(this)
          .closest(".input-wrap")
          .addClass("valid-group")
          .children("label.label-focus")
          .removeClass("label-focus")
          .addClass("label-blur");
      }),
      $('form input:not(input[type="tel"])').blur(function () {
        $(this)
          .parent()
          .closest("label.label-blur")
          .removeClass("label-blur")
          .addClass("label-focus");
      }),
      $(".label-focus").click(function () {
        $(this)
          .closest(".input-wrap")
          .addClass("valid-group")
          .children("label.label-focus")
          .removeClass("label-focus")
          .addClass("label-blur");
      }),
      $("#mktFrmSubmit").on("click", function () {
        $(this).parent().parent().parent().addClass("valid-group");
      }),
      $("form label").click(function () {
        $(this).parent().closest("input").focus();
      }),
      $(".smheight").matchHeight(),
      $(".smheight .story_content").matchHeight(),
      $(".l-list-two-col .box-container").matchHeight(),
      $(".tab-detail .l-list-three-col li").matchHeight();
    var e = $("#secondary-nav"),
      t = $(".last-line"),
      i = $("#page-nav .l-site-width"),
      s = $(".nth-search"),
      o = $("#main-nav");
    function n() {
      $(window).width() < 840
        ? (t.append(e), o.prepend(s))
        : (i.append(e), t.before(s));
    }
    $("header").append(
      '<div class="wheel-toggle btn-anim"><a href="#wheel-mobile" class="block" tabindex="-1"><span>+</span></a></div>'
    ),
      n(),
      $(window).resize(function () {
        n();
      });
  }),
  $(function () {
    $(".slick-dots button").wrapInner("<span></span>");
  }),
  $(function () {
    var e = $(
        ".table-body.rev-table.l-list-two-col.text-white > li:first-child > p"
      ).html(),
      t = $(
        ".table-body.rev-table.l-list-two-col.text-white > li:last-child > p"
      ).html(),
      i = !1;
    function s() {
      !i &&
        $(window).width() < 840 &&
        ($(".table-body.rev-table.bg-ffffff > li:first-child ").prepend(
          '<p class="desktop-hide">' + e + "</p>"
        ),
        $(".table-body.rev-table.bg-ffffff > li:last-child").prepend(
          '<p class="desktop-hide">' + t + "</p>"
        ),
        (i = !0));
    }
    $(window).resize(s), s();
  });
$(document).ready(function () {
  $(".accordion-toggle").removeClass("accordion-open");
  if ($(window).width() <= 840) {
    $(".accordion").attr({ role: "tablist", multiselectable: "true" });
    $(".accordion-content").attr("id", function (IDcount) {
      return "panel-" + IDcount;
    });
    $(".accordion-content").attr("aria-labelledby", function (IDcount) {
      return "control-panel-" + IDcount;
    });
    $(".accordion-content").attr("aria-hidden", "true");
    $(".accordion .accordion-content").attr("role", "tabpanel");
    $(".accordion-toggle").each(function (i) {
      $target = $(this).children(".accordion-content")[0].id;
      $(this)
        .attr("aria-expanded", "false")
        .attr("aria-controls", $target)
        .attr("id", "control-" + $target)
        .removeClass("accordion-open");
    });
    $(".dropdown-toggle").click(function (e) {
      e.preventDefault();
      if (
        $(this).parent(".accordion-toggle").attr("aria-expanded") == "false"
      ) {
        $(this)
          .parent()
          .parent(".accordion")
          .find(".accordion-toggle")
          .not(this)
          .attr("aria-expanded", false)
          .removeClass("accordion-open")
          .children(".accordion-content")
          .attr("aria-hidden", "true")
          .slideUp(200);
        $(this)
          .parent(".accordion-toggle")
          .attr("aria-expanded", true)
          .removeClass("accordion-open")
          .addClass("accordion-open")
          .children(".accordion-content")
          .slideToggle(200);
      } else {
        $(this)
          .parent(".accordion-toggle")
          .attr("aria-expanded", false)
          .removeClass("accordion-open")
          .children(".accordion-content")
          .slideUp(200)
          .attr("aria-hidden", "true");
      }
      return false;
    });
  }
});
