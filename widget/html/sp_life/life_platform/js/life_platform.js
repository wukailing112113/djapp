apiready = function () {
 	openPullRefresh("exec()");//下拉刷新
	getConfig();//加载配置文件		
	hot_article();//热门文章接口
	getBbsPostCat();//调用（获取热门论坛列表）
}


//获取热门文章接口
function hot_article(){
	//showProgress();//进度提示框
	var url = localStorage.url+"/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cat_id":14,
	            "type":1,
	            "page":1,
				"pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){   	
    		if(ret.status==1){
    		
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('.swiper-wrapper').append(		    			
		    		'<div class="swiper-slide" onclick="openPartyWork(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+	
		    			'<div class="shyk mt-15em mb-15em">'+
			    			'<div class="clearfix mt-15em">'+
			    				'<div class="pull-left s_line mr-12em"></div>'+
			    				'<div class="pull-left f-13em color-21">'+InterceptField(ret.data[i].article_title,"无",9)+'</div>'+
			    			'</div>'+
			    			'<div>'+		    			
			    			'<img class="w-35em h-12em ml-15em mt-5em" src="../../../statics/images/images_life/hot.png">'+
			    			'</div>'+
			    			'<div class="color-9e f-12em ml-15em mt-10em">'+InterceptField(ret.data[i].article_content,"无内容",10)+'</div>'+
		    			
		    			'</div>'+
		    		'</div>'
		    		
		    			)
		    			//轮播js
					var mySwiper = new Swiper('.swiper-container',{
							slidesPerView : 'auto',
							 centeredSlides : true,
							watchSlidesProgress: true,
							pagination : '.swiper-pagination',
							paginationClickable: true,
							onProgress: function(swiper){
								
										      },
										
							 onSetTransition: function(swiper, speed) {
									for (var i = 0; i < swiper.slides.length; i++) {
											es = swiper.slides[i].style;
											es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
											}
										
									}
								  });
		    			
		    		}
	    		}
	    
//	    		api.hideProgress();//隐藏进度提示框
//	    		$(".ske").addClass('di-n');
			}else{
			
    		}
			
    	}else{
    	
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}













//刷新页面
function exec(){
	location.reload();
}


//打开精准扶贫
function openHelpwin(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_hr/hr_poorhelp/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开村务论坛
function openBbs(winName,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_life/life_bbs/header/'+winName+'.html',
	   pageParam:{
	    	id:id,	   	
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
//打开党务动态------------------------------------------------------------------
function openPartyWork(winName,article_id){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	id:article_id,
	    }
    });
}
function openPartyWork1(winName,type){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    }
    });
}
//打开三务公开
function openThreeservices(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_life/life_threeservices/header/'+winName+'.html'
    });
}

//打开O2O
function openProblem(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_life/life_problem/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开调查问卷
function openSurvey(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_life/life_survey/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开投票
	function openVote(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_vote/header/'+winName+'.html',
	    });
	}

//获取志愿者服务列表接口--------------------------------------------------------------------


//打开为你推荐详情-------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: '../life_volunteer/header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}

//村务论坛接口
function getBbsPostCat(){
	var url = localStorage.url+"/index.php/Api/Life/get_bbs_post_cat";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: {
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
				//	getBbsPostList(ret.data[0].cat_id);
					for(var i=0;i<ret.data.length;i++){
						if(i==0){
							$('#list1').append(
								'<div class="flex_item life_cw mt-10em pt-10em" onclick="openBbs(\'life_bbs_header\','+ret.data[i].cat_id+')">'+'<img class="w-20em h-17em m-a" src="../../../statics/images/images_life/life_icon.png">'+'<p class="w-100em color-21 f-12em pt-5em text-align mt-0em">'+ret.data[i].cat_name+'</p>'+'</div>'
							)
						}else if(i==1){
							$('#list1').append(
								'<div class="flex_item life_cw mt-10em pt-10em" onclick="openBbs(\'life_bbs_header\','+ret.data[i].cat_id+')">'+'<img class="w-20em h-17em m-a" src="../../../statics/images/images_life/life_icon1.png">'+'<p class="w-100em color-21 f-12em pt-5em text-align mt-0em">'+ret.data[i].cat_name+'</p>'+'</div>'
							)
						}else if(i==2){
							$('#list1').append(
								'<div class="flex_item life_cw mt-10em pt-10em" onclick="openBbs(\'life_bbs_header\','+ret.data[i].cat_id+')">'+'<img class="w-20em h-17em m-a" src="../../../statics/images/images_life/life_icon3.png">'+'<p class="w-100em color-21 f-12em pt-5em text-align mt-0em">'+ret.data[i].cat_name+'</p>'+'</div>'
							)
						}else{
						$('#list1').append(
								'<div class="flex_item life_cw mt-10em pt-10em" onclick="openBbs(\'life_bbs_header\','+ret.data[i].cat_id+')">'+'<img class="w-20em h-17em m-a" src="../../../statics/images/images_life/life_icon4.png">'+'<p class="w-100em color-21 f-12em pt-5em text-align mt-0em">'+ret.data[i].cat_name+'</p>'+'</div>'
							)
						
						}
						
						
					}
					
				}
			}else{
			 	
    		}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

			  
//打开调查问卷
	function openSurvey(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_survey/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
//打开投票
	function openVote(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_vote/header/'+winName+'.html',
	    });
	}
//打开留言建议
	function openMessage(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_message/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
//打开随手拍
	function openProblem(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_problem/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
//打开通讯录

function openPhone(){
	api.openSlidLayout({
		type:'left',
		slidPane:{
			name: 'com_phoneBook_right_header',
	        url: 'widget://html/sp_com/com_phonebook/header/com_phonebook_right_header.html',	        
		},
		fixedPane:{
			name: 'com_phonebook_left_header', 
		    url: 'widget://html/sp_com/com_phonebook/header/com_phonebook_left_header.html', 		   
		},
	}, function(ret, err) {
		
	});
}
//打开三务公开
	function openThreeservices(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_threeservices/header/'+winName+'.html'
	    });
	}
//打开扶贫政策更多列表面-----------------------------------------------------
function openList(winName,type){
	api.openWin({
        name: winName,
        url: '../../sp_hr/hr_poorhelp/header/'+winName+'.html',
        pageParam:{
        	type:type,
        }
    });
}