apiready = function () {
    listenKeyback();//监听返回键退出程序
}


//获取登录信息
function login(){
	showProgress();//加载等待
	if($("#mobile").val() != ""){//判断用户名是否为空
		var url = localStorage.url+"Api/Public/user_login";
		api.ajax({
			url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		            user_name:$("#mobile").val(),
		            user_pwd:$.md5($("#password").val()),
		            table_name:'crm_cust'
		        }
		    }	
		},function(ret,err){
			if(ret){			     
	    		if(ret.status == 1){
	    			localStorage.user_id=ret.cust_no;
					localStorage.login = 1;
					api.openWin({
	                    name: 'index_bug',
	                    url: '../index/index_bug.html'
                    });
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
	    },function(ret){
	    	api.hideProgress();//隐藏进度提示框
	    }
	    )
	}
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