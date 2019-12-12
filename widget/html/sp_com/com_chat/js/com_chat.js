
apiready = function(){
	//单聊获取个人信息
	if(api.pageParam.conversationType!='DISCUSSION'){
//		getHrCommunistInfo(localStorage.user_id);
		getHrCommunistInfo(api.pageParam.id);
	}
	getHrCommunistInfo(localStorage.user_id);
	
	openUIChatBox()//聊天输入框
	
	//获取最新消息
	publicRong.getLatestMessages({
	    conversationType: api.pageParam.conversationType,
	    targetId: api.pageParam.targetId,
	    count: 20
	},function(data){
//		alert(JSON.stringify(data));
		if(api.pageParam.conversationType=="PRIVATE"){
			for(var i=0;i<data.length;i++){
				if(JSON.parse(data[i].content.extra).myInfo[0] == localStorage.user_id){
					$('#chatList').prepend(
						'<p class="f-12em lh-12em color-99 p-15em text-align">'+(JSON.parse(data[i].content.extra).time).substring(5,(JSON.parse(data[i].content.extra).time).length)+'</p>'+
						'<div class="w-100b pr-50em po-re over-h mb-15em">'+
			    			'<div class="pull-right po-re">'+
				    			'<p class="f-18em lh-22em color-white p-12em bg-color-ff3032 mr-15em bor-ra-3">'+
				    				data[i].content.text+
				    			'</p>'+
				    			'<div class="po-ab right-1px top-13em w-20em h-20em over-h transform-yes">'+
				    				'<div class="po-ab right-9em top-0 w-20em h-20em bg-color-ff3032 transform-45"></div>'+
				    			'</div>'+
			    			'</div>'+
			    			'<img class="w-44em h-44em ml-10em po-ab right-0 top-0" src="'+JSON.parse(data[i].content.extra).myInfo[2]+'" alt="" />'+
			    		'</div>'
					)
				}else{
					$('#chatList').prepend(
						'<p class="f-12em lh-12em color-99 p-15em text-align">'+(JSON.parse(data[i].content.extra).time).substring(5,(JSON.parse(data[i].content.extra).time).length)+'</p>'+
			    		'<div class="w-100b pl-50em po-re over-h mb-15em">'+
			    			'<div class="pull-left po-re">'+
				    			'<p class="f-18em lh-22em color-33 p-12em bg-color-whiter ml-15em bor-ra-3 box-4-df mt-4px mb-4px">'+
				    				data[i].content.text+
				    			'</p>'+
				    			'<div class="po-ab left-1px top-13em w-20em h-20em over-h transform-yes">'+
				    				'<div class="po-ab left-9em top-0 w-20em h-20em bg-color-whiter box-4-df transform-45"></div>'+
				    			'</div>'+
				    		'</div>'+
			    			'<img class="w-44em h-44em mr-10em po-ab left-0 top-0" src="'+JSON.parse(data[i].content.extra).myInfo[2]+'" alt="" />'+
			    		'</div>'
					)
				}
			}
		}else if(api.pageParam.conversationType=="DISCUSSION"){
			for(var i=0;i<data.length;i++){
				if(JSON.parse(data[i].senderUserId)== localStorage.user_id){
					$('#chatList').prepend(
						'<p class="f-12em lh-12em color-99 p-15em text-align">'+(JSON.parse(data[i].content.extra).time).substring(5,(JSON.parse(data[i].content.extra).time).length)+'</p>'+
						'<div class="w-100b pr-50em po-re over-h mb-15em">'+
			    			'<div class="pull-right po-re">'+
				    			'<p class="f-18em lh-22em color-white p-12em bg-color-ff3032 mr-15em bor-ra-3">'+
				    				data[i].content.text+
				    			'</p>'+
				    			'<div class="po-ab right-1px top-13em w-20em h-20em over-h transform-yes">'+
				    				'<div class="po-ab right-9em top-0 w-20em h-20em bg-color-ff3032 transform-45"></div>'+
				    			'</div>'+
			    			'</div>'+
			    			'<img class="w-44em h-44em ml-10em po-ab right-0 top-0" src="'+JSON.parse(data[i].content.extra).myInfo[2]+'" alt="" />'+
			    		'</div>'
					)
				}else{
					$('#chatList').prepend(
						'<p class="f-12em lh-12em color-99 p-15em text-align">'+(JSON.parse(data[i].content.extra).time).substring(5,(JSON.parse(data[i].content.extra).time).length)+'</p>'+
			    		'<div class="w-100b pl-50em po-re over-h mb-15em">'+
			    			'<div class="pull-left po-re">'+
				    			'<p class="f-18em lh-22em color-33 p-12em bg-color-whiter ml-15em bor-ra-3 box-4-df mt-4px mb-4px">'+
				    				data[i].content.text+
				    			'</p>'+
				    			'<div class="po-ab left-1px top-13em w-20em h-20em over-h transform-yes">'+
				    				'<div class="po-ab left-9em top-0 w-20em h-20em bg-color-whiter box-4-df transform-45"></div>'+
				    			'</div>'+
				    		'</div>'+
			    			'<img class="w-44em h-44em mr-10em po-ab left-0 top-0" src="'+JSON.parse(data[i].content.extra).myInfo[2]+'" alt="" />'+
			    		'</div>'
					)
				}
			}
		}
		window.scrollTo(100,$("#chatList").height());
	})
	
	//监听新消息
	ListenerMessage();
	
}
var myUserId = '';
	myUserName = '';
	myUserUrl = '';
	youUserId = '';
	youUserName = '';
	youUserUrl = '';
	content_text = '';

//获取党员详情接口------------------------------------------------------------------
function getHrCommunistInfo(id){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{
		    	"communist_no":id,//党员编号
			}
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(id == localStorage.user_id){
    				myUserId = id;
					myUserName = ret.data.communist_name;
					myUserUrl = localStorage.url+ret.data.communist_avatar;
    			}else{
    				youUserId = id;
					youUserName = ret.data.communist_name;
					youUserUrl = localStorage.url+ret.data.communist_avatar;
    			}
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

if($('.transform-yes div').css('transform')=='none'){
	$('.transform-yes').addClass('di-n');
}

//发送事件
function sendmessage(){
	var chatDate = 	CurentTime();
	publicRong.sendTextMessage({
		conversationType: (api.pageParam.conversationType!=undefined?api.pageParam.conversationType:'PRIVATE'),
		targetId: (api.pageParam.targetId!=undefined?api.pageParam.targetId:api.pageParam.id),
		text: content_text,
		extra: {
			time: chatDate,
			myInfo: [myUserId,myUserName,myUserUrl],
			youInfo: [youUserId,youUserName,youUserUrl]
		}
	},function(data){
		$('#chatList').append(
			'<p class="f-12em lh-12em color-99 p-15em text-align">'+(JSON.parse(data.content.extra).time).substring(5,(JSON.parse(data.content.extra).time).length)+'</p>'+
			'<div class="w-100b pr-50em po-re over-h mb-15em">'+
    			'<div class="pull-right po-re">'+
	    			'<p class="f-18em lh-22em color-white p-12em bg-color-ff3032 mr-15em bor-ra-3">'+
	    				data.content.text+
	    			'</p>'+
	    			'<div class="po-ab right-1px top-13em w-20em h-20em over-h transform-yes">'+
	    				'<div class="po-ab right-9em top-0 w-20em h-20em bg-color-ff3032 transform-45"></div>'+
	    			'</div>'+
    			'</div>'+
    			'<img class="w-44em h-44em ml-10em po-ab right-0 top-0" src="'+myUserUrl+'" alt="" />'+
    		'</div>'
		)
		
		window.scrollTo(100,$("#chatList").height());
	})
}

//监听收到新消息写入
function ListenerMessage(){
    api.addEventListener({
        name:'getNewMessage'
    },function(ret){
        if(ret && ret.value){
//      alert(JSON.stringify(ret.value.data));
            //监听成功
            var newMessageData = ret.value.data;
            var avatar_url;//用户头像
			var json;//json字符串数据
			var user_list;//返回的发起人，接收人用户信息
            //根据targetId和当前会话用户id判断一下，如果相等则写入
            if(api.pageParam.targetId == newMessageData.targetId){
            	//备用字段不为undefined
            	if(newMessageData.content.extra != undefined){
            		json = newMessageData.content.extra;
            		user_list = JSON.parse(json);
            		avatar_url = user_list.sender_avatar_url;
            		sender_user_name = user_list.sender_user_name;
            	}
            	$("#chatList").append(
	            	'<p class="f-12em lh-12em color-99 p-15em text-align">'+(JSON.parse(json).time).substring(5,(JSON.parse(json).time.length))+'</p>'+
		    		'<div class="w-100b pl-50em po-re over-h mb-15em">'+
		    			'<div class="pull-left po-re">'+
			    			'<p class="f-18em lh-22em color-33 p-12em bg-color-whiter ml-15em bor-ra-3 box-4-df mt-4px mb-4px">'+
			    				newMessageData.content.text+
			    			'</p>'+
			    			'<div class="po-ab left-1px top-13em w-20em h-20em over-h transform-yes">'+
			    				'<div class="po-ab left-9em top-0 w-20em h-20em bg-color-whiter box-4-df transform-45"></div>'+
			    			'</div>'+
			    		'</div>'+
		    			'<img class="w-44em h-44em mr-10em po-ab left-0 top-0" src="../../../statics/images/images_oa/oa_img_head.png" alt="" />'+
		    		'</div>'

	            );
	            window.scrollTo(100,$("#chatList").height());
            }
        }
    })
}

//获取当前时间年-月-日 时:分:秒
function CurentTime(){ 
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        
        var clock = year + "-";
        
        if(month < 10)
            clock += "0";
        
        clock += month + "-";
        
        if(day < 10)
            clock += "0";
            
        clock += day + " ";
        
        if(hh < 10)
            clock += "0";
            
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
         
//      if (ss < 10) clock += '0'; 
//      clock += ss; 
        return(clock); 
}

//打开输入窗
function openUIChatBox(){
    var UIChatBox = api.require('UIChatBox');
    UIChatBox.open({
        placeholder: '',
        maxRows: 4,
        emotionPath: 'widget://statics/pages/images/emotion',
//      texts: {
//          recordBtn: {
//              normalTitle: '按住说话',
//              activeTitle: '松开结束'
//          },
//          sendBtn:{
//              title:'发送'
//          }
//      },
        styles: {
            inputBar: {
                borderColor: '#d9d9d9',
                bgColor: '#f2f2f2'
            },
            inputBox: {
                borderColor: '#B3B3B3',
                bgColor: '#FFFFFF'
            },
            emotionBtn: {
                normalImg: 'widget://statics/pages/images/face1.png'
            },
//          extrasBtn: {
//              normalImg: 'widget://statics/pages/images/add1.png'
//          },
            keyboardBtn: {
                normalImg: 'widget://statics/pages/images/key1.png'
            },
//          speechBtn: {
//              normalImg: 'widget://statics/pages/images/voice_normal.png'
//          },
            recordBtn: {
                normalBg: '#c4c4c4',
                activeBg: '#999999',
                color: '#000',
                size: 14
            },
            indicator: {
                target: 'both',
                color: '#c4c4c4',
                activeColor: '#9e9e9e'
            },
            sendBtn: {
                titleColor: '#fff',
                bg: '#DD5044' ,
                activeBg: '#999999',
                titleSize: 12
            }
        },
//      extras: {
//          titleSize: 10,
//          titleColor: '#a3a3a3',
//          btns: [{
//              title: '拍照',
//              normalImg: 'widget://statics/pages/images/ease_chat_takepic_normal.png',
//              activeImg: 'widget://statics/pages/images/ease_chat_takepic_pressed.png'
//          },{
//              title: '图片',
//              normalImg: 'widget://statics/pages/images/ease_chat_image_normal.png',
//              activeImg: 'widget://statics/pages/images/ease_chat_image_pressed.png'
//          },{
//              title: '位置',
//              normalImg: 'widget://statics/pages/images/ease_chat_location_normal.png',
//              activeImg: 'widget://statics/pages/images/ease_chat_location_pressed.png'
//          }
////          ,{
////              title: '视频',
////              normalImg: 'widget://statics/pages/images/em_chat_video_normal.png',
////              activeImg: 'widget://statics/pages/images/em_chat_video_pressed.png'
////          },{
////              title: '文件',
////              normalImg: 'widget://statics/pages/images/em_chat_file_normal.png',
////              activeImg: 'widget://statics/pages/images/em_chat_file_pressed.png'
////          },{
////              title: '语音电话',
////              normalImg: 'widget://statics/pages/images/em_chat_voice_call_normal.png',
////              activeImg: 'widget://statics/pages/images/em_chat_voice_call_pressed.png'
////          },{
////              title: '视频通话',
////              normalImg: 'widget://statics/pages/images/em_chat_video_call_normal.png',
////              activeImg: 'widget://statics/pages/images/em_chat_video_call_pressed.png'
////          },{
////              title: '红包',
////              normalImg: 'widget://statics/pages/images/em_chat_red_packet_normal.png',
////              activeImg: 'widget://statics/pages/images/em_chat_red_packet_pressed.png'
////          }
//          ]
//      }
    }, function(ret, err){
        if( ret ){
            if(ret.index=="0"){//拍照
               getpicture('camera')
            }else if(ret.index=="1"){//图片
               getpicture('library')
            }else if(ret.index=="2"){//位置
               getlocation();
            }
//          else if(ret.index=="3"){//视频
//              alert("此功能暂未开发，敬请期待");return;
//          }else if(ret.index=="4"){//传文件
//              alert("此功能暂未开发，敬请期待");return
//            //setfile()
//          }else if(ret.index=="5"){//语音电话
//              alert("此功能暂未开发，敬请期待");return
//          }else if(ret.index=="6"){//视频通话
//              alert("此功能暂未开发，敬请期待");return
//          }else if(ret.index=="7"){//红包
//              alert("此功能暂未开发，敬请期待");return
//          }
            else if(ret.eventType =="send"){//发送键
               content_text = ret.msg;
               sendmessage();   //融云发送信息                         
               closekeyboard() //收起键盘                   
            }
        }
    });
//  press();                     //监听按下录音按钮
//  press_cancle();              //监听松开录音按钮
//  move_out();                  //监听按下录音按钮后移出
//  move_in();                   //监听move_out 事件后，重新移入按钮区域
//  move_out_cancel()            //监听按下录音按钮后，从按钮移出并松开按钮
}

//收起键盘
function closekeyboard(){
    var UIChatBox = api.require('UIChatBox');
    UIChatBox.closeKeyboard();
}

//信息长按事件
var timeout = undefined;
var  node="";
function longpress(obj){
   node=$(obj);
    timeout = setTimeout(function() { 
        showBubbleMenu($(obj).attr("id"));

    }, 200);
}
function pressedit(obj){
    clearTimeout(timeout);
}

//编辑聊天信息
function showBubbleMenu(id){ 
        api.actionSheet({
        cancelTitle: '取消',
        buttons: ['复制','删除']
    }, function(ret, err){
        var index = ret.buttonIndex;
        if(index == 1){
               copymsg()       //复制聊天信息     
         }else if(index == 2){
               delmsg(id)  //删除信息
         }/*else if(index == 3){
               delmsg()     //删除信息
         }else if(index == 4){
               backmsg()     //撤回信息
         }*/
    });  
}

//刷新
function exec(){
	window.location.reload();
}