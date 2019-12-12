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
    get_bug_list();//获取bug列表
    get_user_info();//获取个人资料
	getConfig();//加载配置文件
	setInterval('get_html()',1000*1);
	
}

//处理首页数据显现问题
function get_html(){
	if($("#chatlist").html()!="" || $("#content_list").html()!=""){
		$("#news_alert").hide();
	}else{
		$("#news_alert").show();
	}
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
                if(ret.staff_avatar==null || ret.staff_avatar == ""){//收信人头像
                    localStorage.avatar_url="";
                }else{
                    localStorage.avatar_url = localStorage.url+ret.staff_avatar;//头像赋值
                }
                openRongCloud();//打开融云
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}




//打开bugmanger模块页面
function openBugmangerWin(winName){
	api.openWin({
	    name: winName,
	    url: '../pms/header/'+winName+'.html',
	    pageParam:{
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
function openNewChat(winName,targetId,conversationType,latestMessageId){
    api.openWin({
        name: winName,
//      url: 'header/'+winName+'.html',
		url: '../com/header/'+winName+'.html',
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
//      url: 'header/'+winName+'.html',
		url: '../com/header/'+winName+'.html',
        pageParam:{
            "targetId":targetId,
            "conversationType":conversationType
        }
    });
}
//加载数据
function get_bug_list(){
	showProgress();
	var url = localStorage.url+"Api/Pms/get_project_bug_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	          	"status":32,
	          	"staff_no":localStorage.user_id//当前登陆人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
                var list = ret.list;                
                for(var i = 0; i < list.length; i++){
                    if(list[i]!=null){
                        $("#content_list").append(
                        '<div class="fold">'+
                            '<li class="aui-list-view-cell aui-img" tapmode onclick="dropDown(this)">'+
                                '<div class="aui-img-body fsize-16 aui-text-info">'+
                                    '<i class="iconfont aui-text-danger fsize-20 po-ab left-5 top-10">&#xe6b0;</i>'+
                                    '<span class="aui-ellipsis-1 aui-col-xs-11 h-28 pl-20">'+list[i].bug_title+'</span>'+
                                    '<div class="aui-col-xs-1 laud">'+
                                        '<i class="iconfont fsize-16 arrow">&#xe61b;</i>'+
                                    '</div>'+
                                    '<p class="helper-tag">'+
                                        '<i class="iconfont aui-text-warning fsize-14 pl-0">&#xe6f6;</i>'+
                                        '<span>'+list[i].bug_no+'</span>'+
                                        '<i class="iconfont aui-text-warning fsize-14 ml-20">&#xe6b8;</i>'+
                                        '<span>状态:</span>'+
                                        (list[i].status_no==11?"待接收":
                                        list[i].status_no==21?"待解决":
                                        list[i].status_no==31?"待内测":
                                        list[i].status_no==41?"退回发起人":
                                        list[i].status_no==32?"待客户测试":
                                        list[i].status_no==42?"驳回待解决":
                                        list[i].status_no==51?"已关闭":"终止")+
                                        '<i class="iconfont aui-text-warning fsize-14 ml-20">&#xe6ab;</i>'+
                                        '<font class="'+(list[i].bug_type==01?"aui-text-danger":list[i].bug_type==02?"aui-text-success":"aui-text-info")+'">'+
                                        (list[i].bug_type==01?"BUG":list[i].bug_type==02?"需求":"优化")+'</font>'+
                                    '</p>'+
                                    '<p class="helper-tag">'+
                                        '<i class="iconfont aui-text-warning fsize-14 pl-0">&#xe6b7;</i>'+
                                        '<span>提交人:</span>'+list[i].add_staff+
                                        '<i class="iconfont aui-text-warning fsize-14  ml-20">&#xe6b3;</i>'+
                                        '<span>解决人:</span>'+list[i].receiver_name+
                                    '</p>'+
                                    '<p class="helper-tag">'+
                                        '<i class="iconfont aui-text-warning fsize-14 pl-0">&#xe612;</i>'+
                                        '<span>模块:</span>'+list[i].module_name+
                                    '</p>'+
                                '</div>'+
                            '</li>'+
                            '<li class="aui-list-view-cell p-0 di-n fold-list">'+
                                    '<div class="hr-s-gray1 aui-bg-default p-10 ml-15 mr-15 mb-15" onclick="openBugInfoWin(\'bug_infoHeader\',\''+list[i].bug_no+'\','+list[i].staff_no+')">'+
                                    '<div class="aui-text-info hr-sb-gray1">'+
                                        '<i class="iconfont fsize-16">&#xe65f;</i>'+
                                        '<font class="fsize-14">详情</font>'+
                                    '</div>'+
                                    '<p class="aui-ellipsis-4 fsize-12 ti-2">'+list[i].bug_operflow+'</p>'+
                                    '<div class="text-r aui-text-info fsize-14">More>></div>'+
                                '</div>'+ 
//                              '<div class="aui-flex-col '+(list[i].status_no==11&&list[i].bug_receiver==localStorage.user_id?"di-b":"di-n")+'">'+//解决人,待接收
//                                  '<div class="receive-btn aui-btn aui-btn-info aui-col-xs-6 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'receive\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe694;</i>接收</div>'+
//                                  '<div class="reject-btn aui-btn aui-btn-danger aui-col-xs-6 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'reject\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe68a;</i>驳回</div>'+ 
//                              '</div>'+ 
//                              '<div class="aui-flex-col '+(list[i].status_no==21&&list[i].bug_receiver==localStorage.user_id||list[i].status_no==42&&list[i].bug_receiver==localStorage.user_id?"di-b":"di-n")+'">'+  //解决人,待解决
//                                  '<div class="solve-btn aui-btn aui-btn-info aui-col-xs-6 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'solve\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe694;</i>解决bug</div>'+ 
//                                  '<div class="reject-btn aui-btn aui-btn-danger aui-col-xs-6 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'reject\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe68a;</i>驳回</div>'+
//                              '</div>'+
//                              '<div class="aui-flex-col '+(list[i].status_no==32&&list[i].add_staff_no==localStorage.user_id||list[i].status_no==31&&list[i].staff_no==localStorage.user_id?"di-b":"di-n")+'">'+//提交人，助理待我确认
//                                  '<div class="confirm-btn aui-btn aui-btn-info aui-col-xs-6 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'confirm\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe694;</i>确认</div>'+
//                                  '<div class="reject-btn aui-btn aui-btn-danger aui-col-xs-6 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'cus_reject\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe68a;</i>驳回</div>'+ 
//                              '</div>'+
//                              '<div class="aui-flex-col '+(list[i].status_no==51&&list[i].add_staff_no==localStorage.user_id||list[i].status_no==52&&list[i].add_staff_no==localStorage.user_id?"di-b":"di-n")+'">'+//提交人已关闭，终止
//                                  '<div class="edit-btn aui-btn aui-btn-info aui-col-xs-12 bor-ra-0" onclick="openBugEditWin(\'bug_editHeader\','+list[i].bug_no+',\'reopen\','+list[i].staff_no+')"><i class="iconfont fsize-14">&#xe694;</i>重新打开</div>'+ 
//                              '</div>'+      
                            '</li>'+
                            '<li class="aui-bg-default p-5"></li>'+
                            '</div>'
                        )                                                                                   
                    } 
                }
                api.hideProgress();//隐藏进度提示框
            }
        }
        else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}
//折叠
function dropDown(obj){
    $(obj).parents(".fold").siblings(".fold").children(".fold-list").slideUp();  
    $(obj).parents(".fold").siblings(".fold").find('.arrow').html('&#xe61b;')
    $(obj).next("li").slideToggle(
        function(){
            if ($(obj).next().is(':hidden')) {
                $(obj).find('.arrow').html('&#xe61b;')
            }else{
                $(obj).find('.arrow').html('&#xe6fe;')                
            }
        }
    )  
}

//打开详情页面
function openBugInfoWin(winName,id,assistant_id){ 
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "id":id,
            "assistant_id":assistant_id,//测试人员id
        }
    });
}