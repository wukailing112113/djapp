apiready = function(){
	getBdTypeList();//调用（获取学习笔记类型）接口
	getEduTopicList();//调用（获取专题学习类型）接口
}

//获取学习笔记类型 接口------------------------------------------------------------
function getBdTypeList(){
	var url = localStorage.url+"/index.php/Api/Public/get_bd_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           "type_group":"notes_type",//学习笔记
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.data.length;i++){
    				$('#notes_type').append(
    					'<option value="'+ret.data[i].type_no+'">'+ret.data[i].type_name+'</option>'
    				)
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

//获取专题学习类型 接口------------------------------------------------------------
function getEduTopicList(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_topic_list";
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
    			for(var i=0;i<ret.data.length;i++){
    				$('#topic_type').append(
    					'<option value="'+ret.data[i].topic_id+'">'+ret.data[i].topic_title+'</option>'
    				)
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

//提交学习笔记 接口------------------------------------------------------------
function setEduNotes(){
	//获取上传列表id
	var notice_attach="";
	$("input[name='file_no']").each(function(){
	if(notice_attach==""){
		notice_attach=notice_attach+$(this).val()
	}else{
		notice_attach=notice_attach+","+$(this).val()
		}
	})
	//alert(notice_attach);//3665
	//alert(localStorage.user_id);
	//alert($('#topic_type').val());
	//alert($('#notes_type').val());
	//alert($('#notes_content').val());
	var url = localStorage.url+"/index.php/Api/Edu/set_edu_notes";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//提交人编号
	            "notes_title":$('#notes_title').val(),//笔记标题
	            "notes_type":$('#notes_type').val(),//笔记类型
	            "topic_type":$('#topic_type').val(),//专题类型
	            "notes_content":$('#notes_content').val(),//笔记内容
	            "notes_thumb":notice_attach,//图片
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('提交成功');
				api.execScript({
					name: 'edu_notes_header',
				    frameName: 'edu_notes',
				    script: 'exec()'
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
