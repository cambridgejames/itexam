$(document).on("click", "#bp-btn-cancel", function() {
	// 功能：取消试题编辑（不保存直接返回原网页）
	if(confirm("若现在离开，系统将不会保存您所做的更改")) {
		// TODO
	}
});

$(document).on("click", "#bp-btn-new", function() {
	// 功能：向试题列表中添加新的试题
	$("ul[class*=question-list]").append($("#template").children("div[data-id=template-question]").html());
	$("ul[class*=question-list]").children(":last-child").children("form").children(":first-child").children("div").children("select").trigger("change");
});

$(document).on("click", "#bp-btn-upload", function() {
	console.log("upload");
});

