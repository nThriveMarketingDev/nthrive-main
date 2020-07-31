!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? a(require("jquery"))
    : a(jQuery);
})(function (a) {
  function b(a) {
    return h.raw ? a : encodeURIComponent(a);
  }
  function c(a) {
    return h.raw ? a : decodeURIComponent(a);
  }
  function d(a) {
    return b(h.json ? JSON.stringify(a) : String(a));
  }
  function e(a) {
    0 === a.indexOf('"') &&
      (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
    try {
      return (
        (a = decodeURIComponent(a.replace(g, " "))), h.json ? JSON.parse(a) : a
      );
    } catch (b) {}
  }
  function f(b, c) {
    var d = h.raw ? b : e(b);
    return a.isFunction(c) ? c(d) : d;
  }
  var g = /\+/g,
    h = (a.cookie = function (e, g, i) {
      if (void 0 !== g && !a.isFunction(g)) {
        if (((i = a.extend({}, h.defaults, i)), "number" == typeof i.expires)) {
          var j = i.expires,
            k = (i.expires = new Date());
          k.setTime(+k + 864e5 * j);
        }
        return (document.cookie = [
          b(e),
          "=",
          d(g),
          i.expires ? "; expires=" + i.expires.toUTCString() : "",
          i.path ? "; path=" + i.path : "",
          i.domain ? "; domain=" + i.domain : "",
          i.secure ? "; secure" : "",
        ].join(""));
      }
      for (
        var l = e ? void 0 : {},
          m = document.cookie ? document.cookie.split("; ") : [],
          n = 0,
          o = m.length;
        o > n;
        n++
      ) {
        var p = m[n].split("="),
          q = c(p.shift()),
          r = p.join("=");
        if (e && e === q) {
          l = f(r, g);
          break;
        }
        e || void 0 === (r = f(r)) || (l[q] = r);
      }
      return l;
    });
  (h.defaults = {}),
    (a.removeCookie = function (b, c) {
      return void 0 === a.cookie(b)
        ? !1
        : (a.cookie(b, "", a.extend({}, c, { expires: -1 })), !a.cookie(b));
    });
});
$(".accept-close").click(function () {
  $("body").addClass("notification-close");
  $.cookie("visited", "yes", { expires: 7 });
});
$(document).ready(function () {
  $('.first:has(".panel-wrap")').on("keyup click", function (e) {
    if (e.keyCode === 9) {
      $(this).children("a").addClass("open").attr("aria-expanded", true);
      $(".panel-wrap").removeClass("open");
      $(this)
        .children(".panel-wrap")
        .addClass("open")
        .attr("aria-expanded", true)
        .attr("aria-hidden", false);
    }
  });
  $(".first")
    .not(':has(".panel-wrap")')
    .on("keyup not click", function (e) {
      if (e.keyCode === 9) {
        $(this).children("a").addClass("open").attr("aria-expanded", true);
        $(".panel-wrap").removeClass("open");
        $(this)
          .children(".panel-wrap")
          .addClass("open")
          .attr("aria-expanded", true)
          .attr("aria-hidden", false);
      }
    });
  $boxMove = $(".news-box > a, .webinar-wrap a");
  $boxes = ".news-box, .webinar-wrap";
  $boxMove.hover(
    function () {
      $(this).closest($boxes).addClass("hover-move");
    },
    function () {
      $(this).closest($boxes).removeClass("hover-move");
    }
  );
  var visited = $.cookie("visited");
  if (visited == "yes") {
    $("body").removeClass("notification-close").addClass("notification-close");
    return false;
  } else {
    $("body").removeClass("notification-close");
  }
  $.fn.capitalize = function () {
    $.each(this, function () {
      var split = this.value.split(" ");
      for (var i = 0, len = split.length; i < len; i++) {
        split[i] =
          split[i].charAt(0).toUpperCase() + split[i].slice(1).toLowerCase();
      }
      this.value = split.join(" ");
    });
    return this;
  };
  $(".capitalize")
    .on("keyup", function () {
      $(this).capitalize();
    })
    .capitalize();
  $(".country").click(function () {
    $dialCode = $(".highlight").data("country-code");
    console.log($dialCode);
    $(".intl-tel-input")
      .removeClass("dial-us")
      .removeClass("dial-" + $dialCode)
      .addClass("dial-" + $dialCode);
  });
  if ($(".dial-us input[type='tel']").length) {
    $(".dial-us input[type='tel']")
      .attr("onkeydown", "javascript:backspacerDOWN(this,event);")
      .attr("onkeyup", "javascript:backspacerUP(this,event);");
  }
  $.validator.addMethod(
    "alphabetFormat",
    function (value, element) {
      return this.optional(element) || /^[a-z\d\-'.\s]+$/i.test(value);
    },
    "No special characters, do not use all caps. (i.e. John)."
  );
  $.validator.addMethod(
    "hasLowercase",
    function (value, element) {
      if (this.optional(element)) {
        return true;
      }
      return /[a-z]/.test(value);
    },
    "Please do not use all caps."
  );
  $.validator.addMethod(
    "notEqual",
    function (value, element, options) {
      var elems = $(element).parents("form").find(options[0]);
      var valueToCompare = value;
      var matchesFound = 0;
      jQuery.each(elems, function () {
        thisVal = $(this).val();
        if (thisVal == valueToCompare) {
          matchesFound++;
        }
      });
      if (this.optional(element) || matchesFound <= 1) {
        return true;
      } else {
      }
    },
    "Please enter a Unique Value."
  );
  $("#sales-question").validate({
    rules: {
      first_name: {
        required: true,
        minlength: 2,
        alphabetFormat: true,
        hasLowercase: true,
        notEqual: [".std-input3"],
      },
      last_name: {
        required: true,
        minlength: 2,
        alphabetFormat: true,
        hasLowercase: true,
        notEqual: [".std-input3"],
      },
      company: { required: false, alphabetFormat: true, hasLowercase: true },
      job_title: { required: false, hasLowercase: true },
      phone: { required: true, minlength: 7 },
      email: { required: !0, email: !0 },
      State: { required: true },
      permission_received: { required: true },
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
        minlength: "Your phone number must consist of at least 7 characters",
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
});
$(window).load(function () {
  var li = $(".left-column-wrap > div");
  var likeySelected;
  $(window).keydown(function (e) {
    if (e.which === 40) {
      if (likeySelected) {
        likeySelected.removeClass("key-selected");
        next = likeySelected.next();
        if (next.length > 0) {
          likeySelected = next.addClass("key-selected");
        } else {
          likeySelected = li.eq(0).addClass("key-selected");
        }
      } else {
        likeySelected = li.eq(0).addClass("key-selected");
      }
    } else if (e.which === 38) {
      if (likeySelected) {
        likeySelected.removeClass("key-selected");
        next = likeySelected.prev();
        if (next.length > 0) {
          likeySelected = next.addClass("key-selected");
        } else {
          likeySelected = li.last().addClass("key-selected");
        }
      } else {
        likeySelected = li.last().addClass("key-selected");
      }
    }
  });
});
$(document).ready(function () {
  $("#subscribe-form").validate({
    rules: { email: { required: !0, email: !0 } },
    messages: { email: { required: "Please enter a valid email address" } },
  });
  $("#subscribe-form :input").focus(function () {
    $(this)
      .parent()
      .addClass("valid-group")
      .children("label.label-focus")
      .removeClass("label-focus")
      .addClass("label-blur");
  });
  if (
    window.location.href.indexOf("b309b5f2-3dd0-40b1-92c0-c0c605ff664e") > -1
  ) {
    $("#subscribe-form").addClass("hide");
    $(".thank-you").removeClass("hide");
    $("html, body").animate(
      { scrollTop: $("#popup-fixed").offset().top - 150 },
      "fast"
    );
  }
  $("#subscribe-form").submit(function () {
    $.ajax({
      type: "POST",
      url: "http://info.nthrive.com/l/311601/2017-06-14/d34n",
      data: { email: $("input[name=email]#email-1").val() },
      success: function () {
        $("#subscribe-form").addClass("hide");
        $(".thank-you").removeClass("hide");
      },
    });
  });
  $("#subscribe-form-body").validate({
    rules: { email: { required: !0, email: !0 } },
    messages: { email: { required: "Please enter a valid email address" } },
  });
  $("#subscribe-form-body :input").focus(function () {
    $(this)
      .parent()
      .addClass("valid-group")
      .children("label.label-focus")
      .removeClass("label-focus")
      .addClass("label-blur");
  });
  if (
    window.location.href.indexOf(
      "WcoFormId=e03e8096-9bb4-4cf4-9006-1d86466b63a2"
    ) > -1
  ) {
    $("#subscribe-form-body").addClass("hide");
    $("#thank-you-body").removeClass("hide");
    $("html, body").animate(
      { scrollTop: $("#subscribe-body-anchor").offset().top - 150 },
      "fast"
    );
  }
  $("#subscribe-form-body").submit(function () {
    $.ajax({
      type: "POST",
      url: "http://info.nthrive.com/l/311601/2017-06-14/d34n",
      data: { email: $("input[name=email]#email-2").val() },
      success: function () {
        $("#subscribe-form-body").addClass("hide");
        $(".thank-you-body").removeClass("hide");
      },
    });
  });
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
});
(function ($, window, document) {
  "use strict";
  var pluginName = "accessibleMegaMenu",
    defaults = {
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
      openOnMouseover: false,
    },
    Keyboard = {
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
    clearTimeout = window.clearTimeout,
    setTimeout = window.setTimeout,
    isOpera = window.opera && window.opera.toString() === "[object Opera]";
  function AccessibleMegaMenu(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.mouseTimeoutID = null;
    this.focusTimeoutID = null;
    this.mouseFocused = false;
    this.justFocused = false;
    this.init();
  }
  AccessibleMegaMenu.prototype = (function () {
    var uuid = 0,
      keydownTimeoutDuration = 1000,
      keydownSearchString = "",
      isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints,
      _getPlugin,
      _addUniqueId,
      _togglePanel,
      _clickHandler,
      _touchmoveHandler,
      _clickOutsideHandler,
      _DOMAttrModifiedHandler,
      _focusInHandler,
      _focusOutHandler,
      _keyDownHandler,
      _mouseDownHandler,
      _mouseOverHandler,
      _mouseOutHandler,
      _clickToggleHandler,
      _toggleExpandedEventHandlers,
      _addEventHandlers,
      _removeEventHandlers;
    _getPlugin = function (element) {
      return $(element)
        .closest(":data(plugin_" + pluginName + ")")
        .data("plugin_" + pluginName);
    };
    _addUniqueId = function (element) {
      element = $(element);
      var settings = this.settings;
      if (!element.attr("id")) {
        element.attr(
          "id",
          settings.uuidPrefix + "-" + new Date().getTime() + "-" + ++uuid
        );
      }
    };
    _togglePanel = function (event, hide) {
      var target = $(event.target),
        that = this,
        settings = this.settings,
        menu = this.menu,
        topli = target.closest("." + settings.topNavItemClass),
        panel = target.hasClass(settings.panelClass)
          ? target
          : target.closest("." + settings.panelClass),
        newfocus;
      _toggleExpandedEventHandlers.call(this, true);
      if (hide) {
        topli = menu
          .find(
            "." +
              settings.topNavItemClass +
              " ." +
              settings.openClass +
              ":first"
          )
          .closest("." + settings.topNavItemClass);
        if (
          !(
            topli.is(event.relatedTarget) ||
            topli.has(event.relatedTarget).length > 0
          )
        ) {
          if (
            (event.type === "mouseout" || event.type === "focusout") &&
            topli.has(document.activeElement).length > 0
          ) {
            return;
          }
          topli
            .find("[aria-expanded]")
            .attr("aria-expanded", "false")
            .removeClass(settings.openClass)
            .filter("." + settings.panelClass)
            .attr("aria-hidden", "true");
          if (
            (event.type === "keydown" && event.keyCode === Keyboard.ESCAPE) ||
            event.type === "DOMAttrModified"
          ) {
            newfocus = topli.find(":tabbable:first");
            setTimeout(function () {
              menu
                .find("[aria-expanded]." + that.settings.panelClass)
                .off("DOMAttrModified.accessible-megamenu");
              newfocus.focus();
              that.justFocused = false;
            }, 99);
          }
        } else if (topli.length === 0) {
          menu
            .find("[aria-expanded=true]")
            .attr("aria-expanded", "false")
            .removeClass(settings.openClass)
            .filter("." + settings.panelClass)
            .attr("aria-hidden", "true");
        }
      } else {
        clearTimeout(that.focusTimeoutID);
        topli
          .siblings()
          .find("[aria-expanded]")
          .attr("aria-expanded", "false")
          .removeClass(settings.openClass)
          .filter("." + settings.panelClass)
          .attr("aria-hidden", "true");
        topli
          .find("[aria-expanded]")
          .attr("aria-expanded", "true")
          .addClass(settings.openClass)
          .filter("." + settings.panelClass)
          .attr("aria-hidden", "false");
        var pageScrollPosition = $("html")[0].scrollTop;
        var $openParent = $(
          "." + settings.panelClass + "." + settings.openClass
        ).parent();
        if ($openParent.length) {
          var openPanelTopPosition = $openParent.offset().top;
        }
        if (pageScrollPosition > openPanelTopPosition) {
          $("html")[0].scrollTop = openPanelTopPosition;
        }
        if (
          event.type === "mouseover" &&
          target.is(":tabbable") &&
          topli.length === 1 &&
          panel.length === 0 &&
          menu.has(document.activeElement).length > 0
        ) {
          target.focus();
          that.justFocused = false;
        }
        _toggleExpandedEventHandlers.call(that);
      }
    };
    _clickHandler = function (event) {
      var target = $(event.target).closest(":tabbable"),
        topli = target.closest("." + this.settings.topNavItemClass),
        panel = target.closest("." + this.settings.panelClass);
      if (
        topli.length === 1 &&
        panel.length === 0 &&
        topli.find("." + this.settings.panelClass).length === 1
      ) {
        if (!target.hasClass(this.settings.openClass)) {
          event.preventDefault();
          event.stopPropagation();
          _togglePanel.call(this, event);
          this.justFocused = false;
        } else {
          if (this.justFocused) {
            event.preventDefault();
            event.stopPropagation();
            this.justFocused = false;
          } else if (isTouch || (!isTouch && !this.settings.openOnMouseover)) {
            event.preventDefault();
            event.stopPropagation();
            _togglePanel.call(
              this,
              event,
              target.hasClass(this.settings.openClass)
            );
          }
        }
      }
    };
    _touchmoveHandler = function () {
      this.justMoved = true;
    };
    _clickOutsideHandler = function (event) {
      if ($(event.target).closest(this.menu).length === 0) {
        event.preventDefault();
        event.stopPropagation();
        _togglePanel.call(this, event, true);
      }
    };
    _DOMAttrModifiedHandler = function (event) {
      if (
        event.originalEvent.attrName === "aria-expanded" &&
        event.originalEvent.newValue === "false" &&
        $(event.target).hasClass(this.settings.openClass)
      ) {
        event.preventDefault();
        event.stopPropagation();
        _togglePanel.call(this, event, true);
      }
    };
    _focusInHandler = function (event) {
      clearTimeout(this.focusTimeoutID);
      var target = $(event.target),
        panel = target.closest("." + this.settings.panelClass);
      target.addClass(this.settings.focusClass);
      this.justFocused =
        !this.mouseFocused ||
        (!this.settings.openOnMouseover && this.mouseFocused);
      this.mouseFocused = false;
      if (
        this.justFocused &&
        this.panels.not(panel).filter("." + this.settings.openClass).length
      ) {
        _togglePanel.call(this, event);
      }
    };
    _focusOutHandler = function (event) {
      this.justFocused = false;
      var that = this,
        target = $(event.target),
        topli = target.closest("." + this.settings.topNavItemClass);
      target.removeClass(this.settings.focusClass);
      if (window.cvox) {
        that.focusTimeoutID = setTimeout(function () {
          window.cvox.Api.getCurrentNode(function (node) {
            if (topli.has(node).length) {
              clearTimeout(that.focusTimeoutID);
            } else {
              that.focusTimeoutID = setTimeout(
                function (scope, event, hide) {
                  _togglePanel.call(scope, event, hide);
                },
                275,
                that,
                event,
                true
              );
            }
          });
        }, 25);
      } else {
        that.focusTimeoutID = setTimeout(function () {
          if (that.mouseFocused && event.relatedTarget === null) {
            return;
          }
          _togglePanel.call(that, event, true);
        }, 300);
      }
    };
    _keyDownHandler = function (event) {
      var that =
          this.constructor === AccessibleMegaMenu ? this : _getPlugin(this),
        settings = that.settings,
        target = $(
          $(this).is("." + settings.hoverClass + ":tabbable")
            ? this
            : event.target
        ),
        menu = that.menu,
        topnavitems = that.topnavitems,
        topli = target.closest("." + settings.topNavItemClass),
        tabbables = menu.find(":tabbable"),
        panel = target.hasClass(settings.panelClass)
          ? target
          : target.closest("." + settings.panelClass),
        panelGroups = panel.find("." + settings.panelGroupClass),
        currentPanelGroup = target.closest("." + settings.panelGroupClass),
        next,
        keycode = event.keyCode || event.which,
        start,
        i,
        o,
        label,
        found = false,
        newString = Keyboard.keyMap[event.keyCode] || "",
        regex,
        isTopNavItem = topli.length === 1 && panel.length === 0;
      if (
        target.is("input:focus, select:focus, textarea:focus, button:focus")
      ) {
        return;
      }
      if (target.is("." + settings.hoverClass + ":tabbable")) {
        $("html").off("keydown.accessible-megamenu");
      }
      switch (keycode) {
        case Keyboard.ESCAPE:
          this.mouseFocused = false;
          _togglePanel.call(that, event, true);
          break;
        case Keyboard.DOWN:
          event.preventDefault();
          this.mouseFocused = false;
          if (isTopNavItem) {
            _togglePanel.call(that, event);
            found =
              topli.find("." + settings.panelClass + " :tabbable:first").focus()
                .length === 1;
          } else {
            found =
              tabbables
                .filter(":gt(" + tabbables.index(target) + "):first")
                .focus().length === 1;
          }
          if (!found && isOpera && (event.ctrlKey || event.metaKey)) {
            tabbables = $(":tabbable");
            i = tabbables.index(target);
            found =
              $(
                ":tabbable:gt(" + $(":tabbable").index(target) + "):first"
              ).focus().length === 1;
          }
          break;
        case Keyboard.UP:
          event.preventDefault();
          this.mouseFocused = false;
          if (isTopNavItem && target.hasClass(settings.openClass)) {
            _togglePanel.call(that, event, true);
            next = topnavitems.filter(
              ":lt(" + topnavitems.index(topli) + "):last"
            );
            if (next.children("." + settings.panelClass).length) {
              found =
                next
                  .find("[aria-expanded]")
                  .attr("aria-expanded", "true")
                  .addClass(settings.openClass)
                  .filter("." + settings.panelClass)
                  .attr("aria-hidden", "false")
                  .find(":tabbable:last")
                  .focus() === 1;
            }
          } else if (!isTopNavItem) {
            found =
              tabbables
                .filter(":lt(" + tabbables.index(target) + "):last")
                .focus().length === 1;
          }
          if (!found && isOpera && (event.ctrlKey || event.metaKey)) {
            tabbables = $(":tabbable");
            i = tabbables.index(target);
            found =
              $(
                ":tabbable:lt(" + $(":tabbable").index(target) + "):first"
              ).focus().length === 1;
          }
          break;
        case Keyboard.RIGHT:
          event.preventDefault();
          this.mouseFocused = false;
          if (isTopNavItem) {
            found =
              topnavitems
                .filter(":gt(" + topnavitems.index(topli) + "):first")
                .find(":tabbable:first")
                .focus().length === 1;
          } else {
            if (panelGroups.length && currentPanelGroup.length) {
              found =
                panelGroups
                  .filter(
                    ":gt(" + panelGroups.index(currentPanelGroup) + "):first"
                  )
                  .find(":tabbable:first")
                  .focus().length === 1;
            }
            if (!found) {
              found = topli.find(":tabbable:first").focus().length === 1;
            }
          }
          break;
        case Keyboard.LEFT:
          event.preventDefault();
          this.mouseFocused = false;
          if (isTopNavItem) {
            found =
              topnavitems
                .filter(":lt(" + topnavitems.index(topli) + "):last")
                .find(":tabbable:first")
                .focus().length === 1;
          } else {
            if (panelGroups.length && currentPanelGroup.length) {
              found =
                panelGroups
                  .filter(
                    ":lt(" + panelGroups.index(currentPanelGroup) + "):last"
                  )
                  .find(":tabbable:first")
                  .focus().length === 1;
            }
            if (!found) {
              found = topli.find(":tabbable:first").focus().length === 1;
            }
          }
          break;
        case Keyboard.TAB:
          this.mouseFocused = false;
          i = tabbables.index(target);
          if (
            event.shiftKey &&
            isTopNavItem &&
            target.hasClass(settings.openClass)
          ) {
            _togglePanel.call(that, event, true);
            next = topnavitems.filter(
              ":lt(" + topnavitems.index(topli) + "):last"
            );
            if (next.children("." + settings.panelClass).length) {
              found = next
                .children()
                .attr("aria-expanded", "true")
                .addClass(settings.openClass)
                .filter("." + settings.panelClass)
                .attr("aria-hidden", "false")
                .find(":tabbable:last")
                .focus();
            }
          } else if (event.shiftKey && i > 0) {
            found =
              tabbables.filter(":lt(" + i + "):last").focus().length === 1;
          } else if (!event.shiftKey && i < tabbables.length - 1) {
            found =
              tabbables.filter(":gt(" + i + "):first").focus().length === 1;
          } else if (isOpera) {
            tabbables = $(":tabbable");
            i = tabbables.index(target);
            if (event.shiftKey) {
              found =
                $(
                  ":tabbable:lt(" + $(":tabbable").index(target) + "):last"
                ).focus().length === 1;
            } else {
              found =
                $(
                  ":tabbable:gt(" + $(":tabbable").index(target) + "):first"
                ).focus().length === 1;
            }
          }
          if (found) {
            event.preventDefault();
          }
          break;
        case Keyboard.SPACE:
        case Keyboard.ENTER:
          if (isTopNavItem) {
            event.preventDefault();
            _clickHandler.call(that, event);
          } else {
            return true;
          }
          break;
        default:
          clearTimeout(this.keydownTimeoutID);
          keydownSearchString +=
            newString !== keydownSearchString ? newString : "";
          if (keydownSearchString.length === 0) {
            return;
          }
          this.keydownTimeoutID = setTimeout(function () {
            keydownSearchString = "";
          }, keydownTimeoutDuration);
          if (isTopNavItem && !target.hasClass(settings.openClass)) {
            tabbables = tabbables.filter(
              ":not(." + settings.panelClass + " :tabbable)"
            );
          } else {
            tabbables = topli.find(":tabbable");
          }
          if (event.shiftKey) {
            tabbables = $(tabbables.get().reverse());
          }
          for (i = 0; i < tabbables.length; i++) {
            o = tabbables.eq(i);
            if (o.is(target)) {
              start = keydownSearchString.length === 1 ? i + 1 : i;
              break;
            }
          }
          regex = new RegExp(
            "^" +
              keydownSearchString.replace(
                /[\-\[\]{}()*+?.,\\\^$|#\s]/g,
                "\\$&"
              ),
            "i"
          );
          for (i = start; i < tabbables.length; i++) {
            o = tabbables.eq(i);
            label = $.trim(o.text());
            if (regex.test(label)) {
              found = true;
              o.focus();
              break;
            }
          }
          if (!found) {
            for (i = 0; i < start; i++) {
              o = tabbables.eq(i);
              label = $.trim(o.text());
              if (regex.test(label)) {
                o.focus();
                break;
              }
            }
          }
          break;
      }
      that.justFocused = false;
    };
    _mouseDownHandler = function (event) {
      if (
        $(event.target).closest(this.settings.panelClass) ||
        $(event.target).closest(":focusable").length
      ) {
        this.mouseFocused = true;
        if ($(event.target).closest(this.settings.menuClass)) {
          $("html").on(
            "keydown.accessible-megamenu",
            $.proxy(_keyDownHandler, event.target)
          );
        }
      }
      clearTimeout(this.mouseTimeoutID);
      this.mouseTimeoutID = setTimeout(function () {
        clearTimeout(this.focusTimeoutID);
      }, 1);
    };
    _mouseOverHandler = function (event) {
      clearTimeout(this.mouseTimeoutID);
      var that = this;
      if (!that.settings.openOnMouseover) {
        return;
      }
      this.mouseTimeoutID = setTimeout(function () {
        $(event.target).addClass(that.settings.hoverClass);
        _togglePanel.call(that, event);
        if ($(event.target).closest(that.settings.menuClass)) {
          $("html").on(
            "keydown.accessible-megamenu",
            $.proxy(_keyDownHandler, event.target)
          );
        }
      }, this.settings.openDelay);
    };
    _mouseOutHandler = function (event) {
      clearTimeout(this.mouseTimeoutID);
      var that = this;
      if (!that.settings.openOnMouseover) {
        return;
      }
      $(event.target).removeClass(that.settings.hoverClass);
      that.mouseTimeoutID = setTimeout(function () {
        _togglePanel.call(that, event, true);
      }, this.settings.closeDelay);
      if ($(event.target).is(":tabbable")) {
        $("html").off("keydown.accessible-megamenu");
      }
    };
    _clickToggleHandler = function () {
      var isExpanded = this.toggleButton.attr("aria-expanded") === "true";
      this.toggleButton.attr({
        "aria-expanded": !isExpanded,
        "aria-pressed": !isExpanded,
      });
    };
    _toggleExpandedEventHandlers = function (hide) {
      var menu = this.menu;
      if (hide) {
        $("html").off(
          "mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu"
        );
        menu
          .find("[aria-expanded]." + this.settings.panelClass)
          .off("DOMAttrModified.accessible-megamenu");
      } else {
        $("html").on(
          "mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu",
          $.proxy(_clickOutsideHandler, this)
        );
        menu
          .find("[aria-expanded=true]." + this.settings.panelClass)
          .on(
            "DOMAttrModified.accessible-megamenu",
            $.proxy(_DOMAttrModifiedHandler, this)
          );
      }
    };
    _addEventHandlers = function () {
      var menu = this.menu,
        toggleButton = this.toggleButton;
      menu
        .on(
          "focusin.accessible-megamenu",
          ":focusable, ." + this.settings.panelClass,
          $.proxy(_focusInHandler, this)
        )
        .on(
          "focusout.accessible-megamenu",
          ":focusable, ." + this.settings.panelClass,
          $.proxy(_focusOutHandler, this)
        )
        .on("keydown.accessible-megamenu", $.proxy(_keyDownHandler, this))
        .on("mouseover.accessible-megamenu", $.proxy(_mouseOverHandler, this))
        .on("mouseout.accessible-megamenu", $.proxy(_mouseOutHandler, this))
        .on("mousedown.accessible-megamenu", $.proxy(_mouseDownHandler, this))
        .on("click.accessible-megamenu", $.proxy(_clickHandler, this));
      toggleButton.on(
        "click.accessible-megamenu",
        $.proxy(_clickToggleHandler, this)
      );
      if (isTouch) {
        menu.on(
          "touchmove.accessible-megamenu",
          $.proxy(_touchmoveHandler, this)
        );
      }
      if ($(document.activeElement).closest(menu).length) {
        $(document.activeElement).trigger("focusin.accessible-megamenu");
      }
    };
    _removeEventHandlers = function () {
      var menu = this.menu,
        toggleButton = this.toggleButton;
      menu.off(".accessible-megamenu");
      if (
        menu.find("[aria-expanded=true]." + this.settings.panelClass).length
      ) {
        _toggleExpandedEventHandlers.call(this, true);
      }
      toggleButton.off(".accessible-megamenu");
    };
    return {
      constructor: AccessibleMegaMenu,
      init: function () {
        var settings = this.settings,
          nav = $(this.element),
          menu = nav.children("ol,ul").first(),
          topnavitems = menu.children(),
          toggleButton = nav.children("button").first();
        this.start(settings, nav, menu, topnavitems, toggleButton);
      },
      start: function (settings, nav, menu, topnavitems, toggleButton) {
        var that = this;
        this.settings = settings;
        this.menu = menu;
        this.topnavitems = topnavitems;
        this.toggleButton = toggleButton;
        nav.attr("role", "navigation");
        _addUniqueId.call(that, menu);
        menu.addClass(settings.menuClass);
        menu.addClass(["js", settings.menuClass].join("-"));
        topnavitems.each(function (i, topnavitem) {
          var topnavitemlink, topnavitempanel;
          topnavitem = $(topnavitem);
          topnavitem.addClass(settings.topNavItemClass);
          topnavitemlink = topnavitem.find(":tabbable:first");
          topnavitempanel = topnavitem.children(":not(:tabbable):last");
          _addUniqueId.call(that, topnavitemlink);
          if (topnavitempanel.length) {
            _addUniqueId.call(that, topnavitempanel);
            topnavitemlink.attr({
              role: "button",
              "aria-controls": topnavitempanel.attr("id"),
              "aria-expanded": false,
              tabindex: 0,
            });
            topnavitempanel
              .attr({
                role: "region",
                "aria-expanded": false,
                "aria-hidden": true,
              })
              .addClass(settings.panelClass)
              .not("[aria-labelledby]")
              .attr("aria-labelledby", topnavitemlink.attr("id"));
          }
        });
        this.panels = menu.find("." + settings.panelClass);
        menu.find("hr").attr("role", "separator");
        toggleButton.addClass(settings.toggleButtonClass);
        toggleButton.attr({
          "aria-expanded": false,
          "aria-pressed": false,
          "aria-controls": menu.attr("id"),
        });
        _addEventHandlers.call(this);
      },
      destroy: function () {
        this.menu.removeClass(["js", this.settings.menuClass].join("-"));
        _removeEventHandlers.call(this, true);
      },
      getDefaults: function () {
        return this._defaults;
      },
      getOption: function (opt) {
        return this.settings[opt];
      },
      getAllOptions: function () {
        return this.settings;
      },
      setOption: function (opt, value, reinitialize) {
        this.settings[opt] = value;
        if (reinitialize) {
          this.init();
        }
      },
    };
  })();
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      var pluginInstance = $.data(this, "plugin_" + pluginName);
      if (!pluginInstance) {
        $.data(
          this,
          "plugin_" + pluginName,
          new $.fn[pluginName].AccessibleMegaMenu(this, options)
        );
      } else if (typeof pluginInstance[options] === "function") {
        pluginInstance[options].apply(
          pluginInstance,
          Array.prototype.slice.call(arguments, 1)
        );
      }
    });
  };
  $.fn[pluginName].AccessibleMegaMenu = AccessibleMegaMenu;
  function visible(element) {
    return (
      $.expr.filters.visible(element) &&
      !$(element)
        .parents()
        .addBack()
        .filter(function () {
          return $.css(this, "visibility") === "hidden";
        }).length
    );
  }
  function focusable(element, isTabIndexNotNaN) {
    var map,
      mapName,
      img,
      nodeName = element.nodeName.toLowerCase();
    if ("area" === nodeName) {
      map = element.parentNode;
      mapName = map.name;
      if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
        return false;
      }
      img = $("img[usemap=#" + mapName + "]")[0];
      return !!img && visible(img);
    }
    return (
      (/input|select|textarea|button|object/.test(nodeName)
        ? !element.disabled
        : "a" === nodeName
        ? element.href || isTabIndexNotNaN
        : isTabIndexNotNaN) && visible(element)
    );
  }
  $.extend($.expr[":"], {
    data: $.expr.createPseudo
      ? $.expr.createPseudo(function (dataName) {
          return function (elem) {
            return !!$.data(elem, dataName);
          };
        })
      : function (elem, i, match) {
          return !!$.data(elem, match[3]);
        },
    focusable: function (element) {
      return focusable(element, !isNaN($.attr(element, "tabindex")));
    },
    tabbable: function (element) {
      var tabIndex = $.attr(element, "tabindex"),
        isTabIndexNaN = isNaN(tabIndex);
      return (
        (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
      );
    },
  });
})(jQuery, window, document);
if (jQuery) {
  (function ($) {
    "use strict";
    $(document).ready(function () {
      $(".nth-content").accessibleMegaMenu({
        uuidPrefix: "menu",
        menuClass: "menu",
        topNavItemClass: "nav-top-level",
        panelClass: "menu-panel",
        panelGroupClass: "menu-panel-group",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open",
        openOnMouseover: true,
      });
      setTimeout(function () {
        $("body").removeClass("init");
      }, 500);
    });
  })(jQuery);
}
if (window.addEventListener) {
  window.addEventListener(
    "hashchange",
    function (event) {
      var element = document.getElementById(location.hash.substring(1));
      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }
        element.focus();
      }
    },
    false
  );
} else {
  window.attachEvent(
    "hashchange",
    function (event) {
      var element = document.getElementById(location.hash.substring(1));
      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }
        element.focus();
      }
    },
    false
  );
}
$(document).ready(function () {
  if ($(window).width() < 840) {
    $("#main-nav a").on("click", function () {
      $("#nth-menu-switch").prop("checked", false);
    });
  }

  // Get the distance from the top of window
  var getOffsetTop = function (elem) {
    var distance = 0;
    // Loop up the DOM
    if (elem.offsetParent) {
      do {
        distance += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return distance < 0 ? 0 : distance;
  };

  if ($("#page-nav").length) {
    var top = $("#page-nav").offset().top;
  }

  $(window).scroll(function () {
    var y = $(this).scrollTop();
    if (window.location.href.indexOf("com/hub/") > -1) {
      if (y >= 100) {
        $("#page-nav").addClass("fixed");
        $(".logo-anim").addClass("move");
      } else {
        $("#page-nav").removeClass("fixed");
        $(".logo-anim").removeClass("move");
      }
    } else if (
      window.location.href.indexOf("com/eventslp/") > -1 ||
      window.location.href.indexOf("com/userforums/") > -1
    ) {
      var elem = document.getElementById("nav-target");
      var offset = getOffsetTop(elem);

      if (y >= offset) {
        $("#page-nav").addClass("fixed");
        $(".logo-anim").addClass("move");
      } else {
        $("#page-nav").removeClass("fixed");
        $(".logo-anim").removeClass("move");
      }
    } else {
      if (y >= 446) {
        $("#page-nav").addClass("fixed");
        $(".logo-anim").addClass("move");
      } else {
        $("#page-nav").removeClass("fixed");
        $(".logo-anim").removeClass("move");
      }
    }
  });
  $("a").on("keydown", function (e) {
    if (e.keyCode === 9) {
      $("body").addClass("tab");
    }
  });
  $("a").on("keyup", function (e) {
    if (e.keyCode === 9) {
      $("body").addClass("tab");
    }
  });
  $("button").on("keydown", function (e) {
    if (e.keyCode === 9) {
      $("body").addClass("tab");
    }
  });
  $("button").on("keyup", function (e) {
    if (e.keyCode === 9) {
      $("body").addClass("tab");
    }
  });
  $(".logo-wrap").prepend(
    '<div id="toggleMenu" role="button" aria-controls="main-nav"> <a href="#"><span class="icon-menu">&#9776;</span><span class="icon-menu-closed">X</span></a></div>'
  );
  $("#main-nav")
    .attr("aria-labelledby", "main-nav-label")
    .attr("role", "region");
  $('li.nav-top-level:has("div.panel-wrap")').on("keyup click", function (e) {
    if (e.keyCode === 9) {
      $(this).children("a").addClass("open").attr("aria-expanded", true);
      $("div.panel-wrap").removeClass("open");
      $(this)
        .children("div.panel-wrap")
        .addClass("open")
        .attr("aria-expanded", true)
        .attr("aria-hidden", false);
    }
  });
  $("li.nav-top-level")
    .not(':has("div.panel-wrap")')
    .on("keyup not click", function (e) {
      if (e.keyCode === 9) {
        $("div.panel-wrap").removeClass("open").attr("aria-expanded", false);
      }
    });
  $(document).on("keydown", function (e) {
    if (e.keyCode === 27) {
      $("div.panel-wrap").removeClass("open").attr("aria-expanded", false);
    }
  });
  $("html").removeClass("no-js");
  $("#toggleMenu").on("click", function () {
    $("body").toggleClass("m-open");
    $(".main-nav").attr("aria-expanded", function (i, attr) {
      return attr == "true" ? "false" : "true";
    });
    return false;
  });
  $(".nth-link-search").click(function (e) {
    $("#primary-nav").toggleClass("search-open");
    e.stopPropagation();
  });
  $("#nth-searchview").click(function (e) {
    e.stopPropagation();
  });
  $(document).click(function () {
    $("#primary-nav").removeClass("search-open");
  });
  $("#nth-searchview-close").click(function (e) {
    $("#primary-nav").removeClass("search-open");
  });
  $(".skip-nav").on("click", function () {
    if ($("#section-2").length) {
      $("#section-2").focus();
      $("#section-2").attr("tabindex", 1);
    } else if ($("#search-bar").length) {
      $("#search-bar").focus();
      $("#search-bar").attr("tabindex", 1);
    } else {
      $("article").focus();
      $("article").attr("tabindex", 1);
    }
  });
});
var num = $("#section-1").length > 0 ? $('[id^="section-"]').id : "";
$(".skip-to-main").attr("href", "#" + num);
$(document).ready(function () {
  if (location.href.toLowerCase().indexOf("/careers") != -1) {
    $(".comment-link").attr("href", "#popup-careers");
    $("footer").after(
      '<div class="popup popup-option popup-option-content l-clearfix" data-popup-id="popup-careers" role="dialog" aria-labelledby="popup3Title" aria-describedby="popup3Desc" > <img src="/_assets/images/icon/logo-gray.png" alt="nThrive Logo" class="popup-logo block"> <button data-popup-action="close" class="popup-close popup-option-btn-close l-align-right" aria-label="Close"></button><div class="popup-option-window-wrap" role="dialog" id="popup-option-window-wrap-1"><div class="form-full"><h2>Career Opportunity Questions</h2><p>To learn more about a career at nThrive, please visit the <a href="//www.nthrive.com/careers" class="text-7b214c" target="_parent">careers page</a>. For current nThrive career opportunities, please <a href="//careers-nthrive.icims.com/jobs/intro?hashed=-435713663&amp;mobile=false&amp;width=940&amp;height=500&amp;bga=true&amp;needsRedirect=false&amp;jan1offset=-300&amp;jun1offset=-240" class="text-7b214c" target="_blank" >search here</a>. For other general questions about career opportunites please contact us by email or phone here:</p><p><strong>Email</strong><br> <a href="mailto:careers@nthrive.com" class="text-7b214c" target="_blank" >careers@nthrive.com</a></p><p><strong>Telephone</strong><br> (866) 773-2973 x2</p></div></div></div>'
    );
  } else if (location.href.toLowerCase().indexOf("/product-login") != -1) {
    $(".comment-link").attr("href", "#popup-product");
    $("footer").after(
      '<div class="popup popup-option popup-option-content l-clearfix" data-popup-id="popup-product" role="dialog" aria-labelledby="popup4Title" aria-describedby="popup4Desc"> <img src="/_assets/images/icon/logo-gray.png" alt="nThrive Logo" class="popup-logo block"> <button data-popup-action="close" class="popup-close popup-option-btn-close l-align-right" aria-label="Close"></button><div class="popup-option-window-wrap" role="dialog" id="popup-option-window-wrap-2"><div class="form-full"><h2>Contact Client Support</h2><p class="text-00515B">Communication channels</p><p><strong>Online portal</strong><br> <a href="http://communities.medassets.com" class="text-7b214c" target="_blank" >https://communities.nThrive.com</a></p><p>Most efficient method for alerting nThrive to a non-critical issue or request.</p><p><strong>Telephone</strong><br> (800) 390-7459</p><p>Recommended method for alerting nThrive to critical or high severity issues that require rapid response and action.</p><p><strong>Working hours</strong><br> Standard support Monday to Friday, 6 a.m. ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ 6 p.m. CT</p><p><strong>Critical support</strong><br> Monday to Friday, 6 p.m. ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ 10 p.m. CT<br> Saturday, Sunday and holidays, 6 a.m. ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ 6 p.m. CT</p><p>These hours are applicable to clients located in the continental United States. For standard support hours outside the continental United States, please consult your maintenance or other support agreement with nThrive.</p></div></div></div>'
    );
  } else {
    $(".comment-link").attr("href", "#");
  }
});
$(".popup-option-overlay").click(function () {
  $("body").removeClass("no-scroll");
});
$(".comment-link").click(function () {
  $("body").addClass("no-scroll");
});
(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports !== "undefined") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  "use strict";
  var Slick = window.Slick || {};
  Slick = (function () {
    var instanceUid = 0;
    function Slick(element, settings) {
      var _ = this,
        dataSettings;
      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow:
          '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow:
          '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (slider, i) {
          return $(
            '<button type="button" data-role="none" role="button" tabindex="0" />'
          ).text(i + 1);
        },
        dots: false,
        dotsClass: "slick-dots",
        draggable: true,
        easing: "linear",
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: false,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000,
      };
      _.initials = {
        animating: false,
        dragging: false,
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
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false,
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = "hidden";
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = "visibilitychange";
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data("slick") || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;
      if (typeof document.mozHidden !== "undefined") {
        _.hidden = "mozHidden";
        _.visibilityChange = "mozvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        _.hidden = "webkitHidden";
        _.visibilityChange = "webkitvisibilitychange";
      }
      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++;
      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
      _.registerBreakpoints();
      _.init(true);
    }
    return Slick;
  })();
  Slick.prototype.activateADA = function () {
    var _ = this;
    _.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  };
  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (
    markup,
    index,
    addBefore
  ) {
    var _ = this;
    if (typeof index === "boolean") {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }
    _.unload();
    if (typeof index === "number") {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slides.each(function (index, element) {
      $(element).attr("data-slick-index", index);
    });
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.animateHeight = function () {
    var _ = this;
    if (
      _.options.slidesToShow === 1 &&
      _.options.adaptiveHeight === true &&
      _.options.vertical === false
    ) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({ height: targetHeight }, _.options.speed);
    }
  };
  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
      _ = this;
    _.animateHeight();
    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }
    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate(
          { left: targetLeft },
          _.options.speed,
          _.options.easing,
          callback
        );
      } else {
        _.$slideTrack.animate(
          { top: targetLeft },
          _.options.speed,
          _.options.easing,
          callback
        );
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }
        $({ animStart: _.currentLeft }).animate(
          { animStart: targetLeft },
          {
            duration: _.options.speed,
            easing: _.options.easing,
            step: function (now) {
              now = Math.ceil(now);
              if (_.options.vertical === false) {
                animProps[_.animType] = "translate(" + now + "px, 0px)";
                _.$slideTrack.css(animProps);
              } else {
                animProps[_.animType] = "translate(0px," + now + "px)";
                _.$slideTrack.css(animProps);
              }
            },
            complete: function () {
              if (callback) {
                callback.call();
              }
            },
          }
        );
      } else {
        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);
        if (_.options.vertical === false) {
          animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)";
        } else {
          animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)";
        }
        _.$slideTrack.css(animProps);
        if (callback) {
          setTimeout(function () {
            _.disableTransition();
            callback.call();
          }, _.options.speed);
        }
      }
    }
  };
  Slick.prototype.getNavTarget = function () {
    var _ = this,
      asNavFor = _.options.asNavFor;
    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }
    return asNavFor;
  };
  Slick.prototype.asNavFor = function (index) {
    var _ = this,
      asNavFor = _.getNavTarget();
    if (asNavFor !== null && typeof asNavFor === "object") {
      asNavFor.each(function () {
        var target = $(this).slick("getSlick");
        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };
  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
      transition = {};
    if (_.options.fade === false) {
      transition[_.transitionType] =
        _.transformType + " " + _.options.speed + "ms " + _.options.cssEase;
    } else {
      transition[_.transitionType] =
        "opacity " + _.options.speed + "ms " + _.options.cssEase;
    }
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.autoPlay = function () {
    var _ = this;
    _.autoPlayClear();
    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(
        _.autoPlayIterator,
        _.options.autoplaySpeed
      );
    }
  };
  Slick.prototype.autoPlayClear = function () {
    var _ = this;
    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };
  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
      slideTo = _.currentSlide + _.options.slidesToScroll;
    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;
          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }
      _.slideHandler(slideTo);
    }
  };
  Slick.prototype.buildArrows = function () {
    var _ = this;
    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow");
      _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow");
      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow
          .removeClass("slick-hidden")
          .removeAttr("aria-hidden tabindex");
        _.$nextArrow
          .removeClass("slick-hidden")
          .removeAttr("aria-hidden tabindex");
        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }
        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }
        if (_.options.infinite !== true) {
          _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        }
      } else {
        _.$prevArrow
          .add(_.$nextArrow)
          .addClass("slick-hidden")
          .attr({ "aria-disabled": "true", tabindex: "-1" });
      }
    }
  };
  Slick.prototype.buildDots = function () {
    var _ = this,
      i,
      dot;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass("slick-dotted");
      dot = $("<ul />").addClass(_.options.dotsClass);
      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($("<li />").append(_.options.customPaging.call(this, _, i)));
      }
      _.$dots = dot.appendTo(_.options.appendDots);
      _.$dots
        .find("li")
        .first()
        .addClass("slick-active")
        .attr("aria-hidden", "false");
    }
  };
  Slick.prototype.buildOut = function () {
    var _ = this;
    _.$slides = _.$slider
      .children(_.options.slide + ":not(.slick-cloned)")
      .addClass("slick-slide");
    _.slideCount = _.$slides.length;
    _.$slides.each(function (index, element) {
      $(element)
        .attr("data-slick-index", index)
        .data("originalStyling", $(element).attr("style") || "");
    });
    _.$slider.addClass("slick-slider");
    _.$slideTrack =
      _.slideCount === 0
        ? $('<div class="slick-track"/>').appendTo(_.$slider)
        : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack
      .wrap('<div aria-live="polite" class="slick-list"/>')
      .parent();
    _.$slideTrack.css("opacity", 0);
    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }
    $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading");
    _.setupInfinite();
    _.buildArrows();
    _.buildDots();
    _.updateDots();
    _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
    if (_.options.draggable === true) {
      _.$list.addClass("draggable");
    }
  };
  Slick.prototype.buildRows = function () {
    var _ = this,
      a,
      b,
      c,
      newSlides,
      numOfSlides,
      originalSlides,
      slidesPerSection;
    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();
    if (_.options.rows > 1) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement("div");
        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement("div");
          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target =
              a * slidesPerSection + (b * _.options.slidesPerRow + c);
            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }
          slide.appendChild(row);
        }
        newSlides.appendChild(slide);
      }
      _.$slider.empty().append(newSlides);
      _.$slider
        .children()
        .children()
        .children()
        .css({
          width: 100 / _.options.slidesPerRow + "%",
          display: "inline-block",
        });
    }
  };
  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
      breakpoint,
      targetBreakpoint,
      respondToWidth,
      triggerBreakpoint = false;
    var sliderWidth = _.$slider.width();
    var windowWidth = window.innerWidth || $(window).width();
    if (_.respondTo === "window") {
      respondToWidth = windowWidth;
    } else if (_.respondTo === "slider") {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === "min") {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }
    if (
      _.options.responsive &&
      _.options.responsive.length &&
      _.options.responsive !== null
    ) {
      targetBreakpoint = null;
      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }
      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === "unslick") {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend(
                {},
                _.originalSettings,
                _.breakpointSettings[targetBreakpoint]
              );
              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }
              _.refresh(initial);
            }
            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          if (_.breakpointSettings[targetBreakpoint] === "unslick") {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend(
              {},
              _.originalSettings,
              _.breakpointSettings[targetBreakpoint]
            );
            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }
            _.refresh(initial);
          }
          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;
          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }
          _.refresh(initial);
          triggerBreakpoint = targetBreakpoint;
        }
      }
      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger("breakpoint", [_, triggerBreakpoint]);
      }
    }
  };
  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
      $target = $(event.currentTarget),
      indexOffset,
      slideOffset,
      unevenOffset;
    if ($target.is("a")) {
      event.preventDefault();
    }
    if (!$target.is("li")) {
      $target = $target.closest("li");
    }
    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset
      ? 0
      : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
    switch (event.data.message) {
      case "previous":
        slideOffset =
          indexOffset === 0
            ? _.options.slidesToScroll
            : _.options.slidesToShow - indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }
        break;
      case "next":
        slideOffset =
          indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }
        break;
      case "index":
        var index =
          event.data.index === 0
            ? 0
            : event.data.index || $target.index() * _.options.slidesToScroll;
        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
        $target.children().trigger("focus");
        break;
      default:
        return;
    }
  };
  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
      navigables,
      prevNavigable;
    navigables = _.getNavigableIndexes();
    prevNavigable = 0;
    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }
        prevNavigable = navigables[n];
      }
    }
    return index;
  };
  Slick.prototype.cleanUpEvents = function () {
    var _ = this;
    if (_.options.dots && _.$dots !== null) {
      $("li", _.$dots)
        .off("click.slick", _.changeSlide)
        .off("mouseenter.slick", $.proxy(_.interrupt, _, true))
        .off("mouseleave.slick", $.proxy(_.interrupt, _, false));
    }
    _.$slider.off("focus.slick blur.slick");
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide);
      _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide);
    }
    _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler);
    _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler);
    _.$list.off("touchend.slick mouseup.slick", _.swipeHandler);
    _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler);
    _.$list.off("click.slick", _.clickHandler);
    $(document).off(_.visibilityChange, _.visibility);
    _.cleanUpSlideEvents();
    if (_.options.accessibility === true) {
      _.$list.off("keydown.slick", _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off("click.slick", _.selectHandler);
    }
    $(window).off(
      "orientationchange.slick.slick-" + _.instanceUid,
      _.orientationChange
    );
    $(window).off("resize.slick.slick-" + _.instanceUid, _.resize);
    $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault);
    $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition);
    $(document).off("ready.slick.slick-" + _.instanceUid, _.setPosition);
  };
  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;
    _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, true));
    _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, false));
  };
  Slick.prototype.cleanUpRows = function () {
    var _ = this,
      originalSlides;
    if (_.options.rows > 1) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr("style");
      _.$slider.empty().append(originalSlides);
    }
  };
  Slick.prototype.clickHandler = function (event) {
    var _ = this;
    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  Slick.prototype.destroy = function (refresh) {
    var _ = this;
    _.autoPlayClear();
    _.touchObject = {};
    _.cleanUpEvents();
    $(".slick-cloned", _.$slider).detach();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow
        .removeClass("slick-disabled slick-arrow slick-hidden")
        .removeAttr("aria-hidden aria-disabled tabindex")
        .css("display", "");
      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }
    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow
        .removeClass("slick-disabled slick-arrow slick-hidden")
        .removeAttr("aria-hidden aria-disabled tabindex")
        .css("display", "");
      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }
    if (_.$slides) {
      _.$slides
        .removeClass(
          "slick-slide slick-active slick-center slick-visible slick-current"
        )
        .removeAttr("aria-hidden")
        .removeAttr("data-slick-index")
        .each(function () {
          $(this).attr("style", $(this).data("originalStyling"));
        });
      _.$slideTrack.children(this.options.slide).detach();
      _.$slideTrack.detach();
      _.$list.detach();
      _.$slider.append(_.$slides);
    }
    _.cleanUpRows();
    _.$slider.removeClass("slick-slider");
    _.$slider.removeClass("slick-initialized");
    _.$slider.removeClass("slick-dotted");
    _.unslicked = true;
    if (!refresh) {
      _.$slider.trigger("destroy", [_]);
    }
  };
  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
      transition = {};
    transition[_.transitionType] = "";
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({ zIndex: _.options.zIndex });
      _.$slides
        .eq(slideIndex)
        .animate({ opacity: 1 }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);
      _.$slides.eq(slideIndex).css({ opacity: 1, zIndex: _.options.zIndex });
      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);
          callback.call();
        }, _.options.speed);
      }
    }
  };
  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides
        .eq(slideIndex)
        .animate(
          { opacity: 0, zIndex: _.options.zIndex - 2 },
          _.options.speed,
          _.options.easing
        );
    } else {
      _.applyTransition(slideIndex);
      _.$slides
        .eq(slideIndex)
        .css({ opacity: 0, zIndex: _.options.zIndex - 2 });
    }
  };
  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (
    filter
  ) {
    var _ = this;
    if (filter !== null) {
      _.$slidesCache = _.$slides;
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.focusHandler = function () {
    var _ = this;
    _.$slider
      .off("focus.slick blur.slick")
      .on("focus.slick blur.slick", "*:not(.slick-arrow)", function (event) {
        event.stopImmediatePropagation();
        var $sf = $(this);
        setTimeout(function () {
          if (_.options.pauseOnFocus) {
            _.focussed = $sf.is(":focus");
            _.autoPlay();
          }
        }, 0);
      });
  };
  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;
    return _.currentSlide;
  };
  Slick.prototype.getDotCount = function () {
    var _ = this;
    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;
    if (_.options.infinite === true) {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter +=
          _.options.slidesToScroll <= _.options.slidesToShow
            ? _.options.slidesToScroll
            : _.options.slidesToShow;
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty =
        1 +
        Math.ceil(
          (_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll
        );
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter +=
          _.options.slidesToScroll <= _.options.slidesToShow
            ? _.options.slidesToScroll
            : _.options.slidesToShow;
      }
    }
    return pagerQty - 1;
  };
  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
      targetLeft,
      verticalHeight,
      verticalOffset = 0,
      targetSlide;
    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);
    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        verticalOffset = verticalHeight * _.options.slidesToShow * -1;
      }
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (
          slideIndex + _.options.slidesToScroll > _.slideCount &&
          _.slideCount > _.options.slidesToShow
        ) {
          if (slideIndex > _.slideCount) {
            _.slideOffset =
              (_.options.slidesToShow - (slideIndex - _.slideCount)) *
              _.slideWidth *
              -1;
            verticalOffset =
              (_.options.slidesToShow - (slideIndex - _.slideCount)) *
              verticalHeight *
              -1;
          } else {
            _.slideOffset =
              (_.slideCount % _.options.slidesToScroll) * _.slideWidth * -1;
            verticalOffset =
              (_.slideCount % _.options.slidesToScroll) * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset =
          (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset =
          (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }
    if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset +=
        _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }
    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }
    if (_.options.variableWidth === true) {
      if (
        _.slideCount <= _.options.slidesToShow ||
        _.options.infinite === false
      ) {
        targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack
          .children(".slick-slide")
          .eq(slideIndex + _.options.slidesToShow);
      }
      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft =
            (_.$slideTrack.width() -
              targetSlide[0].offsetLeft -
              targetSlide.width()) *
            -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }
      if (_.options.centerMode === true) {
        if (
          _.slideCount <= _.options.slidesToShow ||
          _.options.infinite === false
        ) {
          targetSlide = _.$slideTrack.children(".slick-slide").eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack
            .children(".slick-slide")
            .eq(slideIndex + _.options.slidesToShow + 1);
        }
        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft =
              (_.$slideTrack.width() -
                targetSlide[0].offsetLeft -
                targetSlide.width()) *
              -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }
        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }
    return targetLeft;
  };
  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (
    option
  ) {
    var _ = this;
    return _.options[option];
  };
  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
      breakPoint = 0,
      counter = 0,
      indexes = [],
      max;
    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }
    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter +=
        _.options.slidesToScroll <= _.options.slidesToShow
          ? _.options.slidesToScroll
          : _.options.slidesToShow;
    }
    return indexes;
  };
  Slick.prototype.getSlick = function () {
    return this;
  };
  Slick.prototype.getSlideCount = function () {
    var _ = this,
      slidesTraversed,
      swipedSlide,
      centerOffset;
    centerOffset =
      _.options.centerMode === true
        ? _.slideWidth * Math.floor(_.options.slidesToShow / 2)
        : 0;
    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find(".slick-slide").each(function (index, slide) {
        if (
          slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 >
          _.swipeLeft * -1
        ) {
          swipedSlide = slide;
          return false;
        }
      });
      slidesTraversed =
        Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };
  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (
    slide,
    dontAnimate
  ) {
    var _ = this;
    _.changeSlide(
      { data: { message: "index", index: parseInt(slide) } },
      dontAnimate
    );
  };
  Slick.prototype.init = function (creation) {
    var _ = this;
    if (!$(_.$slider).hasClass("slick-initialized")) {
      $(_.$slider).addClass("slick-initialized");
      _.buildRows();
      _.buildOut();
      _.setProps();
      _.startLoad();
      _.loadSlider();
      _.initializeEvents();
      _.updateArrows();
      _.updateDots();
      _.checkResponsive(true);
      _.focusHandler();
    }
    if (creation) {
      _.$slider.trigger("init", [_]);
    }
    if (_.options.accessibility === true) {
      _.initADA();
    }
    if (_.options.autoplay) {
      _.paused = false;
      _.autoPlay();
    }
  };
  Slick.prototype.initADA = function () {
    var _ = this;
    _.$slides
      .add(_.$slideTrack.find(".slick-cloned"))
      .attr({ "aria-hidden": "true", tabindex: "-1" })
      .find("a, input, button, select")
      .attr({ tabindex: "-1" });
    _.$slideTrack.attr("role", "listbox");
    _.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function (i) {
      $(this).attr({
        role: "option",
        "aria-describedby": "slick-slide" + _.instanceUid + i + "",
      });
    });
    if (_.$dots !== null) {
      _.$dots
        .attr("role", "tablist")
        .find("li")
        .each(function (i) {
          $(this).attr({
            role: "presentation",
            "aria-selected": "false",
            "aria-controls": "navigation" + _.instanceUid + i + "",
            id: "slick-slide" + _.instanceUid + i + "",
          });
        })
        .first()
        .attr("aria-selected", "true")
        .end()
        .find("button")
        .attr("role", "button")
        .end()
        .closest("div")
        .attr("role", "toolbar");
    }
    _.activateADA();
  };
  Slick.prototype.initArrowEvents = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow
        .off("click.slick")
        .on("click.slick", { message: "previous" }, _.changeSlide);
      _.$nextArrow
        .off("click.slick")
        .on("click.slick", { message: "next" }, _.changeSlide);
    }
  };
  Slick.prototype.initDotEvents = function () {
    var _ = this;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $("li", _.$dots).on("click.slick", { message: "index" }, _.changeSlide);
    }
    if (_.options.dots === true && _.options.pauseOnDotsHover === true) {
      $("li", _.$dots)
        .on("mouseenter.slick", $.proxy(_.interrupt, _, true))
        .on("mouseleave.slick", $.proxy(_.interrupt, _, false));
    }
  };
  Slick.prototype.initSlideEvents = function () {
    var _ = this;
    if (_.options.pauseOnHover) {
      _.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, true));
      _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, false));
    }
  };
  Slick.prototype.initializeEvents = function () {
    var _ = this;
    _.initArrowEvents();
    _.initDotEvents();
    _.initSlideEvents();
    _.$list.on(
      "touchstart.slick mousedown.slick",
      { action: "start" },
      _.swipeHandler
    );
    _.$list.on(
      "touchmove.slick mousemove.slick",
      { action: "move" },
      _.swipeHandler
    );
    _.$list.on(
      "touchend.slick mouseup.slick",
      { action: "end" },
      _.swipeHandler
    );
    _.$list.on(
      "touchcancel.slick mouseleave.slick",
      { action: "end" },
      _.swipeHandler
    );
    _.$list.on("click.slick", _.clickHandler);
    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
    if (_.options.accessibility === true) {
      _.$list.on("keydown.slick", _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on("click.slick", _.selectHandler);
    }
    $(window).on(
      "orientationchange.slick.slick-" + _.instanceUid,
      $.proxy(_.orientationChange, _)
    );
    $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _));
    $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault);
    $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition);
    $(document).on("ready.slick.slick-" + _.instanceUid, _.setPosition);
  };
  Slick.prototype.initUI = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();
      _.$nextArrow.show();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };
  Slick.prototype.keyHandler = function (event) {
    var _ = this;
    if (!event.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: { message: _.options.rtl === true ? "next" : "previous" },
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: { message: _.options.rtl === true ? "previous" : "next" },
        });
      }
    }
  };
  Slick.prototype.lazyLoad = function () {
    var _ = this,
      loadRange,
      cloneRange,
      rangeStart,
      rangeEnd;
    function loadImages(imagesScope) {
      $("img[data-lazy]", imagesScope).each(function () {
        var image = $(this),
          imageSource = $(this).attr("data-lazy"),
          imageToLoad = document.createElement("img");
        imageToLoad.onload = function () {
          image.animate({ opacity: 0 }, 100, function () {
            image
              .attr("src", imageSource)
              .animate({ opacity: 1 }, 200, function () {
                image.removeAttr("data-lazy").removeClass("slick-loading");
              });
            _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
          });
        };
        imageToLoad.onerror = function () {
          image
            .removeAttr("data-lazy")
            .removeClass("slick-loading")
            .addClass("slick-lazyload-error");
          _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
        };
        imageToLoad.src = imageSource;
      });
    }
    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(
          0,
          _.currentSlide - (_.options.slidesToShow / 2 + 1)
        );
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite
        ? _.options.slidesToShow + _.currentSlide
        : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }
    loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd);
    loadImages(loadRange);
    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find(".slick-slide");
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider
        .find(".slick-cloned")
        .slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider
        .find(".slick-cloned")
        .slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };
  Slick.prototype.loadSlider = function () {
    var _ = this;
    _.setPosition();
    _.$slideTrack.css({ opacity: 1 });
    _.$slider.removeClass("slick-loading");
    _.initUI();
    if (_.options.lazyLoad === "progressive") {
      _.progressiveLazyLoad();
    }
  };
  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;
    _.changeSlide({ data: { message: "next" } });
  };
  Slick.prototype.orientationChange = function () {
    var _ = this;
    _.checkResponsive();
    _.setPosition();
  };
  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;
    _.autoPlayClear();
    _.paused = true;
  };
  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;
    _.autoPlay();
    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };
  Slick.prototype.postSlide = function (index) {
    var _ = this;
    if (!_.unslicked) {
      _.$slider.trigger("afterChange", [_, index]);
      _.animating = false;
      _.setPosition();
      _.swipeLeft = null;
      if (_.options.autoplay) {
        _.autoPlay();
      }
      if (_.options.accessibility === true) {
        _.initADA();
      }
    }
  };
  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;
    _.changeSlide({ data: { message: "previous" } });
  };
  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };
  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;
    var _ = this,
      $imgsToLoad = $("img[data-lazy]", _.$slider),
      image,
      imageSource,
      imageToLoad;
    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr("data-lazy");
      imageToLoad = document.createElement("img");
      imageToLoad.onload = function () {
        image
          .attr("src", imageSource)
          .removeAttr("data-lazy")
          .removeClass("slick-loading");
        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }
        _.$slider.trigger("lazyLoaded", [_, image, imageSource]);
        _.progressiveLazyLoad();
      };
      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image
            .removeAttr("data-lazy")
            .removeClass("slick-loading")
            .addClass("slick-lazyload-error");
          _.$slider.trigger("lazyLoadError", [_, image, imageSource]);
          _.progressiveLazyLoad();
        }
      };
      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger("allImagesLoaded", [_]);
    }
  };
  Slick.prototype.refresh = function (initializing) {
    var _ = this,
      currentSlide,
      lastVisibleIndex;
    lastVisibleIndex = _.slideCount - _.options.slidesToShow;
    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    currentSlide = _.currentSlide;
    _.destroy(true);
    $.extend(_, _.initials, { currentSlide: currentSlide });
    _.init();
    if (!initializing) {
      _.changeSlide({ data: { message: "index", index: currentSlide } }, false);
    }
  };
  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
      breakpoint,
      currentBreakpoint,
      l,
      responsiveSettings = _.options.responsive || null;
    if ($.type(responsiveSettings) === "array" && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || "window";
      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;
        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }
            l--;
          }
          _.breakpoints.push(currentBreakpoint);
          _.breakpointSettings[currentBreakpoint] =
            responsiveSettings[breakpoint].settings;
        }
      }
      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };
  Slick.prototype.reinit = function () {
    var _ = this;
    _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide");
    _.slideCount = _.$slides.length;
    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    _.registerBreakpoints();
    _.setProps();
    _.setupInfinite();
    _.buildArrows();
    _.updateArrows();
    _.initArrowEvents();
    _.buildDots();
    _.updateDots();
    _.initDotEvents();
    _.cleanUpSlideEvents();
    _.initSlideEvents();
    _.checkResponsive(false, true);
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on("click.slick", _.selectHandler);
    }
    _.setSlideClasses(typeof _.currentSlide === "number" ? _.currentSlide : 0);
    _.setPosition();
    _.focusHandler();
    _.paused = !_.options.autoplay;
    _.autoPlay();
    _.$slider.trigger("reInit", [_]);
  };
  Slick.prototype.resize = function () {
    var _ = this;
    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();
        _.checkResponsive();
        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };
  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (
    index,
    removeBefore,
    removeAll
  ) {
    var _ = this;
    if (typeof index === "boolean") {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }
    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }
    _.unload();
    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.setCSS = function (position) {
    var _ = this,
      positionProps = {},
      x,
      y;
    if (_.options.rtl === true) {
      position = -position;
    }
    x = _.positionProp == "left" ? Math.ceil(position) + "px" : "0px";
    y = _.positionProp == "top" ? Math.ceil(position) + "px" : "0px";
    positionProps[_.positionProp] = position;
    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};
      if (_.cssTransitions === false) {
        positionProps[_.animType] = "translate(" + x + ", " + y + ")";
        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)";
        _.$slideTrack.css(positionProps);
      }
    }
  };
  Slick.prototype.setDimensions = function () {
    var _ = this;
    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({ padding: "0px " + _.options.centerPadding });
      }
    } else {
      _.$list.height(
        _.$slides.first().outerHeight(true) * _.options.slidesToShow
      );
      if (_.options.centerMode === true) {
        _.$list.css({ padding: _.options.centerPadding + " 0px" });
      }
    }
    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();
    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
      _.$slideTrack.width(
        Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length)
      );
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);
      _.$slideTrack.height(
        Math.ceil(
          _.$slides.first().outerHeight(true) *
            _.$slideTrack.children(".slick-slide").length
        )
      );
    }
    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    if (_.options.variableWidth === false)
      _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset);
  };
  Slick.prototype.setFade = function () {
    var _ = this,
      targetLeft;
    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;
      if (_.options.rtl === true) {
        $(element).css({
          position: "relative",
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0,
        });
      } else {
        $(element).css({
          position: "relative",
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0,
        });
      }
    });
    _.$slides
      .eq(_.currentSlide)
      .css({ zIndex: _.options.zIndex - 1, opacity: 1 });
  };
  Slick.prototype.setHeight = function () {
    var _ = this;
    if (
      _.options.slidesToShow === 1 &&
      _.options.adaptiveHeight === true &&
      _.options.vertical === false
    ) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.css("height", targetHeight);
    }
  };
  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    var _ = this,
      l,
      item,
      option,
      value,
      refresh = false,
      type;
    if ($.type(arguments[0]) === "object") {
      option = arguments[0];
      refresh = arguments[1];
      type = "multiple";
    } else if ($.type(arguments[0]) === "string") {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];
      if (arguments[0] === "responsive" && $.type(arguments[1]) === "array") {
        type = "responsive";
      } else if (typeof arguments[1] !== "undefined") {
        type = "single";
      }
    }
    if (type === "single") {
      _.options[option] = value;
    } else if (type === "multiple") {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === "responsive") {
      for (item in value) {
        if ($.type(_.options.responsive) !== "array") {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1;
          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }
            l--;
          }
          _.options.responsive.push(value[item]);
        }
      }
    }
    if (refresh) {
      _.unload();
      _.reinit();
    }
  };
  Slick.prototype.setPosition = function () {
    var _ = this;
    _.setDimensions();
    _.setHeight();
    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }
    _.$slider.trigger("setPosition", [_]);
  };
  Slick.prototype.setProps = function () {
    var _ = this,
      bodyStyle = document.body.style;
    _.positionProp = _.options.vertical === true ? "top" : "left";
    if (_.positionProp === "top") {
      _.$slider.addClass("slick-vertical");
    } else {
      _.$slider.removeClass("slick-vertical");
    }
    if (
      bodyStyle.WebkitTransition !== undefined ||
      bodyStyle.MozTransition !== undefined ||
      bodyStyle.msTransition !== undefined
    ) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }
    if (_.options.fade) {
      if (typeof _.options.zIndex === "number") {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }
    if (bodyStyle.OTransform !== undefined) {
      _.animType = "OTransform";
      _.transformType = "-o-transform";
      _.transitionType = "OTransition";
      if (
        bodyStyle.perspectiveProperty === undefined &&
        bodyStyle.webkitPerspective === undefined
      )
        _.animType = false;
    }
    if (bodyStyle.MozTransform !== undefined) {
      _.animType = "MozTransform";
      _.transformType = "-moz-transform";
      _.transitionType = "MozTransition";
      if (
        bodyStyle.perspectiveProperty === undefined &&
        bodyStyle.MozPerspective === undefined
      )
        _.animType = false;
    }
    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = "webkitTransform";
      _.transformType = "-webkit-transform";
      _.transitionType = "webkitTransition";
      if (
        bodyStyle.perspectiveProperty === undefined &&
        bodyStyle.webkitPerspective === undefined
      )
        _.animType = false;
    }
    if (bodyStyle.msTransform !== undefined) {
      _.animType = "msTransform";
      _.transformType = "-ms-transform";
      _.transitionType = "msTransition";
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }
    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = "transform";
      _.transformType = "transform";
      _.transitionType = "transition";
    }
    _.transformsEnabled =
      _.options.useTransform && _.animType !== null && _.animType !== false;
  };
  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
      centerOffset,
      allSlides,
      indexOffset,
      remainder;
    allSlides = _.$slider
      .find(".slick-slide")
      .removeClass("slick-active slick-center slick-current")
      .attr("aria-hidden", "true");
    _.$slides.eq(index).addClass("slick-current");
    if (_.options.centerMode === true) {
      centerOffset = Math.floor(_.options.slidesToShow / 2);
      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides
            .slice(index - centerOffset, index + centerOffset + 1)
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides
            .slice(
              indexOffset - centerOffset + 1,
              indexOffset + centerOffset + 2
            )
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        }
        if (index === 0) {
          allSlides
            .eq(allSlides.length - 1 - _.options.slidesToShow)
            .addClass("slick-center");
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass("slick-center");
        }
      }
      _.$slides.eq(index).addClass("slick-center");
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides
          .slice(index, index + _.options.slidesToShow)
          .addClass("slick-active")
          .attr("aria-hidden", "false");
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass("slick-active").attr("aria-hidden", "false");
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset =
          _.options.infinite === true ? _.options.slidesToShow + index : index;
        if (
          _.options.slidesToShow == _.options.slidesToScroll &&
          _.slideCount - index < _.options.slidesToShow
        ) {
          allSlides
            .slice(
              indexOffset - (_.options.slidesToShow - remainder),
              indexOffset + remainder
            )
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        } else {
          allSlides
            .slice(indexOffset, indexOffset + _.options.slidesToShow)
            .addClass("slick-active")
            .attr("aria-hidden", "false");
        }
      }
    }
    if (_.options.lazyLoad === "ondemand") {
      _.lazyLoad();
    }
  };
  Slick.prototype.setupInfinite = function () {
    var _ = this,
      i,
      slideIndex,
      infiniteCount;
    if (_.options.fade === true) {
      _.options.centerMode = false;
    }
    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;
      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }
        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex])
            .clone(true)
            .attr("id", "")
            .attr("data-slick-index", slideIndex - _.slideCount)
            .prependTo(_.$slideTrack)
            .addClass("slick-cloned");
        }
        for (i = 0; i < infiniteCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex])
            .clone(true)
            .attr("id", "")
            .attr("data-slick-index", slideIndex + _.slideCount)
            .appendTo(_.$slideTrack)
            .addClass("slick-cloned");
        }
        _.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            $(this).attr("id", "");
          });
      }
    }
  };
  Slick.prototype.interrupt = function (toggle) {
    var _ = this;
    if (!toggle) {
      _.autoPlay();
    }
    _.interrupted = toggle;
  };
  Slick.prototype.selectHandler = function (event) {
    var _ = this;
    var targetElement = $(event.target).is(".slick-slide")
      ? $(event.target)
      : $(event.target).parents(".slick-slide");
    var index = parseInt(targetElement.attr("data-slick-index"));
    if (!index) index = 0;
    if (_.slideCount <= _.options.slidesToShow) {
      _.setSlideClasses(index);
      _.asNavFor(index);
      return;
    }
    _.slideHandler(index);
  };
  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
      animSlide,
      oldSlide,
      slideLeft,
      targetLeft = null,
      _ = this,
      navTarget;
    sync = sync || false;
    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }
    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      return;
    }
    if (sync === false) {
      _.asNavFor(index);
    }
    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
    if (
      _.options.infinite === false &&
      _.options.centerMode === false &&
      (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)
    ) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    } else if (
      _.options.infinite === false &&
      _.options.centerMode === true &&
      (index < 0 || index > _.slideCount - _.options.slidesToScroll)
    ) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    }
    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }
    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }
    _.animating = true;
    _.$slider.trigger("beforeChange", [_, _.currentSlide, animSlide]);
    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;
    _.setSlideClasses(_.currentSlide);
    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick("getSlick");
      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }
    _.updateDots();
    _.updateArrows();
    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);
        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }
      _.animateHeight();
      return;
    }
    if (dontAnimate !== true) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };
  Slick.prototype.startLoad = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();
      _.$nextArrow.hide();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }
    _.$slider.addClass("slick-loading");
  };
  Slick.prototype.swipeDirection = function () {
    var xDist,
      yDist,
      r,
      swipeAngle,
      _ = this;
    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round((r * 180) / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? "left" : "right";
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? "left" : "right";
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? "right" : "left";
    }
    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return "down";
      } else {
        return "up";
      }
    }
    return "vertical";
  };
  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
      slideCount,
      direction;
    _.dragging = false;
    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
    if (_.touchObject.curX === undefined) {
      return false;
    }
    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger("edge", [_, _.swipeDirection()]);
    }
    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();
      switch (direction) {
        case "left":
        case "down":
          slideCount = _.options.swipeToSlide
            ? _.checkNavigable(_.currentSlide + _.getSlideCount())
            : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;
        case "right":
        case "up":
          slideCount = _.options.swipeToSlide
            ? _.checkNavigable(_.currentSlide - _.getSlideCount())
            : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;
        default:
      }
      if (direction != "vertical") {
        _.slideHandler(slideCount);
        _.touchObject = {};
        _.$slider.trigger("swipe", [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);
        _.touchObject = {};
      }
    }
  };
  Slick.prototype.swipeHandler = function (event) {
    var _ = this;
    if (
      _.options.swipe === false ||
      ("ontouchend" in document && _.options.swipe === false)
    ) {
      return;
    } else if (
      _.options.draggable === false &&
      event.type.indexOf("mouse") !== -1
    ) {
      return;
    }
    _.touchObject.fingerCount =
      event.originalEvent && event.originalEvent.touches !== undefined
        ? event.originalEvent.touches.length
        : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }
    switch (event.data.action) {
      case "start":
        _.swipeStart(event);
        break;
      case "move":
        _.swipeMove(event);
        break;
      case "end":
        _.swipeEnd(event);
        break;
    }
  };
  Slick.prototype.swipeMove = function (event) {
    var _ = this,
      edgeWasHit = false,
      curLeft,
      swipeDirection,
      swipeLength,
      positionOffset,
      touches;
    touches =
      event.originalEvent !== undefined ? event.originalEvent.touches : null;
    if (!_.dragging || (touches && touches.length !== 1)) {
      return false;
    }
    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX =
      touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY =
      touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(
      Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2))
    );
    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = Math.round(
        Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2))
      );
    }
    swipeDirection = _.swipeDirection();
    if (swipeDirection === "vertical") {
      return;
    }
    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      event.preventDefault();
    }
    positionOffset =
      (_.options.rtl === false ? 1 : -1) *
      (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }
    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;
    if (_.options.infinite === false) {
      if (
        (_.currentSlide === 0 && swipeDirection === "right") ||
        (_.currentSlide >= _.getDotCount() && swipeDirection === "left")
      ) {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }
    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft =
        curLeft +
        swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }
    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }
    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }
    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }
    _.setCSS(_.swipeLeft);
  };
  Slick.prototype.swipeStart = function (event) {
    var _ = this,
      touches;
    _.interrupted = true;
    if (
      _.touchObject.fingerCount !== 1 ||
      _.slideCount <= _.options.slidesToShow
    ) {
      _.touchObject = {};
      return false;
    }
    if (
      event.originalEvent !== undefined &&
      event.originalEvent.touches !== undefined
    ) {
      touches = event.originalEvent.touches[0];
    }
    _.touchObject.startX = _.touchObject.curX =
      touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY =
      touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };
  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;
    if (_.$slidesCache !== null) {
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.unload = function () {
    var _ = this;
    $(".slick-cloned", _.$slider).remove();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }
    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }
    _.$slides
      .removeClass("slick-slide slick-active slick-visible slick-current")
      .attr("aria-hidden", "true")
      .css("width", "");
  };
  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;
    _.$slider.trigger("unslick", [_, fromBreakpoint]);
    _.destroy();
  };
  Slick.prototype.updateArrows = function () {
    var _ = this,
      centerOffset;
    centerOffset = Math.floor(_.options.slidesToShow / 2);
    if (
      _.options.arrows === true &&
      _.slideCount > _.options.slidesToShow &&
      !_.options.infinite
    ) {
      _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
      _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false");
      if (_.currentSlide === 0) {
        _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        _.$nextArrow
          .removeClass("slick-disabled")
          .attr("aria-disabled", "false");
      } else if (
        _.currentSlide >= _.slideCount - _.options.slidesToShow &&
        _.options.centerMode === false
      ) {
        _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        _.$prevArrow
          .removeClass("slick-disabled")
          .attr("aria-disabled", "false");
      } else if (
        _.currentSlide >= _.slideCount - 1 &&
        _.options.centerMode === true
      ) {
        _.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true");
        _.$prevArrow
          .removeClass("slick-disabled")
          .attr("aria-disabled", "false");
      }
    }
  };
  Slick.prototype.updateDots = function () {
    var _ = this;
    if (_.$dots !== null) {
      _.$dots
        .find("li")
        .removeClass("slick-active")
        .attr("aria-hidden", "true");
      _.$dots
        .find("li")
        .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
        .addClass("slick-active")
        .attr("aria-hidden", "false");
    }
  };
  Slick.prototype.visibility = function () {
    var _ = this;
    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };
  $.fn.slick = function () {
    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;
    for (i = 0; i < l; i++) {
      if (typeof opt == "object" || typeof opt == "undefined")
        _[i].slick = new Slick(_[i], opt);
      else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != "undefined") return ret;
    }
    return _;
  };
});
(function (window, $, undefined) {
  var JSSOCIALS = "nSocials",
    JSSOCIALS_DATA_KEY = JSSOCIALS;
  var getOrApply = function (value, context) {
    if ($.isFunction(value)) {
      return value.apply(context, $.makeArray(arguments).slice(2));
    }
    return value;
  };
  var IMG_SRC_REGEX = /(\.(jpeg|png|gif|bmp|svg)$|^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64)/i;
  var URL_PARAMS_REGEX = /(&?[a-zA-Z0-9]+=)?\{([a-zA-Z0-9]+)\}/g;
  var MEASURES = { G: 1000000000, M: 1000000, K: 1000 };
  var shares = {};
  function Socials(element, config) {
    var $element = $(element);
    $element.data(JSSOCIALS_DATA_KEY, this);
    this._$element = $element;
    this.shares = [];
    this._init(config);
    this._render();
  }
  Socials.prototype = {
    url: "",
    text: "",
    shareIn: "blank",
    showLabel: function (screenWidth) {
      return this.showCount === false
        ? screenWidth > this.smallScreenWidth
        : screenWidth >= this.largeScreenWidth;
    },
    showCount: function (screenWidth) {
      return screenWidth <= this.smallScreenWidth ? "inside" : true;
    },
    smallScreenWidth: 640,
    largeScreenWidth: 1024,
    resizeTimeout: 200,
    elementClass: "nsocials",
    sharesClass: "nsocials-shares l-inline-list",
    shareClass: "nsocials-share",
    shareButtonClass: "nsocials-share-button",
    shareLinkClass: "nsocials-share-link",
    shareLogoClass: "nsocials-share-logo",
    shareLabelClass: "nsocials-share-label",
    shareLinkCountClass: "nsocials-share-link-count",
    shareCountBoxClass: "nsocials-share-count-box",
    shareCountClass: "nsocials-share-count",
    shareZeroCountClass: "nsocials-share-no-count",
    _init: function (config) {
      this._initDefaults();
      $.extend(this, config);
      this._initShares();
      this._attachWindowResizeCallback();
    },
    _initDefaults: function () {
      this.url = window.location.href;
      this.text = $.trim(
        $("meta[name=description]").attr("content") || $("title").text()
      );
    },
    _initShares: function () {
      this.shares = $.map(
        this.shares,
        $.proxy(function (shareConfig) {
          if (typeof shareConfig === "string") {
            shareConfig = { share: shareConfig };
          }
          var share = shareConfig.share && shares[shareConfig.share];
          if (!share && !shareConfig.renderer) {
            throw Error("Share '" + shareConfig.share + "' is not found");
          }
          return $.extend(
            { url: this.url, text: this.text },
            share,
            shareConfig
          );
        }, this)
      );
    },
    _attachWindowResizeCallback: function () {
      $(window).on("resize", $.proxy(this._windowResizeHandler, this));
    },
    _detachWindowResizeCallback: function () {
      $(window).off("resize", this._windowResizeHandler);
    },
    _windowResizeHandler: function () {
      if ($.isFunction(this.showLabel) || $.isFunction(this.showCount)) {
        window.clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(
          $.proxy(this.refresh, this),
          this.resizeTimeout
        );
      }
    },
    _render: function () {
      this._clear();
      this._defineOptionsByScreen();
      this._$element.addClass(this.elementClass);
      this._$shares = $("<ul>")
        .addClass(this.sharesClass)
        .appendTo(this._$element);
      this._renderShares();
    },
    _defineOptionsByScreen: function () {
      this._screenWidth = $(window).width();
      this._showLabel = getOrApply(this.showLabel, this, this._screenWidth);
      this._showCount = getOrApply(this.showCount, this, this._screenWidth);
    },
    _renderShares: function () {
      $.each(
        this.shares,
        $.proxy(function (_, share) {
          this._renderShare(share);
        }, this)
      );
    },
    _renderShare: function (share) {
      var $share;
      if ($.isFunction(share.renderer)) {
        $share = $(share.renderer());
      } else {
        $share = this._createShare(share);
      }
      $share
        .addClass(this.shareClass)
        .addClass(share.share ? "nsocials-share-" + share.share : "")
        .addClass(share.css)
        .appendTo(this._$shares);
    },
    _createShare: function (share) {
      var $result = $("<li>");
      var $shareLink = this._createShareLink(share).appendTo($result);
      if (this._showCount) {
        var isInsideCount = this._showCount === "inside";
        var $countContainer = isInsideCount
          ? $shareLink
          : $("<div>").addClass(this.shareCountBoxClass).appendTo($result);
        $countContainer.addClass(
          isInsideCount ? this.shareLinkCountClass : this.shareCountBoxClass
        );
        this._renderShareCount(share, $countContainer);
      }
      return $result;
    },
    _createShareLink: function (share) {
      var shareStrategy = this._getShareStrategy(share);
      var $result = shareStrategy.call(share, {
        shareUrl: this._getShareUrl(share),
      });
      $result
        .addClass(this.shareLinkClass)
        .append(this._createShareLogo(share));
      if (this._showLabel) {
        $result.append(this._createShareLabel(share));
      }
      $.each(this.on || {}, function (event, handler) {
        if ($.isFunction(handler)) {
          $result.on(event, $.proxy(handler, share));
        }
      });
      return $result;
    },
    _getShareStrategy: function (share) {
      var result = shareStrategies[share.shareIn || this.shareIn];
      if (!result)
        throw Error("Share strategy '" + this.shareIn + "' not found");
      return result;
    },
    _getShareUrl: function (share) {
      var shareUrl = getOrApply(share.shareUrl, share);
      return this._formatShareUrl(shareUrl, share);
    },
    _createShareLogo: function (share) {
      var logo = share.logo;
      var $result = IMG_SRC_REGEX.test(logo)
        ? $("<img>").attr("src", share.logo)
        : $("<i>").addClass(logo);
      $result.addClass(this.shareLogoClass).attr("id", share.share);
      return $result;
    },
    _createShareLabel: function (share) {
      return $("<span>").addClass(this.shareLabelClass).text(share.label);
    },
    _renderShareCount: function (share, $container) {
      var $count = $("<span>").addClass(this.shareCountClass);
      $container.addClass(this.shareZeroCountClass).append($count);
      this._loadCount(share).done(
        $.proxy(function (count) {
          if (count) {
            $container.removeClass(this.shareZeroCountClass);
            $count.text(count);
          }
        }, this)
      );
    },
    _loadCount: function (share) {
      var deferred = $.Deferred();
      var countUrl = this._getCountUrl(share);
      if (!countUrl) {
        return deferred.resolve(0).promise();
      }
      var handleSuccess = $.proxy(function (response) {
        deferred.resolve(this._getCountValue(response, share));
      }, this);
      $.getJSON(countUrl)
        .done(handleSuccess)
        .fail(function () {
          $.get(countUrl)
            .done(handleSuccess)
            .fail(function () {
              deferred.resolve(0);
            });
        });
      return deferred.promise();
    },
    _getCountUrl: function (share) {
      var countUrl = getOrApply(share.countUrl, share);
      return this._formatShareUrl(countUrl, share);
    },
    _getCountValue: function (response, share) {
      var count =
        ($.isFunction(share.getCount) ? share.getCount(response) : response) ||
        0;
      return typeof count === "string" ? count : this._formatNumber(count);
    },
    _formatNumber: function (number) {
      $.each(MEASURES, function (letter, value) {
        if (number >= value) {
          number = parseFloat((number / value).toFixed(2)) + letter;
          return false;
        }
      });
      return number;
    },
    _formatShareUrl: function (url, share) {
      return url.replace(URL_PARAMS_REGEX, function (match, key, field) {
        var value = share[field] || "";
        return value ? (key || "") + window.encodeURIComponent(value) : "";
      });
    },
    _clear: function () {
      window.clearTimeout(this._resizeTimer);
      this._$element.empty();
    },
    _passOptionToShares: function (key, value) {
      var shares = this.shares;
      $.each(["url", "text"], function (_, optionName) {
        if (optionName !== key) return;
        $.each(shares, function (_, share) {
          share[key] = value;
        });
      });
    },
    _normalizeShare: function (share) {
      if ($.isNumeric(share)) {
        return this.shares[share];
      }
      if (typeof share === "string") {
        return $.grep(this.shares, function (s) {
          return s.share === share;
        })[0];
      }
      return share;
    },
    refresh: function () {
      this._render();
    },
    destroy: function () {
      this._clear();
      this._detachWindowResizeCallback();
      this._$element
        .removeClass(this.elementClass)
        .removeData(JSSOCIALS_DATA_KEY);
    },
    option: function (key, value) {
      if (arguments.length === 1) {
        return this[key];
      }
      this[key] = value;
      this._passOptionToShares(key, value);
      this.refresh();
    },
    shareOption: function (share, key, value) {
      share = this._normalizeShare(share);
      if (arguments.length === 2) {
        return share[key];
      }
      share[key] = value;
      this.refresh();
    },
  };
  $.fn.nSocials = function (config) {
    var args = $.makeArray(arguments),
      methodArgs = args.slice(1),
      result = this;
    this.each(function () {
      var $element = $(this),
        instance = $element.data(JSSOCIALS_DATA_KEY),
        methodResult;
      if (instance) {
        if (typeof config === "string") {
          methodResult = instance[config].apply(instance, methodArgs);
          if (methodResult !== undefined && methodResult !== instance) {
            result = methodResult;
            return false;
          }
        } else {
          instance._detachWindowResizeCallback();
          instance._init(config);
          instance._render();
        }
      } else {
        new Socials($element, config);
      }
    });
    return result;
  };
  var setDefaults = function (config) {
    var component;
    if ($.isPlainObject(config)) {
      component = Socials.prototype;
    } else {
      component = shares[config];
      config = arguments[1] || {};
    }
    $.extend(component, config);
  };
  var shareStrategies = {
    popup: function (args) {
      return $("<a>")
        .attr("href", "#")
        .on("click", function () {
          window.open(
            args.shareUrl,
            null,
            "width=600, height=400, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0"
          );
          return false;
        });
    },
    blank: function (args) {
      return $("<a>").attr({ target: "_blank", href: args.shareUrl });
    },
    self: function (args) {
      return $("<a>").attr({ target: "_self", href: args.shareUrl });
    },
  };
  window.nSocials = {
    Socials: Socials,
    shares: shares,
    shareStrategies: shareStrategies,
    setDefaults: setDefaults,
  };
})(window, jQuery);
(function (window, $, nSocials, undefined) {
  $.extend(nSocials.shares, {
    twitter: {
      label: "Tweet",
      logo: "fa fa-twitter",
      shareUrl:
        "https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}",
      countUrl: "",
    },
    facebook: {
      label: "Like",
      logo: "fa fa-facebook",
      shareUrl: "https://facebook.com/sharer/sharer.php?u={url}",
      countUrl: "https://graph.facebook.com/?id={url}",
      getCount: function (data) {
        return (data.share && data.share.share_count) || 0;
      },
    },
    linkedin: {
      label: "Share",
      logo: "fa fa-linkedin",
      shareUrl: "https://www.linkedin.com/shareArticle?mini=true&url={url}",
      countUrl:
        "https://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
      getCount: function (data) {
        return data.count;
      },
    },
  });
})(window, jQuery, window.nSocials);
var swfobject = (function () {
  var UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    EXPRESS_INSTALL_ID = "SWFObjectExprInst",
    win = window,
    doc = document,
    nav = navigator,
    domLoadFnArr = [],
    regObjArr = [],
    timer = null,
    storedAltContent = null,
    storedAltContentId = null,
    isDomLoaded = false,
    isExpressInstallActive = false;
  var ua = (function () {
    var w3cdom =
        typeof doc.getElementById != UNDEF &&
        typeof doc.getElementsByTagName != UNDEF &&
        typeof doc.createElement != UNDEF &&
        typeof doc.appendChild != UNDEF &&
        typeof doc.replaceChild != UNDEF &&
        typeof doc.removeChild != UNDEF &&
        typeof doc.cloneNode != UNDEF,
      playerVersion = [0, 0, 0],
      d = null;
    if (
      typeof nav.plugins != UNDEF &&
      typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT
    ) {
      d = nav.plugins[SHOCKWAVE_FLASH].description;
      if (d) {
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
        playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
        playerVersion[2] = /r/.test(d)
          ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10)
          : 0;
      }
    } else if (typeof win.ActiveXObject != UNDEF) {
      var a = null,
        fp6Crash = false;
      try {
        a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7");
      } catch (e) {
        try {
          a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6");
          playerVersion = [6, 0, 21];
          a.AllowScriptAccess = "always";
        } catch (e) {
          if (playerVersion[0] == 6) {
            fp6Crash = true;
          }
        }
        if (!fp6Crash) {
          try {
            a = new ActiaveXObject(SHOCKWAVE_FLASH_AX);
          } catch (e) {}
        }
      }
      if (!fp6Crash && a) {
        try {
          d = a.GetVariable("$version");
          if (d) {
            d = d.split(" ")[1].split(",");
            playerVersion = [
              parseInt(d[0], 10),
              parseInt(d[1], 10),
              parseInt(d[2], 10),
            ];
          }
        } catch (e) {}
      }
    }
    var u = nav.userAgent.toLowerCase(),
      p = nav.platform.toLowerCase(),
      webkit = /webkit/.test(u)
        ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1"))
        : false,
      ie = false,
      windows = p ? /win/.test(p) : /win/.test(u),
      mac = p ? /mac/.test(p) : /mac/.test(u);
    return {
      w3cdom: w3cdom,
      pv: playerVersion,
      webkit: webkit,
      ie: ie,
      win: windows,
      mac: mac,
    };
  })();
  var onDomLoad = (function () {
    if (!ua.w3cdom) {
      return;
    }
    addDomLoadEvent(main);
    if (ua.ie && ua.win) {
      try {
        doc.write(
          "<scr" + "ipt id=__ie_ondomload defer=true src=//:></scr" + "ipt>"
        );
        var s = getElementById("__ie_ondomload");
        if (s) {
          s.onreadystatechange = function () {
            if (this.readyState == "complete") {
              this.parentNode.removeChild(this);
              callDomLoadFunctions();
            }
          };
        }
      } catch (e) {}
    }
    if (ua.webkit && typeof doc.readyState != UNDEF) {
      timer = setInterval(function () {
        if (/loaded|complete/.test(doc.readyState)) {
          callDomLoadFunctions();
        }
      }, 10);
    }
    if (typeof doc.addEventListener != UNDEF) {
      doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, null);
    }
    addLoadEvent(callDomLoadFunctions);
  })();
  function callDomLoadFunctions() {
    if (isDomLoaded) {
      return;
    }
    if (ua.ie && ua.win) {
      var s = createElement("span");
      try {
        var t = doc.getElementsByTagName("body")[0].appendChild(s);
        t.parentNode.removeChild(t);
      } catch (e) {
        return;
      }
    }
    isDomLoaded = true;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    var dl = domLoadFnArr.length;
    for (var i = 0; i < dl; i++) {
      domLoadFnArr[i]();
    }
  }
  function addDomLoadEvent(fn) {
    if (isDomLoaded) {
      fn();
    } else {
      domLoadFnArr[domLoadFnArr.length] = fn;
    }
  }
  function addLoadEvent(fn) {
    if (typeof win.addEventListener != UNDEF) {
      win.addEventListener("load", fn, false);
    } else if (typeof doc.addEventListener != UNDEF) {
      doc.addEventListener("load", fn, false);
    } else if (typeof win.attachEvent != UNDEF) {
      win.attachEvent("onload", fn);
    } else if (typeof win.onload == "function") {
      var fnOld = win.onload;
      win.onload = function () {
        fnOld();
        fn();
      };
    } else {
      win.onload = fn;
    }
  }
  function main() {
    var rl = regObjArr.length;
    for (var i = 0; i < rl; i++) {
      var id = regObjArr[i].id;
      if (ua.pv[0] > 0) {
        var obj = getElementById(id);
        if (obj) {
          regObjArr[i].width = obj.getAttribute("width")
            ? obj.getAttribute("width")
            : "0";
          regObjArr[i].height = obj.getAttribute("height")
            ? obj.getAttribute("height")
            : "0";
          if (hasPlayerVersion(regObjArr[i].swfVersion)) {
            if (ua.webkit && ua.webkit < 312) {
              fixParams(obj);
            }
            setVisibility(id, true);
          } else if (
            regObjArr[i].expressInstall &&
            !isExpressInstallActive &&
            hasPlayerVersion("6.0.65") &&
            (ua.win || ua.mac)
          ) {
            showExpressInstall(regObjArr[i]);
          } else {
            displayAltContent(obj);
          }
        }
      } else {
        setVisibility(id, true);
      }
    }
  }
  function fixParams(obj) {
    var nestedObj = obj.getElementsByTagName(OBJECT)[0];
    if (nestedObj) {
      var e = createElement("embed"),
        a = nestedObj.attributes;
      if (a) {
        var al = a.length;
        for (var i = 0; i < al; i++) {
          if (a[i].nodeName.toLowerCase() == "data") {
            e.setAttribute("src", a[i].nodeValue);
          } else {
            e.setAttribute(a[i].nodeName, a[i].nodeValue);
          }
        }
      }
      var c = nestedObj.childNodes;
      if (c) {
        var cl = c.length;
        for (var j = 0; j < cl; j++) {
          if (c[j].nodeType == 1 && c[j].nodeName.toLowerCase() == "param") {
            e.setAttribute(
              c[j].getAttribute("name"),
              c[j].getAttribute("value")
            );
          }
        }
      }
      obj.parentNode.replaceChild(e, obj);
    }
  }
  function fixObjectLeaks(id) {
    if (ua.ie && ua.win && hasPlayerVersion("8.0.0")) {
      win.attachEvent("onunload", function () {
        var obj = getElementById(id);
        if (obj) {
          for (var i in obj) {
            if (typeof obj[i] == "function") {
              obj[i] = function () {};
            }
          }
          obj.parentNode.removeChild(obj);
        }
      });
    }
  }
  function showExpressInstall(regObj) {
    isExpressInstallActive = true;
    var obj = getElementById(regObj.id);
    if (obj) {
      if (regObj.altContentId) {
        var ac = getElementById(regObj.altContentId);
        if (ac) {
          storedAltContent = ac;
          storedAltContentId = regObj.altContentId;
        }
      } else {
        storedAltContent = abstractAltContent(obj);
      }
      if (!/%$/.test(regObj.width) && parseInt(regObj.width, 10) < 310) {
        regObj.width = "310";
      }
      if (!/%$/.test(regObj.height) && parseInt(regObj.height, 10) < 137) {
        regObj.height = "137";
      }
      doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
      var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
        dt = doc.title,
        fv =
          "MMredirectURL=" +
          win.location +
          "&MMplayerType=" +
          pt +
          "&MMdoctitle=" +
          dt,
        replaceId = regObj.id;
      if (ua.ie && ua.win && obj.readyState != 4) {
        var newObj = createElement("div");
        replaceId += "SWFObjectNew";
        newObj.setAttribute("id", replaceId);
        obj.parentNode.insertBefore(newObj, obj);
        obj.style.display = "none";
        win.attachEvent("onload", function () {
          obj.parentNode.removeChild(obj);
        });
      }
      createSWF(
        {
          data: regObj.expressInstall,
          id: EXPRESS_INSTALL_ID,
          width: regObj.width,
          height: regObj.height,
        },
        { flashvars: fv },
        replaceId
      );
    }
  }
  function displayAltContent(obj) {
    if (ua.ie && ua.win && obj.readyState != 4) {
      var el = createElement("div");
      obj.parentNode.insertBefore(el, obj);
      el.parentNode.replaceChild(abstractAltContent(obj), el);
      obj.style.display = "none";
      win.attachEvent("onload", function () {
        obj.parentNode.removeChild(obj);
      });
    } else {
      obj.parentNode.replaceChild(abstractAltContent(obj), obj);
    }
  }
  function abstractAltContent(obj) {
    var ac = createElement("div");
    if (ua.win && ua.ie) {
      ac.innerHTML = obj.innerHTML;
    } else {
      var nestedObj = obj.getElementsByTagName(OBJECT)[0];
      if (nestedObj) {
        var c = nestedObj.childNodes;
        if (c) {
          var cl = c.length;
          for (var i = 0; i < cl; i++) {
            if (
              !(c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "param") &&
              !(c[i].nodeType == 8)
            ) {
              ac.appendChild(c[i].cloneNode(true));
            }
          }
        }
      }
    }
    return ac;
  }
  function createSWF(attObj, parObj, id) {
    var r,
      el = getElementById(id);
    if (typeof attObj.id == UNDEF) {
      attObj.id = id;
    }
    if (ua.ie && ua.win) {
      var att = "";
      for (var i in attObj) {
        if (attObj[i] != Object.prototype[i]) {
          if (i == "data") {
            parObj.movie = attObj[i];
          } else if (i.toLowerCase() == "styleclass") {
            att += ' class="' + attObj[i] + '"';
          } else if (i != "classid") {
            att += " " + i + '="' + attObj[i] + '"';
          }
        }
      }
      var par = "";
      for (var j in parObj) {
        if (parObj[j] != Object.prototype[j]) {
          par += '<param name="' + j + '" value="' + parObj[j] + '" />';
        }
      }
      el.outerHTML =
        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
        att +
        ">" +
        par +
        "</object>";
      fixObjectLeaks(attObj.id);
      r = getElementById(attObj.id);
    } else if (ua.webkit && ua.webkit < 312) {
      var e = createElement("embed");
      e.setAttribute("type", FLASH_MIME_TYPE);
      for (var k in attObj) {
        if (attObj[k] != Object.prototype[k]) {
          if (k == "data") {
            e.setAttribute("src", attObj[k]);
          } else if (k.toLowerCase() == "styleclass") {
            e.setAttribute("class", attObj[k]);
          } else if (k != "classid") {
            e.setAttribute(k, attObj[k]);
          }
        }
      }
      for (var l in parObj) {
        if (parObj[l] != Object.prototype[l]) {
          if (l != "movie") {
            e.setAttribute(l, parObj[l]);
          }
        }
      }
      el.parentNode.replaceChild(e, el);
      r = e;
    } else {
      var o = createElement(OBJECT);
      o.setAttribute("type", FLASH_MIME_TYPE);
      for (var m in attObj) {
        if (attObj[m] != Object.prototype[m]) {
          if (m.toLowerCase() == "styleclass") {
            o.setAttribute("class", attObj[m]);
          } else if (m != "classid") {
            o.setAttribute(m, attObj[m]);
          }
        }
      }
      for (var n in parObj) {
        if (parObj[n] != Object.prototype[n] && n != "movie") {
          createObjParam(o, n, parObj[n]);
        }
      }
      el.parentNode.replaceChild(o, el);
      r = o;
    }
    return r;
  }
  function createObjParam(el, pName, pValue) {
    var p = createElement("param");
    p.setAttribute("name", pName);
    p.setAttribute("value", pValue);
    el.appendChild(p);
  }
  function getElementById(id) {
    return doc.getElementById(id);
  }
  function createElement(el) {
    return doc.createElement(el);
  }
  function hasPlayerVersion(rv) {
    var pv = ua.pv,
      v = rv.split(".");
    v[0] = parseInt(v[0], 10);
    v[1] = parseInt(v[1], 10);
    v[2] = parseInt(v[2], 10);
    return pv[0] > v[0] ||
      (pv[0] == v[0] && pv[1] > v[1]) ||
      (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])
      ? true
      : false;
  }
  function createCSS(sel, decl) {
    if (ua.ie && ua.mac) {
      return;
    }
    var h = doc.getElementsByTagName("head")[0],
      s = createElement("style");
    s.setAttribute("type", "text/css");
    s.setAttribute("media", "screen");
    if (!(ua.ie && ua.win) && typeof doc.createTextNode != UNDEF) {
      s.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
    }
    h.appendChild(s);
    if (
      ua.ie &&
      ua.win &&
      typeof doc.styleSheets != UNDEF &&
      doc.styleSheets.length > 0
    ) {
      var ls = doc.styleSheets[doc.styleSheets.length - 1];
      if (typeof ls.addRule == OBJECT) {
        ls.addRule(sel, decl);
      }
    }
  }
  function setVisibility(id, isVisible) {
    var v = isVisible ? "inherit" : "hidden";
    if (isDomLoaded) {
      getElementById(id).style.visibility = v;
    } else {
      createCSS("#" + id, "visibility:" + v);
    }
  }
  function getTargetVersion(obj) {
    if (!obj) return 0;
    var c = obj.childNodes;
    var cl = c.length;
    for (var i = 0; i < cl; i++) {
      if (c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "object") {
        c = c[i].childNodes;
        cl = c.length;
        i = 0;
      }
      if (
        c[i].nodeType == 1 &&
        c[i].nodeName.toLowerCase() == "param" &&
        c[i].getAttribute("name") == "swfversion"
      ) {
        return c[i].getAttribute("value");
      }
    }
    return 0;
  }
  function getExpressInstall(obj) {
    if (!obj) return "";
    var c = obj.childNodes;
    var cl = c.length;
    for (var i = 0; i < cl; i++) {
      if (c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "object") {
        c = c[i].childNodes;
        cl = c.length;
        i = 0;
      }
      if (
        c[i].nodeType == 1 &&
        c[i].nodeName.toLowerCase() == "param" &&
        c[i].getAttribute("name") == "expressinstall"
      ) {
        return c[i].getAttribute("value");
      }
    }
    return "";
  }
  return {
    registerObject: function (objectIdStr, swfVersionStr, xiSwfUrlStr) {
      if (!ua.w3cdom || !objectIdStr) {
        return;
      }
      var obj = document.getElementById(objectIdStr);
      var xi = getExpressInstall(obj);
      var regObj = {};
      regObj.id = objectIdStr;
      regObj.swfVersion = swfVersionStr ? swfVersionStr : getTargetVersion(obj);
      regObj.expressInstall = xiSwfUrlStr ? xiSwfUrlStr : xi != "" ? xi : false;
      regObjArr[regObjArr.length] = regObj;
      setVisibility(objectIdStr, false);
    },
    getObjectById: function (objectIdStr) {
      var r = null;
      if (ua.w3cdom && isDomLoaded) {
        var o = getElementById(objectIdStr);
        if (o) {
          var n = o.getElementsByTagName(OBJECT)[0];
          if (!n || (n && typeof o.SetVariable != UNDEF)) {
            r = o;
          } else if (typeof n.SetVariable != UNDEF) {
            r = n;
          }
        }
      }
      return r;
    },
    embedSWF: function (
      swfUrlStr,
      replaceElemIdStr,
      widthStr,
      heightStr,
      swfVersionStr,
      xiSwfUrlStr,
      flashvarsObj,
      parObj,
      attObj
    ) {
      if (
        !ua.w3cdom ||
        !swfUrlStr ||
        !replaceElemIdStr ||
        !widthStr ||
        !heightStr ||
        !swfVersionStr
      ) {
        return;
      }
      widthStr += "";
      heightStr += "";
      if (hasPlayerVersion(swfVersionStr)) {
        setVisibility(replaceElemIdStr, false);
        var att = typeof attObj == OBJECT ? attObj : {};
        att.data = swfUrlStr;
        att.width = widthStr;
        att.height = heightStr;
        var par = typeof parObj == OBJECT ? parObj : {};
        if (typeof flashvarsObj == OBJECT) {
          for (var i in flashvarsObj) {
            if (flashvarsObj[i] != Object.prototype[i]) {
              if (typeof par.flashvars != UNDEF) {
                par.flashvars += "&" + i + "=" + flashvarsObj[i];
              } else {
                par.flashvars = i + "=" + flashvarsObj[i];
              }
            }
          }
        }
        addDomLoadEvent(function () {
          createSWF(att, par, replaceElemIdStr);
          if (att.id == replaceElemIdStr) {
            setVisibility(replaceElemIdStr, true);
          }
        });
      } else if (
        xiSwfUrlStr &&
        !isExpressInstallActive &&
        hasPlayerVersion("6.0.65") &&
        (ua.win || ua.mac)
      ) {
        setVisibility(replaceElemIdStr, false);
        addDomLoadEvent(function () {
          var regObj = {};
          regObj.id = regObj.altContentId = replaceElemIdStr;
          regObj.width = widthStr;
          regObj.height = heightStr;
          regObj.expressInstall = xiSwfUrlStr;
          showExpressInstall(regObj);
        });
      }
    },
    getFlashPlayerVersion: function () {
      return { major: ua.pv[0], minor: ua.pv[1], release: ua.pv[2] };
    },
    hasFlashPlayerVersion: hasPlayerVersion,
    createSWF: function (attObj, parObj, replaceElemIdStr) {
      if (ua.w3cdom && isDomLoaded) {
        return createSWF(attObj, parObj, replaceElemIdStr);
      } else {
        return undefined;
      }
    },
    createCSS: function (sel, decl) {
      if (ua.w3cdom) {
        createCSS(sel, decl);
      }
    },
    addDomLoadEvent: addDomLoadEvent,
    addLoadEvent: addLoadEvent,
    getQueryParamValue: function (param) {
      var q = doc.location.search || doc.location.hash;
      if (param == null) {
        return q;
      }
      if (q) {
        var pairs = q.substring(1).split("&");
        for (var i = 0; i < pairs.length; i++) {
          if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
            return pairs[i].substring(pairs[i].indexOf("=") + 1);
          }
        }
      }
      return "";
    },
    expressInstallCallback: function () {
      if (isExpressInstallActive && storedAltContent) {
        var obj = getElementById(EXPRESS_INSTALL_ID);
        if (obj) {
          obj.parentNode.replaceChild(storedAltContent, obj);
          if (storedAltContentId) {
            setVisibility(storedAltContentId, true);
            if (ua.ie && ua.win) {
              storedAltContent.style.display = "block";
            }
          }
          storedAltContent = null;
          storedAltContentId = null;
          isExpressInstallActive = false;
        }
      }
    },
  };
})();
(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  var _previousResizeWidth = -1,
    _updateTimeout = -1;
  var _parse = function (value) {
    return parseFloat(value) || 0;
  };
  var _rows = function (elements) {
    var tolerance = 1,
      $elements = $(elements),
      lastTop = null,
      rows = [];
    $elements.each(function () {
      var $that = $(this),
        top = $that.offset().top - _parse($that.css("margin-top")),
        lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
      if (lastRow === null) {
        rows.push($that);
      } else {
        if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
          rows[rows.length - 1] = lastRow.add($that);
        } else {
          rows.push($that);
        }
      }
      lastTop = top;
    });
    return rows;
  };
  var _parseOptions = function (options) {
    var opts = { byRow: true, property: "height", target: null, remove: false };
    if (typeof options === "object") {
      return $.extend(opts, options);
    }
    if (typeof options === "boolean") {
      opts.byRow = options;
    } else if (options === "remove") {
      opts.remove = true;
    }
    return opts;
  };
  var matchHeight = ($.fn.matchHeight = function (options) {
    var opts = _parseOptions(options);
    if (opts.remove) {
      var that = this;
      this.css(opts.property, "");
      $.each(matchHeight._groups, function (key, group) {
        group.elements = group.elements.not(that);
      });
      return this;
    }
    if (this.length <= 1 && !opts.target) {
      return this;
    }
    matchHeight._groups.push({ elements: this, options: opts });
    matchHeight._apply(this, opts);
    return this;
  });
  matchHeight.version = "0.7.0";
  matchHeight._groups = [];
  matchHeight._throttle = 80;
  matchHeight._maintainScroll = false;
  matchHeight._beforeUpdate = null;
  matchHeight._afterUpdate = null;
  matchHeight._rows = _rows;
  matchHeight._parse = _parse;
  matchHeight._parseOptions = _parseOptions;
  matchHeight._apply = function (elements, options) {
    var opts = _parseOptions(options),
      $elements = $(elements),
      rows = [$elements];
    var scrollTop = $(window).scrollTop(),
      htmlHeight = $("html").outerHeight(true);
    var $hiddenParents = $elements.parents().filter(":hidden");
    $hiddenParents.each(function () {
      var $that = $(this);
      $that.data("style-cache", $that.attr("style"));
    });
    $hiddenParents.css("display", "block");
    if (opts.byRow && !opts.target) {
      $elements.each(function () {
        var $that = $(this),
          display = $that.css("display");
        if (
          display !== "inline-block" &&
          display !== "flex" &&
          display !== "inline-flex"
        ) {
          display = "block";
        }
        $that.data("style-cache", $that.attr("style"));
        $that.css({
          display: display,
          "padding-top": "0",
          "padding-bottom": "0",
          "margin-top": "0",
          "margin-bottom": "0",
          "border-top-width": "0",
          "border-bottom-width": "0",
          height: "100px",
          overflow: "hidden",
        });
      });
      rows = _rows($elements);
      $elements.each(function () {
        var $that = $(this);
        $that.attr("style", $that.data("style-cache") || "");
      });
    }
    $.each(rows, function (key, row) {
      var $row = $(row),
        targetHeight = 0;
      if (!opts.target) {
        if (opts.byRow && $row.length <= 1) {
          $row.css(opts.property, "");
          return;
        }
        $row.each(function () {
          var $that = $(this),
            style = $that.attr("style"),
            display = $that.css("display");
          if (
            display !== "inline-block" &&
            display !== "flex" &&
            display !== "inline-flex"
          ) {
            display = "block";
          }
          var css = { display: display };
          css[opts.property] = "";
          $that.css(css);
          if ($that.outerHeight(false) > targetHeight) {
            targetHeight = $that.outerHeight(false);
          }
          if (style) {
            $that.attr("style", style);
          } else {
            $that.css("display", "");
          }
        });
      } else {
        targetHeight = opts.target.outerHeight(false);
      }
      $row.each(function () {
        var $that = $(this),
          verticalPadding = 0;
        if (opts.target && $that.is(opts.target)) {
          return;
        }
        if ($that.css("box-sizing") !== "border-box") {
          verticalPadding +=
            _parse($that.css("border-top-width")) +
            _parse($that.css("border-bottom-width"));
          verticalPadding +=
            _parse($that.css("padding-top")) +
            _parse($that.css("padding-bottom"));
        }
        $that.css(opts.property, targetHeight - verticalPadding + "px");
      });
    });
    $hiddenParents.each(function () {
      var $that = $(this);
      $that.attr("style", $that.data("style-cache") || null);
    });
    if (matchHeight._maintainScroll) {
      $(window).scrollTop(
        (scrollTop / htmlHeight) * $("html").outerHeight(true)
      );
    }
    return this;
  };
  matchHeight._applyDataApi = function () {
    var groups = {};
    $("[data-match-height], [data-mh]").each(function () {
      var $this = $(this),
        groupId = $this.attr("data-mh") || $this.attr("data-match-height");
      if (groupId in groups) {
        groups[groupId] = groups[groupId].add($this);
      } else {
        groups[groupId] = $this;
      }
    });
    $.each(groups, function () {
      this.matchHeight(true);
    });
  };
  var _update = function (event) {
    if (matchHeight._beforeUpdate) {
      matchHeight._beforeUpdate(event, matchHeight._groups);
    }
    $.each(matchHeight._groups, function () {
      matchHeight._apply(this.elements, this.options);
    });
    if (matchHeight._afterUpdate) {
      matchHeight._afterUpdate(event, matchHeight._groups);
    }
  };
  matchHeight._update = function (throttle, event) {
    if (event && event.type === "resize") {
      var windowWidth = $(window).width();
      if (windowWidth === _previousResizeWidth) {
        return;
      }
      _previousResizeWidth = windowWidth;
    }
    if (!throttle) {
      _update(event);
    } else if (_updateTimeout === -1) {
      _updateTimeout = setTimeout(function () {
        _update(event);
        _updateTimeout = -1;
      }, matchHeight._throttle);
    }
  };
  $(matchHeight._applyDataApi);
  $(window).bind("load", function (event) {
    matchHeight._update(false, event);
  });
  $(window).bind("resize orientationchange", function (event) {
    matchHeight._update(true, event);
  });
});
$(function () {
  $(".home-slider").slick({
    arrows: false,
    infinite: true,
    autoplay: true,
    pauseOnFocus: false,
    dots: true,
    fade: true,
    autoplaySpeed: 6000,
    speed: 400,
  });
  $(".home-slider").on("afterChange", function (event, slick, currentSlide) {
    var vid = $(slick.$slides[currentSlide]).find("video");
    if (vid.length > 0) $(vid).get(0).play();
  });
  $(".carousel-box").slick({
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 960, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  });
  $(".partner-companies-carousel").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
      { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  });
  $(".c-arrows .ar-prev").on("click", function () {
    $(".carousel-box .slick-prev").trigger("click");
  });
  $(".c-arrows .ar-next").on("click", function () {
    $(".carousel-box .slick-next").trigger("click");
  });
  $(".mobile-carousel").slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  $(".backbg").each(function () {
    var backbgPath = $(this).attr("src");
    $(this)
      .parent(".backbgbox")
      .css("background-image", "url(" + backbgPath + ")");
  });
  $(".tab-links ul li a").on("click", function () {
    $(this).parent("li").toggleClass("open");
    $(this).parent("li").siblings("li").removeClass("open");
    var hat1 = $(this).attr("href");
    $(hat1).siblings("div.tab-detail").hide();
    $(hat1).show();
    return false;
  });
  $(".contact-tabs ul li a").on("click", function () {
    $(this).parent("div").parent("li").toggleClass("open");
    $(this).parent("div").parent("li").siblings("li").removeClass("open");
    var hat1 = $(this).attr("href");
    $(hat1).siblings("div.tab-detail").hide();
    $(hat1).show();
    return false;
  });
  $(".mobile-select ul li a").on("click", function () {
    $(this).parent("li").parent("ul").slideToggle(200);
    var toggleText2 = $(this).text();
    $(this)
      .parent("li")
      .parent("ul")
      .siblings("div")
      .children("span.drtext")
      .text(toggleText2);
    $(this).parent("li").toggleClass("open");
    $(this).parent("li").siblings("li").removeClass("open");
    var hat1 = $(this).attr("href");
    $(hat1).show();
    return false;
  });
  $(".tabs-box .tab-links ul").clone().appendTo(".tab-links-mobile");
  $(".tab-links-mobile .dropdown").click(function () {
    $(this).next("ul").slideToggle(200);
  });
  $(".tab-links-mobile ul li").on("click", function () {
    var toggleText = $(this).find("a").text();
    $(".tab-links-mobile ul").slideUp();
    $(".drtext").text(toggleText);
    $(this).toggleClass("open");
    $(this).siblings("li").removeClass("open");
    var hat2 = $(this).children("a").attr("href");
    $(hat2).siblings("div.tab-detail").hide();
    $(hat2).show();
    var hat3 = $(this).children("a").attr("href");
    $(hat2).parent("li").siblings("li").removeClass("showme");
    $(hat2).parent("li").addClass("showme");
    $(".mobile-carousel").slick("setPosition");
    return false;
  });
  $(".mobile-select .dropdown").click(function () {
    $(this).next("ul").slideToggle(200);
  });
  $(".mobile-select ul li").on("click", function () {
    var toggleText = $(this).find("a").text();
    $(".drtext-c").text(toggleText);
    $(this).toggleClass("open");
    $(this).siblings("li").removeClass("open");
    var hat2 = $(this).children("a").attr("href");
    $(hat2).siblings("div.tab-detail").hide();
    $(hat2).show();
    var hat3 = $(this).children("a").attr("href");
    $(hat2).parent("li").siblings("li").removeClass("showme");
    $(hat2).parent("li").addClass("showme");
    $(".mobile-carousel").slick("setPosition");
    return false;
  });
  if ($(window).width() < 960) {
    $(".mainnav > ul > li:has(>ul)").on("click", function () {
      $(this).find(">ul").slideToggle();
      $(this).siblings("li:has(>ul)").find(">ul").hide();
    });
  }
  $(".mobilemenu_btn").on("click", function () {
    $(".mainnav").slideToggle();
    if ($(".mainnav ul li ul").is(":visible")) {
      $(".mainnav ul li ul").slideUp();
    }
  });
  $(".th-dots").on("click", function () {
    $("body").toggleClass("mobmenuopen");
  });
  $(".to-load-more0").each(function (i) {
    var $this = $(this);
    x = 6;
    x1 = x;
    size_li = $this.find("ul.mob-carousel-content li").size();
    if (size_li < x) {
      $this.find(".show-more").css({ visibility: "hidden" });
    }
    $this.find("ul li:lt(" + x + ")").show();
    $this.find(".show-more").click(function () {
      x = x + 3 <= size_li ? x + 3 : size_li;
      $this.find("ul li:lt(" + x + ")").show();
      var avdown = $this.find("ul li:visible").size();
      if (avdown >= size_li) {
        $this.addClass("alldown");
      }
      return false;
    });
    $this.find(".collapse").click(function () {
      $this.removeClass("alldown");
      $this.find("ul li").hide();
      $this.find("ul li:lt(" + x1 + ")").show();
      x = x1;
    });
  });
  $(".to-load-more1").each(function (i) {
    var $this = $(this);
    y = 6;
    y1 = y;
    size_li1 = $this.find("ul.mob-carousel-content li").size();
    if (size_li1 < y) {
      $this.find(".show-more").css({ visibility: "hidden" });
    }
    $this.find("ul li:lt(" + y + ")").show();
    $this.find(".show-more").click(function () {
      y = y + 3 <= size_li1 ? y + 3 : size_li1;
      $this.find("ul li:lt(" + y + ")").show();
      var avdown1 = $this.find("ul li:visible").size();
      if (avdown1 >= size_li1) {
        $this.addClass("alldown");
      }
      return false;
    });
    $this.find(".collapse").click(function () {
      $this.removeClass("alldown");
      $this.find("ul li").hide();
      $this.find("ul li:lt(" + y1 + ")").show();
      y = y1;
    });
  });
  $(".to-load-more2").each(function (i) {
    var $this = $(this);
    z = 6;
    z1 = z;
    size_li2 = $this.find("ul.mob-carousel-content li").size();
    if (size_li2 < z) {
      $this.find(".show-more").css({ visibility: "hidden" });
    }
    $this.find("ul li:lt(" + z + ")").show();
    $this.find(".show-more").click(function () {
      z = z + 3 <= size_li2 ? z + 3 : size_li2;
      $this.find("ul li:lt(" + z + ")").show();
      var avdown2 = $this.find("ul li:visible").size();
      if (avdown2 >= size_li2) {
        $this.addClass("alldown");
      }
      return false;
    });
    $this.find(".collapse").click(function () {
      $this.removeClass("alldown");
      $this.find("ul li").hide();
      $this.find("ul li:lt(" + z1 + ")").show();
      z = z1;
    });
  });
  $("marquee")
    .on("mouseover", function () {
      $(this).attr("scrollamount", 0);
    })
    .mouseout(function () {
      $(this).attr("scrollamount", 5);
    });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $("body").addClass("sticky");
    } else {
      $("body").removeClass("sticky");
    }
  });
  if ($(this).scrollTop() > 20) {
    $("body").addClass("sticky");
  } else {
    $("body").removeClass("sticky");
  }
});
function sticky_relocate() {
  var window_top = $(window).scrollTop();
  var nav = $("#sticky-anchor");
  if (nav.length) {
    var div_top = nav.offset().top;
    if (window_top > div_top - 80) {
      $(".search-bar").addClass("stick");
      $("#sticky-anchor").height($(".search-bar").outerHeight());
    } else {
      $(".search-bar").removeClass("stick");
      $("#sticky-anchor").height(0);
    }
  }
}
$(function () {
  $(window).scroll(sticky_relocate);
  sticky_relocate();
});
var dir = 1;
var MIN_TOP = 200;
var MAX_TOP = 350;
function autoscroll() {
  var window_top = $(window).scrollTop() + dir;
  if (window_top >= MAX_TOP) {
    window_top = MAX_TOP;
    dir = -1;
  } else if (window_top <= MIN_TOP) {
    window_top = MIN_TOP;
    dir = 1;
  }
  $(window).scrollTop(window_top);
  window.setTimeout(autoscroll, 100);
}
function wordTrim(value, length, overflowSuffix) {
  if (value.length <= length) return value;
  var strAry = value.split(" ");
  var retLen = strAry[0].length;
  for (var i = 1; i < strAry.length; i++) {
    if (retLen == length || retLen + strAry[i].length + 1 > length) break;
    retLen += strAry[i].length + 1;
  }
  return strAry.slice(0, i).join(" ") + (overflowSuffix || "");
}
$(document).ready(function (e) {
  function t(t) {
    e(t).bind("click", function (t) {
      t.preventDefault();
      e(this).parent().fadeOut();
    });
  }
  e(".dropdown-toggle").click(function () {
    $(".submenu-change").removeClass("active-link");
    $(".right-column-wrap > div.submenu-change-default:nth-of-type(1)").show();
    var t = e(this)
      .parent(".button-dropdown")
      .children(".dropdown-menu")
      .is(":hidden");
    e(".dropdown-menu").hide();
    e(".dropdown-toggle").removeClass("active");
    if (t) {
      e(this)
        .parent(".button-dropdown")
        .children(".dropdown-menu")
        .toggle()
        .parent(".button-dropdown")
        .children(".dropdown-toggle")
        .addClass("active");
    }
  });
  e(document).bind("click", function (t) {
    var n = e(t.target);
    if (!n.parents().hasClass("button-dropdown"))
      e(".button-dropdown .dropdown-menu").hide();
  });
  e(document).bind("click", function (t) {
    var n = e(t.target);
    if (!n.parents().hasClass("button-dropdown"))
      e(".button-dropdown .dropdown-toggle").removeClass("active");
  });
});
$("div.first-sub").hover(function () {
  var num = $(this).data("menulink");
  $("#secondsub-" + num).toggleClass("active-link");
  $(
    ".right-column-wrap > div.submenu-change-default:nth-of-type(1)"
  ).toggleClass("hide-default");
});
$("div.submenu-change").hover(function () {
  $(this).toggleClass("active-link");
  $(
    ".right-column-wrap > div.submenu-change-default:nth-of-type(1)"
  ).toggleClass("hide-default");
});
$(".dropdown-menu").mouseleave(function () {
  $(".right-column-wrap > div.submenu-change-default:nth-of-type(1)").show();
});
$(".left-column-wrap").hover(function () {
  $(this).toggleClass("active-default");
});
$("#show-mobile-menu").on("click", function () {
  $("body").toggleClass("mobmenuopen");
});
$(".contact-tabs ul li a").on("click", function () {
  $(this).parent("div").parent("li").toggleClass("open");
  $(this).parent("div").parent("li").siblings("li").removeClass("open");
  var hat1 = $(this).attr("href");
  $(hat1).siblings("div.tab-detail").hide();
  $(hat1).show();
  return false;
});
(function ($) {
  var ico = $('<span class="arrow"></span>');
  $("#mobile-main-menu > li:has(ul) > a").on("click", function () {
    $(this).parent("li").toggleClass("open");
  });
  $(".mobile-sub-menu > li:has(ul) > a").append(ico);
  $(".mobile-sub-menu > li:has(ul) > a ").on("click", function () {
    $(this).parent("li").toggleClass("open-sub");
  });
})(jQuery);
function videoClose() {
  location.reload();
}
!(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], function ($) {
      return factory(root, $);
    });
  } else if (typeof exports === "object") {
    factory(root, require("jquery"));
  } else {
    factory(root, root.jQuery || root.Zepto);
  }
})(this, function (global, $) {
  "use strict";
  var PLUGIN_NAME = "popup";
  var NAMESPACE =
    (global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE) || PLUGIN_NAME;
  var ANIMATIONSTART_EVENTS = $.map(
    [
      "animationstart",
      "webkitAnimationStart",
      "MSAnimationStart",
      "oAnimationStart",
    ],
    function (eventName) {
      return eventName + "." + NAMESPACE;
    }
  ).join(" ");
  var ANIMATIONEND_EVENTS = $.map(
    ["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"],
    function (eventName) {
      return eventName + "." + NAMESPACE;
    }
  ).join(" ");
  var DEFAULTS = $.extend(
    {
      hashTracking: true,
      closeOnConfirm: true,
      closeOnCancel: true,
      closeOnEscape: true,
      closeOnOutsideClick: true,
      modifier: "",
    },
    global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS
  );
  var STATES = {
    CLOSING: "closing",
    CLOSED: "closed",
    OPENING: "opening",
    OPENED: "opened",
  };
  var STATE_CHANGE_REASONS = {
    CONFIRMATION: "confirmation",
    CANCELLATION: "cancellation",
  };
  var IS_ANIMATION = (function () {
    var style = document.createElement("div").style;
    return (
      style.animationName !== undefined ||
      style.WebkitAnimationName !== undefined ||
      style.MozAnimationName !== undefined ||
      style.msAnimationName !== undefined ||
      style.OAnimationName !== undefined
    );
  })();
  var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform);
  var current;
  var scrollTop;
  function getAnimationDuration($elem) {
    if (
      IS_ANIMATION &&
      $elem.css("animation-name") === "none" &&
      $elem.css("-webkit-animation-name") === "none" &&
      $elem.css("-moz-animation-name") === "none" &&
      $elem.css("-o-animation-name") === "none" &&
      $elem.css("-ms-animation-name") === "none"
    ) {
      return 0;
    }
    var duration =
      $elem.css("animation-duration") ||
      $elem.css("-webkit-animation-duration") ||
      $elem.css("-moz-animation-duration") ||
      $elem.css("-o-animation-duration") ||
      $elem.css("-ms-animation-duration") ||
      "0s";
    var delay =
      $elem.css("animation-delay") ||
      $elem.css("-webkit-animation-delay") ||
      $elem.css("-moz-animation-delay") ||
      $elem.css("-o-animation-delay") ||
      $elem.css("-ms-animation-delay") ||
      "0s";
    var iterationCount =
      $elem.css("animation-iteration-count") ||
      $elem.css("-webkit-animation-iteration-count") ||
      $elem.css("-moz-animation-iteration-count") ||
      $elem.css("-o-animation-iteration-count") ||
      $elem.css("-ms-animation-iteration-count") ||
      "1";
    var max;
    var len;
    var num;
    var i;
    duration = duration.split(", ");
    delay = delay.split(", ");
    iterationCount = iterationCount.split(", ");
    for (
      i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY;
      i < len;
      i++
    ) {
      num =
        parseFloat(duration[i]) * parseInt(iterationCount[i], 10) +
        parseFloat(delay[i]);
      if (num > max) {
        max = num;
      }
    }
    return num;
  }
  function getScrollbarWidth() {
    if ($(document.body).height() <= $(window).height()) {
      return 0;
    }
    var outer = document.createElement("div");
    var inner = document.createElement("div");
    var widthNoScroll;
    var widthWithScroll;
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);
    widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    inner.style.width = "100%";
    outer.appendChild(inner);
    widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  }
  function lockScreen() {
    if (IS_IOS) {
      return;
    }
    var $html = $("html");
    var lockedClass = namespacify("is-locked");
    var paddingRight;
    var $body;
    if (!$html.hasClass(lockedClass)) {
      $body = $(document.body);
      paddingRight =
        parseInt($body.css("padding-right"), 10) + getScrollbarWidth();
      $body.css("padding-right", paddingRight + "px");
      $html.addClass(lockedClass);
    }
  }
  function unlockScreen() {
    if (IS_IOS) {
      return;
    }
    var $html = $("html");
    var lockedClass = namespacify("is-locked");
    var paddingRight;
    var $body;
    if ($html.hasClass(lockedClass)) {
      $body = $(document.body);
      paddingRight =
        parseInt($body.css("padding-right"), 10) - getScrollbarWidth();
      $body.css("padding-right", paddingRight + "px");
      $html.removeClass(lockedClass);
    }
  }
  function setState(instance, state, isSilent, reason) {
    var newState = namespacify("is", state);
    var allStates = [
      namespacify("is", STATES.CLOSING),
      namespacify("is", STATES.OPENING),
      namespacify("is", STATES.CLOSED),
      namespacify("is", STATES.OPENED),
    ].join(" ");
    instance.$bg.removeClass(allStates).addClass(newState);
    instance.$overlay.removeClass(allStates).addClass(newState);
    instance.$wrapper.removeClass(allStates).addClass(newState);
    instance.$modal.removeClass(allStates).addClass(newState);
    instance.state = state;
    !isSilent &&
      instance.$modal.trigger({ type: state, reason: reason }, [
        { reason: reason },
      ]);
  }
  function syncWithAnimation(doBeforeAnimation, doAfterAnimation, instance) {
    var runningAnimationsCount = 0;
    var handleAnimationStart = function (e) {
      if (e.target !== this) {
        return;
      }
      runningAnimationsCount++;
    };
    var handleAnimationEnd = function (e) {
      if (e.target !== this) {
        return;
      }
      if (--runningAnimationsCount === 0) {
        $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (
          index,
          elemName
        ) {
          instance[elemName].off(
            ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS
          );
        });
        doAfterAnimation();
      }
    };
    $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (
      index,
      elemName
    ) {
      instance[elemName]
        .on(ANIMATIONSTART_EVENTS, handleAnimationStart)
        .on(ANIMATIONEND_EVENTS, handleAnimationEnd);
    });
    doBeforeAnimation();
    if (
      getAnimationDuration(instance.$bg) === 0 &&
      getAnimationDuration(instance.$overlay) === 0 &&
      getAnimationDuration(instance.$wrapper) === 0 &&
      getAnimationDuration(instance.$modal) === 0
    ) {
      $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (
        index,
        elemName
      ) {
        instance[elemName].off(
          ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS
        );
      });
      doAfterAnimation();
    }
  }
  function halt(instance) {
    if (instance.state === STATES.CLOSED) {
      return;
    }
    $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (
      index,
      elemName
    ) {
      instance[elemName].off(ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS);
    });
    instance.$bg.removeClass(instance.settings.modifier);
    instance.$overlay.removeClass(instance.settings.modifier).hide();
    instance.$wrapper.hide();
    unlockScreen();
    setState(instance, STATES.CLOSED, true);
  }
  function parseOptions(str) {
    var obj = {};
    var arr;
    var len;
    var val;
    var i;
    str = str.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",");
    arr = str.split(",");
    for (i = 0, len = arr.length; i < len; i++) {
      arr[i] = arr[i].split(":");
      val = arr[i][1];
      if (typeof val === "string" || val instanceof String) {
        val = val === "true" || (val === "false" ? false : val);
      }
      if (typeof val === "string" || val instanceof String) {
        val = !isNaN(val) ? +val : val;
      }
      obj[arr[i][0]] = val;
    }
    return obj;
  }
  function namespacify() {
    var result = NAMESPACE;
    for (var i = 0; i < arguments.length; ++i) {
      result += "-" + arguments[i];
    }
    return result;
  }
  function handleHashChangeEvent() {
    var id = location.hash.replace("#", "");
    var instance;
    var $elem;
    if (!id) {
      if (
        current &&
        current.state === STATES.OPENED &&
        current.settings.hashTracking
      ) {
        current.close();
      }
    } else {
      try {
        $elem = $("[data-" + PLUGIN_NAME + '-id="' + id + '"]');
      } catch (err) {}
      if ($elem && $elem.length) {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];
        if (instance && instance.settings.hashTracking) {
          instance.open();
        }
      }
    }
  }
  function Remodal($modal, options) {
    var $body = $(document.body);
    var popup = this;
    popup.settings = $.extend({}, DEFAULTS, options);
    popup.index = $[PLUGIN_NAME].lookup.push(popup) - 1;
    popup.state = STATES.CLOSED;
    popup.$overlay = $("." + namespacify("overlay"));
    if (!popup.$overlay.length) {
      popup.$overlay = $("<div>")
        .addClass(
          namespacify("overlay") + " " + namespacify("is", STATES.CLOSED)
        )
        .hide();
      $body.append(popup.$overlay);
    }
    popup.$bg = $("." + namespacify("bg")).addClass(
      namespacify("is", STATES.CLOSED)
    );
    popup.$modal = $modal
      .addClass(
        NAMESPACE +
          " " +
          namespacify("is-initialized") +
          " " +
          popup.settings.modifier +
          " " +
          namespacify("is", STATES.CLOSED)
      )
      .attr("tabindex", "-1");
    popup.$wrapper = $("<div>")
      .addClass(
        namespacify("wrapper") +
          " " +
          popup.settings.modifier +
          " " +
          namespacify("is", STATES.CLOSED)
      )
      .hide()
      .append(popup.$modal);
    $body.append(popup.$wrapper);
    popup.$wrapper.on(
      "click." + NAMESPACE,
      "[data-" + PLUGIN_NAME + '-action="close"]',
      function (e) {
        e.preventDefault();
        popup.close();
      }
    );
    popup.$wrapper.on(
      "click." + NAMESPACE,
      "[data-" + PLUGIN_NAME + '-action="cancel"]',
      function (e) {
        e.preventDefault();
        popup.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);
        if (popup.settings.closeOnCancel) {
          popup.close(STATE_CHANGE_REASONS.CANCELLATION);
        }
      }
    );
    popup.$wrapper.on(
      "click." + NAMESPACE,
      "[data-" + PLUGIN_NAME + '-action="confirm"]',
      function (e) {
        e.preventDefault();
        popup.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);
        if (popup.settings.closeOnConfirm) {
          popup.close(STATE_CHANGE_REASONS.CONFIRMATION);
        }
      }
    );
    popup.$wrapper.on("click." + NAMESPACE, function (e) {
      var $target = $(e.target);
      if (!$target.hasClass(namespacify("wrapper"))) {
        return;
      }
      if (popup.settings.closeOnOutsideClick) {
        popup.close();
      }
    });
  }
  Remodal.prototype.open = function () {
    var popup = this;
    var id;
    if (popup.state === STATES.OPENING || popup.state === STATES.CLOSING) {
      return;
    }
    id = popup.$modal.attr("data-" + PLUGIN_NAME + "-id");
    if (id && popup.settings.hashTracking) {
      scrollTop = $(window).scrollTop();
      location.hash = id;
    }
    if (current && current !== popup) {
      halt(current);
    }
    current = popup;
    lockScreen();
    popup.$bg.addClass(popup.settings.modifier);
    popup.$overlay.addClass(popup.settings.modifier).show();
    popup.$wrapper.show().scrollTop(0);
    popup.$modal.focus();
    syncWithAnimation(
      function () {
        setState(popup, STATES.OPENING);
      },
      function () {
        setState(popup, STATES.OPENED);
      },
      popup
    );
  };
  Remodal.prototype.close = function (reason) {
    var popup = this;
    if (popup.state === STATES.OPENING || popup.state === STATES.CLOSING) {
      return;
    }
    if (
      popup.settings.hashTracking &&
      popup.$modal.attr("data-" + PLUGIN_NAME + "-id") ===
        location.hash.substr(1)
    ) {
      location.hash = "";
      $(window).scrollTop(scrollTop);
    }
    syncWithAnimation(
      function () {
        setState(popup, STATES.CLOSING, false, reason);
      },
      function () {
        popup.$bg.removeClass(popup.settings.modifier);
        popup.$overlay.removeClass(popup.settings.modifier).hide();
        popup.$wrapper.hide();
        unlockScreen();
        location.reload();
        setState(popup, STATES.CLOSED, false, reason);
      },
      popup
    );
  };
  Remodal.prototype.getState = function () {
    return this.state;
  };
  Remodal.prototype.destroy = function () {
    var lookup = $[PLUGIN_NAME].lookup;
    var instanceCount;
    halt(this);
    this.$wrapper.remove();
    delete lookup[this.index];
    instanceCount = $.grep(lookup, function (instance) {
      return !!instance;
    }).length;
    if (instanceCount === 0) {
      this.$overlay.remove();
      this.$bg.removeClass(
        namespacify("is", STATES.CLOSING) +
          " " +
          namespacify("is", STATES.OPENING) +
          " " +
          namespacify("is", STATES.CLOSED) +
          " " +
          namespacify("is", STATES.OPENED)
      );
    }
  };
  $[PLUGIN_NAME] = { lookup: [] };
  $.fn[PLUGIN_NAME] = function (opts) {
    var instance;
    var $elem;
    this.each(function (index, elem) {
      $elem = $(elem);
      if ($elem.data(PLUGIN_NAME) == null) {
        instance = new Remodal($elem, opts);
        $elem.data(PLUGIN_NAME, instance.index);
        if (
          instance.settings.hashTracking &&
          $elem.attr("data-" + PLUGIN_NAME + "-id") === location.hash.substr(1)
        ) {
          instance.open();
        }
      } else {
        instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)];
      }
    });
    return instance;
  };
  $(document).ready(function () {
    $(document).on("click", "[data-" + PLUGIN_NAME + "-target]", function (e) {
      e.preventDefault();
      var elem = e.currentTarget;
      var id = elem.getAttribute("data-" + PLUGIN_NAME + "-target");
      var $target = $("[data-" + PLUGIN_NAME + '-id="' + id + '"]');
      $[PLUGIN_NAME].lookup[$target.data(PLUGIN_NAME)].open();
    });
    $(document)
      .find("." + NAMESPACE)
      .each(function (i, container) {
        var $container = $(container);
        var options = $container.data(PLUGIN_NAME + "-options");
        if (!options) {
          options = {};
        } else if (typeof options === "string" || options instanceof String) {
          options = parseOptions(options);
        }
        $container[PLUGIN_NAME](options);
      });
    $(document).on("keydown." + NAMESPACE, function (e) {
      if (
        current &&
        current.settings.closeOnEscape &&
        current.state === STATES.OPENED &&
        e.keyCode === 27
      ) {
        current.close();
      }
    });
    $(window).on("hashchange." + NAMESPACE, handleHashChangeEvent);
  });
});
jQuery.fn.nTicker = function (settings) {
  settings = jQuery.extend(
    { speed: 100, pause: true, buttons: false },
    settings
  );
  return this.each(function () {
    var j = jQuery;
    var $line = j(this);
    var id = "ER_" + new Date().getTime();
    $line.wrap('<div id="' + id + '"></div>');
    $line.css({ margin: "0 !important", padding: "0 !important" });
    var currentSpazio, currentTempo;
    var run = true;
    var initialOffset = $line.offset().left;
    var lineWidth = 1;
    $line.children("li.tick-clones").remove();
    $line.addClass("newsticker");
    var $mask = $line.wrap("<div class='mask'></div>");
    var $tickercontainer = $line
      .parent()
      .wrap("<div class='tickercontainer'></div>");
    var elements = $line.children("li");
    var fill = function () {
      lineWidth = 1;
      $line.append(elements.clone(true).addClass("tick-clones"));
      $line.children("li").each(function (i) {
        lineWidth += j(this, i).outerWidth(true);
      });
    };
    var l = $tickercontainer.outerWidth(true);
    while (lineWidth < l) fill();
    $line.width(lineWidth);
    $line.height($line.parent().height());
    function scrollnews(spazio, tempo) {
      $line.animate({ left: "-=" + spazio }, tempo, "linear", function () {
        $line.children("li:first").appendTo($line);
        $line.css("left", 0);
        currentSpazio = $line.children("li:first").outerWidth(true);
        currentTempo = (tempo / spazio) * currentSpazio;
        if (run) scrollnews(currentSpazio, currentTempo);
      });
    }
    currentSpazio = $line.children("li:first").outerWidth(true);
    currentTempo = (currentSpazio / settings.speed) * 1000;
    scrollnews(currentSpazio, currentTempo);
    function setHover() {
      $line.hover(pause, resume);
    }
    function pause() {
      run = false;
      $line.stop();
    }
    function resume() {
      run = true;
      var offset = $line.offset().left;
      var residualSpace =
        offset + $line.children("li:first").outerWidth(true) - initialOffset;
      var residualTime = (currentTempo / currentSpazio) * residualSpace;
      scrollnews(residualSpace, residualTime);
    }
    if (settings.pause) setHover();
    if (settings.buttons) {
      var $buttons = j(
        '<ul class="ticker-controls">' +
          '<li class="prev nthriveticker nthriveticker-left"></li>' +
          '<li class="pause nthriveticker nthriveticker-pause"></li>' +
          '<li class="next nthriveticker nthriveticker-right"></li>' +
          "</ul>"
      );
      $buttons.insertAfter($tickercontainer);
      j("body").on(
        "click",
        "#" + id + " .ticker-controls > .pause",
        function () {
          if (!run) return false;
          j(this).toggleClass(
            "pause nthriveticker-pause play nthriveticker-play"
          );
          $line.unbind("mouseenter mouseleave");
          run = false;
        }
      );
      j("body").on(
        "click",
        "#" + id + " .ticker-controls > .play",
        function () {
          if (run) return false;
          j(this).toggleClass(
            "pause nthriveticker-pause play nthriveticker-play"
          );
          run = true;
          setHover();
          var offset = $line.offset().left;
          var residualSpace =
            offset +
            $line.children("li:first").outerWidth(true) -
            initialOffset;
          var residualTime = (currentTempo / currentSpazio) * residualSpace;
          scrollnews(residualSpace, residualTime);
        }
      );
      var moving = false;
      j("body").on(
        "click",
        "#" + id + " .ticker-controls > .next",
        function () {
          if (run) {
            j("#" + id + " .ticker-controls > .pause").toggleClass(
              "pause nthriveticker-pause play nthriveticker-play"
            );
            run = false;
            return;
          }
          if (moving) return false;
          var spazio = $line.children("li:first").outerWidth(true);
          var tempo = (spazio / settings.speed) * 1000;
          moving = true;
          $line
            .stop(true, true)
            .animate({ left: "-=" + spazio }, tempo, "linear", function () {
              $line.children("li:first").appendTo($line);
              $line.css("left", 0);
              moving = false;
            });
        }
      );
      j("body").on(
        "click",
        "#" + id + " .ticker-controls > .prev",
        function () {
          if (run) {
            j("#" + id + " .ticker-controls > .pause").toggleClass(
              "pause nthriveticker-pause play nthriveticker-play"
            );
            run = false;
            return;
          }
          if (moving) return false;
          var spazio = $line.children("li:last").outerWidth(true);
          $line.css("left", "-" + spazio + "px");
          $line.children("li:last").prependTo($line);
          var tempo = (spazio / settings.speed) * 1000;
          moving = true;
          $line
            .stop(true, true)
            .animate({ left: "+=" + spazio }, tempo, "linear", function () {
              moving = false;
            });
        }
      );
    }
  });
};
$(document).ready(function () {
  $(":input", "form")
    .not(":button, :submit, :reset, :hidden, :checkbox")
    .val("")
    .prop("checked", false)
    .prop("selected", false);
});
$("#back").click(function () {
  $(this)
    .parent("div")
    .parent("div")
    .parent("div.l-double-width")
    .animate({ left: "0" }, "fast");
});
$("#back").on("keyup", function (e) {
  if (e.keyCode === 9) {
    $(this)
      .parent("div")
      .parent("div")
      .parent("div.l-double-width")
      .animate({ left: "0" }, "fast");
    $("#form-sec-1 input").filter(":first").focus();
  }
});
$("#form-next").click(function () {
  $("#next-button").attr("aria-hidden", "true");
  $("#next-button").addClass("hidden");
  if ($("input#question-field").valid()) {
    $(this)
      .parent("div")
      .parent("div")
      .parent("div")
      .parent("div.l-double-width")
      .animate({ left: "-100%" }, "fast");
    $("#form-sec-2 input").filter(":first").focus();
  } else {
    $("input.error").filter(":first").focus();
  }
});
$("#question-field").on("keydown", function (e) {
  if (e.keyCode === 39) {
    $("#form-next").focus();
  }
  if (e.keyCode == 37) {
    $("a:focus").prev().focus();
  }
});
$("#form-next").on("keydown", function (e) {
  if (e.keyCode === 9) {
    e.preventDefault();
    $("#next-button").attr("aria-hidden", "false");
    $("#next-button").removeClass("hidden");
    if ($("input#question-field").valid()) {
      $(this)
        .parent("div")
        .parent("div")
        .parent("div")
        .parent("div.l-double-width")
        .animate({ left: "-100%" }, "fast");
      $("#form-sec-2 input").filter(":first").focus();
    } else {
      $("input.error").filter(":first").focus();
    }
  }
  if (e.keyCode == 27) {
    $("#next-button").attr("aria-hidden", "true");
    $("#next-button").addClass("hidden");
    ev.preventDefault();
    return false;
  }
  if (e.keyCode === 39) {
    $("#privacy-policy-footer").focus();
  }
});
$("#privacy-policy-footer").on("focus", function () {
  $("#question-field")
    .removeClass("error")
    .next("label")
    .attr("id", "question-field")
    .removeClass("error")
    .addClass("label-focus");
  $("#next-button").attr("aria-hidden", "true");
  $("#next-button").addClass("hidden");
});
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
});
$(document).ready(function () {
  $("input[type='tel']").attr("autocomplete", "none");
  $("form :input").focus(function () {
    $(this)
      .closest(".input-wrap")
      .addClass("valid-group")
      .children("label.label-focus")
      .removeClass("label-focus")
      .addClass("label-blur");
  });
  $("form :input").blur(function () {
    $(this)
      .parent()
      .closest("label.label-blur")
      .removeClass("label-blur")
      .addClass("label-focus");
  });
  $(".label-focus").click(function () {
    $(this)
      .closest(".input-wrap")
      .addClass("valid-group")
      .children("label.label-focus")
      .removeClass("label-focus")
      .addClass("label-blur");
  });
  $("#mktFrmSubmit").on("click", function () {
    $(this).parent().parent().parent().addClass("valid-group");
  });
  $("form label").click(function () {
    $(this).parent().closest("input").focus();
  });
  $(".smheight").matchHeight();
  $(".smheight .story_content").matchHeight();
  $(".l-list-two-col .box-container").matchHeight();
  $(".tab-detail .l-list-three-col li").matchHeight();
  var $secondNav = $("#secondary-nav");
  var $lastLine = $(".last-line");
  var $pageNav = $("#page-nav .l-site-width");
  var $search = $(".nth-search");
  var $mainNav = $("#main-nav");
  var $nthContainer = $(".nth-content");
  var $eventsPageNav = $("#page-nav");
  var $eventsItems = $("#items");
  +$("header").append(
    '<div class="wheel-toggle btn-anim"><a href="#wheel-mobile" class="block" tabindex="-1"><span>+</span></a></div>'
  );
  function winWidth() {
    if ($(window).width() < 840) {
      $nthContainer.append($eventsPageNav);
      $lastLine.append($secondNav);
      $mainNav.prepend($search);
    } else {
      $eventsItems.before($eventsPageNav);
      $pageNav.append($secondNav);
      $lastLine.before($search);
    }
  }
  winWidth();
  $(window).resize(function () {
    winWidth();
  });
});
(function ($) {
  "use strict";
  var oldIE;
  if ($("html").is(".ie6, .ie7, .ie8")) {
    oldIE = true;
  }
  if (oldIE) {
  } else {
    $("#share-sns").nSocials({
      showLabel: false,
      shares: [
        {
          share: "linkedin",
          logo: "https://www.nthrive.com/_assets/images/icon/share1.png",
        },
        {
          share: "twitter",
          logo: "https://www.nthrive.com/_assets/images/icon/share2.png",
        },
        {
          share: "facebook",
          logo: "https://www.nthrive.com/_assets/images/icon/share3.png",
        },
      ],
    });
  }
})(jQuery);
$(function () {
  var idName = $("#share-sns img").attr("id");
  $("#share-sns img").attr("alt", idName);
  $(".slick-dots button").wrapInner("<span></span>");
});
$(function () {
  var $colOneTitle = $(
    ".table-body.rev-table.l-list-two-col.text-white > li:first-child > p"
  ).html();
  var $colTwoTitle = $(
    ".table-body.rev-table.l-list-two-col.text-white > li:last-child > p"
  ).html();
  var added = false;
  function checkSize() {
    if (!added && $(window).width() < 840) {
      $(".table-body.rev-table.bg-ffffff > li:first-child ").prepend(
        '<p class="desktop-hide">' + $colOneTitle + "</p>"
      );
      $(".table-body.rev-table.bg-ffffff > li:last-child").prepend(
        '<p class="desktop-hide">' + $colTwoTitle + "</p>"
      );
      added = true;
    }
  }
  $(window).resize(checkSize);
  checkSize();
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