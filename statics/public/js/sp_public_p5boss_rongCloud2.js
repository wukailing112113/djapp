/*
 
 * 森普公司党建项目公共融云方法
 * 
 * 
 * 会话类型
 * PRIVATE （单聊）
 * DISCUSSION （讨论组）
 * GROUP （群组）
 * CHATROOM（聊天室）
 * CUSTOMER_SERVICE （客服）
 * SYSTEM （系统）
 * 
 * */
var publicRong = {}
	
publicRong = {
	userId: localStorage.user_id,
	userName: '',
	userUrl: '',
	appKey: '',
	appSecret: '',
	signature: '',
	Token: '',
	nonce: Math.floor(Math.random() * 1000000),
	timestamp: Date.now(),
	init: function(){ //初始化融云 SDK
		var rong = api.require('rongCloud2');
			This = this;
		rong.init(function(ret, err) {
			if(ret.status == "success"){
				api.ajax({
				    url:localStorage.url+"/index.php/Api/Hr/get_hr_communist_info",
				    method: 'post',
				    timeout: 100,
				    data: {//传输参数
				    	values: { 
				            "communist_no": This.userId//登录人编号
				        }
				    }
			    },function(ret,err){
			    	if(ret){
			    		if(ret.status==1){
			    			This.userName = ret.data.communist_name;
			    			This.userUrl = localStorage.url+ret.data.communist_avatar;
			    			This.appKey = api.loadSecureValue({sync: true,key: "appKey"});
							This.appSecret = api.loadSecureValue({sync: true,key: "appSecret"});
							This.signature = new Hashes.SHA1().hex("" + This.appSecret + This.nonce + This.timestamp),
			    			api.ajax({
				                url:'http://api.cn.ronghub.com/user/getToken.json',
				                method: 'post',
								timeout: 100,
								headers: {
						            "RC-App-Key" : This.appKey,
						            "RC-Nonce" : "" + This.nonce,
						            "RC-Timestamp" : "" + This.timestamp,
						            "RC-Signature" : "" + This.signature,
						            "Content-Type" : "application/x-www-form-urlencoded"
						        },
								data: {//传输参数
									values: { 
										"userId": This.userId,
										"name": This.userName,
										"portraitUri": This.userUrl
									}
								}
			                },function(ret,err){
			                	if(ret){
			                		if(ret.code == '200' || ret.code == 200){
				                		This.Token = ret.token;
				                		
				                		//接收消息的监听器
				                		var rong = api.require('rongCloud2');
										    rong.setOnReceiveMessageListener(function (ret, err) {
									        if(ret.result.message){
									        	if(ret.result.message.content.extra == undefined)return;
									        	targetId = ret.result.message.targetId;
									        	conversationType = ret.result.message.conversationType;
//									    		getConversationNotificationStatus();//获取消息通知状态
									            //发送事件会话用
									            api.sendEvent({
									                name:'getNewMessage',
									                extra:{
									                    data:ret.result.message
									                }
									            })
									            //发送事件列表用
//									            api.sendEvent({
//									                name:'getNewMessageList',
//									                extra:{
//									                   data:ret.result.message
//									                }
//									            })
									            var inter = setInterval(function() { 
									            var code=1;
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
				                		
				                		
				                		//连接融云 IM 服务器
										rong.connect({token: This.Token },function(ret, err) {
											if(ret){
										    	if(ret.status == 'success'){
										    		This.userId = ret.result.userId;
										    	}
											}else{
												api.toast({msg: '连接服务器失败',duration:3000,location: 'top'});
											}
										});
									}
			                	}else{
			                		api.toast({msg: '获取Token失败',duration:3000,location: 'top'});
			                	}
			                });
			    		}
			    	}else{
				    	api.toast({msg: '获取登录人信息失败',duration:3000,location: 'top'});
			    	}
			    });					
			}else if(ret.status == 'error')
		        api.toast({ msg: err.code });
		});
		
	},
	getConversationList: function(Callback){ //获取会话
		var rong = api.require('rongCloud2');
		rong.getConversationList(function(ret, err) {
//		    api.toast({ msg: JSON.stringify(ret.result) });
		    Callback(ret.result);
		})
	},
	sendTextMessage: function(ChatObjectS,Callback){ //发送文字消息
		/*
		 * ChatObjectS = {
				conversationType: 'PRIVATE',
				targetId: '9527',
				voicePath: 'fs:///xxx/xxx/voice.amr',
				duration: 5,
				extra: ''
		 * }
		 * */
		var rong = api.require('rongCloud2');
		rong.sendTextMessage(ChatObjectS, function(ret, err) {
		    if (ret.status == 'prepare'){
//		        api.toast({ msg: JSON.stringify(ret.result.message) });
		        Callback(ret.result.message);
		    }else if (ret.status == 'success'){
//		        api.toast({ msg: ret.result.message.messageId });
		    }else if (ret.status == 'error'){
//		        api.toast({ msg: err.code });
		    }
		});
	},
	
	// 获取聊天内容
	getConversation: function(ChatObjectS,Callback){
		var rong = api.require('rongCloud2');
		rong.getConversation({
		    conversationType: ChatObjectS.conversationType,
		    targetId: ChatObjectS.targetId
		}, function(ret, err) {
//		    api.toast({ msg: JSON.stringify(ret.result) });
		    Callback(ret.result);
		})
	},
	
	//获取聊天的最新消息
	getLatestMessages: function(ChatObjectS,Callback){
		var rong = api.require('rongCloud2');
		rong.getLatestMessages(ChatObjectS, function(ret, err) {
//		    api.toast({ msg: JSON.stringify(ret.result) });
		    Callback(ret.result);
		})
	},
	
	//获取聊天历史记录
	getHistoryMessages: function(){
		var rong = api.require('rongCloud2');
		rong.getHistoryMessages({
		    conversationType: 'PRIVATE',
		    targetId: '9527',
		    oldestMessageId: 688,
		    count: 20
		}, function(ret, err) {
		    api.toast({ msg: JSON.stringify(ret.result) });
		})
	},
	
	//创建讨论组/群聊
	createDiscussion: function(ChatObjectS,Callback){
		var rong = api.require('rongCloud2');
		rong.createDiscussion(ChatObjectS, function(ret, err) {
		    if(ret.status == 'success'){
		    	Callback(ret);
			}else{
		        api.toast({ msg: err.code });
			}
		})
	},
	
	//添加一名或者一组用户加入讨论组
	addMemberToDiscussion: function(ChatObjectS,Callback){
		var rong = api.require('rongCloud2');
		rong.addMemberToDiscussion(ChatObjectS, function(ret, err) {
			if (ret.status == 'success'){
//				api.toast({ msg: JSON.stringify(ret.status) });
				Callback(ret);
			}else{
				api.toast({ msg: err.code });
			}
		})
	},
	
	//清空某一会话的聊天记录
//	clearMessages: function(ChatObjectS,Callback){
//		var rong = api.require('rongCloud2');
//		rong.clearMessages(ChatObjectS, function(ret, err) {
//			if (ret.status == 'success'){
////				api.toast({ msg: JSON.stringify(ret.status) });
//				Callback(ret);
//			}else{
//				api.toast({ msg: err.code });
//			}
//		})
//	}
}