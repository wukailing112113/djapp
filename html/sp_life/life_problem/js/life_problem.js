var lon;//经度
var lat;//纬度

//页面初始化
apiready=function(){
	get_bd_type_list();//获取问题类型
    getLocation();
}
//获取问题类型
function get_bd_type_list(){
	var url = localStorage.url+"/Api/Life/get_life_condition_cat_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	         	//type_group: "condition_type",  
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.data.length;i++){
    				$('#condition_list').append(
    					'<option value="'+ret.data[i].cat_id+'">'+ret.data[i].cat_name+'</option>'
    				)
    			}

			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//$('#condition_list').change(function(){
//	for(var i=0;i<$('#condition_list').find('option').length;i++){
//		if($('#condition_list').find('option').eq(i).val()==$('#condition_list').val()){
//			
//			
//		}
//	}
//})

//提交
function set_life_condition(){
	if($('#condition_list').val()==""){
		alert('请选择问题类型');
		return
		
	}else if($('#condition_content').val()==''){
		alert('请输入民生O2O内容');
		return
	}
	//获取上传列表id
	 var notice_attach="";
	 $("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}
		else{
			notice_attach=notice_attach+","+$(this).val()
		}
	 });
	var url = localStorage.url+"/index.php/Api/Life/set_life_condition";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				type_no:$('#condition_list').val(),//民生类型
				condition_title:$('#condition_title').val(),//民生详情
				condition_content:$('#condition_content').val(),//随手拍内容				
				//condition_content1:$('#condition_content1').val(),//问题解决详情								
				condition_personnel:$('#condition_personnel').val(),//提交人
				condition_personnel_mobile:$('#condition_personnel_mobile').val(),//提交人电话
				condition_thumb:notice_attach,//附件
				condition_area:$('#info_address').html(),
				add_staff:localStorage.user_id//党员编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('提交成功')
    			api.closeWin({});
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

//获取经纬度
function getLocation(){
	var bMap = api.require('bMap');
	bMap.getLocation({
	    accuracy: '100m',
	    autoStop: true,
	    filter: 1
	}, function(ret, err){
	    if(ret.status){
//	    	alert(1)
//			alert('经度'+ret.lon);
//			alert('纬度'+ret.lat);
	    	lon = ret.lon;//获取经度
	        lat = ret.lat;//获取纬度
	        getNameFromCoords(lon,lat);
	    }
	});
}

//根据经纬度获取位置详细信息 
function getNameFromCoords(a,b){
	var map = api.require('bMap');
	map.getNameFromCoords({
	    lon: a,
	    lat: b
	},function(ret,err){
	    if(ret.status){
			$('#info_address').html(ret.address);
	    }
	});
}	
