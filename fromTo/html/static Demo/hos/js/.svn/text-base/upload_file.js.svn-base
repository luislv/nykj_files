//判断图片类型
function validateImage(file)
{
    //校验图片格式
    if(/^.*?\.(gif|png|jpg|jpeg|bmp)$/.test(file.value.toLowerCase()))
    {
        return true;
    }
    else
    {
        alert("只能上传jpg、jpeg、png、bmp或gif格式的图片！");
        return false;
    }
}

//图片上传
function uploadImage(object)
{
    //获取文件inputID
    var objectId =  $(object).attr('id');

    //检测图类型是否符合要求
    if(validateImage($('#'+objectId).get(0)))
    {
       //图片上传
         $.ajaxFileUpload({
         url: webroot+'/hHos/f_view/uploadImge.shtml?name=file',//服务器url地址
         secureuri:false,
         fileElementId:objectId,
         dataType: 'json',
         success: function (data)
         {
        	 if (data.code === 'success') {
				  $.messager.show({ title: '提示', msg: '上传图片成功！' });
				  createHosImage(data.data.id);
	              //获取到服务器返回路径 并创建html	
	              var imgSrc = imageHttpUrl+'/'+data.data.filePath;
	              createHtml(object,imgSrc,data.data.id);
        	 }
         }
       }); 
    }
}

function createHosImage(id){
	var html=$('#hosImages').val();
	if(html==''){
		html=id;
	}else{
		html=html+","+id;
	}
	$('#hosImages').val(html);
}

function createHtml(objectId,imgSrc,id)
{
    //var idNum = $(objectId).attr('idnum');
    var idNum=$("#fileBoxUI li").length;
    $('#view_box ul li').hide();
    $('#view_box ul li').removeClass("hover_t");
    $('#fileBoxUI li').removeClass("hover");

    //创建大图
    var libig = '<li pid="'+ id +'" id="big_'+idNum+'" class="hover_t"> \
                        <div class="viewThumb"><img  src="'+imgSrc+'"></div> \
                      </li>';

    //创建大图
    var lismall = '<li pid="'+ id +'" id="small_'+idNum+'" class="diyUploadHover hover"> \
                      <div class="viewThumb"><img id="small_'+idNum+'_img" src="'+imgSrc+'"></div> \
                      <div class="diyCancel"></div> \
                   </li>';

    //将大小图写进对应html
    $('#view_box ul').append( libig );
    $('#fileBoxUI').append( lismall );
    //图片数加1
    $(objectId).attr('idnum',parseInt(parseInt(idNum)+1));
 
    
    //图片重新排序定位到最新添加那张图片
    var imgLength = $('#fileBoxUI li').length;
    if(imgLength>3)
    {
        var s = ($('#fileBoxUI li').length-3);
        $('.fileBoxUl li').hide();
        for(var ll =s; ll<parseInt($('#fileBoxUI li').length);ll++)
        {
            $('.fileBoxUl li').eq(ll).show();
        }
        return false;
    }

    //只绑定一次
    if(parseInt(idNum)==0)
    {
        bindClick();
    }
}

function chekIsShow()
{
    var is_show = '';
    for(var i=0;i<$('#fileBoxUI li').length;i++)
    {
        if(!$('.fileBoxUl li').eq(i).is(':hidden'))
        {
            if(is_show=='')
            {
                is_show += i;
            }
            else
            {
                is_show += '_'+i;
            }
        }
    }

    return is_show;
}


function bindClick()
{
    //删除图片
    $(".diyCancel").live("click", function()
    {
       var diy_cancel = $(this);
       var index_tab = $("#fileBoxUI .diyCancel").index(diy_cancel);
       var fbuili = $('#fileBoxUI li').eq(index_tab);
       //获取删除图片的src
       var li_h = $(fbuili).attr('id');
       var src = $('#'+li_h+'_img').attr('src');
       //传递参数  返回参数为json格式
       var postData = {'filePath':src};
       var url=webroot+'/bUpload/f_json/delete.shtml';
       $.post(url,postData,function(data)
       {
            var isShow = chekIsShow();

            $("#view_box ul li").eq(index_tab).remove();
            $(fbuili).remove();
            
            var pid = $(fbuili).attr("pid") + ",";
            
            var fileids = $('#hosImages').val();
            if(fileids.charAt(fileids.length-1) != ","){
         	   fileids+=(",");
            }
            fileids = fileids.replace(pid, "");
            if(fileids.charAt(fileids.length-1) == ","){
            	fileids=fileids.substring(0, fileids.length-1) ;
            }
            $('#hosImages').val(fileids);

            var newShow= isShow.split("_");
            for(var j=0;j<3;j++)
            {
                if($(".fileBoxUl li").eq(newShow[j]).html()!='')
                {
                    $(".fileBoxUl li").eq(newShow[j]).show();
                }
            }

            $('#view_box ul li').show();
            $("#fileBoxUI li").removeClass("hover");
            $("#fileBoxUI li").eq(newShow[0]).addClass('hover');

            return false;
       },'json');
    });

    //图片切换事件只绑定一次
    $('.fileBoxUl li').live('click',function()
    {
        $('#view_box ul li').hide();
        $('#view_box ul li').removeClass("hover_t");
        var idSplitStr = this.id.split('_');
        $('#big_'+idSplitStr[1]).show();
        $('#big_'+idSplitStr[1]).addClass("hover_t");
		$('.fileBoxUl li').removeClass("hover");
		$(this).addClass("hover");
		
    });

    //按钮高亮
    $(".parentFileBox span").hover(function(){
        $(".parentFileBox span").removeClass("hover");
        $(this).addClass("hover");
    });


    //点击向右按钮
    $('.next').bind('click',function()
    {
        var isShow = chekIsShow();
        var newShow= isShow.split("_");

        var start = parseInt(parseInt(newShow[0])+1);
        var end = parseInt(start+3);

        if(end>$('#fileBoxUI li').length)
        {
            return false;
        }

        $(".fileBoxUl li").hide();

        for(var j=start;j<end;j++)
        {
            $(".fileBoxUl li").eq(j).show();
        }
    });

    //点击向左按钮
    $('.prev').bind('click',function()
    {
        var isShow = chekIsShow();
        var newShow= isShow.split("_");

        if(parseInt(newShow[0])==0)
        {
          return false;
        }
        $(".fileBoxUl li").hide();
        var start = parseInt(parseInt(newShow[0])-1);
        var end = parseInt(start+3);

        for(var j=start;j<end;j++)
        {
            $(".fileBoxUl li").eq(j).show();
        }
    });
    

    //向左移动 
	 $('.l_mo').bind('click',function()
	 {
		 //<![CDATA[
         var $li_h = $('.fileBoxUl').find(".hover");    //  获取<ul>高亮li节点
         var li_h_index = $('.diyUploadHover').index($li_h);
         var $li_p = $li_h.prev("li");    //  获取<ul>高亮li前一节点

         $li_h.insertBefore($li_p);    //移动节点
		 var $b_li_h = $('#view_box ul').find(".hover_t");    //  获取<ul>高亮li节点
         var $b_li_p = $b_li_h.prev("li");    //  获取<ul>高亮li前一节点
         $b_li_h.insertBefore($b_li_p);    //移动节点
         //]]>

         if(0 < li_h_index){
        	 var fileids = $('#hosImages').val().split(",");
        	 var t = fileids[li_h_index];
        	 fileids[li_h_index] = fileids[li_h_index-1];
             fileids[li_h_index-1] = t;
             $('#hosImages').val(fileids.join(","));
         }
         var isShow = chekIsShow();
         var newShow= isShow.split("_");

         if(parseInt(newShow[0])==0)
         {
             return false;
         }
         $(".fileBoxUl li").hide();
         var start = parseInt(parseInt(newShow[0])-1);
         var end = parseInt(start+3);

         for(var j=start;j<end;j++)
         {
             $(".fileBoxUl li").eq(j).show();
         }
	 });
	  //向右移动 
	 $('.r_mo').bind('click',function()
	 {
		 //<![CDATA[
         var $li_h = $('.fileBoxUl').find(".hover");    //  获取<ul>高亮li节点
         var li_h_index = $('.diyUploadHover').index($li_h);
         var $li_n = $li_h.next("li");    //  获取<ul>高亮li后一节点点
         $li_n.insertBefore($li_h);    //移动节点
		 
		 var $b_li_h = $('#view_box ul').find(".hover_t");    //  获取<ul>高亮li节点
         var $b_li_n = $b_li_h.next("li");    //  获取<ul>高亮li前一节点
         $b_li_n.insertBefore($b_li_h);    //移动节点
  //]]>
         
         var fileids = $('#hosImages').val().split(",");
         if(fileids.length > li_h_index+1){
        	 var t = fileids[li_h_index];
        	 fileids[li_h_index] = fileids[li_h_index+1];
	         fileids[li_h_index+1] = t;
	         $('#hosImages').val(fileids.join(","));
         }
         var isShow = chekIsShow();
         var newShow= isShow.split("_");

         var start = parseInt(parseInt(newShow[0])+1);
         var end = parseInt(start+3);

         if(end>$('#fileBoxUI li').length)
         {
             return false;
         }

         $(".fileBoxUl li").hide();

         for(var j=start;j<end;j++)
         {
             $(".fileBoxUl li").eq(j).show();
         }
	 });
	
    return true;
}

$(function()
{
	//初始化绑定事件
	bindClick();
});