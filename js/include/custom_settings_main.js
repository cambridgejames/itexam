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

$(document).on("input propertychange", "li[data-setting=change-password]>div[data-effect=new] input[type=password], li[data-setting=change-password]>div[data-effect=repeat] input[type=password]", function() {
	var firstInput = $("li[data-setting=change-password]>div[data-effect=new] input[type=password]");
	var secondInput = $("li[data-setting=change-password]>div[data-effect=repeat] input[type=password]");
	if(firstInput.val() === secondInput.val()) {
		secondInput.next().children("font").attr("class", "glyphicon glyphicon-ok");
		secondInput.next().children("font").attr("color", "green");
	} else {
		secondInput.next().children("font").attr("class", "glyphicon glyphicon-remove");
		secondInput.next().children("font").attr("color", "red");
	}
});

$(document).on("click", "li[data-setting=change-password]>div[data-effect=submit]>button", function() {
	var firstInput = $("li[data-setting=change-password]>div[data-effect=new] input[type=password]");
	var secondInput = $("li[data-setting=change-password]>div[data-effect=repeat] input[type=password]");
	var tester = /[\u4e00-\u9fa5]+|[" "]/g;
	if(firstInput.val() === secondInput.val()) {
		$(this).prev().html("两次输入的新密码不一致");
		return;
	} else if(firstInput.val().length < 6 || firstInput.val().length > 50) {
		$(this).prev().html("新密码长度不符合规范");
		return;
	}
	var matcher = firstInput.val().match(tester);
	var input = firstInput.val();
	for(var index = 0; index < matcher.length; index++) {
		input = input.replace(matcher[index], "");
	}
	if(input.length !== 0) {
		$(this).prev().html("新密码包含非法字符");
		return;
	}
	// TODO: 密码上传逻辑
});

