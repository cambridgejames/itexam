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

$(document).on("click", "li[data-setting=change-password]>div[data-effect=submit]>a", function() {
	var firstInputVal = $("li[data-setting=change-password]>div[data-effect=new] input[type=password]").val();
	var secondInputVal = $("li[data-setting=change-password]>div[data-effect=repeat] input[type=password]").val();
	if(firstInputVal !== secondInputVal) {
		$(this).prev().html("两次输入的新密码不一致");
		return;
	}
	if(firstInputVal.length < 6 || firstInputVal.length > 50) {
		$(this).prev().html("新密码长度不符合规范");
		return;
	}
	var tester = /[A-Z]|[a-z]|[0-9]|[!,%,&,@,#,$,^,*,?,_,~]/g;
	var matcher = firstInputVal.match(tester);
	var input = firstInputVal;
	if(matcher) {
		for(var index = 0; index < matcher.length; index++) {
			input = input.replace(matcher[index], "");
		}
	}
	if(!matcher || input.length !== 0) {
		$(this).prev().html("新密码包含非法字符");
		return;
	}
	// TODO: 密码上传逻辑
	$(this).prev().html("");
});

