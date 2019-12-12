apiready=function(){
	//标题赋值
	api.loadSecureValue({
	    key:'logo'
	}, function(ret, err){		
	    $('#name').text(ret.value);
	});
	get_config();//获取关于我们内容
}

//关于我们信息
//获取个人信息----------------------------------------------------------------------------
function get_config(){
	showProgress();//隐藏进度提示框
	var url = localStorage.url+"/index.php/Api/Public/get_config";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "config_code":'app_about_us'
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#content').html(ret.data);//关于我们内容
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}