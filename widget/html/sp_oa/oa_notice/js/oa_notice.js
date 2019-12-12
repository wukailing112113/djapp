portrait="";
//页面初始化
apiready = function () {
	getOaNoticeList();//获取数据
}

var status = '1';

//获取通知公告列表---------------------------------------------------------------------------------
function getOaNoticeList(type){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_notice_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
				"communist_no":localStorage.user_id,//登录人编号
				"status":status,//1、已读 2、未读
				
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
	    				$("#list").append(
							'<li class="over-h bb-1-dfdfdf" onclick="openInfo(\'oa_notice_info_header\','+ret.data[i].notice_id+','+ret.data[i].is_read+')">'+
								'<div class="pull-left w-20b">'+
									'<img class="w-52em h-52em b or-ra-100b ml-8em mr-8em mt-15em mb-12em" src="'+((ret.data[i].communist_avatar)?localStorage.url+ret.data[i].communist_avatar:"../../../statics/images/images_oa/oa_img_head.png")+'" />'+
								'</div>'+
								'<div class="pull-left w-80b pb-10em">'+
									'<p class="over-h pt-15em">'+
										'<i class="pull-left mr-6em"></i><span class="pull-left f-15em color-33">'+InterceptField(ret.data[i].notice_title,'无标题',15)+'</span>'+
										'<span class="pull-right h-15em text-align f-10em lh-15em color-ffba66">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</span>'+
									'</p>'+
									'<p class="f-14em color-33 pt-4em">'+InterceptField(ret.data[i].notice_content,'无简介',20)+'</p>'+
									'<p class="f-12em color-99 pt-4em">发布人：'+ clearNull(ret.data[i].add_staff,' ')+'</p>'+
								'</div>'+
							'</li>'
						);
	    			}
//	    			if(type=='evenScrolltobottom'){
//						page++;
//					}
					//page++;
    			}else{
    			
    			}
    			//api.hideProgress();//隐藏进度提示框
			}else{
//  				$("#list").append(
//						'<div class="pt-5em aui-text-center clearfix color-99" id="more">暂无内容</div>'
//					);	
				
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