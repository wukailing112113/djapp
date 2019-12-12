//刷新本页面
function rel(){
	location.reload();
}
apiready = function () {
	get_user_info();//获取个人资料
	//判断是否详情页面或添加页面
	if(api.pageParam.type == "info"){
		get_approval_info();//获取工作详情
		get_approval_log();//获取审核意见列表
		$("#view_man").hide();
		$("input").attr("onfocus","this.blur()");
		$("textarea").attr("onfocus","this.blur()")
		$("#reception_time").attr("disabled",true);
		$(".di-n").removeClass("di-n");
		$("#btn_approval").attr("onclick","openNewWin('oa_approval_flowChart_header','info',"+api.pageParam.id+")");
		button_show();
	}
	openPullRefresh("rel()");//下拉刷新
}

//获取个人资料
function get_user_info(){
	showProgress();//加载等待
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
    			$("#name").val(ret.staff_name);
    			$("#post").val(ret.staff_post_name);
    			$("#dept").val(ret.staff_dept_name);
    			$("#date").val(new Date().format('yyyy-MM-dd hh:mm:ss'));
			}else{
				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
			}
			api.hideProgress();//隐藏提示框
    	}else{
    		api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

var node_log_id="";
var approval_no="";
var button_type=true;
//获取审批单详情
function get_approval_info(){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oaapproval/get_approval_reception_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"reception_no":api.pageParam.reception_no,//审批单no
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$("#approval_no").val(ret.reception_no);
    			$("#name").val(ret.reception_apply_staff);
    			$("#post").val(ret.staff_post);
    			$("#dept").val(ret.staff_dept);
    			$("#date").val(ret.add_time);
    			$("#title").val(ret.reception_name);
    			$("#approval_status").val("审核中");
    			if(api.pageParam.approval_status=="1"){
    				$("#approval_status").val("待审核");
    			}
    			if(api.pageParam.approval_status=="3"){
    				if(ret.reception_status==2){
    					$("#approval_status").val("未开始");
    				}
    				else{
    					$("#approval_status").val("已开始");
    				}
    			}
    			if(api.pageParam.approval_status=="4"){
    				$("#approval_status").val("已完成");
    			}
    			else if(ret.reception_status==3){
    				button_type=false;
    				button_show();
    			}
				$("#reception_dept").val(ret.reception_dept);
				$("#reception_name").val(ret.reception_name);
				$("#project_name").val(ret.reception_project_name);
				$("#project_survey").val(ret.reception_project_desc);
				$("#investigate_name").val(ret.reception_company_name);
				$("#reception_time").val(ret.update_time);
				$("#reception_address").val(ret.reception_address);
				$("#reception_project_name").val(ret.reception_real_project);
				$("#reception_process").val(ret.reception_process);
				$("#inspection_route").val(ret.reception_route);
				$("#investigation_data").val(ret.reception_data);
				$("#relationship").val(ret.reception_company_relation);
				
				node_log_id=ret.node_log_id;//节点保存常量
				approval_no=ret.reception_no//订单保存常量
				//加载来访人员
				if(ret.visitor_list.length==0){
					$("#visitor").hide();
					$('#template_list').hide();
				}
				for(var i=0;i<ret.visitor_list.length;i++){
					$("#template_list").append(
						'<div class="aui-col-xs-3 aui-text-center ellipsis-one">'+ret.visitor_list[i].visitor_role+'</div>'+
				    	'<div class="aui-col-xs-3 aui-text-center ellipsis-one">'+ret.visitor_list[i].visitor_name+'</div>'+
				    	'<div class="aui-col-xs-3 aui-text-center ellipsis-one">'+ret.visitor_list[i].visitor_post+'</div>'+
				    	'<div class="aui-col-xs-3 aui-text-center pl-0 ellipsis-one">'+ret.visitor_list[i].visitor_tel+'</div>'
				    )
				}
				//加载接待人员
				if(ret.receptionist_list.length==0){
					$("#reception").hide();
					$("#reception_list").hide();
				}
				for(var i=0;i<ret.receptionist_list.length;i++){
					 $("#reception_list").append(
				    	'<div class="aui-col-xs-4 aui-text-center ellipsis-one">'+ret.receptionist_list[i].visitor_role+'</div>'+
				    	'<div class="aui-col-xs-4 aui-text-center ellipsis-one">'+ret.receptionist_list[i].visitor_receptionist_name+'</div>'+
				    	'<div class="aui-col-xs-4 aui-text-center ellipsis-one">'+ret.receptionist_list[i].visitor_receptionist_post+'</div>'
				    )
				}
				//加载附件
				$("#upload_div").html("");
				if(ret.reception_files!=null){
					for(var i=0;i<ret.reception_files.length;i++){
						var path=ret.reception_files[i].upload_path.split("/");
						for(var bi=0;bi<path.length;bi++){
							var name=path[bi];
						}
						$("#upload_div").append(
							'<li class="aui-list-view-cell" onclick=\'openEnqueue("'+localStorage.url+ret.reception_files[i].upload_path+'")\'>'+
					    	    '<div class="aui-img-body ellipsis-one">'+
					                '<a class="aui-arrow-right lh-40 aui-text-info">'+name+''+
					                	'<em class="aui-pull-right mr-20 fsize-14 fcolor-99">'+(ret.reception_files[i].upload_size!=null?ret.reception_files[i].upload_size:0)+'kb</em>'+
					                '</a>'+
					            '</div>'+
					        '</li>'
				        )
					}
				}
				if(api.pageParam.approval_status=="3"&&localStorage.user_id!=ret.add_staff){
					$("#btn_content").html(
							'<div class="aui-flex-item-12" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
								'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
							'</div>'
				   		)
				
				}
				if(api.pageParam.approval_status=="1"&&localStorage.user_id==ret.current&&localStorage.user_id==ret.add_staff){
						$("#approval_status").val("已退回");
						$("input").attr("onfocus","");
						$("textarea").attr("onfocus","")
						$("#reception_time").attr("disabled",false);
						$("#btn_content").html(
							'<div class="aui-flex-item-6" onclick="save_oa_approval_reception()">'+
								'<div class="aui-btn aui-btn-info w-all bor-ra-0"><span class="aui-iconfont aui-icon-roundcheck"></span>提交</div>'+
							'</div>'+
							'<div class="aui-flex-item-6" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
								'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
							'</div>'
				   		)
				}
				if(localStorage.node_log=="查看"){
					localStorage.node_log="";
					$("#btn_content").html(
			   			'<div class="aui-flex-item-12" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
							'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
						'</div>'
			   		);
				}
			}
    	}else{
    		api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//获取审核意见列表
function get_approval_log(){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oaapproval/get_approval_reception_log";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"reception_no":api.pageParam.reception_no,//审批单no
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			var log_list = ret.log_list;
				$("#opinion_num").html(log_list.length);
				for(var i=0;i<log_list.length;i++){
					$("#opinion_list").append(
						'<li class="aui-user-view-cell aui-img">'+
			                '<img class="aui-img-object aui-pull-left" src="'+(log_list[i].log_staff_avatar != "" && log_list[i].log_staff_avatar != null?localStorage.url+log_list[i].log_staff_avatar:"../../statics/public/images/res/noavatar.gif")+'">'+
			                '<div class="aui-img-body">'+
			                    '<span>'+log_list[i].log_staff_name+'<em>'+log_list[i].log_time+'</em></span>'+
			                    '<p class="aui-ellipsis-1">['+(log_list[i].log_type==0?"未审核":log_list[i].log_type==1?"同意":"退回")+']'+log_list[i].log_content+'</p>'+
			                '</div>'+
			            '</li>'
					)
				}
			}
			api.hideProgress();//隐藏提示框
    	}else{
    		$("#get_approval_reception_log").hide();
    		api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//更改计划
function set_oa_approval_reception_status(stats){
	showProgress();//加载等待
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oaapproval/set_oa_approval_reception_status";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: {
	    		"reception_no":approval_no,//审批单no
	    		"staff_no":localStorage.user_id,
	    		"reception_status":stats
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
	    		$aui.alert({
	    				title:'提示',
	    				content:'提交成功',
	    				buttons:['确定']},
	    				function(ret){
	    					if(stats==3){
	    						rel();
	    					}
	    					else{
	    						api.execScript({
	    							name: 'reception_listHeader',
    								frameName: 'reception_list',
	                                script: 'rel();'
                                });
                                api.closeToWin({name: 'reception_listHeader'});
	    					}
				})	
				api.hideProgress();//隐藏提示框
    		}
    		else{
    			$aui.alert({
	    				title:'提示',
	    				content:ret.msg,
	    				buttons:['确定']},
	    				function(ret){
				})	
    		}
    	}
    	else{
    		api.hideProgress();//隐藏提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//button显示不同方法
function button_show(){
	if(api.pageParam.approval_status=="3"){
   		if(button_type==true){
   			$("#btn_content").html(
				'<div class="aui-flex-item-6" onclick="set_oa_approval_reception_status(3)">'+
					'<div class="aui-btn aui-btn-info w-all bor-ra-0"><span class="aui-iconfont aui-icon-roundcheck"></span>开始</div>'+
				'</div>'+
				'<div class="aui-flex-item-6" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
					'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
				'</div>'
	   		)
   		}
   		else{
	   		$("#btn_content").html(
				'<div class="aui-flex-item-6" onclick="set_oa_approval_reception_status(4)">'+
					'<div class="aui-btn aui-btn-danger w-all bor-ra-0"><span class="aui-iconfont aui-icon-round"></span>终止</div>'+
				'</div>'+
				'<div class="aui-flex-item-6" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
					'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
				'</div>'
	   		)
   		}
   	}
   	else if(api.pageParam.approval_status=="4"){
   		$("#btn_content").html(
   			'<div class="aui-flex-item-6" onclick="openActionSheet()">'+
				'<div class="aui-btn aui-btn-info w-all bor-ra-0"><span class="aui-iconfont aui-icon-upload"></span>上传影音资料</div>'+
			'</div>'+
			'<div class="aui-flex-item-6" onclick="openOaWin(\'media_infoHeader\')">'+
				'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>查看影音库</div>'+
			'</div>'
   		);
   	}
   	else if(api.pageParam.approval_status=="1"){
   		$("#btn_content").html(
   			'<div class="aui-flex-item-12" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
				'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
			'</div>'
   		);
   	}
}
//选择上传方式
function openActionSheet(){
	api.actionSheet({
	    buttons: ['拍照','图库','相册']
	},function( ret, err ){
	    if(ret.buttonIndex == 1){
	    	getMedia("camera");
	    }
	    else if(ret.buttonIndex == 2){
	    	getMedia("library");
	    }
	    else if(ret.buttonIndex == 3){
	    	getMedia("album");
	    }
	});
}

//获取媒体
function getMedia(sourceType){
	api.getPicture({
	    sourceType: sourceType,
	    mediaValue: 'all',
	    destinationType: 'url',
	    allowEdit: true,
	    saveToPhotoAlbum: true
	}, function(ret, err){ 
	    if(ret){
	         file_upload(ret.data,"来访接待");
	    }
	});
}

//纯上传公共方法，只返回文件id
function file_upload(file_path,function_code){
	var url = localStorage.url+"Api/Upload/file_upload";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: { 
	    		"function_code":function_code
	        },
	    	files: {file:file_path}
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
	    		var file_name="";
			 	var path=obj.upload_path.split("/");
			 		file_name=path[path.length];
	    		save_article_info(obj.upload_id,file_name);
			}
			else if(0==obj.status){
			}
    	}
    });
}

//保存上传文件
function save_article_info(file_id,file_name){
	var url = localStorage.url+"Api/Cms/save_article_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: {
	    		"staff_no":localStorage.user_id,
	            "article_cat":14,
	            "article_title":file_name,
	           	"file_id":file_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$aui.alert({title:'提示',content:'提交成功,是否继续上传',buttons:['确定','取消']},function(ret){
    				if(ret==0){}
    				else{
    					openOaWin('media_infoHeader')
    				}
    			})	
    		}else{
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

/*提交审批单数据,获取编号*/
function save_oa_approval(){
	var reception_examiner="";
	//获取查看人id
	$(".staff_no").each(function(){
		if(reception_examiner==""){
			reception_examiner=reception_examiner+$(this).attr("id");
		}
		else{
			reception_examiner=reception_examiner+","+$(this).attr("id");
		}
	})
	//获取附件
	 var notice_attach="";
	 $("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}
		else{
			notice_attach=notice_attach+","+$(this).val()
		}
	 })
	 //end
	 //判断数据是否填全
	 if($("#reception_dept").val()==""||$("#reception_name").val()==""||$("#project_name").val()==""||$("#investigate_name").val()==""||
	 	$("#reception_time").val()==""||$("#reception_address").val()==""||$("#reception_project_name").val()==""||$("#inspection_route").val()=="")
	 	{
	 		$aui.alert({title:'提示',content:"请填写必填信息",buttons:['确定']},function(ret){});
	 		api.execScript({
				name:api.winName,
		        script: 'releaseClick();'
		    })
	 		return;
		}
	//end
	showProgress();//加载等待
	var url = localStorage.url+"Api/Oaapproval/save_oa_approval_reception";
	api.ajax({
	    url:url,
	    method: 'post',
	    data: {//传输参数
	    	values: {
	    		"staff_no":localStorage.user_id,
	    		"reception_dept":$("#reception_dept").val(),
	    		"reception_name":$("#reception_name").val(),
	    		"reception_project_name":$("#project_name").val(),
	    		"reception_project_desc":$("#project_survey").val(),
	    		"reception_company_name":$("#investigate_name").val(),
	    		"reception_time":$("#reception_time").val(),
	    		"reception_address":$("#reception_address").val(),
	    		"reception_real_project":$("#reception_project_name").val(),
	    		"reception_process":$("#reception_process").val(),
	    		"reception_route":$("#inspection_route").val(),
	    		"reception_data":$("#investigation_data").val(),
	    		"reception_company_relation":$("#relationship").val(),
	    		"reception_attachment":notice_attach,
	    		"reception_examiner":reception_examiner
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			approval_no=ret.reception_no;
    			openNewWin("reception_new_personne_Header");
    			api.execScript({
					name:api.winName,
			        script: 'releaseClick();'
			    })
    			api.hideProgress();//隐藏提示框
    		}else{
    			api.hideProgress();//隐藏提示框
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    			api.execScript({
					name:api.winName,
			        script: 'releaseClick();'
			    })
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	api.execScript({
				name:api.winName,
		        script: 'releaseClick();'
		    })
		    api.hideProgress();//隐藏提示框
    	}
    });
}

/*修改数据方法*/
function save_oa_approval_reception(){
	//获取附件
	 var notice_attach="";
	 $("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}
		else{
			notice_attach=notice_attach+","+$(this).val()
		}
	 })
	 if($("#reception_dept").val()==""||$("#reception_name").val()==""||$("#project_name").val()==""||$("#investigate_name").val()==""||
	 	$("#reception_time").val()==""||$("#reception_address").val()==""||$("#reception_project_name").val()==""||$("#inspection_route").val()=="")
	 	{
	 		$aui.alert({title:'提示',content:"请填写必填信息",buttons:['确定']},function(ret){});
	 		api.execScript({
				name:api.winName,
		        script: 'releaseClick();'
		    })
	 		return;
	}
	showProgress();//加载等待
	var url = localStorage.url+"Api/Oaapproval/save_oa_approval_reception";
	api.ajax({
	    url:url,
	    method: 'post',
	    data: {//传输参数
	    	values: {
	    		"reception_no":api.pageParam.reception_no,
	    		"staff_no":localStorage.user_id,
	    		"reception_dept":$("#reception_dept").val(),
	    		"reception_name":$("#reception_name").val(),
	    		"reception_project_name":$("#project_name").val(),
	    		"reception_project_desc":$("#project_survey").val(),
	    		"reception_company_name":$("#investigate_name").val(),
	    		"reception_time":$("#reception_time").val(),
	    		"reception_address":$("#reception_address").val(),
	    		"reception_real_project":$("#reception_project_name").val(),
	    		"reception_process":$("#reception_process").val(),
	    		"reception_route":$("#inspection_route").val(),
	    		"reception_data":$("#investigation_data").val(),
	    		"reception_company_relation":$("#relationship").val(),
	    		"reception_attachment":notice_attach
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$aui.alert({title:'提示',content:"成功",buttons:['确定']},function(ret){
	    				api.execScript({
							name: 'reception_listHeader',
							frameName: 'reception_list',
	                        script: 'rel();'
	                    });
	                    api.closeToWin({name: 'reception_listHeader'});
    			});
    			api.hideProgress();//隐藏提示框
    		}else{
    			api.hideProgress();//隐藏提示框
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开新页面
function openNewWin(winName,type,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"reception_no":approval_no,
	    	"type":type,//用来判断流程图是编辑还是查看
	    	"id":id//审批单编号
	    }
    });
}

//打开OA模块新页面
function openOaWin(winName,type){
	api.openWin({
	    name: winName,
	    url: '../oa_md/header/'+winName+'.html',
	    pageParam:{
	    	"type":type,//用来判断同意退回入口
	    	"id":node_log_id,//当前执行节点id
	    	"reception_no":api.pageParam.reception_no
	    }
    });
}
//联系人选择后赋值
function evaluate(type_id,staff_name,staff_no){
	var staff_name=staff_name.split(",");
	var staff_no=staff_no.split(",");
	for(var i=0;i<staff_name.length;i++){
		$("#"+type_id).after(
			'<li class="aui-list-view-cell aui-img">'+
			    '<span class="staff_no" id="'+staff_no[i]+'" class="aui-img-body aui-text-info">'+staff_name[i]+'</span>'+
			    '<span class="aui-pull-right aui-text-danger" onclick="javascript:$(this).parent().remove()">删除</span>'+
			'</li>'
		)
	}
}
//日期选择
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