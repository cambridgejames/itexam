function SubjectControler() {
	this.subject = [];

	this.updateSubject = function() {
		$.ajax({
			"url": "http://itexam.sealbaby.cn/subjects/all",
			"data": {"page":1,"pageSize":10000},
			"dataType": "json",
			"type": "GET",
			success: function(data) {
				if(parseInt(data.code) === 1000) {
					subjetCtrl.subject = data.subjects.data;
					$("ul[class*=question-list]>li>form>div:nth-child(2)>div>select>option").remove();
					$("ul[class*=question-list]>li>form>div:nth-child(2)>div>select").append(subjetCtrl.getSubject());
				}
			},
			error: function() {
				alert("服务器异常，请检查您的网络设置。");
			}
		});
	}

	this.getSubject = function() {
		var options = "";
		var currentOption;
		for(var index = 0; index < this.subject.length; index++) {
			currentOption = this.subject[index];
			options += "<option value=\"" + currentOption.id + "\">" + currentOption.name + "</option>";
		}
		return options;
	}
}
var subjetCtrl = new SubjectControler();

$(function() {
	subjetCtrl.updateSubject();
});

$(document).on("click", "#bp-btn-cancel", function() {
	// 功能：取消试题编辑（不保存直接返回原网页）
	if(confirm("若现在离开，系统将不会保存您所做的更改")) {
		// TODO
	}
});

$(document).on("click", "#bp-btn-new", function() {
	// 功能：向试题列表中添加新的试题
	$("ul[class*=question-list]").append($("#template").children("div[data-id=template-question]").html());
	$("ul[class*=question-list]>li:last-child>form>div:nth-child(2)>div>select").append(subjetCtrl.getSubject());
	$("ul[class*=question-list]").children(":last-child").children("form").children(":first-child").children("div").children("select").trigger("change");
});

$(document).on("click", "#bp-btn-upload", function() {
	console.log("upload");
});

