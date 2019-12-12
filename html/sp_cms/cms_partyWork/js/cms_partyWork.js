apiready = function () {
	getBdBannerList('bannerList',6,1);//获取banner
	getCmsArticleListOne();//调用(党务文章展示(工作通知)列表)
	getCmsArticleListTwo();//调用(党务文章展示（民生公示）列表)
}

//党务新闻通知图片------------------------------------------
//function apiAjax(){
//	var url = localStorage.url+"/index.php/Api/.../...";
//	api.ajax({
//		url:url,
//		method: 'post',
//		timeout: 100,
//		data: {//传输参数
//			values: { 
//				
//			}
//		}
//	},function(ret,err){
//		if(ret){
//			if(ret.status==1){
//				
//			}else{
//				api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
//			}
//		}else{
//			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//		}
//	});
//}

//党务文章展示(工作通知)列表------------------------------------------
function getCmsArticleListOne(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"cat_id":1408,
				"page":1,
				"pagesize":5
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					$('#list_1_box').removeClass('di-n');
					for(var i=0;i<ret.data.length;i++){
						$('#list_1').append(
							'<li class="over-h w-100b mb-14em" onclick="openInfo(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-110em h-90em p-0 mt-16em mr-12em">'+
							    	'<img class="w-100b h-100b bor-ra-3" src="'+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'">'+
							    '</div>'+
							    '<div class="pull-left w-228em p-0 mt-12em">'+
									'<div class="f-16em color-33 lh-24em f-w">'+InterceptField(ret.data[i].article_title,'无',20)+'</div>'+
							        '<div class="p-0 mt-5em f-14em lh-14em h-14em pb-15em color-a4">'+
							            '<span class="pull-left pr-8em color-99 br-1-df">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</span>'+
										'<span class="pull-left ml-8em color-99">刘国强</span>'+
							        '</div>'+
							    '</div>'+
							'</li>'
						)
					}
				}
			}else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				$("#list_1 #more").remove();
				$("#list_1").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
				);	
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//党务文章展示（民生公示）列表------------------------------------------
function getCmsArticleListTwo(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"cat_id":1407,
				"page":1,
				"pagesize":5
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					$('#list_2_box').removeClass('di-n');
					for(var i=0;i<ret.data.length;i++){
						$('#list_2').append(
							'<li class="over-h w-100b mb-14em" onclick="openInfo(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-110em h-90em p-0 mt-16em mr-12em">'+
							    	'<img class="w-100b h-100b bor-ra-3" src="'+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'">'+
							    '</div>'+
							    '<div class="pull-left w-228em p-0 mt-12em">'+
									'<div class="f-16em color-33 lh-24em f-w">'+InterceptField(ret.data[i].article_title,'无',20)+'</div>'+
							        '<div class="p-0 mt-5em f-14em lh-14em h-14em pb-15em color-a4">'+
							            '<span class="pull-left pr-8em color-99 br-1-df">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</span>'+
										'<span class="pull-left ml-8em color-99">刘国强</span>'+
							        '</div>'+
							    '</div>'+
							'</li>'
						)
					}
				}
			}else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				$("#list_2 #more").remove();
				$("#list_2").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
				);	
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//打开列表模块------------------------------------------------------------------
function openList(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	'type':type,
	    }
    });
}

//打开详情模块------------------------------------------------------------------
function openInfo(winName,id){/*winName:所打开的实际页面名*/
	api.openWin({/*api打开新页面对象*/
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{	/*对新页面传参*/
	   		id:id
	    }
    });
}

//新闻轮播------------------------------------------------------------------
//$('#notice').css('width',($('#notice').find('li').eq(0).width()+$('#notice').find('li').eq(1).width()+$('#notice').find('li').eq(2).width()+135))
//var noticeNum = 0;
//var noticeTimer = setInterval(function(){
//	$('#notice').css('left',noticeNum);
//	noticeNum--;
//	if((noticeNum*-1)>=$('#notice').width()){noticeNum=334}
//},18);