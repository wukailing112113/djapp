apiready = function () {
    $api.fixStatusBar( $api.dom('header') );
    //设置状态栏
	api.setStatusBarStyle({
	    style: 'light',
	    color: 'rgba(0,0,0,0)'
	});
    funIniGroup();
    listenKeyback();//监听返回键退出程序
    
    //判断登录状态加载信鸽推送
    if(localStorage.login == 1){
    	registerPush();//注册推送
    	openTencentPush();//加载信鸽推送功能
    }
    localStorage.voice=true;//是否打开提示信息音乐
    localStorage.shock=true;//是否打开震动
    localStorage.news=true;//是否打开他推送
    localStorage.disturb=false//是否开启免打扰模式，默认false
}

function funIniGroup(){
    frames = [];
	frames.push( { 
        name: 'news', 
        url: '../public/bd/news.html', 
        bounces:true
    } )
    frames.push( { 
        name: 'application', 
        url: '../public/bd/application.html', 
        bounces:true
    } )
    frames.push( { 
        name: 'phoneBook',
        url: '../official/hr/phoneBook.html', 
        bounces:false,
        pageParam:{
        	name:"index",
        	id:0,//此id无用，纯属占位,
        	type:'index_group'
        }
    } )
    frames.push( { 
        name: 'mine', 
        url: '../public/sys/mine.html', 
        bounces:false
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
	    	if(localStorage.index==1){
		    	api.setFrameGroupIndex({
			        name: 'group',
			        index: 1
		    	});
		    	randomSwitchBtn($api.dom('#tabbar2'));
		    	localStorage.index=0;
	    	}	
    	}
    });
}

// 随意切换按钮
var current_index;//当前切换下标，主要是用来处理个人中心切换高度bug
function randomSwitchBtn( tag ) {
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
    if(index>1){
		index--;
	}
	//判断为通讯录页面解锁侧滑功能
	if(index == 2){
		api.unlockSlidPane();
	}else{//其余页面进行锁定
		api.lockSlidPane();
	}
	//判断为个人中心页面去掉头部
	if(index == 3){
		var userAgent = navigator.userAgent;
		var android_index = userAgent.indexOf("Android");
		var androidVersion;
		if(android_index >= 0){  
			androidVersion = parseFloat(userAgent.slice(android_index+8)); 
		}
	   api.setFrameGroupAttr({
            name: 'group',
            rect:{
            	x:0,
                y:0,
                h: current_index==3?$api.dom('#main').offsetHeight:$api.dom('#main').offsetHeight+(androidVersion<4.4?45:70),
                w: api.winWidth
            }
        });
	   $("header").hide();
	   current_index=index;
	}else{
		current_index=0;
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
	}
    api.setFrameGroupIndex({
        name: 'group',
        index: index
    });
}

//打来新页面
function openBdWin(winName){
	api.openFrame({
	    name: winName,
	    url: '../public/bd/'+winName+'.html',
	    bgColor:"rgba(0,0,0,0.6)",
	    animation:{
	    	type:"movein",                //动画类型（详见动画类型常量）
		    subType:"from_top"       //动画子类型（详见动画子类型常量）
	    }
    });
}
//打来新页面
function openBdWin1(winName){
	api.openWin({
	    name: winName,
	    url: '../public/bd/header/'+winName+'.html',
    });
}
//创建讨论组选择人员
function selectPersonnel(){
    $("#add_chat").hide();
    $("#title").html("选择人");
    $("#confirm,#back").removeClass("di-n");
    api.execScript({
        frameName:'phoneBook',
        script: 'chatgroup();'
    });
}

//确认选择人
function confirmChoice(){
    api.execScript({
        frameName:'phoneBook',
        script: 'confirmChoice()'
    });
}

//联系人选择后赋值
function evaluate(id,staff_name,staff_no,staff_url){
	nameList = staff_name+","+localStorage.user_name;//用户名，字符串逗号分隔类型，直接赋值
	staff_no = staff_no+","+localStorage.user_id;
	userIdList = staff_no.split(",");//用户编号，需要将用户编号分割成数组
	createDiscussion();//创建讨论组
}

//打开群聊天页面
function openNewWin(winName,targetId,conversationType){
    api.openWin({
        name: winName,
        url: '../official/com/header/'+winName+'.html',
        pageParam:{
            "targetId":targetId,
            "conversationType":conversationType
        }
    });
}

//返回
function goBlack(){
    $("#add_chat").show();
    $("#title").html("通讯录");
    $("#confirm,#back").addClass("di-n");
    api.execScript({
        frameName:'phoneBook',
        script: 'hideinput()'
    });    
}

function exec(){
	location.reload();
}
