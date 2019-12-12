apiready = function(){
	getLifeAffairsInfo();
}

//三务公开-------------------------------------------------------------------------
function getLifeAffairsInfo(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/get_life_affairs_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		'article_id':api.pageParam.id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#article_title').html(ret.data.article_title);//标题
    			$('#add_communist').html(ret.data.add_staff);//发起人
    			$('#add_time').html(ret.data.add_time);//时间
    			$('#article_content').html(ret.data.article_content);//内容
    			
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
