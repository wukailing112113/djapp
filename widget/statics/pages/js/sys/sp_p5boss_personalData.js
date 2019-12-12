var staff_avatar;//头像id
//加载数据
apiready=function(){
	if(api.pageParam.type=="通讯录详情"){
		$("#sex").next().html(
			'<input type="text" class="aui-input aui-text-right" placeholder="男"  readonly />'
		)
		$(".aui-card").removeClass("aui-card");
		$("input").attr("disabled",true);
		$("#photo").attr("onclick",false);
		$("#bottom_button").show();
	}
		getpersonaldata();		
}

//获取个人资料数据
function getpersonaldata(){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Public/get_user_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            staff_no:api.pageParam.id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			staff_avatar = ret.staff_avatar;//头像id
    			if(ret.staff_sex == "男"){
    				$("#man").attr("checked","checked");
				}else{
    				$("#woman").attr("checked","checked");
				}
				var portrait=get_head(ret.staff_avatar,ret.staff_name)
    			$("#photo").html(portrait);
    			$("#photo").children("div").removeClass("mr-15");
    			$("#photo").children("img").addClass("bor-ra-100b");
//  			if(ret.avatar_url!=null){
//  				$("#photo").attr("src",localStorage.url+ret.avatar_url);
//  			}
				$("#nickname").val(ret.staff_name);		
				$("#birthday").val(ret.staff_birthday);
				$("#address").val(ret.staff_address);
				$("#phone").val(ret.staff_mobile);
				$("#Email").val(ret.staff_email);
				$("#post").val(ret.staff_post_name);
				$("#dept").val(ret.staff_dept_name);
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
	
//修改个人资料数据	
function editPersonmsg(){
	if(file_path != undefined){
		staff_avatar = file_path;
	}
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Public/set_user_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "staff_no":localStorage.user_id,
	            "staff_avatar":staff_avatar,
	            "staff_name":$("#nickname").val(),
	            "staff_sex":$("input[type='radio']:checked").val(),
	            "staff_birthday":$("#birthday").val(),
	            "staff_address":$("#address").val(),
	            "staff_email":$("#Email").val(),
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			api.execScript({
    				name:"index",
    				frameName:"mine",
	                script: 'rel();'
                });
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){})
			}else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){})
			}
			api.hideProgress();//隐藏提示框	
    	}else{
    		api.hideProgress();//隐藏提示框	
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
	//api.closeWin({})
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



//打电话
function callTel(phone){
	api.call({
	    number:phone
    });
}

//发短信
function sendmes(phone){
	api.sms({
    numbers:  [phone]
    },function(ret, err){
        if(ret && ret.status){
             //已发送
             $aui.alert({
    	        title:'提示',
    	        content:"发送成功",
    	        buttons:['确定']
    	    },function(ret){})
        }
    });
}

//打开COM模块
function openComWin(winName){
    api.openWin({
        name: winName,
        url: '../../official/com/header/'+winName+'.html',
        pageParam:{            
            "targetId":api.pageParam.id,
            "conversationType":"PRIVATE"
        }
    });
}
 



