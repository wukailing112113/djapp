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
                if(btn.id=="contract_signtime"){
                	end_tiem();
                }
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


////滑动选择开票情况
//(function($, doc) {
//  //      mui滑动选择
//  $.init();
//  $.ready(function() {
//      //普通示例
//      var userPicker = new $.PopPicker();
//      userPicker.setData([{
//          value: '01',
//          text: '不开票'
//      }, {
//          value: '02',
//          text: '6%增值税发票'
//      }, {
//          value: '03',
//          text: '17%增值税发票'
//      }]);
//      var showUserPickerButton = doc.getElementById('add_status');
//      showUserPickerButton.addEventListener('tap', function(event) {
//          userPicker.show(function(items) {
//              showUserPickerButton.value = items[0].text;
//              jQuery("#add_id").val(items[0].value);
//          });
//      }, false);
//  });
//})(mui, document);

//页面初始化
apiready = function(){
    if(api.pageParam.type=='add'){
        $("#contract_number").removeClass("di-n");
    }
    else{
    	load(api.pageParam.contract_no);
    	get_cust_contract_invoice(api.pageParam.contract_no);//获取开票详情
    }
}
var stats=false
//加载合同列表
function load(id){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Crm/get_cust_contract_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "contract_no":id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#payment").show();
				$("#button").show();
				$("#paper_contract_no").val(ret.paper_contract_no);
    			$("#contract_signtime").val(ret.contract_signtime);
    			$("#contract_develop_num").val(ret.contract_develop_num);
    			$("#contract_develop_endtime").val(ret.contract_develop_endtime);
    			$("#contract_beta_num").val(ret.contract_beta_num);
    			$("#contract_warranty_num").val(ret.contract_warranty_num);
    			$("#contract_amount").val(ret.contract_amount)
    			$("#con_list").html("");
    			for(var i=0;i<ret.pay_list.length;i++){
    				$("#con_list").append(
    					'<div class="aui-flex-col aui-flex-center aui-border-b bg-color-white pl-15 pr-15 lh-35 fsize-12" onclick='+(ret.pay_list[i].status==1?"openNewWin('customer_contract_money_editHeader','添加付款',this)":"")+'>'+
		                    '<div class="aui-flex-item-12 text-l" id='+ret.pay_list[i].cdetails_id+'>'+ret.pay_list[i].cdetails_name+''+
		                        '<span class="aui-pull-right '+(ret.pay_list[i].status==1||ret.pay_list[i].status==3?"aui-text-danger":"aui-text-success")+'">'+(ret.pay_list[i].status==1?"待通知":ret.pay_list[i].status==3?"待付款":"已付款")+'</span>'+
		                    '</div>'+
		                    '<div class="aui-flex-item-6" id="payment_time">付款时间：'+new Date(ret.pay_list[i].payment_time!=null?ret.pay_list[i].payment_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+'</div>'+               
		                    '<div class="aui-flex-item-6" id="payment_amount">付款金额：￥'+ret.pay_list[i].payment_amount+'</div>'+
		                    '<div class="aui-flex-item-12 '+(ret.pay_list[i].status==1?"di-n":"")+'">'+(ret.pay_list[i].status==3?"付款通知单时间：":"实际付款时间：")+''+new Date(ret.pay_list[i].status==3&&ret.pay_list[i].inform_time!=null?ret.pay_list[i].inform_time.replace(/-/g,"/"):(ret.pay_list[i].practical_time!=null?ret.pay_list[i].practical_time.replace(/-/g,"/"):"")).format('yyyy-MM-dd')+'</div>'+               
		                    '<div class="aui-flex-item-12 '+(ret.pay_list[i].status==1?"di-n":"")+'">'+(ret.pay_list[i].status==3?""+api.pageParam.business_name+"_付款通知单":"实际付款：￥"+ret.pay_list[i].practical_amount+"")+'</div>'+
		              '</div>'
    				)
    			}
    			stats=true
			}
			else{
				stats=true
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		stats=true
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
var contract_no;
//添加开票页面成功后调用此方法，赋值开票类型
function assignment_type(invoice_type,invoice_type_name,invoice_form,cust_name,cust_tax_no,cust_acct_bank,custcontact_mobile,custcontact_addr,cust_acct_no){
	$("#info_status").html(invoice_type_name);
	$("#invoice_type").val(invoice_type);
	$("#invoice_form").val(invoice_form);
	$("#cust_name").val(cust_name);
	$("#cust_tax_no").val(cust_tax_no);
	$("#cust_acct_bank").val(cust_acct_bank);
	$("#custcontact_mobile").val(custcontact_mobile);
	$("#custcontact_addr").val(custcontact_addr);
	$("#cust_acct_no").val(cust_acct_no);
}
//保存修改
function save(){
	showProgress();//加载等待   
	if($("#paper_contract_no").val()==""||$("#contract_signtime").val()==""||$("#contract_develop_num").val()==""||$("#contract_develop_endtime").val()==""){
		api.hideProgress();//隐藏进度提示框
		$aui.alert({title:'提示',content:'请填全基本信息',buttons:['确定']},function(ret){});
		return;
	}
	if($("#invoice_type").val()==""||$("#invoice_form").val()==""||$("#cust_name").val()==""||$("#cust_tax_no").val()==""||$("#cust_acct_bank").val()==""||$("#custcontact_mobile").val()==""||$("#custcontact_addr").val()==""||$("#cust_acct_no").val()==""){
		api.hideProgress();//隐藏进度提示框
		$aui.alert({title:'提示',content:'请填全开票信息',buttons:['确定']},function(ret){});
		return;
	}
	var url = localStorage.url+"Api/Crm/save_cust_contract";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"contract_no":api.pageParam.contract_no,
	    		"business_no":api.pageParam.id,
	    		"paper_contract_no":$("#paper_contract_no").val(),
	    		"contract_signtime":$("#contract_signtime").val(),
	    		"contract_develop_num":$("#contract_develop_num").val(),
	    		"contract_develop_endtime":$("#contract_develop_endtime").val(),
	    		"contract_warranty_num":$("#contract_warranty_num").val(),
	    		"contract_beta_num":$("#contract_beta_num").val(),
	    		"contract_amount":$("#contract_amount").val(),
	            "add_staff":localStorage.user_id,
				"invoice_type":$("#invoice_type").val(),
				"invoice_form":$("#invoice_form").val(),
				"cust_name":$("#cust_name").val(),
				"cust_tax_no":$("#cust_tax_no").val(),
				"cust_acct_bank":$("#cust_acct_bank").val(),
				"custcontact_mobile":$("#custcontact_mobile").val(),
				"custcontact_addr":$("#custcontact_addr").val(),
				"cust_acct_no":$("#cust_acct_no").val()
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			contract_no=ret.contract_no;
    			$aui.alert({title:'提示',content:'操作成功',buttons:['确定']},function(ret){
    				if(stats==false){
    					openNewWin('customer_contract_money_editHeader','添加付款');
	    			}else{
	    				api.execScript({
						    name: 'customer_infoHeader',
						    frameName:'customer_info',
						    script: "exec()"
					    });
						api.closeWin();  	
	    			}
    			});
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//获取开票详情
function get_cust_contract_invoice(id){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Crm/get_cust_contract_invoice";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "contract_no":id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$("#invoice_type").val(ret.invoice_type_no);
				$("#invoice_form").val(ret.invoice_form_no);
				$("#cust_name").val(ret.cust_name);
				$("#cust_tax_no").val(ret.cust_tax_no);
				$("#cust_acct_bank").val(ret.cust_acct_bank);
				$("#custcontact_mobile").val(ret.custcontact_mobile);
				$("#custcontact_addr").val(ret.custcontact_addr);
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
//付款弹窗
//function pay(){
//  $aui.alert({
//      title:'',
//      content:
//             '<p>付款时间</p>'+
//              '<input id="folder" type="text" class="aui-input" placeholder="" onkeyup="localStorage.conten=$(this).val()"/>'+
//              '<p>付款金额</p>'+
//              '<input id="folder" type="text" class="aui-input" placeholder="" onkeyup="localStorage.conten=$(this).val()"/>',
//      },function(ret){
//          //处理回调函数
//          if(ret){
//             if(ret==0){
//                  
//             }
//          }
//      }
//  )
//}

//打开新页面
function openNewWin(winName,type,obj){
	if(stats==false&&winName=="customer_contract_money_editHeader"){
		$("#save_btn").hide();
	}
	var cdetails_id=""
	var cdetails_name=""
	var payment_time=""
	var payment_amount=""
	if($(obj).html()!=null){
		cdetails_id=$(obj).children(".text-l").attr("id");
		cdetails_name=$(obj).children(".text-l").text().substring(0,2);
		payment_time=$(obj).children("#payment_time").text().substring(5,$(obj).children("#payment_time").text().length);
		payment_amount=$(obj).children("#payment_amount").text().substring(6,$(obj).children("#payment_amount").text().length);
	}
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "type":type,
            "contract_no":api.pageParam.contract_no!= undefined?api.pageParam.contract_no:contract_no,
            "cust_no":api.pageParam.cust_no,//客户编号
            "cdetails_id":cdetails_id,
            "cdetails_name":cdetails_name,
            "payment_time":payment_time,
            "payment_amount":payment_amount
            
        }
    });
}
//
function end_tiem(){
	var d = new Date($("#contract_signtime").val().replace(/-/g,"/"));
	d.setDate(d.getDate()+$("#contract_develop_num").val()*1);
	$("#contract_develop_endtime").val(new Date(d).format("yyyy-MM-dd")+" "+new Date(d).format("hh:mm")+"")
}