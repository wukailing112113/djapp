apiready = function(){
    get_bug_list();
    openPullRefresh("get_bug_list('pull')");//下拉刷新
    evenScrolltobottom("get_bug_list()");//上拉加载数据
}
var page=1;
//获取页面数据
function get_bug_list(pull){ 
    if(pull=='pull'){
        page=1;
    }
    showProgress();//加载等待   
    //ajax获取数据处理
    var url = localStorage.url+"api/pms/get_project_bug_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: {
                "page": page,
                "pagesize":10,
                "key_word":api.pageParam.bug_keyword,//关键字
                "bug_type": api.pageParam.bug_type,//bug类型
                "status":api.pageParam.bug_status,//bug状态
                "start_time":api.pageParam.start_time,//开始时间
                "end_time":api.pageParam.end_time//结束时间
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                var list = ret.list;                
                for(var i = 0; i < list.length; i++){
                    $("#tab1").append(
                        '<div class="fold">'+
                            '<li class="aui-list-view-cell aui-img" tapmode onclick="dropDown(this)">'+
                                '<div class="aui-img-body fsize-16">'+
                                    '<i class="iconfont aui-text-danger fsize-20 po-ab left-5 top-10">&#xe6b0;</i>'+
                                    '<span class="aui-ellipsis-1 aui-col-xs-11 h-28 pl-20 aui-text-info">'+list[i].bug_title+'</span>'+
                                    '<div class="aui-col-xs-1 laud">'+
                                        '<i class="iconfont fsize-16 arrow">&#xe61b;</i>'+
                                    '</div>'+
                                    '<div class="helper-tag di-ib w-all">'+
                                        '<div class="aui-pull-left w-38b">'+
                                            '<i class="iconfont aui-text-warning fsize-14 pl-0">&#xe6f6;</i>'+
                                            '<span>'+list[i].bug_no+'</span>'+
                                        '</div>'+
                                        '<div class="aui-pull-left w-45b">'+
                                            '<i class="iconfont aui-text-warning fsize-14 ml-4b pl-0">&#xe6b8;</i>'+
                                            '<span>状态:</span>'+
                                            (list[i].status_no==11?"待接收":
                                            list[i].status_no==21?"待解决":
                                            list[i].status_no==31?"待内测":
                                            list[i].status_no==41?"退回发起人":
                                            list[i].status_no==32?"待客户测试":
                                            list[i].status_no==42?"驳回待解决":
                                            list[i].status_no==51?"已关闭":"终止")+
                                        '</div>'+
                                        '<div class="aui-pull-left w-17b">'+
                                            '<i class="iconfont aui-text-warning fsize-14 ml-4b pl-0">&#xe6ab;</i>'+
                                            '<font class="'+(list[i].bug_type==01?"aui-text-danger":list[i].bug_type==02?"aui-text-success":"aui-text-info")+'">'+
                                            (list[i].bug_type==01?"BUG":list[i].bug_type==02?"需求":"优化")+'</font>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="helper-tag di-ib w-all">'+
                                        '<div class="aui-col-xs-6">'+
                                            '<i class="iconfont aui-text-warning fsize-14 pl-0">&#xe6b7;</i>'+
                                            '<span>提交人:</span>'+list[i].add_staff+
                                        '</div>'+
                                        '<div class="aui-col-xs-6">'+
                                            '<i class="iconfont aui-text-warning fsize-14 ml-4b pl-0">&#xe6b3;</i>'+
                                            '<span>解决人:</span>'+list[i].receiver_name+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="helper-tag di-ib w-all">'+
                                        '<div class="aui-col-xs-12">'+
                                            '<i class="iconfont aui-text-warning fsize-14 pl-0">&#xe612;</i>'+
                                            '<span>模块:</span>'+list[i].module_name+
                                        '</div>'+
                                    '</div>'+
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
                page++;
            }
            else{
                $("#more").remove();
                $("#tab1").append(
                    '<li class="aui-user-view-cell aui-text-center" id="more">没有更多数据</li>'
                );  
            }
            api.hideProgress();//隐藏进度提示框
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

//点击按钮打开页面
function openBugEditWin(winName,id,edit_type){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "id":id,//bug id
            "edit_type":edit_type//编辑类型
        }
    });
}

