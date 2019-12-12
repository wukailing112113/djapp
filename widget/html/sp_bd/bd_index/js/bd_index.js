apiready = function () {
	//标题赋值
	api.loadSecureValue({
	    key:'logo'
	}, function(ret, err){		
	    $('#logo_name').text(ret.value);
	});
	
	randomSwitchBtn(document.getElementById('tabbar1'));
    $api.fixStatusBar( $api.dom('header') );
     $("header li").eq(0).show();
    //设置状态栏 字体颜色和背景颜色
	api.setStatusBarStyle({
	    style: 'dark',
	    color: 'rgba(0,0,0,0)'
	});
//	//判断登录状态加载信鸽推送
//  if(localStorage.login == 1){
//  	registerPush();//注册推送
//  	openTencentPush();//加载信鸽推送功能
//  }
    funIniGroup();
    listenKeyback();//监听返回键退出程序
//  localStorage.voice=true;//是否打开提示信息音乐
//  localStorage.shock=true;//是否打开震动
//  localStorage.news=true;//是否打开他推送
//  localStorage.disturb=false//是否开启免打扰模式，默认false
//  publicRong.init();//初始化融云 SDK

}


function funIniGroup(){
    frames = [];
    frames.push( { 
        name: 'home',
        url: '../bd_home/bd_home.html', 
        bounces:false,
    } )
    frames.push( { 
        name: 'learn', 
        url: '../bd_appstore/bd_appstore.html', 
        bounces:false
    } )
    frames.push( { 
        name: 'partyorg', 
        url: '../../sp_edu/edu_topic/edu_topic.html', 
        bounces:false,
    } )
//   frames.push( { 
//      name: 'appstore', 
//      url: '../../sp_life/life_platform/life_platform.html', 
//      bounces:false,
//  } )
    frames.push( { 
        name: 'staff', 
        url: '../../sp_hr/hr_staff/hr_staff_info.html', 
        bounces:true
    } )
    api.openFrameGroup({
        name: 'group',
        scrollEnabled: false,
        rect: {
            x: 0, 
            y: $api.dom('header').offsetHeight, 
            w: api.winWidth, 
            h: $api.dom('#main').offsetHeight
        },
        index: 0,
        preload:0,
        frames: frames
    }, function (ret, err) {
    	if(ret){
    	}
    });
}

//随意切换按钮
var current_index;//当前切换下标，主要是用来处理个人中心切换高度bug
function randomSwitchBtn(tag) {
	if(tag==tabbar1||tag==tabbar3||tag==tabbar4){
		api.lockSlidPane();		
	}else{
		api.unlockSlidPane();//锁定侧滑事件
	}
	if($(tag).hasClass('active-info')){
		return;
	}
    var eFootLis = $api.domAll('#aui-footer li'),
        eHeaderLis = $api.domAll('header li'),
        index = 0;
    for (var i = 0,len = eFootLis.length; i < len; i++) {
        if( tag == eFootLis[i] ){
            index = i;
        }else{
            $api.removeCls(eFootLis[i], 'active-info');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls( eFootLis[index], 'active-info');
    $api.addCls( eHeaderLis[index], 'active');
    //判断为个人中心页面去掉头部
//	if(index == 0){
//		var userAgent = navigator.userAgent;
//		var android_index = userAgent.indexOf("Android");
//		var androidVersion;
//		if(android_index >= 0){  
//			androidVersion = parseFloat(userAgent.slice(android_index+8)); 
//		}
//	   api.setFrameGroupAttr({
//          name: 'group',
//          rect:{
//          	x:0,
//              y:0,
//              h: $api.dom('#main').offsetHeight+(androidVersion<4.4?45:70),
//              w: api.winWidth
//          }
//      });
//	   $("header").hide();
//	   current_index=index;
//	}else{
//		current_index=0;
	if(index > 0){
	   $("header li").eq(0).hide();
	   $("header").show();
	   api.setFrameGroupAttr({
            name: 'group',
            rect:{
            	x:0,
                y:$api.dom('header').offsetHeight,
                h: $api.dom('#main').offsetHeight,
                w: api.winWidth
            }
        });
    }else{
        $("header li").eq(0).show();
    }    
//	}
    api.setFrameGroupIndex({
        name: 'group',
        index: index
    });
}
//打开public 模块 bd内页面
function openBdWin(winName){
	api.openWin({
	    name: winName,
	    url: '../bd_appstore/header/'+winName+'.html'
    });
}
//刷新页面

function exec(){
	location.reload();
}
//打开 设置页面
function openmine_personalWin(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_mine/mine_personal/header/'+winName+'.html'
    });
}
//打开搜索页面
function opense_seWin(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_se/header/'+winName+'.html'
    });
}

//打开侧边栏
$('.open-left').click(function(){
	api.openSlidPane({
		type: 'left',
	})
});




//打开通知公告
function openNotice(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_notice/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开消息通知
function openMessage(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_message/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

