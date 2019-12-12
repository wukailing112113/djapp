var lon;//经度
var lat;//纬度
var meeting_name;//会议名称

apiready=function(){
	getLocation();
	if(api.pageParam.history!='历史会议'){
		$('#niu').removeClass('di-n');
		get_oa_meeting_info()
		
	}else if(api.pageParam.history=='历史会议'){
		$('#ico_add').addClass('di-n');
//		$('#video').addClass('di-n');
		$('#textarea').attr('disabled','disabled');
		get_oa_meeting_info();
		get_edu_notes_info();
		
	}

}

//获取会议详情
function get_oa_meeting_info(){
//alert(localStorage.user_id);
//alert(api.pageParam.id);//1904001
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Manage/get_oa_meeting_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//党员编号
	            "meeting_no": api.pageParam.id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	    		if(ret.data.is_sign==1){
	    			$('#sign').css('display','none');
	    			$('#button').removeClass('di-n');	    		
	    		}else{
	    			$('#notes').css('display','none');	
	    			$('#thumb').css('display','none');	
	    		}
	    		
    			$('#meeting_name').html(ret.data.meeting_name);//会议名称
    			meeting_name=ret.data.meeting_name;
    			$('#meetting_thumb').attr('src',((ret.data.meetting_thumb!='')?localStorage.url+ret.data.meetting_thumb:'../../../statics/public/aui2/img/oa_qiandao_info.png'))
    			
    			//alert($('#meetting_thumb').attr('src'))
    			if(ret.data.meeting_video!=''){
    				//$('#video').attr('src',localStorage.url+ret.data.meeting_video);
    				$("#video1").append(
						'<video id="video" class="w-100b h-200em" controls="controls" poster="../../../statics/public/aui2/img/v1.png" autoplay="autoplay" src="'+localStorage.url+ret.data.meeting_video+'"></video>'
					);	
    			}else{
    				$('#video').addClass('di-n');
    			}
    			
    			$('#meeting_start_time').html(ret.data.meeting_start_time);//开始时间
    			$('#meeting_addr').html(ret.data.meeting_addr);//地点
    			$('#meeting_host_name').html(ret.data.meeting_host_name);//主持人名称
    			$('#party_name').html(ret.data.party_name);//开会议部门
    			$('#communist_num').html(ret.data.communist_num+'人');//会议人数    			
    			$('#memo').html(clearNull(ret.data.memo,'暂无'));//会议主题
    			if(api.pageParam.history=="历史会议"){
    				$('#info_address').html(ret.data.sign_address);
    			}

			}
			else{
				
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//签到
function set_oa_meeting_sign(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Manage/set_oa_meeting_sign";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//党员编号
	            "meeting_no": api.pageParam.id,//会议编号
	            "att_address":lon+','+lat//经纬度
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			alert('签到成功')
    			exec();

			}
			else{
				alert('会议未开始');
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//刷新页面
function exec(){
	window.location.reload();
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

//提交学习笔记
function save(){
	//获取上传列表id
	
	 var notice_attach="";
	 $("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}
		else{
			notice_attach=notice_attach+","+$(this).val()
		}
	 })
	 
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Edu/set_edu_notes";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no: localStorage.user_id,//党员编号
	            notes_title:meeting_name,//笔记标题
				notes_type:2,//笔记类型
				notes_thumb:notice_attach,//图片
				material_id:api.pageParam.id,//会议id
				notes_content:$('#textarea').val(),//笔记内容
				
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	    		alert('提交成功');
	    		$('#textarea').val('');
	    		$('#add_upload_list').html('');
	    		api.closeWin({});
			}
			else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				alert('提交失败');
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取会议笔记
function get_edu_notes_info(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//编号
				"type":2,//类型1学习资料2会议
				"material_id":api.pageParam.id//会议编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#textarea').val(ret.data.notes_content)
    			if(ret.data.notes_thumb!=null){
    				var notes_thumb = ret.data.notes_thumb.split(',')
    				$('#num').html(notes_thumb.length);
    				for(var i=0;i<notes_thumb.length;i++){
    					$('#add_upload_list').append(
    						'<li class="pull-left pt-12em pr-15em po-re"><img class="w-60em h-60em" src="'+localStorage.url+notes_thumb[i]+'" alt="" /></li>'
    					)
    				}
    			}else{
    				$('#thumb').hide();
    			}

			}
			else{
//				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
				$('#notes').hide();
				$('#thumb').hide();
				
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}