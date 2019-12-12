var time =3;
var inter;
var timeout;
apiready = function(){
	//移除启动图标
    api.removeLaunchView({
	    animation: {
	        type: 'fade',
	        duration: 500//500原始值
	    }
	});
	//解析元素 tapmode 属性，优化点击事件处理
	api.parseTapmode();
	//异步返回结果：全局配置主路径
//	if(localStorage.url += undefined){
//		api.loadSecureValue({
//		    key:'mainLink'
//		}, function(ret, err){		
//		    localStorage.url = ret.value;
//		});
//	}
	localStorage.url = 'http://bgdj.mailinstory.com';
	install_app();
	//判断是否首次安装app
	if(localStorage.install == 1){//此时为不是首次安装本app
		
		timeout = setTimeout(function() { 
		    openNewWin();
		}, 5000);//5000原始值
		inter = setInterval("addTime()",1000*1);
		$(".aui-slide-page-wrap").remove();
	}else{
		localStorage.install = 1;//赋值为已安装状态
	}
	
}
//用于设置应用中心
function install_app(){
	if(localStorage.install_app){
		
	}else{
		localStorage.install_app=true;
		localStorage.kb='true';
		localStorage.notice='true';
		localStorage.memo='true';
		localStorage.wp='true';
		localStorage.ap='true';
		localStorage.dp='true';
		localStorage.mdtt='true';
		localStorage.num='true';
		localStorage.eaa='true';
		localStorage.dm='true';
		localStorage.vr='true';
		localStorage.raavl='true';
		localStorage.cust='true';
		localStorage.business='true';
		localStorage.communicate='true';
		localStorage.project='true';
		localStorage.bug='true';
		localStorage.sign='true';
		localStorage.up='true';
		localStorage.hall='true';
		localStorage.home='true';
		localStorage.pw='true';
		localStorage.or='true';
		localStorage.stage='true';
		localStorage.tsoa='true';
		localStorage.gas='true';
		localStorage.link='true';
		localStorage.intelligence='true';
		localStorage.report='true';
		localStorage.document='true';
		localStorage.sign_first='true';
		localStorage.myRemind='true';
		localStorage.myNotice='true';
		localStorage.myWorkPlan='true';
		localStorage.myTask='true';
		localStorage.myArrange='true';
		localStorage.myApproval='true';
	}
}
function addTime(){
	$('.close').html((time--)+"s | 跳转");
}

var slide = new auiSlide({
	container:document.getElementById("aui-slide"),
	// "width":300,
	"height":window.innerHeight,
	"speed":300,
	"pageShow":true,
	"pageStyle":'dot',
	"loop":false,
	'dotPosition':'center',
	currentPage:currentFun
})
var pageCount = slide.pageCount();
function currentFun(index) {
	var slideList = document.querySelectorAll(".aui-slide-node");
	for (var i = 0; i < slideList.length; i++) {
		if(index == i){
			var thisDiv = slideList[i].querySelector("div");
			setTimeout(function(){
				if(thisDiv.classList.contains("aui-hide")){
					thisDiv.classList.remove("aui-hide");
				}
				thisDiv.querySelector("img").classList.add("fadeInTop");
				thisDiv.querySelector(".desc").classList.add("fadeInBottom");
			}, 300)

		}
	}
}
console.log(slide.pageCount());

var is_open=false;//箭头图标是否打开
////打开侧滑功能
//function openSlidLayoutIndex(){
//	api.openSlidLayout ({
//		leftEdge:api.winWidth / 3.67,
//		type: 'left',
//		fixedPane: {
//			name: 'phoneBook_type', 
//		    url: 'html/sp_com/com_pb/com_pb_phoneBook_type.html'
//	    },
//		slidPane: {
//		    name: 'index',
//	        url: 'html/sp_bd/bd_imindex/index.html'
//		}
//		}, function(ret, err){
//			if(ret.event=="close"){
//				is_open=false;
//			}
//			api.execScript({
//				name: 'index',
//  			frameName: 'phoneBook',
//	            script: 'update_arrow('+is_open+');'
//          });
//          is_open=true;
//	});
//	api.lockSlidPane();//锁定侧滑功能
//}

//打开新页面
function openNewWin(){
	clearInterval(inter);
	clearTimeout(timeout);
	//判断是否登录状态
	if(localStorage.login == 1){
		localStorage.is_login = false;//是否走登录
		if(localStorage.pro=='index'){
//			openSlidLayoutIndex();
		}else if(localStorage.pro=='index-dj-a'||localStorage.pro=='index-dj-b'||localStorage.pro=='index-dj-c'){
			
			api.openWin({
	            name: 'index',
	            url: 'html/sp_bd/bd_index/bd_index.html'
            });
           
            
		}else{
			//根据配置进行切换程序模型
			api.loadSecureValue({
			    key:'model'
			}, function(ret, err){
			    if(ret.value == "index"){//p5产品
	//		    	api.openWin({
	//		            name: 'index_dj',
	//		            url: 'html/dangjian/index_b.html'
	//	            });
	//	            return;
			    	//侧滑打开新页面
//					openSlidLayoutIndex();
			    }else if(ret.value == "index-dj-a"||ret.value == "index-dj-b"||ret.value == "index-dj-c"){//党建a首页
			    	//alert(3);
			    	openLeft();
//			    	api.openWin({
//			            name: 'index',
//			            url: 'html/sp_bd/bd_index/bd_index.html'
//		            });
			    }
			});
		}
		return;
	}
	localStorage.is_login = true;//是否走登录
	if(localStorage.pro=='index'){
		 //员工登录
//		 alert(4)
		api.openWin({
		    name: 'login',
		    url: 'html/sp_mine/mine_personal/mine_personal_login.html'
	    });
	    return;
	}else if(localStorage.pro=='index-dj-a'||localStorage.pro=='index-dj-b'||localStorage.pro=='index-dj-c'){
//		alert(5)
		api.openWin({
		    name: 'login',
		    url: 'html/sp_mine/mine_personal/header/mine_personal_login_header.html'
	    });
	}else{
		//根据配置进行切换程序模型
		api.loadSecureValue({
		    key:'model'
		}, function(ret, err){
		    if(ret.value == "index"){//p5产品
			    //员工登录
				//alert(6)
				api.openWin({
				    name: 'login',
				    url: 'html/sp_mine/mine_personal/mine_personal_login.html'
			    });
			    return;
		    }else{
		    	//alert(7)
		    	api.openWin({
				    name: 'login',
				    url: 'html/sp_mine/mine_personal/header/mine_personal_login_header.html'
			    });
		    }
		});
	}
}



//打开左侧侧滑

function openLeft(){
	api.openSlidLayout({
		type:'left',
		slidPane:{
			name:'bd_index',
			url:'html/sp_bd/bd_index/bd_index.html',
		},
		fixedPane:{
			name:'bd_home_left',
			url:'html/sp_bd/bd_home/bd_home_left.html',
		},
	}, function(ret, err) {
		
	});
}
