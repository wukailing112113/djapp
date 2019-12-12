var lon;//经度
var lat;//纬度
apiready=function(){
	if(api.pageParam.dd=='first'){
		if(api.pageParam.type=='添加'){
			$('#custom').hide();
			$('#first').html('签到内容');
			$('#header,#add_upload,#set').show();
			get_user_info();
			getLocation()//获取定位
		}else{
			$('#custom').hide();
			$('#first').html('签到内容');
			get_legwork_list();
			$('#hinfo_upload').show();
			$('#customer,#legwork_content').attr('disabled',true);
			$('#select').attr('onclick','');
		}
	}else{
		if(api.pageParam.type=='添加'){
			$('#header,#add_upload,#set').show();
			get_user_info();
			getLocation()//获取定位
		}else{
			get_legwork_list();
			$('#hinfo_upload').show();
			$('#customer,#legwork_content').attr('disabled',true);
			$('#select').attr('onclick','');
		}
	}
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
    			var img=(ret.staff_avatar!= null&&ret.staff_avatar!=""&&ret.staff_avatar.substring(0,1)!="#"?'<img class="aui-img-object bor-ra-100b aui-pull-left w-50 h-50" src=\''+localStorage.url+ret.staff_avatar+'\'/>':'<div style="background:'+ret.staff_avatar+'" class="w-50 h-50 aui-col-xs-4 mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-12">'+ret.staff_name.substring(0,3)+'</div>');
				$('#list').append(
					'<li id="header" class="aui-list-view-cell aui-img">'+
			            img+
			            '<div class="aui-img-body">'+
			                '<input id="legwork_title" value="'+ret.staff_name+'的签到" type="text" class="boeder-none w-100b aui-input p-0 fsize-16 colorlan"/>'+
			                '<p class="color-ccc fsize-12">'+new Date().format('yyyy-MM-dd hh:mm:ss')+'</p>'+
			                '<div>'+
			                	'<i class="iconfont aui-text-info aui-pull-left fsize-16 pt-10 po-re right-5">&#xe61a;</i>'+
			                	'<p class="ellipsis-one fsize-12 pt-10 po-re right-5 color-999" id="info_address">这位小伙伴没有定位</p>'+
			               '</div>'+
			            '</div>'+
			        '</li>'
				)
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
//获取列表
function get_legwork_list(){
	showProgress();//加载等待	
	//ajax获取数据处理
	var url = localStorage.url+"Api/Hr/get_att_legwork_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "staff_no": localStorage.user_id,
	            "page":1,
	            "pagesize":20
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i=0;i<ret.list.length;i++){
    				if(api.pageParam.id==ret.list[i].legwork_no){
    					var img=(ret.staff_avatar!= null&&ret.staff_avatar!=""&&ret.staff_avatar.substring(0,1)!="#"?'<img class="aui-img-object bor-ra-100b aui-pull-left w-50 h-50" src=\''+localStorage.url+ret.staff_avatar+'\'/>':'<div style="background:'+ret.staff_avatar+'" class="w-50 h-50 aui-col-xs-4 mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-12"></div>');
    					$('#list').append(
    						'<li id="header" class="aui-list-view-cell aui-img">'+
					            img+
					            '<div class="aui-img-body">'+
					                '<input id="legwork_title" value="'+ret.list[i].memo+'" type="text" class="boeder-none w-100b aui-input p-0 fsize-16 colorlan" onfocus="this.blur();" />'+
					                '<p class="color-ccc fsize-12">'+ret.list[i].legwork_datetime+'</p>'+
					                '<div>'+
					                	'<i class="iconfont aui-text-info aui-pull-left fsize-16 pt-10 po-re right-5">&#xe61a;</i>'+
					                	'<p class="ellipsis-one fsize-12 pt-10 po-re right-5 color-999" id="info_address">这位小伙伴没有定位</p>'+
					               '</div>'+
					            '</div>'+
					        '</li>'
    					)
    					if(ret.list[i].legwork_area!==''&&ret.list[i].legwork_area!==null){
    						lon=ret.list[i].legwork_area.split(",")[0];
    						lat=ret.list[i].legwork_area.split(",")[1];
    						getNameFromCoords()//根据经纬度获取位置详细信息 
    					}
    					$('#customer').val(ret.list[i].cust_name);
    					$('#legwork_content').val(ret.list[i].legwork_content);
    					$("#upload_length").html(ret.list[i].file_list.length);
    					if(ret.list[i].file_list.length>0){
    						$("#info_upload").show();
    					}
    					var img="";
		    			for(var j=0;j<ret.list[i].file_list.length;j++){
		    				if($("#whole").val()==""){
						       $("#whole").val(localStorage.url+ret.list[i].file_list[j].upload_path)
						    }else{
						       $("#whole").val($("#whole").val()+","+localStorage.url+ret.list[i].file_list[j].upload_path)
						    }
		    				img=upold_img(ret.list[i].file_list[j].upload_path);
		    				$("#info_upload_list").append(
							'<li class="aui-list-view-cell" onclick="openEnqueue(\''+localStorage.url+ret.list[i].file_list[j].upload_path+'\');openManagerView()">'+
		                         img+
		                        '<span class="aui-text-info ellipsis-one aui-col-xs-12 ellipsis-one ml-15">'
		                        	+ret.list[i].file_list[j].upload_path.substring(ret.list[i].file_list[j].upload_path.length-10,ret.list[i].file_list[j].upload_path.length)+
		                            '<input name="file_no" type="hidden" />'+    
		                        '</span>'+
		                    '</li>'
		    				)
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
//提交签到信息
function get_worklog(){
//	if($('#customer').val()==''){
//		$aui.alert({
//          title:'提示',
//          content:'请填写客户',
//          buttons:['确定']
//      },function(ret){
//      });
//      return;
//	}
	if($('#legwork_title').val()==''){
		$aui.alert({
            title:'提示',
            content:'请填写标题',
            buttons:['确定']
        },function(ret){
        });
        return;
	}
	if($('#legwork_content').val()==''){
		$aui.alert({
            title:'提示',
            content:'请填写总结',
            buttons:['确定']
        },function(ret){
        });
        return;
	}
	var upload_id='';
	$('#add_upload_list').find('input').each(function(){
		if(upload_id==''){
			upload_id=$(this).val();
		}else{
			upload_id+=','+$(this).val();
		}
	})
	showProgress();//加载等待	
	//ajax获取数据处理
	var url = localStorage.url+"Api/Hr/save_att_legwork";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "staff_no": localStorage.user_id,
	            "legwork_title":$('#legwork_title').val(),//外勤签到标题
	            "visit_cust_name":$('#customer').val(),//拜访客户的名称
	            "legwork_content":$('#legwork_content').val(),//拜访总结
	            "legwork_attach":upload_id,//文件id（多文件）
	            "legwork_area":lon+','+lat,//添加签到的定位地址
	            "legwork_datetime":new Date().format('yyyy-MM-dd hh:mm:ss')//添加签到时间
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			api.execScript({
					name:'sign_listHeader',
					frameName:'sign_list',
	                script: 'exec();'
                });
				api.closeWin({
                });
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//
function change(name,no){
	$('#customer').val(name);
	$('#customer_id').val(no);
}
//打开新页面
function openPmsWin(winName){
	api.openWin({
	    name: winName,
	    url: '../pms/header/'+winName+'.html'
    });
}
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
			$('#info_address').html(ret.address);
	    }
	});
}
//切换下拉及加载数据
function dropDownSwitch(obj){
    if($(obj).attr("id") == "info_upload_fold"){
        list_id = "info_upload_list";
    }    
    //切换当前分类显示与隐藏
    $(obj).addClass("aui-fold-active");
    $(obj).children("i").html("&#xe6fe;");
    $(obj).siblings("li").removeClass("aui-fold-active");
    $(obj).siblings("li").children("i").html("&#xe61a;");    
    $("#"+list_id).parents(".aui-fold-content").siblings(".aui-fold-content").slideUp();//关闭非当前行分类
    $("#"+list_id).parents(".aui-fold-content").slideToggle(function(){
        if ($(this).is(':hidden')) {
            $(obj).removeClass("aui-fold-active");
            $(obj).children("i").html("&#xe61b;");
        }
    });
}
//下载全部附件
function foreach_file(){
	var file=$("#whole").val().split(",");
    //阻止事件冒泡
    $("#download").mousedown(function(event){
        event.stopPropagation();
    });
    if(file.length>1){
       for(var i=0;i<file.length;i++){
            openEnqueue(''+file[i]+'');
        }
        openManagerView() 
    }else{
        openEnqueue(''+file[0]+'');
        openManagerView()
    }
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