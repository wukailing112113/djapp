apiready = function(){
	getCmsArticleInfo()
}

function getCmsArticleInfo(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "article_id":api.pageParam.id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#article_title').html(clearNull(ret.data.article_title,'无'));
	    		$('#article_description').html(clearNull(ret.data.article_description,'无'));
	    		$('#add_time').html(clearNull(ret.data.add_time,'0'));
	    		$('#add_communist').html(clearNull(ret.data.add_staff,'无'));
	    		$('#article_content').html(clearNull(ret.data.article_content,'无'));
			}
			else{
   //api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				alert('暂无详情');
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


