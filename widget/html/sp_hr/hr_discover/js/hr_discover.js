apiready = function(){
	getHrCommunistList();//调用（获取党员发展全纪实列表）接口
	openPullRefresh('exec()');//下拉刷新
	evenScrolltobottom('toTop()');//上拉加载
}
var page = 1;
function toTop(){
	page++;
	getHrCommunistList();
}

//获取党员发展全纪实列表接口--------------------------------------------
function getHrCommunistList(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "party_no":localStorage.dept_no,//登录人支部编号
	            "page":page,//页数
	            "pagesize":10,//每页数量
	            "status":2//发展党员
	        }
	    }
    },function(ret,err){
    	if(ret){
    	//alert(JSON.stringify(ret.data));
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
//		    			$('#list').append(
//		    				'<div class="over-h box-4-df bg-color-whiter p-12em mb-8em bor-ra-3" onclick="openInfo(\'hr_discover_info_header\','+ret.data[i].communist_no+')">'+
//								'<img class="pull-left mr-12em w-52em h-52em" src='+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+' alt="" />'+
//								'<div class="pull-left w">'+
//									'<p class="f-15em lh-15em color-33 f-w pt-6em pb-12em">'+clearNull(ret.data[i].communist_name,'无')+'</p>'+
//									'<p class="h-18em f-12em lh-20em color-white pl-8em pr-8em bg-color-ff562d bor-ra-3" style="background:'+clearNull(ret.data[i].status_color,'#999999')+'">'+clearNull(ret.data[i].status_name,'无')+'</p>'+
//								'</div>'+
//								'<span class="pull-right f-14em lh-14em pt-20em color-99">详情<i class="iconfont f-12em lh-14em color-99 p-0 ml-5em">&#xe613;</i></span>'+
//							'</div>'
//		    			)
						$('#list').append(
		    				'<div class="over-h box-4-df bg-color-whiter p-12em mb-8em bor-ra-3" onclick="openInfo(\'hr_discover_info_header\','+ret.data[i].communist_no+')">'+
								'<img class="pull-left mr-12em w-52em h-52em" src='+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+' alt="" />'+
								'<div class="pull-left w">'+
									'<p class="f-15em lh-15em color-33 f-w pt-6em pb-12em">'+clearNull(ret.data[i].communist_name,'无')+'</p>'+
									'<p class="h-18em mt-30mem ml-65em f-12em lh-20em pl-8em pr-8em bg-color-ff562d bor-ra-3" style="background:#dcdada;color:"#ece9e9">'+clearNull(ret.data[i].status_name,'无')+'</p>'+
									'<div class="p-0 mt-10em f-12em lh-14em h-14em pb-15em color-a4">'+
						                    '<span class="pull-left pr-8em color-99 br-1-df">'+ret.data[i].communist_applytime.substring(0,11)+'</span>'+						                    
											'<span class="pull-left ml-8em color-99">'+clearNull(ret.data[i].party_no,'无')+'</span>'+
							          '</div>'+
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
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开详情页---------------------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}

//页面刷新----------------------------------------------------------------------------
function exec(){
	location.reload();
}