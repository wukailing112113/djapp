//页面初始化
apiready=function(){
	var userAgent = navigator.userAgent;
	var index = userAgent.indexOf("Android");
	if(index >= 0){  
		var androidVersion = parseFloat(userAgent.slice(index+8)); 
		if(androidVersion<4.4){}
		else{
			//监听手机软键盘是否打开
			sendEventKeyboardIsOpen();
			api.addEventListener({
		        name: 'keyBoardOpen'
		    }, function(ret, err){
				$("#save_btn").hide();
		    });
		    api.addEventListener({
		        name: 'keyBoardClose'
		    }, function(ret, err){
		        $("#save_btn").show();
		    });
		}
	}
    if(api.pageParam.type=="info"){
        $("#connect").addClass("di-n");
        $("#business").addClass("di-n");
        $("#order").addClass("di-n");
        $("#more").next("div").removeClass("di-n");
        get_customer_info()
    }
    get_staff_no();//获取市场部，销售部部门编号
    get_cust_type(mui, document);//获取类型
    get_cust_source(mui, document);//获取来源
    get_cust_area(mui, document);//获取地区
    get_cust_grade(mui, document);//获取等级
    get_cust_status(mui, document);//获取状态
}

//保存修改
function set_cust_add(){
	if($("#cust_name").val() == ""){
		$aui.alert({title:'提示',content:'请填写客户名称',buttons:['确定']},function(ret){});
		return;
	}else if($("#type_id").val() == ""){
		$aui.alert({title:'提示',content:'请选择客户类型',buttons:['确定']},function(ret){});
		return;
	}else if($("#source_id").val() == ""){
		$aui.alert({title:'提示',content:'请选择客户来源',buttons:['确定']},function(ret){});
		return;
	}else if($("#area_id").val()==""){
		$aui.alert({title:'提示',content:'请填选择客户地区',buttons:['确定']},function(ret){});
		return;
	}else if($("#grade_id").val() == ""){
		$aui.alert({title:'提示',content:'请选择客户等级',buttons:['确定']},function(ret){});
		return;
	}else if($("#status_id").val() == ""){
		$aui.alert({title:'提示',content:'请选择客户状态',buttons:['确定']},function(ret){});
		return;
	}else if($("#sale_man_no").val() == ""){
		$aui.alert({title:'提示',content:'请选择销售人员',buttons:['确定']},function(ret){});
		return;
	}else if($("#business_man_no").val() == ""){
		$aui.alert({title:'提示',content:'请选择商务人员',buttons:['确定']},function(ret){});
		return;
	}
	if(veifyurl($("#cust_url").val())==false){return;}//验证网址
	if(verifyMail($("#cust_email").val())==true){return;}//验证邮箱
	showProgress();//加载等待
    //ajax获取数据处理
	var url = localStorage.url+"Api/Crm/save_cust_info_app";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	            "cust_no": api.pageParam.cust_no,//客户id(有值为修改)
	            "cust_name":$("#cust_name").val(),//客户名称
	            "cust_type":$("#type_id").val(),//客户类型id
	            "cust_source":$("#source_id").val(),//客户来源id
	            "cust_area":$("#area_id").val(),//客户区域
	            "cust_level":$("#grade_id").val(),//客户等级
	            "status":$("#status_id").val(),//客户状态
	            "cust_addr":$("#address").val(),//客户地址
	            "sale_man":$("#sale_man_no").val(),//销售
	            "business_man":$("#business_man_no").val(),//商务
	            "other":$("#other").val(),//其他联系方式
	            "cust_url":$("#cust_url").val(),//网址
	            "cust_email":$("#cust_email").val(),//邮箱
	            "cust_acct_bank":$("#cust_acct_bank").val(),//开户行
	            "cust_acct_no":$("#cust_acct_no").val(),//银行账户
	            "cust_tax_no":$("#cust_tax_no").val(),//税务登记号
	            "cust_zip":$("#cust_zip").val(),//客户邮编
	            "add_staff":localStorage.user_id//当前用户
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			if(api.pageParam.type=="info"){
    				$aui.alert({title:'提示',content:"修改成功",buttons:['确定']},function(ret){
    					api.closeWin();
    				});
    			}else{
    				openNewWin("customer_relation_addHeader",ret.cust_no);
    				$("#save_btn").attr("onclick","openNewWin('customer_relation_addHeader',"+ret.cust_no+")").children().children().children("font").html("下一步");
    			}
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
var dept_no=""
//获取部门编号
function get_staff_no(){
//获取部门层级列表，获取销售，市场编号
   	var url = localStorage.url+"Api/Hr/get_dept_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
    				if(ret.list[i].dept_name=="森普软件"){
    					for(var bi=0;bi<ret.list[i].list.length;bi++){
//  						||ret.list[i].list[bi].dept_name=="总经办"
    						if(ret.list[i].list[bi].dept_name=="销售部"){
    							if(dept_no==""){
    								dept_no=ret.list[i].list[bi].dept_no;
    							}else{
    								dept_no+=","+ret.list[i].list[bi].dept_no
    							}
    						}
    						if(ret.list[i].list[bi].dept_name=="市场部"){
    							$("#market_no").attr("onclick","openSlidLayout('business','customer_addHeader','customer_add','','',"+ret.list[i].list[bi].dept_no+")");
    						}	
    					}
    				
    				}
    			}
    			$("#sale_no").attr("onclick","openSlidLayout('sale','customer_addHeader','customer_add','','',\""+dept_no+"\")");
			}
			else{
				$aui.alert({
    				title:'提示',
    				content:ret.msg,
    				buttons:['确定']},
    				function(ret){
    			});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

function get_customer_info(){
	showProgress();//加载等待
    //ajax获取数据处理
	var url = localStorage.url+"Api/Crm/get_cust_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	           "cust_no":api.pageParam.cust_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	    		$("#cust_name").val(ret.cust_name);//客户名称
				$("#type_name").val(ret.type_name);//客户类型id
				$("#type_id").val(ret.type_no),//客户类型id
				$("#source_name").val(ret.cust_source);
	            $("#source_id").val(ret.cust_source_no),//客户来源id
	            $("#area_name").val(ret.area_name);//客户区域
	            $("#area_id").val(ret.area_no),//客户区域
	            $("#grade_name").val(ret.cust_level);
	            $("#grade_id").val(ret.cust_level_no),//客户等级
	            $("#status_name").val(ret.cust_status);
	            $("#status_id").val(ret.cust_status_no),//客户状态
	            $("#address").val(ret.cust_addr);//客户地址
	            $("#sale_man").html(ret.sale_man_name).removeClass('fcolor-a9');
	            $("#sale_man_no").val(ret.sale_man);//销售
	            $("#business_man").html(ret.business_man_name).removeClass('fcolor-a9');
	            $("#business_man_no").val(ret.business_man);//商务
	            $("#other").val(ret.other);//其他联系方式
	            $("#cust_url").val(ret.cust_url);//网址
	            $("#cust_email").val(ret.cust_email);//邮箱
	            $("#cust_acct_bank").val(ret.cust_acct_bank);//开户行
	            $("#cust_acct_no").val(ret.cust_acct_no);//银行账户
	            $("#cust_tax_no").val(ret.cust_tax_no);//税务登记号
	            $("#cust_zip").val(ret.cust_email);//客户邮编
			}
			else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}
    	else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//滑动选择客户类型
function get_cust_type($, doc) {
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"type_group":"cust_type"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			//mui滑动选择
			    $.init();
			    $.ready(function() {
			        //普通示例
			        var userPicker = new $.PopPicker();
			        userPicker.setData(ret.list);
			        var showUserPickerButton = doc.getElementById('type_name');
			        showUserPickerButton.addEventListener('tap', function(event) {
			            userPicker.show(function(items) {
			                showUserPickerButton.value = items[0].text;
			                jQuery("#type_id").val(items[0].value);
			            });
			        }, false);
			    });
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
};

//滑动选择客户来源
function get_cust_source($, doc) {
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"type_group":"cust_source"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			//mui滑动选择
			    $.init();
			    $.ready(function() {
			        //普通示例
			        var userPicker = new $.PopPicker();
			        userPicker.setData(ret.list);
			        var showUserPickerButton = doc.getElementById('source_name');
			        showUserPickerButton.addEventListener('tap', function(event) {
			            userPicker.show(function(items) {
			                showUserPickerButton.value = items[0].text;
			                jQuery("#source_id").val(items[0].value);
			            });
			        }, false);
			    });
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
};

//滑动选择客户区域
function get_cust_area($, doc) {
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_area_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"area_pid":0
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			//mui滑动选择
			    $.init();
			    $.ready(function() {
			        //普通示例
			        var userPicker = new $.PopPicker({
						layer: 3
					});
			        userPicker.setData(ret.list);
			        var showUserPickerButton = doc.getElementById('area_name');
			        showUserPickerButton.addEventListener('tap', function(event) {
			            userPicker.show(function(items) {
			                showUserPickerButton.value = (items[0].text==undefined?"":items[0].text)+(items[1].text==undefined?"":" "+items[1].text)+(items[2].text==undefined?"":" "+items[2].text);
							jQuery("#area_id").val(items[2].value!=undefined?items[2].value:(items[1].value!=undefined?items[1].value:items[0].value));
			            });
			        }, false);
			    });
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
};

//滑动选择客户等级
function get_cust_grade($, doc) {
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"type_group":"cust_level"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			//mui滑动选择
			    $.init();
			    $.ready(function() {
			        //普通示例
			        var userPicker = new $.PopPicker();
			        userPicker.setData(ret.list);
			        var showUserPickerButton = doc.getElementById('grade_name');
			        showUserPickerButton.addEventListener('tap', function(event) {
			            userPicker.show(function(items) {
			                showUserPickerButton.value = items[0].text;
			                jQuery("#grade_id").val(items[0].value);
			            });
			        }, false);
			    });
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
};

//滑动选择客户状态
function get_cust_status($, doc) {
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 500,
	    data: {//传输参数
	    	values: { 
	    		"type_group":"cust_status"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			//mui滑动选择
			    $.init();
			    $.ready(function() {
			        //普通示例
			        var userPicker = new $.PopPicker();
			        userPicker.setData(ret.list);
			        var showUserPickerButton = doc.getElementById('status_name');
			        showUserPickerButton.addEventListener('tap', function(event) {
			            userPicker.show(function(items) {
			                showUserPickerButton.value = items[0].text;
			                jQuery("#status_id").val(items[0].value);
			            });
			        }, false);
			    });
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}(mui, document);

//选择人
function evaluate(type_id,staff_name,staff_no){
    var staff_name=staff_name.split(",");
    var staff_no=staff_no.split(",");
    if(type_id=="sale"){
        $("#sale_man").html(staff_name);
        $("#sale_man_no").val(staff_no);
        $("#sale_man").removeClass("fcolor-a9");
    }else if(type_id=="business"){
        $("#business_man").html(staff_name);
        $("#business_man_no").val(staff_no);
        $("#business_man").removeClass("fcolor-a9");
    }
    
}
//打开新页面
function openNewWin(winName,cust_no){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "cust_no":cust_no
        }
    });
}