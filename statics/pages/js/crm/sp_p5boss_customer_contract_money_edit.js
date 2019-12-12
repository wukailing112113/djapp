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

//页面初始化
apiready = function(){
    if(api.pageParam.type=='历程'){
    	$("#save_btn").hide();
        $("#progress").removeClass("di-n");
        get_get_cust_log_list();
    }else if(api.pageParam.type=='添加付款'){
        $("#price").removeClass("di-n")
        if(api.pageParam.cdetails_id!=null&&api.pageParam.cdetails_id!=""){
        	get_cust_contract_info();
        }
    }else if(api.pageParam.type=="开票"){
    	get_code_invoice_form();
    	get_code_invoice_type();
    	get_user_info();
    	if(api.pageParam.contract_no!=null&&api.pageParam.contract_no!=""){
    		load();
    	}
    }
}

//保存修改
function save(){
	if(api.pageParam.type=='添加付款'){
		if($("#cdetails_name").val()==""||$("#payment_time").val()==""||$("#payment_amount").val()==""){
			$aui.alert({title:'提示',content:'请填全数据',buttons:['确定']},function(ret){return});
		}
		showProgress();//加载等待   
		var url = localStorage.url+"Api/Crm/save_cust_contract_details";
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		            "contract_no":api.pageParam.contract_no,
		            "cdetails_id":api.pageParam.cdetails_id,
					"cdetails_name":$("#cdetails_name").val(),
					"payment_time":$("#payment_time").val(),
					"payment_amount":$("#payment_amount").val()
		        }
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			$aui.alert({title:'提示',content:'操作成功',buttons:['确定']},function(ret){
	    				api.execScript({
						    name:'customer_contract_editHeader',
						    frameName:'customer_contract_edit',
						    script: "load("+api.pageParam.contract_no+")"
						});
                        api.execScript({
	                        name:'customer_infoHeader',
						    frameName:'customer_info',
						    script: "exec()"
                        });
						api.closeWin();
	    			});
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
	}else if(api.pageParam.type=="开票"){
		var invoice_type="";
		var invoice_type_name="";
		var invoice_form="";
		$("input[name='invoice_type']:checked").each(function(){
		    invoice_type=$(this).val();
		    invoice_type_name=$(this).next("div").text();
		});
		$("input[name='invoice_form']:checked").each(function(){
		    invoice_form=$(this).val();
		});
		var url=localStorage.url+(api.pageParam.contract_no!=null&&api.pageParam.contract_no!=""?"Api/Crm/save_cust_contract_invoice":"Api/Crm/save_cust_info_app");
		api.ajax({
		    url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		            "cust_no":api.pageParam.cust_no,
		            "contract_no":api.pageParam.contract_no,
		            "invoice_type":invoice_type,
		            "invoice_form":invoice_form,
		            "cust_name":$("#cust_name").val(),
		            "cust_tax_no":$("#cust_tax_no").val(),
		            "cust_acct_bank":$("#cust_acct_bank").val(),
		            "other":$("#custcontact_mobile").val(),
		            "custcontact_mobile":$("#custcontact_mobile").val(),
					"cust_addr":$("#custcontact_addr").val(),
					"custcontact_addr":$("#custcontact_addr").val(),
					"cust_acct_no":$("#cust_acct_no").val(),
		        }
		    }
	    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			$aui.alert({title:'提示',content:'操作成功',buttons:['确定']},function(ret){
	    			api.execScript({
	    				name: 'customer_contract_editHeader',
    					frameName: 'customer_contract_edit',
	                    script: 'assignment_type('+invoice_type+',\''+invoice_type_name+'\','+invoice_form+',\''+$("#cust_name").val()+'\',\''+$("#cust_tax_no").val()+'\','+
	                    '\''+$("#cust_acct_bank").val()+'\',\''+$("#custcontact_mobile").val()+'\',\''+$("#custcontact_addr").val()+'\',\''+$("#cust_acct_no").val()+'\');'
                    });
	    			api.closeWin()
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
//获取开票形式
function get_code_invoice_type(){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Bd/get_code_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "code_group":'invoice_type_code',
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
					$("#invoice_type").append(
						'<div class="aui-col-xs-6">'+
	    					'<input class="aui-radio aui-radio-info" type="radio" name="invoice_type" value="'+ret.list[i].value+'">'+
	    					'<div class="aui-radio-name fsize-12 mr-0 ellipsis-one">'+ret.list[i].text+'</div>'+    
    					'</div>'             
    				)
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
    })
}
//获取开票情况
function get_code_invoice_form(){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Bd/get_code_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "code_group":'invoice_form_code',
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
    				$("#invoice_form").append(
    					'<div class="aui-col-xs-6">'+
	    					'<input class="aui-radio aui-radio-info" type="radio" name="invoice_form" value="'+ret.list[i].value+'">'+
	    					'<div class="aui-radio-name fsize-12 mr-0 ellipsis-one">'+ret.list[i].text+'</div>'+ 
	    				'</div>'                
    				)
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
    })
}

//获取客户信息
function get_user_info(){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Crm/get_cust_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":api.pageParam.cust_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#cust_name").val(ret.cust_name);
    			$("#custcontact_mobile").val(ret.other);
    			$("#custcontact_addr").val(ret.cust_addr);
    			$("#cust_tax_no").val(ret.cust_tax_no);
    			$("#cust_acct_bank").val(ret.cust_acct_bank);
    			$("#cust_acct_no").val(ret.cust_acct_no);
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

//获取历程列表
function get_get_cust_log_list(){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Crm/get_cust_log_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "cust_no":api.pageParam.cust_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			var container=0;
    			var time="";
    			for(var i=0;i<ret.list.length;i++){
    				if(i==0){
    					time=new Date(ret.list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd");
    					$("#progress").append(
    						'<ul class="aui-timeline" id='+container+'>'+
				                '<li class="aui-time-label">'+
				                    '<span class="aui-bg-info">'+new Date(ret.list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd")+'</span>'+
				                '</li>'+
				           '</ul>'
    					)
    				}
    				else{
    					if(time!=new Date(ret.list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd")){
    						container++;
    						time=new Date(ret.list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd");
    						$("#progress").append(
	    						'<ul class="aui-timeline" id='+container+'>'+
					                '<li class="aui-time-label">'+
					              		'<span class="aui-bg-info">'+new Date(ret.list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd")+'</span>'+
					                '</li>'+
					           '</ul>'
	    					)
    					}
    				}
    				$("#"+container).append(
    					'<li>'+
		                    '<i class="aui-iconfont aui-icon-edit aui-bg-info"></i>'+
		                    '<div class="aui-timeline-item">'+
		                        '<span class="aui-timeline-time fsize-12 fcolor-33"><i class="aui-iconfont aui-icon-time"></i>'+new Date(ret.list[i].add_time.replace(/-/g,"/")).format("hh:mm")+'</span>'+
		                        '<h3 class="aui-timeline-header fsize-12 fcolor-33">'+ret.list[i].log_type+'</h3>'+
		                        '<div class="aui-timeline-body">'+
		                            '<p>操作人：'+(ret.list[i].add_staff_name!=null?ret.list[i].add_staff_name:"")+'</p>'+
		                            '<p>'+ret.list[i].log_content+'</p>'+
		                        '</div>'+
		                    '</div>'+
		                '</li>'
    				)
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
//获取款项详情
function get_cust_contract_info(){
	$("#cdetails_name").val(api.pageParam.cdetails_name);
	$("#payment_time").val(api.pageParam.payment_time);
	$("#payment_amount").val(api.pageParam.payment_amount);
}
//加载数据
function load(){
	showProgress();//加载等待   
	var url = localStorage.url+"Api/Crm/get_cust_contract_invoice";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "contract_no":api.pageParam.contract_no,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("input[name='invoice_type']").each(function(){
				    if($(this).val()==ret.invoice_type_no){
				    	$(this).attr("checked",true)
				    }
				 });
				 $("input[name='invoice_form']").each(function(){
				    if($(this).val()==ret.invoice_form_no){
				    	$(this).attr("checked",true)
				    }
				 });
    			$("#cust_name").val(ret.cust_name);
    			$("#cust_tax_no").val(ret.cust_tax_no);
    			$("#cust_acct_bank").val(ret.cust_acct_bank);
    			$("#cust_acct_no").val(ret.cust_acct_no);
    			$("#custcontact_mobile").val(ret.custcontact_mobile);
    			$("#custcontact_addr").val(ret.custcontact_addr);
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

