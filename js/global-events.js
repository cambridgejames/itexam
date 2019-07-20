$(document).ready(function() {
	$("#hello-info-time").html("早上");
	$("#container-aside").height($("#hello-container").height() - 40);
});

$("#collapse-parent").mouseleave(function() {
	$('#collapse').collapse('hide');
});

$("#go-top").click(function() {
	if($(window).scrollTop() > 10) {
		$(window).scrollTop(0);
	}
});

function SetFrameHeight(obj) {
	if (document.getElementById) {
		if (obj && !window.opera) {
			if (obj.contentDocument && obj.contentDocument.body.offsetHeight) {
				obj.height = obj.contentDocument.body.offsetHeight + 40; 
			}
			else if(obj.Document && obj.Document.body.scrollHeight) {
				obj.height = obj.Document.body.scrollHeight + 40;
			}
		}
	}
	$("#container-aside").height($("#hello-container").height() - 40);
}