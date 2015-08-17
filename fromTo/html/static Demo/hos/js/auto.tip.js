$.fn.autoTip = function(g){
	/** 
	 * input自动提示插件 
	 * @author yuejing
	 * @version 1.0
	 * 
	 * 参数 
	 * @input 入参 
	 * json对象 
	 * @ clsTip 默认提示信息样式名class 
	 * @ clsTipNone 在指定的input执行click时替换的样式名class 
	 * 
	 *使用方法:
	 * <input type="text" class="auto-tip" id="test" data-tip="请输入姓名"/>
	 * 加上class="auto-tip"
	 * data-tip为提示的内容
	 */
	var d;
	d = {
			//默认提示信息样式名class
			clsTip:'input_tip',
			//在指定的input执行click时替换的样式名class
			clsTipNone:'input_tip_none'
	};
	$.extend(d, g);
	var _this = $(this);
	var _val = _this.attr('data-tip');
	if (_this.val()==''){
		_this.val(_val)
		.addClass(d.clsTip)
		.click(function(){
			if(_this.val()==_val){
				_this.val('');
				_this.removeClass(d.clsTip);
				_this.addClass(d.clsTipNone);
			}
		})
		.blur(function(){
			if(_this.val()==''){
				_this.removeClass(d.clsTipNone);
				_this.addClass(d.clsTip);
				_this.val(_val);
			}
		});
	};
};
//提交到后台时不提交提示文字
var autoTip = {
		//time为清空后间隔多少毫秒恢复默认提示
		clear : function(time) {
			$('.auto-tip').each(function(i, obj) {
				var _obj = $(obj);
				if(_obj.attr('data-tip') === _obj.val())
					_obj.val('');
			});
			if(time!=undefined)
				setTimeout('autoTip.init()', time);
		},
		init : function() {
			$('.auto-tip').each(function(i, obj) {
				$(obj).autoTip();
			});
		}
};
$(function() {
	autoTip.init();
	$(document).ajaxStart(function(){
		autoTip.clear();
	});
	$(document).ajaxSuccess(function(){
		autoTip.init();
	});
});