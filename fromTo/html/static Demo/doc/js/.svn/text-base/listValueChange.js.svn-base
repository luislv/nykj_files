
/**
 * practiceStatice 字段整体或单独修改
 */
var pstate = {
	//全局修改	
	all : '#psall',		
	//单独修改
	one : '#psobo',
	//原始数据
	dps : [],
	
	/*
	 *@param textClass 选项text的属性
	 *@param valueClass 选项值的属性 
	 *@param textId 选项text的Id
	 *@param valueId 选项值的Id
	 */
	change : function(textClass,valueClass,textId,valueId) {
		var val = $(pstate.all).children('option:selected').val();
		if(val!=null&&val!=""){
			$('.'+textClass).text($(pstate.all).children('option:selected').text());
			$('.'+valueClass).val(val);
		}else{
			for(var k=0;k<pstate.dps.length;k++){
				var ida =textId+k,idi=valueId+k;
				$('#'+ida).text(pstate.dps[k][1]);
				$('#'+idi).val("");
			}
		}
	},
	
	/*
	 *@param id 保存数据所需的Id
	 *@param value 保存的数据值 
	 *@param textId 数据索引
	 */
	initSave : function(id, value,index) {
		pstate.dps[index]=[id,value];
	},
	
	
	/*
	 *@param title  对话框标题
	 *@param dtc dictCode类型 
	 *@param url 获取dictCode值的后台地址 
	 *@param textId 保存选项text的Id
	 *@param valueId 保存选项值的Id
	 */
	//changePs : function(title,dCode,hValue,textId,valueId,html) {		
	changePs : function(title,textId,valueId,dtc,url) {	
			
		$('#ddd').dialog({
			title:title,		    	   
			width: 250, 					
			height: 150,
			modal:true,	
			content:'<select id="psobo">'+pstate.option+'</select>',
			buttons:[{
				text:'确定',
				handler:function(){
					var val = $('#psobo').children('option:selected').val();
					if(val!=null&&val!=""){
						$('#'+textId).text($('#psobo').children('option:selected').text());
						$('#'+valueId).val($('#psobo').children('option:selected').val());
					}							
					$('#ddd').dialog('close');
				}
			},{
				text:'取消',
				handler:function(){
					$('#ddd').dialog('close');
				}
			}]
		});		
		pstate.dictCode(dtc, url);	
	    $('#psobo').css('margin','20px 0 0 58px');
	},
	
	
	/* 保存修改
	 *@param str 保存的数据
	 *@param url 保存的后台地址 
	 */
	savedata : function (str,url) {	
		var data;
    	if(str.length!=0){
    		data=JSON.stringify(str);  
        	$.messager.confirm('提示','确认保存修改?', function (r) {
        		if (r) {
        				$.ajax({
                            url: url,
                            type: 'post',
                            data: { 'docs': data },
                            dataType: 'json',
                            success : function(data) {
        						if(data.result == 'success') {
        							$.messager.show({ title: '提示', msg: '保存成功!' });
        				    	}
        				    	else $.messager.show({ title: '提示', msg: '保存失败!' });
        					}
                        });
        		}
        	});
    	}else{
    		$.messager.show({ title: '提示', msg: '数据无修改!' });
    	}
	},
	
	
	/* 获得dictCode值,组建 (select option)
	 *@param dtc 待获取的dictCode类型
	 *@param url 后台地址
	 */
	dictCode : function(dtc,url) {		
		$.ajax({
			url:url,
            type: 'post',
            data: { 'dictTypeCode': dtc},
            dataType: 'json',
            success : function(data) {
            	var option='';   
            	for(var j=0;j<data.length;j++){                   		
            		option+="<option value="+data[j].dictCode+">"+data[j].dictName+"</option>";
            	}
            	$('#psobo').html(option);
			}
        });
	}
	
};


/**
 * 排班预约等字段的修改(字典码对应is_open)
 */
var isOpen = {
	data:[],  //存储数据库提取的原始值
	val:"1",  
	snum: 0,  //排班统计标识初始值
	onum: 0,  //预约统计标识初始值
	//排班预约的class与Id
	class1:"sch",
	class2:"scb",
	class3:"ord",
	class4:"ocb",
	ida1:"pbcb",
	ida2:"yycb",
	
	
	/** 将datagrid 或 treegrid 中每条记录的必要字段值存于data里
	 * @param array 存储的记录字段值
	 * @param index 存储的索引
	 */
	pushData: function(array,index){
		isOpen.data[index]=array;
	},
	
	
	/** 排班预约统计标识赋值(统计值为'是'的个数)
	 * @param type 字段类型：sch为排班，ord为预约
	 * @param num  统计值
	 */
	pushNum: function(type,num){
    	if(type=='sch'){
    		isOpen.snum=num;
    	}else if(type=='ord'){
    		isOpen.onum=num;
    	}
		
	},
	
	/** 排班预约字段当前页全部修改
	 * @param id 修改记录的id 或  class属性名
	 */
	allChose: function(id){
		
	    var st = $('.'+id).attr("class");
		
	    if(st.indexOf("yan")>-1||st.indexOf("no")>-1){
			if(id==isOpen.ida1){
								
				isOpen.recordChange(isOpen.class1,isOpen.class2,"ico_no","ico_yes","0","class");
				
				isOpen.changeClass(id,"ico_no","ico_yan","ico_yes","class");
					
				isOpen.snum=isOpen.data.length;
			}else if(id==isOpen.ida2){
				
				isOpen.recordChange(isOpen.class3,isOpen.class4,"ico_no","ico_yes","0","class");
				
				isOpen.changeClass(id,"ico_no","ico_yan","ico_yes","class");
				
				isOpen.onum=isOpen.data.length;
			}

	    }else if(st.indexOf("yes")>-1){
			if(id==isOpen.ida1){
				
				isOpen.recordChange(isOpen.class1,isOpen.class2,"ico_yes","ico_no","1","class");
				
				isOpen.changeClass(id,"ico_yes","ico_yan","ico_no","class");

				isOpen.snum=0;
			}else if(id==isOpen.ida2){
								
				isOpen.recordChange(isOpen.class3,isOpen.class4,"ico_yes","ico_no","1","class");

				isOpen.changeClass(id,"ico_yes","ico_yan","ico_no","class");
				
				isOpen.onum=0;
			}
		}
		
	},	
	 
	/** 保存修改过的记录
	 * @param str   需要保存的已修改记录
	 * @param url   后台保存路径
	 * @param dgid  datagrid 或 treegrid的id属性名
	 */
    saveChange: function(str,url,dgid){
    	var datas;
    	if(str.length!=0){
    		datas=JSON.stringify(str);	//数组转字符串        
        	$.messager.confirm('提示','确认保存修改?', function (r) {
        		if (r) {
        				$.ajax({
                            url: url,
                            type: 'post',
                            data: { 'deps': datas },
                            dataType: 'json',
                            success : function(data) {
        						if(data.result == 'success') {
        							$.messager.show({ title: '提示', msg: '保存成功!' });
        							//原始保存的数据清空
        							data=[];
        							//刷新数据
        							if(dgid=='hDepPanel'){
        								$('#'+dgid).treegrid('reload');
        							}else{
        								$('#'+dgid).datagrid('reload');
        							}
        				    	}
        				    	else $.messager.show({ title: '提示', msg: '保存失败!' });
        					}
                        });
        		}
        	});
    	}else{
    		$.messager.show({ title: '提示', msg: '数据无修改!' });
    	}
    },
    
    /** 单个记录修改
     * @param idl 显示字段值对应图标的id属性名 (<a>)
     * @param idc 保存记录值的id属性名(<input>)
     */
    ynChose: function(idl,idc){

		if($('#'+idc).val()=="0"){

			isOpen.recordChange(idl,idc,"ico_yes","ico_no","1","id");
			if(idl.indexOf("sch")>-1){
				isOpen.snum--;
				if(isOpen.snum==0){	
					isOpen.changeClass(isOpen.ida1,"ico_yes","ico_yan","ico_no","class");
				}else{
					isOpen.changeClass(isOpen.ida1,"ico_yes","ico_no","ico_yan","class");
				}				
			}else{
				isOpen.onum--;
                if(isOpen.onum==0){
                	isOpen.changeClass(isOpen.ida2,"ico_yes","ico_yan","ico_no","class");
				}else{
					isOpen.changeClass(isOpen.ida2,"ico_yes","ico_no","ico_yan","class");
				}	              
			}
		}else{

			isOpen.recordChange(idl,idc,"ico_no","ico_yes","0","id");
			if(idl.indexOf("sch")>-1){
				isOpen.snum++;
				if(isOpen.snum==isOpen.data.length){					
					isOpen.changeClass(isOpen.ida1,"ico_yan","ico_no","ico_yes","class");
				}else{
					isOpen.changeClass(isOpen.ida1,"ico_yes","ico_no","ico_yan","class");
				}				
			}else{
				isOpen.onum++;
                if(isOpen.onum==isOpen.data.length){                	
                	isOpen.changeClass(isOpen.ida2,"ico_yan","ico_no","ico_yes","class");
				}else{					
					isOpen.changeClass(isOpen.ida2,"ico_yes","ico_no","ico_yan","class");
				}	                
			}
		} 	
    },
    
    /** 全选标识的class属性名修改
     * @param id 需修改记录的id属性或class属性名
     * @param cl1、@cl2、@cl3 三种class属性名：ico_yes/ico_no/ico_yan
     * @param type 通过id属性还是class属性修改
     */
    changeClass:function(id,cl1,cl2,cl3,type){
    	if(type=="id"){
    		$('#'+id).removeClass(cl1);
    		$('#'+id).removeClass(cl2);
    		$('#'+id).addClass(cl3);
    	}else{
    		$('.'+id).removeClass(cl1);
    		$('.'+id).removeClass(cl2);
    		$('.'+id).addClass(cl3);
    	}    	
    },
    
    /** 单个或多个记录的class属性名及值的修改
     * @param id、id2  需修改记录的id属性或class属性名
     * @param cl1、cl2 两种class属性名：ico_yes/ico_no
     * @param val 修改后的值(0/1)
     * @param type 通过id属性还是class属性修改
     */
    recordChange:function(id,id2,cl1,cl2,val,type){
    	if(type=="id"){
    		$('#'+id2).val(val);
    		$('#'+id).removeClass(cl1);
    		$('#'+id).addClass(cl2);
    	}else{
    		$('.'+id2).val(val);
    		$('.'+id).removeClass(cl1);
    		$('.'+id).addClass(cl2);
    	}    	
    },
		
	
	/** 排班预约挂号主科室字段修改确认
	 * @param name 需修改的字段名
	 */	
	changeConfirm:function(name){
		var k = $("input[name='"+name+"']:eq(0)");
        var p = $("input[name='"+name+"']:eq(1)");
		var message;
		if(name=="is_register"){
			message="实时挂号";
		}else if(name=="is_order"){
			message="提前预约";
		}else if(name=="isSchedule"){
			message="排班";
		}else{
			message="主科室";
		}
		 
		$.messager.confirm('提示', '确认修改'+message+'设置?', function (r) {
			if (!r){
				if(k.attr("checked")=="checked"){
					k.removeAttr("checked");
					p.attr("checked","checked");
				}else{
					p.removeAttr("checked");
					k.attr("checked","checked");
				}
			}
		});	
	}
};