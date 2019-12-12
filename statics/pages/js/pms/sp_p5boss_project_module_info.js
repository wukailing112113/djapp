var arr=[];//选择联系人
apiready = function(){
//	if(parseFloat(api.systemVersion)<4.3){
//		$("[type='number']").css('width','4em');
//	}
    //加载数据
    get_module_info();
    //获取联系人
    get_contacts();
}
//关闭
function closeWin(){
	api.closeWin({
	});
}
//加载数据
function get_module_info(){

	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/get_project_module_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           module_no:api.pageParam.module_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#module_name').val(ret.module_data[0].module_name);//模块名称赋值
    			$('#contact_name').val(ret.module_data[0].contact_name);//模块联系人赋值
    			$('#contact_id').val(ret.module_data[0].contacts);//模块联系人id赋值
    			$('#custcontact_tel').val(ret.module_data[0].custcontact_tel);//模块联系人电话赋值
    			$('#memo').val(ret.module_data[0].memo);//模块需求说明
    			var memo=document.getElementById('memo');
    			myFunction(memo);
    			$('#ver_demo').html(ret.module_data[0].ver_memo);//模块版本说明赋值	
    			$('#ver_time').html(new Date(ret.module_data[0].ver_datetime!=null?ret.module_data[0].ver_datetime.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss'));//模块版本修改时间
	  			$('#ver_no').html(ret.module_data[0].ver_number);//模块版本号
//  			var num=parseInt('1'+ret.module_data[0].ver_number)
//  			var str=(num+1)+'';
//  			$("[type='number']").eq(0).val(str.substring(1,3));
//  			$("[type='number']").eq(1).val(str.substring(3,5));
//  			$("[type='number']").eq(2).val(str.substring(5,7));
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

//获取联系人信息
function get_contacts(){
	showProgress();//加载等待
	arr=[];
	var url = localStorage.url+"Api/Crm/get_cust_contact_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            cust_no:api.pageParam.cust_no
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.contact_list.length;i++){
    				arr[i]={"value":ret.contact_list[i].custcontact_no,"text":ret.contact_list[i].custcontact_name,'custcontact_mobile':ret.contact_list[i].custcontact_mobile};
    			}
    			contacts_add();
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//添加联系人
function contacts_add(){
	(function($, doc) {
	//mui滑动选择
	$.init();
		$.ready(function() {
			//联系人
			var userPicker = new $.PopPicker();
			userPicker.setData(arr);
			var showUserPickerButton = doc.getElementById('contact_name');
			jQuery("#contact_name").unbind("click");
			jQuery("#contact_name").on('click', function(event) {
				userPicker.show(function(items) {
					showUserPickerButton.value = items[0].text;
					jQuery("#contact_id").val(items[0].value);
					jQuery("#custcontact_tel").val(items[0].custcontact_mobile);
				});
			});
		});
	})(mui, document);	
}
//修改数据
function set_module_info(){
	if(!(/^\d+$/.test($('#custcontact_tel').val()))) 
	{ 
		$aui.alert({
		title:'提示',
		content:'请输入正确的联系方式',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if(!$('#no').val()){
		$aui.alert({
		title:'提示',
		content:'请输入版本号',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if((/^[\u2E80-\u9FFF]+$/.test($('#no').val()))) 
	{ 
		$aui.alert({
		title:'提示',
		content:'请输入正确的版本号',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}

//	if($("[type='number']").eq(0).val().length!==2||$("[type='number']").eq(1).val().length!==2||$("[type='number']").eq(2).val().length!==2||!(/^\d+$/.test($("[type='number']").eq(0).val()))||!(/^\d+$/.test($("[type='number']").eq(1).val()))||!(/^\d+$/.test($("[type='number']").eq(2).val()))){
//		$aui.alert({
//		title:'提示',
//		content:'请输入正确的版本格式，如：00.00.01',
//		buttons:['确定']},
//		function(ret){
//			
//		});
//		return;
//	}
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/get_project_module_edit";
	
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "module_no": api.pageParam.module_no,//模块编号
				"module_name":$('#module_name').val(),//模块名称
				"contacts":$('#contact_id').val(),//模块联系人编号
				"contacts_tel":$('#custcontact_tel').val(),//联系方式
				"memo":$('#memo').val(),//需求说明
				"add_staff":localStorage.user_id,//操作人编号
				"ver_demo":$('#ver_no').html()
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			set_module_ver();//修改版本
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//修改版本
function set_module_ver(){
	var url1 = localStorage.url+"Api/Pms/save_project_module_version";
	//var str=$("[type='number']").eq(0).val()+$("[type='number']").eq(1).val()+$("[type='number']").eq(2).val();
	api.ajax({
	    url:url1,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "module_no": api.pageParam.module_no,//模块编号
				"ver_memo":$('#change').val(),//版本更新内容
				"add_staff":localStorage.user_id,//操作人编号
				"ver_datetime":new Date().format("yyyy-MM-dd hh:mm:ss"),//版本更新时间
				"ver_number":$('#no').val()//版本号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$aui.alert({
    				title:'提示',
    				content:'提交成功',
    				buttons:['确定']},
    				function(ret){
    					api.execScript({
							name: 'project_moduleHeader',
						    frameName:'project_module',
						   	script: 'exec();'
					    });
					    api.closeWin({});
    				});
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}