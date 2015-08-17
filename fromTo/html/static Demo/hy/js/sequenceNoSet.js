/**
 * 排列序号设置
 */
var sequenceNo = {
		
		unit_url:webroot+'/hHos/f_json/save.shtml',
		dep_url:webroot+'/hDep/f_json/save.shtml',
		per_url:webroot+'/hDoc/f_json/save.shtml',
		schwt_url:webroot+'/hSchWorkTime/f_json/save.shtml',		
		
		mouseover: function(id,index){
			$('#'+id+index).addClass("spinner-arrow-hover");
		},
		
        mouseout:function(id,index){
			$('#'+id+index).removeClass("spinner-arrow-hover");
		},
		
		onlyNum:function(id,index,type,wtname) {
			var value=$('#sort_edit'+index).val();
			if(parseInt(value)>Math.pow(10,10)-1){event.returnValue=false;}
			else if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39)){
				if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105))){
					if(event.keyCode==13){
						sequenceNo.setOrder(id,index,type,wtname);
					}else{
						event.returnValue=false;
					}
				}else if(value==0){
					$('#sort_edit'+index).val("");
				}
			}															    			  			    
		},
		
		setValue:function(index,type,id,type2,wtname){
			var value = parseInt($('#sort_edit'+index).val());
			if(type=="increase"&&value<Math.pow(10,11)-1){
				$('#sort_edit'+index).val(value+1);
				sequenceNo.setOrder(id,index,type2,wtname);
			}else if(value>0){
				$('#sort_edit'+index).val(value-1);
				sequenceNo.setOrder(id,index,type2,wtname);
			}
		},
		
		setOrder:function (id,index,type,wtname){
			var value = $('#sort_edit'+index).val();
			var str="",url="";
			if(type=="hHosPanel"){
				str = "hosId="+id+"&orderBy="+value;
				url = sequenceNo.unit_url;
			}else if(type=="hDepPanel"){
				str = "depId="+id+"&orderBy="+value;
				url = sequenceNo.dep_url;
			}else if(type=="hDocPanel"){
				str = "docId="+id+"&orderBy="+value;
				url = sequenceNo.per_url;
			}else if(type=="hSchWorkTimePanel"){
				str = "hSchWorkTimes[0].id="+id+"&hSchWorkTimes[0].worktimeName="+wtname+"&hSchWorkTimes[0].orderBy="+value;
				url = sequenceNo.schwt_url;
			}
			if($('#pre_val'+index).val()==value){					
			}else if(value==""||value==null){
				$('#sort_edit'+index).val($('#pre_val'+index).val());
			}else{
				$.ajax({
                    url: url,
                    type: 'post',
                    data: str,
                    dataType: 'json',
                    success : function(data) {
						if(data.result === 'success') {
							if(type=="hDepPanel"){
								$('#'+type).treegrid("reload");
								$('#'+type).treegrid('unselectAll');
							}else{
								$('#'+type).datagrid("reload");
								$('#'+type).datagrid('unselectAll');
							}
				    	}
				    	else $.messager.alert('提示', data.msg);
					}
                });	
		    }
		}
}