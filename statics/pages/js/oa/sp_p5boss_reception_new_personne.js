var list='"list"'
var json=""
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
				$("#btn_content").hide();
		    });
		    api.addEventListener({
		        name: 'keyBoardClose'
		    }, function(ret, err){
		        $("#btn_content").show();
		    });
		}
	}
}
function add(){
	$("#tab1").append(
		'<div class="aui-form mb-15">'+
        	'<div class="aui-input-row">'+
                '<span  class="aui-input-addon">人员角色：</span>'+
                '<input type="text" class="aui-input approval_no"onfocus="this.blur();" placeholder="请选择负责人" onclick="openPicker(mui, document, this)"/>'+
                '<input type="hidden"/>'+
           '</div>'+
            '<div class="aui-input-row">'+
                '<span class="aui-input-addon">姓名：</span>'+
                '<input type="text" class="aui-input name" placeholder="来访人员名称"/>'+
            '</div>'+
            '<div class="aui-input-row">'+
                '<span class="aui-input-addon">职位：</span>'+
                '<input type="text" class="aui-input post" placeholder="来访人员职务"/>'+
            '</div>'+
            '<div class="aui-input-row">'+
                '<span class="aui-input-addon">联系方式：</span>'+
                '<input type="text" class="aui-input dept" placeholder="来访人员手机号"/>'+
            '</div>'+
            '<div class="aui-btn bg-color-white w-all bor-ra-0 p-10" onclick="delete_personnel(this)">删除</div>'+
       '</div>'
	)
}

var status=true;
function save(){
	json=""
	$(".aui-form").each(function(){
		status=true;
		var role=$(this).children("div").children(".approval_no").next().val();
		var name=$(this).children("div").children(".name").val();
		var post=$(this).children("div").children(".post").val();
		var phone=$(this).children("div").children(".dept").val();
		if(verifyPhone(phone)==false){
			$(this).children("div").children(".dept").val("");
			status=false;
		}
		if(role==""||name==""||post==""||phone==""){
			status=false;
		}
		json+='{"visitor_receptionist":"","visitor_name":\''+name+'\',"visitor_role":\''+role+'\',"visitor_post":\''+post+'\',"visitor_tel":\''+phone+'\'},'
	})
	if(status=="false"){
		$aui.alert({title:'提示',content:'请填写正确数据',buttons:['确定']},function(ret){})
		return;	
	}
	json=json.substring(0,json.length-1);
	list="["+json+"]";
	var visitors_json=eval('('+list+')');
	showProgress();//加载等待
	var url = localStorage.url+"Api/Oaapproval/save_oa_approval_reception_visitors";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: {
	    		"staff_no":localStorage.user_id,
	    		"reception_no":api.pageParam.reception_no,
	    		"type":0,
	    		"visitors_list":visitors_json
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			openNewWin('reception_new_visit_Header');
    			api.hideProgress();//隐藏提示框
    		}else{
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    			api.hideProgress();//隐藏提示框
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	api.hideProgress();//隐藏提示框
    	}
    });
}

//删除方法
function delete_personnel(obj){
	$(obj).parent().remove();
}

//打开新页面
function openNewWin(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"reception_no":api.pageParam.reception_no,
	    }
    });
}
function openPicker($, doc,obj) {
	$.init();
	$.ready(function() {
		//普通示例
		var userPicker = new $.PopPicker();
		userPicker.setData([{
			value: '1',
			text: '带队负责人'
		}, {
			value: '2',
			text: '随行人'
		}, {
			value: '3',
			text: '联系考察人'
		}]);
		userPicker.show(function(items) {
			jQuery(obj).val(items[0].text);
			jQuery(obj).next().val(items[0].value);
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	});
};
