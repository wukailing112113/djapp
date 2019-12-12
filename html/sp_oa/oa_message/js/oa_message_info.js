apiready=function(){
	getOaNoticeInfo();//加载通知公告详情
}
var missiveAttach = '';
var	nameBox_num = 0;
//获取通知公告详情
function getOaNoticeInfo(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Oa/get_alert_info";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"alert_id":api.pageParam.id,//通知公告编号
				//"is_read":api.pageParam.isRead//是否已阅读
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
			
				$('#notice_title').html(clearNull(ret.data.alert_title,'无标题'));//获取公告标题
				$('#add_time').html(clearNull(ret.data.add_time,'0'));//获取公告时间
				$("#notice_content").html(clearNull(ret.data.alert_content,''));//获取公告内容
				if(ret.data.alert_content==null){
					$("#notice_content").parent().addClass('di-n');
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



