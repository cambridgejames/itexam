$(function() {
	$("[data-toggle='tooltip']").tooltip();
});

$(document).on("input propertychange", "li[data-setting=change-password]>div[data-effect=new] input[type=password]", function() {
	var strength = $(this).getStrength();
	switch(strength) {
	case "weak":
		$(this).next().children("a").html("弱");
		$(this).next().children("a").attr("class", "btn btn-danger");
		break;
	case "middle":
		$(this).next().children("a").html("中");
		$(this).next().children("a").attr("class", "btn btn-warning");
		break;
	case "strong":
		$(this).next().children("a").html("强");
		$(this).next().children("a").attr("class", "btn btn-success");
		break;
	default:
		$(this).next().children("a").html("空");
		$(this).next().children("a").attr("class", "btn btn-default");
	}
});

