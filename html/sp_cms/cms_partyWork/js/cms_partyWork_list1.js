apiready = function(){
	getCmsArticleList('');
	openPullRefresh("exec()");//下拉刷新
	evenScrolltobottom('toTop()');//上拉加载


//	getCmsArticleList1();
//	getCmsArticleList();//调用（通知公告接口）
//	evenScrolltobottom('toTop()');//上拉加载
//	openPullRefresh('exec()');//下拉刷新
}
var page = 1;
function toTop(){
	page++;
	getCmsArticleList();
}

//文章栏目接口

//新闻动态
function getCmsArticleList(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cat_id":api.pageParam.type,
	            //"cat_id":30,
	            "page":page,
				"pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
		'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+
//									'<div class="pull-left w-6em h-12em mt-39em mr-8em">'+
//										'<img src="../../../statics/public/aui2/img/dl-icon.png">'+
//									'</div>'+
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-12 h-72em f-w">'+clearNull(ret.data[i].article_title,'无').substring(0,25)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+ret.data[i].add_staff+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
	    		$(".ske").addClass('di-n');
			}else{
			$(".ske").addClass('di-n');
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}





//办事流程
//function getCmsArticleList13(){
//	showProgress();//进度提示框
//	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
//	api.ajax({
//	    url:url,
//	    method: 'post',
//	    timeout: 100,
//	    data: {//传输参数
//	    	values: { 
//	            //"cat_id":api.pageParam.type,
//	            "cat_id":1401,
//	            "page":page,
//				"pagesize":10
//	        }
//	    }
//  },function(ret,err){
//  	if(ret){
//  		if(ret.status==1){
//  			if(ret.data&&ret.data.length>0){
//	    			for(var i=0;i<ret.data.length;i++){
//		    			$('#list').append(
//		    				'<li class="mb-12em over-h" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
//								'<div class="pull-left w-120em h-90em">'+
//									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
//								'</div>'+
//								'<div class="pull-left over-h w-230em ml-8em">'+
//									'<div class="pull-left w-6em h-12em mt-39em mr-8em">'+
//										'<img src="../../../statics/public/aui2/img/dl-icon.png">'+
//									'</div>'+
//				                    '<div class="pull-left w-216em mt-12em">'+
//				                        '<div class="f-16em color-33 f-w">'+clearNull(ret.data[i].article_title,'无').substring(0,25)+'</div>'+
//				                        '<div class="pull-left color-a4 f-14em pt-5em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
//	//			                        '<div class="pull-right color-a4 f-14em pt-5em">2188浏览</div>'+
//				                    '</div>'+
//				               '</div>'+
//							'</li>'
//		    			)
//		    		}
//	    		}
//	    		api.hideProgress();//隐藏进度提示框
//			}else{
//  			 if(page==1){
//  			 	$("#list #more").remove();
//					$("#list").append(
//						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
//					);	
//	    			api.hideProgress();//隐藏进度提示框
//  			 }else if(page>1){
//  			 	$("#list #more").remove();
//					$("#list").append(
//						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
//					);	
//	    			api.hideProgress();//隐藏进度提示框
//  			 }
//  			
//  			api.hideProgress();//隐藏进度提示框
//	    		/**无网络提示 */
////		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
//  		}
//			api.hideProgress();//隐藏进度提示框
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}


//服务窗口
//function getCmsArticleList14(){
//	showProgress();//进度提示框
//	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
//	api.ajax({
//	    url:url,
//	    method: 'post',
//	    timeout: 100,
//	    data: {//传输参数
//	    	values: { 
//	            //"cat_id":api.pageParam.type,
//	            "cat_id":1402,
//	            "page":page,
//				"pagesize":10
//	        }
//	    }
//  },function(ret,err){
//  	if(ret){
//  		if(ret.status==1){
//  			if(ret.data&&ret.data.length>0){
//	    			for(var i=0;i<ret.data.length;i++){
//		    			$('#list').append(
//		    				'<li class="mb-12em over-h" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
//								'<div class="pull-left w-120em h-90em">'+
//									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
//								'</div>'+
//								'<div class="pull-left over-h w-230em ml-8em">'+
//									'<div class="pull-left w-6em h-12em mt-39em mr-8em">'+
//										'<img src="../../../statics/public/aui2/img/dl-icon.png">'+
//									'</div>'+
//				                    '<div class="pull-left w-216em mt-12em">'+
//				                        '<div class="f-16em color-33 f-w">'+clearNull(ret.data[i].article_title,'无').substring(0,25)+'</div>'+
//				                        '<div class="pull-left color-a4 f-14em pt-5em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
//	//			                        '<div class="pull-right color-a4 f-14em pt-5em">2188浏览</div>'+
//				                    '</div>'+
//				               '</div>'+
//							'</li>'
//		    			)
//		    		}
//	    		}
//	    		api.hideProgress();//隐藏进度提示框
//			}else{
//  			 if(page==1){
//  			 	$("#list #more").remove();
//					$("#list").append(
//						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
//					);	
//	    			api.hideProgress();//隐藏进度提示框
//  			 }else if(page>1){
//  			 	$("#list #more").remove();
//					$("#list").append(
//						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
//					);	
//	    			api.hideProgress();//隐藏进度提示框
//  			 }
//  			
//  			api.hideProgress();//隐藏进度提示框
//	    		/**无网络提示 */
////		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
//  		}
//			api.hideProgress();//隐藏进度提示框
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}
//打开更多页面--------------------------------------------------------------
function openlearn_type_list(winName,type){
	api.openWin({
		name: winName,
		url: 'header/' + winName + '.html',
		pageParam:{
			id:api.pageParam.id,
			type:type,
		}
	})
}
//打开党务动态
function openPartyWork(winName,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}

//页面刷新
function exec(){
	location.reload();
}