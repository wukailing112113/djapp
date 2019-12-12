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
        name: 'project_tracking', 
        url: '../official/pms/project_tracking.html', 
        bounces:true
    } )
    frames.push( { 
        name: 'bug_add', 
        url: '../official/pms/bug_add.html', 
        bounces:false,
        pageParam:{
        	cust:'cust'
        }
    } )
    frames.push( { 
        name: 'bug_list',
        url: '../official/pms/bug_list.html', 
        bounces:false,
        pageParam:{
        	cust:'cust'
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
        preload:3,
        frames: frames
    }, function (ret, err) {
    	if(ret){
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
    if(index==1){
    	api.execScript({
	    frameName: 'bug_add',
	    script:'hide_add();'
		});
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

function set_bug(){
	api.execScript({
	    frameName: 'bug_add',
	    script:'save_project_bug_info();'
	});
}
