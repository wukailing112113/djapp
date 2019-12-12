apiready=function(){
	get_bd_type_list();
	getBdBannerList('bannerList',7,1);//获取banner
}

//获取会议类型
function get_bd_type_list(){
	var url = localStorage.url+"/index.php/Api/Public/get_bd_type_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           type_group:"meeting_type",
	            type_no:[2000,2005, 2006],	 
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){  
    		//获取会议类型
    			for(var i=0;i<ret.data.length;i++){
    				$('#type_list').append(
    					'<div class="over-h h-22em m-12em">'+
							'<img class="pull-left w-7em h-17em lh-22em mr-12em" src="../../../statics/public/aui2/img/tit-icon.png">'+
							'<span class="pull-left shade f-18em lh-22em f-w letter-spacing">'+ret.data[i].type_name+'</span>'+
						'</div>'+
						'<p class="pl-12em pr-12em pb-12em f-15em lh-20em color-33 f-w bb-1-df"></p>'+
						'<div class="mb-15em ulli">'+
						    '<ul id="'+ret.data[i].type_no+'" class="pl-12em pr-12em"></ul>'+
						'</div>'
    				
    				)
					get_oa_meeting_list(ret.data[i].type_no);
    			}	
			}
			else{
				$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无会议</div>'
					);	
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


//获取会议列表
function get_oa_meeting_list(type_noo){
	var url = localStorage.url+"/index.php/Api/Manage/get_oa_meeting_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            communist_no: localStorage.user_id,//登录人员编号
	            meeting_type:'',
	            status:1,//1:未开展 2:历史会议
	            page:1,//页数
	            pagesize:100//条数
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){  
    			//获取会议列表
    			for(var k=0;k<ret.data.length;k++){
//  			alert(localStorage.url+ret.data[0].meetting_thumb);
	    			if(ret.data[k].meeting_type==type_noo){
	    				$("#"+type_noo).append(
	    					'<li class="bb-1-df pt-15em" onclick="openSignIn(\'oa_attmeeting_signIn_header\','+ret.data[k].meeting_no+')">'+
					            '<div class="over-h">'+
					            	'<img class="w-118em h-98em bor-ra-3 pull-left mr-12em" src="'+((ret.data[k].meetting_thumb!=null)?localStorage.url+ret.data[k].meetting_thumb:'../../../statics/public/aui2/img/pic-list.png')+'"/>'+
					                '<div class="w-220em pull-left">'+
					                    '<div class="h-18em mt-8em">'+
					                        '<div class="pull-left f-16em color-33 lh-18em f-w">'+InterceptField(ret.data[k].meeting_name,'无',10)+'</div>'+
					                        '<div class="pull-right w-44em h-18em lh-20em bg-color-ff4844 color-white text-align bor-ra-10em mr-12em f-10em">参加</div>'+
					                    '</div>'+
					                    '<div class="f-12em color-fe9776 mt-8em lh-12em">'+ret.data[k].meeting_start_time+'</div>'+
					                    '<div class="f-12em color-33 mt-8em lh-12em">'+InterceptField(ret.data[k].meeting_addr,'无',15)+'</div>'+
					                    '<div class="f-10em color-33 mt-8em lh-14em">'+ret.data[k].memo.substring(0,40)+'</div>'+
					                '</div>'+
					            '</div>'+
					            '<div class="mt-10em f-12em lh-15em pb-10em pt-10em color-33 over-h">'+
					                '<p class="pull-left w-33b text-align br-1-df">主持:<span class="ml-5em color-99">'+((ret.data[k].host_name!=null)?ret.data[k].host_name:'无')+'</span></p>'+
					                '<p class="pull-left w-33b text-align br-1-df">部门:<span class="ml-5em color-99">'+((ret.data[k].party_name!=null)?ret.data[k].party_name:'无')+'</span></p>'+
					                '<p class="pull-left w-33b text-align">人数:<span class="ml-5em color-99">'+((ret.data[k].communist_num!=null)?ret.data[k].communist_num:'无')+'</span></p>'+
					            '</div>'+
					        '</li>'
    					)
	    			}
    			}
			}
			else{
				$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无会议</div>'
					);	
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


//打开新页面--------------------------------------------------------------------------------------
function openSignIn(winName,id) {
	api.openWin({
		name : winName,
		url : 'header/' + winName + '.html',
		pageParam:{
			id:id,
		}
	});
}

//刷新页面---------------------------------------------------------------------------------------
function exec(){
	location.reload();
}