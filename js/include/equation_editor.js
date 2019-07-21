/*
 * 公式编辑控制器
 */
function EquationControler() {
	// 公式编辑控制器
	this.object;
	this.index;

	this.getEquation = function() {
		// 先清空输入框和预览内容，再显示模态框
		$("#equationModal").find("textarea[class*=form-control]").val("");
		$("#equationModal").find(".modal-body>div>span").html("");
		$("#equationModal").modal("show");
	}
}
var equationCtrl = new EquationControler();

$(document).on("click", ".input-group-addon", function(event) {
	// 功能：单击插入公式按钮时触发按钮编辑器
	var targInput = $(event.target).prev();
	var index = targInput.getCurPos();
	equationCtrl.object = targInput;
	equationCtrl.index = index;
	equationCtrl.getEquation();
});

$(document).on("click", "#equationModal button[class*=btn-primary][data-dismiss]", function() {
	var equation = $("#equationModal").find("textarea[class*=form-control]").val();
	if(equation.length === 0) { return; }
	equation = "$$" + equation + "$$";
	var content = equationCtrl.object.val();
	content = content.substr(0, equationCtrl.index) + equation + content.substr(equationCtrl.index, content.length);
	equationCtrl.object.val(content);
	equationCtrl.object.setCurPos(equationCtrl.index + equation.length, equationCtrl.index + equation.length);
});

