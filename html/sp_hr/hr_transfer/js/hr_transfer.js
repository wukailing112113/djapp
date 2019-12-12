apiready = function(){
	getHrCommunistChangeList();//调用（获取党员关系转移列表）接口
}

//获取党员关系转移列表接口--------------------------------------------
function getHrCommunistChangeList(){
   //alert(localStorage.user_id);
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_change_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
		    				'<div class="over-h box-4-df bg-color-whiter p-12em mb-8em bor-ra-3" onclick="openInfo(\'hr_transfer_info_header\','+ret.data[i].change_id+')">'+
								'<div class="pull-left">'+
									'<p class="f-15em lh-15em color-33 f-w pt-6em pb-12em">原支部：'+clearNull(ret.data[i].old_party,'无')+'</p>'+
									'<p class="f-15em lh-15em color-33 f-w pt-6em">现支部：'+clearNull(ret.data[i].new_party,'无')+'</p>'+
								'</div>'+
							'</div>'
		    			)	
		    		}
	    		}
			}
			else{
//				api.toast({msg: ret.msg,duration:3000,location: 'top'});
				$("#list #more").remove();
				$("#list").append(
					'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
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

//页面刷新---------------------------------------------------------------------
function exec(){
	location.reload();
}