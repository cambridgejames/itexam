$(document).ready(function() {
	var cookieconfirm = getCookieByName("confirm");
	if(cookieconfirm) {
		$("#cookie-tip").removeClass("active");
	} else {
		$("#cookie-tip").addClass("active");
	}
});

$("#cookie-confirm").click(function() {
	$("#cookie-tip").removeClass("active");
	setCookie("confirm", true, new Date(), 30);
});
