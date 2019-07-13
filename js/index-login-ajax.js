$("#login").click(function() { logins(); });
$("body").keydown(function(e) {
	if(e.keyCode === 13) {
		logins();
	}
});

$("input").on('input propertychange', function() {
	$("#textDanger").html("");
});

function logins() {
	/**
	* 提交用户名和密码，并拦截空值的情况
	*/
	var username = Base.encode($("#username").val());
	var password = Base.encode($("#password").val());

	if(username.length === 0 || password.length === 0) {
		$("#textDanger").html("用户名或密码不能为空");
		return;
	}
	console.log("login");

	$.ajax({
		"cache": false,
		"url": "",
		"type": "post",
		"data": "",
		"dataType": "json",
		"success": function(data) { },
		"error": function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest);
		}
	})
}