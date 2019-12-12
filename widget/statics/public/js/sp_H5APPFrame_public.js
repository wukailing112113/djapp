//加载信息等待
function showProgress(){
	api.showProgress({
	    style: 'default',
	    animationType: 'fade',
	    title: '努力加载中...',
	    text: '先喝杯茶...',
	    modal: false
	});
}



//监听返回键退出程序
function listenKeyback(){
	api.addEventListener({
	    name: 'keyback'
	}, function(ret, err){
		if(localStorage.autoLogin != "true"){//不为自动登录状态
			localStorage.login = 0;//清除登录状态
			//清除账户信息
			localStorage.removeItem("branch");//支部
			localStorage.removeItem("real_name");//姓名
			localStorage.removeItem("IDCard");//身份证
			localStorage.removeItem("user_id");//用户id
		}
		api.closeWidget(); //退出程序
	});
}



//获取验证码倒计时
function getVerifyCode(){
	//jquery验证手机号码 
	if ($("#phone").val() == "") { 
        mui.alert('手机号码不能为空', '提示');
		return false; 
	} 
	if (!$("#phone").val().match(/^1[3|4|5|8][0-9]\d{4,8}$/)) { 
        mui.alert('手机号码格式不正确', '提示');
		return false;
	}
 	//后台传递手机号并获取验证码 
 	var phone = $('#phone').val();
 	//调取后台验证码接口
	f_timeout(); 
	$('#divphone').attr("onclick", ""); 
}  
function f_timeout(){  
     $('#divphone').html('  <lable id="timeb2"> 60 </lable>秒后重新获取 ');  
         timer = self.setInterval(addsec,1000); 
}  
function addsec(){  
	var t = $('#timeb2').html();  
	if(t > 0){  
		$('#timeb2').html(t-1);
	}else{  
	    window.clearInterval(timer);  
	    $('#divphone').attr("onclick", "getVerifyCode()"); 
	  	$('#divphone').html("获取验证码");  
 	}  
}



//验证邮箱
function verifyMail(email){
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //验证邮箱的正则表达式
	if(!reg.test(email))
	{
	    mui.alert('邮箱格式不对', '提示');
	    return true;
	}
}

// 验证身份证 
function isCardNo(card) { 
	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
	return pattern.test(card); 
}
function getIsCardNo(){//调用验证身份证号码函数
	// 验证身份证
	var str="";
	if($.trim($('#IDCard').val()).length == 0) { 
		str += '请输入身份证号码';
	} else {
		if(isCardNo($.trim($('#IDCard').val())) == false) {
			str += '身份证号不正确；';
		}
	}return str;
}

//两个日期的差值(d1 - d2).
function DateDiff(d1,d2){
    var day = 24 * 60 * 60 *1000;
	try{    
	    var checkTime = new Date(d1).getTime();
	    var checkTime2 = new Date(d2).getTime();
	   var cha = (checkTime - checkTime2)/day;  
	        return cha;
	    }catch(e){
	   return false;
	}
}//end fun

//拨打电话
function callTel(tel){
	api.call({
        number:tel
    });
}

//通过formhtml可以获取input中带有value属性
(function($) {
	var oldHTML = $.fn.html;
	$.fn.formhtml =function() {
	if (arguments.length) return oldHTML.apply(this,arguments);
	$("input,button", this).each(function() {
	this.setAttribute('value',this.value);
	});
	$("textarea", this).each(function() {
	$(this).html(this.value);
	});
	$(":radio,:checkbox", this).each(function() {
	if (this.checked) this.setAttribute('checked', 'checked');
	elsethis.removeAttribute('checked');
	});
	$("option", this).each(function() {
	if (this.selected) this.setAttribute('selected', 'selected');
	elsethis.removeAttribute('selected');
	});
	return oldHTML.apply(this);
	};
})(jQuery);

//下载文件
function openEnqueue(file_path){
	var file_name = file_path.split("/");
	var downloadManager = api.require('downloadManager');
	downloadManager.enqueue({
	    url: file_path,
	    savePath: 'fs://download/'+file_name[file_name.length-1],
	    cache: true,
	    allowResume: true,
	    title: file_name[file_name.length-1],
	    networkTypes: 'all'
	}, function(ret, err){        
	    if( ret ){
	    	//打开下载管理
	        downloadManager.openManagerView({
			    title: '下载管理'
			}, function(ret, err){        
			    if( ret ){
			        if(ret.id){
						downloadManager.openDownloadedFile({
						    id: ret.id
						}, function(ret, err){        
						});
			        }
			    }
			});
	    }else{
	        mui.alert("下载失败","失败");
	    }
	});
}