//var arr1=[];//选择客户
var arr2=[];//选择客户联系人
//页面初始化
apiready = function(){
	get_opportunity_info(api.pageParam.business_no);
	get_business_info();//获取商机详情
	contacts_add();//初始联系人选择器
	if(api.pageParam.cust_no != undefined){//此操作用于从添加客户时直接添加商机处理方案
		$("#cust_li").hide();
		get_contacts_list(api.pageParam.cust_no);//获取联系人数据
	}
}

//获取客户信息
//function cust(){
//	showProgress();//加载等待
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
//				aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
//			}
//			api.hideProgress();//隐藏进度提示框
//  	}else{
//  		api.hideProgress();//隐藏进度提示框
//  		/**无网络提示 */
//	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
//  	}
//  });
//}
//添加客户信息
//function cust_add(){
//	(function($, doc) {
//	//mui滑动选择
//	$.init();
//		$.ready(function() {
//			//客户
//			var custPicker = new $.PopPicker();
//			custPicker.setData(arr1);
//			var showUserPickerButton = doc.getElementById('customer');
//			showUserPickerButton.addEventListener('tap', function(event) {
//				custPicker.show(function(items) {
//					showUserPickerButton.value = items[0].text;
//					jQuery("#customer_id").val(items[0].value);
//					get_contacts_list(items[0].value);//获取联系人列表
//					
//				});
//			}, false);
//		});
//	})(mui, document);	
//}
function get_contacts_list(id){
	$("#contacts").val("");
	$("#contacts").attr("disabled",false);
	$("#contacts_add").attr("onclick","")
	showProgress();//加载等待
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
    			userPicker.dispose();
    			contacts_add();
			}
			else{
				$("#contacts").val("请添加联系人");
				$("#contacts").attr("disabled",true);
				$("#contacts_add").attr("onclick","openNewWin('customer_contact_editHeader','','',"+id+")")
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
//添加联系人信息
var userPicker;
function contacts_add(){
	(function($, doc) {
	//mui滑动选择
	$.init();
		$.ready(function() {
			//客户
			userPicker = new $.PopPicker();
			userPicker.setData(arr2);
			var showUserPickerButton = doc.getElementById('contacts');
			showUserPickerButton.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					showUserPickerButton.value = items[0].text;
					jQuery("#contacts_id").val(items[0].value);
				});
			}, false);
		});
	})(mui, document);	
}
//选择沟通人
function evaluate(type_id,staff_name,staff_no){
    var staff_name=staff_name.split(",");
    var staff_no=staff_no.split(",");
    if(type_id=="connect"){
        $("#connect").html(staff_name);
        $("#connect").removeClass("fcolor-a9");
    }else if(type_id=="given"){
        $("#given").html(staff_name);
        $("#given").removeClass("fcolor-a9");
    }else if(type_id=="people"){
        $("#people").html(staff_name);
        $("#business_contact").val(staff_no);
        $("#people").removeClass("fcolor-a9");
    }
    
}

//获取商机详情
function get_business_info(){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Crm/get_business_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "business_no":api.pageParam.business_no//商机编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#customer").val(ret.cust_name);//客户名称
    			$("#customer_id").val(ret.cust_no);//客户编号
    			$("#business_name").val(ret.business_name);//商机名称
    			$("#contacts").val(ret.custcontact_name);//联系人名称
    			$("#contacts_id").val(ret.business_contact);//联系人编号
    			$("#business_content").val(ret.business_content != null?ret.business_content:"");//简介
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

var business_no=""
//保存修改
function save(){
	if(api.pageParam.cust_no == undefined && $("#customer_id").val()==""){//客户
		$aui.alert({title:"提示",content:"请选择客户",buttons:["确定"]},function(ret){});
		return;
	}else if($("#business_name").val()==""){//商机
		$aui.alert({title:"提示",content:"请填写商机名称",buttons:["确定"]},function(ret){});
		return;
	}else if($("#contacts_id").val()==""){//联系人
		$aui.alert({title:"提示",content:"请选择联系人",buttons:["确定"]},function(ret){});
		return;
	}
	showProgress();//加载等待	
	var url = localStorage.url+"Api/Crm/save_cust_business_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"business_no":api.pageParam.business_no,//商机编号，当此字段存在是为修改
	            "cust_no":api.pageParam.cust_no != undefined?api.pageParam.cust_no:$("#customer_id").val(),
				"business_name":$("#business_name").val(),
				"business_contact":	$("#contacts_id").val(),//联系人
				"business_content":$("#business_content").val(),//简介
				"add_staff":localStorage.user_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			business_no=ret.business_no;
    			$aui.alert({title:'提示',content:"添加商机成功",buttons:['确定']},function(ret){
    				openNewWin('customer_public_editHeader','报价');
    				api.execScript({
    					name:"customer_relation_addHeader",
    					frameName:"customer_relation_add",
	                    script: 'exec();'
                    });
                    api.execScript({
    					name:"business_listHeader",
    					frameName:"business_list",
	                    script: 'exec();'
                    });
                    api.execScript({
    					name:"customer_public_editHeader",
    					frameName:"customer_public_edit",
	                    script: 'get_business_list('+api.pageParam.cust_no+');'
                    });
                    $("#save_btn").attr("onclick","openNewWin('customer_public_editHeader','报价')").children().children().children("font").html("添加报价");
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
    })
}
var quote;
//获取商机报价
function get_opportunity_info(id){
	showProgress();//加载等待	
	var url = localStorage.url+"Api/Crm/get_cust_quote_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "business_no":id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#cust_quote_list").html("");
    			for(var i=0;i<ret.list.length;i++){
    				$("#cust_quote_list").append(
    					'<div id='+i+' class="pl-10 pr-10 bg-color-gray2 bor-ra-8 hr-d-gray2 mb-10" onclick="openNewWin(\'customer_public_editHeader\',\'报价\','+ret.list[i].quote_no+')">'+
		                    '<li id="produt_name" class="aui-col-xs-12">报价编号:'+ret.list[i].quote_no+'</li>'+
		                    '<li class="aui-col-xs-12">添加时间：'+ret.list[i].add_time+'</li>'+
		                    '<li class="aui-col-xs-6">产品：'+ret.list[i].produt_name+'</li>'+
		                    '<li class="aui-col-xs-6">单价：￥'+ret.list[i].qdetails_price+'</li>'+
		                    '<li class="aui-col-xs-6">数量：'+ret.list[i].qdetails_num+'</li>'+
		                    '<li class="aui-col-xs-6">总价：￥'+ret.list[i].qdetails_amount+'</li>'+
		                    '<li class="aui-col-xs-12">需求：'+ret.list[i].qdetails_content+'</li>'+                     
		                '</div>' 
    				)
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
//选择客户后的回调事件
function change(name,no){
	$("#customer").val(name);
	$("#customer_id").val(no);
	get_contacts_list(no);//获取联系人列表
}
//打开新页面
function openNewWin(winName,type,quote_no,cust_no){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "type":type,
            "id":business_no,
            "quote_no":quote_no,//修改报价单用
            "cust_no":cust_no//添加联系人用
        }
    });
}
//打开PMS模块
function openPmsWin(winName){
	api.openWin({
        name: winName,
        url: '../pms/header/'+winName+'.html',
        pageParam:{
        }
    });
}