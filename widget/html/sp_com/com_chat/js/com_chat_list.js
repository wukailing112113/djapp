
apiready = function(){
	publicRong.getConversationList(function(data){
		var SessionInfo = '';//会话详情
			SessionId = '';//会议ID
			SessionTitle = '';//会话标题
			SessionUrl = '';//会话头像
			conversationType = '',
			targetId = ''

		if(data&&data.length>0){
			for(var i=0;i<data.length;i++){
				conversationType = data[i].conversationType;
				targetId = data[i].targetId;
				if(conversationType == "PRIVATE"){
					SessionInfo = JSON.parse(data[i].latestMessage.extra);
					if(data[i].senderUserId==localStorage.user_id){
						SessionId = SessionInfo.youInfo[0];
						SessionTitle = SessionInfo.youInfo[1];
						SessionUrl = SessionInfo.youInfo[2];
					}else{
						SessionId = SessionInfo.myInfo[0];
						SessionTitle = SessionInfo.myInfo[1];
						SessionUrl = SessionInfo.myInfo[2];
					}
					$('#chatList').append(
						'<li class="over-h bb-1-df p-12em" onclick="openChatInfo(\'com_chat_header\','+SessionId+',\''+conversationType+'\','+targetId+')">'+
							'<img class="pull-left w-40em h-40em bor-ra-100b mr-12em" src="'+SessionUrl+'" alt="" />'+
							'<p class="pull-left w-298em f-16em lh-16em color-33 f-w pt-12em">'+SessionTitle+'<i class="pull-right iconfont f-14em lh-18em color-99 p-0">&#xe613;</i></p>'+
						'</li>'
					)
				}else if(conversationType == "DISCUSSION"){
					SessionId = data[i].targetld;
					SessionTitle = data[i].conversationTitle;
					SessionUrl = '../../../statics/images/images_oa/oa_img_head.png';
					$('#chatList').append(
						'<li class="over-h bb-1-df p-12em" onclick="openChatInfo(\'com_chat_header\',\'\',\''+conversationType+'\',\''+targetId+'\')">'+
							'<img class="pull-left w-40em h-40em bor-ra-100b mr-12em" src="'+SessionUrl+'" alt="" />'+
							'<p class="pull-left w-298em f-16em lh-16em color-33 f-w pt-12em">'+SessionTitle+'<i class="pull-right iconfont f-14em lh-18em color-99 p-0">&#xe613;</i></p>'+
						'</li>'
					)
				}
			}
		}
		
/*		
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
	        if(avatar_url.substring(0,1)=="#"){
	        	img="<div class='w50 h50 lh50 aui-col-xs-4 mr-15 fcolor-white ellipsis-one bor-ra-100b text-align fsize-16' style='background:"+avatar_url+"'>"+user_name.substring(user_name.length-2,user_name.length)+"</div>"
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
	   */
	});
}

//打开聊天页
function openChatInfo(winName,id,conversationType,targetId){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam: {
	    	"id": id,
	    	"conversationType": conversationType,
			"targetId": targetId
	    }
    });
}

//页面刷新
function exec(){
	window.location.reload();
}