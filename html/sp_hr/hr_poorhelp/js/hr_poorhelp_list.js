apiready=function(){
	if(api.pageParam.type==0){
		getCmsArticleList('13');//调用获取精准扶贫文章列表（扶贫政策）接口
		evenScrolltobottom('getCmsArticleList(\'13\')');//上拉加载
	}else if(api.pageParam.type==1){
		getCmsArticleList('17');//调用获取精准扶贫文章列表（扶贫活动动态）接口
		evenScrolltobottom('getCmsArticleList(\'13\')');//上拉加载
	}else if(api.pageParam.type==2){
		getLifeHelpList();//调用（获取精准扶贫帮扶一对一列表接口）
		evenScrolltobottom('getLifeHelpList()');//上拉加载
	}
	openPullRefresh('exec()');//下拉刷新
}
var page = 1;

//获取精准扶贫文章列表接口-----------------------------------------------------------------
function getCmsArticleList(type){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"cat_id":type,
	    		"page":page,
	    		"pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#list').append(
	    					'<div class="w-100b h-114em pt-12em pb-12em bb-df pl-12em pr-12em clearfix" onclick="openInfo(\'hr_poorhelp_info_header\','+ret.data[i].article_id+')">'+
								'<img class="w-113em h-90em pull-left" src='+((ret.data[i].article_thumb)?(localStorage.url+ret.data[i].article_thumb):("../../../statics/images/images_hr/hr_arr_1.png"))+' />'+
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
    			page++;
    			api.hideProgress();//隐藏进度提示框
			}
			else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无文章</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">已经到底啦~</div>'
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
	    		"page":page,
	    		"pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#list').append(
	    					'<div class="w-100b h-80em pt-12em pb-10em bb-df pl-12em pr-12em clearfix" onclick="openInfo(\'hr_poorhelp_oto_info_header\','+ret.data[i].measures_id+')">'+
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
    			page++;
    			api.hideProgress();//隐藏进度提示框
			}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无列表</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">已经到底啦~</div>'
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

//打开详情页-------------------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	id:id,
        }
    });
}

//页面刷新-------------------------------------------------------------------------
function exec(){
	location.reload();
}