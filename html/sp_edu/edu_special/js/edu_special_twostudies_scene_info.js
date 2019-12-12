apiready = function(){
	getEduNotesInfo(api.pageParam.id);//调用（获取学习笔记详情）接口
}
 
//获取学习笔记详情 接口------------------------------------------------------------
function getEduNotesInfo(type){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "notes_id":type,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#notes_title').html(ret.data.notes_title);//标题
    			$('#add_communist').html(ret.data.add_communist);//上传人
    			$('#notes_type').html(ret.data.notes_type);//类型
    			$('#add_time').html(ret.data.add_time);//时间
    			$('#notes_content').html(removeHTMLTag(ret.data.notes_content));//内容    			
    			$('#communist_avatar').attr('src',localStorage.url+ret.data.notes_thumb);//头像
			}
			else{
				api.toast({msg: ret.msg,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

