/*
 * 双列表选择控件
 */
Diallel = function(waitId, selectId) {
		this.waitId = '#' + waitId;
		this.selectId = '#' + selectId;
}
//添加项到选择框
Diallel.prototype.add = function() {
	var _selectId = $(this.selectId);
	$(this.waitId).find('option:selected').each(function(i, obj) {
		_selectId.append(['<option value="',$(obj).val(),'">',$(obj).text(),'</option>'].join(''));
		$(obj).remove();
	});
}
//删除到待选框
Diallel.prototype.del = function() {
	var _waitId = $(this.waitId);
	$(this.selectId).find('option:selected').each(function(i, obj) {
		_waitId.append(['<option value="',$(obj).val(),'">',$(obj).text(),'</option>'].join(''));
		$(obj).remove();
	});
}
//选择框上移
Diallel.prototype.up = function() {
var _selectId = $(this.selectId).find('option');
	
	if($(this.selectId).val() == null || $(this.selectId).find('option:selected').size() > 1){
		alert('请选择一项');
		return false;
	}
	//选中的索引,从0开始
	var optionIndex = $(this.selectId).get(0).selectedIndex;
	//如果选中的不在最上面,表示可以移动
	if(optionIndex > 0){
		$(this.selectId+' option:selected').insertBefore($(this.selectId+' option:selected').prev('option'));
	}
}
//选择框下移
Diallel.prototype.down = function() {
	var _selectId = $(this.selectId).find('option');
	if($(this.selectId).val() == null || $(this.selectId).find('option:selected').size() > 1){
		alert('请选择一项');
		return false;
	}
	//索引的长度,从1开始
	var optionLength = $(this.selectId)[0].options.length;
	//选中的索引,从0开始
	var optionIndex = $(this.selectId).get(0).selectedIndex;
	//如果选择的不在最下面,表示可以向下
	if(optionIndex < (optionLength-1)){
		$(this.selectId+' option:selected').insertAfter($(this.selectId+' option:selected').next('option'));
	}
}

//获取选中的值[返回数组]
Diallel.prototype.selectValues = function() {
	var _values = [];
	$(this.selectId).find('option').each(function(i, obj) {
		_values.push($(obj).val());
	});
	return _values;
}

//获取未选中的值[返回数组]
Diallel.prototype.waitValues = function() {
	var _values = [];
	$(this.waitId).find('option').each(function(i, obj) {
		_values.push($(obj).val());
	});
	return _values;
}