apiready=function(){
	var regionNum = 0;
	getBbsPostCat();//调用（获取热门论坛列表）
	openPullRefresh('exec()');//下拉刷新
	evenScrolltobottom('toTop()');//上拉加载
	//alert(api.pageParam.type)
	
	
//	opt(regionNum);
}
var page = 1;
function toTop(){
	page++;
	getBbsPostList();
}

//获取热门论坛列表---------------------------------------------------------------------------
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
					getBbsPostList(api.pageParam.id);
								
					for(var i=0;i<ret.data.length;i++){
						if(i<7){
							$('#region').append(
								'<li class="pull-left ml-5em mr-5em mb-8em w-80em h-30em text-align color-75 f-14em lh-30em bg-color-f1 b-1-df bor-ra-4" onclick="opt(this,'+ret.data[i].cat_id+')">'+
									ret.data[i].cat_name+
								'</li>'
							)
							
						}else{
							$('#region').append(
								'<li class="pull-left ml-5em mr-5em mb-8em w-80em h-30em text-align color-75 f-14em lh-30em bg-color-f1 b-1-df bor-ra-4 more" onclick="openDynamic(\'life_bbs_dynamic_header\')">'+
									'更多<i class=""></i>'+
								'</li>'
							)
							return;
						}
					if(api.pageParam.id==1){
						$('#region li').eq(0).addClass('opt');
					}else if(api.pageParam.id==10){	
						$('#region li').eq(1).addClass('opt');
					
					}else if(api.pageParam.id==11){	
						$('#region li').eq(2).addClass('opt');
					
					}else if(api.pageParam.id==13){	
						$('#region li').eq(3).addClass('opt');
					
					}
					//$('#region li').eq(0).addClass('opt');
					$('.topNum').css('top',$('#region').parent('div').css('height'));
					}
					
				}
			}else{
			 	$("#region #more").remove();
				$("#region").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
				);	
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//获取热门帖子-----------------------------------------------------------------------------------------------------------------
function getBbsPostList(catId){
	var url = localStorage.url+"/index.php/Api/Life/get_bbs_post_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"page":page,//页数
				"pagesize":7,//每页数量
				"cat":catId//论坛类型
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
						$('#list').append(
							'<div class="mb-4em w-100b m-a pt-15em pl-10em pr-10em bg-color-whiter bor-ra-4" onclick="openInfo(\'life_bbs_info_header\','+ret.data[i].post_id+')">'+
								'<div class="bb-1-dashed-df over-h">'+
									'<img class="pull-left w-52em h-52em mr-10em mb-10em bor-ra-100b" src="'+((ret.data[i].img_url)?(localStorage.url+ret.data[i].img_url):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
									'<div class="pull-left over-h">'+
										'<p class="f-12em lh-18em color-33 f-w">'+InterceptField(ret.data[i].post_theme,'无标题',20)+'</p>'+
										'<p class="f-12em lh-20em color-88">'+InterceptField(ret.data[i].post_content,'无内容',40)+'</p>'+
									'</div>'+
								'</div>'+
								'<div class="over-h">'+
									'<div class="pull-right w-60b over-h pt-5em pb-10em">'+
										'<div class="pull-left w-33b f-12em lh-18em color-99"><i class="iconfont f-12em lh-18em">&#xe87c;</i><span class="pl-4em">'+clearNull(ret.data[i].visitor_volume,'0')+'</span></div>'+
										'<div class="pull-left w-33b f-12em lh-18em color-99"><i class="iconfont f-12em lh-18em">&#xe87e;</i><span class="pl-4em">'+clearNull(ret.data[i].fav_num,'0')+'</span></div>'+
										'<div class="pull-left w-33b f-12em lh-18em color-99"><i class="iconfont f-12em lh-18em">&#xe7de;</i><span class="pl-4em">'+clearNull(ret.data[i].comment_num,'0')+'</span></div>'+
									'</div>'+
								'</div>'+
							'</div>'
						)
					}
				}
			}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-20em" id="more">暂无帖子</div>'
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
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}


//$('#region li').click(function(){
//	regionNum = $(this).index();
//	if(regionNum==7){
//		 openDynamic('life_bbs_dynamic_header');
//	}else{
//		opt(regionNum);
//	}
//})

//论坛切换--------------------------------------------------------------------------
function opt(This,catId){
	$('#region li').removeClass('opt');
	$(This).addClass('opt');
	$('#list').html('');
	page=1;
	getBbsPostList(catId);
}

//打开dynamic----------------------------------------------------------------------
function openDynamic(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开info-------------------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id
	    }
    });
}

//页面刷新--------------------------------------------------------------------------
function exec(){
	location.reload();
}