apiready = function(){
	//客户版刷新页面
	if(api.pageParam.cust=='cust'){
		hide_add();
	}
   if(api.pageParam.edit_type=="edit"){
        get_bug_info();//加载bug详情
        $("#upload1").show();
        $("#upload2").hide();
   }else{
		api.loadSecureValue({
		    key:'model'
		}, function(ret, err){
		    if(ret.value == "index"){//p5产品
				get_project_id()
		    }else if(ret.value == "index-bug"){//bug管理产品
		    	get_project_cust_id()//客户版
		    }
		});

   }
    get_error_level_list();//加载取得错误等级名称，value值
    get_urgency_level_list();//加载取得紧急程度名称，value值
    get_bug_os_list()//加载取得操作系统名称，value值
}

var project_arr=[];//项目名称，id
//加载取得项目名称，项目id
function get_project_id(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Pms/get_project_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
            	"pagesize":9999,
            	"add_staff":localStorage.user_id,//当前登陆人编号
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                for(var i=0;i<ret.cust_list.length;i++){
                    project_arr[i]={"value":ret.cust_list[i].project_no,"text":ret.cust_list[i].project_name};
                }
                open_project_list()//滑动打开项目列表，选择项目
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}
//加载取得项目名称，项目id
function get_project_cust_id(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Pms/get_project_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
            	"pagesize":9999,
            	"cust_no":localStorage.user_id,//当前登陆人编号
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                for(var i=0;i<ret.cust_list.length;i++){
                    project_arr[i]={"value":ret.cust_list[i].project_no,"text":ret.cust_list[i].project_name};
                }
                open_project_list()//滑动打开项目列表，选择项目
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}
//滑动打开项目列表，选择项目
function open_project_list(){
    (function($, doc) {
    //mui滑动选择
    $.init();
        $.ready(function() {
            //客户
            var userPicker = new $.PopPicker();
            userPicker.setData(project_arr);
            var showUserPickerButton = doc.getElementById('project');
            showUserPickerButton.addEventListener('tap', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = items[0].text;
                    jQuery("#project_id").val(items[0].value);   
                    jQuery("#module,#module_id,#assign,#assign_id").val(''); 
                    jQuery('#module').attr('placeholder','请选择模块');  
                    jQuery('#module').removeAttr('disabled');                 
                    get_module_list();//加载模块信息
                    get_receiver_list();//加载解决人信息  
                });
            }, false);
        });
    })(mui, document);  
}

var module_arr=[];//模块名称,id
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
               "project_no":$("#project_id").val(),//当前项目id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                module_arr=ret.module_list;
                $("#module").click(function(){
                	openMulti($("#module"),module_arr,'单选');
                });
//              open_module_list()//滑动选择模块
            }else{
                $('#module,#module_id').val('');
                $('#module').attr('disabled','true');
                $('#module').attr('placeholder','未查到相关模块');
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//滑动打开模块列表
//function open_module_list(){
//  (function($, doc) {
//  //mui滑动选择
//  $.init();
//      $.ready(function() {
//          //客户
//          var userPicker = new $.PopPicker({
//              layer: 3
//          });
//          userPicker.setData(module_arr);
//          var showUserPickerButton = doc.getElementById('module');
//          jQuery("#module").unbind("click");
//          jQuery("#module").on('click', function(event) {
//              userPicker.show(function(items) {
//                  showUserPickerButton.value = (items[0].text==undefined?"":items[0].text)+(items[1].text==undefined?"":"->"+items[1].text)+(items[2].text==undefined?"":"->"+items[2].text);
//                  willdo_operdate = (items[2].value!=undefined?items[2].value:items[1].value!=undefined?items[1].value:items[0].value);
//                  jQuery("#module_id").val(willdo_operdate);                   
//              });
//          });
//      });
//  })(mui, document); 
//  module_arr=[] 
//}


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
                "project_no":$("#project_id").val(),//当前项目id
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
            jQuery("#assign").unbind("click");
            jQuery("#assign").on('click', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = items[0].text;
                    jQuery("#assign_id").val(items[0].value);                                    
                });
            });
        });
    })(mui, document);
}

var error_level_arr=[];//错误等级名称，value值
//加载取得错误等级名称，value值
function get_error_level_list(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Bd/get_code_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "code_group":'error_level_code',//错误等级
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                for(var i=0;i<ret.list.length;i++){
                    error_level_arr[i]={"value":ret.list[i].value,"text":ret.list[i].text};
                }
                open_error_level_list()//滑动打开错误等级列表
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//滑动打开错误等级列表
function open_error_level_list(){
    (function($, doc) {
    //mui滑动选择
    $.init();
        $.ready(function() {
            //客户
            var userPicker = new $.PopPicker();
            userPicker.setData(error_level_arr);
            var showUserPickerButton = doc.getElementById('error_leve');
            jQuery("#error_leve").unbind("click");
            jQuery("#error_leve").on('click', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = items[0].text;
                    jQuery("#error_leve_id").val(items[0].value);                                    
                });
            });
        });
    })(mui, document);
}

var urgency_level_arr=[];//紧急程度名称，value值
//加载取得紧急程度名称，value值
function get_urgency_level_list(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Bd/get_code_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "code_group":'urgency_level_code',//紧急程度
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                for(var i=0;i<ret.list.length;i++){
                    urgency_level_arr[i]={"value":ret.list[i].value,"text":ret.list[i].text};
                }
                open_urgency_level_list()//滑动打开紧急程度列表
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//滑动打开紧急程度列表
function open_urgency_level_list(){
    (function($, doc) {
    //mui滑动选择
    $.init();
        $.ready(function() {
            //客户
            var userPicker = new $.PopPicker();
            userPicker.setData(urgency_level_arr);
            var showUserPickerButton = doc.getElementById('urgency');
            jQuery("#urgency").unbind("click");
            jQuery("#urgency").on('click', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = items[0].text;
                    jQuery("#urgency_id").val(items[0].value);                                    
                });
            });
        });
    })(mui, document);
}

var bug_os_arr=[];//操作系统名称，value值
//加载取得操作系统名称，value值
function get_bug_os_list(){
    showProgress();//加载等待
    var url = localStorage.url+"Api/Bd/get_code_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "code_group":'bug_os',//操作系统
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status==1){
                for(var i=0;i<ret.list.length;i++){
                    bug_os_arr[i]={"value":ret.list[i].value,"text":ret.list[i].text};
                }
                open_bug_os_list()//滑动打开操作系统列表
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}

//滑动打开操作系统列表
function open_bug_os_list(){
    (function($, doc) {
    //mui滑动选择
    $.init();
        $.ready(function() {
            //客户
            var userPicker = new $.PopPicker();
            userPicker.setData(bug_os_arr);
            var showUserPickerButton = doc.getElementById('os');
            jQuery("#os").unbind("click");
            jQuery("#os").on('click', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.value = items[0].text;
                    jQuery("#os_id").val(items[0].value);                                    
                });
            });
        });
    })(mui, document);
}

var status;//bug状态值
var type_no;//bug类型值
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
                $("#title").val(ret.bug_title);//标题
                $("#project").val(ret.project_name);//项目名称
                $("#project_id").val(ret.project_no);//项目id
                $("#module").val(ret.module_name);//所属模块名称
                $("#module_id").val(ret.module_no);//所属模块id
                $("#"+ret.type_no).attr("checked","checked");//bug类型（返回值和对应的状态id值相同）
                $("#content").val(removeHTMLTag(ret.bug_operflow));//bug详情内容
                $("#assign").val(ret.bug_receiver_name);//解决人
                $("#assign_id").val(ret.bug_receiver_no);//解决人编号
                $("#error_leve").val(ret.bug_error_level_name);//错误等级
                $("#error_leve_id").val(ret.bug_error_level_no);//错误等级编号
                $("#urgency").val(ret.bug_urgency_name);//紧急程度
                $("#urgency_id").val(ret.bug_urgency_no);//紧急程度编号
                $("#os").val(ret.bug_os_name);//操作系统
                $("#os_id").val(ret.bug_os);//操作系统编号
                $("#browser").val(ret.bug_browser);//浏览器
                status=ret.status_no;//bug状态值
                type_no=ret.type_no;//bug类型值
                project_arr[i]={"value":ret.project_no,"text":ret.project_name};//项目id,项目简称
                get_module_list();//加载模块信息
                get_receiver_list();//加载解决人信息   
                //当附件长度为0时隐藏附件容器
                if(ret.upload_list.length>0){
                    $("#info_upload").show()
                    $("#upload_length").html(ret.upload_list.length);
                    //加载附件列表
                    for(var i = 0;i<ret.upload_list.length; i++){
                        if(ret.upload_list[i].upload_path!=null){
                            var img=upold_img(ret.upload_list[i].upload_path);
                            file_url=localStorage.url+ret.upload_list[i].upload_path;
                            $("#add_upload_list").append(
                                '<li class="aui-list-view-cell">'+
                                     img+
                                    '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
                                    +ret.upload_list[i].upload_path.substring(ret.upload_list[i].upload_path.length-20,ret.upload_list[i].upload_path.length)+
                                        '<input name="file_no" type="hidden" value="'+ret.upload_list[i].upload_no+'" />'+             
                                        '<span class="aui-pull-right aui-text-danger mt2" onclick="javascript:$(this).parent().parent().remove();del_upload_info('+ret.upload_list[i].upload_id+')">删除</span>'+
                                    '</span>'+
                                '</li>'
                            );
                        }
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


//保存bug
function save_project_bug_info(){
    var file_no = "";
    $("input[name='file_no']").each(function(){
        file_no += $(this).val()+",";
    })
    if(file_no!=""){
        file_no=file_no.substring(0,file_no.length-1);
    }
//  alert(file_no)
    if($("#project_id").val() == ""||$("#module_id").val()==""||$("#title").val()==""||$("#content").val()==""||$("#assign_id").val()==""||$("#error_leve_id").val()==""||$("#urgency_id").val()==""||$("#os_id").val()==""){
        $aui.alert({
            title:'提示',
            content:'请填写必填数据',
            buttons:['确定']
        },function(ret){
             releaseClick();
            return;
        });
    }else{
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
                    "bug_no":api.pageParam.id,//bug编号
                    "bug_type":$("input[name='demo']:checked").val(),//bug类型编号
                    "bug_title":$("#title").val(),//bug标题
                    "bug_operflow":$("#content").val(),//bug详情内容
                    "bug_attachment":file_no,//附件id
                    "bug_receiver":$("#assign_id").val(),//解决人编号
                    "bug_error_level":$("#error_leve_id").val(),//错误等级
                    "bug_urgency":$("#urgency_id").val(),//紧急程度
                    "bug_os":$("#os_id").val(),//操作系统
                    "bug_browser":$("#browser").val()//浏览器
                }
            }   
        },function(ret,err){
            if(ret){
                if(ret.status == 1){
                    if(api.pageParam.edit_type=="edit"){
                        if(status==41){//当状态值为41退回发起人状态时，保存修改的同时需要更改状态值为 待接收11
                            set_bug_wait_receive();
                        }
                        api.execScript({
                            name:"bug_infoHeader",
                            frameName:"bug_info",
                            script: 'exec();'
                        }); 
                    }else{
                        api.execScript({
                            name:"bug_listHeader",
                            frameName:"bug_list",
                            script: 'exec();'
                        }); 
                    }
                    $aui.alert({
                        title:'提示',
                        content:'保存成功',
                        buttons:['确定']},
                        function(ret){});
                        $("#save_btn").attr("disabled",true);     
                        //根据配置进行切换程序模型
						api.loadSecureValue({
						    key:'model'
						}, function(ret, err){
						    if(ret.value == "index"){//p5产品
								api.closeWin({});
						    }else if(ret.value == "index-bug"){//bug管理产品
						    	exec();	
						    }
						});            
                }else{
                    $aui.alert({
                        title:'提示',
                        content:ret.msg,
                        buttons:['确定']
                    },function(ret){});
                    releaseClick();//释放保存按钮
                }
                api.hideProgress();//隐藏进度提示框
            }else{
                releaseClick();//释放保存按钮
                api.hideProgress();//隐藏进度提示框
                /**无网络提示 */
                api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
            }
        })
    }   
}

//在退回发起人状态下，保存修改的同时，更改状态为待接收11
function set_bug_wait_receive(){
    //showProgress();//加载等待
    var url = localStorage.url+"Api/Pms/set_project_bug_status";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "status":11,//更改的状态
                "bug_no":api.pageParam.id,//BUG编号
                "add_staff":localStorage.user_id,//操作人编号
                "bug_type":type_no,//bug类型编号
            }
        }   
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'提交成功',
                    buttons:['确定']},
                    function(ret){});
            }else{
                $aui.alert({
                    title:'提示',
                    content:ret.msg,
                    buttons:['确定']
                },function(ret){});
            }
            api.hideProgress();//隐藏进度提示框
        }else{
            api.hideProgress();//隐藏进度提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    })
}

//释放btn事件
function releaseClick(){
    $("#save_btn").attr("disabled",false);
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
//客户版隐藏保存按钮
function hide_add(){
	$('#hide_add').hide();
}
function exec(){
	location.reload();
	
}