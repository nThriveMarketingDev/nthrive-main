(function ($, window, document) {
    "use strict";
    var pluginName = "accessibleMegaMenu",
        defaults = { uuidPrefix: "menu", menuClass: "menu", topNavItemClass: "nav-top-level", panelClass: "menu-panel", panelGroupClass: "menu-panel-group", hoverClass: "hover", focusClass: "focus", openClass: "open" },
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
        };
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
            isTouch = typeof window.hasOwnProperty === "function" && !!window.hasOwnProperty("ontouchstart"),
            _getPlugin,
            _addUniqueId,
            _togglePanel,
            _clickHandler,
            _clickOutsideHandler,
            _DOMAttrModifiedHandler,
            _focusInHandler,
            _focusOutHandler,
            _keyDownHandler,
            _mouseDownHandler,
            _mouseOverHandler,
            _mouseOutHandler,
            _toggleExpandedEventHandlers;
        _getPlugin = function (element) {
            return $(element)
                .closest(":data(plugin_" + pluginName + ")")
                .data("plugin_" + pluginName);
        };
        _addUniqueId = function (element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id")) {
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + ++uuid);
            }
        };
        _togglePanel = function (event, hide) {
            var target = $(event.target),
                that = this,
                settings = this.settings,
                menu = this.menu,
                topli = target.closest("." + settings.topNavItemClass),
                panel = target.hasClass(settings.panelClass) ? target : target.closest("." + settings.panelClass),
                newfocus;
            _toggleExpandedEventHandlers.call(this, true);
            if (hide) {
                topli = menu.find("." + settings.topNavItemClass + " ." + settings.openClass + ":first").closest("." + settings.topNavItemClass);
                if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
                    if ((event.type === "mouseout" || event.type === "focusout") && topli.has(document.activeElement).length > 0) {
                        return;
                    }
                    topli
                        .find("[aria-expanded]")
                        .attr("aria-expanded", "false")
                        .removeClass(settings.openClass)
                        .filter("." + settings.panelClass)
                        .attr("aria-hidden", "true");
                    if ((event.type === "keydown" && event.keyCode === Keyboard.ESCAPE) || event.type === "DOMAttrModified") {
                        newfocus = topli.find(":tabbable:first");
                        setTimeout(function () {
                            menu.find("[aria-expanded]." + that.settings.panelClass).off("DOMAttrModified.menu");
                            newfocus.focus();
                            that.justFocused = false;
                        }, 99);
                    }
                } else if (topli.length === 0) {
                    menu.find("[aria-expanded=true]")
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
                if (event.type === "mouseover" && target.is(":tabbable") && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.focus();
                    that.justFocused = false;
                }
                _toggleExpandedEventHandlers.call(that);
            }
        };
        _clickHandler = function (event) {
            var target = $(event.currentTarget),
                topli = target.closest("." + this.settings.topNavItemClass),
                panel = target.closest("." + this.settings.panelClass);
            if (topli.length === 1 && panel.length === 0 && topli.find("." + this.settings.panelClass).length === 1) {
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
                    } else if (isTouch) {
                        event.preventDefault();
                        event.stopPropagation();
                        _togglePanel.call(this, event, target.hasClass(this.settings.openClass));
                    }
                }
            }
        };
        _clickOutsideHandler = function (event) {
            if ($(event.target).closest(this.menu).length === 0) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };
        _DOMAttrModifiedHandler = function (event) {
            if (event.originalEvent.attrName === "aria-expanded" && event.originalEvent.newValue === "false" && $(event.target).hasClass(this.settings.openClass)) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };
        _focusInHandler = function (event) {
            clearTimeout(this.focusTimeoutID);
            var target = $(event.target),
                panel = target.closest("." + this.settings.panelClass);
            target.addClass(this.settings.focusClass).on("click.menu", $.proxy(_clickHandler, this));
            this.justFocused = !this.mouseFocused;
            this.mouseFocused = false;
            if (this.panels.not(panel).filter("." + this.settings.openClass).length) {
                _togglePanel.call(this, event);
            }
        };
        _focusOutHandler = function (event) {
            this.justFocused = false;
            var that = this,
                target = $(event.target),
                topli = target.closest("." + this.settings.topNavItemClass),
                keepOpen = false;
            target.removeClass(this.settings.focusClass).off("click.menu");
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
                    _togglePanel.call(that, event, true);
                }, 300);
            }
        };
        _keyDownHandler = function (event) {
            var that = this.constructor === AccessibleMegaMenu ? this : _getPlugin(this),
                settings = that.settings,
                target = $($(this).is("." + settings.hoverClass + ":tabbable") ? this : event.target),
                menu = that.menu,
                topnavitems = that.topnavitems,
                topli = target.closest("." + settings.topNavItemClass),
                tabbables = menu.find(":tabbable"),
                panel = target.hasClass(settings.panelClass) ? target : target.closest("." + settings.panelClass),
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
            if (target.is("input:focus, select:focus, textarea:focus, button:focus")) {
                return;
            }
            if (target.is("." + settings.hoverClass + ":tabbable")) {
                $("html").off("keydown.menu");
            }
            switch (keycode) {
                case Keyboard.ESCAPE:
                    _togglePanel.call(that, event, true);
                    break;
                case Keyboard.DOWN:
                    event.preventDefault();
                    if (isTopNavItem) {
                        _togglePanel.call(that, event);
                        found = topli.find("." + settings.panelClass + " :tabbable:first").focus().length === 1;
                    } else {
                        found = tabbables.filter(":gt(" + tabbables.index(target) + "):first").focus().length === 1;
                    }
                    if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                        tabbables = $(":tabbable");
                        i = tabbables.index(target);
                        found = $(":tabbable:gt(" + $(":tabbable").index(target) + "):first").focus().length === 1;
                    }
                    break;
                case Keyboard.UP:
                    event.preventDefault();
                    if (isTopNavItem && target.hasClass(settings.openClass)) {
                        _togglePanel.call(that, event, true);
                        next = topnavitems.filter(":lt(" + topnavitems.index(topli) + "):last");
                        if (next.children("." + settings.panelClass).length) {
                            found =
                                next
                                    .children()
                                    .attr("aria-expanded", "true")
                                    .addClass(settings.openClass)
                                    .filter("." + settings.panelClass)
                                    .attr("aria-hidden", "false")
                                    .find(":tabbable:last")
                                    .focus() === 1;
                        }
                    } else if (!isTopNavItem) {
                        found = tabbables.filter(":lt(" + tabbables.index(target) + "):last").focus().length === 1;
                    }
                    if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                        tabbables = $(":tabbable");
                        i = tabbables.index(target);
                        found = $(":tabbable:lt(" + $(":tabbable").index(target) + "):first").focus().length === 1;
                    }
                    break;
                case Keyboard.RIGHT:
                    event.preventDefault();
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
                                    .filter(":gt(" + panelGroups.index(currentPanelGroup) + "):first")
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
                                    .filter(":lt(" + panelGroups.index(currentPanelGroup) + "):last")
                                    .find(":tabbable:first")
                                    .focus().length === 1;
                        }
                        if (!found) {
                            found = topli.find(":tabbable:first").focus().length === 1;
                        }
                    }
                    break;
                case Keyboard.TAB:
                    i = tabbables.index(target);
                    if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                        _togglePanel.call(that, event, true);
                        next = topnavitems.filter(":lt(" + topnavitems.index(topli) + "):last");
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
                        found = tabbables.filter(":lt(" + i + "):last").focus().length === 1;
                    } else if (!event.shiftKey && i < tabbables.length - 1) {
                        found = tabbables.filter(":gt(" + i + "):first").focus().length === 1;
                    } else if (window.opera && opera.toString() === "[object Opera]") {
                        tabbables = $(":tabbable");
                        i = tabbables.index(target);
                        if (event.shiftKey) {
                            found = $(":tabbable:lt(" + $(":tabbable").index(target) + "):last").focus().length === 1;
                        } else {
                            found = $(":tabbable:gt(" + $(":tabbable").index(target) + "):first").focus().length === 1;
                        }
                    }
                    if (found) {
                        event.preventDefault();
                    }
                    break;
                case Keyboard.SPACE:
                    if (isTopNavItem) {
                        event.preventDefault();
                        _clickHandler.call(that, event);
                    } else {
                        return true;
                    }
                    break;
                case Keyboard.ENTER:
                    return true;
                    break;
                default:
                    clearTimeout(this.keydownTimeoutID);
                    keydownSearchString += newString !== keydownSearchString ? newString : "";
                    if (keydownSearchString.length === 0) {
                        return;
                    }
                    this.keydownTimeoutID = setTimeout(function () {
                        keydownSearchString = "";
                    }, keydownTimeoutDuration);
                    if (isTopNavItem && !target.hasClass(settings.openClass)) {
                        tabbables = tabbables.filter(":not(." + settings.panelClass + " :tabbable)");
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
                    regex = new RegExp("^" + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), "i");
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
            if ($(event.target).is(this.settings.panelClass) || $(event.target).closest(":focusable").length) {
                this.mouseFocused = true;
            }
            this.mouseTimeoutID = setTimeout(function () {
                clearTimeout(this.focusTimeoutID);
            }, 1);
        };
        _mouseOverHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            $(event.target).addClass(this.settings.hoverClass);
            _togglePanel.call(this, event);
            if ($(event.target).is(":tabbable")) {
                $("html").on("keydown.menu", $.proxy(_keyDownHandler, event.target));
            }
        };
        _mouseOutHandler = function (event) {
            var that = this;
            $(event.target).removeClass(that.settings.hoverClass);
            that.mouseTimeoutID = setTimeout(function () {
                _togglePanel.call(that, event, true);
            }, 250);
            if ($(event.target).is(":tabbable")) {
                $("html").off("keydown.menu");
            }
        };
        _toggleExpandedEventHandlers = function (hide) {
            var menu = this.menu;
            if (hide) {
                $("html").off("mouseup.outside-menu, touchend.outside-menu, mspointerup.outside-menu,  pointerup.outside-menu");
                menu.find("[aria-expanded]." + this.settings.panelClass).off("DOMAttrModified.menu");
            } else {
                $("html").on("mouseup.outside-menu, touchend.outside-menu, mspointerup.outside-menu,  pointerup.outside-menu", $.proxy(_clickOutsideHandler, this));
                menu.find("[aria-expanded=true]." + this.settings.panelClass).on("DOMAttrModified.menu", $.proxy(_DOMAttrModifiedHandler, this));
            }
        };
        return {
            constructor: AccessibleMegaMenu,
            init: function () {
                var settings = this.settings,
                    nav = $(this.element),
                    menu = nav.children().first(),
                    topnavitems = menu.children();
                this.start(settings, nav, menu, topnavitems);
            },
            start: function (settings, nav, menu, topnavitems) {
                var that = this;
                this.settings = settings;
                this.menu = menu;
                this.topnavitems = topnavitems;
                nav.attr("role", "navigation");
                menu.addClass(settings.menuClass);
                topnavitems.each(function (i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({ "aria-haspopup": true, "aria-controls": topnavitempanel.attr("id"), "aria-expanded": false });
                        topnavitempanel.attr({ role: "group", "aria-expanded": false, "aria-hidden": true }).addClass(settings.panelClass).not("[aria-labelledby]").attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });
                this.panels = menu.find("." + settings.panelClass);
                menu.on("focusin.menu", ":focusable, ." + settings.panelClass, $.proxy(_focusInHandler, this))
                    .on("focusout.menu", ":focusable, ." + settings.panelClass, $.proxy(_focusOutHandler, this))
                    .on("keydown.menu", $.proxy(_keyDownHandler, this))
                    .on("mouseover.menu", $.proxy(_mouseOverHandler, this))
                    .on("mouseout.menu", $.proxy(_mouseOutHandler, this))
                    .on("mousedown.menu", $.proxy(_mouseDownHandler, this));
                if (isTouch) {
                    menu.on("touchstart.menu", $.proxy(_clickHandler, this));
                }
                menu.find("hr").attr("role", "separator");
                if ($(document.activeElement).closest(menu).length) {
                    $(document.activeElement).trigger("focusin.menu");
                }
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
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new $.fn[pluginName].AccessibleMegaMenu(this, options));
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
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
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
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        },
    });
})(jQuery, window, document);
if (jQuery) {
    (function ($) {
        "use strict";
        $(document).ready(function () {
            $(".nth-content").accessibleMegaMenu();
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
this,
    function (global, $) {
        "use strict";
        var PLUGIN_NAME = "popup";
        var NAMESPACE = (global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE) || PLUGIN_NAME;
        var ANIMATIONSTART_EVENTS = $.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function (eventName) {
            return eventName + "." + NAMESPACE;
        }).join(" ");
        var ANIMATIONEND_EVENTS = $.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function (eventName) {
            return eventName + "." + NAMESPACE;
        }).join(" ");
        var DEFAULTS = $.extend({ hashTracking: true, closeOnConfirm: true, closeOnCancel: true, closeOnEscape: true, closeOnOutsideClick: true, modifier: "" }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS);
        var STATES = { CLOSING: "closing", CLOSED: "closed", OPENING: "opening", OPENED: "opened" };
        var STATE_CHANGE_REASONS = { CONFIRMATION: "confirmation", CANCELLATION: "cancellation" };
        var IS_ANIMATION = (function () {
            var style = document.createElement("div").style;
            return style.animationName !== undefined || style.WebkitAnimationName !== undefined || style.MozAnimationName !== undefined || style.msAnimationName !== undefined || style.OAnimationName !== undefined;
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
            var duration = $elem.css("animation-duration") || $elem.css("-webkit-animation-duration") || $elem.css("-moz-animation-duration") || $elem.css("-o-animation-duration") || $elem.css("-ms-animation-duration") || "0s";
            var delay = $elem.css("animation-delay") || $elem.css("-webkit-animation-delay") || $elem.css("-moz-animation-delay") || $elem.css("-o-animation-delay") || $elem.css("-ms-animation-delay") || "0s";
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
            for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
                num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]);
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
                paddingRight = parseInt($body.css("padding-right"), 10) + getScrollbarWidth();
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
                paddingRight = parseInt($body.css("padding-right"), 10) - getScrollbarWidth();
                $body.css("padding-right", paddingRight + "px");
                $html.removeClass(lockedClass);
            }
        }
        function setState(instance, state, isSilent, reason) {
            var newState = namespacify("is", state);
            var allStates = [namespacify("is", STATES.CLOSING), namespacify("is", STATES.OPENING), namespacify("is", STATES.CLOSED), namespacify("is", STATES.OPENED)].join(" ");
            instance.$bg.removeClass(allStates).addClass(newState);
            instance.$overlay.removeClass(allStates).addClass(newState);
            instance.$wrapper.removeClass(allStates).addClass(newState);
            instance.$modal.removeClass(allStates).addClass(newState);
            instance.state = state;
            !isSilent && instance.$modal.trigger({ type: state, reason: reason }, [{ reason: reason }]);
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
                    $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
                        instance[elemName].off(ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS);
                    });
                    doAfterAnimation();
                }
            };
            $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
                instance[elemName].on(ANIMATIONSTART_EVENTS, handleAnimationStart).on(ANIMATIONEND_EVENTS, handleAnimationEnd);
            });
            doBeforeAnimation();
            if (getAnimationDuration(instance.$bg) === 0 && getAnimationDuration(instance.$overlay) === 0 && getAnimationDuration(instance.$wrapper) === 0 && getAnimationDuration(instance.$modal) === 0) {
                $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
                    instance[elemName].off(ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS);
                });
                doAfterAnimation();
            }
        }
        function halt(instance) {
            if (instance.state === STATES.CLOSED) {
                return;
            }
            $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
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
                if (current && current.state === STATES.OPENED && current.settings.hashTracking) {
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
                    .addClass(namespacify("overlay") + " " + namespacify("is", STATES.CLOSED))
                    .hide();
                $body.append(popup.$overlay);
            }
            popup.$bg = $("." + namespacify("bg")).addClass(namespacify("is", STATES.CLOSED));
            popup.$modal = $modal.addClass(NAMESPACE + " " + namespacify("is-initialized") + " " + popup.settings.modifier + " " + namespacify("is", STATES.CLOSED)).attr("tabindex", "-1");
            popup.$wrapper = $("<div>")
                .addClass(namespacify("wrapper") + " " + popup.settings.modifier + " " + namespacify("is", STATES.CLOSED))
                .hide()
                .append(popup.$modal);
            $body.append(popup.$wrapper);
            popup.$wrapper.on("click." + NAMESPACE, "[data-" + PLUGIN_NAME + '-action="close"]', function (e) {
                e.preventDefault();
                popup.close();
            });
            popup.$wrapper.on("click." + NAMESPACE, "[data-" + PLUGIN_NAME + '-action="cancel"]', function (e) {
                e.preventDefault();
                popup.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);
                if (popup.settings.closeOnCancel) {
                    popup.close(STATE_CHANGE_REASONS.CANCELLATION);
                }
            });
            popup.$wrapper.on("click." + NAMESPACE, "[data-" + PLUGIN_NAME + '-action="confirm"]', function (e) {
                e.preventDefault();
                popup.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);
                if (popup.settings.closeOnConfirm) {
                    popup.close(STATE_CHANGE_REASONS.CONFIRMATION);
                }
            });
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
            if (popup.settings.hashTracking && popup.$modal.attr("data-" + PLUGIN_NAME + "-id") === location.hash.substr(1)) {
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
                this.$bg.removeClass(namespacify("is", STATES.CLOSING) + " " + namespacify("is", STATES.OPENING) + " " + namespacify("is", STATES.CLOSED) + " " + namespacify("is", STATES.OPENED));
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
                    if (instance.settings.hashTracking && $elem.attr("data-" + PLUGIN_NAME + "-id") === location.hash.substr(1)) {
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
                if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) {
                    current.close();
                }
            });
            $(window).on("hashchange." + NAMESPACE, handleHashChangeEvent);
        });
    };
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
    var NAMESPACE = (global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE) || PLUGIN_NAME;
    var ANIMATIONSTART_EVENTS = $.map(["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"], function (eventName) {
        return eventName + "." + NAMESPACE;
    }).join(" ");
    var ANIMATIONEND_EVENTS = $.map(["animationend", "webkitAnimationEnd", "MSAnimationEnd", "oAnimationEnd"], function (eventName) {
        return eventName + "." + NAMESPACE;
    }).join(" ");
    var DEFAULTS = $.extend({ hashTracking: true, closeOnConfirm: true, closeOnCancel: true, closeOnEscape: true, closeOnOutsideClick: true, modifier: "" }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS);
    var STATES = { CLOSING: "closing", CLOSED: "closed", OPENING: "opening", OPENED: "opened" };
    var STATE_CHANGE_REASONS = { CONFIRMATION: "confirmation", CANCELLATION: "cancellation" };
    var IS_ANIMATION = (function () {
        var style = document.createElement("div").style;
        return style.animationName !== undefined || style.WebkitAnimationName !== undefined || style.MozAnimationName !== undefined || style.msAnimationName !== undefined || style.OAnimationName !== undefined;
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
        var duration = $elem.css("animation-duration") || $elem.css("-webkit-animation-duration") || $elem.css("-moz-animation-duration") || $elem.css("-o-animation-duration") || $elem.css("-ms-animation-duration") || "0s";
        var delay = $elem.css("animation-delay") || $elem.css("-webkit-animation-delay") || $elem.css("-moz-animation-delay") || $elem.css("-o-animation-delay") || $elem.css("-ms-animation-delay") || "0s";
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
        for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
            num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]);
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
            paddingRight = parseInt($body.css("padding-right"), 10) + getScrollbarWidth();
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
            paddingRight = parseInt($body.css("padding-right"), 10) - getScrollbarWidth();
            $body.css("padding-right", paddingRight + "px");
            $html.removeClass(lockedClass);
        }
    }
    function setState(instance, state, isSilent, reason) {
        var newState = namespacify("is", state);
        var allStates = [namespacify("is", STATES.CLOSING), namespacify("is", STATES.OPENING), namespacify("is", STATES.CLOSED), namespacify("is", STATES.OPENED)].join(" ");
        instance.$bg.removeClass(allStates).addClass(newState);
        instance.$overlay.removeClass(allStates).addClass(newState);
        instance.$wrapper.removeClass(allStates).addClass(newState);
        instance.$modal.removeClass(allStates).addClass(newState);
        instance.state = state;
        !isSilent && instance.$modal.trigger({ type: state, reason: reason }, [{ reason: reason }]);
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
                $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
                    instance[elemName].off(ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS);
                });
                doAfterAnimation();
            }
        };
        $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
            instance[elemName].on(ANIMATIONSTART_EVENTS, handleAnimationStart).on(ANIMATIONEND_EVENTS, handleAnimationEnd);
        });
        doBeforeAnimation();
        if (getAnimationDuration(instance.$bg) === 0 && getAnimationDuration(instance.$overlay) === 0 && getAnimationDuration(instance.$wrapper) === 0 && getAnimationDuration(instance.$modal) === 0) {
            $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
                instance[elemName].off(ANIMATIONSTART_EVENTS + " " + ANIMATIONEND_EVENTS);
            });
            doAfterAnimation();
        }
    }
    function halt(instance) {
        if (instance.state === STATES.CLOSED) {
            return;
        }
        $.each(["$bg", "$overlay", "$wrapper", "$modal"], function (index, elemName) {
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
            if (current && current.state === STATES.OPENED && current.settings.hashTracking) {
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
                .addClass(namespacify("overlay") + " " + namespacify("is", STATES.CLOSED))
                .hide();
            $body.append(popup.$overlay);
        }
        popup.$bg = $("." + namespacify("bg")).addClass(namespacify("is", STATES.CLOSED));
        popup.$modal = $modal.addClass(NAMESPACE + " " + namespacify("is-initialized") + " " + popup.settings.modifier + " " + namespacify("is", STATES.CLOSED)).attr("tabindex", "-1");
        popup.$wrapper = $("<div>")
            .addClass(namespacify("wrapper") + " " + popup.settings.modifier + " " + namespacify("is", STATES.CLOSED))
            .hide()
            .append(popup.$modal);
        $body.append(popup.$wrapper);
        popup.$wrapper.on("click." + NAMESPACE, "[data-" + PLUGIN_NAME + '-action="close"]', function (e) {
            e.preventDefault();
            popup.close();
        });
        popup.$wrapper.on("click." + NAMESPACE, "[data-" + PLUGIN_NAME + '-action="cancel"]', function (e) {
            e.preventDefault();
            popup.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION);
            if (popup.settings.closeOnCancel) {
                popup.close(STATE_CHANGE_REASONS.CANCELLATION);
            }
        });
        popup.$wrapper.on("click." + NAMESPACE, "[data-" + PLUGIN_NAME + '-action="confirm"]', function (e) {
            e.preventDefault();
            popup.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION);
            if (popup.settings.closeOnConfirm) {
                popup.close(STATE_CHANGE_REASONS.CONFIRMATION);
            }
        });
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
        if (popup.settings.hashTracking && popup.$modal.attr("data-" + PLUGIN_NAME + "-id") === location.hash.substr(1)) {
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
            this.$bg.removeClass(namespacify("is", STATES.CLOSING) + " " + namespacify("is", STATES.OPENING) + " " + namespacify("is", STATES.CLOSED) + " " + namespacify("is", STATES.OPENED));
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
                if (instance.settings.hashTracking && $elem.attr("data-" + PLUGIN_NAME + "-id") === location.hash.substr(1)) {
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
            if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) {
                current.close();
            }
        });
        $(window).on("hashchange." + NAMESPACE, handleHashChangeEvent);
    });
});
$(".accept-close").click(function () {
    $("body").addClass("notification-close");
    $.cookie("visited", "yes", { expires: 7 });
});
$(document).ready(function () {
    if ($("#page-nav").length) {
        var top = $("#page-nav").offset().top;
    }
    $(window).scroll(function () {
        var y = $(this).scrollTop();
        if (y >= 446) {
            $("#page-nav").addClass("fixed");
            $(".logo-anim").addClass("move");
        } else {
            $("#page-nav").removeClass("fixed");
            $(".logo-anim").removeClass("move");
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
    $(".logo-wrap").prepend('<div id="toggleMenu" role="button" aria-controls="main-nav"> <a href="#"><span class="icon-menu">&#9776;</span><span class="icon-menu-closed">X</span></a></div>');
    $("#main-nav").attr("aria-labelledby", "main-nav-label").attr("role", "region");
    $('li.nav-top-level:has("div.panel-wrap")').on("keyup click", function (e) {
        if (e.keyCode === 9) {
            $(this).children("a").addClass("open").attr("aria-expanded", true);
            $("div.panel-wrap").removeClass("open");
            $(this).children("div.panel-wrap").addClass("open").attr("aria-expanded", true).attr("aria-hidden", false);
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
    var visited = $.cookie("visited");
    if (visited == "yes") {
        $("body").removeClass("notification-close").addClass("notification-close");
        return false;
    } else {
        $("body").removeClass("notification-close");
    }
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
            if ($(this).parent(".accordion-toggle").attr("aria-expanded") == "false") {
                $(this).parent().parent(".accordion").find(".accordion-toggle").not(this).attr("aria-expanded", false).removeClass("accordion-open").children(".accordion-content").attr("aria-hidden", "true").slideUp(200);
                $(this).parent(".accordion-toggle").attr("aria-expanded", true).removeClass("accordion-open").addClass("accordion-open").children(".accordion-content").slideToggle(200);
            } else {
                $(this).parent(".accordion-toggle").attr("aria-expanded", false).removeClass("accordion-open").children(".accordion-content").slideUp(200).attr("aria-hidden", "true");
            }
            return false;
        });
    }
});
