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
    			if(api.pageParam.type=="arrange"){    			     
    			     $("#staff_name").html("执行人："+ret.workplan_executor_man);//执行人名称
    			}else{
    			     $("#staff_name").html("指派人："+ret.workplan_arranger_man);//指派人名称
    			}
    			
    			if(ret.executor_avatar != "" && ret.executor_avatar != null){
    				$("#executor_avatar").attr("src",localStorage.url+ret.executor_avatar);
    			}else{
    				$("#top_name").html(ret.workplan_executor_man.substring(ret.workplan_executor_man.length-2,ret.workplan_executor_man.length)).show();
    			}
    			//展示状态
    			var expectstart_time,expectend_time,start_time,end_time,stop_time;
                expectstart_time=new Date(ret.workplan_expectstart_time!=null?ret.workplan_expectstart_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');//预计开始时间
                expectend_time=new Date(ret.workplan_expectend_time!=null?ret.workplan_expectend_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');//预计结束时间
                start_time=new Date(ret.workplan_start_time!=null?ret.workplan_start_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');//实际开始时间
                end_time=new Date(ret.workplan_end_time!=null?ret.workplan_end_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');//实际结束时间
                stop_time=new Date(ret.workplan_stop_time!=null?ret.workplan_stop_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');//中止时间
                if(ret.status==11){
                    $("#status").html("未开始").addClass("aui-text-danger");
                    $("#date_time").html(expectstart_time+"(预计)--"+expectend_time+"(预计)");
                }else if(ret.status==21||ret.status==52){
                    $("#status").html("进行中").addClass("aui-text-success");
                    $("#date_time").html(start_time+"--"+expectend_time+"(预计)");
                }else if(ret.status==31){
                    $("#status").html("已完成").addClass("aui-text-info");
                    $("#date_time").html(start_time+"--"+end_time+"");
                }else if(ret.status==32){
                    $("#status").html("已审核").addClass("aui-text-warning");
                    $("#date_time").html(start_time+"--"+end_time+"");
                }else if(ret.status==51){
                    $("#status").html("已终止").addClass("aui-text-danger");
                    $("#date_time").html((start_time!=null?start_time:expectstart_time+'(预计)')+"--"+stop_time+"");
                }	
    			if(ret.workplan_content==null){
    				ret.workplan_content="";
    			}
    			$("#content").html(removeHTMLTag(ret.workplan_content));
    			$("#workplan_arranger_man").html(ret.workplan_executor_man);    			
				$("#memo").html(ret.memo);
				if(ret.file_list.length > 0)
					$("#file").show();
				$("#file_num").html(ret.file_list.length);
				file_list = ret.file_list;
    			//循环附件列表
    			for(var i = 0; i < ret.file_list.length; i++){
    			    if(ret.file_list[i].upload_path!=null){
                        img=upold_img(ret.file_list[i].upload_path)
                        $("#file_list").append(
                            '<li class="aui-list-view-cell aui-img pl-0" onclick="openEnqueue(\''+localStorage.url+ret.file_list[i].upload_path+'\');openManagerView();">'+
                                img+
                                '<span class="aui-img-body ml-15">'+
//                                  '<a class="aui-arrow-right">'+ret.file_list[i].upload_path.substring(ret.file_list[i].upload_path.lastIndexOf("/")+1,ret.file_list[i].upload_path.length)+
									'<a class="aui-arrow-right">'+ret.file_list[i].upload_path.substring(ret.file_list[i].upload_path.length-15,ret.file_list[i].upload_path.length)+
                                    '<em class="aui-pull-right mr-20 fsize-14 fcolor-99 lh30">'+(ret.file_list[i].upload_size!=null?ret.file_list[i].upload_size:0)+'kb</em>'+
                                    '</a>'+
                                '</span>'+
                            '</li>'
                        );
                    }    			    
    			}
    			//循环工作总结列表
    			for(var i = 0; i < ret.log_list.length; i++){
        			if(ret.log_list[i].status==31){  
        			     //循环完成工作总结     			     
        			     $("#complete_summary_content").show();
        			     $("#complete_summary").append(
                                '<li>'+
                                    '<i class="aui-iconfont iconfont aui-bg-info p-0">&#xe611;</i>'+
                                    '<div class="aui-timeline-item">'+
                                        '<h3 class="pl-5 fsize-12 fcolor-66">'+
                                            new Date(ret.log_list[i].add_time!=null?ret.log_list[i].add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss')+
                                        '</h3>'+
                                        '<div class="aui-timeline-body fcolor-99">'+ret.log_list[i].planlog_summary+'</div>'+
                                    '</div>'+
                                '</li>'
                            );
        			}else if(ret.log_list[i].status==51){   
                         //循环中止工作总结                      
                         $("#break_summary_content").show();
                         $("#break_summary").append(
                                '<li>'+
                                    '<i class="aui-iconfont iconfont aui-bg-info p-0">&#xe611;</i>'+
                                    '<div class="aui-timeline-item">'+
                                        '<h3 class="pl-5 fsize-12 fcolor-66">'+
                                            new Date(ret.log_list[i].add_time!=null?ret.log_list[i].add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss')+
                                        '</h3>'+
                                        '<div class="aui-timeline-body fcolor-99">'+ret.log_list[i].planlog_summary+'</div>'+
                                    '</div>'+
                                '</li>'
                            );
                    }else if(ret.log_list[i].status==52){   
                         //循环驳回工作总结                      
                         $("#reject_summary_content").show();
                         $("#reject_summary").append(
                                '<li>'+
                                    '<i class="aui-iconfont iconfont aui-bg-info p-0">&#xe611;</i>'+
                                    '<div class="aui-timeline-item">'+
                                        '<h3 class="pl-5 fsize-12 fcolor-66">'+
                                            new Date(ret.log_list[i].add_time!=null?ret.log_list[i].add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss')+
                                        '</h3>'+
                                        '<div class="aui-timeline-body fcolor-99">'+ret.log_list[i].planlog_summary+'</div>'+
                                    '</div>'+
                                '</li>'
                            );
                    }else if(ret.log_list[i].status==32){   
                         //循环驳回工作总结                      
                         $("#approve_summary_content").show();
                         $("#approve_summary").append(
                                '<li>'+
                                    '<i class="aui-iconfont iconfont aui-bg-info p-0">&#xe611;</i>'+
                                    '<div class="aui-timeline-item">'+
                                        '<h3 class="pl-5 fsize-12 fcolor-66">'+
                                            new Date(ret.log_list[i].add_time!=null?ret.log_list[i].add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss')+
                                        '</h3>'+
                                        '<div class="aui-timeline-body fcolor-99">'+ret.log_list[i].planlog_summary+'</div>'+
                                    '</div>'+
                                '</li>'
                            );
                    }else{
        			     $("#summary_content").show();
        			     $("#summary_list").append(
                            '<li>'+
                                '<i class="aui-iconfont iconfont aui-bg-info p-0">&#xe611;</i>'+
                                '<div class="aui-timeline-item">'+
                                    '<font class="pl-5 fsize-12 fcolor-66">'+
                                        new Date(ret.log_list[i].add_time!=null?ret.log_list[i].add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss')+
                                    '</font>'+
                                    '<div class="aui-timeline-body fcolor-99">'+ret.log_list[i].planlog_summary+'</div>'+
                                '</div>'+
                            '</li>'
                        );
        			}    				
    			}    					
    			//根据状态展示按钮
    			//我安排的工作按钮
    			if(api.pageParam.type == "arrange"){
                    if(ret.status!=51&&ret.status!=32){//只有发起人才能显示
                        $("#btn_3").show();
                        if(ret.status!=31){
                            $("#reject_btn,#auditing_btn").hide();
                            $("#end_btn").removeClass("aui-flex-item-4").addClass("aui-flex-item-12");
                        }
                    }
                }
                else if(api.pageParam.type == "dept"){//部门工作按钮
    			     if(ret.workplan_arranger_man_no == localStorage.user_id&&ret.status!=51&&ret.status!=32&&ret.executor_no != localStorage.user_id){//指派人按钮
                        $("#btn_3").show();
                        if(ret.status!=31){
                            $("#reject_btn,#auditing_btn").hide();
                            $("#end_btn").removeClass("aui-flex-item-4").addClass("aui-flex-item-12");
                        }
                    }else if(ret.executor_no == localStorage.user_id&&ret.workplan_arranger_man_no != localStorage.user_id){//执行人按钮
                        if(ret.status == 11){//未开始
                            $("#btn_1").show();
                        }else if(ret.status == 21||ret.status == 52){//正在进行
                            $("#btn_2").show();
                        }
                    }else if(ret.executor_no == localStorage.user_id&&localStorage.user_id == ret.workplan_arranger_man_no){//既是指派人也是执行人
                        if(ret.status == 11){//未开始
                            $("#btn_4,#begin_btn,#break_btn").show();
                        }else if(ret.status == 21||ret.status == 52){//正在进行
                            $("#break_btn").removeClass("aui-flex-item-6").addClass("aui-flex-item-4")
                            $("#btn_4,#summary_btn,#break_btn,#end_btn").show();
                        }
                    }
    			}else{//工作计划按钮
    			     if(ret.status == 11){//未开始
                        $("#btn_1").show();
                    }else if(ret.status == 21||ret.status == 52){//正在进行
                        $("#btn_2").show();
                    }
    			}
    			//日报查看非个人必做任务，所以按钮全部隐藏
    			if(api.pageParam.stast==true){
	    			$("#btn_1").hide();
	    			$("#btn_2").hide();
	    			$("#btn_3").hide();
					$("#btn_4").hide();
				};
			}else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    })
}

//更改工作计划状态
function set_workplan_status(chenge_status){
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
                api.execScript({
                    name:"arrange_work_listHeader",
                    frameName:"arrange_work_list",
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

var file_list;
//循环下载所有文件
function downFileAll(){
	for(var i = 0; i < file_list.length; i++){
		openEnqueue(localStorage.url+file_list[i].upload_path);
		if(i == file_list.length-1)
			openManagerView();
	}
}

//打开新页面
function openNewWin(winName,type,status){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":type,//用于内容编写页面工作总结状态
	    	"id":api.pageParam.workplan_id,
	    	"status":status//用于修改状态值
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