$(document).on("shown.bs.collapse", "#question-list-panel", function() {
	$("#question-list-btn").children(":first-child").html("隐藏题目列表");
});

$(document).on("hidden.bs.collapse", "#question-list-panel", function() {
	$("#question-list-btn").children(":first-child").html("展开题目列表");
});

