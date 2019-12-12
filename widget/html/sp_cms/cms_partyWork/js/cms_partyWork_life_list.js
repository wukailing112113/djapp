apiready = function(){

getCmsArticleList();//调用（通知公告接口）
getCmsArticleList1();
getCmsArticleList3();	
	
	

	//evenScrolltobottom('toTop()');//上拉加载
	openPullRefresh('exec()');//下拉刷新
	$("section").fadeIn(1000);
}
var page = 1;
function toTop(){
	page++;
	getCmsArticleList();
}

//文章栏目接口

//办事流程
function getCmsArticleList(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":1401,
	            "page":page,
				"pagesize":3
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list2').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-70em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list2').fadeIn(1000);
		    			
		    		}
	    		}
	    		$(".ske").addClass('di-n');
	    		api.hideProgress();//隐藏进度提示框
			}else{
				$(".ske").addClass('di-n');
    			 if(page==1){
    			 	$("#list2 #more").remove();
    			 	$("#title1").hide();   
					$("#list2").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list2 #more").remove();
					$("#list2").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
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

//党建要闻
function getCmsArticleList1(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":1402,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list1').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-70em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list1').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list1 #more").remove();
    			 	$("#title2").hide();   
					$("#list1").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list1 #more").remove();
					$("#list1").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
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
//联系我们
function getCmsArticleList3(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":22,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list3').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-70em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list3').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list3 #more").remove();
    			 	$("#title3").hide(); 
					$("#list3").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list3 #more").remove();
					$("#list3").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
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









