;(function(){
hlcomm.localdata("index").call(this);

this.main = function(){
	var menuobj = null;
	$(".nav_menu > a").mousemove(function(){
		var _index = $(this).attr("id");
		var _left = $(this).position().left;
		if (menuobj != null) {
			menuobj.menu("hide");
			menuobj = null;
		}
		menuobj = $("div[name='pop_"+_index+"']").menu('show',{left: _left,top: '70px'});
	}).click(function(){
		var _index = $(this).attr("id");
		$(".tabs li:not(:first,:last)").hide();
		$(".tabs li[name='tabs_"+_index+"']").show();
		$(".tabs li[name='tabs_"+_index+"']:first").click();
	});
	$(".tabs li").click(function(){
		if(!$(this).is(".tabs-selected")){
			$(".tabs li").removeClass("tabs-selected");
			$(this).addClass("tabs-selected");
			var _a = $(this).children("a");
			$("#"+_a.attr("target")).attr("src", _a.attr("href")); 
		}
	});
	$(".tabs li a").click(function(e){
		$(this).parents("li:eq(0)").click();
		return false;
	});
	var _iframeTitle = "";
	setInterval(function(){
		var _iframe = document.getElementById('_iframe');
		var title   = _iframe.contentWindow.document.title;//_iframe.contentWindow.location.href
		if(_iframeTitle != title) {
			_iframeTitle = title;
			$("#page-title").html(_iframeTitle);
		}
	},500);
}
})();