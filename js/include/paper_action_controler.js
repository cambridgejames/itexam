// 试卷作答页面行为控制脚本

function PaperActionControler() {
	this.paperInfo;
	this.problems;
	this.userData;

	this.currentIndex = -1;
	this.problemCache = [];

	this.animating = false; // 动画执行标志，防止动画冲突

	this.flush = function() {
		// 清空试卷
		this.paperInfo = null;
		this.problems = null;
		this.userData = null;
	}

	this.getPaper = function() {
		// 查询试卷信息
		$.ajax({
			"data": {"paper_id":1},//TODO
			"dataType": "json",
			"headers": {
				"Content-Type":"application/json;charset=utf8",
				"token":Base.decode(getCookieByName(Base.encode("token")))
			},
			"type": "GET",
			"url": " http://itexam.sealbaby.cn/paper",
			success: function(data) {
				if(data.code === 1000) {
					$("#initModal").find("div[class*=modal-body]").find("span").html("加载试卷");
					paperAction.paperInfo = data.message.info;
					paperAction.problems = data.message.problems;
					$("#paper-name").html(paperAction.paperInfo.paper_name);
					$("#paper-index").html("1/" + paperAction.problems.length);
					$("#question-list").children("li").remove();
					var questionList = "";
					for(var index = 1; index <= paperAction.problems.length; index++) {
						questionList += "<li>" + index + "</li>";
					}
					$("#question-list").prepend(questionList);
					$("#initModal").find("div[class*=modal-body]").find("span").html("加载用户数据");
					paperAction.getUserData();
				}
			},
			error: function() {
				$("#initModal").modal("hide");
				alert("服务器错误，请检查您的网络设置。");
			}
		});

		this.fillQuestion = function(question, index) {
			// 将试题数据填入列表
			var currentQuestion = this.problems[index - 1];
			switch(parseInt(currentQuestion.type)) {
			case 1:
				question.find("div[data-effect=type]").html("<p>" + index + ". 单项选择题</p>");
				question.find("form>table>tbody").html(parseTableBody("radio", currentQuestion.content.options));
				question.find("label:first-child").html("作答结果：");
				question.find("label:last-child").html("无");
				break;
			case 2:
				question.find("div[data-effect=type]").html("<p>" + index + ". 多项选择题</p>");
				question.find("form>table>tbody").html(parseTableBody("checkbox", currentQuestion.content.options));
				question.find("label:first-child").html("作答结果：");
				question.find("label:last-child").html("无");
				break;
			default:
				question.find("div[data-effect=type]").html("<p>" + index + ". 阅读题</p>");
				question.find("form>table>tbody").html("");
				question.find("label:first-child").html("");
				question.find("label:last-child").html("");
			}
			var currentContent = "";
			$.each(currentQuestion.content.problem.split("\n"), function(index, value) {
				currentContent += "<p>" + value + "</p>";
			});
			question.find("div[data-effect=area]").html(currentContent);

			function parseTableBody(type, rows) {
				var content = "<table class=\"table table-hover\"><tbody>";
				$.each(rows, function(index, value) {
					content += "<tr><td><input type=\"" + type + "\" name=\"" + type + "\"/></td><td>" + index + "</td><td>" + value + "</td></tr>";
				});
				content += "</tbody></table>";
				return content;
			}
		}
	}

	this.getUserData = function() {
		// 查询用户作答信息
		this.userData = [];
		$("#initModal").modal("hide");
	}

	this.display = function(index) {
		// 试题切换动画
		if(index > paperAction.problems.length) {
			alert("已经是最后一题");
			return;
		}
		// 根据序号大小切换动画方向
		if(index === this.currentIndex) { return; }
		var width = $(window).width();
		if(index < this.currentIndex) { width = -width; }

		this.animating = true;
		$("#paper-index").html(index + "/" + paperAction.problems.length);
		$("#question-list").children("li").removeClass("current");
		$("#question-list").children("li:nth-child(" + index + ")").addClass("current");
		var lastNode = $($("body").children(".row-list")[0]);
		lastNode.after($("#template").html());
		var currentNode = $($("body").children(".row-list")[1]);
		paperAction.fillQuestion(currentNode, index);
		currentNode.attr("style", "position:absolute;top:43px;margin-left:" + width + "px;");
		lastNode.animate({"marginLeft":-width}, 400, function() {
			lastNode.remove();
			paperAction.animating = false;
		});
		currentNode.animate({"marginLeft":0}, 400, function() {
			currentNode.removeAttr("style");
		});
		this.currentIndex = index;
	}
}
var paperAction = new PaperActionControler();

$('#initModal').on('hidden.bs.modal', function () {
	paperAction.display(1);
	$("#question-list").children("li:first-child").addClass("current");
});

$(function() {
	/*
	 * 功能：试题作答页面初始化程序，负责加载试卷和已做答信息
	 */
	$("#initModal").modal("show");
	paperAction.flush();
	paperAction.getPaper();
});

$(document).on("click", "div[class*=question-view] button[data-effect=next]", function(event) {
	paperAction.display(paperAction.currentIndex + 1);
});

$(document).on("click", "#question-list>li:not([class*=current])", function(event) {
	// 点击底部列表切换
	if(paperAction.animating) { return; }
	paperAction.display($(this).index() + 1);
});

