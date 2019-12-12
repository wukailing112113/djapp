var chatid//某一会话id
var thumbpath//图片缩略图
var imageurl//图片完整路径
var conversationtype//会话类型
var targetid//目标id
//刷新页面
function exec(){
    location.reload();
}
apiready = function () {
    api.parseTapmode();
    get_user_info();//获取个人资料
	getConfig();//加载配置文件
    get_msg_list();//获取我的提醒数据
    get_notice_list();//获取我的公告数据
    get_workplan_list();//获取工作计划
    get_backlog_list();//获取我的当天必做任务
    get_approval_list();//获取我的审批数据
    get_myWorkplan_list();//获取我安排的工作
    //openPullRefresh("exec()");
    setInterval("get_msg_list()",5000*1);
    setInterval("get_notice_list()",5000*1);
    setInterval("get_workplan_list()",5000*1);
    setInterval("get_backlog_list()",5000*1);
    setInterval("get_approval_list()",5000*1);
    setInterval("get_myWorkplan_list()",5000*1);
}

//获取我的提醒数据
function get_msg_list(){
    //ajax获取数据处理
    var url = localStorage.url+"Api/Bd/get_msg_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":localStorage.user_id,
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1&&ret.list!=null){
                $("#msg_list").html("");
                var msg_list = ret.list;
                if(msg_list.length>0){
                    $("#num_1").show();
                    $("#num_1").html(msg_list.length);
                }
                for(var i = 0; i < msg_list.length; i++){
                	var date_time = new Date(msg_list[i].alert_time!=null?msg_list[i].alert_time.replace(/-/g,"/"):"").format("hh:mm");
                    if(msg_list[i].alert_type=="备忘提醒"){
                        $("#msg_list").append(
                            '<li class="mb-0" onclick="openOaWin(\'memorandum_infoHeader\',\'备忘录详情\','+msg_list[i].alert_id+')">'+
                                '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text">'+date_time+
                                '</span>'+
                                '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1"></i>'+
                                '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8">'+                                   
                                    '<h3 class="aui-timeline-header">'+msg_list[i].alert_content+'</h3>'+                                    
                                '</div>'+
                            '</li>'
                        );
                      }else if(msg_list[i].alert_type=="公文提醒"){
                        $("#msg_list").append(
                            '<li class="mb-0" onclick="openOaWin(\'document_editHeader\',\'tab4\',\''+msg_list[i].alert_id+'\')">'+
                                '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text">'+date_time+
                                '</span>'+
                                '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1"></i>'+
                                '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8">'+                                   
                                    '<h3 class="aui-timeline-header">'+msg_list[i].alert_content+'</h3>'+                                    
                                '</div>'+
                            '</li>'
                        );
                      }else if(msg_list[i].alert_type=="客户拜访提醒"){
                        $("#msg_list").append(
                            '<li class="aui-list-view-cell">'
                                +msg_list[i].alert_title+
                            '</li>'
                         );
                    }
                    else if(msg_list[i].alert_type=="客户预约提醒"){
                        $("#msg_list").append(
                            '<li class="aui-list-view-cell">'
                                +msg_list[i].alert_title+
                            '</li>'
                         );
                    }
                }
            }
	        else{
	            $("#num_1").hide();
	            $("#msg_list").html("");
	        }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});            
        }
    });
}

//获取我的公告数据
function get_notice_list(){
    //ajax获取数据处理
    var url = localStorage.url+"Api/Bd/get_notice_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":localStorage.user_id,
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1&&ret.list!=null){
                $("#notice_list").html("");
                var notice_list = ret.list;
                if(notice_list.length>0){
                    $("#num_2").show();
                    $("#num_2").html(notice_list.length);
                }
                for(var i = 0; i < notice_list.length; i++){
					var date_time = new Date(notice_list[i].add_time!=null?notice_list[i].add_time.replace(/-/g,"/"):"").format("yyyy-MM-dd");
                    $("#notice_list").append(
                        '<li class="mb-0" onclick="openOaWin(\'notice_infoHeader\',\'\','+notice_list[i].notice_id+')">'+
                            '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text">'+date_time+
                            '</span>'+
                            '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1"></i>'+
                            '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8">'+                                   
                                '<h3 class="aui-timeline-header">'+notice_list[i].notice_title+'</h3>'+                                    
                            '</div>'+
                        '</li>'
                    );
                }
            }else{
	            $("#notice_list").html("");
	            $("#num_2").hide();
	        }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});            
        }
    });
}
//获取工作计划
function get_workplan_list(){
	//ajax获取数据处理
    var url = localStorage.url+"Api/Oa/get_workplan_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "executor_staff":localStorage.user_id,//执行人
                "status":"11,21",//状态
                "page":1,
                "pagesize":999999999
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1&&ret.list!=null){
                $("#workplan_list").html("");
                var workplan_list = ret.list;                
                for(var i = 0; i < workplan_list.length; i++){
            		var date_time = new Date(workplan_list[i].workplan_expectend_time!=null?workplan_list[i].workplan_expectend_time.replace(/-/g,"/"):"").format("yyyy-MM-dd");
                    $("#workplan_list").append(
                        '<li class="mb-0" onclick="openOaWin(\'work_infoHeader\',\'work\',\'\','+workplan_list[i].workplan_id+')">'+
                            '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text p-0">'+
                            date_time+'<em class="aui-pull-left ml-24 lh-14 fcolor-cc">截止</em>'+
                            '</span>'+ 
                            '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1 "></i>'+
                            '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8 mt-25m">'+                                   
                                '<h3 class="aui-timeline-header">'+workplan_list[i].workplan_title+'</h3>'+                                    
                            '</div>'+
                        '</li>'
                    );
                }
                if(workplan_list.length>0){
                    $("#num_3").show();
                    $("#num_3").html(workplan_list.length);
                } 
            }else{
            	$("#num_3").hide();
                $("#workplan_list").html("");                
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}
//获取必做任务数据
function get_backlog_list(){
    //ajax获取数据处理
    var url = localStorage.url+"Api/Bd/get_backlog_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":localStorage.user_id,
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1&&ret.list!=null){
                $("#task_list").html("");
                var backlog_list = ret.list;             
                for(var i = 0; i < backlog_list.length; i++){                 
//					var date_time = new Date(new Date().format("yyyy-MM-dd")+" "+backlog_list[i].willdo_end_time).format("hh:mm");
                    $("#task_list").append(
                        '<li class="mb-0" onclick="openOaWin(\'task_infoHeader\',\'info\','+backlog_list[i].id+')">'+
                            '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text">'+(backlog_list[i].willdo_end_time!=null?backlog_list[i].willdo_end_time:"00:00")+
                            '</span>'+
                            '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1"></i>'+
                            '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8">'+                                   
                                '<h3 class="aui-timeline-header">'+backlog_list[i].title+'<font class="fcolor-cc aui-pull-right">['+backlog_list[i].willdo_cyda+']</font></h3>'+                                    
                            '</div>'+
                        '</li>'
                    );
                }
                if(backlog_list.length>0){
                    $("#num_5").show();
                    $("#num_5").html(backlog_list.length);
                }                
            }
            else{
            	$("#num_5").hide();
                $("#task_list").html("");                
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//我安排的工作
function get_myWorkplan_list(){ 
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oa/get_workplan_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"arranger_staff":localStorage.user_id,
	            "plan_returntype":2,
	            "status":31,
	            "page":1,
	            "pagesize":1000000
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1&&ret.list!=null){
    			$("#myWork_list").html("");
    			var list = ret.list;
    			if(list.length >　0){
    				$("#num_6").html(list.length).show();
    			}
    			
				for(var i = 0; i < list.length; i++){
					var date_time = new Date(list[i].workplan_expectend_time!=null?list[i].workplan_expectend_time.replace(/-/g,"/"):"").format("yyyy-MM-dd");
					$("#myWork_list").append(
                        '<li class="mb-0" onclick="openOaWin(\'work_infoHeader\',\'arrange\',\'\','+list[i].workplan_id+')">'+
                            '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text">'+date_time+
                            '</span>'+
                            '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1"></i>'+
                            '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8">'+                                   
                                '<h3 class="aui-timeline-header aui-pull-right w-all">'+
                                    list[i].workplan_title+
                                    '<font class="fcolor-cc aui-pull-right">[执行人：'+list[i].executor_name+']</font></h3>'+                                    
                            '</div>'+
                        '</li>'
                    );
				}				
        	}else{
        		$("#num_6").hide();
        		$("#myWork_list").html("");
        	}
        }else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    })
}

//获取我的审批数据
function get_approval_list(){
    //ajax获取数据处理
    var url = localStorage.url+"Api/Oaapproval/get_my_approval_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":localStorage.user_id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1&&ret.approval_list!=null){
                $("#approval_list").html("");
                var approval_list = ret.approval_list;
                if(approval_list.length>0){
                    $("#num_4").html(approval_list.length).show();
                }
                for(var i = 0; i < approval_list.length; i++){     
                	var date_time = new Date(approval_list[i].approval_time!=null?approval_list[i].approval_time.replace(/-/g,"/"):"").format("hh:mm");
                    $("#approval_list").append(
                        '<li class="mb-0" onclick="openOaWin(\''+(approval_list[i].approval_type == "approval"?"approval_infoHeader":"reception_infoHeader")+'\',\'info\','+approval_list[i].approval_no+')">'+
                            '<span class="fsize-12 aui-pull-left mt-8 aui-flex-item-3 center-text">'+date_time+'</span>'+
                            '<i class="aui-iconfont aui-icon-round p-0 fb fc-c1"></i>'+
                            '<div class="aui-timeline-item bl-lan bor-ra-6 aui-flex-item-8">'+                                   
                                '<h3 class="aui-timeline-header">'+approval_list[i].approval_name+'</h3>'+                                    
                            '</div>'+
                        '</li>'
                    );
                    
                }
            }
            else{
            	$("#num_4").hide();
                $("#approval_list").html("");
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//---------------------------------------------------------------------------------------------------------

//获取个人资料用来初始化融云
function get_user_info(){
    //ajax获取数据处理
    var url = localStorage.url+"Api/Public/get_user_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":localStorage.user_id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                localStorage.user_name = ret.staff_name;
                if(ret.staff_avatar==null || ret.staff_avatar == ""||ret.staff_avatar.substring(0,1)=="#"){//收信人头像
                    localStorage.avatar_url=ret.staff_avatar.substring(8);
                }else{
                    localStorage.avatar_url=localStorage.url+ret.staff_avatar;//头像赋值
                }
                openRongCloud();//打开融云
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}


// 初始化列表菜单滑动
var swipe = new ListSwipe();

//切换下拉及加载数据
//切换下拉及加载数据
function dropDownSwitch(obj){
    if($(obj).attr("id") == "myRemind"){
        list_id = "msg_list";
    }else if($(obj).attr("id") == "myNotice"){
        list_id = "notice_list";
    }else if($(obj).attr("id") == "myWorkPlan"){
        list_id = "workplan_list";
    }else if($(obj).attr("id") == "myApproval"){
        list_id = "approval_list";
    }else if($(obj).attr("id") == "myTask"){
        list_id = "task_list";
    }else if($(obj).attr("id") == "myArrange"){
        list_id = "myWork_list";
    }    
    //切换当前分类显示与隐藏
    $(obj).addClass("aui-fold-active");
    $(obj).siblings("li").removeClass("aui-fold-active");
    
    $("#"+list_id).parents(".aui-fold-content").siblings(".aui-fold-content").slideUp();//关闭非当前行分类
    $("#"+list_id).parents(".aui-fold-content").slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).removeClass("aui-fold-active");
        }
    });
}


//打开新页面
function openOaWin(winName,type,id,workplan_id){
	api.openWin({
	    name: winName,
	    url: '../../official/oa/header/'+winName+'.html',
	    pageParam:{
	    	"type":type,
	    	"id":id,
	    	"workplan_id":workplan_id,
	    	"reception_no":id,
	    }
    });
}

/**
 * 打开会话页面
 * @param {Object} winName
 * @param {Object} targetId
 * @param {Object} conversationType
 * @param {Object} latestMessageId
 */
function openComWin(winName,targetId,conversationType,latestMessageId){
    api.openWin({
        name: winName,
        url: '../../official/com/header/'+winName+'.html',
        pageParam:{
            "targetId":targetId,//目标id
            "conversationType":conversationType,//会话类型
            "latestMessageId":latestMessageId//最后一条消息id
        }
    });
}

//打开群聊天页面
function openchatNewWin(winName,targetId,conversationType){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "targetId":targetId,
            "conversationType":conversationType
        }
    });
}

//查看信息返回后会话列表隐藏
function hidechatlist(){

}