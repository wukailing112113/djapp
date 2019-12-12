//页面初始化
apiready=function(){
	set_guestbook();
}

//获取留言建议详情
function set_guestbook(){
	var url = localStorage.url+"/index.php/Api/Life/get_guestbook_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		
				"guestbook_id":api.pageParam.id,//编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_name').val(ret.data.communist_name);//联系人姓名
    			$('#guestbook_content').val(ret.data.guestbook_content);//留言内容
    			$('#memo').val(ret.data.memo);//回复内容
			}else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
