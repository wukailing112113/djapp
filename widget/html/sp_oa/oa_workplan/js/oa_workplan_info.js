apiready = function () {
	getOaWorklogInfo(api.pageParam.type);//调用（获取日报详情）接口
}

//获取日报详情 接口----------------------------------------------
function getOaWorklogInfo(type){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_worklog_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data:{//传输参数
		    values:{
		    	communist_no:localStorage.user_id,
		    	worklog_id:type,
		    }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#worklog_title').html(ret.data.worklog_title);//日报标题
    			$('#audit_man').html(ret.data.audit_man);//审核人
    			$('#worklog_communist').attr('src',(ret.data.worklog_thumbt)?(localStorage.url+ret.data.worklog_thumbt):"../../../statics/images/images_oa/oa_img_head.png")
    			$('#add_time').html(clearNull(ret.data.add_time.substring(0,10),""));//时间
    			$('#worklog_type').html(ret.data.worklog_type);//日报类型
    			$('#worklog_summary').html(ret.data.worklog_summary);//日报内容
	    		if(ret.data.worklog_attach&&ret.data.worklog_attach!='null'){
	    			worklogAttach = ret.data.worklog_attach.split('&nbsp;&nbsp;&nbsp;&nbsp;');//附件
	    			$('#worklogAttachQuantity').html(worklogAttach.length);
		    		for(var i=0;i<worklogAttach.length;i++){
		    			$('#worklogAttach').append(
		    				'<div class="b-1-df p-12em bg-color-fcfdfe over-h mb-12em">'+
								'<div class="pull-left pr-12em">'+
									'<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
								'</div>'+
								'<div class="pull-left">'+
									'<p class="f-15em color-b3">'+worklogAttach[i].split('/')[(worklogAttach[i].split('/').length-1)]+'</p>'+
	//								'<p class="f-12em color-b3">1.54 MB</p>'+
								'</div>'+
							'</div>'
		    			)
		    		}
    			}else{
    				$('#worklogAttach').addClass('di-n');
    			}
			}
			else{
				api.toast({msg: ret.msg,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
