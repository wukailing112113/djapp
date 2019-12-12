apiready=function(){
	
}
//申请帮扶提交接口
function setLifeHelp(){
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
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/set_life_help";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//登录人编号
	    		"difficulty_content":$('#difficulty_content').val(),//申请事由
	    		"help_img":notice_attach//图片
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('帮扶已申请');
    			api.execScript({
					name: 'hr_poorhelp_edit_header',
	                script: 'goBlack();'
	       		});
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
