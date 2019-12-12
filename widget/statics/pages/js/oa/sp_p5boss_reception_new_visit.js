var json="";
var data_json="";
var i=0;
apiready=function(){
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
function add(){
	$("#tab1").append(
		'<div class="aui-form  mt-10 mb-15" >'+
			'<div class="aui-input-row">'+
                '<span class="aui-input-addon" id="name_1">角色：</span>'+
                '<input type="text" class="aui-input approval_no" placeholder="带队负责人" onfocus="this.blur()" onclick="openPicker(mui, document, this)"/>'+
	            '<input type="hidden"/>'+
            '</div>'+
            '<div class="aui-input-row" onclick="openSlidLayout(\''+i+'\',\'reception_new_visit_Header\',\'reception_new_visit\',\'\',\'接待\')">'+
                '<span class="aui-input-addon">姓名：</span>'+
                '<input type="text" id="'+i+'" class="aui-input name" value="请选择接待人" readonly/>'+
                '<input type="hidden" class="aui-input"/>'+
            '</div>'+
            '<div class="aui-input-row"onclick="get_dept_list()">'+
                '<span class="aui-input-addon" id="name_1">职务：</span>'+
                '<input type="text" class="aui-input" id="name" value="接待人职务" readonly/>'+
                '<input type="hidden" class="aui-input"/>'+
            '</div>'+
            '<div class="aui-btn bg-color-white w-all bor-ra-0 p-10" onclick="delete_personnel(this)">删除</div>'+
       '</div>'
	)
	i++;
}
var status=true
//保存方法	
function save(){
	status=true;
	json="";
	$(".aui-form").each(function(){
		var role=$(this).children("div").children(".approval_no").next().val();
		var receptionist=$(this).children("div").children(".name").next().val();
		if(role==""||receptionist==""){
			status=false
		}
		json+='{"visitor_role":"'+role+'","visitor_receptionist":"'+receptionist+'"},'
	})
	if(status=="false"){
		$aui.alert({title:'提示',content:'请填写数据',buttons:['确定']},function(ret){})
		return;	
	}
	json=json.substring(0,json.length-1);
	data_json="["+json+"]";
	var visitors_json=eval('('+data_json+')');
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
	    		"type":1,
	    		"visitors_list":visitors_json
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			openNewWin('reception_flowChartHeader');
    		}else{
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//人员职位赋值
function evaluate(id,name,names){
	$("#"+id).val(name);
	$("#"+id).next().val(names);
	showProgress();//加载等待
	var url = localStorage.url+"Api/Public/get_user_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            staff_no:names
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$("#"+id).parent().next().children("input[type='text']").val(ret.staff_post_name);
			}else{
				$aui.alert({
			        title:'提示',
			        content:ret.msg,
			        buttons:['确定']
			    },function(ret){})
			}
			api.hideProgress();//隐藏提示框	
    	}else{
    		api.hideProgress();//隐藏提示框	
    		//无网络提示 
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
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
	    	"reception_no":api.pageParam.reception_no
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
