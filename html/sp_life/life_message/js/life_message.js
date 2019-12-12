//页面初始化
apiready=function(){
	get_hr_communist_info();
}

//加载数据方法----------------------------------------------------------------------
function get_hr_communist_info(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "log_type":1
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_name').val(ret.data.communist_name);//党员姓名
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//提交
function set_guestbook(){
	if($('#communist_phone').val()==""){
		alert('请输入联系人电话');
		return;
	}
//	if(!checkPhone($('#communist_phone').val())){
//		return;
//		
//	}
	if($('#guestbook_content').val()==""){
		alert('请输入您的留言内容');
		return;
	}
	var url = localStorage.url+"/index.php/Api/Life/set_guestbook";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				"communist_no":localStorage.user_id,//党员编号
				"communist_phone":$('#communist_phone').val(),//联系人电话
				"guestbook_content":$('#guestbook_content').val(),//留言内容
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('提交成功')
    			api.closeWin({});
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

