/**
 * 该js在将来将被舍弃
 */

if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
	//将easyui的分页的下拉框不显示
	$.fn.pagination.defaults.showPageList = false;
}

var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}; 
/**
 * 缓存js弹框交互对象
 */
var objectCache = new Object();

var Comm = {
		getObjectCache:function(){
			return objectCache;
		},
		setObjectCache:function(parentObject){
			objectCache = parentObject;
		},
		/**
		* 生成遮罩层
		* @dialogTarget
			遮罩层目标 可以为一个jQuery对象 也可以是ID串
			如果目标为空则默认使用全屏（_region_center）遮罩层
		* @msgHtml 提示内容 
		*/
		mask:function(dialogTarget, msgHtml){
			// 如果目标为空则默认使用全屏（_region_center）遮罩层
			if(dialogTarget == null || dialogTarget == '') {
				dialogTarget = '_region_center';
			}
			
			var targetObj = null;
			if(dialogTarget instanceof jQuery){
				targetObj = dialogTarget;
			} else {
				targetObj = $("#"+dialogTarget);
				if(targetObj.length == 0) {
					targetObj = $("#"+dialogTarget, window.parent.document);
					if(targetObj.length == 0) {
						targetObj = $("#"+dialogTarget, window.parent.parent.document);
					}
				}
			}
			
			if(targetObj.length == 0) {
				return;
			}
			targetObj.css("position","relative");
			
			var _width = targetObj.width();
			var _height = targetObj.height();
			var _html = '<div id="_comm_mask" style="position:absolute;z-index:90000;width:'+_width+'px;height:'+_height+'px;background-color:#ccc; top:0; left:0; -moz-opacity:0.3; filter:alpha(opacity=30); filter:Alpha(opacity=30); opacity: 0.3;"></div>';
			targetObj.append(_html);
			
			if(msgHtml == undefined){
				msgHtml = "数据处理中.....";
			}
			if(msgHtml != null && msgHtml != '') {
				var msg = $('<div id="_comm_mask_msg" class="datagrid-mask-msg" style="display:block;z-index:90000;">'+msgHtml+'</div>');
				targetObj.append(msg);
				msg.css('left', (targetObj.width() - msg._outerWidth()) / 2);
			}
		},
		unmask:function(){
			var maskMsgObj = $("#_comm_mask_msg");
			if(maskMsgObj.length == 0) {
				maskMsgObj = $("#_comm_mask_msg", window.parent.document);
				if(maskMsgObj.length == 0) {
					maskMsgObj = $("#_comm_mask_msg", window.parent.parent.document);
				}
			}
			
			if(maskMsgObj.length != 0) {
				maskMsgObj.remove();
			}
			
			var maskObj = $("#_comm_mask");
			if(maskObj.length == 0) {
				maskObj = $("#_comm_mask", window.parent.document);
				if(maskObj.length == 0) {
					maskObj = $("#_comm_mask", window.parent.parent.document);
				}
			}
			
			if(maskObj.length != 0) {
				maskObj.remove();
			}
		},
		//跟新菜单
		updateMenu : function(title,menuNo,dUrl,firstNodeMenuNo,secondNodeMenuNo){
			if(menuNo == null || menuNo == undefined || menuNo == '' ){
	    		return;
	    	}
	    	//修改菜单名字
	    	if(parent.$("#leftmenus_box_dt_"+menuNo).length>0){
	    		var html = [];
	    		html.push('<dt id=\'leftmenus_box_dt_'+menuNo+'\' ');
	    		html.push('onclick="menuInfo.clickMenu(\''+title+'\',\''+dUrl+'\',true,\''+menuNo+'\')" >');
	    		html.push('<a href="javascript:;">'+title+'</a>');
	    		html.push('</dt>');
	    		parent.$("#leftmenus_box_dt_"+menuNo).parent().html(html.join(''));
	    		//更新菜单
	    		var menuArray = parent.menuInfo.menuJson;
		    	$.each(menuArray,function(index,value){
		    		if(null == value){
		    			return true;
		    		}
	    			if(value.menuId == firstNodeMenuNo){
	    				$.each(value.children,function(childIndex,childValue){
	    					if(null == childValue){
	    						return true;
	    					}
	    					if(childValue.menuId == secondNodeMenuNo){
	    						$.each(childValue.children,function(lastIndex,lastValue){
	    							if(lastValue == null ){
	    								return true;
	    							}
	    							if(lastValue.menuId == menuNo){
	    								//从数组里面替换菜单
	    								var replaceValue = {menuId:menuNo,menuName:title,destUrl:dUrl};
	    								childValue.children.splice($.inArray(lastValue,childValue.children),1,replaceValue);
	    								return false;
	    							}
	    						});
		    					return false;
			    			}
	    				});
	    				return false;
	    			}
	    		});
		    	return;
	    	}
	    	//新增菜单
	    	var ob = parent.$("div[menuId='"+secondNodeMenuNo+"']").children(".m-treeview");
	    	var _html = [];
	    	_html.push('<li><dl>');
	    	_html.push('<dt id=\'leftmenus_box_dt_'+menuNo+'\' ');
	    	_html.push('onclick="menuInfo.clickMenu(\''+title+'\',\''+dUrl+'\',true,\''+menuNo+'\')" >');
	    	_html.push('<a href="javascript:;">'+title+'</a>');
	    	_html.push('</dt></dl></li>');
	    	ob.append(_html.join(''));
	    	//往菜单数组里面添加菜单
    		var menuArray = parent.menuInfo.menuJson;
    		var parentMenu = null;
    		$.each(menuArray,function(index,value){
    			if(null == value){
	    			return true;
	    		}
    			if(value.menuId == firstNodeMenuNo){
    				$.each(value.children,function(childIndex,childValue){
    					if(null == childValue){
    						return true;
    					}
    					if(childValue.menuId == secondNodeMenuNo){
    						parentMenu = childValue;
	    					return false;
		    			}
    				});
    				return false;
    			}
    		});
    		if(parentMenu == null){
    			alert("菜单加载失败，请刷新页面！");
    			return;
    		}
    		parentMenu.children.push({menuId:menuNo,menuName:title,destUrl:dUrl});
		},
		removeMenu : function(menuNo,firstNodeMenuNo,secondNodeMenuNo){
			try {
	    		var no = "leftmenus_box_dt_"+menuNo;
	    		var ob = parent.$("#"+no).parent().parent();
		    	ob.remove();
		    	//移除菜单
		    	var menuArray = parent.menuInfo.menuJson;
		    	$.each(menuArray,function(index,value){
		    		if(null == value){
		    			return true;
		    		}
	    			if(value.menuId == firstNodeMenuNo){
	    				$.each(value.children,function(childIndex,childValue){
	    					if(null == childValue){
	    						return true;
	    					}
	    					if(childValue.menuId == secondNodeMenuNo){
	    						$.each(childValue.children,function(lastIndex,lastValue){
	    							if(lastValue == null ){
	    								return true;
	    							}
	    							if(lastValue.menuId == menuNo){
	    								//从数组里面删除菜单
	    								childValue.children.splice($.inArray(lastValue,childValue.children),1);
	    								return false;
	    							}
	    						});
		    					return false;
			    			}
	    				});
	    				return false;
	    			}
	    		});
			} catch (e) {
			}
		},
		location : function(url) {
			setTimeout(function() {
				location = url;
			}, 100);
		},
		//检查唯一性，返回数据库中存在的记录数
		checkUnique : function(tableName,fieldName,fieldValue) {
			var postData ={};
			postData['tableName'] =  tableName;
			postData['fieldName'] =  fieldName;
			postData['fieldValue'] =  fieldValue;
			var url = '${webroot}/common/isExist.action';
			$.post(url, postData,function(data){
				if( data ) {
					return data;
				} else {
					return -1;
				}
           });
		},
		//日期比较
		dateCompare : function(startdate,enddate){
			var arr=startdate.split("-");    
			var starttime=new Date(arr[0],arr[1],arr[2]);    
			var starttimes=starttime.getTime();   
			  
			var arrs=enddate.split("-");    
			var lktime=new Date(arrs[0],arrs[1],arrs[2]);    
			var lktimes=lktime.getTime();   
			
			if(isNaN(starttimes) || isNaN(lktimes)){
				return false;
			}
			if(starttimes>lktimes){   
				return false;   
			}   
			else{
				return true;   
			}
		},
		//比较2时间是否相同
		dateEqual : function (startdate,enddate){
			var arr=startdate.split("-");    
			var starttime=new Date(arr[0],arr[1],arr[2]);    
			var starttimes=starttime.getTime();   
			var arrs=enddate.split("-");    
			var lktime=new Date(arrs[0],arrs[1],arrs[2]);    
			var lktimes=lktime.getTime();   
			if(isNaN(starttimes) || isNaN(lktimes)){
				return false;
			}
			if(starttimes == lktimes){
				return true;
			}else {
				return false;
			}
		},
		//单选按钮双击取消
		cancelRadio : function(_this) {
			$(_this).attr('checked', false);
		},

		//update layout title
		/*title : function(titles) {	
			if(parent.$('body').layout('panel', 'center') != ''){
			    parent.$('body').layout('panel', 'center').panel({
			    	title: titles.join(' >> '), 
			    	iconCls: 'icon-home', 
			    	headerCls: 'nav-title' 
			    });
			} 
		},*/	
		//open dialog
		//@param {url: 'xx.html', content: '<p>...</p>',title: 'new dialog', width:300, height:200}
		dialog : function(attr) {
			if(attr.clickBtn) $('#'+attr.clickBtn).linkbutton('disable');
			var _dialogId = undefined;
			if(attr.dialogid) _dialogId = attr.dialogid;
			else _dialogId = 'dialog_'+new Date().valueOf();
			Comm.dialogId = _dialogId;
			//var _dialogId = attr.url;
			$('body').append('<div id="'+_dialogId+'" style="margin-top:0px;position:relative;"></div>');
			var _dialog = $('#'+_dialogId);
			if(attr.url) {
				var _param = '';
				if(attr.url.indexOf('?')!=-1)
					_param = '&dialogId='+_dialogId;
				else
					_param = '?dialogId='+_dialogId;
				if(attr.type==='iframe') {
					attr.content = ['<iframe src="" width="100%" height="100%" scrolling="auto" frameborder="0"></iframe>'].join('');
					openDialog(attr);

					$('#'+_dialogId).find('iframe').attr('src', attr.url+_param);
				} else {
					_dialog.load(attr.url+_param, function() {
						attr.content = _dialog.html();
						openDialog(attr);
					});
				}
			} else {
				openDialog(attr);
			}
			function openDialog(attr) {
				if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
					//隐藏select
					$('select').each(function(i, obj) {
						if($(obj).css('display')!='none') {
							if(!Comm.dialogHideSelect) {
								Comm.dialogHideSelect = new Array();
							}
							Comm.dialogHideSelect.push(obj);
							$(obj).css('display', 'none');
						}
					});
				}
				var _width = $(document.body).width();
				if(attr.width>_width)
					attr.width = _width;
				//var _height = $(document.body).height(); 由于获取body区域导致显示问题
				var _height = $(document).height();
				if(attr.height>_height)
					attr.height = _height;
				_dialog.dialog({
					title: attr.title,
					content: attr.content,
					modal: true,
					resizable:false,
					collapsible:false,
					maximizable:false,
					noheader:attr.noheader,
				    minimizable:false,
					width: attr.width,
					closable : attr.closable,
					height: attr.height,
					onClose:attr.closeFn
				});
				$('.panel-tool-close').each(function(i, obj) {
					$(obj).click(function() {
						$(this).parent().parent().parent().remove();
						Comm.dialogCloseSelect();
					});
				});
				if(attr.clickBtn) $('#'+attr.clickBtn).linkbutton('enable');
			}
		},
		dialogGlobal : function(attr) {
			if(attr.clickBtn) $('#'+attr.clickBtn).linkbutton('disable');
			var _dialogId = undefined;
			if(attr.dialogid) _dialogId = attr.dialogid;
			else _dialogId = 'dialog_'+new Date().valueOf();
			Comm.dialogId = _dialogId;
			var Ob = parent;
			// 暂时4层iframe
			var dialog =[parent,parent.parent,parent.parent.parent,parent.parent.parent.parent];
			for(i = 0 ; i < 4 ; i++){
				if(dialog[i].$("#_glod_dialog_").html() != undefined){
					Ob = dialog[i];
					break; 
				}
			}
			//var _dialogId = attr.url;
			Ob.$('body').append('<div id="'+_dialogId+'" style="margin-top:0px;position:relative;"></div>');
			if(attr.parent) Ob.Comm.setObjectCache(attr.parent);
			var _dialog = Ob.$('#'+_dialogId);
			if(attr.url) {
				var _param = '';
				if(attr.url.indexOf('?')!=-1)
					_param = '&dialogId='+_dialogId;
				else
					_param = '?dialogId='+_dialogId;
				if(attr.type==='iframe') {
					attr.content = ['<iframe src="" width="100%" height="100%" scrolling="auto" frameborder="0"></iframe>'].join('');
					openDialog(attr);

					Ob.$('#'+_dialogId).find('iframe').attr('src', attr.url+_param);
				} else {
					_dialog.load(attr.url+_param,attr.param, function() {
						attr.content = _dialog.html();
						openDialog(attr);
					});
				}
			} else {
				openDialog(attr);
			}
			function openDialog(attr) {
				if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
					//隐藏select
					Ob.$('select').each(function(i, obj) {
						if(Ob.$(obj).css('display')!='none') {
							if(!Comm.dialogHideSelect) {
								Comm.dialogHideSelect = new Array();
							}
							Comm.dialogHideSelect.push(obj);
							Ob.$(obj).css('display', 'none');
						}
					});
				}
				var _width = Ob.$("body").width();
				if(attr.width>_width)
					attr.width = _width;
				//var _height = $(document.body).height(); 由于获取body区域导致显示问题
				var _height = Ob.$("body").height();
				if(attr.height>_height)
					attr.height = _height;
				_dialog.dialog({
					title: attr.title,
					content: attr.content,
					modal: true,
					resizable:false,
					collapsible:false,
					maximizable:false,
				    minimizable:false,
					width: attr.width,
					height: attr.height,
					onClose:attr.closeFn
				});
				Ob.$('.panel-tool-close').each(function(i, obj) {
					Ob.$(obj).click(function() {
						Ob.$(this).parent().parent().parent().remove();
						Comm.dialogCloseSelect();
					});
				});
				if(attr.clickBtn) Ob.$('#'+attr.clickBtn).linkbutton('enable');
			}
		},
		//close dialog 是
		dialogClose : function(id, isRemove) {
			if(id === undefined || id === '') id = Comm.dialogId;
			$('#'+id).dialog('close');
			if(isRemove!=false) $('#'+id).remove();
			Comm.dialogCloseSelect();
		},
		dialogRefresh : function(id,url,type) {
			if(id === undefined || id === '') id = Comm.dialogId;
			if (type == 'iframe') {
				$('#'+id).find('iframe').attr('src', url+'&dialogId='+id);
			} else {
				$('#'+id).dialog({href:url+'&dialogId='+id});
			}
		},
		dialogCloseSelect : function() {
			if(Comm.dialogHideSelect) {
				//显示隐藏的select
				$.each(Comm.dialogHideSelect, function(i, obj) {
					$(obj).css('display', '');
				});
				Comm.dialogHideSelect = undefined;
			}
		},
		//submit form
		//{id:'',url:'',success:function(){},subbtn:'btn1'}
		form : function(attr) {
			$('#'+attr.id).form({
				url:attr.url,    
				onSubmit:function(){
					if(typeof (attr.check) == 'function'){
						var checkResult = attr.check();
						if(!checkResult){
							if(attr.msg){
								parent.$.messager.show({ title : '提示', msg : attr.msg });
							}
							return false;
						}
					}
					if(attr.onSubmit) attr.onSubmit();
					var _isSub = $('#'+attr.id).form('validate');
					if (_isSub && typeof (attr.onLoading) == 'function') {
						attr.onLoading();
					}
					/*if(_isSub && attr.subbtn)
						$('#'+attr.subbtn).linkbutton('disable');*/
					return _isSub;
				},
				success:function(data){
					/*if(attr.subbtn)
						$('#'+attr.subbtn).linkbutton({'disabled':false});*/
					//try {
						attr.success(eval('('+data+')'));
					//} catch (e) {
					//	$.messager.alert('提示', '操作失败. [' + data + ']');
					//}
				}
			});
		},
		
		//zj 2015-5-4
		prompt: function(msg){
			Comm.dialog({
				title:"提示",		    	   
				width: 250, 				
			    height: 100,
			    content:msg,
			    modal:true	
			});						
			setTimeout(function(){		
				Comm.dialogClose();
			},2000);			
		}
		
};

Comm.util = {
		//判断是否为正整数
		isPosInt : function(value) {
			var r = /^\+?[1-9][0-9]*$/;
			return r.test(value);
		},
		getBirth : function (value){
			if (!value) return '';
			var tmpStr = "";
			value = $.trim(value);
			if ((value.length != 15) && (value.length != 18)) {
				tmpStr = "输入的身份证号位数错误";
			}
			if (value.length == 15) {
				tmpStr = value.substring(6, 12);
				tmpStr = "19" + tmpStr;
				tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
			}
			else {
				tmpStr = value.substring(6, 14);
				tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
			}
			if(this.isDate(tmpStr)){
				return tmpStr;
			}else {
				return '';
			}
		},
		isDate : function (value) {
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;     
			return value.match(reg);
		},
		isNumber : function (value) {
			return !isNaN(value)?true:false;
		},
		isEmpty : function (value){
			if(Comm.Str.trim(value)) return true;
			return false;
		},
		isNotEmpty: function (value) {
			if(Comm.Str.trim(value)) return true;
			return false;
		},
		isCardID : function (sId){   
		    var iSum=0 ;  
		    var info="" ;  
		    if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";   
		    sId=sId.replace(/x$/i,"a");   
		    if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";   
		    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));   
		    var d=new Date(sBirthday.replace(/-/g,"/")) ;  
		    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";   
		    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;  
		    if(iSum%11!=1) return "你输入的身份证号非法";   
		    return true;  
		}  
};

//字符串操作
Comm.Str = {
		//清除字符串2边空
		trim : function (val) {
			if (typeof val == 'undefined' || val == null || val == '') return '';
			if (typeof val =='string')  return $.trim(val);
			return val;
		},
		//格式化字符串输出
		fomartStr : function (val) {
			if (typeof val == 'undefined' || val == null || val == 'null') return '';
			return this.trim(val);
		},
		encode : function (val) {
			return encodeURIComponent(encodeURIComponent(this.fomartStr(val)));
		},
		decode : function (val) {
			return decodeURIComponent(decodeURIComponent(this.fomartStr(val)));
		}
};

Comm.select = {
		clear : function(id) {
			var objSelect = $("#"+id).get(0);
			var length = objSelect.options.length;
			var fistOption = length>=0?objSelect.options[0]:null;
			objSelect.options.length = 0;
			if(fistOption&&fistOption.value==''){//
				objSelect.options.add(fistOption);
			}
			return length;
		},
		createOption : function(obj){

			var varItem = null;
			if (obj.diccode) {//
				varItem = new Option(obj.dicvalue, obj.diccode);
			} else {
				varItem = new Option(obj.value, obj.name);
			}
			return varItem;
		},
		addDefault : function(id) {
			var infos = [{"diccode":"","dicvalue":"请选择...","dircode":"","id":0,"seqnum":1}];
			EDC.select.add(id,infos);
		},
		addOneOption : function(id, dicvalue,diccode) {
			this.add(id,{"dicvalue":dicvalue,"diccode":diccode});
		},
		add : function(id, infos) {
			var objSelect = $("#"+id).get(0);
			var varItem = null;
			if (jQuery.isArray(infos)) {
				for (var i = 0; i < infos.length; i++) {
					varItem = this.createOption(infos[i]);
					objSelect.options.add(varItem);
				}
			} else {
				varItem = this.createOption(infos);
				objSelect.options.add(varItem);
			}
			return objSelect.options.length;
		},
		exist : function(id, value) {
			var objSelect =$("#"+id).get(0);
			var r = false;
			for (var i = 0; i < objSelect.options.length; i++) {
				if (objSelect.options[i].value == value) {
					r = true;
					break;
				}
			}
			return r;
		},
		del : function(id, value) {
			var objSelect = $("#"+id).get(0);
			if (exist(id, value)) {
				for (var i = 0; i < objSelect.options.length; i++) {
					if (objSelect.options[i].value == value) {
						try {
							objSelect.options.remove(i);/* ie */
						} catch (e) {
							objSelect.options[i].remove();/* ff */
						}
						return 1;
					}
				}
			}
			return 0;
		},
		select : function(id, value) {
			if (this.exist(id, value)) {
				$("#"+id).val(value);
				$("#"+id).trigger('change');
				return true;
			}
			return false;
		},
		getText : function(id, value) {
			var objSelect = $("#"+id).get(0);
			for (var i = 0; i < objSelect.options.length; i++) {
				if (objSelect.options[i].value == value) {
					return objSelect.options[i].text;
				}
			}
			return '';
		},
		dragDown : function(url, sourceid, targetid, para) { //
			$("#"+sourceid).bind('change',function(){
				var postData ={};
				postData[para] = $("#"+sourceid).val();

				$.post(url, postData,function(reStr){
					reStr = $.trim(reStr);
					EDC.select.clear(targetid);

					var jsonArray = jQuery.parseJSON( reStr );
					EDC.select.add(targetid, jsonArray);
					$("#"+targetid).trigger('change');
				});

			});
		},
		init:function(url, targetid,selectedValue,callback){
			var postData ={};
			$.post(url, postData,function(reStr){
				reStr = $.trim(reStr);
				var jsonArray = jQuery.parseJSON( reStr );
				EDC.select.add(targetid, jsonArray);
				EDC.select.select(targetid, selectedValue);
				if(callback) {
					setTimeout(callback,100);
				}
			});
		}
};

//Date的操作方法
Comm.date = {
		//获取当前时间
		getDate : function() { return new Date(); },
		//获取时间戳 [date: 代表传入的日期]
		getTime : function(date) { if(date === undefined) { return Comm.date.getDate().valueOf(); } return date.valueOf(); },
		//根据指定格式获取日期[默认格式为: yyyy-MM-dd HH:mm:ss] [date  : 日期 format: 日期格式]
		formatStr : function(date, format) {
			if(date===undefined || date===null || date==='') return '';
			if(typeof(date)==='number') date = new Date(date);
			else if(typeof(date)==='string') return date;//date = new Date(date);
			else if(date.time!=undefined) date = new Date(date.time);
			if(format === undefined) { format = "yyyy-MM-dd HH:mm:ss"; }
			var z = { y:date.getFullYear(), M:date.getMonth() + 1, d:date.getDate(), H:date.getHours(), m:date.getMinutes(), s:date.getSeconds() };
			return format.replace(/(y+|M+|d+|H+|m+|s+)/g, function(v) {
			return ((v.length > 1 ? "0" : "") + eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2));
			});
		},
		//将字符串时间转为Date [dateStr : 字符串时间 format  : 字符串格式[目前支持(yyyy-MM-dd HH:mm:ss)] ]
		formatDate : function(dateStr, format) {
			if(dateStr===undefined || dateStr===null || dateStr==='') return '';
			dateStr = Date.parse(dateStr.replace(/-/g, "/"));
			var _date = new Date(dateStr);
			return _date;
		},
		//比较时间大小[-1: date1 < date2 / 0: date1 = date2 / 1: date1 > date2]
		compareDate : function(date1, date2) {
			var _datetime1 = date1.getTime();
			var _datetime2 = date2.getTime();
			if(_datetime1 < _datetime2) { return -1; }
			else if(_datetime1 === _datetime2) { return 0; }
			else if(_datetime1 > _datetime2) { return 1; }
		},
		//获取指定时间加上指定的月数 [date:日期 month:加上的月数]
		getDateAddMonth : function(date, month) {
			if(date === undefined || date === '') { date = Comm.date.getDate(); }
			if(month === undefined || month === '') { month = 0; }
			date.setMonth(date.getMonth() + month);
			return date;
		},
		//获取指定时间加上指定的天数 [_date:日期 _day:加上的天]
		getDateAddDay : function(_date, _day) {
			if(_date === undefined || _date === '') { _date = Comm.date.getDate(); }
			if(_day === undefined || _day === '') { _day = 0; }
			_date.setDate(_date.getDate() + _day);
			return _date;
		},
		//获取指定时间加上指定的小时数 [_date:日期 _hour:加上的小时]
		getDateAddHour : function(_date, _hour) {
			if(_date === undefined || _date === '') { _date = Comm.date.getDate(); }
			if(_hour === undefined || _hour === '') { _hour = 0; }
			_date.setHours(_date.getHours() + _hour);
			return _date;
		},
		//获取指定时间加上指定的分钟数 [_date:日期 _min:加上的分钟]
		getDateAddMin : function(_date, _min) {
			if(_date === undefined || _date === '') { _date = Comm.date.getDate(); }
			if(_min === undefined || _min === '') { _min = 0; }
			_date.setMinutes(_date.getMinutes() + _min);
			return _date;
		}
};

//算法
Comm.arith = {
		//计算BMI(sgid:身高控件ID tzid:体重控件ID)
		bmi : function(sgid, tzid, showid) {
			var _tz = $('#'+tzid).val();
			var _sg = $('#'+sgid).val();
			if(_tz === '' || _sg === '') {
				return '';
			}
			var _bmi = (_tz / (_sg * _sg)) * 10000;
			_bmi = _bmi.toFixed(2);
			$('#'+showid).val(_bmi);
			return _bmi;
		}
};

//电话调用
Comm.phone = {
		//弹出下载电话插件
		download : function() {
			parent.Comm.dialog({title: '温馨提示',
				content:['<div style="padding: 20px;"><p>该功能需要浏览器控件支持，请下载安装</p>',
				         '<p style="text-align: center;"><input type="button" class="btn" value="下载" onclick="location = \'',webroot,'/tool/nycsm.zip\'"></p></div>'].join(''),
				width:300, height:160
			});
		},
		//点击呼叫电话
		//phone拨号的电话		_this点击拨号的对象	uploadRecord:是否上传录音(0否)
		call : function(attr) {
			//if(window.attachEvent) {
				if(attr.uploadRecord) {
					Comm.phone.uploadRecord = attr.uploadRecord;
				} else {
					Comm.phone.uploadRecord = 1;
				}
				Comm.phone.callPhone = attr.phone;
				Comm.phone.callThis = $(attr._this);
				Comm.phone.cmdId = attr.cmdId;
				Comm.phone.patientId = attr.patientId;
				Comm.phone.patientName = attr.patientName;
				Comm.phone.callback = attr.callback;
				/*var _val = Comm.phone.callThis.val();
				if(Comm.phone.callThis.val()=='呼叫' || (_val.indexOf('呼')!=-1&&_val.indexOf('叫')!=-1)) {
					Comm.phone.callThis.val('挂断');
				} else {
					Comm.phone.callThis.val('呼叫');
				}*/
				//调用公用的拨号
				$('.call a').click();
			/*} else {
				$.messager.alert('友情提示','该电话插件只支持IE!');
			}*/
		},
		//播放录音
		play : function(vid) {
			$.ajax({
		        url: webroot+'/foTelrecord/f_view/findBySfId.shtml',
		        type: 'post',
		        data: {vid:vid},
		        dataType: 'json',
		        success : function(data) {
					if(data!=null && data.length>0) {
						var _fileName = '';
						var _embedId = 'embed_' + Comm.date.getTime();
						var _cont = ['<div style="padding: 20px 20px 10px 20px;"><div id="',_embedId,'Div"></div>'];
						_cont.push('<table class="table" border="0" cellpadding="0" cellspacing="1" style="margin:0px; width:100%;"><tbody>');
						$.each(data, function(i, obj) {
							if(i===0) {
								_fileName = obj.fileName;
								_cont.push('<caption style="font-weight: bold; padding: 5px;">',obj.visitName,'的通话录音</caption>');
								_cont.push('<tr class="title_check"><td class="t_title_l" style="width: 35%;">录音人</td><td class="t_title_l" style="width: 45%;">录音日期</td><td class="t_title_l" style="width: 20%;">播放</td></tr>');
							}
							_cont.push('<tr><td>',obj.userName,'</td><td>',obj.startTime,'</td><td><a href="javascript:Comm.phone.playEmbed(\'',_embedId,'\',\'',obj.fileName,'\')" class="ico_deal" title="播放"></a></td></tr>');
						});
						_cont.push('</tbody></table>');
						_cont.push('</div>');
						Comm.dialog({
							title: '播放录音',
							content: _cont.join(''),
							width: 450,
							height: 300,
							closeFn: function() {
								if(window.attachEvent) {
									document.getElementById(_embedId).stop();
								}
							}
						});
						Comm.phone.playEmbed(_embedId, _fileName);
			    	}
			    	else $.messager.alert('友情提示', '还没有录音文件！');
				}
		    });
		},
		//根据录音id播放录音
		playById : function(id) {
			$.ajax({
		        url: webroot+'/foTelrecord/f_view/findById.shtml',
		        type: 'post',
		        data: {id:id},
		        dataType: 'json',
		        success : function(obj) {
					if(obj!=null) {
						var _fileName = '';
						var _embedId = 'embed_' + Comm.date.getTime();
						var _cont = ['<div style="padding: 20px 20px 10px 20px;"><div id="',_embedId,'Div"></div>'];
						_cont.push('<table class="table" border="0" cellpadding="0" cellspacing="1" style="margin:0px; width:100%;"><tbody>');
						_fileName = obj.fileName;
						_cont.push('<caption style="font-weight: bold; padding: 5px;">',obj.visitName,'的通话录音</caption>');
						_cont.push('<tr class="title_check"><td class="t_title_l" style="width: 35%;">录音人</td><td class="t_title_l" style="width: 45%;">录音日期</td><td class="t_title_l" style="width: 20%;">播放</td></tr>');
						_cont.push('<tr><td>',obj.userName,'</td><td>',obj.startTime,'</td><td><a href="javascript:Comm.phone.playEmbed(\'',_embedId,'\',\'',obj.fileName,'\')" class="ico_deal" title="播放"></a></td></tr>');
						_cont.push('</tbody></table>');
						_cont.push('</div>');
						Comm.dialog({
							title: '播放录音',
							content: _cont.join(''),
							width: 450,
							height: 300,
							closeFn: function() {
								if(window.attachEvent) {
									document.getElementById(_embedId).stop();
								}
							}
						});
						Comm.phone.playEmbed(_embedId, _fileName);
			    	}
			    	else $.messager.alert('友情提示', '还没有录音文件！');
				}
		    });
		},
		playEmbed : function(embedId, filename) {
			if(filename==='') return;
			if(window.attachEvent && document.getElementById(embedId)) {
				document.getElementById(embedId).stop();
			}
			var _cont = ['<embed id="',embedId,'" style="filter: Xray; width: 100%; height: 80px" ',
	         'src="',voiceHttpUrl+'/'+filename,'" type="audio/mpeg" loop="false" autostart="true" volume="0"></embed>'];
			$('#'+embedId+'Div').html(_cont.join(''));
			//$('#'+embedId).attr('src', voiceHttpUrl+voiceFtpDir+'/'+filename);
			//document.getElementById(embedId).controls.play();
		},
		answer : function(attr) {
			if(window.attachEvent) {
				//调用公用的拨号
				alert(12322);
				$('.call a').click();
				alert(123);
			} else {
				$.messager.alert('友情提示','该电话插件只支持IE--!');
			}
		}
};

//extend validatebox
$.extend($.fn.validatebox.defaults.rules, {
	multipleRules: {
        validator: function (value, vtypes) {
            var returnFlag = true;
            var opts = $.fn.validatebox.defaults;
            for (var i = 0; i < vtypes.length; i++) {
                var methodinfo = /([a-zA-Z_]+)(.*)/.exec(vtypes[i]);
                var rule = opts.rules[methodinfo[1]];
                if (value && rule) {
                    var parame = eval(methodinfo[2]);
                    if (!rule["validator"](value, parame)) {
                        returnFlag = false;
                        this.message = rule.message;
                        break;
                    }
                }
            }
            return returnFlag;
        }
    },
	//field1 equal field2
	equalTo: {
		validator:function(value,param){
			return $(param[0]).val() == value;
		},
		message:'Field does not match!'
	},
	// 验证身份证
	idcard : {
		validator : function(value) {
	    	return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
		},
		message : '身份证号码格式不正确'
	},
	idcardCondition : {
		validator : function(value,param) {
			if ($(param.type).val() == param.data) {
				var r =  Comm.util.isCardID(value);
				r = ( r == true ) ? true : false; 
				if (r && param.bind)  { $(param.bind).val(Comm.util.getBirth(value)); }
				if (!r && param.bind) { $(param.bind).val('');}
				return r;
			}else{
				return true;
			}
		},
		message : '不是有效的身份证号码'
	},
	
	//验证电话号码
	phone : {
        validator : function(value) {
            return /^((\(\d{2,3}\))|(\d{3}\-?))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,8}(\-\d{1,4})?$/i.test(value);
        },
        message : '电话格式不正确，请输入“区号-电话号码”'
    },
    //验证手机号码
    mobile : {
        validator : function(value) {
            return /^(13|14|15|18)\d{9}$/i.test(value);
        },
        message : '手机号码格式不正确'
    },
    //验证电话和手机
    phoneOrMobile : {
        validator : function(value) {
        	//验证手机
            if(/^(13|14|15|18)\d{9}$/i.test(value)) return true;
            //验证电话
            return /^((\(\d{2,3}\))|(\d{3}\-?))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,8}(\-\d{1,4})?$/i.test(value); 
        },
        message : '手机号码或电话号码格式不正确'
    },
    /*校验日期	minDate最小日期(%y-%M-%d代表当前日期)
     * 			maxDate最大日期(%y-%M-%d代表当前日期)
     */
    date : {
    	validator : function(value, param) {
    		/*
    		  	动态变量表
				格式	说明: %y	当前年 / %M	当前月 / %d	当前日 / %ld	本月最后一天 / %H	当前时 / %m	当前分 / %s	当前秒
    		 */
    		if(param) {
    		var attr = param[0];
	    		if(attr) {
	    			//alert(attr.minDate);
	    			//最小时间
	    			if(attr.minDate) {
	    				var _minDate = undefined;
	    				if(attr.minDate==='%y-%M-%d') {
	    					//为当前日期
	    					var _curDate = new Date();
	    					_minDate = Comm.date.formatStr(_curDate, 'yyyy-MM-dd');
	    				}
	    				else _minDate = attr.minDate;
	    				if(Comm.date.compareDate(Comm.date.formatDate(value + ' 23:59:59', 'yyyy-MM-dd HH:mm:ss'), Comm.date.formatDate(_minDate, 'yyyy-MM-dd')) < 0) {
	            			$.fn.validatebox.defaults.rules.date.message = '日期不能小于[ ' + _minDate + ' ]';
	            			return false;
	    				}
	    			}
	    			//最大时间
	    			if(attr.maxDate) {
	    				var _maxDate = undefined;
	    				if(attr.maxDate==='%y-%M-%d') {
	    					//为当前日期
	    					var _curDate = new Date();
	    					_maxDate = Comm.date.formatStr(_curDate, 'yyyy-MM-dd');
	    				}
	    				else _maxDate = attr.maxDate;
	    				if(Comm.date.compareDate(Comm.date.formatDate(value, 'yyyy-MM-dd'), Comm.date.formatDate(_maxDate, 'yyyy-MM-dd')) > 0) {
	            			$.fn.validatebox.defaults.rules.date.message = '日期不能大于[ ' + _maxDate + ' ]';
	            			return false;
	    				}
	    			}
	    		}
    		}
    		$.fn.validatebox.defaults.rules.date.message = '日期格式不正确';
            return /^(19|20)\d{2}-(0?\d|1[012])-(0?\d|[12]\d|3[01])$/i.test(value);
        },
        message : '日期格式不正确'
    },
    radio: {
    	validator: function (value, param) {
        	var _ok = false;
        	var _name = param[0];
            //查找表单中所有此名称的radio
            $('input[name="' + _name + '"]').each(function () {
            	if (this.checked) { _ok = true; return false; }
            });
            return _ok;
        },
    	message: '需要选择一项！'
    },
    // 请填入数字或者字母
	shuziORzimu : {
		validator : function(value) {
	    	return /^[A-Za-z0-9]*?$/i.test(value);
		},
		message : '请填入数字或者字母'
	},
	email : {
		validator : function(value) {
	    	return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9_]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test(value);
		},
		message : '邮箱格式不正确'
	},
	//正整数
	znumber : {
		validator : function(value) {
	    	return /^[0-9]*[1-9][0-9]*$/i.test(value);
		},
		message : '请输入正整数'
	},
	//科学性
	knumber : {
		validator : function(value) {
	    	return /^[0-9]+(\.[0-9]+)?$/i.test(value);
		},
		message : '请输入双精度数字'
	},
	number : {
		validator : function(value) {
	    	return /^[0-9]+$/i.test(value);
		},
		message : '请输入数字'
	},
	//验证数据后台唯一性
	verifyUnique : {
		/*
		 * 需要配合jquery插件一起用
		 * options {	url :'后台校验数据地址', 必须
		 * 			 	query:'后台查询名称,传入该参数查询名称', 必须
		 * 				val: '对比数据'  非必须
		 * 				data:'其它查询数据 k1=v1 or k1=v2&k2=v2&k3=v3... &符号隔开参数' 非必须,
		 * 				dyndata:{key:'#id'} 动态获取查询参数作为条件 非必须,
		 * 				//前期只支持日期
		 * 				otherValidate:{vid:'#id',msg:'',t:'类型'}
		 * 			}  
		 * 接受后台返回 0(该数据不存在) 或者 1(该存在)
		 */
		validator : function(value,options) {
			var _unique = false;
			//如果传入val对照数据 相同通过验证
			//如果传入数据时字符串类型
			if (options.val && value == options.val) {
				return true;
			}
			//校验其它
			if (options.otherValidate) {
				if (options.otherValidate.vid.indexOf('#') > -1) {
					var $_value = $(options.otherValidate.vid).val();
					if (Comm.util.isNotEmpty($_value)) {
						if (options.otherValidate.t === 'date' && Comm.date.compareDate(Comm.date.formatDate(value, 'yyyy-MM-dd'), Comm.date.formatDate($_value, 'yyyy-MM-dd')) < 0) {
							$.fn.validatebox.defaults.rules.verifyUnique.message = '出院时间不能小于入院时间';
							return false;
						}
					}
				}else {
					var $_value = options.otherValidate.vid;
					if (Comm.util.isNotEmpty($_value)) {
						if (options.otherValidate.t === 'date' && Comm.date.compareDate(Comm.date.formatDate(value, 'yyyy-MM-dd'), Comm.date.formatDate($_value, 'yyyy-MM-dd')) > 0) {
							$.fn.validatebox.defaults.rules.verifyUnique.message = options.otherValidate.msg;
							return false;
						}
					}
				}
			}
			//如果传入数据时时间字符串
			if ((value && options.val) && Comm.dateEqual(value,options.val)) {
				return true;
			}
        	var queryParam = options.query+'='+value;
        	if (options.data) {
        		queryParam += '&'+options.data;
        	}
        	//如果数据有通过ID获取数据标示符 '#'
        	if (options.dyndata) {
        		for (var key in options.dyndata) {
        			queryParam+='&'+key+'='+$(options.dyndata[key]).val();
        		}
        	}
        	var t = $.parseJSON($.ajax({url:options.url,async: false,data :queryParam}).responseText);
        	if(t.data == '0') _unique = true;
        	if(t.data == '1') {
        		_unique = false;
        		if (options.message) {
        			$.fn.validatebox.defaults.rules.verifyUnique.message = options.message;
        		}
        	}
	    	return _unique;
		},
		message : '该数据已经存在，请输入唯一数据'
	},
	ZYInDate : {
		validator : function(value,params) {
			var r = true;
			var $_outdate = $(params[0]).val();
			if (Comm.util.isNotEmpty(value) && Comm.util.isNotEmpty($_outdate)) {
				//比较时间
				if(Comm.date.compareDate(Comm.date.formatDate(value, 'yyyy-MM-dd'), Comm.date.formatDate($_outdate, 'yyyy-MM-dd')) > 0) {
					r = false;
				}
			}
	    	return r;
		},
		message : '入院时间大于出院时间'
	},
	ZYOutDate : {
		validator : function(value,params) {
			var r = true;
			var $_indate = $(params[0]).val();
			if (Comm.util.isNotEmpty(value) && Comm.util.isNotEmpty($_indate)) {
				//比较时间
				if(Comm.date.compareDate(Comm.date.formatDate(value, 'yyyy-MM-dd'), Comm.date.formatDate($_indate, 'yyyy-MM-dd')) < 0) {
        			r = false;
				}
			}
	    	return r;
		},
		message : '出院时间小于入院时间'
	}
});

//修改按钮的状态
$.fn.state = function(params){
	if(params==='enable') {
		$(this).css('display', 'inline-block');
	} else if(params==='disable') {
		$(this).css('display', 'none');
	}
};

//控件
Comm.widget = {
		//初始化 选择 去年、今年等
		initTime : function(panel, selId, btimeId, etimeId, initSelVal) {
			var _panel = $('#' + panel);
			
			_panel.append(['<select id="',selId,'" onchange="Comm.widget.timeChange(\'',selId,'\',\'',btimeId,'\',\'',etimeId,'\')">',
						'<option value="jt">今天</option>',
						'<option value="zt">昨天</option>',
						'<option value="bz">本周</option>',
						'<option value="sz">上周</option>',
						'<option value="by">本月</option>',
						'<option value="sy">上月</option>',
						'<option value="jn">今年</option>',
						'<option value="qn">去年</option>',
						'<option value="zjyy">最近一个月</option>',
						'<option value="zdysj">自定义时间</option>',
					'</select> ',
					'<span id="',selId,'Panel" style="display: none;">',
					'<input type="text" id="',btimeId,'" class="Wdate" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})" style="width: 100px;"/>',
					' ~ <input type="text" id="',etimeId,'" class="Wdate" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})" style="width: 100px;"/>',
					'</span>'].join(''));
			if(initSelVal) $('#' + selId).val(initSelVal);
			else $('#' + selId).val('jn');
			Comm.widget.timeChange(selId,btimeId,etimeId)
		},
		//下拉框的值的改变事件
		timeChange : function(selId, btimeId, etimeId) {
			var _val = $('#' + selId).val();
			var _selIdPanel = $('#' + selId + 'Panel');
			var _btimeVal = '';
			var _etimeVal = '';
			
			//获取本周、本季度、本月、上月的开端日期、停止日期 
			var now = new Date(); //当前日期 
			var nowDayOfWeek = now.getDay(); //今天本周的第几天 
			var nowDay = now.getDate(); //当前日 
			var nowMonth = now.getMonth(); //当前月 
			var nowYear = now.getYear(); //当前年 
			nowYear += (nowYear < 2000) ? 1900 : 0; //
			var lastMonthDate = new Date(); //上月日期
			lastMonthDate.setDate(1);
			lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
			var lastMonth = lastMonthDate.getMonth();
			//获得某月的天数 
			function getMonthDays(myMonth){ 
				var monthStartDate = new Date(nowYear, myMonth, 1); 
				var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
				var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
				return days; 
			}
			if(_val === 'jt') {
				_btimeVal = Comm.date.formatStr(new Date(), 'yyyy-MM-dd');
				_etimeVal = _btimeVal;
			} else if(_val === 'zt') {
				_btimeVal = Comm.date.formatStr(Comm.date.getDateAddDay(new Date(), -1), 'yyyy-MM-dd');
				_etimeVal = _btimeVal;
			} else if(_val === 'bz') {
				var _weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
				_btimeVal = Comm.date.formatStr(_weekStartDate, 'yyyy-MM-dd');
				var _weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
				_etimeVal = Comm.date.formatStr(_weekEndDate, 'yyyy-MM-dd');
			} else if(_val === 'sz') {
				var _weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
				_btimeVal = Comm.date.formatStr(Comm.date.getDateAddDay(_weekStartDate, -7), 'yyyy-MM-dd');
				var _weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
				_etimeVal = Comm.date.formatStr(Comm.date.getDateAddDay(_weekEndDate, -7), 'yyyy-MM-dd');
			} else if(_val === 'by') {
				var _monthStartDate = new Date(nowYear, nowMonth, 1);
				_btimeVal = Comm.date.formatStr(_monthStartDate, 'yyyy-MM-dd');
				var _monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
				_etimeVal = Comm.date.formatStr(_monthEndDate, 'yyyy-MM-dd');
			} else if(_val === 'sy') {
				var _lastMonthStartDate = new Date(nowYear, lastMonth, 1); 
				_btimeVal = Comm.date.formatStr(_lastMonthStartDate, 'yyyy-MM-dd');
				var _lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
				_etimeVal = Comm.date.formatStr(_lastMonthEndDate, 'yyyy-MM-dd');
			} else if(_val === 'jn') {
		        _btimeVal = Comm.date.formatStr(new Date(), 'yyyy')+'-01-01';
				_etimeVal = Comm.date.formatStr(new Date(), 'yyyy-MM-dd');
			} else if(_val === 'qn') {
		        //获得当前年份4位年
		        var currentYear = new Date().getFullYear();
		        currentYear--;
		        var _priorYearFirstDay = new Date(currentYear, 0, 1);
		        var _priorYearLastDay = new Date(currentYear, 11, getMonthDays(11));
		        _btimeVal = Comm.date.formatStr(_priorYearFirstDay, 'yyyy-MM-dd');
				_etimeVal = Comm.date.formatStr(_priorYearLastDay, 'yyyy-MM-dd');
			}else if(_val === 'zjyy') {
				var _weekStartDate = new Date(nowYear, nowMonth, nowDay-30);
				_btimeVal = Comm.date.formatStr(_weekStartDate, 'yyyy-MM-dd');
				var _weekEndDate = new Date(nowYear, nowMonth, nowDay );
				_etimeVal = Comm.date.formatStr(_weekEndDate, 'yyyy-MM-dd');
			}
			if(_btimeVal != '' && _etimeVal != '') {
				$('#' + btimeId).val(_btimeVal);
				$('#' + etimeId).val(_etimeVal);
			}
			if(_val === 'zdysj') {
				_selIdPanel.css('display', 'inline-block');
			} else {
				_selIdPanel.css('display', 'none');
			}
		}
};

$.extend($.fn.validatebox.methods, {  
	remove: function(jq, newposition){  
		return jq.each(function(){  
			$(this).removeClass("validatebox-text validatebox-invalid").unbind('focus.validatebox').unbind('blur.validatebox');
		});  
	},
	reduce: function(jq, newposition){  
		return jq.each(function(){  
		   var opt = $(this).data().validatebox.options;
		   $(this).addClass("validatebox-text").validatebox(opt);
		});  
	}	
});

window.onload=function(){
	document.getElementsByTagName("body")[0].onkeydown =function(){
		//获取事件对象
		var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget; 
		
		if(event.keyCode==8){//判断按键为backSpace键
		
				//获取按键按下时光标做指向的element
				var elem = event.srcElement || event.currentTarget; 
				
				//判断是否需要阻止按下键盘的事件默认传递
				var name = elem.nodeName;
				
				if(name!='INPUT' && name!='TEXTAREA'){
					return _stopIt(event);
				}
				var type_e = elem.type.toUpperCase();
				if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){
						return _stopIt(event);
				}
				if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
						return _stopIt(event);
				}
			}
		}
	}
function _stopIt(e){
		if(e.returnValue){
			e.returnValue = false ;
		}
		if(e.preventDefault ){
			e.preventDefault();
		}				
		return false;
}
function changeTop(){
	//固定左侧随屏滚动
    var sTop = $(document).scrollTop();
    $(".global_tit").css("top",sTop);
    var sWid = $(document).scrollLeft();
    $(".global_tit").css("left",sWid);
};
$(window).scroll(function(){
    changeTop();
});
