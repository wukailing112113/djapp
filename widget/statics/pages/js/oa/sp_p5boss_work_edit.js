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

//页面加载方法
apiready = function(){
    if(api.pageParam.type=="work"){
        //选择人默认为自己
        getpersonaldata()
        $("#person_id").val(localStorage.user_id);
    }      
}

//获取个人资料数据
function getpersonaldata(){
    //showProgress();//加载等待
    //ajax获取数据处理
    var url = localStorage.url+"Api/Public/get_user_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                staff_no:localStorage.user_id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $("#person").val(ret.staff_name);
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
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    }); 
}


//联系人选择后赋值
function evaluate(type_id,staff_name,staff_no){
    $("#"+type_id).val(staff_no);
    $("#person").val(staff_name);
    $("#person_id").val(staff_no);
}

//保存工作计划
function save_workplan_info(){
	var workplan_arranger_man="";
	var file_no="";
	var title = $("#title").val();
	var content = $("#content").val();
	var end_date = $("#end_time").val();
	var start_date = $("#start_time").val();
	var bei_content = $("#bei_content").val();
	var workplan_arranger_man = $("#person_id").val();
	$("input[name='file_no']").each(function(){
		file_no += $(this).val()+",";
	})
	if(file_no != ""){
		file_no = file_no.substring(0,file_no.length-1);
	}
	//判断必填
	if(title == "" || content=="" || end_date == ""||$("#person").val()==""){		    
        $aui.alert({
            title:'提示',
            content:'请填写必填数据',
            buttons:['确定']
        },function(ret){
             releaseClick();
             return;
        });
	}
     //获取数据
    //ajax获取数据处理
    var url = localStorage.url+"Api/Oa/save_workplan_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: {
                "staff_no":localStorage.user_id,
                "workplan_title":title,
                "workplan_content":content,
                "workplan_expectstart_time":start_date,
                "workplan_expectend_time":end_date,
                "workplan_executor_man":workplan_arranger_man,
                "file_id":file_no,
                "memo":bei_content
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $aui.alert({
                    title:'提示',
                    content:'保存成功',
                    buttons:['确定']},
                    function(ret){
                        //localStorage.openList等于true代表快捷键发布，然后打开列表页
                        if(localStorage.openList=="true"){
                            //打开新页面
                            api.openWin({
                                name: 'work_listHeader',
                                url: 'header/work_listHeader.html',
                            });
                            api.closeWin({});
                            localStorage.openList=false;
                        }
                    else{
                       $aui.alert({
                            title:'提示',
                            content:ret.msg,
                            buttons:['确定']
                        },function(ret){});
                        //返回刷新列表
                            if(api.pageParam.type=="work"){
                                api.execScript({
                                    name:"work_listHeader",
                                    frameName:"work_list",
                                    script: 'exec();'
                                });
                            }else{
                                api.execScript({
                                    name:"arrange_work_listHeader",
                                    frameName:"arrange_work_list",
                                    script: 'exec();'
                                });
                            }
                            
                            api.closeWin({});
                        }                   
                });                    
                //localStorage.openList为true代表知识库进入，要打开列表页
            }else{               
                $aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
                releaseClick();
            }
            api.hideProgress();//隐藏提示框
        }else{
            releaseClick();
            api.hideProgress();//隐藏提示框
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });		
}

//上传附件选择
function open_uploud(){
    //选着上传类型
    api.actionSheet({
        buttons: ['拍照','上传图片视频','上传文件']
    },function( ret, err ){
        if(ret.buttonIndex == 1){
            camera('add_upload_list');//拍照方法
        }
        else if(ret.buttonIndex == 2){
            openpicture('add_upload_list');//调取视频图片方法
        }
         else if(ret.buttonIndex == 3){
            openUploud('add_upload_list')
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
                            if(1==ret.status){
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
                            if(api.systemType == "ios"){
                            }
                            else if(0==ret.status){
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
                        if(1==ret.status){
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
                        if(api.systemType == "ios"){}
                        else if(0==ret.status){
                            $aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
                        }
                    }
                });
            }
         }
    });
}       

//释放btn事件
function releaseClick(){
    $("#btn_id").attr("disabled",false);
}

//刷新页面
function exec(){
 	location.reload();
}