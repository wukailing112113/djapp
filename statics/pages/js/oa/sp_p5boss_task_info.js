var willdo_operdate;//任务日期
var willdo_cycle;//周期
var alert_time;//提醒时间
var willdolog_id;//总结id
var willdolog_summary;//总结内容
//页面初始化
apiready = function(){
	$("#willdo_status").parent().hide();
	getMustData();//获取必做任务数据	
}

//获取必做任务数据
function getMustData(){
	showProgress();//加载等待
	var url = localStorage.url+"Api/oa/get_willdo_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            willdo_id:api.pageParam.id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			
    			$("#tite").val(ret.willdo_title);//标题赋值
    			//根据willdo_cycle类型分别显示提示
    			if(ret.willdo_cycle=='01'){
    				$('#limit').html('[每日]');
    			}else if(ret.willdo_cycle=='02'){
    				$('#limit').html('[每周]');
    			}
    			else if(ret.willdo_cycle=='03'){
    				$('#limit').html('[每月]');
    			}
    			else if(ret.willdo_cycle=='04'){
    				$('#limit').html('[每年]');
    			}
    			if(ret.willdo_content!=null){
    				$("#text_conter").html(removeHTMLTag(ret.willdo_content));//内容赋值
    			}
				$('#time').val(ret.willdo_start_time+'-'+ret.willdo_end_time);
				$("#reminder_date").val(new Date(ret.alert_time!=null?ret.alert_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss'));
				//工作进度总结
				for(var i=0;i<ret.log_list.length;i++){
					$("#log_list").append(
					'<li class="aui-list-view-cell pl-0 pr-0">'+
			           ' <div>'+
			            	'<i class="iconfont b-radius pt-4 pb-4 color-white fsize-14 mr-10">&#xe611;</i>'+
			                new Date(ret.log_list[i].willdolog_operdate!=null?ret.log_list[i].willdolog_operdate.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm:ss')+
			                '<p class="mt-10 ml-30">'+ret.log_list[i].willdolog_summary+'</p>'+
			            '</div>'+
			        '</li>'
			        )
					if(ret.log_list[i].willdolog_operdate!=null?ret.log_list[i].willdolog_operdate.substring(0,ret.log_list[i].willdolog_operdate.indexOf(" ")):"" == new Date().format("yyyy-MM-dd")){
						willdolog_id = ret.log_list[i].willdolog_id;//总结id
						willdolog_summary = ret.log_list[i].willdolog_summary;//总结内容
					}
				}
				if(ret.willdo_exestatus==2){
					$('#status').val('已中止').addClass('aui-text-danger');
					$('#begin,#summary_div').show();
				}else{
					if(ret.willdo_status==0){
						$('#spread').show();
						$('#status').val('未开展').addClass('aui-text-danger');
					}else if(ret.willdo_status==1){
						$('#status').val('已完成').addClass('aui-text-info');
						$('#summary_div').show();
					}
				}
				//工作进度总结列表颜色变化切换
				$('#summary_div').find('i:even').addClass('aui-bg-info');
				$('#summary_div').find('i:odd').addClass('aui-bg-warning');	
				if(api.pageParam.stast==true){
					$("#spread").hide();
					$("#begin").hide();
				};		
				$("#conter").show();
			}
			else{
				alert(ret.msg,"提示");
				$("#conter").show();
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		$("#conter").show();
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开oa模块页面
function openNewWin(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":type,//用于内容编写页面工作总结状态
	    	"id":api.pageParam.id,//任务id
	    	"willdolog_id":willdolog_id,//总结id
	    	"willdolog_summary":willdolog_summary//总结内容
	    }
    });
}

//刷新页面方法
function exec(){
	location.reload();
}
//更改状态
function set_willdo_status(status){
	showProgress();//加载等待
	var url = localStorage.url+"Api/oa/set_willdo_status";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
//	            "staff_no": localStorage.user_id,
	            "willdo_id":api.pageParam.id,
//	            "willdolog_summary":$("#conter").val(),
	            "status":status
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$aui.alert({
    				title:'提示',
    				content:'提交成功',
    				buttons:['确定']},
    				function(ret){
    					api.execScript({
							name: 'taskHeader',
						    frameName:'task',
						   	script: 'exec();'
					    });
					    api.closeWin({});
    				});
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
//未开展点击
function spread(){
	localStorage.state=1;
	getMustData();
	$aui.alert({
		title:'提示',
		content:'请填写每日总结',
		buttons:['确定']},
		function(ret){
			$('#not_spread').hide();
			$('#spread').show();
	});
}