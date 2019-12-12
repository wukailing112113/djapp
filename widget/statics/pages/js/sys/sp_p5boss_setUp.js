apiready = function(){
	getpersonaldata();
};

//    获取个人资料数据
function getpersonaldata(){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Public/get_user_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            staff_no:localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			if(ret.staff_avatar != null && ret.staff_avatar != ""){
    				$("#photo").attr("src",localStorage.url+ret.staff_avatar);
    			}
				$("#nickname").html(ret.staff_name);
				$("#phone").append(ret.staff_mobile);		
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });	
}
//退出账号
function outLogin(){
	localStorage.user_id="";
	localStorage.login = 0;
	unregisterPush();//腾讯信鸽推送反注册设备
	api.closeFrame({
	    name: 'mine'
    });
	//判断登录是否打开
	if(localStorage.is_login == "true"){
		api.closeToWin({
		    name: 'login'
	    });
	}else{
		api.openWin({
	        name: 'login',
	        url: 'login.html'
        });
	}
	
}

function openNewWin(winName){
	//打开新页面
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:localStorage.user_id
	    }
    });
}