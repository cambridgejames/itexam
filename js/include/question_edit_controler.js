function QuestionTableControler() {
	// 选择题选项信息表格控制器
	this.insertSingleRow = function(tableBody, type) {
		// 在尾部新建一行并编辑
		var index = tableBody.children().length;
		if(index >= 26) {
			alert("已达到最大选项数量，无法继续添加");
			return;
		}
		var row = "<tr><td><input type=\"" + type + "\" name=\"" + type + "\"></td><td>" + String.fromCharCode(65 + index) + "</td><td></td><td></td><td>" + $("#template").children("div[data-id=template-function]").html() + "</td></tr>";
		tableBody.append(row);
		this.modifySingleRow(tableBody.children(":last-child"));
	}

	this.modifySingleRow = function(tableRow) {
		// 编辑选中行
		// console.log(tableRow);
	}

	this.moveUpSingleRow = function() {
		// 上移选中行
	}

	this.moveDowmSingleRow = function() {
		// 下移选中行
	}

	this.setAnswer = function(tableBody, answer) {
		// 设置初始正确答案
	}

	this.updateIndexs = function(tableBody) {
		// 更新选项序号
		var items = tableBody.children();
		for(var index = 0; index < items.length; index++) {
			tableBody.children(":nth-child(" + (index + 1) + ")").children(":nth-child(2)").html(String.fromCharCode(65 + index));
		}
		this.updateAnswer(tableBody);
	}

	this.updateAnswer = function(tableBody) {
		// 修改正确答案时同步更新表格行颜色和底部答案汇总
		var answer = this.getUpdateAnswer(tableBody);
		tableBody.parent().parent().parent().parent().next().children(":nth-child(2)").html(answer);
	}

	this.getUpdateAnswer = function(tableBody) {
		// 修改正确答案时同步更新表格航颜色并返回答案汇总
		var currentbody = tableBody.children();
		var answer = "";
		for(var index = 0; index < currentbody.length; index++) {
			if($(currentbody[index]).children(":first").children().is(":checked")) {
				$(currentbody[index]).addClass("success");
				answer += String.fromCharCode(65 + index) + ",";
			} else {
				$(currentbody[index]).removeClass("success");
			}
		}
		answer = answer.substr(0, answer.length - 1);
		if(answer.length === 0) { answer = "无"; }
		return answer;
	}
}
var questionTable = new QuestionTableControler();

function QusetionCheckControler() {
	// 试题表单验证控制器
	this.isQuestionNull = function() {
		// 查询试题是否全为空
	}
}
var questionCheck = new QusetionCheckControler();

$(document).on("change", "select[data-type=type]", function(event) {
	// 功能：切换题目类型
	var type = parseInt($(event.target).val());
	var area = $(event.target).parent().parent().nextAll("div[data-effect=area]").children("div").children("textarea");
	var effect = $(event.target).parent().parent().nextAll("div[data-effect=choice]");
	var answer = effect.parent().nextAll("div[data-effect=answer]");
	switch(type) {
	case 1:
		area.attr("rows", "1");
		effect.html($("#template").children("div[data-id=template-choice]").html());
		answer.html($("#template").children("div[data-id=template-answer]").html());
		effect.children().children("a[role=button]").attr("data-qt", "radio");
		break;
	case 2:
		area.attr("rows", "1");
		effect.html($("#template").children("div[data-id=template-choice]").html());
		answer.html($("#template").children("div[data-id=template-answer]").html());
		effect.children().children("a[role=button]").attr("data-qt", "checkbox");
		break;
	default:
		area.attr("rows", "6");
		effect.html("");
		answer.html("");
	}
});

$(document).on("click", "a[data-qt]", function(event) {
	// 功能：为单、多选题添加选项
	var appendNode = $(event.target)[0].nodeName === "SPAN" ? $(event.target).parent("a") : $(event.target);
	questionTable.insertSingleRow(appendNode.next().children("tbody"), appendNode.data("qt"));
});

$(document).on("click", "tbody>tr>td>input[type=radio],tbody>tr>td>input[type=checkbox]", function(event) {
	// 功能：修改正确答案时同步更新表格行颜色和底部答案汇总
	var currentbody = $(event.target).parent().parent().parent()
	questionTable.updateAnswer(currentbody);
});

$(document).on("click", "a[data-effect=fdelete]", function(event) {
	// 功能：删除指定的选项
	var tableBody = $(event.target).parent().parent().parent();
	$(event.target).parent().parent().remove();
	questionTable.updateIndexs(tableBody);
});

$(document).on("click", "li[class*=form-horizontal]>div[class*=btn-r]>button[class*=btn-danger]", function(event) {
	// 功能：仅从试题列表中删除当前试题
	if(confirm("真的要删除该试题吗？该操作将无法恢复")) {
		$(event.target).parent().parent().remove();
	}
});

/*
 * 题目预览模态窗口控制器
*/
$(document).on("click", "li[class*=form-horizontal]>div[class*=btn-r]>button[class*=btn-info]", function(event) {
	// 功能：预览当前题目
	var appendNode = $(event.target)[0].nodeName === "SPAN" ? $(event.target).parent() : $(event.target);
	var currentForm = appendNode.parent().siblings("form");
	var modelBody = $("#previewModal").children().children().children(".modal-body");
	var rows = currentForm.children(":last-child").find("table>tbody>tr>td:nth-child(3)");

	switch(parseInt(currentForm.children(":first-child").children(":nth-child(2)").children("select").val())) {
	case 1:
		modelBody.children(":first-child").html("<p><b>1. 单项选择题</b></p>");
		modelBody.find("form").html(parseTableBody("radio", rows));
		modelBody.children(":last-child").html("<b>作答结果：</b><b>无</b>");
		break;
	case 2:
		modelBody.children(":first-child").html("<p><b>1. 多项选择题</b></p>")
		modelBody.find("form").html(parseTableBody("checkbox", rows));
		modelBody.children(":last-child").html("<b>作答结果：</b><b>无</b>");
		break;
	default:
		modelBody.children(":first-child").html("<p><b>1. 阅读题</b></p>");
		modelBody.find("form").html("");
		modelBody.children(":last-child").html("");
	}

	var currentArray = currentForm.children("div[data-effect=area]").children(":nth-child(2)").children("textarea").val().split("\n");
	var currentContent = "";
	$.each(currentArray, function(index, value) {
		currentContent += "<p>" + value + "</p>";
	});
	modelBody.children(":nth-child(2)").html(currentContent);
	$("#previewModal").modal("show");

	function parseTableBody(type, rows) {
		var content = "<table class=\"table\"><tbody>";
		for(var index = 0; index < rows.length; index++) {
			content += "<tr><td><input type=\"" + type + "\" name=\"" + type + "\"/></td><td>" + String.fromCharCode(65 + index) + "</td><td>" + $(rows[index]).html() + "</td></tr>";
		}
		content += "</tbody></table>";
		return content;
	}
});

$(document).on("click", ".modal-body>form>table>tbody>tr>td>input", function(event) {
	// 功能：为预览题目时更新答案汇总结果和表格样式提供事件绑定支持
	var tableBody = $(event.target).parent().parent().parent();
	var answer = questionTable.getUpdateAnswer(tableBody);
	tableBody.parent().parent().next().children(":last-child").html(answer);
});

