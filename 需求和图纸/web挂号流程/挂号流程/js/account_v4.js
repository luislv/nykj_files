$(function() {

	$('#account_content').each(function() {
		var h = $(this).height();
		var ch = $(this).find('.col_main').height();
		if (ch < 1099) {
			h = 1100;
			var bro=$.browser;
			$(this).css("min-height",h);
			if(bro.msie&&bro.version=="6.0") {$(this).css("height",h);}
		};
		 $(this).find('.col_side').css({
		 	height: h
		 });

		$('.ac_m_item').hover(function() {
		 	$(this).addClass('hover');
		 }, function() {
		 	$(this).removeClass('hover');
		 });

		// if (h == 734) {
		// 	$(this).find('div.ac_m_item:last').addClass('no_bor');
		// };else{};

		$('.oder_table > tbody').find('tr:odd').css("background-color","#fafafa");
		$('.oder_table > tbody').find('tr').hover(function() {
			$(this).addClass('tr_hover');
		}, function() {
			$(this).removeClass('tr_hover');
		});

		$('.con_item').hover(function() {
			$(this).addClass('tr_hover');
		}, function() {
			$(this).removeClass('tr_hover');
		});
	});
	
	$('.dp_btn,.comm_btn').on('click',function() {
		var k =$(this).parent().parent().find('ol');
		var p=$(this).parents('.comm_info').find('.comm_btn');
		var yuyid=$(this).parents('.comm_info').attr('val');
		k.toggle();
		if (k.is(':hidden')) {
			$(this).addClass('cl00a');
			p.addClass('none');
		}else{
			showInput('#content_yuyid', '#showInputyuyid', 20, 200);
			$(this).removeClass('cl00a');
			p.removeClass('none');
		};
	});
		
	$('.pay_way_chose li h4').click(function() {
		$(this).parents().find('.bank_panel').hide();
		$(this).next('.bank_panel').toggle();
	});

	$('.bank_dl dt').each(function() {
		 // var c = $(this).find('.bank_rd').attr("checked");
		 if ($(".bank_rd").attr("checked","true")) {
		 	$(this).find('label i.bk_icon').css('border-color', '#ddd');
		 }else{
		 	$(this).find('label i.bk_icon').css('border-color', '#f90');
		 };

	});
	$('.msg_listUL > li').click(function() {
		if($(this).attr('class') != 'hs_read'){
			$(this).addClass('hs_read');
			var unread=$('#unreadrecord').html();
			num=unread-1;
			$('#unreadrecord').html(num);
			$(this).find('.msgState strong').text('已读');
			$.ajax({
				url:JYUrl("account","uprecord"),
				type:'post',
				data:{lid:$(this).attr('val')},
				dataType:'json',
				success:(function(de){
				})
			});
		}
	});
	
	$('.add_family,.pay_tips_btn .ok_btn').click(function() {
		$('.add_familys').toggle();
		/* Act on the event */
	});
	
	/*$('.body').each(function() {
		 var faq_html = "<div class='faq'><ul class='links'><li class='links_item no_extra'><a href='#' target='_blank'>在线客服</a></li><li class='links_item'><a href='#' target='_blank'>客服中心</a></li></ul><p class='tail fs12'>客服电话：400-11-91160</p></div>";
		 $(this).append(faq_html);
	});*/
	//绑定
	$('._bind_event_trust').on('click', '._bind', function(){
		var _bind_t = $(this);
		var _bind_type = $(this).attr('type');
		var title;
		if(_bind_type=='phone'){
			 title='手机绑定';
		}else if(_bind_type=='email'){
			 title='邮箱绑定';
		}else if(_bind_type=='nickname'){
			 title='昵称绑定';
		}else if (_bind_type=='company_telephone'){
			 title='公司电话';
		}else if (_bind_type=='company_address'){
			 title='公司地址';
		}else if (_bind_type=='apply_tocash'){
			 title='提现';
		}
		if($('#bind-'+_bind_type).length){
			_alert($('#bind-'+_bind_type).html(),{
			id:'_bind_div_id_',
			padding:'0 30px 30px',
			time:777,
			title:title},
			function(){
				var _bind_phone_state = 0;
				var _smscode_ = $('#_smscode_');
				var _getsmscode = $('#getcheckcode');
				var _bphone_action = $('#_bind_phone_action');
				var _bemail_action = $('#_bind_email_action');
				var _nickname_action =$('#_bind_nickname_action');
				var _upcompany_address_action = $('#_up_company_address_action');
				var _upcompany_telephone_action = $('#_up_company_telephone_action')
				var phonereg = /^((\(\d{3}\))|(\d{3}\-))?1[3-8][0-9]\d{8}?$|15[89]\d{8}$/;
				var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9_]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

				_getsmscode.length && _getsmscode.on('click',function(){
					setTimeout(function(){
						$(this).css('cursor','pointer');
					},6000);
					var _phone = $('#_bind_phone_val').val();
					if(!phonereg.test(_phone)){
						_alert('手机号码有误,请联系客服',{title:'提示'});return false;
					}
					var t = this;
					if($(t).first().css('cursor') == 'wait' || $(t).attr('id')==''){
						return false;
					}else{
						$(t).first().css('cursor', 'wait');
						$(t).first().text('发送中...');
					}
					$.ajax({
						url:JYUrl("account","sendsms"),
						type:'post',
						data:{phone:_phone},
						dataType:'json',
						success:(function(de){
							if(de.code==1){
								$(t).attr('id','');
								$(t).first().text('90秒后可重发');
								$('#_sended_phone').val(_phone);
								_bind_phone_state = 1;
								var int = setInterval(function(){
									var start = parseInt($(t).first().text().replace(/[^0-9]/ig,""));
									if(start<1){
										window.clearInterval(int);
										$(t).attr('id','getcheckcode');
										$(t).first().css('cursor','pointer');
										$(t).first().html('<a href="javascript:void(0);">获取验证码</a>');
									}else{
										$(t).first().text((start-1)+' 秒后可重发');
									}
								},1000);
							}else{
								_alert(de.msg,{title:' '});
								$(t).attr('id','getcheckcode');
								$(t).first().css('cursor','pointer');
								$(t).first().html('<a href="javascript:void(0);">获取验证码</a>');
							}
						})
					});
					return false;
				});

				_bphone_action.on('click',function(){
					var _sended_phone = $('#_sended_phone');
					if(!_bind_phone_state)_alert('请先输入您要绑定的手机号码并点击“获取验证码”进行验证');
					if(!_sended_phone.val())_alert('手机号码获取失败，请关闭窗口重新绑定');
					if(_validate(_smscode_)){
						var t = this;
						if(t.style.cursor == 'wait'){
							return false;
						}else{
							t.style.cursor = 'wait';
						}

						$.ajax({
							url:JYUrl("user","checkPhoneCode"),
							type:'post',
							data:{code:_smscode_.val(),phone:_sended_phone.val()},
							dataType:'json',
							success:(function(de){
								if(de.code ==1){
									_bind_t.parent().html(_sended_phone.val()+'&nbsp;<strong class="fs12 green_0">已绑定</strong>');
									art.dialog({id:'_bind_div_id_'}).close();
								}
								_alert(de.msg, {title:' '});
								t.style.cursor = 'pointer';
							})
						});
					}
				});
				
				var _bind_email_val = $('#_bind_email_val');
				var mail_array = ['sina.com','163.com','qq.com','126.com','sina.cn','hotmail.com','sohu.com','yahoo.cn','139.com','wo.com.cn','189.cn','msn.com'];
				_bemail_action.on('click',function(){
					var t = this;
					if(emailreg.exec(_bind_email_val.val())){
						if(t.style.cursor == 'wait' || $(t).attr('id')==''){
							return false;
						}else{
							t.style.cursor = 'wait';
							$(t).text('发送中...');
						}
						$.ajax({
							url:JYUrl("account","bindmail"),
							type:'post',
							data:{mail:_bind_email_val.val()},
							dataType:'json',
							success:(function(de){
								if(de.code==1){
									$(t).attr('id','').text('登陆我的邮箱').on('click',function(){
										var mail_addr = _bind_email_val.val().split("@")[1];
										if($.inArray(mail_addr, mail_array)>=0){
											mailURL = "http://mail." + _bind_email_val.val().split("@")[1];
										}else{
											mailURL = "http://www." + _bind_email_val.val().split("@")[1];
										}
										window.open(mailURL);
									});
								}else{
									_alert(de.msg, {title:' '});
									$(t).text('发送验证邮件');
								}
								t.style.cursor = 'pointer';
							})
						})
					}else{
						_alert('请输入正确的邮箱地址');
					}
					return false;
				});
				var _bind_nickname_val = $('#_bind_nickname_val');
				var nickname=$('#nickname_show').text();
				_bind_nickname_val.val(nickname);
				_nickname_action.on('click',function(){
					var t = this;
					if(trim(_bind_nickname_val.val())== '') {
						_alert('昵称不能为空',{title:'提示'});
						return false;
					}
					if(nickname == _bind_nickname_val.val()){
						//_alert('昵称已经存在',{title:'提示'});
						return false;
					}
					$.ajax({
						url:JYUrl("account","upnickname"),
						type:'post',
						data:{nickname:_bind_nickname_val.val()},
						dataType:'json',
						success:(function(de){
							art.dialog({id:'_bind_div_id_'}).close();
							$('#nickname_show').html(_bind_nickname_val.val());
							_bind_nickname_val.attr('');
							if(de.code==1){
								_alert(de.msg,{title:'提示'});
							}else{
								_alert(de.msg,{title:'提示'});
							}
							t.style.cursor = 'pointer';
						})
					})
				});
				
				var _up_company_telephone_val = $('#_up_company_telephone_val');
				var company_telephone=$('#company_telephone_show').text();
				_up_company_telephone_val.val(company_telephone);
				_upcompany_telephone_action.on('click',function(){
					var t = this;
					if(trim(_up_company_telephone_val.val())== '') {
						_alert('公司名称不能为空',{title:'提示'});
						return false;
					}
					if(company_telephone == _up_company_telephone_val.val()){
						//_alert('昵称已经存在',{title:'提示'});
						return false;
					}
					$.ajax({
						url:JYUrl("account","upgroupuser"),
						type:'post',
						data:{company_telephone:_up_company_telephone_val.val()},
						dataType:'json',
						success:(function(de){
							art.dialog({id:'_bind_div_id_'}).close();
							$('#company_telephone_show').html(_up_company_telephone_val.val());
							_up_company_telephone_val.attr('');
							if(de.code==1){
								_alert(de.msg,{title:'提示'});
							}else{
								_alert(de.msg,{title:'提示'});
							}
							t.style.cursor = 'pointer';
						})
					})
				});
				
				var _up_company_address_val = $('#_up_company_address_val');
				var company_address=$('#company_address_show').text();
				_up_company_address_val.val(company_address);
				_upcompany_address_action.on('click',function(){
					var t = this;
					if(trim(_up_company_address_val.val())== '') {
						_alert('昵称不能为空',{title:'提示'});
						return false;
					}
					if(company_address == _up_company_address_val.val()){
						//_alert('昵称已经存在',{title:'提示'});
						return false;
					}
					$.ajax({
						url:JYUrl("account","upgroupuser"),
						type:'post',
						data:{company_address:_up_company_address_val.val()},
						dataType:'json',
						success:(function(de){
							art.dialog({id:'_bind_div_id_'}).close();
							$('#company_address_show').html(_up_company_address_val.val());
							_up_company_address_val.attr('');
							if(de.code==1){
								_alert(de.msg,{title:'提示'});
							}else{
								_alert(de.msg,{title:'提示'});
							}
							t.style.cursor = 'pointer';
						})
					})
				});
				
			});
		}
	});

	//---------------------tpwd start 修改密码---------------------
	var _tpwd_old_state = 0;
	var _tpwd_oldpwd = $('#_oldpwd');
	var _tpwd_pwd = $('#_pwd_');
	var _tpwd_repwd = $('#_repwd_');
	var _edit_tpwd_action= $('#_edit_tpwd_action');

	_tpwd_oldpwd.on('blur', function(){
		if(!_tpwd_oldpwd.val()){
			dlg_msg(_tpwd_oldpwd,'请输入原始登录密码');
		}else{
			dlg_msg(_tpwd_oldpwd, '');
			_tpwd_old_state = 1;
		}
	});

	_tpwd_pwd.on('blur', function(){
		_up_validate(_tpwd_pwd);
	});
	
	_tpwd_pwd.on('keyup',function(){
		switch(ergpwd($(this).val())){
			case 1:
				$('#_check_pwd').html('&nbsp;&nbsp;<span style="color: #F00;font-style: normal;">弱</span>');break;
			case 2:
				$('#_check_pwd').html('&nbsp;&nbsp;<span style="color: #FE9B39;font-style: normal;">中</span>');break;
			case 3:
				$('#_check_pwd').html('&nbsp;&nbsp;<span style="color: #45AC07;font-style: normal;">强</span>');break;
			default:
				$('#_check_pwd').html('&nbsp;&nbsp;<span style="color: #F00;font-style: normal;">弱</span>');break;
		};
		return true;
	});

	_tpwd_repwd.on('blur', function(){
		_validate(_tpwd_repwd);
	});

	_edit_tpwd_action.on('click',function(){
		if(_tpwd_old_state){
			if(_up_validate(_tpwd_pwd)
			&& _validate(_tpwd_repwd)){
				$.ajax({
					url:JYUrl("account","editpwd"),
					type:'post',
					data: {oldpwd:_tpwd_oldpwd.val(),pwd:_tpwd_repwd.val()},
					dataType:'json',
					success:(function(de){
						if(de.code==1){
							_alert('修改成功，请重新登录');location.href=JYUrl("user","login");
						}else{
							_alert(de.msg,{title:'提示'});
						}
					})
				});
			}
		}else{
			dlg_msg(_tpwd_oldpwd,'请输入原始登录密码');
		}
		return false;
	});
	function _up_validate(o, arge){
		var passwdreg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;
		switch(o.attr('id')){
			case '_pwd_'://@找回密码/设置密码/注册
				if(o.val() == ''){
					dlg_msg(o, '密码不能为空');
				}else if(!passwdreg.exec(o.val())){
					dlg_msg(o, '输入8-20位包含数字、大小写字母的密码');
				}else{
					dlg_msg(o, '');
					return true;
				}
				break;
			default:
		}

		return false;
	}
	function ergpwd(a) {
		var b = 0;
		a.match(/[a-z]/g) && b++;
		a.match(/[A-Z]/g) && b++;
		a.match(/[0-9]/g) && b++;
		a.match(/[^a-zA-Z0-9]/g) && b++;
		b = b > 3 ? 3 : b;
		if (a.length < 6 || /^\d{1,8}$/.test(a)) b = 0;
		a.length < 8 && b > 1 && (b = 1);
		return b;
	}
	
	//----------------------------------unbindwx微信解除绑定
	$('#unbindwx').click(function(){
		_alert($('#showmsg').html(),{verify:true,cancel:true,css:'dialog_w340'},function(){
			art.dialog({id: '_tips_id_v2_'}).close();
			$.getJSON(
					JYUrl('account','unbindwx'),function(json){
						_alert(json.msg,{title:'提示'});
						if(json.code == 1){
//							$('#wxscan_code').attr('src',json.data);
							$('#unbindshow').hide();
							$('#bindwx').show();
						}
					});
		});
	});
	//添加家庭成员
	$('#add_member,._up_mem').live('click',function(){
		var memid='',truename='',birth='',sex='',card_type='',card='',phone='',social_card='';
		if($(this).attr('id') !='add_member'){
			 memid=$(this).attr('val');
			 truename=$(this).attr('truename');
			 sex=$(this).attr('sex');
			 birth=$(this).attr('birth');
			 card_type=$(this).attr('card_type');
			 card=$(this).attr('card');
			 phone=$(this).attr('phone');
			 social_card=$(this).attr('social_card');
		}
		var html='<div class="add_familys mb20 layout">';
			html+='<h6 class="block fs16 p10 show_h6"><i class="icon s_flex"></i> 添加/修改成员 </h6>';
			html+='<form class="section-bd accordion-bd">';
			html+='<div class="add_tips">为了正确就诊，请您务必如实填写以下信息。如果没有证件号码（如新生儿），请您本人携带好证件，与就诊人一起到医院取号。具体情况，以各医院标准而定。</div>';
			html+='<div class="add_table">';
			html+='<table class="t_info">';
			html+='<tbody><tr><td class="form-key"><label><strong class="red_0">*</strong>姓名</label></td>';
			html+='<td class="form-value">';
			html+='<input class="form-input text span_l" id="_truename_" value="'+truename+'" type="text"></td>';
			html+='</tr>';
//			html+='<tr class="dlg_class__truename_" style=""> <td></td> <td><div class="form-validation">真实姓名不能为空</div></td></tr>';
			html+='<tr>';
			html+='<td class="form-key">';
			html+='<label><strong class="red_0">*</strong>性别</label> </td>';
			html+='<td class="form-value">';
			html+='<label><input class="form-radio _isex" name="_msex" type="radio" value="0" '+(sex==0? 'checked' :'')+'>&nbsp;男</label>&nbsp;&nbsp;';
			html+='<label><input class="form-radio _isex" name="_msex" type="radio" value="1" '+(sex==1? 'checked' :'')+'>&nbsp;女</label>';
			html+='</td></tr><tr>';
			html+='<td class="form-key"><label>证件号码</label></td>';
			html+='<td class="form-value">';
			html+='<select class="form-select span_s" id="_mcard_type">';
			html+='<option value="01" '+(card_type=='01'? 'selected':'')+'>身份证</option>';
			html+='<option value="02" '+(card_type=='02'? 'selected':'')+'>港澳居民身份证</option>';
			html+='<option value="04" '+(card_type=='04'? 'selected':'')+'>护照</option>';
			html+='</select>';
			html+='<input class="form-input text span_m" id="_icard_" value="'+card+'" type="text">';
			html+='</td> </tr><tr>';
			html+='<td class="form-key"> <label><strong class="red_0">*</strong>出生日期</label>';
			html+='</td>';
			html+='<td class="form-value _nybirth" id="_nybirth"><select  name="jyyear" class="form-select span_xs _jyyear"><option value="0" selected="true">-</option></select>';
			html+='年';
			html+='<select  name="jymonth" class="form-select span_xs _jymonth"><option value="0" selected="true">-</option></select>';
			html+='月';
			html+='<select  name="jyday" class="form-select span_xs _jyday"><option value="0" selected="true">-</option></select>';
			html+='日';
			html+='<input type="hidden" class="_birth" id="_mbirth" value="'+birth+'"/></td> ';
			html+='</tr>';
			html+= '<tr>';
			html+='<td class="form-key">';
			html+='<label>手机号</label>';
			html+='</td>';
			html+='<td class="form-value"><input class="form-input text span_l" id="_phone_" maxlength="11"  value="'+phone+'" type="text"></td>';
			html+='</tr>';
			html+='<tr>';
			html+='<td class="form-key">';
			html+='<label>社保电脑号</label>';
			html+='</td>';
			html+='<td class="form-value"><input class="form-input text span_l" id="_msocial_card" value="'+social_card+'" type="text" maxlength="12"></td>';
			html+='</tr>';
			html+='</tbody>';
			html+='<tfoot>';
			html+='<tr>';
			html+='<td><input type="hidden" id="_member_id" value="'+memid+'"></td>';
			html+='<td class="pay_tips_btn"><input class="ok_btn _maction" style="cursor:pointer;"  type="button" value="保 存"></td>';
			html+='</tr>';
			html+='</tfoot></table></div></form></div>';
		_alert(html,{id:'_add_members',width:600},function(){
			var birthreg = /^\d{4}-\d{1,2}-\d{1,2}$/;
			var o = {jyyear:$('._jyyear'),
					jymonth:$('._jymonth'),
					jyday:$('._jyday')};
			if(birthreg.test(birth)){
				var $birth = birth.split('-');
				$jybirth($birth[0], $birth[1], $birth[2], o);
			}else{
				$jybirth(null, null, null, o);
			}
		});
	})
	
	//删除成员
	$('._del_mem').live('click',function(){
		var memid=$(this).attr('val');
		_alert('<div class="pay_tipsUL"><h4 class="fs18 tc">您确定要删除该成员吗？</h4><p class="block tc p10 cl3a">为了防止黄牛，成员删除后，要新添加须过24小时候才能添加！造成不便，敬请见谅！</p></div>',
				{title:'提示',time:777,id:'_del_member_div',verify:'确定删除',cancel:'暂不删除'},function(){
			$.ajax({
				url:JYUrl("member","del",{mid:memid}),
				type:'get',
				dataType:'json',
				success:(function(de){
					if(de.code ==1){
						$('#mem'+memid).hide();
						art.dialog({id:'_del_member_div'}).close();
					}
					_alert(de.msg, {title:'提示'});
				})
			});
			
		});
	});
//	$('._up_mem').live('click',function(){
//		 $('#up_member_show #_jyday_').val('2012-01-22');
//		_alert($('#up_member_show').html(),{title:'提示',width:600,time:777});
//	})
	 //提交添加
	$('._maction').live('click',function(){
		var _member_id = $(this).parents('.t_info').find('#_member_id');
		var _truename_ = $(this).parents('.t_info').find('#_truename_');
		var _msex = $(this).parents('.t_info').find('input:radio[name="_msex"]:checked');
		var _mcard_type = $(this).parents('.t_info').find('#_mcard_type');
		var _icard_ = $(this).parents('.t_info').find('#_icard_');
		var _mbirth = $(this).parents('.t_info').find('#_mbirth');
		var _phone_ = $(this).parents('.t_info').find('#_phone_');
		var _msocial_card = $(this).parents('.t_info').find('#_msocial_card');
		if(_validate(_truename_)){
			if(_icard_.val().length && !_validate(_icard_))return false;
			if(_phone_.val().length && !_validate(_phone_))return false;
			var _member_birth = _validate(_mbirth,{o:_mbirth,card:_icard_.val()});
			if(jsGetAge(_member_birth)>16 && !_icard_.val().length){dlg_msg($(_icard_), "该成员年龄大于16岁，需要填写证件号码");return false;}
			//验证社保电脑号
			var cardId = _icard_.val();
			var socialCard = _msocial_card.val();
			if(socialCard){
				var rel = validSocialCard(cardId, socialCard);
				if(rel.code == 0){
					dlg_msg(_msocial_card, rel.msg);
					return false;
				}
			}
			if(_member_birth){
				var _mem_t = this;
				if(_mem_t.style.cursor == 'wait'){
					return false;
				}else{
					_mem_t.style.cursor = 'wait';
				}
							
				
				$.ajax({
					url:JYUrl("member","save"),
					type:'post',
					data: {
						mid:_member_id.val(),
						truename:_truename_.val(),
						sex:_msex.val(),
						card_type:_mcard_type.val(),
						card:cardId,
						mbirth:_member_birth,
						phone:_phone_.val(),
						social_card:_msocial_card.val()
					},
					dataType:'json',
					success:(function(de){
						if(de.code==1){
								var showHtml='';
								if(isNaN(de.mid) || !_member_id.val()){showHtml+= '<tr id=mem'+de.mid+'>';}
								showHtml+='<td>'+_truename_.val()+'</td>';
								showHtml+='<td>'+(_msex.val()== 0 ? '男':'女')+'</td>';
								showHtml+='<td>'+_icard_.val()+'</td>';
								showHtml+='<td>'+_member_birth+'</td>';
								showHtml+='<td>'+_phone_.val()+'</td>';
								showHtml+='<td>'+_msocial_card.val()+'</td>';
								showHtml+='<td class="fun_td">';
								showHtml+='<ul>';
								showHtml+='<li><a href="javascript:void(0);" val="'+(de.mid? de.mid : _member_id.val())+'" truename="'+_truename_.val()+'" birth="'+_member_birth+'" sex="'+_msex.val()+'" card_type="'+_mcard_type.val()+'" card="'+_icard_.val()+'" phone="'+_phone_.val()+'" social_card="'+_msocial_card.val()+'" class="_up_mem" ><i class="icon oder_dp" id="_up_mem_id'+de.mid+'" val="'+de.mid+'"></i>修改</a></li>';
								showHtml+='<li><a href="javascript:void(0);" val="'+(de.mid? de.mid : _member_id.val())+'" truename="'+_truename_.val()+'" birth="'+_member_birth+'" sex="'+_msex.val()+'" card_type="'+_mcard_type.val()+'" card="'+_icard_.val()+'" phone="'+_phone_.val()+'" social_card="'+_msocial_card.val()+'" class="cl81 _del_mem"><i class="icon oder_del" id="_del_mem_id'+de.mid+'" val="'+de.mid+'"></i>删除</a></li>';
								showHtml+='</ul>';
								showHtml+='</td>';
								if(isNaN(de.mid) || !_member_id.val()){showHtml+='</tr>';}
							if(isNaN(de.mid) || !_member_id.val()){
								$('#mem_list').append(showHtml);
							}else{
								$('#mem'+_member_id.val()).html(showHtml);
							}
							_alert($(_mem_t).val().replace(/\s/g,"")+'成功',{title:'提示'});
						}else{
							_alert(de.msg,{title:'提示'});
						}
						art.dialog({id:'_add_members'}).close();
					})
				});
			}
		}
	})
	//JS日期系列：根据出生日期 得到周岁年龄              
	//参数strBirthday已经是正确格式的2007-02-09这样的日期字符串
	//后续再增加相关的如日期判断等JS关于日期处理的相关方法
	function jsGetAge(strBirthday)
	{      
	    var returnAge;
	    var strBirthdayArr=strBirthday.split("-");
	    var birthYear = strBirthdayArr[0];
	    var birthMonth = strBirthdayArr[1];
	    var birthDay = strBirthdayArr[2];
	   
	    d = new Date();
	    var nowYear = d.getFullYear();
	    var nowMonth = d.getMonth() + 1;
	    var nowDay = d.getDate();
	   
	    if(nowYear == birthYear)
	    {
	        returnAge = 0;//同年 则为0岁
	    }
	    else
	    {
	        var ageDiff = nowYear - birthYear ; //年之差
	        if(ageDiff > 0)
	        {
	        	returnAge = ageDiff ;
	        }
	        else
	        {
	            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
	        }
	    }
	   
	    return returnAge;//返回周岁年龄
	   
	}
	
	//社保卡验证添加 add by tanggsh ,coding by gongouyan 2014.11.27
	$('.oder_table td.o_id').hover(function(){
		var order=$(this).children(".own_id").html();
		var nowTd=$(this);
		//根据order值加载对应提示

		//模拟提示
		var tips=$("#ownTips");
		nowTd.append(tips);
		$('.oder_table td.o_id').css({"z-index":1});
		nowTd.css({"z-index":2});
		nowTd.css("position","relative");
		tips.css({
			 	"top":90,
			 	"left":10,
			 	"z-index":9999});
		tips.show();

	},function(){
		// 隐藏 提示
		var tips=$(this).find(".tips_mask");
		//tips.remove();
		tips.hide();
	});

	// 显示旧的社保卡
	$(".old_sc").hover(function(){
		$(".old_scimg").show();
		$(".old_scimg").css({
			                "z-index":999,
			            	"left":168,
			            	"top":-80});
	}
	,function(){
		$(".old_scimg").hide();
	});

	// 显示新的社保卡
	$(".new_sc").hover(function(){
		$(".new_scimg").show();
		$(".new_scimg").css({
			                "z-index":999,
			            	"left":100,
			            	"top":-80});
	},function(){
		$(".new_scimg").hide();
	});
 });
function trim(str){ //删除左右两端的空格  
    return str.replace(/(^\s*)|(\s*$)/g, "");  
}

// 2015-04-15 by fanfan

// 选项卡
  $(function(){
    $(".tablist li").hover(function(){
    var _index=$(this).index();
    // alert(typeof(_index));
    var parenBox=$(this).parent();
    var parenBoxli=parenBox.siblings();
    $(this).addClass("current").siblings().removeClass("current");
    parenBoxli.children().hide();
    parenBoxli.children().eq(_index).show();
    
  });
 });

//div垂直居中显示
var $width=$(".tc-box").width();
var $height=$(".tc-box").height();
$(".tc-box").css({"margin-left":-$width/2+"px","margin-top":-$height/2+"px"});
//点击的时候增加灰色透明背景
var pophtml=$("<div class='background'></div>")
// 弹出窗
 $(".click2").click(function(){
	$(".tc-box2").show();
	$("body").append(pophtml);
});
$(".close-a").click(function(){
	$(".tc-box2").hide();
	$(".background").remove();
});


// 输入框焦点事件
    $(".textareas").focus(function () {
        var txtValue = $(this).val();
        if (txtValue == this.defaultValue) {
            $(this).val("").css("color", "#111");
        };
    });
    $(".textareas").blur(function () {
        var txtValue = $(this).val();
        if (txtValue == "") {
            $(this).val(this.defaultValue).css("color", "#aaa");
        };
    });

// 选择网银
$(".wypay").hide();
$(".wy-radio").click(function(){
	$(".wypay").toggle();
})

// 社保大图显示
$(".old-sb-big").hide();
$(".new-sb-big").hide();
$(".clinic-card-big").hide();
$(".old-sb").hover(function(){
	$(".old-sb-big").show()
},function(){
	$(".old-sb-big").hide()
})
$(".new-sb").hover(function(){
	$(".new-sb-big").show()
},function(){
	$(".new-sb-big").hide()
})
$(".clinic-card-small").hover(function(){
	$(".clinic-card-big").show()
},function(){
	$(".clinic-card-big").hide()
})

 $(".yy-time li").click(function(){
    // 创建一个对象;
    var NodeChild = $("<span class='cur'></span>")
    // 移除同级元素中的cur类以及移除类为cur的子元素
    $(this).siblings().removeClass("cur").children().remove(".cur")
    .end().end().addClass("cur").append(NodeChild);
  });

// 诊疗卡
$(".no-cardcon").hide();
 $("#yes-card").click(function(){
 	$(".yes-cardcon").show();
 	$(".no-cardcon").hide();
 });
  $("#no-card").click(function(){
 	$(".yes-cardcon").hide();
 	$(".no-cardcon").show();
 });


// 支付弹窗
var MaskHtml = $("<div class='Mask'></div>");
$(function(){
	$("#nowpaybtn").click(function(){
		// $("#paySuccessful").show();
		$("#paySuccessful").before(MaskHtml).show();
	})
	$(".pay_lose").click(function(){
		$("#paySuccessful").hide();
		$(".pay_lose_tips").show();
	})
})

function close1(){
	$("#paySuccessful").hide();
	MaskHtml.remove()
}

function close2(){
	$(".pay_lose_tips").hide();
	MaskHtml.remove()
}

//病情描述 js异步提交信息
$('#judgmentSubmit').click(function(){
	var url = $("#judgmentForm").attr("action");
	var doctor_id = $('#doctor_id').val();
	var user_id = $('#user_id').val();
	var order_no = $('#order_no').val();
	var f_id = $('#f_id').val();
	var detail = $('#content').val();
	$("#judgmentSubmit").attr('disabled',"true");
	$.post(url,{doctor_id:doctor_id,f_id:f_id,user_id:user_id,detail:detail,order_no:order_no},function(rs){
		if(rs.status){
			_alert(rs.msg,{title:'提示'});
			$("#judgment").html(rs.detail);
		}else{
			alert(rs.msg);
		}
		$('#judgmentSubmit').removeAttr("disabled"); 
	},'json');
});
$(function(){
     //表单验证
	if($('#judgmentForm').size() > 0){
		$('#judgmentForm').validate({   
	        /* 设置验证规则 */  
	        rules: {   
	            content: {
	                required: true,
	                rangelength: [10, 250]
	            }
	        },
	        messages: {
	            content: {
	                required: "",
	                rangelength:"请您输入 10-500 字的疾病描述有助于您的诊疗."
	            }
	        },
	        /* 设置验证触发事件 */  
	        focusInvalid: true,   
	        onkeyup: false,
	        onclick:false,
	        onsubmit:true,
	        errorClass: 'clef9',

	        /* 设置错误信息提示DOM */  
	        errorPlacement: function(error, element) {       
	            error.appendTo( element.parent());       
	        }
	    });
	}     
 });

   
