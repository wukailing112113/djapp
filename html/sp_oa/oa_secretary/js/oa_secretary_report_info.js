apiready = function () {
	getOaWorklogInfo(); // 获取详情的方法
	getLocation(); //获取地理位置
}


//获取详情-----------------------------------------------------------------
function getOaWorklogInfo(){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_worklog_info";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				worklog_id : api.pageParam.id
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				$("#article_title").text(ret.data.worklog_title);  //标题
				$("#add_communist").text(ret.data.communist_name);   //发布人
				$("#worklog_audit_content").html(ret.data.worklog_audit_content); // 内容
				$("#add_time").html(ret.data.add_time);  //时间
				//读取附件列表
    			if(ret.data.worklog_attach){
    				missiveAttach = ret.data.worklog_attach.split('&nbsp;&nbsp;&nbsp;&nbsp;');
		    		$('#missiveAttachQuantity').html(missiveAttach.length)
		    		for(var i=0;i<missiveAttach.length;i++){
		    			$('#missiveAttach').append(
		    				'<div class="b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em">'+
								'<div class="pull-left pr-12em">'+
									'< img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
								'</div>'+
								'<div class="pull-left">'+
									'<p class="f-15em color-b3">'+missiveAttach[i].split('/')[(missiveAttach[i].split('/').length-1)]+'</p >'+
	//								'<p class="f-12em color-b3">1.54 MB</p >'+
								'</div>'+
							'</div>'
		    			)
		    		}
    			}
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
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
	    	lon = ret.lon;//获取经度
	        lat = ret.lat;//获取纬度
	        getNameFromCoords();
	    }
	});
}
/**
 *根据经纬度获取位置详细信息 
 */
function getNameFromCoords(){
	var map = api.require('bMap');
	map.getNameFromCoords({
	    lon: lon,
	    lat: lat
	},function(ret,err){
	    if(ret.status){
//	    alert(ret.address);
			$('#info_address').html(ret.address);
	    }
//	        alert(err.code);
	});
}	


//刷新页面  ---------------------------------------------------------
function exec(){
	location.reload();
}