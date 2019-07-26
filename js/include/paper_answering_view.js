function AnsweringControler() {
	this.updateAnswer = function(tableBody) {
		// 答案修正及相关操作统一入口
		var answer = questionTable.getUpdateAnswer(tableBody);
		tableBody.parent().parent().next().children("label:last-child").html(answer);
	}
}
var answerCtrl = new AnsweringControler();

$(document).on("click", "#question-list-btn", function() {
	// 功能：显示或隐藏试题列表
	if($("#question-list-panel").hasClass("closed")) {
		$("#question-list-panel").removeClass("closed");
		$("#question-list-btn").children("span:first-child").html("隐藏题目列表");
	} else {
		$("#question-list-panel").addClass("closed");
		$("#question-list-btn").children("span:first-child").html("展开题目列表");
	}
});

$(document).on("click", "form>table>tbody>tr", function(event) {
	// 功能：点击表格行修改正确答案时同步更新表格行颜色和底部答案汇总
	var tableRow = $(event.target);
	if(tableRow[0].nodeName === "INPUT") {
		return;
	}
	for(var index = 0; index < 10 && tableRow[0].nodeName !== "TR"; index++) {
		tableRow = tableRow.parent();
	}
	tableRow.find("input").prop("checked", !tableRow.find("input").prop("checked"));
	var tableBody = tableRow.parent();
	answerCtrl.updateAnswer(tableBody);
});

$(document).on("click", "form>table>tbody>tr>td>input", function(event) {
	// 功能：点击选项按钮修改正确答案时同步更新表格行颜色和底部答案汇总
	var tableBody = $(event.target).parent().parent().parent();
	answerCtrl.updateAnswer(tableBody);
});

