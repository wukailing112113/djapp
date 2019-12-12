apiready = function(){
    get_bug_info();//获取bug详情
}

//获取bug详情
function get_bug_info(){
    showProgress();//加载等待
    //ajax获取数据处理
    var url = localStorage.url+"Api/Pms/get_project_bug_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: {
                "bug_no":api.pageParam.id,
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $("#title").html(ret.bug_title);//标题
                $("#id").html(api.pageParam.id);//id
                $("#type").html(ret.type_name);//bug类型
                $("#urgency").html(ret.bug_urgency_name);//紧急类型
                $("#module_name").html(ret.module_name);//所属模块名称
                $("#status").html(
                    (ret.status_no==11?"待接收":
                    ret.status_no==21?"待解决":
                    ret.status_no==31?"待内测":
                    ret.status_no==41?"退回发起人":
                    ret.status_no==32?"待客户测试":
                    ret.status_no==42?"驳回待解决":
                    ret.status_no==51?"已关闭":"终止"));//状态
                $("#add_staff").html(ret.add_staff);//提交人
                $("#status_name").html(ret.status_name);//动态里的状态
                $("#add_date").html(new Date(ret.add_time!=null?ret.add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm'));//添加时间
                $("#error_level").html(ret.bug_error_level_name);//bug出现频次
                $("#browser").html(ret.bug_browser);//浏览器
                $("#os_name").html(ret.bug_os_name);//操作系统
                $("#receive_name").html(ret.bug_receiver_name);//bug出现频次
                if(ret.bug_expect_endtime!=null){
                    $("#log_date").html(new Date(ret.bug_expect_endtime.replace(/-/g,"/")).format('yyyy-MM-dd hh:mm'));//截止时间
                }else{
                    $("#log_date").parent("div").hide();
                }
                if(ret.bug_operflow!=null){
                    $("#bug_content").html(removeHTMLTag(ret.bug_operflow));//内容
                }
                //当附件长度为0时隐藏附件容器
                if(ret.upload_list.length>0){
                    $("#info_upload").show()
                    $("#upload_length").html(ret.upload_list.length);
                    //加载附件列表
                    for(var i = 0;i<ret.upload_list.length; i++){
                        if(ret.upload_list[i].upload_path!=null){
                            var img=upold_img(ret.upload_list[i].upload_path);
                            file_url=localStorage.url+ret.upload_list[i].upload_path;
                            if($("#whole").val()==""){
                               $("#whole").val(file_url)
                            }else{
                               $("#whole").val($("#whole").val()+","+file_url)
                            }
                            $("#info_upload_list").append(
                                '<li class="aui-list-view-cell" onclick="openEnqueue(\''+file_url+'\');openManagerView()">'+
                                     img+
                                    '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
                                    +ret.upload_list[i].upload_path.substring(ret.upload_list[i].upload_path.length-20,ret.upload_list[i].upload_path.length)+
                                        '<input name="file_no" type="hidden" value="'+ret.upload_list[i].upload_id+'" />'+             
                                    '</span>'+
                                '</li>'
                            );
                        }
                    }
                } 
                //循环工作总结列表
                for(var i = 0; i < ret.log_list.length; i++){
                    var img=get_head(ret.log_list[i].staff_avatar,ret.log_list[i].staff_name);               
                     $("#log_list").append(
                            '<li class="aui-time-label aui-img aui-user-view-cell p-0">'
                                +img+
                                '<div class="aui-timeline-item bg-f4">'+
                                    '<p class="fcolor-33">'+
                                        new Date(ret.log_list[i].log_time!=null?ret.log_list[i].log_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm')+
                                    '</p>'+
                                    '<h3 class="lh-28 aui-text-info">'+ret.log_list[i].staff_name+'</h3>'+
                                    '<div class="aui-timeline-body bg-color-white mt-5 ml-5 bor-radius-3">'+ret.log_list[i].bug_content+'</div>'+
                                '</div>'+        
                            '</li>'
                        );                 
                }  
                if(ret.status_no==11&&ret.bug_receiver_no==localStorage.user_id){//解决人，待接收
                    $("#btn1").show()
                }else if(ret.status_no==21&&ret.bug_receiver_no==localStorage.user_id||ret.status_no==42&&ret.bug_receiver_no==localStorage.user_id){//解决人，待解决
                    $("#btn2").show()
                }else if(ret.status_no==32&&ret.add_staff_no==localStorage.user_id){//提交人，待确认
                    $("#btn3").show();
                    $("#stop_btn").show();
                }else if(ret.status_no==31&&api.pageParam.assistant_id==localStorage.user_id){//提交人，待确认
                    $("#btn3").show();
                    $("#comfirm_btn,#reject_btn").removeClass("aui-col-xs-4").addClass("aui-col-xs-6");
                }else if(ret.status_no!=32&&ret.add_staff_no==localStorage.user_id){//提交人，不需要提交人确认
                    if(ret.status_no==51||ret.status_no==52){
                        $("#btn5").show()//提交人，重新打开重新提交一次该bug
                    }else{
                        $("#btn4").show()
                    }
                }                        
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    }); 
}

//下载全部附件
 $("#download").bind("click",function(event){
    var file=$("#whole").val().split(",");
    if(file.length>1){
       for(var i=0;i<file.length;i++){
            openEnqueue(''+file[i]+'');
        }
        openManagerView() 
    }else{
        openEnqueue(''+file[0]+'');
        openManagerView()
    }
 })

//打开新窗口
function openBugEditWin(winName,edit_type,id,assistant_id){
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "edit_type":edit_type,//编辑类型
            "id":api.pageParam.id,//bug id
            "assistant_id":api.pageParam.assistant_id//测试人员id
        }
    });
}

//切换下拉及加载数据
function dropDownSwitch(obj){ 
    $(obj).addClass("aui-fold-active");
    $(obj).find(".aui-pull-right").html("&#xe6fe;");
    $("#info_upload_list").parents(".aui-fold-content").slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).removeClass("aui-fold-active");
            $(obj).find(".aui-pull-right").html("&#xe61b;");
        }
    });
}

//页面刷新
function exec(){
	 api.execScript({
	 	 name: 'bug_listHeader',
		 frameName:'bug_list',
	     script:'get_bug_list(\'pull\',\'\',\'详情\')'
    });
    location.reload();
}