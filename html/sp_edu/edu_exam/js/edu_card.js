apiready = function () {

}


//打开个性化定制进度条
function openExc_edu(){
	api.execScript({
    name: 'bd_index',
    frameName: 'partyorg',
    script: 'mask_back();'
	});
	api.closeWin();
   
}



//关闭遮罩层
$(".mask_close").click(function(){
	api.closeWin({});
});

$("#list1 li").click(function(){
	$(this).addClass("active");
	$("#list1 li").not($(this)).removeClass("active");
	
});
$("#list2 li").click(function(){
	$(this).addClass("active");
	$("#list2 li").not($(this)).removeClass("active");
	
});
$("#list3 li").click(function(){
	if($(this).hasClass("active")){
		$(this).removeClass("active");
	}else{
		$(this).addClass("active");
	}
	
});