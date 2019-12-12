apiready = function(){
//	alert(api.pageParam.targetId);
//	获取群聊人员
	var rong = api.require('rongCloud2');
	rong.getDiscussion({
	    discussionId: api.pageParam.targetId
	}, function(ret, err) {
	    if (ret.status == 'success'){
	    	if(ret.result.memberIdList && ret.result.memberIdList.length>0){
	    		for(var i=0;i<ret.result.memberIdList.length;i++){
	    			getHrCommunistInfo(ret.result.memberIdList[i]);
	    		}
	    	}
	    	$('#Name').text(ret.result.name);
//			api.toast({ msg: JSON.stringify(ret.result.discussion) });
	    }else{
	        api.toast({ msg: err.code });
		}
	})
}


//获取人员信息   ---------------------------------------------------------------
function getHrCommunistInfo(id){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$('#list').prepend(
    				'<div class="pull-left w-25b pt-12em pb-12em text-align" name="'+id+'">'+
						'<img class="w-68em h-68em mb-10em bor-ra-100b" src="'+((ret.data.communist_avatar)?(localStorage.url+ret.data.communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
						'<p class="f-15em lh-15em color-99">'+ret.data.communist_name+'</p>'+
					'</div>'
    			)
    		}else{
    			api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//跳转新页面
function openMembersInfo(){
	api.openWin({
	    name: 'com_chat_members_info_header',
	    url: 'header/com_chat_members_info_header.html',
	    pageParam: {
	    	"targetId": api.pageParam.targetId
	    }
    });
}

//清空聊天记录   ------------------------------------------------------------------------
function clearMessages(){
	var rong = api.require('rongCloud2');
	rong.clearMessages({
	    conversationType: 'DISCUSSION',
	    targetId: api.pageParam.targetId
	}, function(ret, err) {
	    if(ret.status == 'success'){
	    	alert('清除成功');
	    	api.execScript({
	    		name: 'com_chat_header',
	    		frameName: 'com_chat',
	            script: 'exec();'
            });
            api.closeWin({});
	    }
	})
}


//退出该讨论组   ------------------------------------------------------------------------
function quitDiscussion(){
	var rong = api.require('rongCloud2');
	rong.quitDiscussion({
		discussionId: api.pageParam.targetId
	}, function(ret, err) {
		if (ret.status == 'success'){
			
			api.execScript({
				name: 'com_chat_list_header',
				frameName: 'com_chat_list',
	            script: 'exec();'
            });
            api.execScript({
				name: 'com_chat_header',
	            script: 'goBlack();'
            });
            alert('已退出群聊');
            api.closeWin({});
		}else{
			api.toast({ msg: err.code });
		}
	})
}

//群聊添加更多人员
function openPhonebook(){
	api.openSlidLayout({
		type:'left',
		slidPane:{
			name: 'com_phoneBook_right_header',
	        url: '../com_phonebook/header/com_phonebook_right_header.html',
	        pageParam: {
	        	"AddTo": "AddTo",
	        	"discussionId": api.pageParam.targetId
	        }
		},
		fixedPane:{
			name: 'com_phonebook_left_header', 
		    url: '../com_phonebook/header/com_phonebook_left_header.html', 
		},
	}, function(ret, err) {
		
	});
}

//页面刷新
function exec(){
	window.location.reload();
}