//分页字段
var page = 1;//主分页
var plan_returntype="";//工作计划类型
var status="";//状态分类
var type="";//判断是否为我的安排类型
apiready = function () {
    status=api.pageParam.status;
    plan_returntype=api.pageParam.plan_returntype;
    type=api.pageParam.type;//判断是否为我的安排
    if(type=="work"){
        openPullRefresh("get_workplan_list('pull')");//下拉刷新
        evenScrolltobottom("get_workplan_list()");//上拉加载数据
        get_workplan_list();
    }else if(type=="arrange"){
        openPullRefresh("get_arrayplan_list('pull')");//下拉刷新
        evenScrolltobottom("get_arrayplan_list()");//上拉加载数据
        get_arrayplan_list();
    }else{     
        openPullRefresh("get_Deptplan_list('pull')");//下拉刷新
        evenScrolltobottom("get_Deptplan_list()");//上拉加载数据
        get_Deptplan_list();
    }  
}

function get_workplan_list(){
    var arr=status.split(",")    
    for(var i=0;i<arr.length;i++){
        showProgress();//加载等待   
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
                    status:arr[i],
                    pagesize:10
                }
            }
        },function(ret,err){
            if(ret){
                if(ret.status == 1){
                    var list = ret.list;    
                    for(var i = 0; i < ret.list.length; i++){
                        if(list[i]!=null){
                            var img=get_head(list[i].staff_avatar,list[i].staff_name);                            
                            $("#list").append(
                                '<li class="aui-user-view-cell aui-img pb-0 border-b-none pr-0" onclick="openNewWin(\'work_infoHeader\','+list[i].workplan_id+',\'work\')">'                          
                                    +img+
                                    '<div class="aui-img-body aui-border-b pb-8 pr-15">'+                                                                            
                                        '<div class="ellipsis-one">'+list[i].workplan_title+'</div>'+
                                        '<p class="lh-22">'+
                                            '<i class="iconfont fcolor-yellow1 fsize-16">&#xe6b3;</i>'+
                                            '<span class="fsize-14 fcolor-gray1">指派人：'+list[i].staff_name+'</span>'+
                                        '</p>'+
                                        '<p class="fsize-14">'+
                                        	(list[i].status==11?new Date(list[i].workplan_expectstart_time!=null?list[i].workplan_expectstart_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em class='fsize-12'>(预计)</em>":
                                        	new Date(list[i].workplan_start_time!=null?list[i].workplan_start_time.replace(/-/g,"/"):list[i].workplan_expectstart_time.replace(/-/g,"/")).format('yyyy-MM-dd'))+'--'
                                        	+(list[i].status==11||list[i].status==21||list[i].status==52?
                                        	new Date(list[i].workplan_expectend_time!=null?list[i].workplan_expectend_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em class='fsize-12'>(预计)</em>":
                                        	list[i].status==31||list[i].status==32?
                                        	new Date(list[i].workplan_end_time!=null?list[i].workplan_end_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'):
                                        	new Date(list[i].workplan_stop_time!=null?list[i].workplan_stop_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'))+
                                    	'</p>'+
                                    '</div>'+
                                '</li>'
                            )                                                                 
                        }
                    } 
                    page++;                            
                }else{
                    $("#list #more").remove();
                    $("#list").append(
                        '<li class="aui-user-view-cell aui-text-center" id="more">没有更多数据</li>'
                    );
                }
                api.hideProgress();//隐藏进度提示框
            }else{
                api.hideProgress();//隐藏进度提示框
                /**无网络提示 */
                api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
            }
        })
    }

}

function get_arrayplan_list(){
    var arr=status.split(",")        
    for(var i=0;i<arr.length;i++){
        showProgress();//加载等待   
        //ajax获取数据处理
        var url = localStorage.url+"api/Oa/get_workplan_list";
        api.ajax({
            url:url,
            method: 'post',
            timeout: 100,
            data: {//传输参数
                values: {
                    "arranger_staff":localStorage.user_id,
                    "page": page,
                    "plan_returntype":plan_returntype,
                    "pagesize":10,
                    "status":arr[i]
                }
            }
        },function(ret,err){
            if(ret){
                if(ret.status == 1){
                    var list = ret.list;   
                    for(var i = 0; i < ret.list.length; i++){
                        if(list[i]!=null){
                            var img=get_head(list[i].staff_avatar,list[i].staff_name);
                            $("#list").append(
                                '<li class="aui-user-view-cell aui-img pb-0 border-b-none pr-0" onclick="openNewWin(\'work_infoHeader\','+list[i].workplan_id+',\'arrange\')">'                          
                                    +img+
                                    '<div class="aui-img-body aui-border-b pb-8 pr-15">'+                                                                              
                                        '<div class="ellipsis-one">'+list[i].workplan_title+'</div>'+
                                        '<p class="lh-22">'+
                                            '<i class="iconfont fcolor-yellow1 fsize-16">&#xe6b3;</i>'+
                                           //'<span class="fsize-14 fcolor-gray1">'+(type=="arrange"?"":"")+'</span>'+
                                            '<span class="fsize-14 fcolor-gray1">'+(type=="arrange"?"执行人:"+list[i].executor_name+"":"指派人:"+list[i].staff_name+"")+'</span>'+
                                        '</p>'+
                                        '<p class="fsize-14">'+(list[i].status==11?
                                            new Date(list[i].workplan_expectstart_time!=null?list[i].workplan_expectstart_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em class='fsize-12'>(预计)</em>":
                                        	new Date(list[i].workplan_start_time!=null?list[i].workplan_start_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'))+'--'
                                        +(list[i].status==11||list[i].status==21?
                                            new Date(list[i].workplan_expectend_time!=null?list[i].workplan_expectend_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em class='fsize-12'>(预计)</em>":
                                            list[i].status==31||list[i].status==32?
                                        	new Date(list[i].workplan_end_time!=null?list[i].workplan_end_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'):
                                        	new Date(list[i].workplan_reject_time!=null?list[i].workplan_reject_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'))+'</p>'+
                                    '</div>'+
                                '</li>'
                            )                                                                                             
                        }
                    } 
                    page++;                            
                }else{
                    $("#list #more").remove();
                    $("#list").append(
                        '<li class="aui-user-view-cell aui-text-center" id="more">没有更多数据</li>'
                    );
                }
                api.hideProgress();//隐藏进度提示框
            }else{
                api.hideProgress();//隐藏进度提示框
                /**无网络提示 */
                api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
            }
        })
    }

}

function get_Deptplan_list(){
    var arr=status.split(",")        
    for(var i=0;i<arr.length;i++){
        showProgress();//加载等待   
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
                    plan_returntype:plan_returntype,
                    pagesize:10,
                    status:arr[i]
                }
            }
        },function(ret,err){
            if(ret){
                if(ret.status == 1){
                    var list = ret.list;   
                    for(var i = 0; i < ret.list.length; i++){
                        if(list[i]!=null){
                            var img=get_head(list[i].staff_avatar,list[i].staff_name);
                            $("#list").append(
                                '<li class="aui-user-view-cell aui-img pb-0 border-b-none pr-0" onclick="openNewWin(\'work_infoHeader\','+list[i].workplan_id+',\'arrange\')">'                          
                                    +img+
                                    '<div class="aui-img-body aui-border-b pb-8 pr-15">'+                                                                              
                                        '<div class="ellipsis-one">'+list[i].workplan_title+'</div>'+
                                        '<p class="lh-22">'+
                                            '<i class="iconfont fcolor-yellow1 fsize-16">&#xe6b3;</i>'+
                                           //'<span class="fsize-14 fcolor-gray1">'+(type=="arrange"?"":"")+'</span>'+
                                            '<span class="fsize-14 fcolor-gray1">'+(type=="arrange"?"执行人:"+list[i].executor_name+"":"指派人:"+list[i].staff_name+"")+'</span>'+
                                        '</p>'+
                                        '<p class="fsize-14">'+(list[i].status==11?
                                            new Date(list[i].workplan_expectstart_time!=null?list[i].workplan_expectstart_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em class='fsize-12'>(预计)</em>":
                                        	new Date(list[i].workplan_start_time!=null?list[i].workplan_start_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'))+'--'
                                        +(list[i].status==11||list[i].status==21?
                                            new Date(list[i].workplan_expectend_time!=null?list[i].workplan_expectend_time.replace(/-/g,"/"):"").format('yyyy-MM-dd')+"<em class='fsize-12'>(预计)</em>":
                                            list[i].status==31||list[i].status==32?
                                        	new Date(list[i].workplan_end_time!=null?list[i].workplan_end_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'):
                                        	new Date(list[i].workplan_reject_time!=null?list[i].workplan_reject_time.replace(/-/g,"/"):"").format('yyyy-MM-dd'))+'</p>'+
                                    '</div>'+
                                '</li>'
                            )                                                                                             
                        }
                    } 
                    page++;                            
                }else{
                    $("#list #more").remove();
                    $("#list").append(
                        '<li class="aui-user-view-cell aui-text-center" id="more">没有更多数据</li>'
                    );
                }
                api.hideProgress();//隐藏进度提示框
            }else{
                api.hideProgress();//隐藏进度提示框
                /**无网络提示 */
                api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
            }
        })
    }

}


//打开新页面
function openNewWin(winName,workplan_id,type){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "workplan_id":workplan_id,
            "type":type,//用来区分我的安排
        }
    });
}