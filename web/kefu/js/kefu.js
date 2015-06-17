/**
 * Created by luislv on 2015/6/17.
 */
$(function () {
    /*登录文本框默认文字*/
    $('.login_form li input').each(function(){
        var txt = $(this).val();
        $(this).focus(function(){
            if(txt === $(this).val()) $(this).val("");
            $(this).addClass("active")
        }).blur(function(){
            if($(this).val() == "") $(this).val(txt);
            $(this).removeClass("active")
        });
    })

});