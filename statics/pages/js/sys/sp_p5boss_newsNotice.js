apiready = function () {
	var i=0*1;
    api.parseTapmode();
    if(localStorage.voice!="true"){
    	$("#voice").attr("checked",false);
    	i++
    }
    if(localStorage.shock!="true"){
    	$("#shock").attr("checked",false);
    	i++
    }
    if(localStorage.news!="true"){
    	$("#news_checkbox").attr("checked",false);
    	$("#news").html("已关闭")
    }
    if(i==2){
    	$("#v-s-news").html("已关闭");
    }
}

//打开新页面
function openNewWin(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html'
    });
}

//设置方法
function set(obj,id){
	if($(obj).is(':checked')==true){
		//打开显示信息详情
		if(id=='news'){
			localStorage.news=true;
			$("#news").html("已开启")
		}else{
			if(id=='voice'){
				localStorage.voice=true;
			}else{
				localStorage.shock=true;
			}
			$("#v-s-news").html("已开启")
		}
	}
	else{
		//关闭显示信息详情
		if(id=='news'){
			localStorage.news=false;
			$("#news").html("已关闭")
		}
		else{
			if(id=='voice'){
				localStorage.voice=false;
				if($("#shock").is(':checked')==false){
					localStorage.shock=false;
					$("#v-s-news").html("已关闭")
				}
			}else{
				localStorage.shock=false;
				if($("#voice").is(':checked')==false){
					localStorage.voice=false;
					$("#v-s-news").html("已关闭")
				}
			}
		}
	}
}