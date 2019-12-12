//页面初始化
apiready=function(){
	get_cust_contact_info();//获取联系人详情信息
}

//获取联系人信息
function get_cust_contact_info(){
	showProgress();//加载等待	
	var url = localStorage.url+"Api/Crm/get_cust_contact_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				"custcontact_no":api.pageParam.custcontact_no//联系人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#custcontact_name").val(ret.custcontact_name),//姓名
				$("#custcontact_post").val(ret.custcontact_post),//职务
				$("#custcontact_addr").val(ret.custcontact_addr),//地址
				$("#custcontact_tel").val(ret.custcontact_tel),//电话
				$("#custcontact_mobile").val(ret.custcontact_mobile),//手机号
				$("#custcontact_email").val(ret.custcontact_email),//邮箱
				$("#custcontact_im").val(ret.custcontact_im)//QQ
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    })
}
//保存修改
function set_contacts_do(){
	if(verifyPhone($("#custcontact_mobile").val())==false){
		return;
	}
	if(verifyMail($("#custcontact_email").val())){
		return;
	}
	showProgress();//加载等待	
	var url = localStorage.url+"Api/Crm/save_contact_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":api.pageParam.cust_no,//客户编号
				"custcontact_no":api.pageParam.custcontact_no,//联系人编号
				"custcontact_name":$("#custcontact_name").val(),//姓名
				"custcontact_post":$("#custcontact_post").val(),//职务
				"custcontact_addr":$("#custcontact_addr").val(),//地址
				"custcontact_tel":$("#custcontact_tel").val(),//电话
				"custcontact_mobile":$("#custcontact_mobile").val(),//手机号
				"custcontact_email":$("#custcontact_email").val(),//邮箱
				"custcontact_im":$("#custcontact_im").val()//QQ
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			api.execScript({
    				name:"customer_relation_addHeader",
    				frameName:"customer_relation_add",
	                script: 'exec();'
                });
                api.execScript({
    				name:"customer_infoHeader",
    				frameName:"customer_info",
	                script: 'exec();'
                });
                 api.execScript({
    				name:"customer_contact_infoHeader",
    				frameName:"customer_contact_info",
	                script: 'exec();'
                });
                api.execScript({
	                name:"business_editHeader",
    				frameName:"business_edit",
	                script: 'get_contacts_list('+api.pageParam.cust_no+');'
                });
                api.closeWin({});
			}
			else{
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
