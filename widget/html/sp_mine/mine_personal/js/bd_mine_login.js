apiready = function(){
	if(api.pageParam.type==1){
		$('#button').removeClass('di-n');
		$('#buttonAll').addClass('di-n');
	}
	//标题赋值 
	var url = localStorage.url+"/Api/Public/get_config";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {
	    	values: {				
	    		"config_code":'web_name'
	    	}
	    }
    },function(ret,err){
    	if(1==ret.status){    		
		  $('#logo_name').text(ret.data);
            
		}
		
    });
		

};

function cc(name,id){
	if(name!=='undefined'){
		$('#branch').val(name);
	}
	if(id!=='undefined'){
		$('#branch_hide').val(id);
	}
}
//登录账号
function login(){
	//获取页面中登录信息进行验证
//	if($("#branch").val() == ""){
//		alert('请选择支部或党委');
//		return;
//	}
//	else if(getIsCardNo() != ""){
//		alert(getIsCardNo());
//		return;
//	}
	if($('#user_name').val()==''){
		alert('请输入用户名');
		return false;
	}else if($('#password').val()==''){
		alert('请输入密码');
		return false;
	}
	//获取系统类型
	var systemType = api.systemType;
	var url = localStorage.url+"/index.php/Api/Public/check_login";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
				//"type":$('#tabBox2').attr('num'),//1党员登录  2为非党员登录
				"type":1,
	    		//"party_no":$("#branch_hide").val(),//支部信息
	    		"username":$("#user_name").val(),//用户名
	    		"password":$('#password').val()//密码
	    	}
	    }
    },function(ret,err){
    	if(1==ret.status){
  	       
    		localStorage.login = 1;//修改登录状态
    		localStorage.user_name = ret.data.user_name;//用户名
    		localStorage.user_IDCard = $('#IDCard').val();//身份证号
    		localStorage.user_id = ret.data.communist_no;//用户id
    		localStorage.dept_no = ret.data.party_no;//部门编号
    		localStorage.is_secretary = ret.data.is_secretary; //是否为第一书记
    		localStorage.is_volunteer = ret.data.is_volunteer; //是否为志愿者
    		localStorage.is_shuji = ret.data.is_shuji; //判断
    		
    		/**—————————————————————融云获取token———————————————————————————————————*/
    		var userId = ret.data.communist_no;      //会员id
	        var name = ret.data.user_name;            //会员昵称
	        var portraitUri = 1; //会员头像
	        var appKey = "p5tvi9dspeih4";
	        var appSecret = "5YLQETXn20";
	        var nonce = Math.floor(Math.random() * 1000000);//随机数
	        var timestamp = Date.now(); //时间戳
	        var signature = sha1("" + appSecret + nonce + timestamp);//数据签名(通过哈希加密计算)
	        api.ajax({
	                url : "http://api.cn.ronghub.com/user/getToken.json",
	                method : "post",
	                headers : {
	                        "RC-App-Key" : appKey,
	                        "RC-Nonce" : "" + nonce,
	                        "RC-Timestamp" : "" + timestamp,
	                        "RC-Signature" : "" + signature,
	                        "Content-Type" : "application/x-www-form-urlencoded"
	                },
	                data : {
	                        values : {
	                                userId : userId,
	                                name : name,
	                                portraitUri : portraitUri
	                        }
	                }
	        }, function(ret, err) {
	                if (ret) {
	                       //alert(ret.token)
	                       // $api.setStorage('token', ret.token);//将token存储到本地
	                       localStorage.token = ret.token;
	                } else {
	                        alert("获取token失败")
	                }
	        });
    		
    		/**—————————————————————融云获取token结束———————————————————————————————————*/
    		
		    //刷新左侧页面
		    api.execScript({
				name:"root",
				frameName:"leftWin",
		        script: 'rel();'
		    });
		    //加载推送功能
		    openTencentPush();
            if(localStorage.pro=='index-dj-a'||localStorage.pro=='index-dj-b'||localStorage.pro=='index-dj-c'){
            	api.openWin({
		            name: 'index',
		            url: '../../sp_bd/bd_index/bd_index.html'
	            });
	            
            }else{
            	api.loadSecureValue({
				    key: 'model'
				}, function(ret, err) {			    
//				    	api.openWin({
//				            name: 'index',
//				            url: '../../sp_bd/bd_index/bd_index.html'
//			            });	
						openLeft()
			     })
            }
		}
		else{
			mui.alert(ret.msg,"提示");
		}
    });
}

//打开新页面
function openNewWin(winName){
	api.openWin({
        name: winName,
        url: 'header/'+winName+".html"
    });
}

//信鸽推送
//function openTencentPush(){
//	// 注册设备并绑定用户账号
//	var tencentPush = api.require('tencentPush');
//	
//	var resultCallback = function(ret, err){
//	    if(ret.status){
//	        //alert("注册成功，token为："+ret.token);
//	    }
//	};
//	
//	// 需要绑定的账号，若为"*"表示解除之前的账号绑定
//	var params = {account:localStorage.user_id};
//	tencentPush.registerPush(params, resultCallback);
//	
//	//监听状态栏点击
//	api.addEventListener({
//  name:'appintent'
//	},function(ret,err){
//	    if(api.systemType == 'ios'){
////	        var customCotent = JSON.parse(ret.appParam["tag.tpush.NOTIFIC"].substring(ret.appParam["tag.tpush.NOTIFIC"].indexOf("{"),ret.appParam["tag.tpush.NOTIFIC"].indexOf("}")+1));
////	        
////	        openPushNewWin(customCotent.winName,customCotent.id);
//	    } else {alert(JSON.stringify(ret.appParam));
////	        var customCotent = JSON.parse(ret.appParam["tag.tpush.NOTIFIC"].substring(ret.appParam["tag.tpush.NOTIFIC"].indexOf("{"),ret.appParam["tag.tpush.NOTIFIC"].indexOf("}")+1));
////	        
////	        openPushNewWin(customCotent.winName,customCotent.id);
//	    }
//	
//	});
//}

//通过推送打开新的页面
function openPushNewWin(winName,id){
	var wName = winName.split("/");
		wName = wName[wName.length-1].substring(0,wName[wName.length-1].indexOf("."));
	api.openWin({
        name: wName,
        url: winName,
        pageParam:{
        	"type":"已收文件",//公文处理中用到
        	"id":id
	    }
    });
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

function openRegistered(winName){
	api.openWin({
        name: winName,
        url: 'header/'+winName+".html"
    });
}


//党员登录与非党员登录切换---------------------------------------------------
$('#non_party_login').hide();
$('#tabBox2').find('li').click(function(){
	$('#tabBox2').find('li').removeClass('tabBox2-active');
	$(this).addClass('tabBox2-active');
	$('#tabBox2').attr('num',$(this).attr('num'));
	if($(this).index() == 0){
		$('#party_login').show();
		$('#non_party_login').hide();
	}else{
		$('#party_login').hide();
		$('#non_party_login').show();
	}
});

//密码加密	
$('.show').click(function(){
		$('.show').hide();
		$('.hide').show();
		$('#password').attr('type','text');
})
$('.hide').click(function(){
		$('.show').show();
		$('.hide').hide();
		$('#password').attr('type','password');
})