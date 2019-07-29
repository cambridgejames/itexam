(function($){
	$.fn.extend({
		getStrength:function() {
			/* 功能：获取输入框中密码的强度
			 * 返回值：empty:空，weak:弱，middle:中等，strong:强
			 */
			// console.log($(this)[0].nodeName);
			if($(this)[0].nodeName.toUpperCase() === "INPUT" && $(this).attr("type").toUpperCase() === "PASSWORD") {
				// 开始验证
				var password = $(this).val();
				if(password.length === 0) { return "empty"; }

				var upperCase= new RegExp('[A-Z]');
				var lowerCase= new RegExp('[a-z]');
				var numbers = new RegExp('[0-9]');
				var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

				var score = 0;
				if(password.length >= 8) { score += 1; }
				if(password.length >= 20) { score += 1; }
				if(password.match(upperCase)) { score += 1; }
				if(password.match(lowerCase)) { score += 1; }
				if(password.match(numbers)) { score += 1; }
				if(password.match(specialchars)) { score += 1; }

				var solution;
				switch(score) {
				case 1:
				case 2:
					return "weak";
				case 3:
				case 4:
					return "middle";
				case 5:
				case 6:
					return "strong";
				default:
					return "empty";
				}
			} else {
				// 弱不是输入框或输入框类型不是密码则直接返回
				return;
			}
		},
	});
})(jQuery);
