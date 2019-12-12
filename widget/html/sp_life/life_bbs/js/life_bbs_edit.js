apiready = function(){
	getBbsPostCat();//调用（获取村务论坛类型列表接口）
}

//获取村务论坛类型列表接口------------------------------------------------------------
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
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#region').append(
	    					'<option value="'+ret.data[i].cat_id+'">'+ret.data[i].cat_name+'</option>'
	    				)
	    			}
    			}
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

//村务论坛帖子提交接口-------------------------------------------------------------------------
function setBbsPost(){
	//获取上传列表id
	var notice_attach="";
	$("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}
		else{
			notice_attach=notice_attach+","+$(this).val()
		}
	})
	var url = localStorage.url+"/index.php/Api/Life/set_bbs_post";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "post_theme":$('#title').val(),//主题
	            "cat_id":$('#region').val(),//帖子类型编号
	            "post_content":$('#content').val(),//帖子内容
	            "post_img":notice_attach,//图片编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('帖子发表成功');
    			api.execScript({
    				name:'life_bbs_header',
    				frameName:'life_bbs',
	                script: 'exec();'
                });
    			api.closeWin({});
			}
			else{
				api.toast({msg: ret.msg,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//图片添加限制--------------------------------------------------------------
function onlyImg(){
	if($('#imgList li').length==0){
		open_uploud_1('imgList');
	}else{
		api.toast({msg: '图片已添加，如需更换请先删除...',duration:5000,location: 'top'});
	}
}