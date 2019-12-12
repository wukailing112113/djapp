apiready=function(){
	getBdBannerList('bannerList',9,1);//获取banner
	getCmsArticleListPolicy();//调用获取精准扶贫文章列表（扶贫政策）接口
	getCmsArticleListDynamic();//调用获取精准扶贫文章列表（扶贫活动动态）接口
	getLifeHelpList();//调用（获取精准扶贫帮扶一对一列表）接口
}

//获取精准扶贫文章列表（扶贫政策）接口-----------------------------------------------------------------
function getCmsArticleListPolicy(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"cat_id":13,//精准扶贫政策
	    		"page":1,
	    		"pagesize":9
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
    				$('#policy').removeClass('di-n');
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#list1').append(
	    					'<li class="w-110em h-130em pull-left border-df b-r-4 box-s mb-5em mr-5em" onclick="openInfo(\'hr_poorhelp_info_header\','+ret.data[i].article_id+')">'+
								'<div class="w-100b h-105em bb-df pt-5em pb-5em"><img class="w-100b h-100b" src="'+((ret.data[i].article_thumb)?(localStorage.url+ret.data[i].article_thumb):("../../../statics/images/images_hr/hr_arr_1.png"))+'"/></div>'+
								'<div class="f-10em text-align w-100b lh-24em f-w">'+InterceptField(ret.data[i].article_title,'无',9)+'</div>'+
							'</li>'
	    				)
	    			}
	    		}
			}else{
				$("#list1 #more").remove();
				$("#list1").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无文章</div>'
				);	
    			api.hideProgress();//隐藏进度提示框
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取精准扶贫文章列表（扶贫活动动态）接口-----------------------------------------------------------------
function getCmsArticleListDynamic(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"cat_id":17,//精准扶贫动态
	    		"page":1,
	    		"pagesize":5
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
    				$('#dynamic').removeClass('di-n');
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#list2').append(
	    					'<div class="w-100b h-114em pt-12em pb-12em bb-df pl-12em pr-12em clearfix" onclick="openInfo(\'hr_poorhelp_info_header\','+ret.data[i].article_id+')">'+
								'<img class="w-113em h-90em pull-left" src="'+((ret.data[i].article_thumb)?(localStorage.url+ret.data[i].article_thumb):("../../../statics/images/images_edu/edu_special_learn1.png"))+'"/>'+
								'<div class="pull-left">'+
									'<div class="clearfix pl-5em w-233em">'+
										'<div class="f-16em pull-left">'+InterceptField(ret.data[i].article_title,'无',9)+'</div>'+
										'<div class="f-16em pull-right f-11em color-ff9776">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</div>'+
										'<div class="clearfix color-99 f-12em pt-10em lh-18em">'+
											InterceptField(ret.data[i].article_description,'无',36)+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'
	    				)
	    			}
	    		}
			}else{
				$("#list2 #more").remove();
				$("#list2").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无文章</div>'
				);	
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取精准扶贫帮扶一对一列表接口-----------------------------------------------------------------
function getLifeHelpList(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/get_life_help_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"page":1,
	    		"pagesize":5
	        }
	    }
    },function(ret,err){
    	if(ret){
 	//alert(JSON.stringify(ret));
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
    				$('#oneOnOne').removeClass('di-n');
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#list3').append(
	    					'<div class="w-100b h-75em pt-12em pb-10em bb-df pl-12em pr-12em clearfix" onclick="openInfo(\'hr_poorhelp_oto_info_header\','+ret.data[i].measures_id+')">'+
								'<div>'+
									'<div class="clearfix pl-5em">'+
										'<div class="f-16em pull-left">'+InterceptField(ret.data[i].title,'无',15)+'</div>'+
										'<div class="f-16em pull-right pr-12em color-ff9776">'+clearNull(ret.data[i].measures_help_time,'0').substring(0,10)+'</div>'+
										'<div class="clearfix color-99 f-12em pt-8em lh-18em">'+'帮扶人电话:'+InterceptField(ret.data[i].measures_phone,'无',36)+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'
	    				)
	    			}
	    		}
			}else{
				$("#list3 #more").remove();
				$("#list3").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无文章</div>'
				);	
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//扶贫政策滚动查看--------------------------------------------------
var listLeft = 0
$("#list1").css('width',51.75+'rem');
$("#list1").on("swipeleft",function(){
	listLeft=listLeft-(($(this).find('li').length+(listLeft-3)<3)?($(this).find('li').length+(listLeft-3)):(3));
	$(this).animate({
		'left':(listLeft*5.75)+0.6+'rem'
	},500);
});
$("#list1").on("swiperight",function(){
	listLeft=listLeft+((listLeft+3>=0)?(listLeft*(-1)):(3));
	$(this).animate({
		'left':(listLeft*5.75)+0.6+'rem'
	},500);
});


//打开详情面-----------------------------------------------------
function openInfo(winName,id){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	id:id,
        }
    });
}

//打开更多列表面-----------------------------------------------------
function openList(winName,type){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:type,
        }
    });
}