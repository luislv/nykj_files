/**
 * Created by luislv on 2015/6/18.
 */
/* 模拟select*/
function CoLeeSelect(thisObj){
    var thisinput = thisObj.getElementsByTagName("input");
    var thisul = thisObj.getElementsByTagName("ul");
    var thisli = thisul[0].getElementsByTagName("li");
    if(thisObj.id != "CoLeeSelect"){
        thisObj.id = "CoLeeSelect";
        thisObj.focus();
        thisul[0].style.display = "";
        for(var i=0;i<thisli.length;i++){
            thisli[i].onmouseover = function(){
                for(var j=0;j<thisli.length;j++){
                    thisli[j].className = "";
                }
                this.className = "hover";
            }
            thisli[i].onclick = function(){
                thisinput[0].value = this.innerHTML;
            }
        }
    }else{
        ObjBlur();
    }
    thisObj.onblur = ObjBlur;
    function ObjBlur(){
        thisObj.id =  "";
        thisul[0].style.display = "none";
        thisObj.blur();
    }
}
function cue_box(){
    /* 右下角提示框 */
    var cue_height = $(".cue_box").height();
    $(".cue_box").css("bottom",-cue_height);
    $(".cue_box").animate({bottom:'0px'},"slow");
    $(".cue_box .close").bind("click",function(){
        $(".cue_box").animate({bottom:"-200px"},"slow");
    });
}

$(function () {
    /*通用-文本框默认文字*/
    $('.cl_value li input').each(function(){
        var txt = $(this).val();
        $(this).focus(function(){
            if(txt === $(this).val()) $(this).val("");
            $(this).addClass("active")
        }).blur(function(){
            if($(this).val() == "") $(this).val(txt);
            $(this).removeClass("active")
        });
    })
    /* 拨号弹窗 */
    $(".tool_bar .bh").click(function(){
        $(this).find(".call_out").show();
    });
    /* 字段弹窗 */
    $(".zd_box").click(function(){
        $(this).find(".check_list").show();
    });
    /* 设置弹窗 */
    $(".setting .btn").click(function(){
        $(this).next(".setting_box").show();
    });
    $(".setting_box .close").click(function(){
        $(this).parents(".setting_box").hide();
    });
    /* 示忙示闲 */
    $(".tool_bar .zt .tab_btn").click(function() {
        $(this).next(".tab_box_c").show();
        $(this).addClass("h");
    });
    /* 点击空白取消各弹窗*/
    $(document).bind("click",function(e){
        var target  = $(e.target);
        if(target.closest(".tool_bar .bh,.call_out").length == 0){
            $(".call_out").hide();
        };
        if(target.closest(".zd_box,.check_list").length == 0){
            $(".check_list").hide();
        };
        if(target.closest(".setting,.setting_box").length == 0){
            $(".setting_box").hide();
        };
        if(target.closest(".tab_btn,.tab_box_c").length == 0){
            $(".tab_box_c").hide();
            $(".tool_bar .zt .tab_btn").removeClass("h");
        };
        e.stopPropagation();
    })
    /* 模拟checkbox */
    $(".mn_check").click(function(){
        if($(this).text().trim()=="0"){
            $(this).addClass("cur");
            $(this).text('1');
        }else{
            $(this).removeClass("cur");
            $(this).text('0');
        }
    });
    cue_box();
});
