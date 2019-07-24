$(function() {
	var user = JSON.parse(Base.decode(getCookieByName(Base.encode("currentuser"))));
	$("span[data-effect=username]").html(user.name);
	var functionList = "<li class=\"selected\"><span class=\"glyphicon glyphicon-user\"></span> <span>个人信息</span></li>";
	switch(user.role) {
		case "student":
		functionList += "<li><span class=\"glyphicon glyphicon-home\"></span> <span>班级</span></li><li><span class=\"glyphicon glyphicon-edit\"></span> <span>作业</span></li>";
		break;
		case "teacher":
		functionList += "<li><span class=\"glyphicon glyphicon-book\"></span> <span>题库</span></li>";
		case "admin":
		functionList += "<li><span class=\"glyphicon glyphicon-list-alt\"></span> <span>用户查询</span></li><li><span class=\"glyphicon glyphicon-list-alt\"></span> <span>试卷查询</span></li><li><span class=\"glyphicon glyphicon-list-alt\"></span> <span>成绩查询</span></li>";
		default:
	}
	functionList += "<li><span class=\"glyphicon glyphicon-cog\"></span> <span>设置</span></li>";
	$(".article-main").find("ol[class*=hide-scroll-bars]").html(functionList);
	$(".article-main").find("ol[class*=hide-scroll-bars]").children("li:first-child").trigger("click");
});

$(document).on("click", ".article-main>.navbar-side>ol>li", function(event) {
	$(this).parent().children("li").removeClass("selected");
	$(this).addClass("selected");
	var listItem = $(this).children(":last-child").html();
	switch(listItem) {
	case "个人信息":
		$("#main-frame").attr("src", "/view/personal_display.html");
		break;
	case "班级":
		$("#main-frame").attr("src", "");
		break;
	case "作业":
		$("#main-frame").attr("src", "/view/paper-answering-view.html");
		break;
	case "题库":
		$("#main-frame").attr("src", "/view/create_question.html");
		break;
	case "用户查询":
		$("#main-frame").attr("src", "");
		break;
	case "试卷查询":
		$("#main-frame").attr("src", "");
		break;
	case "成绩查询":
		$("#main-frame").attr("src", "");
		break;
	case "设置":
		$("#main-frame").attr("src", "");
		break;
	default:
	}
});

$(document).on("click", "span[data-effect=logout]", function() {
	deleteCookieByName(Base.encode("token"));
	deleteCookieByName(Base.encode("currentuser"));
	window.location.replace("/");
});

