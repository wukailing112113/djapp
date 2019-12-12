 apiready=function(){
 	if(api.pageParam.approval_status=="1"||api.pageParam.approval_status=="2"){
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
   	if(api.pageParam.approval_status=="1"){
   		var type=1;
   		if(type==1){
   			$("#btn_content").html(
				'<div class="aui-flex-item-6">'+
					'<div class="aui-btn aui-btn-info w-all bor-ra-0"><span class="aui-iconfont aui-icon-roundcheck"></span>开始</div>'+
				'</div>'+
				'<div class="aui-flex-item-6">'+
					'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
				'</div>'
	   		)
   		}
   		else{
	   		$("#btn_content").html(
				'<div class="aui-flex-item-6">'+
					'<div class="aui-btn aui-btn-danger w-all bor-ra-0"><span class="aui-iconfont aui-icon-round"></span>终止</div>'+
				'</div>'+
				'<div class="aui-flex-item-6" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
					'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort"></span>审批流程图</div>'+
				'</div>'
	   		)
   		}
   	}
   	else if(api.pageParam.approval_status=="2"){
   		$("#btn_content").html(
   			'<div class="aui-flex-item-6 btn_div" onclick="openActionSheet()">'+
				'<div class="aui-btn aui-btn-info w-all bor-ra-0"><span class="aui-iconfont aui-icon-upload"></span>上传影音资料</div>'+
			'</div>'+
			'<div class="aui-flex-item-6" onclick="openNewWin(\'reception_flowChartHeader\',1)">'+
				'<div class="aui-btn aui-btn-warning w-all bor-ra-0"><span class="aui-iconfont aui-icon-sort" onclick="openNewWin(\'reception_flowChartHeader\',1)"></span>审批流程图</div>'+
			'</div>'
   		)
   	}
 
 }
//打开新页面
function openNewWin(winName,type,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":type,//用来判断同意退回入口
	    	"id":id
	    }
    });
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
	         file_upload(ret.data);
	    }
	});
}

//纯上传公共方法，只返回文件id
function file_upload(file_path){
	var url = localStorage.url+"Api/Upload/file_upload";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    report: true,
	    data: {//传输参数
	    	values: { 
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
//				$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
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
	    		"article_cat":9999,
	    		"file_id":file_id,
	    		"article_title":file_name,
	    		"staff_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			openNewWin('media_infoHeader','',9999);
    			api.execScript({
    				 name: 'media_infoHeader',
    				frameName: 'media_info',
	                script: 'exec();'
                });
    		}else{
    			$aui.alert({title:'提示',content:ret.msg,buttons:['确定']},function(ret){});
    		}
    	}else{
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//刷新本页面
function rel(){
	location.reload();
}
