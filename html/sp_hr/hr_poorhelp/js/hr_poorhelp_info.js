apiready=function(){
	getCmsArticleInfo();
}
//获取详情
function getCmsArticleInfo(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"article_id":api.pageParam.id//文章编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#article_title').html(clearNull(ret.data.article_title,'无'));//标题
    			$('#add_time').html(clearNull(ret.data.add_time,'0').substring(0,10));//时间
				$('#article_content').html(clearNull(ret.data.article_content,'无'));//内容
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
