
var st_y=0;//记录y值
var arr1=[];//选择客户
var arr2=[];//选择商机
var arr3=[];//选择联系人
//签约时间选择器
(function($) {
	$.init();
	var btns = $('#project_contract_time');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			options.type='date';
			if(!jQuery('#project_date').val()==''){
				end = new Date(jQuery('#project_date').val());
	 			options.endDate = new Date(end.valueOf());
			}
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
				btn.value = rs.text.slice(0,10);
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
//签约结束时间选择器
(function($) {
	$.init();
	var btns = $('#project_date');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			options.type='date';
			if(!jQuery('#project_contract_time').val()==''){
				end = new Date(jQuery('#project_contract_time').val());
	 			options.beginDate = new Date(end.valueOf());
			}
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
				btn.value = rs.text.slice(0,10);
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
//开始时间选择器
(function($) {
	$.init();
	var btns = $('#project_start_time');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			options.type='date';
			if(!jQuery('#project_end_time').val()==''){
				end = new Date(jQuery('#project_end_time').val());
	 			options.endDate = new Date(end.valueOf());
			}
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
				btn.value = rs.text.slice(0,10);
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
//结束时间选择器
(function($) {
	$.init();
	var btns = $('#project_end_time');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			options.type='date';
			if(!jQuery('#project_start_time').val()==''){
				end = new Date(jQuery('#project_start_time').val());
	 			options.beginDate = new Date(end.valueOf());
			}
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
				btn.value = rs.text.slice(0,10);
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

//获取商机信息
function business(){
	showProgress();//加载等待
	arr2=[];
	var url = localStorage.url+"Api/Crm/get_cust_business_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		pagesize:9999,
	            type:1,
	            cust_no:$('#customer_id').val()
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.business_list.length;i++){
    				arr2[i]={"value":ret.business_list[i].business_no,"text":ret.business_list[i].business_name};
    			}
    			business_add();
			}
			else{
				if(ret.msg=='未查到相关数据'){
					$('#business').attr('disabled','true');
	    			$('#business,#business_id').val('');
	    			$('#business').attr('placeholder','未查到相关数据');
				}
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//添加商机信息
function business_add(){
	(function($, doc) {
	//mui滑动选择
	$.init();
		$.ready(function() {
			//商机
			var userPicker1 = new $.PopPicker();
			userPicker1.setData(arr2);
			var showUserPickerButton1 = doc.getElementById('business');
			jQuery("#business").unbind("click");
			jQuery("#business").on('click', function(event) {
				userPicker1.show(function(items) {
					showUserPickerButton1.value = items[0].text;
					jQuery("#business_id").val(items[0].value);
				});
			});
		});
	})(mui, document);	
}
//获取联系人信息
function contacts(){
	showProgress();//加载等待
	arr3=[];
	var url = localStorage.url+"Api/Crm/get_cust_contact_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            cust_no:$('#customer_id').val()
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.contact_list.length;i++){
    				arr3[i]={"value":ret.contact_list[i].custcontact_no,"text":ret.contact_list[i].custcontact_name};
    			}
    			contacts_add();
			}
			else{
				if(ret.msg=='未查到相关数据'){
					$('#project_person_name,#contacts').attr('disabled','true');
	    			$('#project_person_name,#contacts,#project_person_name_id,#contacts_id').val('');
	    			$('#project_person_name,#contacts').attr('placeholder','未查到相关数据');
				}
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
			//负责人
			var userPicker2 = new $.PopPicker();
			userPicker2.setData(arr3);
			var showUserPickerButton2 = doc.getElementById('project_person_name');
			jQuery("#project_person_name").unbind("click");
			jQuery("#project_person_name").on('click', function(event) {
				userPicker2.show(function(items) {
					showUserPickerButton2.value = items[0].text;
					jQuery("#project_person_name_id").val(items[0].value);
				});
			});
			//联系人
			var userPicker3 = new $.PopPicker();
			userPicker3.setData(arr3);
			var showUserPickerButton3 = doc.getElementById('contacts');
			jQuery("#contacts").unbind("click");
			jQuery("#contacts").on('click', function(event) {
				userPicker3.show(function(items) {
					showUserPickerButton3.value = items[0].text;
					jQuery("#contacts_id").val(items[0].value);
				});
			});
		});
	})(mui, document);	
}
apiready = function(){
	//判断是否是详情页
	if(api.pageParam.type=='详情'){
		//加载数据
		get_project_info();
		$('#save').show();//显示保存按钮
		$('#business,#project_person_name,#contacts').removeAttr('disabled');//关闭商机，负责人，联系人禁用
		$('#business').attr('placeholder','请选择商机');
		$('#project_person_name').attr('placeholder','请选择负责人');
		$('#contacts').attr('placeholder','请选择联系人');
	}else{
		$('#logo_par').removeClass('p8-15');
		$('#logo_span').removeClass('lh-50');
		$('#add_logo').show();//显示提交图标
		$('#add').show();//显示提交按钮
		//$('#div_logo').show().html(localStorage.user_name.substring(localStorage.user_name.length-2,localStorage.user_name.length));
		$('#photo').hide();
	}
	if(localStorage.logo_src){
		$('#logo').attr('src',localStorage.logo_src);
	}
	if(localStorage.logo_id){
		$('#logo_id').val(localStorage.logo_id);
	}
}
//打开新窗口
function openWin(winName,type){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	type:type
        }
    });
}
//选择人判断
function evaluate(type_id,staff_name,staff_no){
    var staff_name=staff_name.split(",");
    var staff_no=staff_no.split(",");
	if(type_id=="kaifazuzhang"){
    	$("#kaifazuzhang").html(staff_name);
    	$("#kaifazuzhang_no").val(staff_no);
        $("#kaifazuzhang").removeClass("fcolor-a9");
    }else if(type_id=="kaifarenyuan"){
    	$("#kaifarenyuan").html(staff_name).removeClass("fcolor-a9");
    	$("#kaifarenyuan_no").val(staff_no);
    }else if(type_id=="zhulirenyuan"){
    	$("#zhulirenyuan").html(staff_name).removeClass("fcolor-a9");
    	$("#zhulirenyuan_no").val(staff_no);
    }
}
//添加项目
function project_add(){
	if($('#customer_id').val()==''){
		$aui.alert({
		title:'提示',
		content:'请选择客户',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if($('#business').val()==''){
		$aui.alert({
		title:'提示',
		content:'请选择商机',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if($('#project_name').val()==''){
		$aui.alert({
		title:'提示',
		content:'请输入项目名称',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if($('#project_abbr').val()==''){
		$aui.alert({
		title:'提示',
		content:'请输入项目简称',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/save_project_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "add_staff": localStorage.user_id,//操作人编号
				"cust_no":$('#customer_id').val(),//客户id
				"business_no":$('#business_id').val(),//business_no,//商机id
				"project_person_name":$('#project_person_name_id').val(),//负责人
				"contacts":$('#contacts_id').val(),//联系人
				"project_contract_time":$('#project_contract_time').val(),//签约时间
				"project_date":$('#project_date').val(),//结束时间
				"project_leader":$("#kaifazuzhang_no").val(),//开发组长id
				"project_crew":$("#kaifarenyuan_no").val(),//开发成员id
				"staff_no":$("#zhulirenyuan_no").val(),	//开发助理id
				"project_name":$('#project_name').val(),//项目名称
				"project_abbr":$('#project_abbr').val(),//项目简称
				"project_code":$('#project_code').val(),//项目代码
				"project_start_time":$('#project_start_time').val(),//开始时间
				"project_end_time":$('#project_end_time').val(),//结束时间
				"project_logo":$('#logo_id').val(),//项目logo
				"project_content":$('#project_content').val()  // 项目简介
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
							name: 'project_listHeader',
						    frameName:'project_list',
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
//刷新页面方法
function exec(){
	location.reload();
}
//详情页时加载数据
function get_project_info(){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/get_project_info";
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
    			if(ret.cust_name!==''&&ret.cust_name!==null){
    				$('#customer').html(ret.cust_name).removeClass('fcolor-a9');//客户名称赋值
    				$('#customer_id').val(ret.cust_no);//
    			}
    			if(ret.business_name!==''&&ret.business_name!==null){
    				$('#business').val(ret.business_name);//商机名称赋值
    				$('#business_id').val(ret.business_no);//商机名称赋值
    			}
    			if(ret.project_person_name!==''&&ret.project_person_name!==null){
	    			$('#project_person_name').val(ret.project_person_name);//负责人赋值
	    			$('#project_person_name_id').val(ret.project_person_no);//负责人赋值
    			}
    			if(ret.contact_name!==''&&ret.contact_name!==null){
	    			$('#contacts').val(ret.contact_name);//联系人赋值
	    			$('#contacts_id').val(ret.contacts);//联系人赋值
    			}
    			$('#project_contract_time').val(new Date(ret.project_contract_time!=null?ret.project_contract_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'));//签约时间赋值
    			$('#project_date').val(new Date(ret.project_date!=null?ret.project_date.replace(/-/g,"/"):"").format('yyyy-MM-dd'));//结束时间赋值
    			if(ret.project_leader_name!==null){
    				$('#kaifazuzhang').html(ret.project_leader_name).removeClass('fcolor-a9');//开发组长赋值
    				$("#kaifazuzhang_no").val(ret.project_leader_no);//开发组长赋值
    			}
    			if(ret.project_crew_name!==null){
    				$('#kaifarenyuan').html(ret.project_crew_name).removeClass("fcolor-a9");//开发人员赋值
    				$('#kaifarenyuan_no').val(ret.project_crew_no);//开发人员赋值
    			}
    			if(ret.staff_name!==null){
    				$('#zhulirenyuan').html(ret.staff_name).removeClass("fcolor-a9");//助理人员赋值
    				$("#zhulirenyuan_no").val(ret.staff_no);//助理人员赋值
    			}
    			$('#project_name').val(ret.project_name);//项目名称赋值
    			$('#project_abbr').val(ret.project_abbr);//项目简称赋值
    			$('#project_code').val(ret.project_code);//项目代码赋值
				$('#project_start_time').val(new Date(ret.project_start_time!=null?ret.project_start_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'));//开始时间赋值
				$('#project_end_time').val(new Date(ret.project_end_time!=null?ret.project_end_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'));//结束时间赋值
    			if(ret.project_logo_path==null){
    				$('#photo').hide();
    				$('#div_logo').show().html(ret.project_abbr.substring(ret.project_abbr.length-2,ret.project_abbr.length));
    			}
    			$('#photo').attr('src',localStorage.url+ret.project_logo_path);//项目logo src赋值
    			$('#logo_id').val(ret.project_logo);
    			if(!ret.project_content==''&&!ret.project_content==null){
    				$('#project_content').val(removeHTMLTag(ret.project_content)); // 项目简介赋值
    			}
    			//加载商机信息
				business();
				//加载联系人信息
				contacts();
				//根据现在需求，项目详情不允许编辑
				$("input,textarea").attr("disabled","disabled").attr("id","");
				$("li").attr("onclick","");
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
//修改保存
function set_project_edit(){
	if($('#customer_id').val()==''){
		$aui.alert({
		title:'提示',
		content:'请选择客户',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if($('#project_name').val()==''){
		$aui.alert({
		title:'提示',
		content:'请输入项目名称',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if($('#project_abbr').val()==''){
		$aui.alert({
		title:'提示',
		content:'请输入项目简称',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	if($('#business').val()==''){
		$aui.alert({
		title:'提示',
		content:'请选择商机',
		buttons:['确定']},
		function(ret){
			
		});
		return;
	}
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/save_project_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "add_staff": localStorage.user_id,//操作人编号
				"cust_no":$('#customer_id').val(),//客户id
				"business_no":$('#business_id').val(),//business_no,//商机id
				"project_person_name":$('#project_person_name_id').val(),//负责人
				"contacts":$('#contacts_id').val(),//联系人
				"project_contract_time":$('#project_contract_time').val(),//签约时间
				"project_date":$('#project_date').val(),//结束时间
				"project_leader":$("#kaifazuzhang_no").val(),//开发组长id
				"project_crew":$("#kaifarenyuan_no").val(),//开发成员id
				"project_no":api.pageParam.project_no,
				"staff_no":$("#zhulirenyuan_no").val(),	//开发助理id
				"project_name":$('#project_name').val(),//项目名称
				"project_abbr":$('#project_abbr').val(),//项目简称
				"project_code":$('#project_code').val(),//项目代码
				"project_start_time":$('#project_start_time').val(),//开始时间
				"project_end_time":$('#project_end_time').val(),//结束时间
				"project_logo":$('#logo_id').val(),//项目logo
				"project_content":$('#project_content').val()  // 项目简介
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
							name: 'project_trackingHeader',
						    frameName:'project_tracking',
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
//上传图片js开始
//选择上传证件照
function uploudPhoto(type_i,type_img){
	//修改裁剪确定按钮事件
	$("#saveImage").attr("onclick","saveImage(\""+type_i+"\",\""+type_img+"\")");
	
	//打开底部菜单
	api.actionSheet({
	    buttons: ['拍照','相册']
	},function( ret, err ){
	    if(ret.buttonIndex == 1){
	    	getPicture('camera',type_img);
	    	st_y=$(window).scrollTop();
	    	$('html,body').animate({ scrollTop: '0px' }, 0);
	    }else if(ret.buttonIndex == 2){
	    	getPicture('library',type_img);
	    	st_y=$(window).scrollTop();
	    	$('html,body').animate({ scrollTop: '0px' }, 0);
	    }
	});
}
//保存裁剪后图片
function saveImage(type_i,type_img){
	FNImageClip.save({
		destPath: 'fs://imageClip/result.png'
    },function(ret, err){        
        if(ret) {
        	cutUploud(ret.destPath);
            $("#"+type_i).hide();//隐藏对应i字体
        	$("#"+type_img).show();//显示图片
	        $("#"+type_img).attr("src",ret.destPath);//图片链接赋值
	        if($("#"+type_img).is("img")==false){
	        	$("#"+type_img).html("<img class='aui-img-object aui-pull-left' width='50px' height='50px' src=\""+ret.destPath+"\"/>");
	        }
	        closeImageClip();//关闭裁剪器
	        $('#logo_par').addClass('p8-15');
			$('#logo_span').addClass('lh-50');
			$('#add_logo').hide();//显示提交图标
	        $('html,body').animate({ scrollTop: st_y }, 0);
        }
    });
}
//上传图片js结束
function cutUploud(filePath){
	var url = localStorage.url+"Api/Upload/file_upload";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: { 
	        },
	    	files: {file:filePath}
	    }
    },function(ret,err){
    	if(ret){
    		$('#div_logo').hide();
    		obj = ret.body;
	    	api.showProgress({
			    style: 'default',
			    animationType: 'fade',
			    title: '文件上传进度',
			    text: ret.progress+"%",
			    modal: false
			});
			if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
	    	if(1==ret.status){
	    		file_id = obj.upload_id;
	    		file_path = obj.upload_path;
	    		$('#logo_id').val(file_id);//保存文件id
	    		
			}
    	}
    });
}
//选取客户与id
function change(cust_name,cust_no){
	if(cust_name){
		$('#customer').html(cust_name).removeClass('fcolor-a9');
		$('#customer_id').val(cust_no);
		$('#business,#project_person_name,#contacts').removeAttr('disabled');
		$('#business,#project_person_name,#contacts,#business_id,#project_person_name_id,#contacts_id').val('');
		$('#business').attr('placeholder','请选择商机');
		$('#project_person_name').attr('placeholder','请选择负责人');
		$('#contacts').attr('placeholder','请选择联系人');
		//加载联系人信息
		contacts();
		//加载商机信息
		business();

	}
}