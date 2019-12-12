var catyData;
apiready=function(){
	showProgress();//加载等待
	load();
	if(api.pageParam.type=="1"){
	   $("#class").removeClass("di-n");
	   $("#from").removeClass("di-n");
	}else if(api.pageParam.type=="2" || api.pageParam.type=="3"){
	   $("#sale").removeClass("di-n");
	   $("#business").removeClass("di-n");
	}
}
var sale_no="";//销售部编号
var market_no="";//市场部编号
//加载数据
function load(){
	//加载地区
	//ajax获取数据处理
	api.ajax({
	    url:localStorage.url+"Api/Bd/get_area_list",
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "area_pid": 0,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			catyData = ret.list;
    			openCaty(mui, document);
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
   //加载状态
   var cust_status=""
   if(api.pageParam.type=="1"){
   		cust_status="cust_status"
   }else if(api.pageParam.type=="2"){
   		cust_status="business_status"
   }else if(api.pageParam.type=="3"){
    	$("#status_list").html(
    		'<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
	            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="1">'+
	            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>预约</div>'+
	        '</div>'+
	        '<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
	            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="2">'+
	            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>完成</div>'+
	        '</div>'+
	         '<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
	            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="3">'+
	            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>延期</div>'+
	        '</div>'+
	         '<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
	            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="4">'+
	            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>取消</div>'+
	        '</div>'
    	)
   	}
   //ajax获取数据处理
	api.ajax({
	    url:localStorage.url+"Api/Bd/get_type_list",
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "type_group": cust_status,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i=0;i<ret.list.length;i++){
			        $("#status_list").append(
				        '<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
				            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="'+ret.list[i].type_no+'">'+
				            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].text+'</div>'+
				        '</div>'                      
				    )
			    }
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
    //加载类型
	//ajax获取数据处理
	api.ajax({
	    url:localStorage.url+"Api/Bd/get_type_list",
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "type_group": "cust_type",
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i=0;i<ret.list.length;i++){
				    $("#type_list").append(
				        '<div class="aui-flex-item-6" onclick="customer_swith(this)">'+
				            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="'+ret.list[i].value+'">'+
				            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].text+'</div>'+
				        '</div>'                      
				    )
			    }
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
    //加载级别
	//ajax获取数据处理
	api.ajax({
	    url:localStorage.url+"Api/Bd/get_type_list",
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "type_group": "cust_level",
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i=0;i<ret.list.length;i++){
				    $("#class_list").append(
				        '<div class="aui-flex-item-4" onclick="customer_swith(this)">'+
				            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="'+ret.list[i].value+'">'+
				            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].text+'</div>'+
				        '</div>'                      
				    )
			    }
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
   //加载来源
   //ajax获取数据处理
	api.ajax({
	    url:localStorage.url+"Api/Bd/get_type_list",
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "type_group": "cust_source",
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i=0;i<ret.list.length;i++){
				    $("#from_list").append(
				        '<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
				            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35 aui-ellipsis-1" name="" id="'+ret.list[i].value+'">'+
				            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].text+'</div>'+
				        '</div>'                      
				    )
			    }
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
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
    						if(ret.list[i].list[bi].dept_name=="销售部"){
    							sale_no=ret.list[i].list[bi].dept_no
    							get_list('sale_list',sale_no);
    						}
    						if(ret.list[i].list[bi].dept_name=="市场部"){
    							market_no=ret.list[i].list[bi].dept_no
    							get_list('business_list',market_no);
    						}	
    					}
    				
    				}
    			
    			}
			}
			else{
				$aui.alert({
    				title:'提示',
    				content:ret.msg,
    				buttons:['确定']},
    				function(ret){
    			});
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//获取销售商务列表数据
function get_list(id,no){
	var url = localStorage.url+"Api/Hr/get_staff_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           "dept_no":no
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
    				$("#"+id).append(
    					'<div class="aui-flex-item-3" onclick="customer_swith(this)">'+
				            '<div class="noselect ml-10 mr-5 mb-10 bor-ra-7 fsize-12 lh-22 h-35" name="select" id='+ret.list[i].staff_no+'>'+
				            '<i class="aui-iconfont aui-icon-check color-lan di-n mr-2"></i>'+ret.list[i].staff_name+'</div>'+
				        '</div>'   
    				)
    			}
			}
			else{
				$aui.alert({
    				title:'提示',
    				content:ret.msg,
    				buttons:['确定']},
    				function(ret){
    			});
			}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}
//地址选择器
function openCaty($, doc) {
	
	$.init();
	$.ready(function() {
		//普通示例
		var userPicker = new $.PopPicker({
			layer: 3
		});
		userPicker.setData(catyData);
		var showUserPickerButton = doc.getElementById('cycle');
		showUserPickerButton.addEventListener('tap', function(event) {
			userPicker.show(function(items) {
				showUserPickerButton.value = (items[0].text==undefined?"":items[0].text)+(items[1].text==undefined?"":" "+items[1].text)+(items[2].text==undefined?"":" "+items[2].text);
				jQuery("#cycle_id").val(items[2].value!=undefined?items[2].value:(items[1].value!=undefined?items[1].value:items[0].value));
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	});
};

//切换方法
function customer_swith(obj,type){
//	if($(obj).children("div").attr("name")=="select"){
//		$(obj).children("div").attr("name","")
//		$(obj).children("div").addClass("noselect").removeClass("select");
//		$(obj).children("div").children("i").addClass("di-n");
//		return;
//	}
//	$("."+type).children("div").attr("name","").addClass("noselect").removeClass("select").children("i").addClass("di-n");
	//通过name判断是否选中name=""证明没有选中，name为aui-bg-info证明已经选中
	if($(obj).children("div").attr("name")==""){
		$(obj).children("div").attr("name","select");
		$(obj).children("div").addClass("select").removeClass("noselect");
		$(obj).children("div").children("i").removeClass("di-n");
		return;
	}
	if($(obj).children("div").attr("name")=="select"){
		$(obj).children("div").attr("name","")
		$(obj).children("div").addClass("noselect").removeClass("select");
		$(obj).children("div").children("i").addClass("di-n");
		return;
	}
}

//搜索方法
function custome_search(type){
	var cust_keyword=$("#search-input").val();//关键词
	var start_time=$("#start_time").val();//开始时间
	var end_time=$("#end_time").val();//结束时间
	var cust_area=$("#cycle_id").val();//地区
	var cust_type="";//类型编号
	var status="";//状态
	var cust_source="";//来源
	var cust_level="";//级别
	var sale_no="";//销售人员编号
	var market_no="";//市场部人员编号
	
	$("#status_list .select").each(function(){
		status+=$(this).attr("id")+","
	})
	$("#type_list .select").each(function(){
		cust_type+=$(this).attr("id")+","
	})
	$("#from_list .select").each(function(){
		cust_source+=$(this).attr("id")+","
	})
	$("#class_list .select").each(function(){
		cust_level+=$(this).attr("id")+","
	})
	$("#sale_list .select").each(function(){
		sale_no+=$(this).attr("id")+","
	})
	$("#business_list .select").each(function(){
		market_no+=$(this).attr("id")+","
	})
	if(cust_type!=""){
		cust_type=cust_type.substring(0,cust_type.length-1);
	}
	if(status!=""){
		status=status.substring(0,status.length-1);
	}
	if(cust_source!=""){
		cust_source=cust_source.substring(0,cust_source.length-1);
	}
	if(cust_level!=""){
		cust_level=cust_level.substring(0,cust_level.length-1);
	}
	if(sale_no!=""){
		sale_no=sale_no.substring(0,sale_no.length-1);
	}
	if(market_no!=""){
		market_no=market_no.substring(0,market_no.length-1);
	}
	api.openWin({
	    name: 'customer_search_listHeader',
	    url: 'header/customer_search_listHeader.html',
	    pageParam:{
	    	"cust_keyword":cust_keyword,//关键词
	    	"start_time":start_time,//开始时间
	    	"end_time":end_time,//结束时间
	    	"cust_area":cust_area,//地区
	    	"cust_type":cust_type,//类型
	    	"status":status,//装太
	    	"cust_source":cust_source,//来源
	    	"cust_level":cust_level,//级别
	    	"sale":sale_no,//销售
	    	"market":market_no,
	    	"type":type//type为1代表客户列表，2代表商机管理，3代表沟通管理
	    }
    });
}

//关键词搜索
//点击搜索条事件
function doSearch(){
    $api.addCls($api.dom(".aui-searchbar-wrap"),"focus");
    $api.dom('.aui-searchbar-input input').focus();
}

//点击取消搜索事件
function cancelSearch(){
    $api.removeCls($api.dom(".aui-searchbar-wrap.focus"),"focus");
    $api.val($api.byId("search-input"),'');
    $api.dom('.aui-searchbar-input input').blur();
}

//赋值方法
function clearInput(){
    $api.val($api.byId("search-input"),'');
}

//搜索后内容回调
function search(){
    var content = $api.val($api.byId("search-input"));
    if(content){
        api.alert({
            title: '搜索提示',
            msg: '您输入的内容为：'+content
        });
    }else{
        api.alert({
            title: '搜索提示',
            msg: '您没有输入任何内容'
        });
    }
    cancelSearch();
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