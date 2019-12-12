apiready = function(){
	var rong = api.require('rongCloud2');
	rong.getDiscussion({
	    discussionId: api.pageParam.targetId
	}, function(ret, err) {
	    if (ret.status == 'success'){
	    	$('#GroupName').attr('placeholder',ret.result.name);
	    }else{
	        api.toast({ msg: err.code });
		}
	})
}

//修改群名
function ModifyGroupName(){
	var rong = api.require('rongCloud2');
	rong.setDiscussionName({
		discussionId: api.pageParam.targetId,
		name: $('#GroupName').val()
	}, function(ret, err) {
		if (ret.status == 'success'){
			api.execScript({
				name: 'com_chat_members_header',
				frameName: 'com_chat_members',
	            script: 'exec();'
            });
            api.execScript({
				name: 'com_chat_list_header',
				frameName: 'com_chat_list',
	            script: 'exec();'
            });
            api.execScript({
				name: 'com_chat_header',
	            script: 'goBlack();'
            });
            api.execScript({
				name: 'com_chat_members_header',
	            script: 'goBlack();'
            });
            alert('修改成功')
			api.closeWin({name:api.winName});
		}else{
			api.toast({ msg: err.code });
		}
	})
}