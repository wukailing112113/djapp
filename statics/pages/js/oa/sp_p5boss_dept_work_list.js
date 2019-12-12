//分页字段
var page = 1;//主分页
var plan_status;//状态
var arranger_man_id;//指派人id
var plan_list;

//状态数量变量
var ready_in_num = 0;//未开始
var in_turn_num = 0;//进行中
var wait_approval_num = 0;//待审核
var done_num = 0;//已完成
var break_num = 0;//已终止
apiready = function () {
    get_workplan_list('ready_in','3','11');//未开展
    get_workplan_list('in_turn','3','21,52');//进行中
    get_workplan_list('wait_approval','3','31');//待审核
    get_workplan_list('done','3','31,32');//已完成
    get_workplan_list('break','3','51');//已中止
}

//处理加载数据方法
function get_workplan_list(id,plan_returntype,status){ 
    //showProgress();//加载等待   
    //ajax获取数据处理
    var url = localStorage.url+"api/Oa/get_workplan_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: {
                executor_staff:localStorage.user_id,
                page: page,
                pagesize:9999999999,
                plan_returntype:plan_returntype,
                status:status
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                var list = ret.list;
                for(var i = 0; i < 10; i++){
                    if(list[i]!=null){
                        $("#"+id+"_list").append(
                            '<li class="" onclick="openInfoWin(\'work_infoHeader\','+list[i].workplan_id+',\'dept\')">'+
                                '<i class="iconfont fsize-14 ml-3 '+(list[i].status==11?"fcolor-red1":(list[i].status==21||list[i].status==52||list[i].status==32?"fcolor-blue1":(list[i].status==31?"fcolor-yellow2":"fcolor-red4")))+'">&#xe670;</i>'+
                                '<div class="aui-timeline-item">'+                                 
                                    '<h3 class="aui-timeline-header p-0 fsize-14 '+(list[i].status==11?"fcolor-red3":list[i].status==21||list[i].status==31||list[i].status==32||list[i].status==52?"fcolor-blue1":"fcolor-red1")+'">'+
                                        '<span>'+(list[i].status==11?
                                                new Date(list[i].workplan_expectstart_time!=null?list[i].workplan_expectstart_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em>(预计)</em>":
                                                new Date(list[i].workplan_start_time!=null?list[i].workplan_start_time.replace(/-/g,"/"):list[i].workplan_expectstart_time.replace(/-/g,"/")).format('yyyy-MM-dd'))+'--</span>'+
                                        '<span>'+(list[i].status==11||list[i].status==21||list[i].status==52?
                                                new Date(list[i].workplan_expectend_time!=null?list[i].workplan_expectend_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em>(预计)</em>":
                                            list[i].status==31||list[i].status==32?
                                                new Date(list[i].workplan_end_time!=null?list[i].workplan_end_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'):
                                                new Date(list[i].workplan_stop_time!=null?list[i].workplan_stop_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'))+'</span>'+
                                    '</h3>'+  
                                    '<div class="aui-timeline-body p-li aui-border-b mb-5 mt-8">'+
                                        '<i class="iconfont fsize-12 p-0 aui-pull-left lh-19 mr-5 '+(list[i].status==11?"fcolor-red1":"fcolor-blue1")+'">&#xe6e2;</i>'+
                                        '<p class="di-i mb-5">'+
                                            '<span class="di-ib ellipsis-one lh-14 w-54b maxw-54b">'
                                                +list[i].workplan_title+
                                            '</span>'+
                                            '<span class="fsize-12 fcolor-gray1 aui-pull-right lh-22">指派人:<em id="'+id+i+'">'+list[i].staff_name+'</em></span>'+
                                        '</p>'+
                                    '</div>'+                                   
                                '</div>'+
                            '</li>'
                        )                                  
                    }
                }
                //加载数据角标
                if(list.length!=0){
                   $("#"+id+"_num").removeClass("di-none");//列表长度
                   $("#"+id+"_num").html(list.length);//列表长度                   
                }
                //有十条以上数据的时候显示加载更多
                if(list.length>9){
                    $("#"+id+"_list").append(
                        '<div id="more'+id+'" class="aui-list-view-cell pr-0 border-b-none">'+
                            '<span class="aui-pull-right w-30b text-r lh-14 aui-text-info" onclick="openNewWin(\'work_list_secondHeader\',\''+status+'\',\'dept\',\''+plan_returntype+'\')">查看更多>></span>'+
                        '</div>'
                    )                      
                }   
                $("#more"+id).prev().find(".aui-timeline-body").removeClass("aui-border-b") 
                api.hideProgress();//隐藏进度提示框
            }
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}


//切换下拉及加载数据
function dropDownSwitch(obj){
    if($(obj).attr("id") == "ready_in"){
        list_id = "ready_in_list";
    }else if($(obj).attr("id") == "in_turn"){
        list_id = "in_turn_list";
    }else if($(obj).attr("id") == "wait_approval"){
        list_id = "wait_approval_list";
    }else if($(obj).attr("id") == "done"){
        list_id = "done_list";
    }else{
        list_id = "break_list";
    }       
    //切换当前分类显示与隐藏
    $(obj).addClass("aui-fold-active border-b-none mt-15");
    $(obj).children("i").html("&#xe6fe;");
    $(obj).siblings("li").removeClass("aui-fold-active border-b-none mt-15");
    $(obj).siblings("li").children("i").html("&#xe61b;");    
    $("#"+list_id).parents(".aui-fold-content").siblings(".aui-fold-content").slideUp();//关闭非当前行分类
    $("#"+list_id).parents(".aui-fold-content").siblings(".aui-fold-content").removeClass("mb-15")
    $("#"+list_id).parents(".aui-fold-content").addClass("mb-15");
    $("#"+list_id).parents(".aui-fold-content").slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).removeClass("mt-15 aui-fold-active border-b-none");
            $("#"+list_id).parents(".aui-fold-content").removeClass("mb-15");
            $(obj).children("i").html("&#xe61b;");
        }
    });
}

//打开新页面
function openInfoWin(winName,workplan_id,type,class_id){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "workplan_id":workplan_id,
            "type":type,//用来区分我的安排
            "class_id":class_id
        }
    });
}

function openNewWin(winName,status,type,plan_returntype){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "status":status,//工作计划状态
            "type":type,//用来区分我的安排
            "plan_returntype":plan_returntype//我安排的工作类型
        }
    });
}

//刷新页面
function exec(){
    location.reload();
}