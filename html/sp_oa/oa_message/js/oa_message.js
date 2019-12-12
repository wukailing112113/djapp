portrait="";
//页面初始化
apiready = function () {
	getOaNoticeList();//获取数据
    openPullRefresh("exec()");//下拉刷新
    evenScrolltobottom('toTop()');//上拉加载
   //evenScrolltobottom("getOaNoticeList('evenScrolltobottom')");//上拉加载数据
}
var page = 1;
var status = '1';
function toTop(){
	page++;
	getOaNoticeList();
}

//获取通知公告列表---------------------------------------------------------------------------------
function getOaNoticeList(type){
//	if(type!='evenScrolltobottom'){
//		$('#list').html('');
//	}
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Oa/get_alert_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"status":status,//1、已读 2、未读
				"page":page,//页数
				"pagesize":10//每页数量
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
	    				$("#list").append(
							'<li class="over-h bb-1-dfdfdf" onclick="openInfo(\'oa_message_info_header\','+ret.data[i].alert_id+')">'+								
								'<div class="pull-left w-100b pb-10em pl-10em">'+
									'<p class="over-h pt-15em pl-5em">'+
										'<i class="pull-left"></i><span class="pull-left f-15em color-33">'+clearNull(ret.data[i].alert_man,'无提醒人')+'</span>'+
										'<span class="pull-right h-15em text-align f-10em lh-15em color-ffba66">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</span>'+
									'</p>'+
									'<p class="f-12em color-66 pt-4em">'+InterceptField(ret.data[i].alert_title,'无标题',15)+'</p>'+
								'</div>'+
							'</li>'
						);
	    			}
//	    			if(type=='evenScrolltobottom'){
//						page++;
//					}
					//page++;
    			}
    			api.hideProgress();//隐藏进度提示框
			}else{
				 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			api.hideProgress();//隐藏进度提示框
				
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开新页面---------------------------------------------------------------------
function openInfo(winName,id,isRead){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"id":id,
	    	"isRead":isRead
	    }
    });
}

//刷新页面---------------------------------------------------------------------
function exec(){
	location.reload();
}

//通知公告已读未读切换-------------------------------------------------------------
$('#tabBox2').find('li').click(function(){
	$('#list').html('');
	$('#tabBox2').find('li').removeClass('tabBox2-active').find('.active').hide();
	$(this).addClass('tabBox2-active').find('.active').show();
	status = $(this).attr('num');
	page=1;
	getOaNoticeList();
})