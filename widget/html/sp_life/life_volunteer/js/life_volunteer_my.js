apiready = function(){
	getLifeVolunteerActivityList();//调用（我参加的志愿者活动列表）接口
}

//我参加的志愿者活动列表接口---------------------------------------------------
function getLifeVolunteerActivityList(){
	var url = localStorage.url+"/index.php/Api/Life/get_life_volunteer_activity_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no:localStorage.user_id,//登录人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
		    				'<div class="pull-left w-50b">'+
								'<div class="pt-12em pb-15em mb-8em m-a w-170em h-210em b-1-df bor-ra-7 bg-color-whiter" onclick="openInfo(\'life_volunteer_info_header\','+ret.data[i].activity_id+')">'+
									'<p class="ml-12em mr-12em mb-8em f-14em h-34em lh-17em f-w">'+InterceptField(ret.data[i].activity_title,'无',20)+'</p>'+
									'<div class="ml-12em mr-12em">'+
										'<img class="w-100b h-80em mb-8em" src="'+((ret.data[i].activity_thumb)?(localStorage.url+ret.data[i].activity_thumb):("../../../statics/images/images_life/life_volunteer.jpg"))+'" alt="" />'+
									'</div>'+
									'<p class="ml-12em mr-12em h-55em f-10em lh-14em color-75">'+InterceptField(ret.data[i].activity_description,'无',50)+'</p>'+
								'</div>'+
							'</div>'
		    			)
		    		}
	    		}
			}else{
				$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无活动</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
			}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
	});
}

//打开活动详情-------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}

//打开志愿者积分------------------------------------
//function openIntegral(winName){
//	api.openWin({
//	    name: winName,
//	    url: 'header/'+winName+'.html',
//	    pageParam:{
//	    	
//	    }
//  });
//}
