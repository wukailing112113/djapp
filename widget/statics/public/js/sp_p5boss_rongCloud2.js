/**
 *列表页 
 */
/*rong,token全局*/
var rong;
var token;

/*
＊融云的初始化
*/
function rongCloud(){
    //融云初始化
    rong.init(function(ret, err){
    	if (ret.status == 'success'){
    		//监听新消息
    		receiveMessageListener();
            getToken();//获取token值
			//alert('tokenvalue:'+token);
        }else{
            api.toast({ msg: err.code });
        }
    });
}


//获取token 
function getToken() {
    var callback = function(ret, err) {
        api.setPrefs({key : 'token',value : ret.token});
        //连接
	    rong.connect({
	        token: ret.token
	    },function(ret, err){
	        if(ret.status=='success'){
	            //消息列表
	            coversationList();
	        }
	    });
    };
    ajaxToRongCloud(callback);
	//alert('gettoken:'+ajaxToRongCloud());
}



function ajaxToRongCloud(callback) {
    var appKey = api.loadSecureValue({
        sync:true,
        key:'RongappKey'
    });
    var appSecret = api.loadSecureValue({
        sync:true,
        key:'RongappSecret'
    });
    //alert('appKey'+appKey+'appSecret'+appSecret);
    var nonce = Math.floor(Math.random() * 1000000);
    var timestamp = Date.now();
    var signature = new Hashes.SHA1().hex("" + "CH5R7xUT67" + nonce + timestamp);
    var url = "http://api.cn.ronghub.com/user/getToken.json";
    api.ajax({
        url : url,
        method : "post",
        headers : {
            "RC-App-Key" : 'cpj2xarlc3o5n',
            "RC-Nonce" : "" + nonce,
            "RC-Timestamp" : "" + timestamp,
            "RC-Signature" : "" + signature,
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        data : {
            values : {
                userId : localStorage.user_id,
                name : localStorage.user_name,
                portraitUri : localStorage.avatar_url
            }
        }
    }, function(ret, err) {
            if ("function" == typeof callback) {            
					//alert('token:'+ret.token);
					token=ret.token;
                    callback(ret, err)
            }
    });
}

function openRongCloud(){
    rong = api.require('rongCloud2');
    rongCloud();
    //alert('融云内部初始化');
    setCoversationList();
    //监听来自会话页面发送消息的事件
    //alert('融云内部消息获取');
    api.addEventListener({
        name:'sendMessage'
    },function(ret){
        if(ret && ret.value){
            var value = ret.value;
            if(value.sendType == "msg"){//发送文本信息
            	//alert('发送文本消息');
            	sendMessage(value.sendType,value.targetId,value.content,value.extra,value.conversationType);
            }else if(value.sendType == "voice"){//发送语音
            	sendVoiceMessage(value.sendType,value.targetId,value.voicePath,value.duration,value.extra,value.conversationType)
            }else if(value.sendType == "img"){//发送图片
            	sendImageMessage(value.sendType,value.targetId,value.imageUrl,value.extra,value.conversationType)
            }else if(value.sendType == "location"){//发送位置
            	sendLocationMessage(value.sendType,value.targetId,value.lat,value.lon,value.address,value.extra,value.conversationType)
            }
            
        }
    })
    
    //alert('融云内部初始化结束');
};



/*获取会话消息列表*/
function coversationList(){
	//alert("获取会话消息");
    //消息列表
    rong.getConversationList(function (ret, err) {
        if(ret.status=='success'){        	
            appendCoversationList(ret.result);//列表数据加载
        }
    })
}

/**
 *列表数据加载 
 */
function appendCoversationList(result){
	var user_name;//用户名
	var avatar_url;//用户头像
	var json;//json字符串数据
	var user_list;//返回的发起人，接收人用户信息
	var conter;//消息内容
	var list;//加载消息列表的容器
	var chat_msg_length=0;
	for(var i=0;i<result.length;i++){
		//判断是单聊还是群聊
		if(result[i].conversationType=="PRIVATE"){
			//alert("这是单聊");
			//先取出发信人和收信人数据
			json=result[i].latestMessage.extra;
        	user_list = JSON.parse(json);
        	//判断发起人是否为当前用户:为发起人时赋值收件人信息，为收件人时赋值发件人信息
			if(result[i].senderUserId==localStorage.user_id){
	            user_name=user_list.collect_user_name;
	            avatar_url=user_list.collect_avatar_url;
	        }else{
	        	user_name=user_list.sender_user_name;
                avatar_url=user_list.sender_avatar_url;
	        }
		}else{//群消息时的相应处理
			//alert("这是群聊");
			targetId = result[i].targetId;
			getDiscussion();
			user_name=result[i].conversationTitle;
            avatar_url="../../../statics/pages/images/group.svg";
		}
		//判断数据类型
        if(result[i].latestMessage.text!=undefined){//文字
        	conter=result[i].latestMessage.text
        }
        else if(result[i].latestMessage.imageUrl != undefined){//图片
        	conter="[图片]";
        }else if(result[i].latestMessage.poi != undefined){//位置
        	conter="[位置]";
        }else if(result[i].latestMessage.voicePath != undefined){//语音
        	conter = "[语音]";
        }else{
        	conter = "";
        }
        //判断是否置顶
        if(result[i].isTop==true){
            list=".top_chatlist";
            $("#chat_topchat").show();//消息列表页有置顶信息时时置顶栏
        }else{
            list="#chatlist";
        }
        var img=""
        if(avatar_url==""||avatar_url=="null"||avatar_url==null||avatar_url.substring(0,1)=="#"){
        	img="<img src=../../../statics/dangjian/public/image/aaaaa.jpg />"
        }else{
        	img="<img class='aui-img-object aui-pull-left "+(result[i].conversationType!="PRIVATE"?"aui-bg-info":"")+"' src="+avatar_url+" />"
        }
		//页面数据进行加载
		$(list).append(
            '<li id="'+result[i].targetId+'" class="aui-user-view-cell">'+
                '<div class="aui-swipe-handle" onclick="openNewWin(\'chat_Header\',\''+result[i].targetId+'\',\''+result[i].conversationType+'\')">'+
                    img+                                                                                    
                    '<div class="aui-img-body">'+
                        '<div class="lh-28">'+
                            '<span id="sender">'+user_name.substring(0,10)+'</span>'+
                            '<span id="sendtime" class="lh-19 aui-pull-right text-r fcolor-a3 fsize-12 w-35">'+new Date(result[i].sentTime).format("yyyy-MM-dd hh:mm").substring(11,16)+'</span>'+
                        '</div>'+                          
                        '<div id="text" class="lh-28 fcolor-65 fsize-14">'+conter+'</div>'+
                    '</div>'+ 
                    '<span id="num_'+result[i].targetId+'" class="aui-badge-info bage num2">'+result[i].unreadMessageCount+'</span>'+ 
                '</div>'+
                '<div class="aui-swipe-right-btn aui-bg-danger" onclick="removeConversation(this,\''+result[i].targetId+'\',\''+result[i].conversationType+'\')">删除</div>'+               
            '</li>'
        )        
        chat_msg_length+=result[i].unreadMessageCount;
        //当消息数为0时清除消息数容器
        if(result[i].unreadMessageCount == 0){
        	$("#num_"+result[i].targetId).css("display","none");
        }
        //消息列表页角标样式
        if(api.pageParam.targetId=="chat_list"){
            $("#num_"+result[i].targetId).removeClass("num2").addClass("num3");
            $("#num_"+result[i].targetId).removeClass("aui-badge-info").addClass("aui-badge-danger");
        }        
   }   
   //没有未读信息隐藏
   if(chat_msg_length != 0){
        $("#num_6,#top_chat").show();
   }
   $("#num_61,#num_6").html(chat_msg_length);//显示发来的未读的消息数量
}

/*
＊监听新消息
＊当有新消息传来时，利用sendEvent发出一个事件，同时传递消息内容，可以在会话页面进行一次监听接收
*/
function receiveMessageListener(){
    rong.setOnReceiveMessageListener(function (ret, err) {
        if(ret.result.message){
        	if(ret.result.message.content.extra == undefined)return;
        	targetId = ret.result.message.targetId;
        	conversationType = ret.result.message.conversationType;
    		getConversationNotificationStatus();//获取消息通知状态
            //发送事件会话用
            api.sendEvent({
                name:'getNewMessage',
                extra:{
                    data:ret.result.message
                }
            })
            //发送事件列表用
            api.sendEvent({
                name:'getNewMessageList',
                extra:{
                   data:ret.result.message
                }
            })
            var inter = setInterval(function() { 
				if(code != undefined){
					clearInterval(inter);
					//消息提示音
		            if(localStorage.voice == "true" && code == 1){
		            	api.startPlay({
					        path: "widget://statics/media/121204301235515.mp3"
					    }, function(ret, err) {
					        if (ret) {
					        	//播放完毕处理
					        }
					    });
		            }
		            //消息震动
		            if(localStorage.shock == "true" && code == 1){
		            	api.notification({
		            		vibrate:[500,500],
		            		sound: 'widget://statics/media/121204301235515.mp3',
		            		light:true,
						}, function(ret, err) {
						    var id = ret.id;
						});
		            }
				}
			},1000*1); 
        }
    })
}

/**
 *监听收到新消息修改列表消息数据 
 */

function setCoversationList(){
    api.addEventListener({
        name:'getNewMessageList'
    },function(ret){
        if(ret && ret.value){
        	$("#chatlist,.top_chatlist").html("");
        	coversationList();
        }
    })
}


/*
*发送消息的函数
＊注意要放在消息列表页，不要放在会话页面
＊在会话页面利用sendEvent发出一个发送消息的事件，在消息列表页监听
*/
/**
 *发送文字消息 
 */
function sendMessage(sendType,targetId,content,extra,conversationType){
	//alert('sendType:'+sendType+',targetId:'+targetId+',content:'+content+',extra:'+extra+',conversationType:'+conversationType);
    rong.sendTextMessage({
            conversationType: conversationType,
            targetId: targetId,
            text: content,
            extra: extra
        }, function (ret, err) {
			//alert('发送信息回调');
            if (ret.status == 'prepare'){
				//alert('发送信息进行中');
                //单聊准备发送，向会话页面发送正在发送消息事件
                api.sendEvent({
                    name:'insertSendMessage',
                    extra:{
                        data:ret.result,
                        sendType:sendType
                    }
                })
                
            }else if (ret.status == 'success'){
				//alert('发送信息成功');
                //成功后处理
				$("#chatlist,.top_chatlist").html("");
        		coversationList();
            }else if (ret.status == 'error'){
				//alert('发送信息失败'+err.code);
                //失败
                $("#message-content").append(
	                '<p class="aui-text-center history-date">发送失败</p>'+
	                '<br /><br /><br />'
	            );
            }
        }
    );
}
/**
 *发送语音消息 
 */
function sendVoiceMessage(sendType,targetId,voicePath,duration,extra,conversationType){
	rong.sendVoiceMessage({
	    conversationType: conversationType,
	    targetId: targetId,
	    voicePath: voicePath,
	    duration: duration,
	    extra: extra
	}, function(ret, err) {
	    if (ret.status == 'prepare'){
	        //单聊准备发送，向会话页面发送正在发送消息事件
            api.sendEvent({
                name:'insertSendMessage',
                extra:{
                    data:ret.result,
                    sendType:sendType
                }
            })
	    }else if (ret.status == 'success'){
	        //成功后处理
			$("#chatlist,.top_chatlist").html("");
    		coversationList();
	    }else if (ret.status == 'error'){
	    	//失败
	        api.toast({ msg: err.code });
	    }
	});
}
/*
 * 发送图片消息
 */
function sendImageMessage(sendType,targetId,imageUrl,extra,conversationType){
	rong.sendImageMessage({
	    conversationType: conversationType,
	    targetId: targetId,
	    imagePath: imageUrl,
	    extra: extra
	}, function(ret, err) {
	    if (ret.status == 'prepare'){
			//单聊准备发送，向会话页面发送正在发送消息事件
            api.sendEvent({
                name:'insertSendMessage',
                extra:{
                    data:ret.result,
                    sendType:sendType
                }
            })
	    }
	    else if (ret.status == 'progress'){
	    	//发送进度
        }
	    else if (ret.status == 'success'){
        	//成功后处理
			$("#chatlist,.top_chatlist").html("");
    		coversationList();
        }
	    else if (ret.status == 'error'){
	        api.toast({ msg: err.code });
        }
	});
}
/*
 * 发送位置消息
 */
function sendLocationMessage(sendType,targetId,lat,lon,address,extra,conversationType){
	rong.sendLocationMessage({
	    conversationType: conversationType,
	    targetId: targetId,
	    latitude: lat,
	    longitude: lon,
	    poi: address,
	    imagePath: 'fs://location.png',
	    extra: extra
	}, function(ret, err) {
	    if (ret.status == 'prepare'){
	    	//单聊准备发送，向会话页面发送正在发送消息事件
            api.sendEvent({
                name:'insertSendMessage',
                extra:{
                    data:ret.result,
                    sendType:sendType
                }
            })
	    }else if (ret.status == 'progress'){
	    	//信息发送进度
	    }else if (ret.status == 'success'){
	    	//成功后处理
			$("#chatlist,.top_chatlist").html("");
    		coversationList();
	    }else if (ret.status == 'error'){
	    	api.toast({ msg: err.code });
	    }
	});
}

/**
 *从会话列表中移除某一会话，但是不删除会话内的消息 
 */
function removeConversation(obj,targetId,conversationType){
	rong.removeConversation({
	    conversationType: conversationType,
	    targetId: targetId
	}, function(ret, err) {
		if(ret.status == "success"){
			var inter = setInterval(function() { 
				clearInterval(inter);
				$(obj).parent().remove();
			},1000*1);
		}
	})
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *会话页 
 */
var collect_user_name;//收信人名称
var collect_avatar_url;//收信人头像
var targetId;//目标id
var content//消息内容
var conversationType;//消息类型，主要区分单聊或群聊
var extra;//备用信息主要用来单聊时存放发信人和收信人的名称和头像，以json字符串类型存储
var messageId;//本地最后一条消息id
//发送聊天
function chat(sendType){
	//alert('点击发送消息');
    //向会话列表页发送消息事件
    api.sendEvent({
        name:'sendMessage',
        extra:{
        	sendType:sendType,//发送信息类型：文字，语音，图片，位置
            targetId:targetId,//目标id
            content:content,//文字内容
            voicePath:voicePath,//语音路径
            duration:duration,//语音时长
            imageUrl:imageUrl,//图片路径
            lat:lat,		//经度
            lon:lon,		//纬度
            address:address,//位置信息
            conversationType:conversationType,
            extra:extra
        }
    })
}

function openConversation(){
    //当前会话用户id和当前会话消息类型从消息列表页点击传递进来
    targetId = api.pageParam.targetId;
    conversationType = api.pageParam.conversationType;
    rong = api.require('rongCloud2');
    getLatestMessages();//获取最新消息记录
    clearMessagesUnreadStatus(conversationType,targetId);//清除某一会话的消息未读状态
	getHistoryMessages();//获取历史消息记录
    //监听发送新消息写入,这个事件主要来处理发送消息插入到会话窗口中
    api.addEventListener({
        name:'insertSendMessage'
    },function(ret){
        if(ret && ret.value){
            var newMessageData = ret.value;
            voicePath = newMessageData.data.message.content.voicePath;//语音路径
            duration = newMessageData.data.message.content.duration;//语音时长
            address = newMessageData.data.message.content.poi;//位置
            var img=""
            if(localStorage.avatar_url==""||localStorage.avatar_url=="null"||localStorage.avatar_url==null||localStorage.avatar_url.substring(0,1)=="#"){
            	img="<img src=../../../statics/dangjian/public/image/aaaaa.jpg />"
            }else{
            	img="<img src="+localStorage.avatar_url+" />"
            }
		    $("#message-content").append(
                '<div class="aui-chat-sender msg-box">'+
                	'<p class="aui-text-center history-date" style="color:#999">'+new Date().format("yyyy-MM-dd hh:mm")+'</p>'+
                    '<div class="sender aui-chat-sender-avatar">'+
                    	img+
                    '</div>'+
                    '<div class="aui-chat-sender-cont" onmousedown="longpress(this)" onmouseup="pressedit(this)">'+
                        '<div class="aui-chat-right-triangle"></div>'+
                        //'<div class="aui-chat-status">'+
                            //'<i class="aui-iconfont aui-icon-loading aui-chat-progress"></i>'+
                        //'</div>'+
                        '<span class="chatmsg">'+
                        (newMessageData.sendType=="msg"?content:
                        (newMessageData.sendType=="voice"?duration+'\"&nbsp;<img id="play_voice" src="../../../statics/pages/images/ease_chatto_voice_playing_f3.png" width="15px" alt="" onclick="playvoice(\''+voicePath+'\')"/>':
                        (newMessageData.sendType=="img"?'<img id="pic" src="'+newMessageData.data.message.content.thumbPath+'" width="100%" data-preview-src="'+newMessageData.data.message.content.imageUrl+'" data-preview-group="1"/>':
                        (newMessageData.sendType=="location"?'<img src="../../../statics/pages/images/location.png" width="100%" onclick="openNewWin(\'mapHeader\','+newMessageData.data.message.content.latitude+','+newMessageData.data.message.content.longitude+',\''+address+'\')"/><span class="po-ab bottom-20 left-15 ellipsis-one right-5">'+address+'</span>':''))))+
                        '</span>'+
                    '</div>'+
                '</div>'+
                '<br /><br /><br />'
            );
        }
    })

    //监听收到新消息写入
    api.addEventListener({
        name:'getNewMessage'
    },function(ret){
        if(ret && ret.value){
            //监听成功
            var newMessageData = ret.value.data;
            var avatar_url;//用户头像
			var json;//json字符串数据
			var user_list;//返回的发起人，接收人用户信息
            //根据targetId和当前会话用户id判断一下，如果相等则写入
            if(targetId == newMessageData.targetId){
            	//备用字段不为undefined
            	if(newMessageData.content.extra != undefined){
            		json = newMessageData.content.extra;
            		user_list = JSON.parse(json);
            		avatar_url = user_list.sender_avatar_url;
            		sender_user_name = user_list.sender_user_name;
            	}
            	var img=""
	            if(avatar_url==""||avatar_url=="null"||avatar_url==null||avatar_url.substring(0,1)=="#"){
	            	img="<img src=../../../statics/dangjian/public/image/aaaaa.jpg />"
	            }else{
	            	img="<img src="+avatar_url+" />"
	            }
            	$("#message-content").append(
	                '<div class="aui-chat-receiver msg-box">'+
	                    '<div class="receiver aui-chat-receiver-avatar">'+
	                   		img+
	                    '</div>'+
	                    '<div class="aui-chat-receiver-cont" onmousedown="longpress(this)" onmouseup="pressedit(this)">'+
	                        '<div class="aui-chat-left-triangle"></div>'+
	                        //'<div class="aui-chat-status">'+
	                            //'<i class="aui-iconfont aui-icon-loading aui-chat-progress"></i>'+
	                        //'</div>'+
	                        '<span class="chatmsg">'+
	                        (newMessageData.content.text !== undefined?newMessageData.content.text:
                            (newMessageData.content.imageUrl !== undefined?'<img id="pic" src="'+newMessageData.content.thumbPath+'" width="100%" data-preview-src="'+newMessageData.content.imageUrl+'" data-preview-group="1"/>':
                            (newMessageData.content.poi !=undefined?'<img src="../../../statics/pages/images/location.png" width="100%" onclick="openNewWin(\'mapHeader\','+newMessageData.content.latitude+','+newMessageData.content.longitude+',\''+newMessageData.content.poi+'\')"/><span class="po-ab bottom-20 left-15 ellipsis-one right-5">'+newMessageData.content.poi+'</span>':
                            '<img id="play_voice" src="../../../statics/pages/images/ease_chatto_voice_playing_f3.png" width="15px" alt="" onclick="playvoice(\''+newMessageData.content.voicePath+'\')"/>&nbsp;<span class="fcolor-white">'+newMessageData.content.duration+'\"</span>')
                            ))+
	                        '</span>'+
	                    '</div>'+
	                '</div>'+
	                '<br /><br /><br />'
	            );
	            msglocation();   //消息定位到最后一行
            }
        }
    })
};

//获取会话的最新消息记录
function getLatestMessages(){
	var user_name;//用户名
	var avatar_url;//用户头像
	var json;//json字符串数据
	var user_list;//返回的发起人，接收人用户信息
	var conter;//消息内容
    rong.getLatestMessages({
            conversationType: conversationType,
            targetId: targetId,
            count: 10
        }, function (ret, err) {
            if(ret.status == "success"){
            	for(var i=0;i<ret.result.length;i++){
            		messageId = ret.result[i].messageId;//最后一条本地消息id
                    //判断是否有extra这个字段
                	if(ret.result[i].content.extra != undefined){
                        json=ret.result[i].content.extra;
                        user_list = JSON.parse(json);
                        //判断发件人是否为当前用户，赋值对应数据
                        user_name=user_list.sender_user_name;
                        avatar_url=user_list.sender_avatar_url;
                        var img="";
                        //alert(avatar_url+";"+avatar_url.length);
			            if(avatar_url=="null"||avatar_url==""||avatar_url.substring(0,1)=="#"){
			            	img="<img src=../../../statics/dangjian/public/image/aaaaa.jpg />"
			            }else{
			            	img="<img src="+avatar_url+" />"
			            }
                        //消息展示
                        $("#message-content").prepend(
                        	
                        	'<div class="'+(ret.result[i].senderUserId==localStorage.user_id?"aui-chat-sender":"aui-chat-receiver")+' msg-box">'+
                        		'<p class="aui-text-center history-date" style="color:#999">'+new Date(ret.result[i].sentTime).format("yyyy-MM-dd hh:mm")+'</p>'+
                            	'<div class="'+(ret.result[i].senderUserId==localStorage.user_id?"sender aui-chat-sender-avatar":"receiver aui-chat-receiver-avatar")+'">'+
                            		img+
                            	'</div>'+
                            	'<div class="'+(ret.result[i].senderUserId==localStorage.user_id?"aui-chat-sender-cont":"aui-chat-receiver-cont")+'" id="'+messageId+'" onmousedown="longpress(this)" onmouseup="pressedit(this)">'+
                                    '<div class="aui-chat-'+(ret.result[i].senderUserId==localStorage.user_id?"right":"left")+'-triangle"></div>'+
                                    '<span class="chatmsg">'+
                                    (ret.result[i].content.text !== undefined?ret.result[i].content.text:
                                    (ret.result[i].content.imageUrl !== undefined?'<img id="pic" src="'+ret.result[i].content.thumbPath+'" width="100%" data-preview-src="'+ret.result[i].content.imageUrl+'" data-preview-group="1"/>':
                                    (ret.result[i].content.poi !== undefined?'<img src="../../../statics/pages/images/location.png" width="100%" onclick="openNewWin(\'mapHeader\','+ret.result[i].content.latitude+','+ret.result[i].content.longitude+',\''+ret.result[i].content.poi+'\')"/><span class="po-ab bottom-20 left-15 ellipsis-one right-5 fcolor-white">'+ret.result[i].content.poi+'</span>':
									(ret.result[i].senderUserId==localStorage.user_id?ret.result[i].content.duration+'"&nbsp;':'')+
                                    '<img id="play_voice" width="15px" src="'+(ret.result[i].senderUserId==localStorage.user_id?"../../../statics/pages/images/ease_chatto_voice_playing_f3.png":"../../../statics/pages/images/ease_chatfrom_voice_playing_f3.png")+'"  alt="" onclick="playvoice(\''+ret.result[i].content.voicePath+'\')"/>'+
                                    (ret.result[i].senderUserId!=localStorage.user_id?'<span class="fcolor-99">&nbsp;'+ret.result[i].content.duration+'"</span>':'')
                                    )))+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                            '<br /><br /><br />'                        
                        )
                    }
				}
				msglocation();   //消息定位到最后一行
            } 
	})
}

/**
 *获取某一会话的历史消息记录 
 */
var status = false;//此方法因下拉加载会默认执行，顾将状态为false，下面将状态修改为true后才可执行加载数据
function getHistoryMessages(){
	var user_name;//用户名
	var avatar_url;//用户头像
	var json;//json字符串数据
	var user_list;//返回的发起人，接收人用户信息
	var conter;//消息内容
	if(status=="true"){
		// 之前调用 init 和 connect 的代码省略
		rong.getHistoryMessages({
		    conversationType: conversationType,
		    targetId: targetId,
		    oldestMessageId: messageId,
		    count: 10
		}, function(ret, err) {
		    if(ret.status == "success"){
            	for(var i=0;i<ret.result.length;i++){
            		messageId = ret.result[i].messageId;//最后一条本地消息id
                    //判断是否有extra这个字段
                	if(ret.result[i].content.extra != undefined){
                        json=ret.result[i].content.extra;
                        user_list = JSON.parse(json);
                        //判断发件人是否为当前用户，赋值对应数据
                        user_name=user_list.sender_user_name;
                        avatar_url=user_list.sender_avatar_url;
                        var img=""
			            if(avatar_url==""||avatar_url=="null"||avatar_url==null||avatar_url.substring(0,1)=="#"){
							img="<img src=../../../statics/dangjian/public/image/aaaaa.jpg />"
			            }else{
			            	img="<img src="+avatar_url+" />"
			            }
                        //消息展示
                        $("#message-content").prepend(
                        	'<div class="'+(ret.result[i].senderUserId==localStorage.user_id?"aui-chat-sender":"aui-chat-receiver")+' msg-box">'+
                            	'<p class="aui-text-center history-date" style="color:#999">'+new Date(ret.result[i].sentTime).format("yyyy-MM-dd hh:mm")+'</p>'+
                            	'<div class="'+(ret.result[i].senderUserId==localStorage.user_id?"sender aui-chat-sender-avatar":"receiver aui-chat-receiver-avatar")+'">'+
                            		img+
                            	'</div>'+
                            	'<div class="'+(ret.result[i].senderUserId==localStorage.user_id?"aui-chat-sender-cont":"aui-chat-receiver-cont")+'" onmousedown="longpress(this)" onmouseup="pressedit(this)">'+
                                    '<div class="aui-chat-'+(ret.result[i].senderUserId==localStorage.user_id?"right":"left")+'-triangle"></div>'+
                                    '<span class="chatmsg">'+
                                    (ret.result[i].content.text !== undefined?ret.result[i].content.text:
                                    (ret.result[i].content.imageUrl !== undefined?'<img id="pic" src="'+ret.result[i].content.thumbPath+'" width="100%" data-preview-src="'+ret.result[i].content.imageUrl+'" data-preview-group="1"/>':
                                    (ret.result[i].content.poi !== undefined?'<img src="../../../statics/pages/images/location.png" width="100%" onclick="openNewWin(\'mapHeader\','+ret.result[i].content.latitude+','+ret.result[i].content.longitude+',\''+ret.result[i].content.poi+'\')"/><span class="po-ab bottom-20 left-15 ellipsis-one right-5">'+ret.result[i].content.poi+'</span>':
                                    (ret.result[i].senderUserId==localStorage.user_id?ret.result[i].content.duration+'"&nbsp;':'')+
                                    '<img id="play_voice" width="15px" src="'+(ret.result[i].senderUserId==localStorage.user_id?"../../../statics/pages/images/ease_chatto_voice_playing_f3.png":"../../../statics/pages/images/ease_chatfrom_voice_playing_f3.png")+'"  alt="" onclick="playvoice(\''+ret.result[i].content.voicePath+'\')"/>'+
                                    (ret.result[i].senderUserId!=localStorage.user_id?'<span class="fcolor-99">&nbsp;'+ret.result[i].content.duration+'"</span>':'')
                                    )))+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                            '<br /><br /><br />'                        
                        )
                    }
				}
            }
		})
	}
	status = true;
}

/**
 *清除某一会话的消息未读状态 
 */
function clearMessagesUnreadStatus(conversationType,targetId){
	// 之前调用 init 和 connect 的代码省略
	rong.clearMessagesUnreadStatus({
	    conversationType: conversationType,
	    targetId: targetId
	}, function(ret, err) {
	    api.execScript({
	    	name:"index",
	    	frameName:"news",
	        script: 'exec();'
        });
        api.execScript({
	    	name:"chat_listHeader",
	    	frameName:"chat_list",
	        script: 'exec();'
        });
	})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *讨论组聊天功能 
 */
var discussionId;//讨论组id
var nameList;//讨论组成员名称，字符串逗号拼接
var userIdList;//讨论组成员id，数组集合
//创建讨论组
function createDiscussion(){
	rong = api.require('rongCloud2');
	rong.createDiscussion({
	    name: nameList,
	    userIdList: userIdList
	}, function(ret, err) {
	    if (ret.status == 'success'){
	    	openNewWin('chat_Header',ret.result.discussionId,'DISCUSSION');//创建讨论组成功后进入会话界面
	    }else{
	        api.toast({ msg: err.code });
	    }
	})
}

/**
 *获取讨论组信息 
 */
var discussionName;//讨论组名称
var memberIdList;//讨论组成员id列表
var creatorId;//讨论组创建者 Id
function getDiscussion(){
	rong.getDiscussion({
	    discussionId: targetId
	}, function(ret, err) {
	    if (ret.status == 'success'){
	    	var result = ret.result;
	    	discussionName = result.name;//讨论组名称
	    	memberIdList = result.memberIdList;//讨论组成员id列表
	    	creatorId = result.creatorId;//讨论组创建者 Id
	    }else{
	        api.toast({ msg: err.code });
	    }
	})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *会话详情 
 */
/**
 *获取某一会话的通知状态 
 */
var code;//会话通知状态；0免打扰，1提醒
function getConversationNotificationStatus(){
	rong.getConversationNotificationStatus({
	    conversationType: conversationType,
	    targetId: targetId
	}, function(ret, err) {
	    if (ret.status == 'success'){
	        code = ret.result.code;
	    }else{
	        api.toast({ msg: err.code });
        }
	})
}

/**
 *设置某一会话的通知状态 
 */
var notificationStatus;//会话通知状态
function setConversationNotificationStatus(){
	rong.setConversationNotificationStatus({
	    conversationType: conversationType,
	    targetId: targetId,
	    notificationStatus: notificationStatus
	})
}

/**
 *获取某会话信息 
 */
var isTop;//消息是否置顶
function getConversation(){
	rong.getConversation({
	    conversationType: conversationType,
	    targetId: targetId
	}, function(ret, err) {
	    isTop = ret.result.isTop;
	})
}

/**
 *设置某一会话是否置顶 
 */
function setConversationToTop(){
	rong.setConversationToTop({
	    conversationType: conversationType,
	    targetId: targetId,
	    isTop: isTop
	})
	var timeout = setTimeout(function() {
		api.execScript({
	    	name:"index",
	    	frameName:"news",
	        script: 'exec();'
	    });
	    api.execScript({
	    	name:"chat_listHeader",
	    	frameName:"chat_list",
	        script: 'exec();'
	    });
	    clearTimeout(timeout);
	}, 1000);
}

/**
 *修改讨论组名称 
 */
var setDisNameStatus;//修改讨论组成功状态
function setDiscussionName(){
	rong.setDiscussionName({
	    discussionId: targetId,
	    name: discussionName
	}, function(ret, err) {
	    if (ret.status == 'success'){
	    	setDisNameStatus = ret.status;
	    }else{
	        api.toast({ msg: err.code });
        }
	})
}

/**
 *清空某一会话的所有聊天消息记录 
 */
var clearStatus;//清理状态
function clearMessages(){
	rong.clearMessages({
	    conversationType: conversationType,
	    targetId: targetId
	}, function(ret, err) {
		if(ret.status == "success"){
			clearStatus = ret.status;
			api.toast({ msg: "清理成功" });
		}
	})
}

/**
 *添加一名或者一组用户加入讨论组 
 */
var addMemberStatus;//添加人员状态
function addMemberToDiscussion(){
	rong.addMemberToDiscussion({
	    discussionId: targetId,
	    userIdList: userIdList
	}, function(ret, err) {
	    if (ret.status == 'success'){
	    	addMemberStatus = ret.status;
	    }else
	        api.toast({ msg: err.code });
	})
}

/**
 *退出当前用户所在的某讨论组 
 */
var quitStatus;//退出状态
function quitDiscussion(){
	rong.quitDiscussion({
	    discussionId: targetId
	}, function(ret, err) {
	    if (ret.status == 'success')
	        quitStatus = ret.status;
	    else
	        api.toast({ msg: err.code });
	})
}

/**
 *删除指定的一条或者一组消息
 */
var deleteStatus;//清理状态
function deleteMessages(id){
    rong.deleteMessages({
        messageIds:[id]
    }, function(ret, err) {
        deleteStatus = ret.status;
        if(deleteStatus=="success"){
            api.toast({msg: '删除成功',duration:1000,location: 'middle'});
        }else{
            api.toast({msg: '删除失败',duration:1000,location: 'middle'});
        }
        
    })
}

/**
 *从讨论组 删除一名或者一组用户
 */
var removeMemberStatus;//添加人员状态
function removeMemberFromDiscussion(id){
    rong.removeMemberFromDiscussion({
        discussionId: targetId,
        userId: id
    }, function(ret, err) {
        removeMemberStatus = ret.status;        
        if (ret.status == 'success'){            
            api.toast({msg: '删除成功',duration:1000,location: 'middle'});           
        }            
        else{
            api.toast({msg: '删除失败',duration:1000,location: 'middle'});
            //踢人失败选择框隐藏
            api.execScript({
                name:api.winName,
                script: 'hidebtn();'
            });
            $("#msg_photo input[type='checkbox']").addClass("di-n");
        }            
    })    
}

//清空所有会话及会话消息
function clearConversations(){
	var rong = api.require('rongCloud2');
	// 之前调用 init 和 connect 的代码省略
	rong.clearConversations({
	    conversationTypes: ['PRIVATE', 'GROUP']
	}, function(ret, err) {
	    api.toast({ msg: "清理成功" });
	    api.execScript({
	    	name:"index",
	    	frameName:"news",
	        script: 'exec();'
        });
	})
}


