apiready=function (){

}
//切换项目
function switching(){
	localStorage.user_id="";
	localStorage.login = 0;
	unregisterPush();//腾讯信鸽推送反注册设备
	var rong = api.require('rongCloud2');
	rong.disconnect({
	    isReceivePush: true
	}, function(ret, err) {
	    if ('success' == ret.status) {
	        api.toast({ msg: '断开连接成功!' });
	    }
	});
	api.closeFrame({
	    name: 'mine'
    });
    api.closeWin({
		name:'login'
	})
	if($('input:checked').attr('id')=='list1'){
		localStorage.url='http://p5.sp11.cn/';
		localStorage.pro='index';//项目切换
		api.openWin({
	        name: 'login',
	        url: 'login.html'
        });
	}else if($('input:checked').attr('id')=='list2'){
		localStorage.url='http://qydj.sp11.cn/';
		localStorage.pro='index-dj-a';//项目切换
		api.openWin({
	        name: 'login',
	        url: '../../dangjian/bd/header/mine_loginHeader.html'
        });
	}else if($('input:checked').attr('id')=='list3'){
		localStorage.url='http://qydj.sp11.cn/';
		localStorage.pro='index-dj-c';//项目切换
		api.openWin({
	        name: 'login',
	        url: '../../dangjian/bd/header/mine_loginHeader.html'
        });
	}else if($('input:checked').attr('id')=='list4'){
		localStorage.url='http://qydj.sp11.cn/';
		localStorage.pro='index-dj-b';//项目切换
		api.openWin({
	        name: 'login',
	        url: '../../dangjian/bd/header/mine_loginHeader.html'
        });
	}else if($('input:checked').attr('id')=='list'){
		localStorage.url='http://p5.sp11.cn/';
		localStorage.pro='index-bug';//项目切换
		api.openWin({
	        name: 'login',
	        url: 'customer_login.html'
        });
	}
	api.closeWin({
		name:'index'
	})
}