apiready = function(){
	getHrCommunistInfo();//调用（获取个人信息接口）
	if(api.pageParam.volunteer){//已成为志愿者
		//$('#tabBox2 li').removeClass('tabBox2-active');
		//$('#tabBox2 li').eq(0).addClass('tabBox2-active');
		getLifeVolunteerStatus();//调用（获取志愿者服务列表接口(获取志愿者申请状态与申请事由)）
	}else{//活动申请
		//$('#tabBox2 li').removeClass('tabBox2-active');
		//$('#tabBox2 li').eq(1).addClass('tabBox2-active');
		getLifeVolunteerActivityStatus();//调用（获取志愿者服务详情）
	}
}

//获取实时时间-------------------------------------------------------
var volunteerDate = new Date();
$('#volunteerDate').html(volunteerDate.getFullYear()+'-'+(volunteerDate.getMonth()+1)+'-'+volunteerDate.getDate())

//获取志愿者活动申请详情接口-------------------------------------------------
function getLifeVolunteerActivityStatus(){
	var url = localStorage.url+"/index.php/Api/Life/get_life_volunteer_activity_status";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		'communist_no':localStorage.user_id,
	            'activity_id':api.pageParam.id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data.apply_status!=0){//已申请，调用（活动申请状态）方法
    				status(ret.data.apply_status)
    				$('#reason').removeClass('di-n');
    				$('#show_reason').html(ret.data.apply_desc)
    			}else{//未申请
    				//$('#show_reason').parent().hide();
					$('#submit').click(function(){
						setLifeVolunteerActivity(api.pageParam.id);
					});
    			}
			}
			else{
				alert(ret.msg);
				api.closeWin({});//关闭当前window
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取志愿者服务列表接口(获取志愿者申请状态与申请事由)----------------------------------
function getLifeVolunteerStatus(){
	var url = localStorage.url+"/index.php/Api/Life/get_life_volunteer_status";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no:localStorage.user_id,//登录人id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			volunteer = ret.data;//1
    			if(volunteer){//1:待处理；2：成功；3：驳回；
    				//if(volunteer = 2){
    				//	localStorage.is_volunteer = 1; //成为志愿者
    			    //}
    				status(volunteer); //改成相应状态
    				//$('#show_reason').html(ret.data);
    				$('#reason').removeClass('di-n');//显示内容概述
    				$('#show_reason').html(ret.volunteer_content);//内容概述
    			}else{//null：还未申请志愿者
    				$('#show_reason').parent().hide();
    				$('#submit').show();
    				$('#submit').click(function(){
    					setLifeVolunteer();//申请志愿者
    				});
    			}
			}
			else{
				alert(ret.msg);
				api.closeWin({});
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//活动申请状态----------------------------------------------------------------------------------
function status(statusNum){	
	$('#submitStatus').removeClass('di-n');
	if(statusNum==3){//已驳回状态
		$('#volunteer_reason').hide();
		$('#submit').hide();
		$('#submitStatus').find('div').eq(4).addClass('grad color-white');
		$('#show_reason').parent().hide();
		if(api.pageParam.volunteer){
			$('#submit').click(function(){			
				set_life_volunteer();
			});
		}else{
			$('#submit').click(function(){
				setLifeVolunteerActivity(api.pageParam.id);
			})
		}
	}else{//待处理或完成状态
		$('#volunteer_reason').hide();
		$('#submit').hide();
		for(var i=0;i<statusNum;i++){
			$('#submitStatus').find('div').eq(i+1).addClass('grad color-white');	
			$('#submitStatus').find('i').eq(i).addClass('color-ff3032');	
		}
	}
	if(statusNum == 2){
		localStorage.is_volunteer = 1; //成为志愿者
	}
}


//志愿者申请接口-------------------------------------------------------------------------------------
function setLifeVolunteer(){
	var url = localStorage.url+"/index.php/Api/Life/set_life_volunteer";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            'communist_no':localStorage.user_id,
	           // 'volunteer_reason':$('#volunteer_reason').val(),
	            'volunteer_content':$('#volunteer_reason').val(),
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	       		alert('申请已提交');
	       		api.closeWin({});
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//活动申请接口---------------------------------------------------------------------------------------
function setLifeVolunteerActivity(type){
	var url = localStorage.url+"/index.php/Api/Life/set_life_volunteer_activity";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            'communist_no':localStorage.user_id,
	            'activity_id':type,
	            'apply_desc':$('#volunteer_reason').val(),
	            'party_no':localStorage.dept_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	       		alert('申请已提交');
	       		api.closeWin({});
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取个人信息接口----------------------------------------------------------------------------------
function getHrCommunistInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_avatar').attr('src',(ret.data.communist_avatar?(localStorage.url+ret.data.communist_avatar):"../../../statics/images/images_hr/hr.png"));//党员头像
    			$('#communist_name').html(clearNull(ret.data.communist_name,''));//党员姓名
    			$('.party_name').html(clearNull(ret.data.party_name,''));//所属支部
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

