apiready = function(){
	get_life_vote_list();//调用（获取调查问卷与调查问卷公示列表）接口
}

//获取调查问卷与调查问卷公示列表 接口------------------------------------------------------------
function get_life_vote_list(){
	$('#list').html('');
	showProgress()
	var url = localStorage.url+"/index.php/Api/Life/get_life_vote_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//登录人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length){
	    			for(var i=0;i<ret.data.length;i++){
		    			$('#list').append(
		    				'<div class="mt-8em bg-color-whiter po-re bor-ra-4" onclick="openInfo(\'life_vote_info_header\','+ret.data[i].subject_id+')">'+
								'<span class="po-ab left-10em top-20em wh-6em m-4em bor-ra-100b bg-color-ff3032"></span>'+
								'<p class="f-14em color-75 lh-18em p-20em pl-30em">'+ret.data[i].subject_content+'</p>'+
								'<i class="po-ab right-0 top-20em f-14em color-df iconfont mr-10em">&#xe613;</i>'+
							'</div>'
		    			)
		    		}
	    		}
			}else{
				$("#list #more").remove();
				$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无内容</div>'
					);	
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
                //api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    		api.hideProgress();//隐藏进度提示框
    		
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//刷新页面----------------------------------------------------------------------
function exec(){
	location.reload();
}

//打开详情页---------------------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+".html",
	    pageParam:{
	    	id:id,
	    },
    });
}