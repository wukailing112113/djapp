apiready = function(){
	get_guestbook_list();//调用（获取流动党员之家列表）接口
	openPullRefresh("exec()");//下拉刷新
	evenScrolltobottom("toTop()");//上拉加载数据
}
var page = 1;
function toTop(){
	page++;
	get_guestbook_list();
}

//获取留言建议列表接口--------------------------------------------
function get_guestbook_list(){
	showProgress();
	var url = localStorage.url+"/index.php/Api/Life/get_guestbook_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	            "pagesize":10,//每页数量
	            "page":page//页数
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
							'<div class="over-h w-100b box-4-df bg-color-whiter p-12em mb-8em bor-ra-3" onclick="openInfo(\'life_message_myinfo_header\','+ret.data[i].guestbook_id+')">'+
								'<img class="pull-left mr-12em w-52em h-52em" src="'+((ret.data[i].communist_avatar!=null)?localStorage+ret.data[i].communist_avatar:'../../../statics/images/images_oa/oa_img_head.png')+'" alt="" />'+
								'<div class="pull-left w-80b over-h">'+
									'<div class="f-15em lh-15em color-33 pl-8em f-w pt-10em pb-12em"><span>'+ret.data[i].communist_name+'</span><span class="di-ib pl-20em color-red f-14em">'+ret.data[i].status+'</span></div>'+
									'<p class="h-18em f-12em lh-20em color-99 pl-8em pr-8em bg-color-ff562d bor-ra-3">'+InterceptField(ret.data[i].guestbook_content,'无',20)+'</p>'+
								'</div>'+
								'<span class="pull-right f-14em lh-14em pt-20em color-99">详情<i class="iconfont f-12em lh-14em color-99 p-0 ml-5em">&#xe613;</i></span>'+
							'</div>'
		    			)
		    			
		    		}
				}
			}
			else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无列表</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    		api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开详情页----------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}

//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}