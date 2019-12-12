apiready = function(){
	get_progress_info();
}
   //关闭
function closeFrame(){
 	api.closeFrame({
        
    });  
}
//加载数据
function get_progress_info(){
	showProgress();//加载等待
	var on=true;//判断是否是第一个未完成（正在进行状态）
	var type='';//判断类型
	var url = localStorage.url+"Api/Pms/get_project_schedule_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	          	"project_no":api.pageParam.project_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
   				for(var i=0;i<ret.schedule_list.length;i++){
   					if(ret.schedule_list[i].schedule_name=='需求调研'){
    					type='demand_survey';
    					$('#demand_survey_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#demand_survey_logo').addClass('aui-bg-warning');
    						$('#demand_survey_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#demand_survey_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#demand_survey_logo ').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='需求分析'){
    					type='requirement_analysis';
    					$('#requirement_analysis_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#requirement_analysis_logo').addClass('aui-bg-warning');
    						$('#requirement_analysis_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#requirement_analysis_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#requirement_analysis_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='原型设计'){
    					type='prototyping';
    					$('#prototyping_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#prototyping_logo').addClass('aui-bg-warning');
    						$('#prototyping_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#prototyping_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#prototyping_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='产品设计'){
    					type='products_design';
    					$('#products_design_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#products_design_logo').addClass('aui-bg-warning');
    						$('#products_design_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#products_design_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#products_design_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='界面设计'){
    					type='ui';
    					$('#ui_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#ui_logo').addClass('aui-bg-warning');
    						$('#ui_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#ui_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#ui_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='程序编码'){
    					type='code';
    					$('#code_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#code_logo').addClass('aui-bg-warning');
    						$('#code_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#code_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#code_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='软件测试'){
    					type='test';
    					$('#test_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#test_logo').addClass('aui-bg-warning');
    						$('#test_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#test_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#test_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}else if(ret.schedule_list[i].schedule_name=='产品上线'){
    					type='online';
    					$('#online_finish').children('span').html(format_time(ret.schedule_list[i].schedule_expect_end_time));
    					if(ret.schedule_list[i].status_name=='已完成'){
    						$('#online_logo').addClass('aui-bg-warning');	
    						$('#online_unfinish').children('span').html(format_time(ret.schedule_list[i].schedule_practical_time));
    						$('#online_unfinish').show();
    					}else if(ret.schedule_list[i].status_name=='未完成'&&on){
    						$('#online_logo').addClass('aui-bg-info');
    						on=false;
    					}
    				}
    				
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
//时间格式化
function format_time(str){
	return new Date(str!=null?str.replace(/-/g,"/"):"").format('yyyy-MM-dd');
}