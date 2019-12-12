var page = 1;
apiready = function(){
	if(api.pageParam.type=='参加考试'){
		getEduExamList('');
		openPullRefresh("exec()");//下拉刷新
	    evenScrolltobottom("getEduExamList('')");//上拉加载数据
	}else if(api.pageParam.type=='学习实况'){
		getEduNotesList('');
		openPullRefresh("exec()");//下拉刷新
	    evenScrolltobottom("getEduNotesList('')");//上拉加载数据
	
	}else{
		if(api.pageParam.type==21){
			getEduMterialVideo('');//获取视频方法
			openPullRefresh("exec()");//下拉刷新
	    	evenScrolltobottom("getEduMterialVideo('')");//上拉加载数据
		}else{	
			getEduMterialArticle(''); //获取文章方法
			openPullRefresh("exec()");//下拉刷新
		    evenScrolltobottom("getEduMterialArticle('')");//上拉加载数据
	    }
	}
	
}


//获取视频接口
function getEduMterialVideo(pull){
	showProgress();
	if(pull == "pull"){
		$('#list').html('');
		page = 1;
	}
//	alert(api.pageParam.id);
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		topic_id:api.pageParam.id,//专题id
				type:21,//11文章21视频
				page:page,//条数
				pagesize:10,//页数
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			//添加专题视频
    			if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
						$('#list').append(
							'<div class="bg-color-white w-170em b-s mr-10em pl-6em pr-6em pt-6em mb-12em bor-ra-7 pull-left" onclick="openLearnInfo(\'edu_learn_videoInfo_header\','+ret.data[i].material_id+')">'+
								'<div class="w-100b h-88em po-re">'+
									'<img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].material_thumb!=null)?localStorage.url+ret.data[i].material_thumb:"../../../statics/images/images_edu/edu_special_video1.png")+'" />'+
									'<div class="w-100b h-100b bg-color-rgba-0003 po-ab top-0 bor-ra-7">'+
										'<img class="w-50em h-50em po-ab top-50b left-50b ml-25mem mt-25mem" src="../../../statics/images/images_edu/edu_play.png" alt="" />'+
									'</div>'+
								'</div>'+
								'<div class="clearfix">'+
//									'<div class="di-ib color-88 f-10em pr-10em"><i class="iconfont f-10em">&#xe87c;</i><span></span>'+ret.data[i].read_num+'</div>'+
									'<div class="di-ib color-88 f-10em ml-60em"><i class="iconfont f-10em">&#xe784;</i><span></span>'+ret.data[i].material_duration+'m</div>'+
								'</div>'+
								'<div class="clearfix mt-5em">'+
									'<div class="f-14em pull-left">'+InterceptField(ret.data[i].material_title,'无标题',8)+'</div>'+
									'<u class="f-11em color-88 pl-5em pull-right">详情</u>'+
								'</div>'+
								'<div class="color-88 f-10em mt-5em pb-10em">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
							'</div>'
							
						)
						
					}
    			}
				page++;
				api.hideProgress();//隐藏进度提示框
    		}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无视频</div>'
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
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


//获取文章接口
function getEduMterialArticle(pull){
	showProgress();
	if(pull == "pull"){
		$('#list').html('');
		page = 1;
	}
//	alert(api.pageParam.id);
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		topic_id:api.pageParam.id,//专题id
				type:11,//11文章21视频
				page:page,//条数
				pagesize:9,//页数
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
				//添加专题课件
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
						$('#list').append(
							'<div class="w-109em mr-10em mb-5em pull-left" onclick="openLearnInfo(\'edu_learn_info_header\','+ret.data[i].material_id+')">'+
								'<div class="bg-color-white w-109em b-s pl-6em pr-6em bor-ra-7 mb-5em">'+
									'<div class="w-100b h-142em pt-6em pb-6em"><img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].material_thumb!=null)?localStorage.url+ret.data[i].material_thumb:"../../../statics/images/images_edu/edu_special_dow1.png")+'" /></div>'+
								'</div>'+
								'<div class="f-12em text-align w-100b">'+((ret.data[i].material_title).substring(0,8))+'</div>'+
								'<div class="color-88 f-10em mt-5em pb-5em text-align">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
							'</div>'
							
						)
						
					}
				}
				page++;
				api.hideProgress();//隐藏进度提示框
    		}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无文章</div>'
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
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

////获取专题学习学习实况列表
//function get_edu_notes_list(pull){
//	showProgress();
//	if(pull == "pull"){
//		$('#list').html('');
//		page = 1;
//	}
//	alert(api.pageParam.id);
//	var url = localStorage.url+"/index.php/Api/Edunotes/get_edu_notes_list";
//	api.ajax({
//		url:url,
//	    method: 'post',
//	    timeout: 100,
//	    data: {//传输参数
//	    	values: { 
//	    		communist_no:localStorage.user_id,
////	    		topic_id:api.pageParam.id,//专题id
////	    		notes_type:0,//学习笔记类型
//				page:page,//条数
//				pagesize:10,//页数
//	        }
//	    }
//  },function(ret,err){
//  	if(ret){
//  		if(ret.status==1){
//	    		for(var i=0;i<ret.notes_list.length;i++){
//					$('#list').append(
//						'<div class="bg-color-white w-109em b-s mr-10em pl-6em pr-6em mb-12em bor-ra-7 pull-left" onclick="openScene_infowin(\'edu_special_twostudies_scene_info_header\','+ret.notes_list[i].notes_id+')">'+
//							'<div class="w-100b h-69em pt-6em"><img class="w-100b h-100b bor-ra-4" src="'+((ret.notes_list[i].notes_thumb!=null)?localStorage.url+ret.notes_list[i].notes_thumb:"../../../statics/images/images_edu/edu_special_learn1.png")+'" /></div>'+
//							'<div class="f-11em pb-10em pt-5em">'+((removeHTMLTag(ret.notes_list[i].notes_content)).substring(0,14))+'</div>'+
//						'</div>'
//					)
//				}
//			
//				page++;
//				api.hideProgress();//隐藏进度提示框
//				
//  		}else{
//  			$("#list #more").remove();
//				$("#list").append(
//					'<div class="aui-user-view-cell aui-text-center" id="more">没有更多数据</div>'
//				);	
//  			api.hideProgress();//隐藏进度提示框
//	    		/**无网络提示 */
//		    	api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
//  		}
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}

//获取专题学习笔记
function getEduNotesList(pull){
	showProgress();
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_list";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		communist_no:localStorage.user_id,//当前登录人编号
	           // topic_id:api.pageParam.id,//专题类型id
	            page:page,
				pagesize:10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
		    		for(var i=0;i<ret.data.length;i++){
						$('#list').append(
						'<li class="clearfix w-100b mt-10em border-3em-de pb-10em va-jz" onclick="openScene_infowin(\'edu_special_twostudies_scene_info_header\','+ret.data[i].notes_id+')">'+
						'<div class="pull-left w-110em h-82em over-h mr-12em"><img class="w-110em h-82em over-h bor-ra-4" src="'+((ret.data[i].notes_thumb!=null)?localStorage.url+ret.data[i].notes_thumb:"../../../statics/images/images_edu/edu_special_learn1.png")+'" /></div>'+
						'<div class="pull-left w-65b">'+
						'<div class="f-16em color-21">'+(InterceptField(ret.data[i].notes_title,'无',15))+'</div>'+
						'<div class="clearfix mt-10em">'+
						'<div class="pull-left f-11em color-a4">'+(InterceptField(ret.data[i].add_staff,'无',10))+'</div>'+
						'<div class="pull-right f-11em color-a4">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
						'</div>'+
						'</div>'+
						'</li>'
						
						
						
//							'<div class="bg-color-white b-s mr-10em pl-6em pr-6em mb-12em bor-ra-7 mt-10em" onclick="openScene_infowin(\'edu_special_twostudies_scene_info_header\','+ret.data[i].notes_id+')">'+
//								'<div class="f-11em pb-10em pt-10em">'+(InterceptField(ret.data[i].notes_title,'无',15))+'</div>'+
//							'</div>'
						)
					}
				}
				page++;
				api.hideProgress();//隐藏进度提示框
				
    		}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无学习实况</div>'
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
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取专题考试内容
function getEduExamList(pull){
	showProgress();
	if(pull == "pull"){
		$('#list').html('');
		page = 1;
	}
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_exam_list";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		 communist_no:localStorage.user_id,
	             topic_id:api.pageParam.id,
	             is_exam:1,
	             page:page,//条数
				 pagesize:10,//页数
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
    				for(var i=0;i<ret.data.length;i++){
    					$('#list').append(
	    					'<div class="bg-color-white w-100b b-s mr-10em pl-6em pr-6em mb-12em bor-ra-7 pt-6em pb-6em clearfix" onclick="openExam_infowin(\'edu_exam_info_header\','+ret.data[i].exam_id+')">'+
								'<div class="w-160em h-85em pull-left"><img class="w-100b h-100b bor-ra-4" src="'+((ret.data[i].exam_thumb!=null)?localStorage.url+ret.data[i].exam_thumb:"../../../statics/images/images_edu/edu_special_video1.png")+'"/>'+
								'</div>'+
								'<div class="pull-left w-170em pl-10em">'+
									'<div class="clearfix">'+
										'<div class="f-12em">'+ret.data[i].exam_title+'</div>'+
										'<div class="di-ib color-88"><i class="iconfont f-12em">&#xe789;</i><span class="f-12em di-ib pl-5em">'+ret.data[i].exam_date+'</span></div></br>'+
										'<div class="di-ib color-88"><i class="iconfont f-12em">&#xe7ba;</i><span class="f-12em di-ib pl-5em">'+ret.data[i].exam_integral+'积分'+'</span></div>'+
									'</div>'+
								'</div>'+
							'</div>'
	    				)
    				}	
    			}
    			page++;
    			api.hideProgress();//隐藏进度提示框
    		}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无考试内容</div>'
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
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开学习实况页面
function openScene_infowin(winName,id){
	api.openWin({
		name: winName,
		url: 'header/' + winName + '.html',
		pageParam:{
			id:id,
		}
	})
}

//打开文章与视频详情
function openLearnInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: '../edu_learn/header/'+winName+'.html',
	    pageParam:{
	    	type:type
	    }
    });
}

//打开考试详情页面
function openExam_infowin(winName,type){
	api.openWin({
		name: winName,
		url: '../edu_exam/header/' + winName + '.html',
		pageParam:{
			type:type,
		}
	})
}

//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}



