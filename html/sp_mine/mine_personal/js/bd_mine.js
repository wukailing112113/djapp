//刷新本页面
function rel(){
	location.reload();
}

apiready = function(){
	api.loadSecureValue({
	    key: 'switching_attern'
	}, function(ret, err) {
	    if(ret.value=='true'){
	    	$('#switching_attern').show();
	    }
	});
	//获取软件版本号
	$("#appVersion").html("V"+api.appVersion);
	getUser();//获取个人信息
};

//获取个人信息
function getUser(){
	//判断是否登录状态
	if(localStorage.login == 1){
		showProgress();//进度提示框
		var url = localStorage.url+"/index.php/Api/Public/get_user_info";
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
	    	if(1==ret.status){
				//判断头像是否为空
				if(ret.staff_avatar != null && ret.staff_avatar != 0){
					$("#head_img").attr("src",localStorage.url+ret.staff_avatar);//赋值个人头像
				}
				$("#user_name").html(ret.staff_name);
				$("#top_div").attr("onclick","openNewWin('sp_mine/mine_personal/header/mine_personal_personalData_header')");//重新定义事件
				localStorage.user_name=ret.staff_name
				localStorage.is_admin = ret.is_admin;//是否书记
				$("#out").show();//显示退出按钮
				api.hideProgress();//隐藏提示加载窗
			}
			else{
				mui.alert(ret.msg,"提示");
			}
	    });
    }else{
    	api.openWin({
	        name: 'mine_loginHeader',
	        url: 'header/mine_personal_login_header.html'
		 });
    }
}

//退出当前账号
function out(){
	localStorage.login = 0;//清除登录状态
	//清除账户信息
	localStorage.removeItem("branch");//支部
	localStorage.removeItem("real_name");//姓名
	localStorage.removeItem("IDCard");//身份证
	localStorage.removeItem("user_id");//用户id
	localStorage.removeItem("autoLogin");//自动登录状态
	$("#out").hide();//隐藏退出按钮
	api.openWin({
	    name: 'login',
	    url: 'header/mine_personal_login_header.html'
    });
    // 反注册设备
	var tencentPush = api.require('tencentPush');
	var resultCallback = function(ret, err){
	};
	tencentPush.unregisterPush(resultCallback);
}

//打开新页面
function openNewWin(winName){
	if(localStorage.user_id==undefined&&winName=='mine_personal_collect_header'||localStorage.user_id==undefined&&winName=='mine_personal_uploading_header'||localStorage.user_id==undefined&&winName=='mine_personal_invitation_header'){
		mui.alert('您还没有登陆，请先登录',function(){
			api.openWin({
		        name: 'mine_login_header',
		        url: '../../sp_mine/mine_personal/header/mine_personal_login_header.html'
	   		 });
		});
	}
	else{
		api.openWin({
	        name: winName,
	        url: '../../'+winName+".html"
	    });
    }
}
function openLoginWin(winName){
	api.openWin({
	    name: winName,
	    url: '../../public/sys/header/'+winName+".html"
	});
}
function opensys(winName){
	api.openWin({
	    name: winName,
	    url: '../../public/sys/header/'+winName+".html"
	});
}