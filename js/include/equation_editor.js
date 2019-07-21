/*
 * 公式编辑控制器
 */
function EquationControler() {
	// 公式编辑控制器
	this.getEquation = function() {
		$("#equationModal").modal("show");
		return "    ";
	}
}
var equationCtrl = new EquationControler();

$(document).on("click", ".input-group-addon", function(event) {
	// 功能：单击插入公式按钮时触发按钮编辑器
	var targInput = $(event.target).prev();
	var index = targInput.getCurPos();
	var content = targInput.val();
	var equation = equationCtrl.getEquation();
	if(equation.length === 0) {
		return;
	}
	content = content.substr(0, index) + "$$" + equation + "$$" + content.substr(index, content.length);
	targInput.val(content);
	targInput.setCurPos(index + equation.length + 4, index + equation.length + 4);
});

