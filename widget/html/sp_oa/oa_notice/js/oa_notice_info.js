apiready=function(){
	getOaNoticeInfo();//加载通知公告详情
}
var missiveAttach = '';
var	nameBox_num = 0;
//获取通知公告详情
function getOaNoticeInfo(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_notice_info";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"notice_id":api.pageParam.id,//通知公告编号
				"is_read":api.pageParam.isRead//是否已阅读
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				$('#notice_title').html(clearNull(ret.data.notice_title,'无标题'));//获取公告标题
				$('#add_time').html(clearNull(ret.data.add_time,'0'));//获取公告时间
				$("#notice_content").html(clearNull(ret.data.notice_content,'无'));//获取公告内容
				//读取附件列表
				if(ret.data.notice_attach){
					$('#whole').val(ret.data.notice_attach);
					missiveAttach = ret.data.notice_attach.split('&nbsp;&nbsp;&nbsp;&nbsp;');
					$('#missiveAttachQuantity').html(missiveAttach.length);
					
					for(var i=0;i<missiveAttach.length;i++){
						$('#missiveAttach').append(
							'<div class="b-1-dfdfdf p-12em bg-color-fcfdfe over-h mb-12em" onclick="openEnqueue(\''+localStorage.url+missiveAttach[i]+'\')">'+
								'<div class="pull-left pr-12em">'+
									'<img class="w-35em h-35em" src="../../../statics/images/images_oa/oa_img_doc.png" alt="" />'+
								'</div>'+
								'<div class="pull-left">'+
									'<p class="f-15em color-b3">'+missiveAttach[i].split('/')[(missiveAttach[i].split('/').length-1)]+'</p>'+
								'</div>'+
							'</div>'
						)
					}
				}else{
					$('#all').addClass('di-n');
				}
				//已读人员列表
				if(ret.data.read_list&&ret.data.read_list.length>0){
					$('#nameBox').removeClass('di-n');
					for(var i=0;i<ret.data.read_list.length;i++){
						$('#read_list').append(
							'<li class="pull-left w-25b mt-10em mb-10em f-14em lh-15em color-75 text-align">'+
								ret.data.read_list[i].communist_name
							+'</li>'
						)
					}
				}
			}
			else{
				api.hideProgress();//隐藏进度提示框	
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
		}else{
			api.hideProgress();//隐藏进度提示框
			/**无网络提示 */
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//隐藏显示已读人员-------------------------------------------------------------
$('#nameBox').click(function(){
	if(nameBox_num==0){//显示已读人员
		$(this).find('i').html('&#xe61b;');
		$("#read_list").removeClass('di-n');
		nameBox_num=1;
	}else{//隐藏已读人员
		$(this).find('i').html('&#xe957;');
		$("#read_list").addClass('di-n');
		nameBox_num=0
	}
})

//下载全部附件
function foreach_file(){
	var file=$("#whole").val().split("&nbsp;&nbsp;&nbsp;&nbsp;");
    if(file.length>1){
       for(var i=0;i<file.length;i++){
            openEnqueue(''+localStorage.url+file[i]+'');
        }
        openManagerView() 
    }else{
        openEnqueue(''+localStorage.url+file[0]+'');
        openManagerView()
    }
}