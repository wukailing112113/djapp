apiready = function(){
	getHrCommunistInfo();//调用（获取个人信息）接口
	getHrCommunistIntegralInfo();//调用（获取志愿者积分详情）接口
}

//获取个人信息接口--------------------------------------------------
function getHrCommunistInfo(){
//	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_name').html(clearNull(ret.data.communist_name,'无'));//党员姓名
    			$('#party_name').html(clearNull(ret.data.party_name,'无'));//所属支部
    			
    		}else{
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



//获取志愿者积分详情接口---------------------------------------------------
function getHrCommunistIntegralInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_integral_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no:localStorage.user_id,//登录人编号
	            type:'integral_volunteer_communist'//类型志愿者积分
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
				$('#integral').html(clearNull(ret.data.integral,'0'));
				if(ret.data.log_list&&ret.data.log_list.length){
					for(var i=0;i<ret.data.log_list.length;i++){
						if(i%2==0){
			    			$('#list').append(
			    				'<p class="h-32em f-10em lh-35em over-h pl-12em pr-12em color-75 bg-color-f1f1f1">'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list[i].memo,'无')+'</span>'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list[i].add_time,'0')+'</span>'+
									'<span class="pull-left f-14em w-33b text-align color-ff9743">+'+clearNull(ret.data.log_list[i].change_integral,'0')+'</span>'+
								'</p>'
			    			)
			    		}else{
			    			$('#list').append(
			    				'<p class="h-32em f-10em lh-35em over-h pl-12em pr-12em color-75">'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list[i].memo,'无')+'</span>'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list[i].add_time,'0')+'</span>'+
									'<span class="pull-left f-14em w-33b text-align color-ff9743">+'+clearNull(ret.data.log_list[i].change_integral,'0')+'</span>'+
								'</p>'
			    			)
			    		}
		    		}
	    		}
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
