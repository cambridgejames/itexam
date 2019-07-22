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
					$("#question-list").html("");
					for(var index = 1; index <= paperAction.problems.length; index++) {
						$("#question-list").append("<li>" + index + "</li>");
					}
					$("#initModal").find("div[class*=modal-body]").find("span").html("加载用户数据");
					paperAction.getUserData();
				}
			},
			error: function() {
				$("#initModal").modal("hide");
				alert("服务器错误，请检查您的网络设置。");
			}
		});

		this.fillQuestion = function(index) {
			// 将试题数据填入列表
			var currentQuestion = this.problems[index];
		}
	}

	this.getUserData = function() {
		// 查询用户作答信息
		this.userData = [];
		$("#initModal").modal("hide");
	}

	this.display = function(index) {
		// 试题切换动画
		// 根据序号大小切换动画方向
		if(index === this.currentIndex) { return; }
		var width = $(window).width();
		if(index < this.currentIndex) { width = -width; }

		this.animating = true;
		var lastNode = $($("body").children(".row-list")[0]);
		lastNode.after($("#template").html());
		var currentNode = $($("body").children(".row-list")[1]);
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

$(document).on("click", "#question-list>li:not([class*=current])", function(event) {
	if(paperAction.animating) { return; }
	$("#question-list").children("li").removeClass("current");
	$(this).addClass("current");
	paperAction.display($(this).index() + 1);
});

