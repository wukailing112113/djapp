apiready = function(){
	getLifeVolunteerActivityInfo();//调用（志愿者服务详情）接口
}

//获取志愿者服务详情接口
function getLifeVolunteerActivityInfo(){
	var url = localStorage.url+"/index.php/Api/Life/get_life_volunteer_activity_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		'communist_no':localStorage.user_id,//登录人编号
	            'activity_id':api.pageParam.id,//活动编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#activity_title').html(clearNull(ret.data.activity_title,'无'));
    			$('#activity_starttime').html(clearNull(ret.data.activity_starttime,'0'));
    			$('#activity_organizer').html(clearNull(ret.data.activity_organizer,'无'));
    			$('#activity_description').html(clearNull(ret.data.activity_description,'无'));
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

