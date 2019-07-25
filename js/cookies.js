// JavaScript Document

function setCookie(name, value, date, time) {
	'use strict';
	var exp = new Date((date).valueOf() + time * 86400000);
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";expires=" + exp;
	return exp;
}

function getCookieByName(name) {
	'use strict';
    var startIndex = document.cookie.indexOf(encodeURIComponent(name));
    if (startIndex > -1) {
		var endIndex_raw = document.cookie.indexOf(";", startIndex + encodeURIComponent(name).length);
		var endIndex = (endIndex_raw === -1) ? document.cookie.length : endIndex_raw;
		
        var tempStr = document.cookie.substring(startIndex, endIndex);
        return decodeURIComponent(tempStr.split("=")[1]);
    }
	else {
		return "";
	}
}

function deleteCookieByName(name) {
	'use strict';
	setCookie(name, "", -1, -1);
}
