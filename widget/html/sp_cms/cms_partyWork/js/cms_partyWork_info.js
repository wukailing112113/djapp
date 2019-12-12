apiready = function(){
	getCmsArticleInfo();
	
}

function getCmsArticleInfo(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            // "article_id":api.pageParam.type,
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
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				alert('暂无详情');
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	//api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//function wx(){
//	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_info_url";
//	api.ajax({
//	    url:url,
//	    method: 'post',
//	    timeout: 100,
//	    data: {//传输参数
//	    	values: { 
//	            "article_id":api.pageParam.id,
//	        }
//	    }
//  },function(ret,err){
//  	if(ret){
//  		if(ret.status==1){
//	wx_1(ret.data.article_title,removeHTMLTag(ret.data.article_content),localStorage.url+ret.data.article_thumb,ret.data.url)
//		
//			}
//			else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
//			}
//			api.hideProgress();//隐藏进度提示框
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}

function wx(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_info_url";
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
    		var article_title=ret.data.article_title;
    		var article_content=ret.data.article_content;
    		var article_url=ret.data.url;    		
    		//下载文件
		api.download({
		    url: localStorage.url+ret.data.article_thumb,
		   // savePath: 'fs://test.png',
		    report: true,
		    cache: true,
		    allowResume: true
		}, function(ret, err) {			
		    if (ret.state == 1) {
		    //alert(article_title);		    
		   // alert(article_content);	
		  //  alert(article_url);					   			     
		    var spath=ret.savePath;	  		      	
		    wx_1(article_title,removeHTMLTag(article_content),spath,article_url);
		    
		    }else {
		    
		    }
		});
	
		
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	//api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//thumb
function wx_1(title,description,thumb,contentUrl){
	//是否已安装微信
	var wx = api.require('wx');
	wx.isInstalled(function(ret, err) {
	    if (ret.installed) {
		    var wx = api.require('wx');
		    wx.shareWebpage({
		        apiKey: 'wx0cdb1d3593e02909',
		        scene: 'timeline',
		        title: title,
		        description: description,
		        thumb: thumb,
		        contentUrl: contentUrl
		    }, function(ret, err) {
		    //在微信最新版本 6.7.2 上取消分享时 status 也返回 true，此为微信bug，等待微信修复更新		
		        if (ret.status) {
		            alert('分享成功');
		        } else {
		            alert('分享失败');
		        }
		        
		    });
	} else {
	    alert('当前设备未安装微信客户端');
	    }
	});

}