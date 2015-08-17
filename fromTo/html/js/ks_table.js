$(function () {
    $('#ks_sel').combo({
        required: true,
        editable: false
    });
    $('#ks_box').appendTo($('#ks_sel').combo('panel'));
    $("#setYuyue .bm_tree span").on("click",
        function () {
            if($(this).hasClass("sel")){
                $(this).removeClass("sel")
            }else{
                $(this).addClass("sel")
            }
        }
    );
});
//修改日历时间格式
function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}
//弹出预约设置框
function setYuyue() {
    var tree_title = "传入对象名";
    $(".setYuyue").remove();
    $("body").append("<div class='setYuyue' id='setYuyue'><div id='close' class='close' onclick='setClose();'></div><div class='tit'><h2>" + tree_title + "预约设置</h2></div><div class='bm_tree'><span class='sel'>某医院</span><span class='sel'>某科室</span><span>二级科室</span><span>某医生</span></div> <dl><dt>是否挂号：</dt><dd><span class='y'><input type='radio' /><label>是</label></span><span class='n'><input type='radio' /><label>否</label></span></dd></dl> <dl><dt>是否预约：</dt><dd><span class='y'><input type='radio' /><label>是</label></span><span class='n'><input type='radio' /><label>否</label></span></dd></dl> <dl><dt>单次服务时间：</dt><dd><input type='text' class='inp' />min</dd></dl> <dl><dt>时段间隔时长：</dt><dd><input type='text' class='inp' />min</dd></dl> <div class='btn'><input type='button' value='确定' class='btn_blue fl_l' onclick='setClose();'/><input type='button' value='取消' class='btn_blue fl_r' onclick='setClose();'/></div></div>")
    $("#setYuyue").css("margin-top", -($(window).height() - $("#setYuyue").height()) / 2);
}
//关闭预约设置框
function setClose() {
    $(".setYuyue").remove();
}
