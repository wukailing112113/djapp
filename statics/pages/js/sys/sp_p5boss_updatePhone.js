var oblPhone;//原始手机号
var vcode;//验证码

apiready = function () {
    getpersonaldata();
    api.parseTapmode();
}

var newcode = $("#vcode").val();
var newmobile = "";

//获取个人资料数据
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
	            "staff_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
				oblPhone = ret.staff_mobile;		
			}
			api.hideProgress();//隐藏提示框
    	}else{
    		api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
	
//验证是否和预留手机号匹配
function isright(){
	if($("#mobile").val() != ""){
		if($("#mobile").val() == oblPhone){
			getVerifyCode('isright');//在、验证码倒计时
			getvcode();//获取验证码
		}else{
			$aui.alert({title:"提示",content:"输入手机号和预留手机号不同",buttons:['确定']},function(ret){});
		}
	}else{
		$aui.alert({title:"提示",content:"手机号不能为空",buttons:['确定']},function(ret){});
	}
}

//获取验证码
function getvcode(type){
	showProgress();//加载等待
	if(type){
		getVerifyCode('getvcode');//在、验证码倒计时
	}
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_vcode";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "phone":$("#mobile").val(),
	            "vcode_type":1,
	            "type":3
	        }
	    }
    },function(ret,err){    	
    	if(ret){    		
    		if(ret.status == 1){
				vcode=ret.vcode;
//				alert(vcode);//临时提示，后期删除
    		}
    		api.hideProgress();//隐藏提示框
    		
    	}
		else{
			api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}   	
    });
}

//下一步
function next(obj){
	//验证手机号和验证码 不为空
	if($("#mobile").val() == "" || $("#code").val() == ""){
		$aui.alert({title:"提示",content:"手机号或验证码不能为空",buttons:['确定']},function(ret){});
		return;
	}
	if($("#code").val() != vcode){
		$aui.alert({title:"提示",content:"验证码错误",buttons:['确定']},function(ret){});
		return;
	}
	$("#mobile").val("");
	$("#code").val("");
	$("#code_div").attr("onclick","getvcode(true)");
	window.clearInterval(timer);  
  	$('#code_div').html("获取验证码");
    $("#mobile").attr("placeholder","输入新手机号");
	$(obj).parent().hide().next().show();
}


//提交修改手机号码
function set_user_mobile(){
	$("#btn_id").attr("disabled",true);
	showProgress();//加载等待
	//验证手机号和验证码 不为空
	if($("#mobile").val() == "" || $("#code").val() == ""){
		$aui.alert({title:"提示",content:"手机号或验证码不能为空",buttons:['确定']},function(ret){});
		$("#btn_id").attr("disabled",false);
		api.hideProgress();//隐藏提示框
		return;
	}
	if($("#code").val() != vcode){
		$aui.alert({title:"提示",content:"验证码错误",buttons:['确定']},function(ret){});
		$("#btn_id").attr("disabled",false);
		api.hideProgress();//隐藏提示框
		return;
	}
	if($("#mobile").val()==oblPhone){
		api.hideProgress();//隐藏提示框
		$aui.alert({title:"提示",content:"新旧手机号相同不允许修改",buttons:['确定']},function(ret){location.reload()});
		return;
	}
	
	//ajax获取数据处理
	var url = localStorage.url+"Api/Public/set_user_mobile";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "staff_no":localStorage.user_id,
	            "new_mobile":$("#mobile").val(),
	            "old_mobile":oblPhone,
	            "new_code":vcode
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$aui.alert({title:"成功",content:"手机号修改成功",buttons:['确定']},function(ret){
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
    		api.hideProgress();//隐藏提示框
    	}else{
    		$("#btn_id").attr("disabled",false);
    		api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });    
}
