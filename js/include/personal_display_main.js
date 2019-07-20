$(document).ready(function(){
	var hour = new Date().getHours();
	var tip = "";
	if( hour < 6 ){ tip += "凌晨"; }
	else if ( hour < 9 ){ tip += "早上"; }
	else if ( hour < 12 ){ tip += "上午"; }
	else if ( hour < 14 ){ tip += "中午"; }
	else if ( hour < 19 ){ tip += "下午"; }
	else { tip += "晚上"; }

	var user = JSON.parse(Base.decode(getCookieByName(Base.encode("currentuser"))));
	tip += "好，" + user.name + "。";
	$("#header-hello").html(tip);

	var info = "";
	info += parseItem("学号/工号", user.card_num);
	info += parseItem("性别", user.sex);
	info += parseItem("邮箱", user.email);
	info += parseItem("上次登陆时间", new Date());
	$("#user-info").html(info);

	function parseItem(title, data) {
		var item = data ? "<li><b>" + title + "</b>：" + data + "</li>" : "";
		return item;
	}
});

