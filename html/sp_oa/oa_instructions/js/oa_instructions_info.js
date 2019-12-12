apiready=function(){
	getOaWorkplanInfo();//调用（获取工作计划详情）详情
}

//获取工作计划详情 接口
function getOaWorkplanInfo(){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_workplan_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           "workplan_id":api.pageParam.type
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#workplan_title").html(clearNull(ret.data.workplan_title,'无'));//标题
    			$("#workplan_audit_man").html(clearNull(ret.data.workplan_audit_man,'无'));//审核人
    			$("#workplan_content").html(clearNull(ret.data.workplan_content,'无'));//内容
    			$("#workplan_start_time").html(clearNull(ret.data.workplan_expectstart_time,'0'));//开始时间
    			$("#workplan_end_time").html(clearNull(ret.data.workplan_expectend_time,'0'));//结束时间
    			$("#memo").html(clearNull(ret.data.memo,'无'));//备注
//  			alert(ret.workplan_row.workplan_start_time);
//  			alert(ret.workplan_row.workplan_end_time);
			}
			else{
				api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	
    	}
    });
}

//tab切换 我的工作计划与我安排的工作计划切换-----------------------------------------------------------
$("#tabBox2>li").click(function(){
	$("#listBox").empty();
	$(this).addClass("tabBox2-active").siblings().removeClass("tabBox2-active");
	if($(this).index()==0) get_oa_workplan_list(2);	
	else get_oa_workplan_list(1);
})
