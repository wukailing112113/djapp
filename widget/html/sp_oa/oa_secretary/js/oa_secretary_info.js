apiready = function () {
	getCmsArticleInfo(); // 获取详情的方法
}


//获取详情-----------------------------------------------------------------
function getCmsArticleInfo(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_info";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				article_id : api.pageParam.id
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				$("#article_title").text(ret.data.article_title);  //标题			
				$("#add_communist").text(clearNull(ret.data.add_staff,'无'));   //发布人
				$("#article_content").html(ret.data.article_content); // 内容
				$("#add_time").html(ret.data.add_time);  //时间
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}




//刷新页面  ---------------------------------------------------------
function exec(){
	location.reload();
}


//打开详情
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	'type': type,
	    }
    });
}

//打开纪实
function openReport(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
				
	    }
    });
}