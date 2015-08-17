;(function(){
hlcomm.localdata("propb").call(this);

this.paiban = function(){
	$("#dep_tree").combotree({
       required: true,
	   editable:true,
	   multiple:true,
	   data: [{text:"内科一区"
			   ,id:1
			   ,children:[{text:"内分沁科",id:2}
                        ,{text:"普通内科",id:3}
						  ,{text:"消化内科",id:4}
						  ,{text:"肝病科",id:5}
						  ,{text:"肾内科",id:6}
						  ,{text:"风湿科",id:7}]
	   }]
	});  
	
	$(".bc_btn .sel-tabs").click(function(){
		$(".bc_btn .sel-tabs").removeClass("selected");
		$(this).addClass("selected");
	});
	
	$(".bc_btn .last").click(function(){
		var checkbox = $(this).children(":checkbox")[0];
		checkbox.checked = !checkbox.checked;
	});
	$(".bc_btn .last :checkbox").click(function(e){e.stopPropagation();});
}

this.banci = function(){}
})();