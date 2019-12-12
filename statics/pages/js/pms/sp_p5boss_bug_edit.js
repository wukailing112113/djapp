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

var edit_type;//bug编辑类型
var assistant_id;//测试助理id
var bug_id;//BUG id
apiready = function(){
    edit_type=api.pageParam.edit_type;//bug编辑类型
    assistant_id=api.pageParam.assistant_id//测试助理id
    bug_id=api.pageParam.id//BUG id
    
    if(edit_type=="receive"){
        $("#module,#type,#time,#receive,#space").show();
        $("#add_upload").hide();
    }else if(edit_type=="reject"){
        $("#reject").show();
        $("#mome_title").html("驳回原因")
    }else if(edit_type=="reAssignSol"){
        $("#sol_name,#reAssignSol,#space").show();
        $("#mome_title").html("指派原因")
    }else if(edit_type=="solve"){
        $("#solve").show();
        $("#mome_title").html("解决说明")
    }else if(edit_type=="confirm"){
        $("#confirm").show();
        $("#mome_title").html("确认说明")
    }else if(edit_type=="cus_reject"){
        $("#cus_reject").show();
        $("#mome_title").html("驳回说明")
    }else if(edit_type=="stop"){
        $("#stop").show();
        $("#mome_title").html("终止说明")
    }else if(edit_type=="reopen"){
        $("#reopen").show();
        $("#mome_title").html("重新提交说明")
    }
    get_bug_info();//获取bug详情
}

var status_no;//状态编号
var type_id;//bug类型
var project_no;//项目编号
var receiver_no;//解决人id，客户操作bug时传入，解决人操作bug时解决人是自己
var add_staff;//添加人id
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
                "bug_no":bug_id,//BUG id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $("#title").html(ret.bug_title);//标题
                $("#id").html(bug_id);//bug id
                $("#project_id").val(ret.project_no);//id
                $("#type").html(ret.type_name);//bug类型
                $("#urgency").html(ret.bug_urgency_name);//紧急类型
                $("#module_name").html(ret.module_name);//所属模块名称
                $("#add_staff").html(ret.add_staff);//提交人
                $("#add_date").html(new Date(ret.add_time!=null?ret.add_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm'));//添加时间
                $("#error_level").html(ret.bug_error_level_name);//bug出现频次
                $("#browser").html(ret.bug_browser);//浏览器
                $("#os_name").html(ret.bug_os_name);//操作系统
                $("#status").html((
                    ret.status_no==11?"待接收":
                    ret.status_no==21?"待解决":
                    ret.status_no==31?"待内测":
                    ret.status_no==41?"退回发起人":
                    ret.status_no==32?"待客户测试":
                    ret.status_no==42?"驳回待解决":
                    ret.status_no==51?"已关闭":"终止"));//状态
                $("#receive_name").html(ret.bug_receiver_name);//解决人
                $("#module").val(ret.module_name);//所属模块名称
                status_no=ret.status_no;//状态编号
                project_no=ret.project_no;//项目编号
                receiver_no=ret.bug_receiver_no;//解决人id
                add_staff=ret.add_staff_no;//添加人id
                if(ret.type_name=="BUG"){
                    type_id='01';
                }else if(ret.type_name=="需求"){
                    type_id='02';
                }else{
                    type_id='03';
                }
                if(edit_type=="receive"){
                    if(ret.type_name=="BUG"){
                        $("#01").attr("checked","checked");
                    }else if(ret.type_name=="优化"){
                        $("#02").attr("checked","checked");
                    }else if(ret.type_name=="需求"){
                        $("#03").attr("checked","checked");
                    }
                    $("#module_na").val(ret.module_name);//所属模块名称
                    get_module_list()//获得模块列表
                }else if(edit_type=="reAssignSol"){
                    get_receiver_list()//获得指派人列表
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

var module_arr=[];//模块名称，id
//加载取得模块名称,id
function get_module_list(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Pms/get_project_module_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
               "project_no":project_no,//当前项目id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                module_arr=ret.module_list;
                open_module_list()//滑动选择模块
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//滑动打开模块列表，id
function open_module_list(){
    (function($, doc) {
    //mui滑动选择
    $.init();
        $.ready(function() {
            //客户
            var userPicker = new $.PopPicker({
                layer: 3
            });
            userPicker.setData(module_arr);
            var showUserPickerButton = doc.getElementById('module');
            showUserPickerButton.addEventListener('tap', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = (items[0].text==undefined?"":items[0].text)+(items[1].text==undefined?"":"->"+items[1].text)+(items[2].text==undefined?"":"->"+items[2].text);
                    willdo_operdate = (items[2].value!=undefined?items[2].value:items[1].value!=undefined?items[1].value:items[0].value);
                    jQuery("#module_id").val(willdo_operdate);                   
                });
            }, false);
        });
    })(mui, document); 
    module_arr=[] 
}

var receiver_name_arr=[];//解决人名称
var receiver_id_arr=[];//解决人id
var arr_receiver=[];//解决人名称.id键值对
//详情页时加载数据
function get_receiver_list(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Pms/get_project_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "project_no":project_no,//当前项目id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                if(ret.project_leader_name!=""||ret.project_crew_name!=""){
                    receiver_name_arr=(ret.project_leader_name+','+ret.project_crew_name).split(",");
                    receiver_id_arr=(ret.project_leader_no+','+ret.project_crew_no).split(",");
                    for(var i=0;i<receiver_name_arr.length;i++){
                        arr_receiver[i]={"value":receiver_id_arr[i],"text":receiver_name_arr[i]};   
                    }
                }
                open_receiver_list()//滑动打开选择人列表
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//滑动打开选择人列表
function open_receiver_list(){
    (function($, doc) {
    //mui滑动选择
    $.init();
        $.ready(function() {
            //客户
            var userPicker = new $.PopPicker();
            userPicker.setData(arr_receiver);
            var showUserPickerButton = doc.getElementById('assign');
            showUserPickerButton.addEventListener('tap', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = items[0].text;
                    jQuery("#assign_id").val(items[0].value);                                    
                });
            }, false);
        });
    })(mui, document);  
}

//保存添加的bug信息
function save_project_bug_info(){
      showProgress();//加载等待
        var url = localStorage.url+"Api/Pms/save_project_bug_info";
        api.ajax({
            url:url,
            method: 'post',
            timeout: 100,
            data: {//传输参数
                values: { 
                    "project_no":$("#project_id").val(),//当前项目id
                    "add_staff":localStorage.user_id,//操作人编号
                    "module_no":$("#module_id").val(),//模块编号
                    "bug_type":$("input[name='demo']:checked").val(),//bug类型编号
                    "bug_receiver":$("#assign_id").val(),//解决人编号
                }
            }   
        },function(ret,err){
            if(ret){
                if(ret.status == 1){
                   set_bug_receive()//接收bug操作
                }
                api.hideProgress();//隐藏进度提示框
            }else{
                api.hideProgress();//隐藏进度提示框
                /**无网络提示 */
                api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
            }
        })
}

//接收bug，更改状态
function set_bug_receive(){
    //showProgress();//加载等待
        var url = localStorage.url+"Api/Pms/set_project_bug_status";
        api.ajax({
            url:url,
            method: 'post',
            timeout: 100,
            data: {//传输参数
                values: { 
                    "status":21,//当前项目id
                    "bug_no":bug_id,//BUG编号
                    "add_staff":localStorage.user_id,//操作人编号
                    "bug_type":$("input[name='demo']:checked").val(),//bug类型编号
                    "bug_expect_endtime":$("#end_time").val(),//预计完成时间
                    "memo":$("#memo").val(),//备注
                    "module_no":$("#module_id").val(),//模块编号
//                  "staff_no":localStorage.user_id,//解决人编号
                }
            }   
        },function(ret,err){
            if(ret){
                if(ret.status == 1){
                    $aui.alert({
                        title:'提示',
                        content:'保存成功',
                        buttons:['确定']},
                        function(ret){});
                        api.execScript({
                            name:"bug_infoHeader",
                            frameName:"bug_info",
                            script: 'exec();'
                        });
                        api.closeWin({});
                        $("#receive").attr("disabled",true);                
                }else{
                    $aui.alert({
                        title:'提示',
                        content:ret.msg,
                        buttons:['确定']
                    },function(ret){});
                    $("#receive").attr("disabled",false);//释放保存按钮
                }
                api.hideProgress();//隐藏进度提示框
            }else{
                $("#receive").attr("disabled",false);//释放保存按钮
                api.hideProgress();//隐藏进度提示框
                /**无网络提示 */
                api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
            }
        })
}

//驳回bug，更改状态
function set_bug_reject(){
      showProgress();//加载等待
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":41,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "memo":$("#memo").val(),//备注
                "bug_attachment":file_no,//附件id
//              "staff_no":staff_no,//解决人编号
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'驳回成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#reject").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#reject").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#reject").attr("disabled",false);;//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}


//重新指派解决人，更改状态
function set_bug_reAssignSol(){
    showProgress();//加载等待
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":11,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "memo":$("#memo").val(),//备注
                "staff_no":$("#assign_id").val(),//解决人编号
                "bug_attachment":file_no,//附件id
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'指派成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#reAssignSol").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#reAssignSol").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#reAssignSol").attr("disabled",false);//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

//解决bug，更改状态
function set_bug_solve(){
    showProgress();//加载等待
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":31,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "bug_content":$("#memo").val(),//备注
                "bug_attachment":file_no,//附件id
//              "staff_no":localStorage.user_id,//解决人编号
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'解决成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#solve").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#solve").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#solve").attr("disabled",false);;//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

var solve_status;//确认bug时传的状态值
//客户确认bug，更改状态
function confirm_project_bug(){
    showProgress();//加载等待
    if(assistant_id==localStorage.user_id&&assistant_id!=add_staff){
        solve_status=32//如果是测试助理确认，状态更改为32，等待客户测试
    }else{
        solve_status=51//如果是客户确认，状态更改为51，bug关闭
    }
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
//  alert(assistant_id)
//  alert(add_staff)
//  alert(solve_status)
//  alert(bug_id)
//  alert(edit_type)
//  alert(receiver_no)
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":solve_status,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "bug_content":$("#memo").val(),//备注
                "staff_no":receiver_no,//解决人编号
                "bug_attachment":file_no,//附件id
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'确认成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#confirm").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#confirm").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#confirm").attr("disabled",false);;//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

//客户驳回bug，更改状态
function customer_set_bug_reject(){
    showProgress();//加载等待
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":42,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "bug_content":$("#memo").val(),//备注
                "staff_no":receiver_no,//解决人编号
                "bug_attachment":file_no,//附件id
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'驳回成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#cus_reject").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#cus_reject").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#cus_reject").attr("disabled",false);;//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

//客户终止bug，更改状态
function set_bug_stop(){
    showProgress();//加载等待
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":52,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "bug_content":$("#memo").val(),//备注
                "staff_no":receiver_no,//解决人编号
                "bug_attachment":file_no,//附件id
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'终止成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#stop").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#stop").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#stop").attr("disabled",false);;//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

//客户重新打开bug，更改状态
function set_bug_reopen(){
    showProgress();//加载等待
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":11,//更改的状态
                "bug_no":bug_id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_id,//bug类型编号
                "bug_content":$("#memo").val(),//备注
                "staff_no":receiver_no,//解决人编号
                "bug_attachment":file_no,//附件id
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'重新提交成功',
                    buttons:['确定']},
                    function(ret){});
                    api.execScript({
                        name:"bug_infoHeader",
                        frameName:"bug_info",
                        script: 'exec();'
                    });
                    api.closeWin({});
                    $("#reopen").attr("disabled",true);                
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
                $("#reopen").attr("disabled",false);//释放保存按钮
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            $("#reopen").attr("disabled",false);;//释放保存按钮
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

//页面刷新
function exec(){
    location.reload();
}

//上传附件选择
function open_uploud(){
    //选着上传类型
    api.actionSheet({
        buttons: ['拍照','上传图片视频']
    },function( ret, err ){
        if(ret.buttonIndex == 1){
            camera('add_upload_list');//拍照方法
        }
        else if(ret.buttonIndex == 2){
            openpicture('add_upload_list');//调取视频图片方法
        }
    });
}

////调取摄像头照相
function camera(id){
    api.getPicture({
        sourceType: 'camera',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 50,
        saveToPhotoAlbum: false
    }, function(ret, err){ 
        if (ret) {
            path=ret.data;
            api.saveMediaToAlbum({
                path: ret.data
            }, function(ret, err){ 
                if (ret.status) {
                    var file_name=path;//path为获取路径
                    var url = localStorage.url+"Api/Upload/file_upload";
                    api.ajax({
                        url:url,
                        method: 'post',
                        timeout: 100,
                        report: true,
                        data: {//传输参数
                            values: { 
                            },
                            files: {file:path}
                        }
                    },function(ret,err){
                        if(ret){
                            obj = ret.body;
                            api.showProgress({
                                style: 'default',
                                animationType: 'fade',
                                title: '文件上传进度',
                                text: ret.progress+"%",
                                modal: false
                            });
                            if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
                            if(1==obj.status){
                                var path=file_name.split("/");
                                file_name=path[path.length-1];
                                var img=upold_img(file_name);
                                if(file_name.length>10){
                                    file_name=file_name.substring(file_name.length-10,file_name.length);
                                }
                                //id为预览的容器
                                $("#"+id).append(
                                    '<li class="aui-list-view-cell">'+
                                        img+
                                        '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
                                            +file_name+
                                            '<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
                                            '<span class="aui-pull-right aui-text-danger mt2" onclick="javascript:$(this).parent().parent().remove();del_upload_info('+obj.upload_id+')">删除</span>'+
                                        '</span>'+
                                    '</li>'
                                );
                                $("#upload1").css("display","block");
                                $("#upload2").css("display","none");                        
                            }
                            else if(0==obj.status){
                                $aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
                            }
                        }
                    });
                }else{
                   
                }
            });
        } else{
            api.alert({msg:err.msg});
        }
    });
} 
////选择上传图片
function openpicture(id){
    var obj = api.require('UIMediaScanner');
    obj.open({
        type:"all",
        column: 4,
        classify: true,
        max: 6,
        sort: {
            key: 'time',
            order: 'desc'
        },
        texts: {
            stateText: '已选择*项',
            cancelText: '取消',
            finishText: '完成'
        },
        styles: {
            bg: '#fff',
            mark: {
                icon: '',
                position: 'top_right',
                size: 20
            },
            nav: {
                bg: '#000',
                stateColor: '#fff',
                stateSize: 18,
                cancelBg: 'rgba(0,0,0,0)',
                cancelColor: '#fff',
                cancelSize: 18,
                finishBg: 'rgba(0,0,0,0)',
                finishColor: '#fff',
                finishSize: 18
            }
        }
    }, function(ret){
        if(ret){
            //支持多文件上传的方法
            for(i=0;i<ret.list.length;i++){
                var file_name=ret.list[i].thumbPath;//获取路径方法
                var url = localStorage.url+"Api/Upload/file_upload";
                api.ajax({
                    url:url,
                    method: 'post',
                    timeout: 100,
                    report: true,
                    data: {//传输参数
                        values: { 
                        },
                        files: {file:ret.list[i].thumbPath}
                    }
                },function(ret,err){
                    if(ret){
                        obj = ret.body;
                        api.showProgress({
                            style: 'default',
                            animationType: 'fade',
                            title: '文件上传进度',
                            text: ret.progress+"%",
                            modal: false
                        });
                        if(ret.progress == 100)api.hideProgress();//隐藏进度提示框
                        if(1==obj.status){
                            var path=file_name.split("/");
                            file_name=path[path.length-1];
                            var img=upold_img(file_name);
                            if(file_name.length>10){
                                file_name=file_name.substring(file_name.length-10,file_name.length);
                            }
                            //id为显示的容器
                            $("#"+id).append(
                                '<li class="aui-list-view-cell">'+
                                    img+
                                    '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
                                        +file_name+
                                        '<input name="file_no" type="hidden" value="'+obj.upload_id+'" />'+
                                        '<span class="aui-pull-right aui-text-danger mt2" onclick="javascript:$(this).parent().parent().remove();del_upload_info('+obj.upload_id+')">删除</span>'+
                                    '</span>'+
                                '</li>'
                            );
                            $("#upload1").css("display","block");
                            $("#upload2").css("display","none");                                        
                        }
                        else if(0==obj.status){
                            $aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
                        }
                    }
                });
            }
         }
    });
}

//返回
function goBack(){
    api.closeWin({});
}