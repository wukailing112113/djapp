//var arr1=[];//选择客户
var arr2=[];//选择客户联系人
var business_list=[];//商机列表
apiready = function(){
	showProgress();//加载等待
	if(api.pageParam.cust_no != undefined){//添加客户时直接添加预约客户编号不为空,这里需要隐藏客户选择区
		$("#customer").hide();
		get_business_list(api.pageParam.cust_no);//加载商机数据
		get_contacts_list(api.pageParam.cust_no);//加载对接人数据
	}
	if(api.pageParam.id != undefined){
		$("#business").hide();
	}
//	cust();//加载客户信息
	productType();//加载类型
    if(api.pageParam.type=="报价"){
       $("#price").removeClass("di-n"); 
       if(api.pageParam.quote_no!=null&&api.pageParam.quote_no!=""){
       		get_quote();
       }
    }else if(api.pageParam.type=="报备"){
        $("#recode").removeClass("di-n");
        get_code_list();
        if(api.pageParam.filing_no!=null&&api.pageParam.filing_no!=""){
        	get_code_info();
        }
    }else if(api.pageParam.type=="沟通"){
    	jQuery("#business_name").attr("disabled",false);
        $("#connect").removeClass("di-n"); 
        get_communication_list();
        //加载沟通详情
	    if(api.pageParam.commu_id!=null&&api.pageParam.commu_id!="" && api.pageParam.commu_id!=undefined){
	   		get_cust_communication_info();
		}
    }
    if(api.pageParam.type_id=="沟通"){
    	jQuery("#business_name").attr("disabled",true);
        $("#customer").removeClass("di-n")
    }
    $("#connect_name").html(localStorage.user_name).removeClass("fcolor-a9");//沟通人名称
    $("#connect_no").val(localStorage.user_id);//沟通人编号  
    //获取预约详情，修改是使用
    contacts_add();//初始客户选择器
    openBusinessPicker();//初始商机选择器
}

//获取客户信息
//function cust(){
//	var url = localStorage.url+"Api/Crm/get_cust_list";
//	api.ajax({
//	    url:url,
//	    method: 'post',
//	    timeout: 100,
//	    data: {//传输参数
//	    	values: { 
//	            
//	        }
//	    }
//  },function(ret,err){
//  	if(ret){
//  		if(ret.status==1){
//  			for(var i=0;i<ret.cust_list.length;i++){
//  				arr1[i]={"value":ret.cust_list[i].cust_no,"text":ret.cust_list[i].cust_name};
//  			}
//  			cust_add();
//			}
//			else{
//				alert(ret.msg,"提示");
//			}
//			api.hideProgress();//隐藏进度提示框
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}
//客户选择器赋值
//function cust_add(){
//	(function($, doc) {
//	//mui滑动选择
//	$.init();
//		$.ready(function() {
//			//客户
//			var custPicker = new $.PopPicker();
//			custPicker.setData(arr1);
//			var showUserPickerButton = doc.getElementById('customer_name');
//			showUserPickerButton.addEventListener('tap', function(event) {
//				custPicker.show(function(items) {
//					showUserPickerButton.value = items[0].text;
//					jQuery("#customer_id").val(items[0].value);
//					get_contacts_list(items[0].value);//获取联系人列表
//					get_business_list(items[0].value);//获取商机列表
//					jQuery("#business_name").attr("disabled",false);
//				});
//			}, false);
//		});
//	})(mui, document);	
//}

function get_contacts_list(id){
	var url = localStorage.url+"Api/Crm/get_cust_contact_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.contact_list.length;i++){
    				arr2[i]={"value":ret.contact_list[i].custcontact_no,"text":ret.contact_list[i].custcontact_name};
    			}
    			jQuery("#given_name").attr("disabled",false);
    			userPicker.dispose();
    			contacts_add();
			}
			else{
				$("#contacts").val("请添加联系人");
//				aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//对接人人选择器
var userPicker;
function contacts_add(){
	(function($, doc) {
	//mui滑动选择
	$.init();
		$.ready(function() {
			//客户
			userPicker = new $.PopPicker();
			userPicker.setData(arr2);
			var showUserPickerButton = doc.getElementById('given_name');
			showUserPickerButton.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					jQuery("#given_name").val(items[0].text).removeClass("fcolor-a9");
					jQuery("#given_no").val(items[0].value);
				});
			}, false);
		});
	})(mui, document);	
}

//获取商机列表
function get_business_list(id){
	var url = localStorage.url+"Api/Crm/get_cust_business_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#business_name").val("");
    			$("#business").attr("onclick","");
    			$("#business_name").attr("disabled",false);
    			for(var i=0;i<ret.business_list.length;i++){
    				business_list[i]={"value":ret.business_list[i].business_no,"text":ret.business_list[i].business_name};
    			}
    			businessPicker.dispose();
    			openBusinessPicker();
			}
			else{
				$("#business_name").val("请添加商机");
				$("#business").attr("onclick","openNewWin('business_editHeader','',"+id+")");
//				aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//商机选择器
var businessPicker;
function openBusinessPicker(){
	(function($, doc) {
	//mui滑动选择
	$.init();
		$.ready(function() {
			//客户
			businessPicker = new $.PopPicker();
			businessPicker.setData(business_list);
			var showUserPickerButton = doc.getElementById('business_name');
			showUserPickerButton.addEventListener('tap', function(event) {
				businessPicker.show(function(items) {
					showUserPickerButton.value=items[0].text;
					jQuery("#business_no").val(items[0].value);
				});
			}, false);
		});
	})(mui, document);	
}

var arr_productType=[];//选择产品
//获取产品类型
function productType(){
	var url = localStorage.url+"Api/Bd/get_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "type_group":"cust_product"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
    				arr_productType[i]={"value":ret.list[i].type_no,"text":ret.list[i].text};
    			}
    			productType_add();
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
//滑动选择提醒类型
function productType_add(){
	(function($, doc) {
	    //      mui滑动选择
	    $.init();
	    $.ready(function() {
	        //普通示例
	        var userPicker = new $.PopPicker();
	        userPicker.setData(arr_productType);
	        var showUserPickerButton = doc.getElementById('produt');
	        showUserPickerButton.addEventListener('tap', function(event) {
	            userPicker.show(function(items) {
	                showUserPickerButton.value = items[0].text;
	                jQuery("#produt_id").val(items[0].value);
	            });
	        }, false);
	    });
	})(mui, document);
}

//选择对接人
function evaluate(type_id,staff_name,staff_no){
    var staff_name=staff_name.split(",");
    var staff_no=staff_no.split(",");
    if(type_id=="given"){
        $("#given_name").html(staff_name);
        $("#given_no").val(staff_no);
        $("#given_name").removeClass("fcolor-a9");
    }else if(type_id=="connect"){
        $("#connect_name").html(staff_name);
        $("#connect_no").val(staff_no);
        $("#connect_name").removeClass("fcolor-a9");
    }else if(type_id=="customer"){
        $("#customer_name").html(staff_name);
         $("#customer_no").val(staff_no);
        $("#customer_name").removeClass("fcolor-a9");
    }
    
}
//赋值总价
function assignment(){
	$("#qdetails_amount").val($("#qdetails_price").val()*$("#qdetails_num").val());
}
//修改时赋值用
function get_quote(){
	var url = localStorage.url+"Api/Crm/get_cust_quote_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"quote_no":api.pageParam.quote_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#qdetails_container").html("<div id='qdetails_content'contenteditable class='ti-2 pb-10 webkit_text'></div>")
				$("#produt").val(ret.quote.produt_name);
				$("#produt_id").val(ret.quote.produt_id);
				$("#qdetails_price").val(ret.quote.qdetails_price);
				$("#qdetails_num").val(ret.quote.qdetails_num);
				$("#qdetails_amount").val(ret.quote.qdetails_amount);
				$("#qdetails_content").html(ret.quote.qdetails_content);
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
    });
}

//获取预约详情
function get_cust_communication_info(){
	var url = localStorage.url+"Api/Crm/get_cust_communication_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"commu_id":api.pageParam.commu_id//预约id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#customer_id").val(ret.cust_no);//修改沟通用
    			$("#business_no").val(ret.business_no);//修改沟通用
    			$("#commu_container").html("<div id='commu_content'contenteditable class='ti-2 pb-10 webkit_text'></div>")
    			//提醒时间转换
    			var dt1 = new Date(ret.alert_time.replace(/-/g,"/"));//提醒时间
    			var dt2= new Date(ret.commu_time.replace(/-/g,"/"));//预约时间
    			var day = parseInt((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24)); //结果是天数，你可以根据自己的需求换成小时，分钟等
    			var time = parseInt((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60)); //结果是小时，你可以根据自己的需求换成小时，分钟等
    			$("#business_name").val(ret.business_name);//商机名称
    			$("#business_no").val(ret.business_no);//商机编号
    			$("#commu_content").html(ret.commu_content);//预约说明
    			$("#commu_time").val(ret.commu_time);//预约时间
    			$("#customer_type").val(ret.commu_type_name);//预约类型名称
    			$("#type_id").val(ret.commu_type);//预约类型编号
    			$("#customer_status").val(ret.status_name);//状态名称
    			$("#status_id").val(ret.status_no);//状态编号
    			$("#given_name").val(ret.reception_man_name).removeClass("fcolor-a9");//对接人
    			$("#given_no").val(ret.reception_man);//对接人编号
    			$("#connect_name").html(ret.commu_man_name);//沟通人名称
    			$("#connect_no").val(ret.commu_man);//沟通人编号
    			$("#remind").val(time == 1?"1小时":(!isNaN(day)?day+"天":"不提醒"));//提醒时间名称
    			$("#remind_time").val(time == 1?"05":(isNaN(day)?"01":(day == 1?"04":(day == 2?"03":"02"))));//提醒时间编号
    			$("#memo").val(ret.memo);//备注
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//获取报备详情
function get_code_info(){
	var url = localStorage.url+"Api/Crm/get_cust_filing_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"filing_no":api.pageParam.filing_no//预约id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#filing_container").html("<div id='filing_content'contenteditable class='ti-2 pb-10 webkit_text'></div>")
    			$("#customer_record").val(ret.filing_cycle_name);
    			$("#record_id").val(ret.filing_cycle);
				$("#filing_content").html(ret.filing_content);
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//保存修改
function save(){
	if(api.pageParam.type=="报价"){
		if($("#produt_id").val() == ""){//产品
			$aui.alert({title:"标题",content:"请选择产品",buttons:["确认"]},function(ret){});
			return;
		}else if($("#qdetails_price").val() == ""){//单价
			$aui.alert({title:"提示",content:"请填写单价",buttons:["确认"]},function(ret){});
			return;
		}else if($("#qdetails_num").val() == ""){//数量
			$aui.alert({title:"提示",content:"请填写数量",buttons:["确认"]},function(ret){});
			return;
		}
		showProgress();//加载等待	
		var url = localStorage.url+"Api/Crm/save_cust_quote_info";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		    		"quote_no":api.pageParam.quote_no,
		            "business_no":api.pageParam.id,
					"produt_id":$("#produt_id").val(),
					"qdetails_price":$("#qdetails_price").val(),
					"qdetails_num":	$("#qdetails_num").val(),
					"qdetails_amount":$("#qdetails_amount").val(),
					"qdetails_content":(api.pageParam.quote_no!=null?$("#qdetails_content").text():$("#qdetails_content").val()),
					"add_staff":localStorage.user_id
		        }
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			api.hideProgress();//隐藏进度提示框
	    			$aui.alert({title:'提示',content:"添加报价成功",buttons:['确定']},function(ret){
	    				api.execScript({
						    name: 'business_editHeader',
						    frameName: 'business_edit',
						    script: "get_opportunity_info("+api.pageParam.id+")"
					    });
					    if(api.pageParam.qoote_type=="1"){
					    	api.execScript({
							    name: 'customer_infoHeader',
							    frameName:'customer_info',
							    script: "exec()"
						    });
					    }
	    				api.closeWin();
	    			});
				}
				else{
					api.hideProgress();//隐藏进度提示框
					$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
				}
	    	}else{
	    		api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	}
	    });
	}
	else if(api.pageParam.type=="沟通"){
		if(api.pageParam.cust_no == undefined && $("#customer_id").val() == ""){//客户
			$aui.alert({title:"提示",content:"请选择客户",buttons:['确定']},function(ret){});
			return;
		}else if(api.pageParam.id == undefined && $("#business_no").val()==""){//商机
			$aui.alert({title:"提示",content:"请选择商机",buttons:['确定']},function(ret){});
			return;
		}else if($("#type_id").val()==""){//类型
			$aui.alert({title:"提示",content:"请选择类型",buttons:['确定']},function(ret){});
			return;
		}else if($("#status_id").val()==""){//状态
			$aui.alert({title:"提示",content:"请选择状态",buttons:['确定']},function(ret){});
			return;
		}else if($("#connect_no").val()==""){//沟通人
			$aui.alert({title:"提示",content:"请选择沟通人",buttons:['确定']},function(ret){});
			return;
		}else if($("#given_no").val()==""){//对接人
			$aui.alert({title:"提示",content:"请选择对接人",buttons:['确定']},function(ret){});
			return;
		}
		showProgress();//加载等待	
		var url = localStorage.url+"Api/Crm/save_communication_info";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		    		"cust_no":api.pageParam.cust_no != undefined?api.pageParam.cust_no:$("#customer_id").val(),//添加客户时直接添加预约客户编号不为空
		           	"business_no":api.pageParam.id != undefined&&api.pageParam.id != ""?api.pageParam.id:$("#business_no").val(),//商机编号
		            "commu_id":api.pageParam.commu_id,
		            "commu_time":$("#commu_time").val(),
		            "commu_type":$("#type_id").val(),
					"commu_content":(api.pageParam.commu_id!=null?$("#commu_content").html():$("#commu_content").val()),
					"status":$("#status_id").val(),
					"commu_man":$("#connect_no").val(),
					"reception_man":$("#given_no").val(),
					"alert_time":$("#remind_time").val(),
					"add_staff":localStorage.user_id,
					"memo":$("#memo").val()
					
		        }
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			api.hideProgress();//隐藏进度提示框
	    			$aui.alert({title:'提示',content:"操作成功",buttons:['确定']},function(ret){
	    				api.execScript({
	                        name:"customer_relation_addHeader",
	                        frameName:"customer_relation_add",
	                        script: 'exec();'
                        });
                        api.execScript({
	                        name:"connect_listHeader",
	                        frameName:"connect_list",
	                        script: 'exec();'
                        });
                        api.execScript({
						    name: 'customer_infoHeader',
						    frameName:'customer_info',
						    script: "exec()"
					    });
	    				api.closeWin();
	    			});
				}
				else{
					api.hideProgress();//隐藏进度提示框
					$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
				}
	    	}else{
	    		api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	}
	    });
	}else if(api.pageParam.type=="报备"){
		var url = localStorage.url+"Api/Crm/save_cust_filing_info";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		            "business_no":api.pageParam.id,
		            "filing_no":api.pageParam.filing_no,//修改用
					"filing_cycle":	$("#record_id").val(),
					"filing_content":(api.pageParam.filing_no!=undefined?$("#filing_content").html():$("#filing_content").val()),
					"add_staff":localStorage.user_id
		        }
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			api.hideProgress();//隐藏进度提示框
	    			$aui.alert({title:'提示',content:"添加报备成功",buttons:['确定']},function(ret){
	    				api.execScript({
						    name: 'customer_infoHeader',
						    frameName:'customer_info',
						    script: "exec()"
					    });
	    				api.closeWin();
	    			});
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
    	});
    }
}
//选择客户后返回客户信息方法
function change(name,no){
	$("#customer_name").val(name);
	$("#customer_id").val(no);
	get_contacts_list(no);//获取联系人列表
	get_business_list(no);//获取商机列表
}

//打开新页面
function openNewWin(winName,type,cust_no){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "type":type,
            "cust_no":cust_no,
        }
    });
}
//打开选择客户页面
function openPmsWin(winName){
	api.openWin({
        name: winName,
        url: '../pms/header/'+winName+'.html',
        pageParam:{
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
//获取报备的周期
function get_code_list(){
	var url = localStorage.url+"Api/Bd/get_code_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "code_group":"filing_cycle"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			addCode(ret.list);
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
    });
}
//添加报备周期
function addCode(list){
	(function($, doc) {
	   //  mui滑动选择
	    $.init();
	    $.ready(function() {
	        //普通示例
	        var userPicker = new $.PopPicker();
	        userPicker.setData(list);
	        var showUserPickerButton = doc.getElementById('customer_record');
	        showUserPickerButton.addEventListener('tap', function(event) {
	            userPicker.show(function(items) {
	                showUserPickerButton.value = items[0].text;
	                jQuery("#record_id").val(items[0].value);
	            });
	        }, false);
	    });
	})(mui, document);
}

//获取沟通类型
function get_communication_list(){
	var url = localStorage.url+"Api/Bd/get_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "type_group":"communication_type"
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			add_communication_type(ret.list);
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
    });
}

//滑动选择沟通类型
function add_communication_type(list){
	(function($, doc) {
	    //      mui滑动选择
	    $.init();
	    $.ready(function() {
	        //普通示例
	        var userPicker = new $.PopPicker();
	        userPicker.setData(list);
	        var showUserPickerButton = doc.getElementById('customer_type');
	        showUserPickerButton.addEventListener('tap', function(event) {
	            userPicker.show(function(items) {
	                showUserPickerButton.value = items[0].text;
	                jQuery("#type_id").val(items[0].value);
	            });
	        }, false);
	    });
	})(mui, document);
}

//滑动选择沟通状态
(function($, doc) {
    //      mui滑动选择
    $.init();
    $.ready(function() {
        //普通示例
        var userPicker = new $.PopPicker();
        userPicker.setData([{
            value: '1',
            text: '预约'
        }, {
            value: '2',
            text: '完成'
        }, {
            value: '3',
            text: '延期'
        },
        {
            value: '4',
            text: '取消'
        }]);
        var showUserPickerButton = doc.getElementById('customer_status');
        showUserPickerButton.addEventListener('tap', function(event) {
            userPicker.show(function(items) {
                showUserPickerButton.value = items[0].text;
                jQuery("#status_id").val(items[0].value);
            });
        }, false);
    });
})(mui, document);

//滑动选择提醒类型
(function($, doc) {
    //      mui滑动选择
    $.init();
    $.ready(function() {
        //普通示例
        var userPicker = new $.PopPicker();
        userPicker.setData([{
            value: '01',
            text: '不提醒'
        }, {
            value: '02',
            text: '3天'
        }, {
            value: '03',
            text: '2天'
        }, {
            value: '04',
            text: '1天'
        }, {
            value: '05',
            text: '1小时'
        }]);
        var showUserPickerButton = doc.getElementById('remind');
        showUserPickerButton.addEventListener('tap', function(event) {
            userPicker.show(function(items) {
                showUserPickerButton.value = items[0].text;
                jQuery("#remind_time").val(items[0].value);
            });
        }, false);
    });
})(mui, document);