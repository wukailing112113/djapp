var date=new Date;
var year=date.getFullYear(); 
apiready=function(){
	getHrCommunistInfo();
}

//获取个人信息---------------------------------------------------------------
function getHrCommunistInfo(){
	showProgress();//加载信息等待
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
    		
    			$('#communist_avatar').attr('src',localStorage.url+ret.data.communist_avatar);//党员姓名
    			$('#communist_name').html(ret.data.communist_name);//党员姓名
    			$('#party_name').html(ret.data.party_name);//所属支部
    			$('#post_name').html(ret.data.post_name);//职务赋值
	  			//判断年龄
	  			if(ret.data.communist_birthday!=null){
	    			var age=(year-((ret.data.communist_birthday).substring(0,4)));
	    			$('#age').html('年龄：'+age+'岁');
	    		}
    			$('#communist_address').val(ret.data.communist_address);//地址赋值
    			$('#communist_mobile').val(ret.data.communist_mobile);//电话赋值
    			
    			//判断党龄
    			if(ret.data.communist_ccp_date&&ret.data.communist_ccp_date.length>0){
	    			var communist_ccp_date=(year-((ret.data.communist_ccp_date).substring(0,4)));
	    			$('#communist_ccp_date').val(communist_ccp_date+'年');//党龄赋值
	    		}
    			$('#communist_idnumber').val(ret.data.communist_idnumber);//身份证号
 
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    	}
    });

}

//保存修改信息------------------------------------------------------------------------
function set_hr_communist(){
//验证手机号
    if(verifyPhone($('#communist_mobile').val())==false){ 
        alert("请填写正确的手机号");      
        return; 
    }else{
    	var url = localStorage.url+"/index.php/Api/Hr/set_hr_communist";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"communist_no":localStorage.user_id,//登录人编号
	    		"communist_mobile":$('#communist_mobile').val(),//电话
	    		"communist_address":$('#communist_address').val(),//地址
	    	}
	    }
    },function(ret,err){
    	if(ret.status==1){    	
    		alert('成功修改个人信息')
			//刷新个人中心
			api.execScript({
				name:"hr_transfer",
               //frameName:"bd_home_list",
		        script: 'exec()'
		    });
			api.closeWin({name:api.winName});
		}
		else{
			alert('个人信息修改失败：'+ret.msg);
		}
    });
    
    
    } 

	
	
}

//验证手机号
function verifyPhone(phone){
	if (!phone.match(/^1[2|3|4|5|6|7|8][0-9]\d{4,8}$/)) {
//      api.toast({msg: '手机号码格式不正确' ,duration:3000,location: 'top'});
		return false;
	}else{
		return true;
	}
}

