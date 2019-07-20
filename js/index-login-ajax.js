$("#login").click(function() { logins(); });
$("body").keydown(function(e) { if(e.keyCode === 13) { logins(); } });

$("input").on('input propertychange', function() {
	$("#textDanger").html("");
});

function logins() {
	/**
	* 提交用户名和密码，并拦截空值的情况
	*/
	var username = $("#username").val();
	var password = $("#password").val();
	if(username.length === 0 || password.length === 0) {
		$("#textDanger").html("用户名或密码不能为空");
		return;
	}

	$.ajax({
		"cache": false,
		"url": "http://itexam.sealbaby.cn/login",
		"type": "post",
		"data": {card_num: username,password: password},
		"dataType": "json",
		"success": function(data) {
			switch(data.code) {
				case 1005:
					$("#textDanger").html("用户名或密码错误");
					break;
				case 1000: // 正常登录并跳转
					setCookie(Base.encode("token"), Base.encode(data.data.token), new Date());
					setCookie(Base.encode("currentuser"), Base.encode(JSON.stringify(data.data.user)), new Date());
					window.location.replace("./global.html");
					break;
				default:
					$("#textDanger").html("请求失败");
			}
		},
		"error": function(XMLHttpRequest, textStatus, errorThrown) {
			$("#textDanger").html("服务器异常，请检查网络连接");
		}
	})
}