var catyData;
apiready=function(){
	get_info();
}
//加载数据
function get_info(){
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
function customer_swith(obj){
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
function project_search(type){
	var cust_keyword=$("#search-input").val();//关键词
	var start_time=$("#start_time").val();//开始时间
	var end_time=$("#end_time").val();//结束时间
	var cust_area=$("#cycle_id").val();//地区
	var cust_type="";//类型编号
	var cust_source="";//来源
	var cust_level="";//级别

	$("#type_list .select").each(function(){
		cust_type+=$(this).attr("id")+","
	})
	$("#from_list .select").each(function(){
		cust_source+=$(this).attr("id")+","
	})
	$("#class_list .select").each(function(){
		cust_level+=$(this).attr("id")+","
	})
	if(cust_type!=""){
		cust_type=cust_type.substring(0,cust_type.length-1);
	}
	if(cust_source!=""){
		cust_source=cust_source.substring(0,cust_source.length-1);
	}
	if(cust_level!=""){
		cust_level=cust_level.substring(0,cust_level.length-1);
	}
	api.openWin({
	    name: 'project_search_listHeader',
	    url: 'header/project_search_listHeader.html',
	    pageParam:{
	    	"cust_keyword":cust_keyword,//关键词
	    	"start_time":start_time,//开始时间
	    	"end_time":end_time,//结束时间
	    	"cust_area":cust_area,//地区
	    	"cust_type":cust_type,//类型
	    	"cust_source":cust_source,//来源
	    	"cust_level":cust_level,//级别
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
//开始时间选择器
(function($) {
	$.init();
	var btns = $('#start_time');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			options.type='date';
			if(!jQuery('#end_time').val()==''){
				end = new Date(jQuery('#end_time').val());
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
	var btns = $('#end_time');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			options.type='date';
			if(!jQuery('#start_time').val()==''){
				end = new Date(jQuery('#start_time').val());
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