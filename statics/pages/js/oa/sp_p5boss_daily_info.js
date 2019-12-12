var file_url;
var lon;//经度
var lat;//纬度
var map_address;//地图地址
var approval_id;//审批人id
var address;//地址
var task_length=0;
var plan_length=0;
var bportrait="";
var add_staff=""
//页面刷新
function rel(){
	location.reload();
}

//页面加载方法
apiready = function(){
	if(api.pageParam.type=="info"){
//			添加附件隐藏
//		$("#info_upload").show();
		$("#info_address_list").show();
//			文本框不可编辑
		$("textarea,input,#sum_type").attr("onfocus","this.blur()");
		$("#audit_person").attr("onclick",false);//禁止选择人的onclick事件
		$("#audit_person").hide();//隐藏审核人
		$("#type").hide();
		$("#remarks").hide();
		$("#Work_plan_info").addClass("aui-timeline");
		$("#add_upload").hide();
		$("#worklog_type").show();			
		get_daily_info();//获取详情信息
		
	}else{
		getLocation();//取得定位
		getperson();//获取上级
		//添加页面显示右侧箭头
		$(".arrow-right").addClass("aui-arrow-right");
		$(".arrow-right span").addClass("mr-15");
		$("#title_content").removeClass("aui-flex-item-8").addClass("aui-flex-item-12");
		$("#worklog_title").val(localStorage.user_name+new Date().format('yyyy-MM-dd')+"的总结")
		$("#add_upload").show();
		$("#text_summary").show();//显示总结文本域
		$("#remarks,#remarks_header").show();//显示备注文本域
		$("#add_address_list").show();
		$("#upload2").css("display","block");
        $("#upload1").css("display","none");	
        $("#btn_content").attr("onclick","save_worklog_info()");
        $("#btn_content").show();
        $("#btn_content").html(
	        '<div class="aui-flex-item-12 btn_div">'+
				'<div class="aui-btn aui-btn-info w-all bor-ra-0"><span class="iconfont fcolor-white fsize-20">&#xe6d5;</span>保存</div>'+
			'</div>'
		)
		get_workplan_list(localStorage.user_id);
		get_backlog_list(localStorage.user_id);
		$("#conter").show();
		$("#date").html(new Date().format('yyyy-MM-dd hh:mm:ss'));
	}
}
//获取当天工作计划
function get_workplan_list(id){
	//ajax获取数据处理
    var url = localStorage.url+"Api/Oa/get_workplan_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "executor_staff":id,//执行人
                "status":"11,21",//状态
                "page":1,
                "pagesize":999999999
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1&&ret.list!=null){
                for(var i = 0; i < ret.list.length; i++){
        			var workplan_expectstart_time=new Date(ret.list[i].workplan_expectstart_time!=null?ret.list[i].workplan_expectstart_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');
					var workplan_start_time=new Date(ret.list[i].workplan_start_time!=null?ret.list[i].workplan_start_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');
					var workplan_expectend_time=new Date(ret.list[i].workplan_expectend_time!=null?ret.list[i].workplan_expectend_time.replace(/-/g,"/"):"").format('yyyy-MM-dd');
					$("#plan_list").append(
    					'<li class="mb-0" onclick="openOaWin(\'work_infoHeader\',\'\','+ret.list[i].workplan_id+',\'work\','+id+')">'+
                            '<i class="iconfont fsize-14 ml5 '+(ret.list[i].status==11?"fcolor-red1":(ret.list[i].status==21||ret.list[i].status==31||ret.list[i].status==32?"fcolor-blue1":"fcolor-red4"))+'">&#xe670;</i>'+
                            '<div id="wilk">'+                                 
                                '<h3 class="aui-timeline-header p-0 fsize-14 '+(ret.list[i].status==11?"fcolor-red3":ret.list[i].status==21||ret.list[i].status==31||ret.list[i].status==32?"fcolor-blue1":"fcolor-red1")+'">'+
                                    '<span>'+(ret.list[i].status==11?workplan_expectstart_time+"<em>(预计)</em>":workplan_start_time)+'--</span>'+
                                    '<span>'+workplan_expectend_time+"<em>(预计)</em>"+
                                '</h3>'+  
                                '<div class="aui-timeline-body p-li aui-border-b mb-5 mt-8">'+
                                    '<i class="iconfont fsize-12 p-0 aui-pull-left lh-19 mr-5 '+(ret.list[i].status==11?"fcolor-red1":"fcolor-blue1")+'">&#xe6e2;</i>'+
                                    '<p class="di-i mb-5">'+
                                        '<span class="di-ib ellipsis-one lh-14 w-50b">'
                                            +ret.list[i].workplan_title+
                                        '</span>'+
                                        '<span class="fsize-12 fcolor-gray1 aui-pull-right lh-22 text-r">指派人:<em>'+ret.list[i].executor_name+'</em></span>'+
                                    '</p>'+
                                '</div>'+                                   
                            '</div>'+
                        '</li>'
					)
					plan_length++
                }
                if(plan_length>0){
                   $("#plan_length").show().html(plan_length);
                } 
            }else{
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}
//获取必做任务列表
function get_backlog_list(id){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Bd/get_backlog_list";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":id,
            }
        }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.list.length;i++){
					//去除字符串中的p标签
					if(ret.list[i].willdo_content==null){
						ret.list[i].willdo_content=""
					}
    				ret.list[i].willdo_content=removeHTMLTag(ret.list[i].willdo_content);
					$('#task_list').append(
    					'<li class="mb-0 mt-10">'+
			            '<div class="aui-time-label '+(ret.list[i].status==0?"aui-bg-danger":"aui-bg-info")+' ml--15"></div>'+
				            '<div class="aui-timeline-item">'+
				                '<span class="aui-timeline-time pl-10 fsize-14 '+(ret.list[i].status==0?"aui-text-danger":"aui-text-info")+' lh-1">'+
				                (ret.list[i].willdo_start_time==null?'':ret.list[i].willdo_start_time)+'-'+(ret.list[i].willdo_end_time==null?'':ret.list[i].willdo_end_time)+
				                '</span>'+
				                '<div class="aui-timeline-body pt-24 color-w pb-0">'+
				                	'<div class="aui-border-b">'+
					                	'<div class="pb-5" onclick="openOaWin(\'task_infoHeader\','+ret.list[i].id+',\'\',\'info\','+id+')">'+
					                		'<i class="iconfont '+(ret.list[i].status==0?"aui-text-danger":"aui-text-info")+' p-0 fsize-14">&#xe6d9;</i>'+
									    	'<span class="ml-5">'+ret.list[i].title+'['+ret.list[i].willdo_cyda+']</span>'+
					                	'</div>'+
				                	'</div>'+
				                '</div>'+
				            '</div>'+
				        '</li>'
			        )
			        task_length++
    				api.hideProgress();//隐藏进度提示框
    			}
    			if(task_length>0){
    				$("#task_length").show().html(task_length);
    			}
			}
			else{
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//获取上级
function getperson(){
	var url = localStorage.url+"Api/Hr/get_staff_up";
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
            	$("#person").val(ret.list.staff_name);
            	$("#person_id").val(ret.list.staff_no);
            }else{
            	$("#person").val("无上级，请选择")
            }
        }else{
            /**无网络提示 */
            api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
        }
    });
}
//获取指派人名字
function get_user_info(id,arranger_man_id){
    //ajax获取数据处理
    var url = localStorage.url+"Api/Public/get_user_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                "staff_no":arranger_man_id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){  
                $("#"+id).html(ret.staff_name)             
            }
        }else{
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


//保存总结
function save_worklog_info(){
	//showProgress();//加载等待
	var file_no = "";
	$("input[name='file_no']").each(function(){
		file_no += $(this).val()+",";
	})
	if(file_no!=""){
		file_no=file_no.substring(0,file_no.length-1);
	}
	if($("#sum_type").val() == ""||$("#worklog_title").val()==""||$("#person").val()==""){
		$aui.alert({
	        title:'提示',
	        content:'请填写必填数据',
	        buttons:['确定']
	    },function(ret){
	    	 api.execScript({
				name:api.winName,
		        script: 'releaseClick();'
		    });
		    return;
	    });
	}else{
		var url = localStorage.url+"Api/Oa/save_worklog_info";
        var worklog_summary=$('#worklog_summary').val()
        var memo=$("#memo").val()
        if(api.pageParam.id!=null){
        	worklog_summary=$("#text_summary").html();
        	memo=$("#memo_info").html();
        }
		api.ajax({
			url:url,
		    method: 'post',
		    timeout: 100,
		    data: {//传输参数
		    	values: { 
		    		"worklog_id":api.pageParam.id,//当id存在是为修改功能
		    		"worklog_staff":localStorage.user_id,
		            "worklog_title":$("#worklog_title").val(),
		            "worklog_type":$("#type_id").val(),	
		            "worklog_summary":worklog_summary,
		            "address":lon+","+lat,
		            "worklog_attach":file_no,
		            "worklog_audit_man":$("#person_id").val(),
		            "memo":memo
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
								    name: 'daily_listHeader',
								    url: 'header/daily_listHeader.html',
								});
								api.closeWin({});
								localStorage.openList=false;
							}
						else{
	    					api.execScript({
			    				name:"daily_listHeader",
			    				frameName:"daily_list",
				                script: 'exec();'
			                });	                
	                       api.closeWin({});
	                      }
	    			});
				}else{
					$aui.alert({
				        title:'提示',
				        content:ret.msg,
				        buttons:['确定']
				    },function(ret){});
				    api.execScript({
						name:api.winName,
				        script: 'releaseClick();'
				    })
				}
				api.hideProgress();//隐藏进度提示框
	    	}else{
	    		api.execScript({
					name:api.winName,
			        script: 'releaseClick();'
			    });
	    		api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	}
		})
	}	
}

//获得详情信息
function get_daily_info(){
	showProgress();//加载等待
	var url = localStorage.url+"Api/Oa/get_worklog_info";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"worklog_id":api.pageParam.id,
	        }
	    }	
	},function(ret,err){
		if(ret){
    		if(ret.status == 1){
    			var bportrait=get_head(ret.staff_avatar,ret.staff_name);
    			add_staff=ret.add_staff;
    			get_workplan_list(ret.add_staff);
				get_backlog_list(ret.add_staff);
            	$("#title_content").before(bportrait);
    			$("#worklog_title").val(ret.worklog_title);//标题
      			$("#date").html(new Date(ret.worklog_date!=null?ret.worklog_date.replace(/-/g,"/"):"").format('yyyy-MM-dd'));//时间
				$("#worklog_type").html(ret.worklog_type);//总结类型
				$("#type_id").val(ret.type_id);//总结类型id
				$("#sum_type").val(ret.worklog_type)//总结类型
				
				if(ret.worklog_summary==null){
					ret.worklog_summary="";
				}
				$("#remarks_info").show();
				$("#text_summary").html((ret.worklog_summary!=null?removeHTMLTag(ret.worklog_summary):""));
				$("#memo_info").html((ret.memo!=null?removeHTMLTag(ret.memo):""));
				if(ret.add_staff == localStorage.user_id && ret.worklog_status == 0 && ret.worklog_date == new Date().format("yyyy-MM-dd")){
//                  $("#text_summary").show();//当天的未审核的日志内容文本域显示                                       
//                  $("#worklog_summary").val(removeHTMLTag(ret.worklog_summary));//当天的未审核的日报内容可编辑，内容添加到文本域中                    
//                  if(ret.memo!=""){
//                      $("#remarks,#remarks_header").show();//当天的未审核的日志备忘录文本域显示
//                      $("#memo").val(ret.memo)//当天的未审核的日报备注可编辑，内容添加到文本域中
//                  } 
					$("#text_summary").attr("contenteditable",true);
					$("#memo_info").attr("contenteditable",true)
                }
                else{
                	$("#text_summary").addClass("fcolor-99")
                	$("#memo_info").addClass("fcolor-99")
//                  $("#text_summary_info").show();//已审核的日志内容div显示                    
//                  $("#worklog_summary_info").html(removeHTMLTag(ret.worklog_summary));//不是当天的已审核的日报内容不可编辑，内容添加到div中                    
//                  if(ret.memo!=""){
//                      $("#remarks_info").show();//已审核的日志备忘录div显示
//                      $("#memo_info").html(ret.memo);//不是当天的已审核的日报备注不可编辑，内容添加到div中
//                  } 
                }				
				if(ret.address == null){
				    $("#info_address_list").addClass("di-n");
				}else{
					$("#info_address_list").show();
				}			
				if(ret.address != null){
					var str = ret.address.split(",");
					lon = str[0];
					lat = str[1];
					getNameFromCoords();
					$("#info_address_list").attr("onclick","openBdWin('mapHeader')");
				}else{
					$("#info_address").html("该小伙伴没有定位");//地址
				}
				$("#person").val(ret.audit_man);
				$("#person_id").val(ret.worklog_audit_man);
				//当附件长度为0时隐藏附件容器
				if(ret.file_list.length > 0){
                    $("#info_upload").show()
				    $("#upload_length").html(ret.file_list.length);
                }
				for(var i = 0; i < ret.file_list.length; i++){
					var img=upold_img(ret.file_list[i].upload_path);
					file_url=localStorage.url+ret.file_list[i].upload_path;
					if($("#whole").val()==""){
				       $("#whole").val(file_url)
				    }else{
				       $("#whole").val($("#whole").val()+","+file_url)
				    }
					//判断为编辑状态
					if(ret.add_staff == localStorage.user_id && ret.worklog_status == 0 && ret.worklog_date == new Date().format("yyyy-MM-dd")){
						$("#info_upload_list").append(
					        '<li class="aui-list-view-cell">'+
                                img+
                                '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
                                    +ret.file_list[i].upload_source.substring(ret.file_list[i].upload_source.length-20,ret.file_list[i].upload_source.length)+
                                    '<input name="file_no" type="hidden" value="'+ret.file_list[i].upload_id+'" />'+
                                    '<span class="aui-pull-right aui-text-danger" onclick="javascript:$(this).parent().parent().remove();del_upload_info('+ret.file_list[i].upload_id+')">删除</span>'+
                                '</span>'+
                            '</li>'
					 	)
					}
					else{
						$("#info_upload_list").append(
					        '<li class="aui-list-view-cell" onclick="openEnqueue(\''+file_url+'\');openManagerView()">'+
                                 img+
                                '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
                                +ret.file_list[i].upload_source.substring(ret.file_list[i].upload_source.length-20,ret.file_list[i].upload_source.length)+
                                    '<input name="file_no" type="hidden" value="'+ret.file_list[i].upload_id+'" />'+             
                                '</span>'+
                            '</li>'
						);
					}
				}
				//判断是否审核
				if(ret.worklog_status == 1){//已审核状态
					getpersonaldata(ret.worklog_audit_man);
					$("#audit_div").show();					
					$("#worklog_audit_time").html(new Date(ret.worklog_audit_time!=null?ret.worklog_audit_time.replace(/-/g,"/"):"").format('yyyy-MM-dd hh:mm'));
					$("#worklog_audit_content").html(ret.worklog_audit_content);					
					$("#audit_person").attr("onclick",false);
				}
				//未审核并且时间为当天的日志可以编辑
				if(ret.add_staff == localStorage.user_id && ret.worklog_status == 0 && ret.worklog_date == new Date().format("yyyy-MM-dd")){
					//文本框可编辑
					$("textarea,input,#sum_type").attr("disabled",false);					
					$("#audit_person").attr("onclick","openSlidLayout('person','daily_infoHeader','daily_info','','接待')");//修改状态可以选择审核人/利用接待逻辑进行单选操作
					$("#btn_content").attr("onclick","save_worklog_info()").show().find("font").html("修改");
				}else{
				    $("textarea,input[name=message],#sum_type").removeClass("fcolor-33").addClass("fcolor-99");
				}
				//判断是否有审核功能
				if(api.pageParam.tab == "tab5" && ret.worklog_status != 1){
					$("#btn_content").show();
				}
			}else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){})
			}
			api.hideProgress();//隐藏进度提示框
			$("#conter").show();
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		//无网络提示 
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
	})
}

//获取审批人名字
function getpersonaldata(approval_id){
    //showProgress();//加载等待
    //ajax获取数据处理
    var url = localStorage.url+"Api/Public/get_user_info";
    api.ajax({
        url:url,
        method: 'post',
        timeout: 100,
        data: {//传输参数
            values: { 
                staff_no:approval_id
            }
        }
    },function(ret,err){
        if(ret){
            if(ret.status == 1){
                $("#worklog_audit_man").html(ret.staff_name);
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

(function($, doc) {
	//		mui滑动选择
	$.init();
	$.ready(function() {
		//普通示例
		var userPicker = new $.PopPicker();
		userPicker.setData([{
			value: '01',
			text: '日报'
		}, {
			value: '02',
			text: '周报'
		}, {
			value: '03',
			text: '月报'
		}, {
			value: '04',
			text: '会议'
		}]);
		var showUserPickerButton = doc.getElementById('sum_type');
		showUserPickerButton.addEventListener('tap', function(event) {
			userPicker.show(function(items) {
				showUserPickerButton.value = items[0].text;
				jQuery("#type_id").val(items[0].value);
			});
		}, false);
	});
})(mui, document);


/***
 *百度定位 
 */
function getLocation(){
	var bMap = api.require('bMap');
	bMap.getLocation({
	    accuracy: '100m',
	    autoStop: true,
	    filter: 1
	}, function(ret, err){
	    if(ret.status){
	    	lon = ret.lon;//获取经度
	        lat = ret.lat;//获取纬度
	        getNameFromCoords();
	        $("#add_address_list").attr("onclick","openBdWin('mapHeader')");
	    }
	});
}

//切换下拉及加载数据
function dropDownSwitch(obj){
    if($(obj).attr("id") == "info_upload_fold"){
        list_id = "info_upload_list";
    }else if($(obj).attr("id") == "task"){
        list_id = "task_list";
    }else if($(obj).attr("id") == "plan"){
        list_id = "plan_list";
    }else if($(obj).attr("id") == "modular"){
        list_id = "modular_list";
    }else if($(obj).attr("id") == "bug"){
    	list_id = "bug_list";
    }   
    if($(obj).attr("id") == "task"){
        list_id = "task_list";
    }else if($(obj).attr("id") == "plan"){
        list_id = "plan_list";
    }else if($(obj).attr("id") == "modular"){
        list_id = "modular_list";
    }else if($(obj).attr("id") == "bug"){
        list_id = "bug_list";
    } 
    //切换当前分类显示与隐藏
	$(obj).addClass("aui-fold-active");
    $(obj).find(".aui-pull-right").html("&#xe6fe;");
    $(obj).siblings("li").removeClass("aui-fold-active");
    $(obj).siblings("li").find(".aui-pull-right").html("&#xe61b;");    
    $("#"+list_id).parents(".aui-fold-content").siblings(".aui-fold-content").slideUp();//关闭非当前行分类
    $("#"+list_id).parents(".aui-fold-content").slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).removeClass("aui-fold-active");
            $(obj).find(".aui-pull-right").html("&#xe61b;");
        }
    });
}

/**
 *根据经纬度获取位置详细信息 
 */
function getNameFromCoords(){
	var map = api.require('bMap');
	map.getNameFromCoords({
	    lon: lon,
	    lat: lat
	},function(ret,err){
	    if(ret.status){
	        $("#add_address,#info_address").html(ret.address);
	        map_address=ret.address;
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
//打开新页面
function openNewWin(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":"日志审核",
	    	"id":api.pageParam.id
	    }
    });
}

function openOaWin(winName,id,workplan_id,type,type_id){
	var stast=true;
	if(add_staff===localStorage.user_id){
		stast=false
	}
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"id":id,
	    	"workplan_id":workplan_id,
	    	"type":type,//用来区分我的安排
	    	"type_id":type_id,
	    	"stast":stast
	    }
    });
}

//打开bd模块
function openBdWin(winName){
	api.openWin({
	    name: winName,
	    url: '../bd/header/'+winName+'.html',
	    pageParam:{
	    	"lat":lat,
	    	"lon":lon,
	    	"address":map_address
	    }
    });
}