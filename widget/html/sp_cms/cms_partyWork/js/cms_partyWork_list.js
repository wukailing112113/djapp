apiready = function(){
	getCmsArticleList1();
	getCmsArticleList();//调用（通知公告接口）
	getCmsArticleList3();
	getCmsArticleList4();
	getCmsArticleList5();
	getCmsArticleList6();
	getCmsArticleList7();
	getCmsArticleList8();
	getCmsArticleList9();
	getCmsArticleList10();
	getCmsArticleList11();
	getCmsArticleList12();

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
	            //"cat_id":api.pageParam.type,
	            "cat_id":30,
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
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em ">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
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
	            "cat_id":36,
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
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em ">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4  f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
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
//党建论坛
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
	            "cat_id":37,
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
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em ">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
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
//共产党风采
function getCmsArticleList4(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":38,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list44').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em ">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list44').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list4 #more").remove();
    			 	$("#title4").hide(); 
					$("#list4").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list4 #more").remove();
					$("#list4").append(
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
//先锋风采
function getCmsArticleList5(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":39,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list5').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em ">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list5').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list5 #more").remove();
    			 	$("#title5").hide();   			 	
					$("#list5").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list5 #more").remove();
					$("#list5").append(
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
//党务工作风采
function getCmsArticleList6(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":40,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list6').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list6').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list6 #more").remove();
    			 	$("#title6").hide(); 
					$("#list6").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list6 #more").remove();
					$("#list6").append(
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
//红色文艺
function getCmsArticleList7(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":41,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list7').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list7').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list7 #more").remove();
    			 	$("#title7").hide(); 
					$("#list7").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list7 #more").remove();
					$("#list7").append(
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
//党纪党规
function getCmsArticleList8(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":42,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list8').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list8').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list8 #more").remove();
    			 	$("#title8").hide(); 
					$("#list8").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list8 #more").remove();
					$("#list8").append(
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
//精选热文
function getCmsArticleList9(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":44,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list9').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list9').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list9 #more").remove();
    			 	$("#title9").hide(); 
					$("#list9").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list9 #more").remove();
					$("#list9").append(
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
//经典回顾
function getCmsArticleList10(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":45,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list10').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list10').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list10 #more").remove();
    			 	$("#title10").hide(); 
					$("#list10").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list10 #more").remove();
					$("#list10").append(
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
//党员声音
function getCmsArticleList11(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":46,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list11').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list11').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list11 #more").remove();
    			 	$("#title11").hide(); 
					$("#list11").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list11 #more").remove();
					$("#list11").append(
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
//新闻快讯
function getCmsArticleList12(){
	showProgress();//进度提示框
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            //"cat_id":api.pageParam.type,
	            "cat_id":47,
	            "page":page,
				"pagesize":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list12').append(
		    				'<li class="mb-12em over-h bb-3em-e6 pb-10em" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-120em h-90em">'+
									'<img class=" w-120em h-90em bor-ra-3" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):("../../../../statics/public/aui2/img/pic-list.png"))+'>'+
								'</div>'+
								'<div class="pull-left over-h w-230em ml-8em">'+									
				                    '<div class="pull-left w-216em">'+
				                        '<div class="f-16em color-33 h-72em f-w">'+InterceptField(ret.data[i].article_title,'无',25)+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
	
				                    '</div>'+
				               '</div>'+
							'</li>'
		    			)
		    			$('#list12').fadeIn(1000);
		    		}
	    		}
	    		api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list12 #more").remove();
    			 	$("#title12").hide(); 
					$("#list12").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more"></div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list12 #more").remove();
					$("#list12").append(
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









