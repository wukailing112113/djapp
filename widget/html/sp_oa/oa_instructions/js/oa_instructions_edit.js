apiready=function(){
	 if(api.pageParam.type==2){
	 	$('#workplan_executor_man').val(localStorage.user_name);
	 	$('#workplan_executor_man').parent().attr('ChoosePeopleId',localStorage.user_id);
	 }else{
	 	$('#workplan_executor_man').click(function(){
	 		openPerson('0','oa_instructions_edit');
	 	})
	 }
}

//提交工作计划 接口
function setOaWorkplan(){
	if($('#workplan_title').val()==''){
		alert('请输入标题');
		return
	}else if($('#workplan_content').val()==''){
		alert('请输入计划内容');
		return
	}else if($('#workplan_content').val()==''){
		alert('请选择预计开始时间');
		return
	}else if($('#workplan_expectend_time').val()==''){
		alert('请选择预计完成时间');
		return
	}
	var url = localStorage.url+"/index.php/Api/Oa/set_oa_workplan";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           "communist_no":localStorage.user_id,//员工编号
	           "workplan_arranger_man":localStorage.user_id,//安排人
	           "workplan_executor_man":$('#workplan_executor_man').parent().attr('ChoosePeopleId'),//执行人
	           "workplan_audit_man":$('#workplan_audit_man').parent().attr('ChoosePeopleId'),//审核人
	           "workplan_title":$('#workplan_title').val(),//标题
	           "workplan_content":$('#workplan_content').val(),//内容
	           "workplan_expectstart_time":$('#workplan_expectstart_time').val(),//预计开始时间
	           "workplan_expectend_time":$('#workplan_expectend_time').val(),//预计完成时间
	           "memo":$('#memo').val(),//备注
	        }
	    }
    },function(ret,err){
//  	alert(ret);
    	if(ret){
//  		alert(ret.status);
    		if(ret.status==1){
    			api.execScript({
    				name:'oa_instructions_header',
    				frameName:'oa_instructions',
	                script: 'exec();'
                });
    			alert('提交成功');
				api.closeWin({});
			}
			else{
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

//打开选择人页面----------------------------------------
function openPerson(num,type){
    api.openSlidLayout({
		type:'left',
		slidPane:{
			name:'oa_person_right_header',
			url:'../oa_person/header/oa_person_right_header.html',
			pageParam:{
		    	num:num,
		    	type:type
		    }
		},
		fixedPane:{
			name:'oa_person_left_header',
			url:'../oa_person/header/oa_person_left_header.html',
		},
	}, function(ret, err) {
		
	});
}


//获取选择人方法-----------------------------------------
function ChoosePeople(num,name,id){
	if(num==0){
		$('#workplan_executor_man').val(name);
		$('#workplan_executor_man').parent('p').attr('ChoosePeopleId',id);
	}else{
		$('#workplan_audit_man').val(name);
		$('#workplan_audit_man').parent('p').attr('ChoosePeopleId',id);
	}
	
}
