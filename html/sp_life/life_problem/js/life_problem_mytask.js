apiready = function(){
	getLifeMyConditionList();//调用我的任务接口
	openPullRefresh("exec()");//下拉刷新
//	evenScrolltobottom("toTop()");//上拉加载数据
}



function toTop(){
	getLifeMyConditionList();
}

//获取我的任务接口--------------------------------------------
function getLifeMyConditionList(){
	var url = localStorage.url+"/index.php/Api/Life/get_life_my_condition";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
//	            "pagesize":10,//每页数量
//	            "page":page//页数
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
//		    				'<div class="over-h box-4-df bg-color-whiter p-12em mb-8em bor-ra-3" onclick="openInfo(\'hr_moving_info_header\','+ret.data[i].change_id+')">'+
//								'<img class="pull-left mr-12em w-52em h-52em" src='+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+' alt="" />'+
//								'<div class="pull-left w">'+
//									'<p class="f-15em lh-15em color-33 pl-8em f-w pt-6em pb-12em">'+clearNull(ret.data[i].communist_name,'无')+'</p>'+
//									'<p class="h-18em f-12em lh-20em color-99 pl-8em pr-8em bg-color-ff562d bor-ra-3">'+clearNull(ret.data[i].new_party,'无')+'</p>'+
//								'</div>'+
//								'<span class="pull-right f-14em lh-14em pt-20em color-99">详情<i class="iconfont f-12em lh-14em color-99 p-0 ml-5em">&#xe613;</i></span>'+
//							'</div>'
							'<div class="over-h box-4-df bg-color-whiter p-12em mb-8em bor-ra-3" onclick="openInfo(\'life_proplem_myinfo_header\','+ret.data[i].condition_id+','+ret.data[i].status_two+')">'+
								'<img class="pull-left mr-12em w-52em h-52em" src="'+((ret.data[i].condition_thumb)?(localStorage.url+ret.data[i].condition_thumb):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
								'<div class="pull-left w">'+
									'<div class="f-15em lh-15em color-33 pl-8em f-w pt-10em pb-12em">'+'<span>'+clearNull(ret.data[i].condition_personnel,'0')+'</span>'+'</div>'+
									'<p class="h-18em f-14em lh-20em color-99 pl-8em pr-8em bg-color-ff562d bor-ra-3">'+InterceptField(ret.data[i].condition_content,'无',15)+'</p>'+
								'</div>'+
								'<div class="pull-right">'+
									'<p class="f-14em lh-14em pt-10em color-99">详情<i class="iconfont f-12em lh-14em color-99 p-0 ml-5em">&#xe613;</i></p>'+
									'<p class="color-red f-14em pt-10em">'+ret.data[i].status+'</p>'+
								'</div>'+
							'</div>'
							
		    			)
		    			
		    		}
				}
			}
			else{
    			$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无任务</div>'
					);	
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开详情页----------------------------------------------------------------
function openInfo(winName,id,status){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    	status:status
	    }
    });
}

//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}