apiready=function(){
	getEduTopicList();
}

function openTwostudiesWin(winName,id,url){
	localStorage.exam_flag = 2;
	localStorage.topic_type = id;
	api.openWin({
		name:winName,
		url:"header/"+winName+".html",
		pageParam:{
    		id:id,
    		url:url,
    		type:2,
		},
	})
}

function getEduTopicList(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_topic_list";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
	    				var urlPath = ret.data[i].img_url;
	    				$('#list').append(
	    					'<div class="bg-color-white w-347em h-200em ct-lr b-s ml-15em mr-15em mt-15em pl-8em pr-8em mb-15em bor-ra-7" onclick="openTwostudiesWin(\'edu_special_twostudies_header\','+ret.data[i].topic_id+',\''+urlPath+'\')">'+
	    					'<div class="w-100b h-149em pt-8em"><img class="w-100b h-100b bor-ra-4" src="'+((urlPath!=null)?localStorage.url+urlPath:"../../../statics/images/images_edu/edu_two_learn.png")+'"/></div>'+
								'<div class="f-15em mt-12em">'+clearNull(ret.data[i].topic_title,"无标题")+'</div>'+
							'</div>'
	    				)
	    			}
	    		}
    		}else{
    			api.hideProgress();//隐藏进度提示框
	    		/**无数据提示 */
		    	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无内容</div>'
					);	
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}







