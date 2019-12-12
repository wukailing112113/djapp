apiready = function () {
    listenKeyback();//监听返回键退出程序
    getLogo();//加载项目logo
}


//获取登录信息
function login(){
	if($("#mobile").val() != ""){//判断用户名是否为空
		showProgress();//加载等待
		var url = localStorage.url+"Api/Public/user_login";
		api.ajax({
			url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		            user_name:$("#mobile").val(),
		            user_pwd:$.md5($("#password").val()),
		            table_name:'hr_staff'
		        }
		    }	
		},function(ret,err){
			if(ret){			     
	    		if(ret.status == 1){
	    			localStorage.user_id=ret.staff_no;
					localStorage.login = 1;
					api.closeWin({name:'slidLayout'});//关闭侧滑
				    api.closeWin({name:"chat_Header"});//关闭聊天会话页
				    api.closeWin({name:"chat_listHeader"});//关闭聊天列表
					setTimeout(function() { 
					    openSlidLayout();
					}, 1000);
				}else{
					$aui.alert({
				        title:'提示',
				        content:ret.msg,
				        buttons:['确定']
				    },function(ret){}
				    )
				}
				api.hideProgress();//隐藏进度提示框
	    	}else{
	    		api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	}
		})
	}else{
		$aui.alert({
	        title:'提示',
	        content:'请检查手机号或密码是否正确',
	        buttons:['确定']
	    },function(ret){}
	    )
	}
}

var is_open=false;//箭头图标是否打开
//打开侧滑功能
function openSlidLayout(){
	api.openSlidLayout ({
		leftEdge:api.winWidth / 3.67,
		type: 'left',
		fixedPane: {
			name: 'phoneBook_type', 
		    url: '../../official/hr/phoneBook_type.html'
	    },
		slidPane: {
		    name: 'index',
	        url: '../../index/index.html'
		}
		}, function(ret, err){
			if(ret.event=="close"){
				is_open=false;
			}
			api.execScript({
				name: 'index',
    			frameName: 'phoneBook',
	            script: 'update_arrow('+is_open+');'
            });
            is_open=true;
	});
	api.lockSlidPane();//锁定侧滑功能
}

function updateMainLink(){
	$aui.alert({
        title:'是否修改服务器地址',
        content:'<input id="url" type="url" value="'+localStorage.url+'" class="aui-input" placeholder="例如：www.simpro.cn" onkeyup="localStorage.purl=$(this).val()"/>',
        buttons:['确定','关闭'],
    },function(ret){
    	if(ret == 0 && localStorage.purl != undefined && localStorage.purl != ""){
    		localStorage.purl = localStorage.purl.replace(/\//gm,'')+"/"
    		localStorage.url = "http://"+localStorage.purl.replace(/http:/gm,'');
    	}
    })
}