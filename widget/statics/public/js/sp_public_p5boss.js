//rem布局js
(function (doc, win) {
	var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
	        var clientWidth = docEl.clientWidth;
	        if (!clientWidth) return;
	        if(clientWidth>=750){
	            docEl.style.fontSize = '40px';
	        }else{
	            docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
	        }
	    };
	
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);


//判断手机系统及版本号调整header高度
userAgent();
function userAgent(){  
	var userAgent = navigator.userAgent;
	var index = userAgent.indexOf("Android");
	if(index >= 0){  
		var androidVersion = parseFloat(userAgent.slice(index+8)); 
		if(androidVersion<4.4){  
		// 版本小于4.4的事情 
			$("header").removeClass("pt-25");
			return true;
		}
	}  
};

//加载信息等待
function showProgress(){
	api.showProgress({
	    style: 'default',
	    animationType: 'fade',
	    title: '努力加载中...',
	    text: '先喝杯茶...',
	    modal: false
	});
}

/*--------------------------------------------------------------------------------------------*/

//监听返回键退出程序
function listenKeyback(){
	api.addEventListener({
	    name: 'keyback'
	}, function(ret, err){
		api.closeWidget(); //退出程序
	});
}

/*---------------------------------------------------------------------------------------*/

//广播键盘打开关闭状态，配合监听来使用
function sendEventKeyboardIsOpen(){
	var initBodyHeight = $(window).height();
    var keyBoardStatus = false;
    var getKeyBoardStatus = function(){
        setTimeout(function(){
            if(initBodyHeight != $(window).height() && keyBoardStatus == false){
                keyBoardStatus = true;
                api.sendEvent({
                    name: 'keyBoardOpen'
                });
                getKeyBoardStatus();
                return false;
            }
            if(initBodyHeight == $(window).height() && keyBoardStatus == true){
                keyBoardStatus = false;
                api.sendEvent({
                    name: 'keyBoardClose'
                });
                getKeyBoardStatus();
                return false;
            }
            getKeyBoardStatus();
        },150);
    }
    getKeyBoardStatus();
}

function checkPhone(phone){
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    } 
}

/*-------------------------------------------------------------------------------------------------*/
//获取验证码倒计时
function getVerifyCode(fun_name){
	//jquery验证手机号码 
	if ($("#mobile").val() == "") {
        api.toast({msg: ret.msg ,duration:3000,location: 'top'});
		return false; 
	} 
	if (!$("#mobile").val().match(/^1[3|4|5|8][0-9]\d{4,8}$/)) { 
		api.toast({msg: '手机号码格式不正确' ,duration:3000,location: 'top'});
		return false;
	}
	f_timeout(fun_name); 
	$('#code_div').attr("onclick", ""); 
}  
function f_timeout(fun_name){  
     $('#code_div').html('  <lable id="timeb2"> 60 </lable>秒后重新获取 ');  
         timer = self.setInterval(addsec,1000); 
}  
function addsec(fun_name){  
	var t = $('#timeb2').html();  
	if(t > 0){  
		$('#timeb2').html(t-1);
	}else{  
	    window.clearInterval(timer);  
	    $('#code_div').attr("onclick", fun_name+"()"); 
	  	$('#code_div').html("获取验证码");  
 	}  
}
/*end*/

/*--------------------------------------------------------------------------------------*/

//验证邮箱
function verifyMail(email){
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //验证邮箱的正则表达式
	if(!reg.test(email))
	{
	    api.toast({msg: '邮箱格式不对' ,duration:3000,location: 'top'});
	    return true;
	}
}

//验证手机号
function verifyPhone(phone){
	if (!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
        api.toast({msg: '手机号码格式不正确' ,duration:3000,location: 'top'});
		return false;
	}else{
		return true;
	}
}

//验证网址
function veifyurl(cust_url){
	var regUrl =/^(http(s)?:\/\/)?(www\.)?[\w-]+\.\w{2,4}(\/)?$/;   
    var result = cust_url.match(regUrl);   
    if(result==null){
    	api.toast({msg: '网址输入不正确' ,duration:3000,location: 'top'});
    	return false
    }   
}
/*-------------------------------------------------------------------------------------------------*/

//上传图片js开始
//选择上传证件照
function uploudPhoto(type_i,type_img){
	//修改裁剪确定按钮事件
	$("#saveImage").attr("onclick","saveImage(\""+type_i+"\",\""+type_img+"\")");
	
	//打开底部菜单
	api.actionSheet({
	    buttons: ['拍照','相册']
	},function( ret, err ){
	    if(ret.buttonIndex == 1){
	    	getPicture('camera',type_img);
	    }else if(ret.buttonIndex == 2){
	    	getPicture('library',type_img);
	    }
	});
}
var FNImageClip;
//获取照片及裁剪
function getPicture(type,type_img){
	api.getPicture({
	    sourceType: type,
	    encodingType: 'jpg',
	    mediaValue: 'pic',
	    destinationType: 'url',
	    allowEdit: true,
	    quality: 50,
	    saveToPhotoAlbum: false
	}, function( ret, err ){ 
	    if( ret ){
	    	if(ret.data == "")
	    		return;
	    	$("#imageClip_top").show();//显示裁剪区域头部
	        /*通过相册获取图片路径*/
			var x = api.winWidth/2-150;
	        var y = api.winHeight/2-200;
	       	var w = 300;
	       	var h = 300;
	       	if(type_img != "photo"){
	       		y = api.winHeight/2-150;
	       		w = 300;
	       		h = 200;
	       	}
	       	FNImageClip = api.require('FNImageClip');
	       	FNImageClip.open({
	            rect: {
	                x: 0,
	                y: 40,
	                w: api.winWidth,
	                h: api.frameHeight
	            },
	            srcPath: ret.data,
	            style: {
	                mask: 'rgba(0,0,0,.8)',
	                clip: {
	                    w: w,
	                    h: h,
	                    x: x,
	                    y: y,
	                    borderColor: '#0f0',
	                    borderWidth: 1,
	                    appearance: 'rectangle'
	                }
	            },
	            mode:"image",
	            fixedOn:api.frameName
	        });
	    }
	});
}
//保存裁剪后图片
function saveImage(type_i,type_img){
	FNImageClip.save({
		destPath: 'fs://imageClip/result.png'
    },function(ret, err){        
        if(ret) {
        	cutUploud(ret.destPath);
            $("#"+type_i).hide();//隐藏对应i字体
        	$("#"+type_img).show();//显示图片
	        $("#"+type_img).attr("src",ret.destPath);//图片链接赋值
	        if($("#"+type_img).is("img")==false){
	        	$("#"+type_img).html("<img class='aui-img-object aui-pull-left' width='50px' height='50px' src=\""+ret.destPath+"\"/>");
	        	$("#photo").children("div").removeClass("mr-15");
    			$("#photo").children("img").addClass("bor-ra-100b");
	        }
	        closeImageClip();//关闭裁剪器
        }
    });
}
//关闭裁器
function closeImageClip(){
	FNImageClip = api.require('FNImageClip');
	FNImageClip.close();
	$("#imageClip_top").hide();//隐藏裁剪区域头部
}
//上传图片js结束

/*-----------------------------------------------------------------------------*/

//信鸽推送
var tencentPush;
//注册信鸽推送
function registerPush(){
	tencentPush = api.require('tencentPush');
	// 注册设备并绑定用户账号
	var resultCallback = function(ret, err){
	    if(ret.status){
//	        alert("注册成功，token为："+ret.token);
	    }
	};
	
	// 需要绑定的账号，若为"*"表示解除之前的账号绑定
	var params = {account:localStorage.user_id};
	tencentPush.registerPush(params, resultCallback);
}
function openTencentPush(){
	//监听状态栏点击
	api.addEventListener({
    	name:'appintent'
	},function(ret,err){
	    if(api.systemType == 'ios'){
	        //var customCotent = JSON.parse(ret.appParam["tag.tpush.NOTIFIC"].substring(ret.appParam["tag.tpush.NOTIFIC"].indexOf("{"),ret.appParam["tag.tpush.NOTIFIC"].indexOf("}")+1));
	        
	        //openPushNewWin(customCotent.winName,customCotent.id);
	    } else {
//	    alert(JSON.stringify(ret.appParam));
//	    alert(ret.appParam["tag.tpush.NOTIFIC"])
//	       var customCotent = JSON.parse(ret.appParam["tag.tpush.NOTIFIC"].substring(ret.appParam["tag.tpush.NOTIFIC"].indexOf("{"),ret.appParam["tag.tpush.NOTIFIC"].indexOf("}")+1));
//	        
//	       openPushNewWin(customCotent.winName,customCotent.id);
	    }
	
	});
}

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


// 反注册设备
function unregisterPush(){
	var tencentPush = api.require('tencentPush');
	var resultCallback = function(ret, err){
	};
	tencentPush.unregisterPush(resultCallback);
}
/*---------------------------------------------------------------------------------*/

//tab页签切换
var tab_id = "tab1";
function openTab() {
    api.parseTapmode();
    var demo1 = $api.domAll("#tabBox2 li");
    for(var i in demo1){
        $api.addEvt(demo1[i], 'click', function(){
            $api.removeCls($api.dom("#tabBox2 li.tabBox2-active"),'tabBox2-active');
            $api.addCls(this,'tabBox2-active');
       		$api.removeCls($api.dom(".di-b"),'di-b');
       		tab_id = $(this).children().attr("name");
        	$(tab_id).addClass("di-b");
        	tab_id = tab_id.substring(1,tab_id.length);
        });
    }
}

/*-------------------------------------------------------------------*/

//下拉刷新，可在tab多页签中使用，单页面给要刷新的区域定义id为tab1
function openPullRefresh(fun){
	var pullRefresh = new auiPullToRefresh({
		callback: loadingCallback,
		textDown:'下拉刷新'
	})
	function loadingCallback(status) {
		if(status=='success'){
			setTimeout(function(){
				$("#"+tab_id).html("");
				eval(fun);//调用方法
				pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
			},1500)
		}
	}
}

//监听上拉事件
function evenScrolltobottom(fun){
	api.addEventListener({
	    name:'scrolltobottom',
	    extra:{
	        threshold:0            //设置距离底部多少距离时触发，默认值为0，数字类型
	    }
	}, function(ret, err){        
         eval(fun);//调用方法
	});
}
/*-------------------------------------------------------------------*/
//上传功能为多种情况，酌情选择方法
//精简上传功能
var file_id;//文件id
var file_path;//文file_id件链接
function cutUploud(filePath){
	var url = localStorage.url+"Api/Public/file_upload";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: { 
	        },
	    	files: {file:filePath}
	    }
    },function(ret,err){
    	if(ret){
    		obj = ret.body;
	    	api.showProgress({
			    style: 'default',
			    animationType: 'fade',
			    title: '文件上传进度',
			    text: ret.progress+"%",
			    modal: false
			});
			if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
	    	if(1==ret.status){
	    		file_id = obj.upload_id;
	    		file_path = obj.upload_path;
			}
    	}
    });
}

//上传附件方法id为追加数据容器的id
//分割路径用
//上传文件
function openUploud(id){
	//如果为ios系统只能上传图片
	if(api.systemType == "ios"){
		api.getPicture({
		    sourceType: 'library',
		    encodingType: 'jpg',
		    mediaValue: 'pic',
		    destinationType: 'url',
		    allowEdit: true,
		    quality: 50,
		    saveToPhotoAlbum: false
		}, function( ret, err ){ 
		    if( ret ){
		    	if(ret.data == "")
		    		return;
		    		
		    	//文件名
				var file_name="";
			 	var path=ret.data.split("/");
			 	for(var i=0;i<path.length;i++){
			 		file_name=path[i];
			 	}
			 	var img=upold_img(ret.data);
			 	var url = localStorage.url+"/index.php/Api/Public/file_upload";
				api.ajax({
				    url:url,
				    method: 'post',
				    timeout: 100,
				    report: true,
				    data: {//传输参数
				    	values: { 
				        },
				    	files: {file:ret.data}
				    }
			    },function(ret,err){
			    	if(ret){
			    		obj = ret.body;
				    	api.showProgress({
						    style: 'default',
						    animationType: 'fade',
						    title: '文件上传进度',
						    text: ret.progress+"%",
						    modal: false
						});
						if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
				    	if(obj.status==1){
				    		$("#"+id).append(
					    		'<div class="num_fujian b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em po-re">'+
									'<div class="pull-left pr-12em">'+
										'<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
									'</div>'+
									'<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
									'<div class="pull-left">'+
										'<p class="f-15em color-b3">'+file_name.substring(file_name.length-20,file_name.length)+
										
										'</p>'+
		//								'<p class="f-12em color-b3">1.54 MB</p>'+
									'</div>'+
									'<span class="po-ab top-50b right-0 mt-6mem pr-20em color-ff3032 f-12em lh-12em" onclick="javascript:$(this).parent().remove();del_upload_info(\''+id+'\','+obj.upload_id+')">删除</span>'+
								'</div>'
//				    		  '<li class="aui-list-view-cell">'+
//                                  img+
//                                  '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
//                                      +file_name.substring(file_name.length-20,file_name.length)+
//                                      '<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
//                                      '<span class="aui-pull-right aui-text-danger mt-4" onclick="javascript:$(this).parent().parent().remove();del_upload_info('+obj.upload_id+')">删除</span>'+
//                                  '</span>'+
//                              '</li>'
						 	)
						 	$('#num_fujian').html($('#'+id+' div').length);		 
						}else{
							alert("文件上传失败");
						}
			    	}
			    });
		    }
		});
		return;
	}
	var fileBrowser = api.require('fileBrowser');	
	fileBrowser.open(function(ret,err){
		if(ret){
			fileBrowser.close();
			if(ret.url != "" && ret.url != null && ret.url != undefined){
				//文件名
				var file_name="";
			 	var path=ret.url.split("/");
			 	for(var i=0;i<path.length;i++){
			 		file_name=path[i];
			 	}
			 	var img=upold_img(ret.url);
			 	var url = localStorage.url+"/index.php/Api/Public/file_upload";
				api.ajax({
				    url:url,
				    method: 'post',
				    timeout: 100,
				    report: true,
				    data: {//传输参数
				    	values: { 
				        },
				    	files: {file:ret.url}
				    }
			    },function(ret,err){
			    	if(ret){
			    		obj = ret.body;
				    	api.showProgress({
						    style: 'default',
						    animationType: 'fade',
						    title: '文件上传进度',
						    text: ret.progress+"%",
						    modal: false
						});
						if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
				    	if(obj.status==1){
				    		$("#"+id).append(
						        '<div class="num_fujian b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em po-re">'+
									'<div class="pull-left pr-12em">'+
										'<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
									'</div>'+
									'<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
									'<div class="pull-left">'+
										'<p class="f-15em color-b3">'+file_name.substring(file_name.length-20,file_name.length)+'</p>'+
		//								'<p class="f-12em color-b3">1.54 MB</p>'+
									'</div>'+
									'<span class="po-ab top-50b right-0 mt-6mem pr-20em color-ff3032 f-12em lh-12em" onclick="javascript:$(this).parent().remove();del_upload_info(\''+id+'\','+obj.upload_id+')">删除</span>'+
								'</div>'
						 	);
						 	$('#num').html($('#'+id+' .num_fujian').length);		 	
						}
			    	}
			    });
			}
	    }
	});
}	

//删除上传文件
function del_upload_info(id,upload_id){
	var url = localStorage.url+"/index.php/Api/Public/del_upload_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: { 
	    		"upload_id":upload_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
        		if($('#num').length==1&&$('#num_fujian').length==0){
        			$('#num').html($("#"+id).find('li').length);
        		}else if($('#num').length==0&&$('#num_fujian').length==1){
        			$('#num_fujian').html(($("#"+id).find('div').length));
        		}else if($('#num').length==1&&$('#num_fujian').length==1){
        			$('#num').html($("#"+id).find('li').length);
        			$('#num_fujian').html($("#"+id).find('div').length);
        		}
    		}else{
    			api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

/*-------------------------------------------------------------------*/
//下载文件
function openEnqueue(file_path){
	var file_name = file_path.split("/");
	var downloadManager = api.require('downloadManager');
	downloadManager.enqueue({
	    url: file_path,
	    savePath: 'fs://download/'+file_name[file_name.length-1],
	    cache: true,
	    allowResume: true,
	    title: file_name[file_name.length-1],
	    networkTypes: 'all'
	}, function(ret, err){        
	    if( ret ){
			openManagerView();
	    }else{
	        alert("下载失败");
	    }
	});
}

//打开下载管理
function openManagerView(){
    var downloadManager = api.require('downloadManager');
    downloadManager.openManagerView({
        title: '下载管理'
    }, function(ret, err){ 
        if( ret ){
            if(ret.id){
                downloadManager.openDownloadedFile({
                    id: ret.id
                }, function(ret, err){        
                });
            }
        }else{
        }
    });
}
/*---------------------------------------------------------------------------------------------------------*/

//日期转换星期调用方式var birthDay = getDay('2016-06-26');
function getDay(date) {
	var ar = new Array();
	ar[0] = "星期天";
	ar[1] = "星期一";
	ar[2] = "星期二";
	ar[3] = "星期三";
	ar[4] = "星期四";
	ar[5] = "星期五";
	ar[6] = "星期六";
	var birthDay = new Date(date);
	var day = birthDay.getDay();
	return ar[day];
}

/*-------------------------------------------------------------------*/
//选择联系人方法
var is_open=false;//箭头图标是否打开
//打开侧滑功能
function openSlidLayout(id,name,frameName,post_no,stats,dept_no){
//	name:数据回调页面name名
//	fameName:数据回调页面fameName名
//	id:数据追加容器id
	api.closeWin({name:'slidLayout'});
	api.openSlidLayout ({
		leftEdge:api.winWidth / 3.67,
		type: 'left',
		fixedPane: {
			name: 'phoneBook_type', 
		    url: 'widget://html/sp_com/com_pb/com_pb_phoneBook_type.html', 
		    pageParam:{
		    	"type":"choice",//用来表明选择功能,
		    }
	    },
		slidPane: {
		    name: 'phoneBook',
	        url: 'widget://html/sp_com/com_pb/com_pb_phoneBook.html',
	        pageParam:{
	        	"type":"choice",//用来表明选择功能,
	        	"name":name,
	        	"frameName":frameName,
	        	"id":id,
	        	"post_no":post_no,
	        	"dept_no":dept_no,
	        	"stats":stats
	    	}
		}
		}, function(ret, err){
			if(ret.event=="close"){
				is_open=false;
			}
			api.execScript({
				name: 'phoneBook',
	            script: 'update_arrow('+is_open+');'
            });
            is_open=true;
	});
}
/*-------------------------------------------------------------------*/
//声音提醒方法
function muisc(){
	api.startPlay({
	    path: 'widget://statics/void/121204301235515.mp3'
	});
}
/*-------------------------------------------------------------------*/
//信息震动方法
function notification(){
	api.notification({
	    vibrate: [500,500],
	    sound:false,
		}, function(ret, err){
		    if( ret ){
		         alert( JSON.stringify( ret ) );
		    }else{
		         alert( JSON.stringify( err ) );
		    }
	});
}

/*-------------------------------------------------------------------*/
//消息无打扰模式如果打开夜间模式,判断是否在夜间,如果时间为21点到6点之间返回false.
function night_time(){
	var judge_time=true;
	var time=new Date().getHours();
	if(time>21||time<6){
		judge_time=false
	}
	return judge_time;
}

/*---------------------------------------------------------------------*/
//多选滚动
var multi_obj;
function openMulti(obj,data,type){
	multi_obj = obj;
	var html = 
				'<div id="multi_bg" class="aui-content po-fix top-0 w-all h-all bg-color-black opacity-4" onclick="$(\'#multi_bg\').remove();$(\'#multi_content\').remove();"></div>'+
				'<div class="po-fix bottom-0 w-all" id="multi_content">'+
					'<div class="aui-row bg-color-gray5 h-40 lh-30 aui-border">'+
						'<div class="aui-col-xs-6 p-5"><div class="aui-btn pl-10 pr-10 pt-2 pb-2 bg-color-white bor-ra-4 hr-s-gray1 fsize-12 fcolor-99" onclick="$(\'#multi_bg\').remove();$(\'#multi_content\').remove();">取消</div></div>'+
						'<div class="aui-col-xs-6 p-5 aui-text-right"><div class="aui-btn aui-btn-info pl-10 pr-10 pt-2 pb-2 bor-ra-4 fsize-12" onclick="set_value()">确定</div></div>'+
					'</div>'+
					'<div class="aui-row bg-color-gray1">'+
						'<ul id="multi_ul" class="aui-list-view aui-col-xs-12 h-180 m-0 over-a">'+
						'</ul>'+
					'</div>'+
				'</div>';
	$("body").append(html);
	for(var i = 0; i < data.length; i++){
		$("#multi_ul").append(
			'<li class="aui-input-row">'+
				'<label class="aui-input-addon w-all aui-text-left pl-20" for="check_'+data[i].value+'">'+data[i].text+'</label>'+
        		'<input type="'+(type=="单选"?"radio":"checkbox")+'" class="aui-pull-right aui-checkbox aui-checkbox-info" name="multiCheck" id="check_'+data[i].value+'" value="'+data[i].value+'">'+
			'</li>'
		);
		var data_children = data[i].children;
		for(var j = 0; j < data_children.length; j++){
			$("#multi_ul").append(
				'<li class="aui-input-row">'+
					'<label class="aui-input-addon aui-text-left pl-35" for="check_'+data_children[j].value+'"> '+(data_children.length-1 == j?"└":"├")+' </label>'+
					'<label class="aui-input-addon w-all aui-text-left" for="check_'+data_children[j].value+'">'+data_children[j].text+'</label>'+
	        		'<input type="'+(type=="单选"?"radio":"checkbox")+'" class="aui-pull-right aui-checkbox aui-checkbox-info" name="multiCheck" id="check_'+data_children[j].value+'" value="'+data_children[j].value+'">'+
				'</li>'
			);
			if(type=="单选"){
				var children = data_children[j].children;
				for(var s=0;s<children.length;s++){
					$("#multi_ul").append(
						'<li class="aui-input-row">'+
							'<label class="aui-input-addon aui-text-left pl-50" for="check_'+children[s].value+'"> '+(children.length-1 == s?"└":"├")+' </label>'+
							'<label class="aui-input-addon w-all aui-text-left" for="check_'+children[s].value+'">'+children[s].text+'</label>'+
			        		'<input type="'+(type=="单选"?"radio":"checkbox")+'" class="aui-pull-right aui-checkbox aui-checkbox-info" name="multiCheck" id="check_'+children[s].value+'" value="'+children[s].value+'">'+
						'</li>'
					);
				}
			}
		}
	}
}
//多选赋值
function set_value(){
	var value="";
	var text="";
	$("input[name='multiCheck']:checked").each(function(){
		value+=$(this).val()+",";
		text+=$(this).prev().html()+",";
	});
	if(value != ""){
		value=value.substring(0,value.length-1);
		text=text.substring(0,text.length-1);
		$(multi_obj).val(text);
		$(multi_obj).next("input[type='hidden']").val(value);
	}
	$('#multi_bg').remove();$('#multi_content').remove();
}
/*------------------------------------------------------------------------------------------*/

//单项选择器
function openPicker($, doc,obj,field_options) {
	var field_options = field_options.split(",");
	var data = [];
	for(var i = 0; i < field_options.length; i++){
		data.push({"value":field_options[i],"text":field_options[i]});
	}
	$.init();
	$.ready(function() {
		//普通示例
		var userPicker = new $.PopPicker();
		userPicker.setData(data);
		userPicker.show(function(items) {
			jQuery(obj).val(items[0].text);
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	});
};
/*----------------------------------------------------------------------------------------------------*/

//时间选择器
function openDatePicker($,obj) {
	$.init();
	var optionsJson = obj.getAttribute('data-options') || '{}';
	var options = JSON.parse(optionsJson);
	var id = obj.getAttribute('id');
	/*
	 * 首次显示时实例化组件
	 * 示例为了简洁，将 options 放在了按钮的 dom 上
	 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
	 */
	var picker = new $.DtPicker(options);
	picker.show(function(rs) {
		/*
		 * rs.value 拼合后的 value
		 * rs.text 拼合后的 text
		 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
		 * rs.m 月，用法同年
		 * rs.d 日，用法同年
		 * rs.h 时，用法同年
		 * rs.i 分（minutes 的第二个字母），用法同年
		 */
		obj.value = rs.text;
		/* 
		 * 返回 false 可以阻止选择框的关闭
		 * return false;
		 */
		/*
		 * 释放组件资源，释放后将将不能再操作组件
		 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
		 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
		 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
		 */
		picker.dispose();
	});
};
/*-------------------------------------------------------------------------------------------*/
//过滤html标签
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉 
    str=str.replace('&lt;p&gt;','');
    str=str.replace('&lt;/p&gt;','');
    return str;
}

/*-------------------------------------------------------------------------------------------*/
//上传附件选择
function open_uploud(id){
	//选着上传类型
	api.actionSheet({
	    buttons: ['拍照','上传图片视频','上传文件']
	},function( ret, err ){
	    if(ret.buttonIndex == 1){
	    	camera(id);//拍照方法
	    }
	    else if(ret.buttonIndex == 2){
	    	openpicture(id);//调取视频图片方法
	    }else if(ret.buttonIndex == 3){
	    	openUploud(id);//调取视频图片方法
	    }
	});
}

//上传图片选择
function open_uploud_1(id){
	//选着上传类型
	api.actionSheet({
	    buttons: ['拍照','上传图片']
	},function( ret, err ){
	    if(ret.buttonIndex == 1){
	    	camera(id);//拍照方法
	    }
	    else if(ret.buttonIndex == 2){
	    	openpicture(id);//调取视频图片方法
	    }
	});
}

//上传附件选择
function open_uploud_2(id){
	//选着上传类型
	api.actionSheet({
	    buttons: ['上传附件']
	},function( ret, err ){
	    openUploud(id)
	});
}

/*-------------------------------------------------------------------------------------------*/
//调取摄像头照相
function camera(id){
	api.getPicture({
	    sourceType: 'camera',
	    encodingType: 'jpg',
	    mediaValue: 'pic',
	    destinationType: 'url',
	    allowEdit: true,
	    quality: 50,
	    saveToPhotoAlbum: false
	}, function(ret, err){ 
	    if (ret) {
	        path=ret.data;
	        api.saveMediaToAlbum({
			    path: ret.data
			}, function(ret, err){ 
			    if (ret.status) {
			    	var file_name=path;//path为获取路径
					var url = localStorage.url+"/index.php/Api/Public/file_upload";
					api.ajax({
					    url:url,
					    method: 'post',
					    timeout: 100,
					    report: true,
					    data: {//传输参数
					    	values: { 
					        },
					    	files: {file:path}
					    }
				    },function(ret,err){
				    	if(ret){
				    		obj = ret.body;
					    	api.showProgress({
							    style: 'default',
							    animationType: 'fade',
							    title: '文件上传进度',
							    text: ret.progress+"%",
							    modal: false
							});
							if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
					    	if(1==obj.status){
					    		$("#"+id).append(
					    			'<li class="pull-left pt-12em pr-15em po-re">'+
					    				'<img class="w-60em h-60em" src="'+file_name+'" alt="" />'+
					    				'<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
					    				'<i class="po-ab f-16em lh-16em p-0 top-10em right-10em iconfont bg-color-whiter color-ff3032" onclick="javascript:$(this).parent().remove();del_upload_info(\''+id+'\','+obj.upload_id+')">&#xe888;</i>'+
					    			'</li>'
							 	);
							 	$('#num').html($("#"+id+" li").length);					 	
							}
							else if(0==obj.status){
								api.toast({msg: ret.msg ,duration:3000,location: 'top'});
							}
				    	}
				    });
			    }else{
			       
			    }
			});
	    } else{
	        api.alert({msg:err.msg});
	    }
	});
} 

/*-------------------------------------------------------------------------------------------*/
//选择上传图片
function openpicture(id){
	var obj = api.require('UIMediaScanner');
	obj.open({
	    type:"all",
	    column: 4,
	    classify: true,
	    max: 1,
	    sort: {
	        key: 'time',
	        order: 'desc'
	    },
	    texts: {
	        stateText: '已选择*项',
	        cancelText: '取消',
	        finishText: '完成',
	        selectedMaxText: '每次选择*张图片！',
	    },
	    styles: {
	        bg: '#fff',
	        mark: {
	            icon: '',
	            position: 'top_right',
	            size: 20
	        },
	        nav: {
	            bg: '#000',
	            stateColor: '#fff',
	            stateSize: 18,
	            cancelBg: 'rgba(0,0,0,0)',
	            cancelColor: '#fff',
	            cancelSize: 18,
	            finishBg: 'rgba(0,0,0,0)',
	            finishColor: '#fff',
	            finishSize: 18
	        }
	    }
	}, function(ret){	
	    if(ret){		    	 	   
	    	//支持多文件上传的方法
	    	for(i=0;i<ret.list.length;i++){
	    		//var file_name=ret.list[i].thumbPath;	
	    		var file_name=ret.list[i].path;//获取图片本地路径方法		    			    	 	    		
	    	    var url = localStorage.url+"/index.php/Api/Public/file_upload";
				api.ajax({
				    url:url,
				    method: 'post',
				    timeout: 100,
				    report: true,
				    data: {//传输参数
				    	values: {},
				    //	files: {file:ret.list[i].thumbPath}
				    	files: {file:ret.list[i].path}
				    }
			    },function(ret,err){
			    	if(ret){
			    		obj = ret.body;
				    	api.showProgress({
						    style: 'default',
						    animationType: 'fade',
						    title: '文件上传进度',
						    text: ret.progress+"%",
						    modal: false
						});
						if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
				    	if(obj.status==1){
				    		
						 	//id为显示的容器
				    		$("#"+id).append(
				    			'<li class="pull-left pt-12em pr-15em po-re">'+
				    				'<img class="w-60em h-60em" src="'+file_name+'" alt="" />'+
				    				'<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
				    				'<i class="po-ab f-16em lh-16em p-0 top-10em right-10em iconfont bg-color-whiter color-ff3032" onclick="javascript:$(this).parent().remove();del_upload_info(\''+id+'\','+obj.upload_id+')">&#xe888;</i>'+
				    			'</li>'
				    			
						 	);
						 	$('#num').html($("#"+id+" li").length);
						}
						else if(obj.status==0){
							api.toast({msg: ret.msg ,duration:3000,location: 'top'});
						}
			    	}
			    });
			    
			}
	  	 }
	});
}



/*--------------------------------------------------------------------------------------------*/
//上传图标显示方法 调用此方法，只返回图标样式，右边文字距离自己调
function upold_img(url){
	if(url==null){url=""};
	var img='<span class="di-ib bg-blue1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe625;</i>'+
		    '</span>';
	var path=url.split(".")
	if(path[path.length-1]=="jpg"){
		img='<span class="di-ib bg-blue1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe630;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="png"){
		img='<span class="di-ib bg-green1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe632;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="txt"){
		img='<span class="di-ib bg-yellow1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe623;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="psd"){
		img='<span class="di-ib fcolor-green2 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe633;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="dwg"){
		img='<span class="di-ib bor-ra-5 ml-30" style="background:#be85f9">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe634;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="doc"){
		img='<span class="di-ib bg-blue4 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe624;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="excel"){
		img='<span class="di-ib bg-red1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe622;;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="ppt"){
		img='<span class="di-ib bg-yellow1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe626;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="vsd"){
		img='<span class="di-ib bg-green1 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe6dc;</i>'+
		    '</span>'
	}else if(path[path.length-1]=="pdf"){
		img='<span class="di-ib be85f9 bor-ra-5 ml-30">'+
		        '<i class="iconfont fcolor-white fsize-20">&#xe62d;</i>'+
		    '</span>'
	}
	return img;
}
/*--------------------------------------------------------------------------------------------*/
var portrait="";
function get_head(url,name,stats){
    if(url!=null&&url!=""&&url!="/"){
        var isimg=url.indexOf("#");
        if(isimg == 0){
            if(stats=="mine"){
                portrait='<div class="w75 h75 aui-col-xs-4 mr-15 lh77 fcolor-white ellipsis-one bor-ra-100b text-align fsize-16 mt-10" style="background:'+url+'">'+name.substring(name.length-2,name.length)+'</div>';
                return portrait
            }else{
                portrait='<div class="w-50 h-50 aui-col-xs-4 mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-16" style="background:'+url+'">'+name.substring(name.length-2,name.length)+'</div>';
                return portrait
            }
        }else if(isimg == -1){
            if(stats=="mine"){
                 portrait="<img class='aui-img-object aui-pull-left' width='75px' height='75px' src=\""+localStorage.url+url+"\"/>";
                return portrait
            }else{
                portrait="<img class='aui-img-object aui-pull-left' width='50px' height='50px' src=\""+localStorage.url+url+"\"/>";
                return portrait
            }
        }
    }else{
        portrait='<div class="w-50 h-50 aui-col-xs-4 aui-bg-info mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-16">'+name.substring(name.length-2,name.length)+'</div>';
        return portrait
    }
    
}
/*--------------------------------------------------------------------------------------------*/
//监听文本域的高度变化
function myFunction(obj){
	if(obj.scrollHeight>104){
		$(obj).attr("style","height: "+obj.scrollHeight+"px");
	}
}
/*-------------------------------------------------------------------------------------------*/
//判断是否输入的是数字
function onlyNum(){
 	 if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
     event.returnValue=false;
}
//判断是否为数字
function testing(id,type){
	//处理输入值必须为数字
	$("#"+id).val($("#"+id).val().replace(/\D/g,''));
	if($("#"+id).val().length>11&&type=="phone")
		  $("#"+id).val($("#"+id).val().substr(0,11));
	if($("#"+id).val().length>8&&type=="tel")
		  $("#"+id).val($("#"+id).val().substr(0,8));
} 	

//根据配置文件改变头部颜色 
function changecolor(){
	$('header').addClass('headerbg');
}

//清除null字眼---------------------------------------------------------------------------------------
function clearNull(field,content){
	if(field&&field!='null'){
		return field;
	}else{
		return content;
	}
}

//标题或内容文字截取-------------------------------------------------------------------------------------------
function InterceptField(field,contnet,num){
	if(field&&field!='null'){
		if(field.length>num){
			field = removeHTMLTag(field).substring(0,(num-1))+'...';
			return field
		}else{
			return field
		}
	}else{
		return contnet
	}
}

//公共banner接口-----------------------------------------
function getBdBannerList(id,num,type){//id: 添加图片的盒子id; num: 模块对应banner编号; type: 显示多张轮播还是单张展示（1:、为轮播;其他、为单张）;
	var url = localStorage.url+"/index.php/Api/Publicize/get_bd_banner_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"location_id":num,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(type==1){//多张图片轮播
					if(ret.data&&ret.data.length>0){//图片列表存在并且有图片时
						for(var i=0;i<ret.data.length;i++){
							$('#'+id).append(
								'<div class="aui-slide-node bg-dark">'+
									'<img src="'+localStorage.url+ret.data[i].ad_img+'" / height="6rem" width="100%">'+
								'</div>'
							)
						}
						var slide = new auiSlide({
						    container:document.getElementById("aui-slide"),
						    // "width":300,
						    "height":200,
						    "speed":300,
						    "autoPlay": 3000, //自动播放
						    "pageShow":true,
						    "pageStyle":'dot',
						    "loop":true,
						    'dotPosition':'center',
						    
						})
						var slide3 = new auiSlide({
						    container:document.getElementById("aui-slide3"),
						    // "width":300,
						    "height":240,
						    "speed":500,
						    "autoPlay": 3000, //自动播放
						    "loop":true,
						    "pageShow":true,
						    "pageStyle":'line',
						    'dotPosition':'center'
						})
					}else{//图片列表不存在或没有图片时显示一张默认图片
						$('#'+id).append(
							'<div class="aui-slide-node bg-dark">'+
								'<img src="../../../statics/images/images_bd/bg-img_2.jpg" / height="6rem" width="100%">'+
							'</div>'
						)
					}
				}else{//单张图片展示
					if(ret.data&&ret.data.length>0){//图片列表存在并且有图片时
						$('#'+id).append(
							'<img class="w-100b h-178em di-b" src="'+localStorage.url+ret.data[0]+'" />'
						)
					}else{//图片列表不存在或没有图片时显示一张默认图片
						$('#'+id).append(
							'<img class="w-100b h-178em di-b" src="../../../statics/images/images_hr/hr_shijiuda.png" />'
						)
					}
				}
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
			if(type==1){
				$('#'+id).append(
					'<div class="aui-slide-node bg-dark">'+
						'<img src="../../../statics/images/images_bd/bg-img_2.jpg" / height="6rem" width="100%">'+
					'</div>'
				)
			}else{
				$('#'+id).append(
					'<img class="w-100b h-178em di-b" src="../../../statics/images/images_hr/hr_shijiuda.png" />'
				)
			}
		}
	});
}

//1秒内不能重复点击公共方法
var isclick = true;
function check() {    
	if (isclick){        
	isclick = false;        
	setTimeout(function() {            
		isclick = true;        
	},1000);    
	} else {
		alert("请不要重复点击");		
		return false;
	}
}
