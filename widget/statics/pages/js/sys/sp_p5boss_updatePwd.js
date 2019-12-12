apiready = function () {
    api.parseTapmode();
}

//显示密码
function showPassword(obj){
    $($(obj).prev()).attr('type','text');
    $($(obj)).removeClass('aui-icon-attention');
    $($(obj)).addClass('aui-icon-attentionfill');
    $($(obj)).attr('onclick','hidePassword(this);');
    api.parseTapmode();
}

//隐藏密码
function hidePassword(obj){
    $($(obj).prev()).attr('type','password');
    $($(obj)).removeClass('aui-icon-attentionfill');
    $($(obj)).addClass('aui-icon-attention');
    $($(obj)).attr('onclick','showPassword(this);');
    api.parseTapmode();
}

//提交修改密码
function updatePwdDo(){
	$("#btn_id").attr("disabled",true);
	showProgress();//加载等待
	if($("#oldPassword").val() == "" || $("#password").val() == "" || $("#password2").val() == ""){
		$aui.alert({title:"提示",content:"密码不能为空",buttons:['确定']},function(ret){});
		$("#btn_id").attr("disabled",false);
		api.hideProgress();//隐藏进度提示框
		return;
	}
	if($("#password").val().length > 8){
		$("#password").val("");
		$("#password2").val("");
		$aui.alert({title:"提示",content:"密码最多八位",buttons:['确定']},function(ret){});
		$("#btn_id").attr("disabled",false);
		api.hideProgress();//隐藏进度提示框
		return;
	}
	if($("#password").val() !== $("#password2").val()){
		$("#password2").val("");
		$aui.alert({title:"提示",content:"新密码与确认密码不相符",buttons:['确定']},function(ret){});
		$("#btn_id").attr("disabled",false);
		api.hideProgress();//隐藏进度提示框
		return;
	}
	//ajax获取数据处理
	var url = localStorage.url+"Api/Public/set_user_pwd";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "user_staff":localStorage.user_id,
	            "old_pwd":$.md5($("#oldPassword").val()),
	            "user_pwd":$.md5($("#password").val())
        	}
    	}
	},function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$aui.alert({title:"成功",content:"密码修改成功",buttons:['确定']},function(ret){
    				if(ret==0){
		                localStorage.user_id="";
						localStorage.login = 0;
						unregisterPush();//腾讯信鸽推送反注册设备
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
    			});
    		}else{
    			$("#btn_id").attr("disabled",false);
    			$aui.alert({title:"失败",content:ret.msg,buttons:['确定']},function(ret){
    				if(ret==0){
		                location.reload();
		            }
    			});
    		}
    		api.hideProgress();//隐藏进度提示框
    	}else{
    		$("#btn_id").attr("disabled",false);
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
	/*$aui.alert({
        title:'成功',
        content:'密码修改成功，请重新登录',
        buttons:['确定']
    },function(ret){
        //处理回调函数
        if(ret){
            if(ret==0){
                api.closeToWin({name: 'login'});
            }
        }
    })*/
    
    

