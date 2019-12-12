apiready = function(){

        
};

var code;
//获取验证码

function getcode(){
	if($('#mobile').val() ==''){
		alert('请输入手机号');
		return;
	}else if(verifyPhone($('#mobile').val())==false){
		alert('手机号码格式不正确');
		return;
	}
	$('#send').text('已发送');
	var url = localStorage.url+"/Api/Public/register_auth_code";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "phone":$('#mobile').val(),//手机号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			code=ret.data;
			}else{
				Alert(ret.msg);//注册失败提示
			}
			api.hideProgress();//隐藏加载进度提示
			
    	}else{
    		api.hideProgress();//隐藏加载进度提示
    		
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}



var type;
//注册
function register(){

	if($('#real_name').val() ==''){
		alert('请填写姓名');
		return;
	}else if($('#IDCard').val() ==''){
		alert('请填写身份证号码');
		return;
	}else if($('#user_name').val() ==''){
		alert('请输入一个用户名');
		return;
	}else if($('#mobile').val() ==''){
		alert('请输入手机号');
		return;
	}else if(verifyPhone($('#mobile').val())==false){
		alert('手机号码格式不正确');
		return;
	}else if($('#password1').val() ==''){
		alert('请输入密码');
		return;
	}else if($('#password1').val() != $('#password2').val()){
		alert('两次密码输入不一致');
		return;
	}else if(verifyIDCard($('#IDCard').val())==false){
		alert('身份证号码格式不正确');
		return;
	}else if($('#code').val()==''){
		alert('请输入验证码');
		return;
	}else if($('#code').val()!=code){
		alert('验证码不正确');
		return;
	}
	
//	showProgress('正在注册')//加载信息等待
	var url = localStorage.url+"/Api/Public/register_save";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_name":$('#real_name').val(),//姓名
	            "communist_idnumber":$('#IDCard').val(),//身份证号
	            "password":$('#password1').val(),//密码
	            "username":$('#user_name').val(),//用户名
	            "phone":$('#mobile').val()//手机号	            
	        }
	    }
    },function(ret,err){
    
    	if(ret){    	    	
    		if(ret.status==1){
    			if(ret.data==1){
    				alert('信息错误');
    			}else if(ret.data==2){
					alert('用户名重复')
    			}else if(ret.data.type==3){
					alert('注册成功');
					localStorage.login = 1;//修改登录状态
			  		localStorage.user_id = ret.data.communist_no;//用户id
			  		/*
			  		api.openWin({
			            name: 'index',
			            url: '../../sp_bd/bd_index/bd_index.html'
		            });*/
		            /*以下是修改内容*/		            		            		            if(localStorage.pro=='index-dj-a'||localStorage.pro=='index-dj-b'||localStorage.pro=='index-dj-c'){
            	api.openWin({
		            name: 'index',
		            url: '../../sp_bd/bd_index/bd_index.html'
	            });
            }else{
            	api.loadSecureValue({
				    key: 'model'
				}, function(ret, err) {			    			    	
						openLeft()
			     })
            }
			 /*end*/		
					
    		}
			}else{
				alert(ret.msg);//注册失败提示
			}
			api.hideProgress();//隐藏加载进度提示
			
    	}else{
    		api.hideProgress();//隐藏加载进度提示    		
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    	
    	
    	/*
    				alert('注册成功');
					localStorage.login = 1;//修改登录状态
			  		localStorage.user_id = ret.data.communist_no;//用户id
			  		
					if(localStorage.pro=='index-dj-a'||localStorage.pro=='index-dj-b'||localStorage.pro=='index-dj-c'){
            	api.openWin({
		            name: 'index',
		            url: '../../sp_bd/bd_index/bd_index.html'
	            });
            }else{
            	api.loadSecureValue({
				    key: 'model'
				}, function(ret, err) {			    			    	
						openLeft()
			     })
            }
            
            */
            
					

    });
}



//验证手机号
function verifyPhone(phone){
	if (!phone.match(/^1[2|3|4|5|6|7|8][0-9]\d{4,8}$/)) {
//      api.toast({msg: '手机号码格式不正确' ,duration:3000,location: 'top'});
		return false;
	}else{
		return true;
	}
}

function verifyIDCard(IDCard){
//  var card = $("#IDCard").val();
//  var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//  if(!pattern.test(card)){
//	     $("#cardPrompt").html("<i id='i2' style='color:red'>&emsp;身份证格式不正确！</i>");
//      return false;
//  }else{
//      return true;
//  }
	if (!IDCard.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
//      api.toast({msg: '手机号码格式不正确' ,duration:3000,location: 'top'});
		return false;
	}else{
		return true;
	}

}
//打开左侧侧滑
	   
function openLeft(){
	api.openSlidLayout({
		type:'left',
		slidPane:{
			name:'bd_index',
			url:'../../sp_bd/bd_index/bd_index.html',
		},
		fixedPane:{
			name:'bd_home_left',
			url:'../../sp_bd/bd_home/bd_home_left.html',
		},
	}, function(ret, err) {
		
	});
}

