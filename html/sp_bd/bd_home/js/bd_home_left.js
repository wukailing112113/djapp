
var date=new Date;
var year=date.getFullYear(); 
 
apiready=function(){
	changecolor();
	getHrCommunistInfo();
	getCache()//获取缓存
	
}

//获取个人信息----------------------------------------------------------------------------
function getHrCommunistInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_avatar').attr('src',localStorage.url+ret.data.communist_avatar);//党员姓名
    			$('#communist_name').html(ret.data.communist_name);//党员姓名
    			$('#party_name').html(ret.data.party_name);//所属支部
    			$('#post_name').html(ret.data.post_name);//职务赋值
    			//判断是否是男性
    			if(ret.data.communist_sex=='男'){
    				$('#man').removeClass('di-n');
    			}else{
    				$('#woman').removeClass('di-n');
    			}
//  			//判断年龄
    			var age=(year-((ret.data.communist_birthday).substring(0,4)));
    			$('#age').html(age+'岁');
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//打开关于我们页面-----------------------------------------------------------------
function openSysabout(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_sys/sys_about/header/'+winName+".html"
	});
}

//打开我的资料页面//打开设置页面-------------------------------------------------------
function openPersonal(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_mine/mine_personal/header/'+winName+".html"
	});
}

//打开账户安全页面----------------------------------------------------------------
function opensys_updatewin(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_sys/sys_update/header/'+winName+".html"
	});
}

//退出当前账号-------------------------------------------------------------------
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
	    url: '../../sp_mine/mine_personal/header/mine_personal_login_header.html',
    });
 
		
        
        
    // 反注册设备
	var tencentPush = api.require('tencentPush');
	var resultCallback = function(ret, err){
	};
	tencentPush.unregisterPush(resultCallback);
	 
					
}
//清除缓存
function clearCache(){
    api.clearCache(function( ret, err ){
        if( ret ){
            api.toast({
                msg: '成功清除'+cache+'缓存',
                duration: 2000,
                location: 'middle'
            });
             getCache();//重新获取缓存
        }
    });
}

//获取缓存
function getCache(){
    //获取缓存大小
    api.getCacheSize(function( ret, err ){
        if( ret ){
            cache = (ret.size/1048576).toFixed(1)+"M"
            if(cache=='0.0M'){
            	$('#cache').removeClass('color-33').addClass('color-df');
            }
            $("#cache").html(cache);
        }
    });
}
//刷新页面-----------------------------------------------------------
function exec(){
	location.reload();
}