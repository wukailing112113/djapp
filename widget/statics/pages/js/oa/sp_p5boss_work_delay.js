//刷新
function exec(){
	 location.reload();
}
apiready = function () {
	get_workplan_info();//获取工作计划详情
}

//获取工作计划详情
function get_workplan_info(){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oa/get_workplan_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"workplan_id":api.pageParam.workplan_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.datastatus == 1){
    			$("#title").html(ret.workplan_title);
    			//展示状态
    			if(ret.status == 11)
    				$("#status").html("未开始").addClass("aui-text-danger");
    			else if(ret.status == 21)
    				$("#status").html("进行中").addClass("aui-text-success");
				else if(ret.status == 31)
    				$("#status").html("已完成").addClass("aui-text-info");
    			else if(ret.status == 51)
    				$("#status").html("已终止").addClass("aui-text-danger");
    			else if(ret.status == 32)
    				$("#status").html("已审核").addClass("aui-text-warning");
    				
    			var start_time,end_time;
    			if(ret.workplan_expectstart_time.length > 10)
    				start_time = ret.workplan_expectstart_time.substring(0,10);
    			if(ret.workplan_expectend_time.length > 10)
    				end_time = ret.workplan_expectend_time.substring(0,10);
				$("#date_time").html(start_time+"(预计)--"+end_time+"(预计)");
			}else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });	
}

//提交申请
function set_delay_add(){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oa/set_workplan_status";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"staff_no":localStorage.user_id,
	    		"workplan_id":api.pageParam.workplan_id,
	    		"workplan_expectend_time":$("#workplan_expectend_time").val(),
	    		"chenge_status":chenge_status
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    			api.execScript({
    				name:"work_listHeader",
    				frameName:"work_list",
	                script: 'exec();'
                });
    			exec();
			}else{
				$("button").attr("disabled",false);
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		$("button").attr("disabled",false);
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//时间选择器
(function($) {
	$.init();
	var btns = $('[name="date"]');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			var picker = new $.DtPicker(options);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				btn.value = rs.text;
				/* 
				 * 返回 false 可以阻止选择框的关闭
				 * return false;
				 */
				/*
				 * 释放组件资源，释放后将将不能再操作组件
				 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
				 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
				 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
				 */
				picker.dispose();
			});
		}, false);
	});
})(mui);