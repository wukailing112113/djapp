apiready = function(){
	getHrCommunistIntegralInfo();//调用（获取志愿者积分详情）接口
}

//获取积分接口---------------------------------------------------
function getHrCommunistIntegralInfo(){
//alert(localStorage.user_id)
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_integral_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"communist_no":localStorage.user_id,//党员编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	    		if(ret.data.integral=='0.00'){	    			
	    			api.toast({msg: '暂无数据' ,duration:3000,location: 'top'});
	    		}    		
				$('#integral').html(clearNull(ret.data.integral,'0'));//当前积分
				$('#party_ranking').html(clearNull(ret.data.party_ranking,'0'));//当前支部排名
				$('#ranking').html(clearNull(ret.data.ranking,'0'));//系统内排名
				if(ret.data.log_list.data&&ret.data.log_list.data.length>0){
					for(var i=0;i<ret.data.log_list.data.length;i++){
						if(i%2==0){
			    			$('#list').append(
			    				'<p class="h-32em f-10em lh-35em over-h pl-12em pr-12em color-75 bg-color-f1f1f1">'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list.data[i].memo,'未记录')+'</span>'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list.data[i].add_time,'0')+'</span>'+
									'<span class="pull-left f-14em w-33b text-align color-ff9743">'+clearNull(ret.data.log_list.data[i].change_integral,'0')+'</span>'+
								'</p>'
			    			)
			    		}else{
			    			$('#list').append(
			    				'<p class="h-32em f-10em lh-35em over-h pl-12em pr-12em color-75">'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list.data[i].memo,'未记录')+'</span>'+
									'<span class="pull-left w-33b text-align">'+clearNull(ret.data.log_list.data[i].add_time,'0')+'</span>'+
									'<span class="pull-left f-14em w-33b text-align color-ff9743">'+clearNull(ret.data.log_list.data[i].change_integral,'0')+'</span>'+
								'</p>'
			    			)
			    		}
		    		}
	    		}
			}else{			
				api.toast({msg: '暂无数据' ,duration:3000,location: 'top'});
			}
    	}else{
    //	alert(1)
    		api.hideProgress();//隐藏进度提示框
	    	api.toast({msg: '暂无数据' ,duration:3000,location: 'top'});
    	}
    });
}

//打开积分排名详情--------------------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:type,
        }
    });
}

