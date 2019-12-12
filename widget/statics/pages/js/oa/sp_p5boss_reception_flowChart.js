apiready=function(){
	get_approval_reception_nodes_list();
}

//联系人赋值方法
function evaluate(id,name,node_staff){
	if(name==""){
		$aui.alert({title:'提示',content:"请选择审批人",buttons:['确定']},function(ret){})
		return;
	}
	$("#"+id).parent().attr("id");
	$("#"+id).html(name);
	$("#"+id).attr("class","aui-timeline-footer aui-text-info name");
	api.hideProgress();//隐藏提示框	
	var url = localStorage.url+"Api/Oaapproval/save_oa_approval_reception_staff";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	         "log_id":$("#"+id).parent().attr("id"),
			 "node_staff":node_staff
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
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
var node=true;
//保存方法
function save(){
	node=true;
	$(".aui-text-danger").each(function(){
		node=false
	})
	if(node==false){
		$aui.alert({title:'提示',content:'请选择全审核人',buttons:['确定']},function(ret){})
	    return;
	}
	api.execScript({
		name: 'reception_listHeader',
    	frameName: 'reception_list',
	    script: 'rel();'
    });
	api.closeToWin({name:'reception_listHeader'});
}

function get_approval_reception_nodes_list(){
	api.hideProgress();//隐藏提示框	
	var url = localStorage.url+"Api/Oaapproval/get_approval_reception_nodes_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "reception_no":api.pageParam.reception_no
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			if(api.pageParam.type=="1"){
    				//查看详情
    				for(var i=0;i<ret.node_list.length;i++){
	    					if(i==0){
		    					$("#flow_list").append(
				    				'<li>'+
							            '<div class="aui-time-label bor-ra-100b w-50 h-50 lh-50"><i class="aui-iconfont aui-icon-myfill fsize-50 aui-bg-info bor-ra-100b"></i></div>'+
							            '<div class="aui-timeline-item">'+
							            	'<span class="aui-timeline-time"><i class="aui-iconfont aui-icon-time"></i>'+(ret.node_list[i].add_time != null && ret.node_list[i].add_time != ""?ret.node_list[i].add_time:"")+'</span>'+
							                '<h3 class="aui-timeline-header">'+ret.node_list[i].node_name+':'+ret.node_list[i].node_staff+'</h3>'+
							                '<div class="aui-timeline-body">'+ret.node_list[i].node_post+'</div>'+
							            	'<div class="aui-timeline-footer">发起人</div>'+
							            '</div>'+
							        '</li>'
				    			);
		    				}
		    				else{
			    				$("#flow_list").append(
				    				'<li>'+
							            '<div class="aui-time-label bor-ra-100b w-50 h-50 lh-50"><i class="aui-iconfont aui-icon-myfill fsize-50 '+(ret.node_list[i].status == 1?"aui-bg-info":"aui-bg-default")+' bor-ra-100b"></i></div>'+
							            '<div class="aui-timeline-item" id="'+ret.node_list[i].log_id+'">'+
							            	'<span class="aui-timeline-time"><i class="aui-iconfont aui-icon-time"></i>'+(ret.node_list[i].log_time != null && ret.node_list[i].log_time != ""?ret.node_list[i].log_time:"")+'</span>'+
							                '<h3 class="aui-timeline-header" id="'+i+'">审批人:'+ret.node_list[i].node_staff+'</h3>'+
							                '<div class="aui-timeline-body">'+ret.node_list[i].node_post+'</div>'+
							            	'<div class="aui-timeline-footer" >'+(ret.node_list[i].status == 1?(ret.node_list[i].log_type==1?"同意："+ret.node_list[i].log_content:"退回："+ret.node_list[i].log_content):"未审批")+'</div>'+
							            '</div>'+
							        '</li>'
				    			);
			    			}
    				}
	    			$("#flow_list").append(
	    				'<li>'+
				            '<div class="aui-time-label bor-ra-100b w-50 h-50 lh-50 end">END</div>'+
				            '<div class="aui-timeline-item">'+
				                '<h3 class="aui-timeline-header">提示</h3>'+
				                '<div class="aui-timeline-footer">审批结束</div>'+
				            '</div>'+
				        '</li>'
	    			);
		    	}
		    	else{
		    		//编辑
		    		for(var i=0;i<ret.node_list.length;i++){
		    			if(i==0){
	    					$("#flow_list").append(
			    				'<li>'+
						            '<div class="aui-time-label bor-ra-100b w-50 h-50 lh-50"><i class="aui-iconfont aui-icon-myfill fsize-50 aui-bg-info bor-ra-100b"></i></div>'+
						            '<div class="aui-timeline-item">'+
						                '<h3 class="aui-timeline-header">'+ret.node_list[i].node_staff+'</h3>'+
						                '<div class="aui-timeline-body">'+ret.node_list[i].node_post+'</div>'+
						            	'<div class="aui-timeline-footer">发起人</div>'+
						            '</div>'+
						        '</li>'
			    			);
	    				}
	    				else{
							$("#flow_list").append(
			    				'<li>'+
						            '<div class="aui-time-label bor-ra-100b w-50 h-50 lh-50"><i class="aui-iconfont aui-icon-myfill fsize-50 aui-bg-info bor-ra-100b"></i></div>'+
						            '<div class="aui-timeline-item" id="'+ret.node_list[i].log_id+'" onclick="openSlidLayout(\''+i+'\',\'reception_flowChartHeader\',\'receptionl_flowChart\',\''+ret.node_list[i].node_post_no+'\')">'+
						                '<h3 class="aui-timeline-header">'+ret.node_list[i].node_post+'审批</h3>'+
						                '<div class="aui-timeline-body">'+ret.node_list[i].node_post+'</div>'+
						            	'<div class="aui-timeline-footer aui-text-danger" id="'+i+'" >点击选择审核人</div>'+
						            '</div>'+
						        '</li>'
			    			);
	    					
		    			}
		    		}
	    			$("#flow_list").append(
	    				'<li>'+
				            '<div class="aui-time-label bor-ra-100b w-50 h-50 lh-50 end">END</div>'+
				            '<div class="aui-timeline-item">'+
				                '<h3 class="aui-timeline-header">提示</h3>'+
				                '<div class="aui-timeline-footer">审批结束</div>'+
				            '</div>'+
				        '</li>'
	    			);
		    	}
    		}
			else{
				$aui.alert({
			        title:'提示',
			        content:ret.msg,
			        buttons:['确定']
			    },function(ret){})
			}
			api.hideProgress();//隐藏提示框	
    	}
    	else{
    		api.hideProgress();//隐藏提示框	
    		//无网络提示 
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });	
}