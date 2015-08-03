$(function () {
    //弹出回复框
    $(".refund").bind("click", function () {
        var pTop = $(window).height() - $("#float_box").height()
        $("#float_box").css({"top": pTop / 2, "display": "block"});
      //  $("#float_bg").css("display","block");
        $("html").css("overflow","hidden");
    })
    //关闭回复框
    $("#float_box .close").bind("click", function () {
        $("#float_box").css("display","none");
       // $("#float_bg").css("display","none");
        $("html").css("overflow","");
    })
});