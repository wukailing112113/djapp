apiready=function(){
	getLifeHelpInfo();//调用（获取扶贫一对一详情）接口
}
//获取扶贫一对一详情接口
function getLifeHelpInfo(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/get_life_help_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		measures_id:api.pageParam.id,//帮扶一对一编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_no').html(clearNull(ret.data.measures_help,'无'));//帮扶人
    			$('#help_name').html(clearNull(ret.data.measures_genre_name,'无'));//被帮扶人
    			$('#help_title').html(clearNull(ret.data.title,'无'));//标题
    			$('#add_time').html(clearNull(ret.data.measures_help_time,'0').substring(0,10));//时间
				//$('#help_content').html(clearNull(ret.data.measures_phone,'无'));//帮扶人电话
			}
			else{
				alert("暂无详情");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
