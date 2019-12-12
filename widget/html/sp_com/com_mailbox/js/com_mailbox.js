apiready = function () {
	getImailList(1);//调用 （书记信箱列表） 接口
	openPullRefresh('exec()');//下拉刷新
	evenScrolltobottom('toTop()');//上拉加载
}
var type = 1;//创建公文收发接口所传字段
var page = 1;

function toTop(){
	//page++;
	getImailList(type);
}

//书记信箱列表接口----------------------------------------------
function getImailList(type){
	var url = localStorage.url+"/index.php/Api/Life/get_imail_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "type":type,//1、收件箱  2、发件箱
	            "keywork":$('#keywork').val(),//关键字	                     
	            "page":page,
	            "pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			$('#list').html('');
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
    					$('#list').append(
    						'<div class="over-h bb-1-dfdfdf" onclick="openInfo(\'com_mailbox_info_header\',\''+ret.data[i].inbox_id+'\')">'+
								'<div class="pull-left w-20b">'+
									'<img class="w-52em h-52em bor-ra-100b ml-8em mr-8em mt-15em mb-12em" src="../../../statics/images/images_oa/oa_img_head.png" alt="" />'+
								'</div>'+
								'<div class="pull-left w-80b pb-10em">'+
									'<p class="over-h pt-15em color-99">'+
										'<span class="pull-left f-15em color-33">'+InterceptField(ret.data[i].imail_title,'无',9)+'</span>'+
										'<span class="pull-right h-15em f-10em lh-22em">'+clearNull(ret.data[i].imail_sender,'无')+' '+clearNull(ret.data[i].add_time,'0')+'</span>'+
									'</p>'+
									'<p class="f-12em color-99 pt-4em"></p>'+
									'<p class="f-12em color-99 pt-4em white-space">'+InterceptField(ret.data[i].imail_content,'无',20)+'</p>'+
								'</div>'+
							'</div>'
    					)
			
    					
		    		}
		    	}
		    	api.hideProgress();//隐藏进度提示框
    		}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无内容</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.toast({msg: '网络链接失败...' ,duration:3000,location: 'top'});
    	}
    });
}

//公文收发类型tab切换--------------------------------------------------
$('#tabBox2 li').click(function(){
	$(this).siblings().removeClass('tabBox2-active');
	$(this).addClass('tabBox2-active');
	type = ($(this).index()+1);
	$('#keywork').val("");
	$('#list').html('');
	getImailList(type);//调用 （公文收发公文列表） 接口
})

//关键字搜索----------------------------------------------------------
$('#keywork').keyup(function(){
	$('#list').html('');
	page=1;
	getImailList(type);
})


//打开公文收发详情----------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":type,
	    	"id":id
	    }
    });
}

//刷新页面-----------------------------------------------------------
function exec(){
	location.reload();
}
