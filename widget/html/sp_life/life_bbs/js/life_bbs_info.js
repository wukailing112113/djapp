apiready=function(){
	getBbsPostInfo();//调用（获取村务论坛帖子详情接口）
}
var replyToComment;

//获取村务论坛帖子详情接口------------------------------------------------------------
function getBbsPostInfo(){
	var url = localStorage.url+"/index.php/Api/Life/get_bbs_post_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "post_id":api.pageParam.id,//帖子编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#post_theme').html('主题：'+clearNull(ret.data.post_info.post_theme,'无主题'));	//帖子主题
    			$('#post_content').html(clearNull(ret.data.post_info.post_content,'无内容'));	//帖子内容
    			$('#communist_name').html(clearNull(ret.data.post_info.communist_name,'无'));	//发帖人
    			$('#add_time').html(clearNull(ret.data.post_info.add_time,'0'));	//发帖时间
    			$('#img_url').attr('src',((ret.data.post_info.img_url)?(localStorage.url+ret.data.post_info.img_url):("../../../statics/images/images_life/life_recommend_bg.jpg")));	//展示图片
	    		if(ret.data.post_info.is_collect){
	    			if(ret.data.post_info.is_collect==0){		
	    			//未收藏 0
	    				$('#collection').html('&#xe881;').css('color','#dfdfdf').attr('collection',ret.data.post_info.is_collect);
	    			}else{							
	    			//已收藏 1
	    				$('#collection').html('&#xe7f4;').css('color','#ff3032').attr('collection',ret.data.post_info.is_collect);
	    			}
	    		}
	    	
	    		if(ret.data.post_info.is_fav){
	    		
	    			if(ret.data.post_info.is_fav==0){	//未点赞
						$('#like').html('&#xe87f;').css('color','#dfdfdf').attr('like',ret.data.post_info.is_fav).next().html(ret.data.post_info.fav_num);
					}else{	
						$('#like').html('&#xe87e;').css('color','red').attr('like',ret.data.post_info.is_fav).next().html(ret.data.post_info.fav_num);
					}
				}
				
				if(ret.data.comment_list&&ret.data.comment_list.length>0){
	    			for(var i=0;i<ret.data.comment_list.length;i++){//回复展示
	    				$('#list').prepend(
		    				'<div class="p-12em bb-1-df">'+
								'<div class="over-h po-re">'+
									'<img class="po-ab w-22em h-22em left-0 top-0 bor-ra-100b" src="'+((ret.data.comment_list[i].comment_avatar)?(localStorage.url+ret.data.comment_list[i].comment_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
									'<div class="pl-40em">'+
										'<p class="f-14em lh-15em color-ffba66 h-15em"><span class="pull-left w-80em">'+clearNull(ret.data.comment_list[i].comment_name,'无')+'</span><span class="pull-left color-99 f-10em">'+clearNull(ret.data.comment_list[i].comment_time,'0')+'</span></p>'+
										'<p class="f-10em lh-15em color-b3">'+clearNull(ret.data.comment_list[i].party_name,'无')+'</p>'+
									'</div>'+
									'<p class="po-ab top-0 right-0 f-10em color-b3">'+
										'<span replyToComment='+clearNull(ret.data.comment_list[i].comment_id,'')+' class="pr-8em ReplyToComment" onclick="replyToComment(this)"><i class="iconfont f-16em color-df">&#xe732;</i>回复</span>'+
									'</p>'+
								'</div>'+
								'<p class="f-16em lh-20em color-33 pl-40em pt-15em pr-35em po-re"><b>'+clearNull(ret.data.comment_list[i].comment_content,'无')+'</b></p>'+
							'</div>'
						)
	    			}
	    		}
    			$('#comment_num').html(clearNull(ret.data.post_info.comment_num,'0'));	//评论数量
			}
			else{
				api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//发送回复----------------------------------------------------------------------------------------------------
function send(type,pid){
	var url = localStorage.url+"/index.php/Api/Life/set_bbs_post_comment";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "comment_content":$('#commentInput').val(),//评论内容
	            "comment_type":type,//类型 0评论 1对评论的回复
	            "comment_pid":pid,//评论的pid
	            "post_id":api.pageParam.id,//帖子的id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#commentInput').val('');
    			location.reload();
			}
			else{
				api.toast({msg: '评论失败...',duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//回复评论效果--------------------------------------------------------------------------------------------------
	//回复帖子评论
function replyToComment(This){
	$('#commentInput').focus().addClass('w-293em');
	$('#replyNum').addClass('di-n');
	$('#send').removeClass('di-n');
	replyToComment = $(This).attr('replyToComment');
}
	//回复帖子
$('#commentInput').focus(function(){
	$('#commentInput').addClass('w-293em');
	$('#replyNum').addClass('di-n');
	$('#send').removeClass('di-n');
	replyToComment = '';
})
	//失去焦点 或者发送
$('#commentInput').blur(function(){
	if($('#commentInput').val()){
		$('#send').find('span').click(function(){
//			alert('发送');
			send(1,replyToComment);
		});
	}else{
		$('#commentInput').removeClass('w-293em');
		$('#replyNum').removeClass('di-n');
		$('#send').addClass('di-n');
	}
})


//收藏效果-----------------------------------------------------------------------------------------------------
function collection(){
	if($('#collection').attr('collection')==0){	//未收藏
//		$('#collection').html('&#xe7f4;').css('color','#ff3032').attr('collection',1);
		setBbsPostFav(2);//调用收藏接口
	}else{										//已收藏
//		$('#collection').html('&#xe881;').css('color','#dfdfdf').attr('collection',0);
		delBbsPostFav(2);//调用收藏接口
//		alert('已收藏');
	}
}

//点赞效果-----------------------------------------------------------------------------------------------------
function like(){
//未点赞  
	if($('#like').attr('like')==0){				
		//$('#like').css('color','#ff3032').html('&#xe87e;').attr('like',1).next().html($('#like').next().html()-(-1));
		setBbsPostFav(1);//调用点赞接口
	}else{										//已点赞
//		$('#like').css('color','#dfdfdf').html('&#xe87f;').attr('like',0).next().html($('#like').next().html()-(1));
		delBbsPostFav(1);//调用点赞接口
//		alert('已点赞');
	}
}

//收藏与点赞接口-----------------------------------------------------------------------------------------------------
function setBbsPostFav(type){
	var url = localStorage.url+"/index.php/Api/Life/set_bbs_post_fav";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "fav_type":type,//1点赞2收藏
	            "post_id":api.pageParam.id,//帖子的id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		   //点赞
    			if(type==1){
    				$('#like').html('&#xe87e;').css('color','#ff3032').attr('like',1).next().html($('#like').next().html()-(-1));
    				alert("点赞成功");
    			}else{
    				alert("收藏成功");
    				$('#collection').html('&#xe7f4;').css('color','#ff3032').attr('collection',1);
    			}
			}
			else{
				if(type==1){
					api.toast({msg: '点赞失败...',duration:3000,location: 'top'});
				}else{
					api.toast({msg: '收藏失败...',duration:3000,location: 'top'});
				}
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//取消收藏与取消点赞接口-----------------------------------------------------------------------------------------------------
function delBbsPostFav(type){
	var url = localStorage.url+"/index.php/Api/Life/del_bbs_post_fav";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "fav_type":type,//1点赞2收藏
	            "post_id":api.pageParam.id,//帖子的id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		//取消点赞
    			if(type==1){
    				$('#like').css('color','#dfdfdf').html('&#xe87f;').attr('like',0).next().html($('#like').next().html()-(1));
    				alert("取消点赞");
    			}else{
    				$('#collection').html('&#xe881;').css('color','#dfdfdf').attr('collection',0);
    				alert("取消收藏");
    			}
			}
			else{
				if(type==1){
					api.toast({msg: '取消点赞失败...',duration:3000,location: 'top'});
				}else{
					api.toast({msg: '取消收藏失败...',duration:3000,location: 'top'});
				}
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//分享-----------------------------------------------------------------------------------
//function shareIt(){
//	var sharedModule = api.require('shareAction');
//	sharedModule.share({ text: ($('#post_theme').html()+';内容:'+$('#post_content').html()), type: 'text' });
//}
