$(document).ready(function () {
    var $subscribeForm = $("#subscribe-form"); var $subscribeFormInput = $('#subscribe-form :input'); var $subscribeFormBody = $("#subscribe-form-body"); var $subscribeFormInput = $("#subscribe-form-body :input"); var $thankYouBody = $("#thank-you-body"); $subscribeForm.validate({ messages: { email: { required: !0, email: !0 } }, messages: { email: { required: "Please enter a valid email address" } } }); $subscribeFormInput.focus(function () { $(this).parent().addClass("valid-group").children("label.label-focus").removeClass("label-focus").addClass("label-blur"); }); if (window.location.href.indexOf("b309b5f2-3dd0-40b1-92c0-c0c605ff664e") > -1) { $subscribeForm.addClass("hide"); $(".thank-you").removeClass("hide"); $("html, body").animate({ scrollTop: $("#popup-fixed").offset().top - 150 }, 'fast'); }
    $subscribeForm.submit(function () { $.ajax({ type: 'POST', url: 'http://info.nthrive.com/l/311601/2017-06-14/d34n', data: { email: $("input[name=email]#email-1").val() }, success: function () { $subscribeForm.addClass("hide"); $(".thank-you").removeClass("hide"); } }); }); $subscribeFormBody.validate({ messages: { email: { required: !0, email: !0 } }, messages: { email: { required: "Please enter a valid email address" } } }); $subscribeFormInput.focus(function () { $(this).parent().addClass("valid-group").children('label.label-focus').removeClass("label-focus").addClass("label-blur"); }); if (window.location.href.indexOf("WcoFormId=e03e8096-9bb4-4cf4-9006-1d86466b63a2") > -1) { $subscribeFormBody.addClass("hide"); $thankYouBody.removeClass("hide"); $("html, body").animate({ scrollTop: $("#subscribe-body-anchor").offset().top - 150 }, 'fast'); }
    $subscribeFormBody.submit(function () { $.ajax({ type: 'POST', url: 'http://info.nthrive.com/l/311601/2017-06-14/d34n', data: { email: $("input[name=email]#email-2").val() }, success: function () { $subscribeFormBody.addClass('hide'); $(".thank-you-body").removeClass('hide'); } }); }); $('html').removeClass('no-js');
}); $('.popup-option-overlay').click(function () { $('body').removeClass("no-scroll"); }); $(".comment-link").click(function () { $("body").addClass("no-scroll"); }); var swfobject = function () {
    var UNDEF = "undefined", OBJECT = "object", SHOCKWAVE_FLASH = "Shockwave Flash", SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash", FLASH_MIME_TYPE = "application/x-shockwave-flash", EXPRESS_INSTALL_ID = "SWFObjectExprInst", win = window, doc = document, nav = navigator, domLoadFnArr = [], regObjArr = [], timer = null, storedAltContent = null, storedAltContentId = null, isDomLoaded = false, isExpressInstallActive = false; var ua = function () {
        var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF && typeof doc.appendChild != UNDEF && typeof doc.replaceChild != UNDEF && typeof doc.removeChild != UNDEF && typeof doc.cloneNode != UNDEF, playerVersion = [0, 0, 0], d = null; if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) { d = nav.plugins[SHOCKWAVE_FLASH].description; if (d) { d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1"); playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10); playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10); playerVersion[2] = /r/.test(d) ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10) : 0; } } else if (typeof win.ActiveXObject != UNDEF) {
            var a = null, fp6Crash = false; try { a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7"); } catch (e) {
                try { a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6"); playerVersion = [6, 0, 21]; a.AllowScriptAccess = "always"; } catch (e) { if (playerVersion[0] == 6) { fp6Crash = true; } }
                if (!fp6Crash) { try { a = new ActiaveXObject(SHOCKWAVE_FLASH_AX); } catch (e) { } }
            }
            if (!fp6Crash && a) { try { d = a.GetVariable("$version"); if (d) { d = d.split(" ")[1].split(","); playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]; } } catch (e) { } }
        }
        var u = nav.userAgent.toLowerCase(), p = nav.platform.toLowerCase(), webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, ie = false, windows = p ? /win/.test(p) : /win/.test(u), mac = p ? /mac/.test(p) : /mac/.test(u);/*@cc_on
                                                                                                                                    ie = true;
                                                                                                                                    @if (@_win32)
                                                                                                                                        windows = true;
                                                                                                                                    @elif (@_mac)
                                                                                                                                        mac = true;
                                                                                                                                    @end
                                                                                                                                @*/
        return { w3cdom: w3cdom, pv: playerVersion, webkit: webkit, ie: ie, win: windows, mac: mac };
    }(); var onDomLoad = function () {
        if (!ua.w3cdom) { return; }
        addDomLoadEvent(main); if (ua.ie && ua.win) { try { doc.write("<scr" + "ipt id=__ie_ondomload defer=true src=//:></scr" + "ipt>"); var s = getElementById("__ie_ondomload"); if (s) { s.onreadystatechange = function () { if (this.readyState == "complete") { this.parentNode.removeChild(this); callDomLoadFunctions(); } }; } } catch (e) { } }
        if (ua.webkit && typeof doc.readyState != UNDEF) { timer = setInterval(function () { if (/loaded|complete/.test(doc.readyState)) { callDomLoadFunctions(); } }, 10); }
        if (typeof doc.addEventListener != UNDEF) { doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, null); }
        addLoadEvent(callDomLoadFunctions);
    }(); function callDomLoadFunctions() {
        if (isDomLoaded) { return; }
        if (ua.ie && ua.win) { var s = createElement("span"); try { var t = doc.getElementsByTagName("body")[0].appendChild(s); t.parentNode.removeChild(t); } catch (e) { return; } }
        isDomLoaded = true; if (timer) { clearInterval(timer); timer = null; }
        var dl = domLoadFnArr.length; for (var i = 0; i < dl; i++) { domLoadFnArr[i](); }
    }
    function addDomLoadEvent(fn) { if (isDomLoaded) { fn(); } else { domLoadFnArr[domLoadFnArr.length] = fn; } }
    function addLoadEvent(fn) { if (typeof win.addEventListener != UNDEF) { win.addEventListener("load", fn, false); } else if (typeof doc.addEventListener != UNDEF) { doc.addEventListener("load", fn, false); } else if (typeof win.attachEvent != UNDEF) { win.attachEvent("onload", fn); } else if (typeof win.onload == "function") { var fnOld = win.onload; win.onload = function () { fnOld(); fn(); }; } else { win.onload = fn; } }
    function main() {
        var rl = regObjArr.length; for (var i = 0; i < rl; i++) {
            var id = regObjArr[i].id; if (ua.pv[0] > 0) {
                var obj = getElementById(id); if (obj) {
                    regObjArr[i].width = obj.getAttribute("width") ? obj.getAttribute("width") : "0"; regObjArr[i].height = obj.getAttribute("height") ? obj.getAttribute("height") : "0"; if (hasPlayerVersion(regObjArr[i].swfVersion)) {
                        if (ua.webkit && ua.webkit < 312) { fixParams(obj); }
                        setVisibility(id, true);
                    } else if (regObjArr[i].expressInstall && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) { showExpressInstall(regObjArr[i]); } else { displayAltContent(obj); }
                }
            } else { setVisibility(id, true); }
        }
    }
    function fixParams(obj) {
        var nestedObj = obj.getElementsByTagName(OBJECT)[0]; if (nestedObj) {
            var e = createElement("embed"), a = nestedObj.attributes; if (a) { var al = a.length; for (var i = 0; i < al; i++) { if (a[i].nodeName.toLowerCase() == "data") { e.setAttribute("src", a[i].nodeValue); } else { e.setAttribute(a[i].nodeName, a[i].nodeValue); } } }
            var c = nestedObj.childNodes; if (c) { var cl = c.length; for (var j = 0; j < cl; j++) { if (c[j].nodeType == 1 && c[j].nodeName.toLowerCase() == "param") { e.setAttribute(c[j].getAttribute("name"), c[j].getAttribute("value")); } } }
            obj.parentNode.replaceChild(e, obj);
        }
    }
    function fixObjectLeaks(id) {
        if (ua.ie && ua.win && hasPlayerVersion("8.0.0")) {
            win.attachEvent("onunload", function () {
                var obj = getElementById(id); if (obj) {
                    for (var i in obj) { if (typeof obj[i] == "function") { obj[i] = function () { }; } }
                    obj.parentNode.removeChild(obj);
                }
            });
        }
    }
    function showExpressInstall(regObj) {
        isExpressInstallActive = true; var obj = getElementById(regObj.id); if (obj) {
            if (regObj.altContentId) { var ac = getElementById(regObj.altContentId); if (ac) { storedAltContent = ac; storedAltContentId = regObj.altContentId; } } else { storedAltContent = abstractAltContent(obj); }
            if (!(/%$/.test(regObj.width)) && parseInt(regObj.width, 10) < 310) { regObj.width = "310"; }
            if (!(/%$/.test(regObj.height)) && parseInt(regObj.height, 10) < 137) { regObj.height = "137"; }
            doc.title = doc.title.slice(0, 47) + " - Flash Player Installation"; var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn", dt = doc.title, fv = "MMredirectURL=" + win.location + "&MMplayerType=" + pt + "&MMdoctitle=" + dt, replaceId = regObj.id; if (ua.ie && ua.win && obj.readyState != 4) { var newObj = createElement("div"); replaceId += "SWFObjectNew"; newObj.setAttribute("id", replaceId); obj.parentNode.insertBefore(newObj, obj); obj.style.display = "none"; win.attachEvent("onload", function () { obj.parentNode.removeChild(obj); }); }
            createSWF({ data: regObj.expressInstall, id: EXPRESS_INSTALL_ID, width: regObj.width, height: regObj.height }, { flashvars: fv }, replaceId);
        }
    }
    function displayAltContent(obj) { if (ua.ie && ua.win && obj.readyState != 4) { var el = createElement("div"); obj.parentNode.insertBefore(el, obj); el.parentNode.replaceChild(abstractAltContent(obj), el); obj.style.display = "none"; win.attachEvent("onload", function () { obj.parentNode.removeChild(obj); }); } else { obj.parentNode.replaceChild(abstractAltContent(obj), obj); } }
    function abstractAltContent(obj) {
        var ac = createElement("div"); if (ua.win && ua.ie) { ac.innerHTML = obj.innerHTML; } else { var nestedObj = obj.getElementsByTagName(OBJECT)[0]; if (nestedObj) { var c = nestedObj.childNodes; if (c) { var cl = c.length; for (var i = 0; i < cl; i++) { if (!(c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "param") && !(c[i].nodeType == 8)) { ac.appendChild(c[i].cloneNode(true)); } } } } }
        return ac;
    }
    function createSWF(attObj, parObj, id) {
        var r, el = getElementById(id); if (typeof attObj.id == UNDEF) { attObj.id = id; }
        if (ua.ie && ua.win) {
            var att = ""; for (var i in attObj) { if (attObj[i] != Object.prototype[i]) { if (i == "data") { parObj.movie = attObj[i]; } else if (i.toLowerCase() == "styleclass") { att += ' class="' + attObj[i] + '"'; } else if (i != "classid") { att += ' ' + i + '="' + attObj[i] + '"'; } } }
            var par = ""; for (var j in parObj) { if (parObj[j] != Object.prototype[j]) { par += '<param name="' + j + '" value="' + parObj[j] + '" />'; } }
            el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>'; fixObjectLeaks(attObj.id); r = getElementById(attObj.id);
        } else if (ua.webkit && ua.webkit < 312) {
            var e = createElement("embed"); e.setAttribute("type", FLASH_MIME_TYPE); for (var k in attObj) { if (attObj[k] != Object.prototype[k]) { if (k == "data") { e.setAttribute("src", attObj[k]); } else if (k.toLowerCase() == "styleclass") { e.setAttribute("class", attObj[k]); } else if (k != "classid") { e.setAttribute(k, attObj[k]); } } }
            for (var l in parObj) { if (parObj[l] != Object.prototype[l]) { if (l != "movie") { e.setAttribute(l, parObj[l]); } } }
            el.parentNode.replaceChild(e, el); r = e;
        } else {
            var o = createElement(OBJECT); o.setAttribute("type", FLASH_MIME_TYPE); for (var m in attObj) { if (attObj[m] != Object.prototype[m]) { if (m.toLowerCase() == "styleclass") { o.setAttribute("class", attObj[m]); } else if (m != "classid") { o.setAttribute(m, attObj[m]); } } }
            for (var n in parObj) { if (parObj[n] != Object.prototype[n] && n != "movie") { createObjParam(o, n, parObj[n]); } }
            el.parentNode.replaceChild(o, el); r = o;
        }
        return r;
    }
    function createObjParam(el, pName, pValue) { var p = createElement("param"); p.setAttribute("name", pName); p.setAttribute("value", pValue); el.appendChild(p); }
    function getElementById(id) { return doc.getElementById(id); }
    function createElement(el) { return doc.createElement(el); }
    function hasPlayerVersion(rv) { var pv = ua.pv, v = rv.split("."); v[0] = parseInt(v[0], 10); v[1] = parseInt(v[1], 10); v[2] = parseInt(v[2], 10); return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false; }
    function createCSS(sel, decl) {
        if (ua.ie && ua.mac) { return; }
        var h = doc.getElementsByTagName("head")[0], s = createElement("style"); s.setAttribute("type", "text/css"); s.setAttribute("media", "screen"); if (!(ua.ie && ua.win) && typeof doc.createTextNode != UNDEF) { s.appendChild(doc.createTextNode(sel + " {" + decl + "}")); }
        h.appendChild(s); if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) { var ls = doc.styleSheets[doc.styleSheets.length - 1]; if (typeof ls.addRule == OBJECT) { ls.addRule(sel, decl); } }
    }
    function setVisibility(id, isVisible) { var v = isVisible ? "inherit" : "hidden"; if (isDomLoaded) { getElementById(id).style.visibility = v; } else { createCSS("#" + id, "visibility:" + v); } }
    function getTargetVersion(obj) {
        if (!obj)
            return 0; var c = obj.childNodes; var cl = c.length; for (var i = 0; i < cl; i++) {
                if (c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "object") { c = c[i].childNodes; cl = c.length; i = 0; }
                if (c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "param" && c[i].getAttribute("name") == "swfversion") { return c[i].getAttribute("value"); }
            }
        return 0;
    }
    function getExpressInstall(obj) {
        if (!obj)
            return ""; var c = obj.childNodes; var cl = c.length; for (var i = 0; i < cl; i++) {
                if (c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "object") { c = c[i].childNodes; cl = c.length; i = 0; }
                if (c[i].nodeType == 1 && c[i].nodeName.toLowerCase() == "param" && c[i].getAttribute("name") == "expressinstall") { return c[i].getAttribute("value"); }
            }
        return "";
    }
    return {
        registerObject: function (objectIdStr, swfVersionStr, xiSwfUrlStr) {
            if (!ua.w3cdom || !objectIdStr) { return; }
            var obj = document.getElementById(objectIdStr); var xi = getExpressInstall(obj); var regObj = {}; regObj.id = objectIdStr; regObj.swfVersion = swfVersionStr ? swfVersionStr : getTargetVersion(obj); regObj.expressInstall = xiSwfUrlStr ? xiSwfUrlStr : ((xi != "") ? xi : false); regObjArr[regObjArr.length] = regObj; setVisibility(objectIdStr, false);
        }, getObjectById: function (objectIdStr) {
            var r = null; if (ua.w3cdom && isDomLoaded) { var o = getElementById(objectIdStr); if (o) { var n = o.getElementsByTagName(OBJECT)[0]; if (!n || (n && typeof o.SetVariable != UNDEF)) { r = o; } else if (typeof n.SetVariable != UNDEF) { r = n; } } }
            return r;
        }, embedSWF: function (swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj) {
            if (!ua.w3cdom || !swfUrlStr || !replaceElemIdStr || !widthStr || !heightStr || !swfVersionStr) { return; }
            widthStr += ""; heightStr += ""; if (hasPlayerVersion(swfVersionStr)) {
                setVisibility(replaceElemIdStr, false); var att = (typeof attObj == OBJECT) ? attObj : {}; att.data = swfUrlStr; att.width = widthStr; att.height = heightStr; var par = (typeof parObj == OBJECT) ? parObj : {}; if (typeof flashvarsObj == OBJECT) { for (var i in flashvarsObj) { if (flashvarsObj[i] != Object.prototype[i]) { if (typeof par.flashvars != UNDEF) { par.flashvars += "&" + i + "=" + flashvarsObj[i]; } else { par.flashvars = i + "=" + flashvarsObj[i]; } } } }
                addDomLoadEvent(function () { createSWF(att, par, replaceElemIdStr); if (att.id == replaceElemIdStr) { setVisibility(replaceElemIdStr, true); } });
            } else if (xiSwfUrlStr && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) { setVisibility(replaceElemIdStr, false); addDomLoadEvent(function () { var regObj = {}; regObj.id = regObj.altContentId = replaceElemIdStr; regObj.width = widthStr; regObj.height = heightStr; regObj.expressInstall = xiSwfUrlStr; showExpressInstall(regObj); }); }
        }, getFlashPlayerVersion: function () { return { major: ua.pv[0], minor: ua.pv[1], release: ua.pv[2] }; }, hasFlashPlayerVersion: hasPlayerVersion, createSWF: function (attObj, parObj, replaceElemIdStr) { if (ua.w3cdom && isDomLoaded) { return createSWF(attObj, parObj, replaceElemIdStr); } else { return undefined; } }, createCSS: function (sel, decl) { if (ua.w3cdom) { createCSS(sel, decl); } }, addDomLoadEvent: addDomLoadEvent, addLoadEvent: addLoadEvent, getQueryParamValue: function (param) {
            var q = doc.location.search || doc.location.hash; if (param == null) { return q; }
            if (q) { var pairs = q.substring(1).split("&"); for (var i = 0; i < pairs.length; i++) { if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) { return pairs[i].substring((pairs[i].indexOf("=") + 1)); } } }
            return "";
        }, expressInstallCallback: function () {
            if (isExpressInstallActive && storedAltContent) {
                var obj = getElementById(EXPRESS_INSTALL_ID); if (obj) {
                    obj.parentNode.replaceChild(storedAltContent, obj); if (storedAltContentId) { setVisibility(storedAltContentId, true); if (ua.ie && ua.win) { storedAltContent.style.display = "block"; } }
                    storedAltContent = null; storedAltContentId = null; isExpressInstallActive = false;
                }
            }
        }
    };
}();; (function (factory) { 'use strict'; if (typeof define === 'function' && define.amd) { define(['jquery'], factory); } else if (typeof module !== 'undefined' && module.exports) { module.exports = factory(require('jquery')); } else { factory(jQuery); } })(function ($) {
    var _previousResizeWidth = -1, _updateTimeout = -1; var _parse = function (value) { return parseFloat(value) || 0; }; var _rows = function (elements) {
        var tolerance = 1, $elements = $(elements), lastTop = null, rows = []; $elements.each(function () {
            var $that = $(this), top = $that.offset().top - _parse($that.css('margin-top')), lastRow = rows.length > 0 ? rows[rows.length - 1] : null; if (lastRow === null) { rows.push($that); } else { if (Math.floor(Math.abs(lastTop - top)) <= tolerance) { rows[rows.length - 1] = lastRow.add($that); } else { rows.push($that); } }
            lastTop = top;
        }); return rows;
    }; var _parseOptions = function (options) {
        var opts = { byRow: true, property: 'height', target: null, remove: false }; if (typeof options === 'object') { return $.extend(opts, options); }
        if (typeof options === 'boolean') { opts.byRow = options; } else if (options === 'remove') { opts.remove = true; }
        return opts;
    }; var matchHeight = $.fn.matchHeight = function (options) {
        var opts = _parseOptions(options); if (opts.remove) { var that = this; this.css(opts.property, ''); $.each(matchHeight._groups, function (key, group) { group.elements = group.elements.not(that); }); return this; }
        if (this.length <= 1 && !opts.target) { return this; }
        matchHeight._groups.push({ elements: this, options: opts }); matchHeight._apply(this, opts); return this;
    }; matchHeight.version = '0.7.0'; matchHeight._groups = []; matchHeight._throttle = 80; matchHeight._maintainScroll = false; matchHeight._beforeUpdate = null; matchHeight._afterUpdate = null; matchHeight._rows = _rows; matchHeight._parse = _parse; matchHeight._parseOptions = _parseOptions; matchHeight._apply = function (elements, options) {
        var opts = _parseOptions(options), $elements = $(elements), rows = [$elements]; var scrollTop = $(window).scrollTop(), htmlHeight = $('html').outerHeight(true); var $hiddenParents = $elements.parents().filter(':hidden'); $hiddenParents.each(function () { var $that = $(this); $that.data('style-cache', $that.attr('style')); }); $hiddenParents.css('display', 'block'); if (opts.byRow && !opts.target) {
            $elements.each(function () {
                var $that = $(this), display = $that.css('display'); if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') { display = 'block'; }
                $that.data('style-cache', $that.attr('style')); $that.css({ 'display': display, 'padding-top': '0', 'padding-bottom': '0', 'margin-top': '0', 'margin-bottom': '0', 'border-top-width': '0', 'border-bottom-width': '0', 'height': '100px', 'overflow': 'hidden' });
            }); rows = _rows($elements); $elements.each(function () { var $that = $(this); $that.attr('style', $that.data('style-cache') || ''); });
        }
        $.each(rows, function (key, row) {
            var $row = $(row), targetHeight = 0; if (!opts.target) {
                if (opts.byRow && $row.length <= 1) { $row.css(opts.property, ''); return; }
                $row.each(function () {
                    var $that = $(this), style = $that.attr('style'), display = $that.css('display'); if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') { display = 'block'; }
                    var css = { 'display': display }; css[opts.property] = ''; $that.css(css); if ($that.outerHeight(false) > targetHeight) { targetHeight = $that.outerHeight(false); }
                    if (style) { $that.attr('style', style); } else { $that.css('display', ''); }
                });
            } else { targetHeight = opts.target.outerHeight(false); }
            $row.each(function () {
                var $that = $(this), verticalPadding = 0; if (opts.target && $that.is(opts.target)) { return; }
                if ($that.css('box-sizing') !== 'border-box') { verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width')); verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom')); }
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        }); $hiddenParents.each(function () { var $that = $(this); $that.attr('style', $that.data('style-cache') || null); }); if (matchHeight._maintainScroll) { $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true)); }
        return this;
    }; matchHeight._applyDataApi = function () { var groups = {}; $('[data-match-height], [data-mh]').each(function () { var $this = $(this), groupId = $this.attr('data-mh') || $this.attr('data-match-height'); if (groupId in groups) { groups[groupId] = groups[groupId].add($this); } else { groups[groupId] = $this; } }); $.each(groups, function () { this.matchHeight(true); }); }; var _update = function (event) {
        if (matchHeight._beforeUpdate) { matchHeight._beforeUpdate(event, matchHeight._groups); }
        $.each(matchHeight._groups, function () { matchHeight._apply(this.elements, this.options); }); if (matchHeight._afterUpdate) { matchHeight._afterUpdate(event, matchHeight._groups); }
    }; matchHeight._update = function (throttle, event) {
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width(); if (windowWidth === _previousResizeWidth) { return; }
            _previousResizeWidth = windowWidth;
        }
        if (!throttle) { _update(event); } else if (_updateTimeout === -1) { _updateTimeout = setTimeout(function () { _update(event); _updateTimeout = -1; }, matchHeight._throttle); }
    }; $(matchHeight._applyDataApi); $(window).bind('load', function (event) { matchHeight._update(false, event); }); $(window).bind('resize orientationchange', function (event) { matchHeight._update(true, event); });
}); $(function () {
    function wResize() {
        var winW = $(window).width(); var winH = $(window).innerHeight(); if (winW > 767) { }
        if (winW < 768) { }
    }
    wResize(); $(window).resize(function () { wResize(); }); $(window).scroll(function () { if ($(this).scrollTop() > 20) { $('body').addClass("sticky"); } else { $('body').removeClass("sticky"); } }); if ($(this).scrollTop() > 20) { $('body').addClass("sticky"); } else { $('body').removeClass("sticky"); }
}); function sticky_relocate() { var window_top = $(window).scrollTop(); var nav = $('#sticky-anchor'); if (nav.length) { var div_top = nav.offset().top; if (window_top > (div_top - 80)) { $('.search-bar').addClass('stick'); $('#sticky-anchor').height($('.search-bar').outerHeight()); } else { $('.search-bar').removeClass('stick'); $('#sticky-anchor').height(0); } } }
$(function () { $(window).scroll(sticky_relocate); sticky_relocate(); }); var dir = 1; var MIN_TOP = 200; var MAX_TOP = 350; function autoscroll() {
    var window_top = $(window).scrollTop() + dir; if (window_top >= MAX_TOP) { window_top = MAX_TOP; dir = -1; } else if (window_top <= MIN_TOP) { window_top = MIN_TOP; dir = 1; }
    $(window).scrollTop(window_top); window.setTimeout(autoscroll, 100);
}
function videoClose() { location.reload(); } !(function (root, factory) { if (typeof define === 'function' && define.amd) { define(['jquery'], function ($) { return factory(root, $); }); } else if (typeof exports === 'object') { factory(root, require('jquery')); } else { factory(root, root.jQuery || root.Zepto); } })(this, function (global, $) {
    'use strict'; var PLUGIN_NAME = 'popup'; var NAMESPACE = global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.NAMESPACE || PLUGIN_NAME; var ANIMATIONSTART_EVENTS = $.map(['animationstart', 'webkitAnimationStart', 'MSAnimationStart', 'oAnimationStart'], function (eventName) { return eventName + '.' + NAMESPACE; }).join(' '); var ANIMATIONEND_EVENTS = $.map(['animationend', 'webkitAnimationEnd', 'MSAnimationEnd', 'oAnimationEnd'], function (eventName) { return eventName + '.' + NAMESPACE; }).join(' '); var DEFAULTS = $.extend({ hashTracking: true, closeOnConfirm: true, closeOnCancel: true, closeOnEscape: true, closeOnOutsideClick: true, modifier: '' }, global.REMODAL_GLOBALS && global.REMODAL_GLOBALS.DEFAULTS); var STATES = { CLOSING: 'closing', CLOSED: 'closed', OPENING: 'opening', OPENED: 'opened' }; var STATE_CHANGE_REASONS = { CONFIRMATION: 'confirmation', CANCELLATION: 'cancellation' }; var IS_ANIMATION = (function () { var style = document.createElement('div').style; return style.animationName !== undefined || style.WebkitAnimationName !== undefined || style.MozAnimationName !== undefined || style.msAnimationName !== undefined || style.OAnimationName !== undefined; })(); var IS_IOS = /iPad|iPhone|iPod/.test(navigator.platform); var current; var scrollTop; function getAnimationDuration($elem) {
        if (IS_ANIMATION && $elem.css('animation-name') === 'none' && $elem.css('-webkit-animation-name') === 'none' && $elem.css('-moz-animation-name') === 'none' && $elem.css('-o-animation-name') === 'none' && $elem.css('-ms-animation-name') === 'none') { return 0; }
        var duration = $elem.css('animation-duration') || $elem.css('-webkit-animation-duration') || $elem.css('-moz-animation-duration') || $elem.css('-o-animation-duration') || $elem.css('-ms-animation-duration') || '0s'; var delay = $elem.css('animation-delay') || $elem.css('-webkit-animation-delay') || $elem.css('-moz-animation-delay') || $elem.css('-o-animation-delay') || $elem.css('-ms-animation-delay') || '0s'; var iterationCount = $elem.css('animation-iteration-count') || $elem.css('-webkit-animation-iteration-count') || $elem.css('-moz-animation-iteration-count') || $elem.css('-o-animation-iteration-count') || $elem.css('-ms-animation-iteration-count') || '1'; var max; var len; var num; var i; duration = duration.split(', '); delay = delay.split(', '); iterationCount = iterationCount.split(', '); for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) { num = parseFloat(duration[i]) * parseInt(iterationCount[i], 10) + parseFloat(delay[i]); if (num > max) { max = num; } }
        return num;
    }
    function getScrollbarWidth() {
        if ($(document.body).height() <= $(window).height()) { return 0; }
        var outer = document.createElement('div'); var inner = document.createElement('div'); var widthNoScroll; var widthWithScroll; outer.style.visibility = 'hidden'; outer.style.width = '100px'; document.body.appendChild(outer); widthNoScroll = outer.offsetWidth; outer.style.overflow = 'scroll'; inner.style.width = '100%'; outer.appendChild(inner); widthWithScroll = inner.offsetWidth; outer.parentNode.removeChild(outer); return widthNoScroll - widthWithScroll;
    }
    function lockScreen() {
        if (IS_IOS) { return; }
        var $html = $('html'); var lockedClass = namespacify('is-locked'); var paddingRight; var $body; if (!$html.hasClass(lockedClass)) { $body = $(document.body); paddingRight = parseInt($body.css('padding-right'), 10) + getScrollbarWidth(); $body.css('padding-right', paddingRight + 'px'); $html.addClass(lockedClass); }
    }
    function unlockScreen() {
        if (IS_IOS) { return; }
        var $html = $('html'); var lockedClass = namespacify('is-locked'); var paddingRight; var $body; if ($html.hasClass(lockedClass)) { $body = $(document.body); paddingRight = parseInt($body.css('padding-right'), 10) - getScrollbarWidth(); $body.css('padding-right', paddingRight + 'px'); $html.removeClass(lockedClass); }
    }
    function setState(instance, state, isSilent, reason) { var newState = namespacify('is', state); var allStates = [namespacify('is', STATES.CLOSING), namespacify('is', STATES.OPENING), namespacify('is', STATES.CLOSED), namespacify('is', STATES.OPENED)].join(' '); instance.$bg.removeClass(allStates).addClass(newState); instance.$overlay.removeClass(allStates).addClass(newState); instance.$wrapper.removeClass(allStates).addClass(newState); instance.$modal.removeClass(allStates).addClass(newState); instance.state = state; !isSilent && instance.$modal.trigger({ type: state, reason: reason }, [{ reason: reason }]); }
    function syncWithAnimation(doBeforeAnimation, doAfterAnimation, instance) {
        var runningAnimationsCount = 0; var handleAnimationStart = function (e) {
            if (e.target !== this) { return; }
            runningAnimationsCount++;
        }; var handleAnimationEnd = function (e) {
            if (e.target !== this) { return; }
            if (--runningAnimationsCount === 0) { $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) { instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS); }); doAfterAnimation(); }
        }; $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) { instance[elemName].on(ANIMATIONSTART_EVENTS, handleAnimationStart).on(ANIMATIONEND_EVENTS, handleAnimationEnd); }); doBeforeAnimation(); if (getAnimationDuration(instance.$bg) === 0 && getAnimationDuration(instance.$overlay) === 0 && getAnimationDuration(instance.$wrapper) === 0 && getAnimationDuration(instance.$modal) === 0) { $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) { instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS); }); doAfterAnimation(); }
    }
    function halt(instance) {
        if (instance.state === STATES.CLOSED) { return; }
        $.each(['$bg', '$overlay', '$wrapper', '$modal'], function (index, elemName) { instance[elemName].off(ANIMATIONSTART_EVENTS + ' ' + ANIMATIONEND_EVENTS); }); instance.$bg.removeClass(instance.settings.modifier); instance.$overlay.removeClass(instance.settings.modifier).hide(); instance.$wrapper.hide(); unlockScreen(); setState(instance, STATES.CLOSED, true);
    }
    function parseOptions(str) {
        var obj = {}; var arr; var len; var val; var i; str = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ','); arr = str.split(','); for (i = 0, len = arr.length; i < len; i++) {
            arr[i] = arr[i].split(':'); val = arr[i][1]; if (typeof val === 'string' || val instanceof String) { val = val === 'true' || (val === 'false' ? false : val); }
            if (typeof val === 'string' || val instanceof String) { val = !isNaN(val) ? +val : val; }
            obj[arr[i][0]] = val;
        }
        return obj;
    }
    function namespacify() {
        var result = NAMESPACE; for (var i = 0; i < arguments.length; ++i) { result += '-' + arguments[i]; }
        return result;
    }
    function handleHashChangeEvent() {
        var id = location.hash.replace('#', ''); var instance; var $elem; if (!id) { if (current && current.state === STATES.OPENED && current.settings.hashTracking) { current.close(); } } else {
            try { $elem = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]'); } catch (err) { }
            if ($elem && $elem.length) { instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)]; if (instance && instance.settings.hashTracking) { instance.open(); } }
        }
    }
    function Remodal($modal, options) {
        var $body = $(document.body); var popup = this; popup.settings = $.extend({}, DEFAULTS, options); popup.index = $[PLUGIN_NAME].lookup.push(popup) - 1; popup.state = STATES.CLOSED; popup.$overlay = $('.' + namespacify('overlay')); if (!popup.$overlay.length) { popup.$overlay = $('<div>').addClass(namespacify('overlay') + ' ' + namespacify('is', STATES.CLOSED)).hide(); $body.append(popup.$overlay); }
        popup.$bg = $('.' + namespacify('bg')).addClass(namespacify('is', STATES.CLOSED)); popup.$modal = $modal.addClass(NAMESPACE + ' ' +
        namespacify('is-initialized') + ' ' +
        popup.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED)).attr('tabindex', '-1'); popup.$wrapper = $('<div>').addClass(namespacify('wrapper') + ' ' +
        popup.settings.modifier + ' ' +
        namespacify('is', STATES.CLOSED)).hide().append(popup.$modal); $body.append(popup.$wrapper); popup.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="close"]', function (e) { e.preventDefault(); popup.close(); }); popup.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="cancel"]', function (e) { e.preventDefault(); popup.$modal.trigger(STATE_CHANGE_REASONS.CANCELLATION); if (popup.settings.closeOnCancel) { popup.close(STATE_CHANGE_REASONS.CANCELLATION); } }); popup.$wrapper.on('click.' + NAMESPACE, '[data-' + PLUGIN_NAME + '-action="confirm"]', function (e) { e.preventDefault(); popup.$modal.trigger(STATE_CHANGE_REASONS.CONFIRMATION); if (popup.settings.closeOnConfirm) { popup.close(STATE_CHANGE_REASONS.CONFIRMATION); } }); popup.$wrapper.on('click.' + NAMESPACE, function (e) {
            var $target = $(e.target); if (!$target.hasClass(namespacify('wrapper'))) { return; }
            if (popup.settings.closeOnOutsideClick) { popup.close(); }
        });
    }
    Remodal.prototype.open = function () {
        var popup = this; var id; if (popup.state === STATES.OPENING || popup.state === STATES.CLOSING) { return; }
        id = popup.$modal.attr('data-' + PLUGIN_NAME + '-id'); if (id && popup.settings.hashTracking) { scrollTop = $(window).scrollTop(); location.hash = id; }
        if (current && current !== popup) { halt(current); }
        current = popup; lockScreen(); popup.$bg.addClass(popup.settings.modifier); popup.$overlay.addClass(popup.settings.modifier).show(); popup.$wrapper.show().scrollTop(0); popup.$modal.focus(); syncWithAnimation(function () { setState(popup, STATES.OPENING); }, function () { setState(popup, STATES.OPENED); }, popup);
    }; Remodal.prototype.close = function (reason) {
        var popup = this; if (popup.state === STATES.OPENING || popup.state === STATES.CLOSING) { return; }
        if (popup.settings.hashTracking && popup.$modal.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)) { location.hash = ''; $(window).scrollTop(scrollTop); }
        syncWithAnimation(function () { setState(popup, STATES.CLOSING, false, reason); }, function () { popup.$bg.removeClass(popup.settings.modifier); popup.$overlay.removeClass(popup.settings.modifier).hide(); popup.$wrapper.hide(); unlockScreen(); location.reload(); setState(popup, STATES.CLOSED, false, reason); }, popup);
    }; Remodal.prototype.getState = function () { return this.state; }; Remodal.prototype.destroy = function () {
        var lookup = $[PLUGIN_NAME].lookup; var instanceCount; halt(this); this.$wrapper.remove(); delete lookup[this.index]; instanceCount = $.grep(lookup, function (instance) { return !!instance; }).length; if (instanceCount === 0) {
            this.$overlay.remove(); this.$bg.removeClass(namespacify('is', STATES.CLOSING) + ' ' +
            namespacify('is', STATES.OPENING) + ' ' +
            namespacify('is', STATES.CLOSED) + ' ' +
            namespacify('is', STATES.OPENED));
        }
    }; $[PLUGIN_NAME] = { lookup: [] }; $.fn[PLUGIN_NAME] = function (opts) { var instance; var $elem; this.each(function (index, elem) { $elem = $(elem); if ($elem.data(PLUGIN_NAME) == null) { instance = new Remodal($elem, opts); $elem.data(PLUGIN_NAME, instance.index); if (instance.settings.hashTracking && $elem.attr('data-' + PLUGIN_NAME + '-id') === location.hash.substr(1)) { instance.open(); } } else { instance = $[PLUGIN_NAME].lookup[$elem.data(PLUGIN_NAME)]; } }); return instance; }; $(document).ready(function () {
        $(document).on('click', '[data-' + PLUGIN_NAME + '-target]', function (e) { e.preventDefault(); var elem = e.currentTarget; var id = elem.getAttribute('data-' + PLUGIN_NAME + '-target'); var $target = $('[data-' + PLUGIN_NAME + '-id="' + id + '"]'); $[PLUGIN_NAME].lookup[$target.data(PLUGIN_NAME)].open(); }); $(document).find('.' + NAMESPACE).each(function (i, container) {
            var $container = $(container); var options = $container.data(PLUGIN_NAME + '-options'); if (!options) { options = {}; } else if (typeof options === 'string' || options instanceof String) { options = parseOptions(options); }
            $container[PLUGIN_NAME](options);
        }); $(document).on('keydown.' + NAMESPACE, function (e) { if (current && current.settings.closeOnEscape && current.state === STATES.OPENED && e.keyCode === 27) { current.close(); } }); $(window).on('hashchange.' + NAMESPACE, handleHashChangeEvent);
    });
}); $(document).ready(function () { $(':input', 'form').not(':button, :submit, :reset, :hidden, :checkbox').val('').prop('checked', false).prop('selected', false); }); $(document).ready(function () {
    $("a").attr("data-focus", "none"); $("button").attr("data-focus", "none"); $("a").removeClass("focus-h"); var $nthMenuAnchor = $('#nth-menuanchor-open'); var $notOpen = $('#primary-nav > ul > li:not(#nth-menuanchor-open)'); $('html').removeClass('no-js'); $nthMenuAnchor.on('click', function () {
        if ($(this).hasClass('nth-open')) { $notOpen.removeClass('nth-show-menu'); $(this).removeClass('nth-open'); $(this).attr('aria-expanded', false); } else { $notOpen.addClass('nth-show-menu'); $(this).addClass('nth-open'); $(this).attr('aria-expanded', true); }
        return false;
    })
    $('a').on('keyup change', function (e) {
        $('a').attr("data-focus", "none"); $("a").removeClass("focus-h"); if (e.keyCode === 9 && $(this).is(":focus")) { $(this).attr("data-focus", "focused"); $(this).addClass("focus-h"); }
        if (e.shiftKey && $(this).is(":focus")) { $(this).attr("data-focus", "focused"); $(this).removeClass("focus-h"); }
    }); $('button').on('keyup change', function (e) { $('button').attr("data-focus", "none"); if (e.keyCode === 9 && $(this).is(":focus")) { $(this).attr("data-focus", "focused"); } }); $(document).on('keydown', function (e) {
        if (e.keyCode === 27) { $notOpen.removeClass('nth-show-menu'); $nthMenuAnchor.removeClass('nth-open'); $nthMenuAnchor.attr('aria-expanded', false); }
        if (e.keyCode === 9) { $(this).addClass("yes"); }
    }); $('li:has("ul") > a').addClass('menu-hover'); $('li.nav-dropdown').hover(function () { $(this).children('ul.first').after('<span class="uparrow"></span>'); }, function () { $(this).children('ul.first').nextAll().remove(); }); $('li:not(:has(ul))').on('mouseover keyup click mouseleave', function (e) { if (e.keyCode === 16 | e.keyCode === 9 | e.type === 'mouseover') { $(".nav-dropdown").children("ul").removeClass('nth-show-menu').addClass('nth-hide-menu'); $(".menu-hover").attr('aria-expanded', false); } }); $('li:has("ul")').on('mouseover keyup click mouseleave', function (e) {
        if (e.keyCode === 9 | e.type === 'mouseover') { $(this).children('ul').removeClass('nth-hide-menu').addClass('nth-show-menu'); $(this).children('a').attr('aria-expanded', true); }
        if (e.type === 'mouseleave') { $(this).children('ul').removeClass('nth-show-menu').addClass('nth-hide-menu'); $(this).children('a').attr('aria-expanded', false); }
        if (e.type === 'click') {
            if ($(this).children('a').hasClass('nth-openSubMenu')) { $(this).children('a').removeClass('nth-openSubMenu').attr('aria-expanded', false); $(this).children('ul').removeClass('nth-show-menu').addClass('nth-hide-menu'); } else { $(this).children('a').addClass('nth-openSubMenu').attr('aria-expanded', true); $(this).children('ul').removeClass('nth-hide-menu').addClass('nth-show-menu'); }
            return true;
        }
    }); $('li > ul > li:last-child > a').on('keydown', function (e) { if ((e.keyCode == 9) && $(this).parent('li').children('ul').length == 0) { $(this).parent('li').parent('ul').removeClass('nth-show-menu').addClass('nth-hide-menu'); $(this).parent('li').parent('ul').prev('a').attr('aria-expanded', false); if ($(this).parent('li').parent('ul').parent('li').parent('ul').parent('li').children('ul').length > 0 && $(this).parent('li').parent('ul').parent('li').is(':last-child')) { $(this).parent('li').parent('ul').parent('li').parent('ul').removeClass('nth-show-menu').addClass('nth-hide-menu'); $(this).parent('li').parent('ul').prev('a').attr('aria-expanded', true); } } })
})
$(document).ready(function () {
    var catLocation = $(this).val(); $('#jsb-position').change(function () { var catFilter = $('#jsb-position option:selected').text(); if ($('#jsb-position').val().length > 0) { $('#filter-wrap').removeClass('hide1'); $('#filter-1').remove(); $('#filter-wrap').append('<div class="filter-list l-align-left" id="filter-1"><a href="#" class="filter-item" id="filter-item-1">' + catFilter + '</a></div>'); } else { $('#filter-wrap').addClass('hide1'); $('#filter-1').remove(); } }); $('#jsb-location').change(function () { var catFilter = $('#jsb-location option:selected').text(); if ($('#jsb-location').val().length > 0) { $('#filter-wrap').removeClass('hide2'); $('#filter-2').remove(); $('#filter-wrap').append('<div class="filter-list l-align-left" id="filter-2"><a href="#" class="filter-item" id="filter-item-2">' + catFilter + '</a></div>'); } else { $('#filter-wrap').addClass('hide2'); $('#filter-2').remove(); } }); $('#clear-filters').click(function () { $('#filter-1').remove(); $('#filter-2').remove(); $('#filter-wrap').addClass('hide1').addClass('hide2'); $('#jsb-position').val('').trigger('change'); $('#jsb-location').val('').trigger('change'); }); $(document).on('click', '#filter-item-1', function (e) { e.preventDefault(); $(this).remove(); $('#filter-wrap').addClass('hide1'); $('#jsb-position').val('').trigger('change'); }); $(document).on('click', '#filter-item-2', function (e) { e.preventDefault(); $('#filter-2').remove(); $('#filter-wrap').addClass('hide2'); $('#jsb-location').val('').trigger('change'); }); if ($('#page-nav').length) { var top = $('#page-nav').offset().top; }
    $(window).scroll(function () { var y = $(this).scrollTop(); if (y >= 500) { $('#page-nav').addClass('fixed'); $('.logo-anim').addClass('move'); } else { $('#page-nav').removeClass('fixed'); $(".logo-anim").removeClass('move'); } });
}); $(document).on('ready', function () { $('.slider-for').slick({ slidesToShow: 1, slidesToScroll: 1, arrows: true, fade: true, asNavFor: '.slider-nav' }); $('.slider-nav').slick({ slidesToShow: 5, slidesToScroll: 1, arrows: false, asNavFor: '.slider-for', dots: true, centerMode: true, centerPadding: '20px', focusOnSelect: true, infinite: true, speed: 300, slidesToShow: 5, slidesToScroll: 1, responsive: [{ breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1, } }, { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, } }, { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, } }, { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, } }] }); $('.single-item-rtl').slick({ arrows: true, rtl: true, infinite: true, speed: 300, slidesToShow: 1, slidesToScroll: 1, responsive: [{ breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1, } }, { breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, } }, { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, } }, { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, } }] }); }); $(document).ready(function () {
    $("#careers-question").validate({ messages: { first_name: { required: !0, minlength: 3 }, last_name: { required: !0, minlength: 3 }, reason_for_contact: { required: true }, email: { required: true }, message: { required: !0, minlength: 5 } }, messages: { first_name: { required: "Please enter your first name", minlength: "Your first name must consist of at least 3 characters" }, last_name: { required: "Please enter your last name", minlength: "Your last name must consist of at least 3 characters" }, reason_for_contact: "Please select your reason for contact", email: { required: "Please enter a valid email address" }, message: { required: "Please enter your question", minlength: "Your question must consist of at least 5 characters" } } }); $('#careers-question').submit(function () { $(".select-style-light").after($("#reason-for-contact-error")); }); $('#search-form :input').focus(function () { $(this).parent().addClass("valid-group").children("label.label-focus").removeClass("label-focus").addClass("label-blur"); }); $('#search-form :input').blur(function () { if ($('#jsb-keywords').val().length < 1) { $(this).prev().removeClass('label-blur').addClass('label-focus'); } else { $(this).prev().removeClass('label-focus').addClass('label-blur'); } }); $('#careers-question :input').focus(function () { $(this).parent().addClass("valid-group").children('label.label-focus').removeClass("label-focus").addClass("label-blur"); }); $('#careers-question :input').blur(function () { $(this).next('label.label-blur').removeClass("label-blur").addClass("label-focus"); }); var $secondNav = $("#secondary-nav"); var $mainNav = $(".last-line"); var $pageNav = $("#page-nav .l-site-width"); function winWidth() { if ($(window).width() < 829) { $mainNav.append($secondNav); } else { $pageNav.append($secondNav); } }
    winWidth(); $(window).resize(function () { winWidth(); }); var $box = $(".box"); var $over = ".over"; var $animWrap = ".anim-wrap"; $box.each(function () { $box.hover(function () { $(this).attr('aria-expanded', 'true'); $($over).attr('aria-hidden', 'false'); }, function () { $(this).attr('aria-expanded', 'false'); $($over).attr('aria-hidden', 'true'); $(this).siblings().attr('aria-expanded', 'false'); $($over).siblings().attr('aria-hidden', 'true'); }); }); $box.on('keyup change', function (e) { $box.attr("aria-expanded", "false"); if (e.keyCode === 9 && $(this).is(":focus")) { if ($(this).attr('aria-expanded') == 'false') { $(this).attr('aria-expanded', 'true'); $($over).attr('aria-hidden', 'false'); } else { $(this).attr('aria-expanded', 'false'); $($over).attr('aria-hidden', 'true'); $(this).siblings().attr('aria-expanded', 'false'); $($over).siblings().attr('aria-hidden', 'true'); } } }); $box.bind('touchstart', function () { e.preventDefault(); $(this).attr('aria-expanded', 'true'); $($over).attr('aria-hidden', 'false'); return true; }).bind('touchend', function () { $(this).attr('aria-expanded', 'false'); $($over).attr('aria-hidden', 'true'); $(this).siblings().attr('aria-expanded', 'false'); $($over).siblings().attr('aria-hidden', 'true'); return false; }); var $animation_elements = $('.anim-pic'); var $window = $(window); function check_if_in_view() {
        var window_height = $window.height(); var window_top_position = $window.scrollTop(); var window_bottom_position = (window_top_position + window_height); $.each($animation_elements, function () {
            var $element = $(this); var element_height = $element.outerHeight(); if ($element.length) { var element_top_position = $element.offset().top; }
            var element_bottom_position = (element_top_position + element_height); if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) { $element.addClass('in-view'); } else { $element.removeClass('in-view'); }
        });
    }
    $window.on('scroll resize', check_if_in_view); $window.trigger('scroll');
}); $(document).ready(function () { console.log("DOM is ready"); $('nav a[href^="#"]').click(function () { var target = $(this.hash); if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]'); if (target.length == 0) target = $('html'); $('html, body').animate({ scrollTop: target.offset().top }, 500); return false; }); $(window).on("load", function () { var tl1 = new TimelineMax({ delay: 0.3 }); tl1.to('.inner-banner .anim-pic', 0.4, { opacity: 1 }).to('.l-banner-h-width #b-4', 0.9, { bottom: 0, opacity: 1, ease: Power2.easeOut }, '0.3').to('.l-banner-h-width #b-1', 1.1, { bottom: 22, opacity: 1, ease: Power2.easeOut }, '-=0.8').to('.l-banner-h-width #b-6', 1.0, { bottom: 0, opacity: 1, ease: Power2.easeOut }, '-=1.0').to('.l-banner-h-width #b-7', 1.0, { bottom: 11, opacity: 1, ease: Power2.easeOut }, '-=1.0').to('.l-banner-h-width #b-3', 2.5, { bottom: 92, opacity: 1, ease: Power2.easeOut }, '-=2').to('.l-banner-h-width #b-3', 3.5, { bottom: 72, opacity: 1, ease: Power0.ease }).to('.l-banner-h-width #b-2', 2, { bottom: 7, opacity: 1, ease: Power2.easeOut }, '-=5.0').to('.l-banner-h-width #b-5', 2.4, { bottom: 20, opacity: 1, ease: Power2.easeOut }, '-=5.0'); var tl11 = new TimelineMax({ delay: 0.3 }); tl11.to('.inner-banner .anim-pic', 0.4, { opacity: 1 }).to('.l-banner-v-width #b-1', 0.9, { bottom: 160, opacity: 1, ease: Power2.easeOut }, '0.3').to('.l-banner-v-width #b-2', 0.9, { bottom: 207, opacity: 1, ease: Power2.easeOut }, '-=0.6').to('.l-banner-v-width #b-3', 1.0, { bottom: 178, opacity: 1, ease: Power2.easeOut }, '-=0.5').to('.l-banner-v-width #b-4', 1.2, { bottom: 75, opacity: 1, ease: Power2.easeOut }, '-=1.8').to('.l-banner-v-width #b-4', 1.5, { bottom: 0, opacity: 1, ease: Power0.ease }, '-=1.1').to('.l-banner-v-width #b-6', 1.0, { bottom: 53, opacity: 1, ease: Power2.easeOut }, '-=1.9').to('.l-banner-v-width #b-6', 1.5, { bottom: 3, opacity: 1, ease: Power0.ease }, '-=1.0').to('.l-banner-v-width #b-5', 1.3, { bottom: 30, opacity: 1, ease: Power2.easeOut }, '-=2.7'); tl1.restart(); tl11.restart(); }); }); var iScrollPos = 0; var $bannerPic = $('.inner-banner .anim-pic'); var $anaPic = $('.alter-content .anim-pic'); $(window).scroll(function () {
    var iCurScrollPos = $(this).scrollTop(); var $document = $(document); if (iCurScrollPos > iScrollPos) { $anaPic.addClass('scroll-down').removeClass('scroll-up'); } else { $anaPic.removeClass('scroll-down').addClass('scroll-up'); }
    iScrollPos = iCurScrollPos;
}); $('.panel-content').hide(); $('.accordion').attr({ role: 'tablist', multiselectable: 'true' }); $('.panel-content').attr('id', function (IDcount) { return 'panel-' + IDcount; }); $('.panel-content').attr('aria-labelledby', function (IDcount) { return 'control-panel-' + IDcount; }); $('.panel-content').attr('aria-hidden', 'true'); $('.accordion .panel-content').attr('role', 'tabpanel'); $('.panel-title').each(function (i) { $target = $(this).parent('.acc-header-wrap').next('.panel-content')[0].id; $link = $('<a>', { 'href': '#' + $target, 'aria-expanded': 'false', 'aria-controls': $target, 'id': 'control-' + $target, 'class': 'show-content' }); $(this).wrapInner($link); }); $('.cta-btn .panel-title ul').append('<li class="arrow-row"><span class="arrow-toggle"><span class="t-circle t-toggle-circle"></span><span class="t-arrow-down t-toggle-arrow-down"></span></span></li>'); $('.no-cta-btn .panel-title a').after('<span class="t-circle t-toggle-circle"></span><span class="t-arrow-down t-toggle-arrow-down"></span>'); $('.panel-title a').click(function () {
    if ($(this).attr('aria-expanded') == 'false') { $(this).parents('.accordion').find('[aria-expanded=true]').attr('aria-expanded', false).removeClass('active').parent().parent('.acc-header-wrap').next('.panel-content').slideUp(200).attr('aria-hidden', 'true'); $(this).attr('aria-expanded', true).addClass('active').parent().parent('.acc-header-wrap').next('.panel-content').slideDown(200).attr('aria-hidden', 'false'); } else { $(this).attr('aria-expanded', false).removeClass('active').parent().parent('.acc-header-wrap').next('.panel-content').slideUp(200).attr('aria-hidden', 'true');; }
    return false;
});