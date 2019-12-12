apiready=function(){
	//alert(api.pageParam.id1)
	//alert(api.pageParam.id)
	welcome_you();//获取个人信息
	edu_progress();//获取进度百分比
	edu_get_integral();//获取积分
	get_integral_ranking();//积分排行接口
	
	//getEduExamList();//调用（获取考试列表）接口
	//	getBdBannerList('bannerList',8,1);//获取banner
	//	evenScrolltobottom('toTop()');//上拉加载
	//	openPullRefresh('exec()');//下拉刷新
	
}
//var page = 1;
//function toTop(){
//	page++;
//	getEduExamList();
//}
//欢迎语
function welcome_you(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_topic_data";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "topic_id":api.pageParam.id,
	            "type":2
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#analysis_con').html(ret.data);
    			$('#integral_con').html(ret.data1);
    			
    			$('#analysis_con').fadeIn();
    			$('#integral_con').fadeIn();
    		}
			
    	}else{    		
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//专题完成率接口
function edu_progress(){
//alert(api.pageParam.id)
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material_percent";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "topic_id":api.pageParam.id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){  
    			$('.article_progress').css("width",ret.data.article.learn_rate+"%");//课件进度条
    			$('.article_rate').html(ret.data.article.learn_rate+"%完成率");//课件完成率
  				$('.article_num').html(ret.data.article.learn+"篇");//总数  				
  				$('.video_progress').css("width",ret.data.video.learn_rate+"%");//视频进度条
  				$('.video_rate').html(ret.data.video.learn_rate+"%完成率");//视频完成率
  				$('.video_num').html(ret.data.video.learn+"篇");//总数  				
  				$('.notes_progress').css("width",ret.data.notes.learn_rate+"%");//笔记进度条
  				$('.notes_rate').html(ret.data.notes.learn_rate+"%完成率");//笔记完成率
  				$('.notes_num').html(ret.data.notes.learn+"篇");//总数  	
  							
  				$('.exam_progress').css("width",ret.data.exam.learn_rate+"%");//考试
  				$('.exam_rate').html(ret.data.exam.learn_rate+"%完成率");//考试完成率
  				$('.exam_num').html(ret.data.exam.learn+"篇");//总数
  				
  				
    		}
			
    	}else{    		
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//积分获取接口
function edu_get_integral(){
//alert(localStorage.exam_topic)
	var url = localStorage.url+"/Api/Edu/get_edu_topic_integral";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "topic_id":api.pageParam.id,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){ 
    			$("#article_score").html(ret.data.integral_article);//文章积分
    			$("#video_score").html(ret.data.integral_video);//视频积分
    			$("#notes_score").html(ret.data.integral_notes_communist);//笔记积分
    			$("#exam_score").html(ret.data.exam_integral);//考试积分
  				
    		}
			
    	}else{    		
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}
//积分排行接口
function get_integral_ranking(){
	var url = localStorage.url+"/Api/Edu/get_edu_topic_communist_integral";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {
	    	values: { 
				//"communist_no":localStorage.user_id,
				//"topic_id":localStorage.exam_topic,//专题类型
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){ 
    		if(ret.data&&ret.data.length>0){
    		for(var i=0;i<ret.data.length;i++){	
    		if(i==0){
    			$("#list").append(
    			'<li class="clearfix w-100b h-50em lh-50em va-jz pl-12em pr-12em border-de-3em">'+
    			'<div class="pull-left w-7em h-7em lh-22em mr-12em text-align ranking_bg1">'+
//  			'<div class="f-7em">'+(i+1)+'</div>'+
    			'</div>'+
    			'<div class="pull-left mr-8em">'+
    				'<img class="w-30em h-30em bor-ra-50b" src="'+((ret.data[i].communist_avatar!=null)?localStorage.url+ret.data[i].communist_avatar:"../../../statics/images/images_oa/oa_img_head.png")+'">'+
    			'</div>'+
    			'<div class="pull-left h-50em lh-20em w-75b va-jz">'+
    				'<div class="f-12em color-21 pl-8em">'+ret.data[i].communist_name+'</div>'+
    			'</div>'+
    			'<div class="pull-right f-16em color-21">'+ret.data[i].integral+'</div>'+
    			
    			'</li>'
    			)  
    		}else if(i==1){
    			$("#list").append(
    			'<li class="clearfix w-100b h-50em lh-50em va-jz pl-12em pr-12em border-de-3em">'+
    			'<div class="pull-left w-7em h-7em lh-22em mr-12em text-align ranking_bg2">'+
//  			'<div class="f-7em">'+(i+1)+'</div>'+
    			'</div>'+
    			'<div class="pull-lef mr-8em">'+
    				'<img class="w-30em h-30em bor-ra-50b" src="'+((ret.data[i].communist_avatar!=null)?localStorage.url+ret.data[i].communist_avatar:"../../../statics/images/images_oa/oa_img_head.png")+'">'+
    			'</div>'+
    			'<div class="pull-left h-50em lh-20em w-75b va-jz">'+
    				'<div class="f-12em color-21 pl-8em">'+ret.data[i].communist_name+'</div>'+
    			'</div>'+
    			'<div class="pull-right f-16em color-21">'+ret.data[i].integral+'</div>'+
    			
    			'</li>'
    			)  
    		}else if(i==2){
    			$("#list").append(
    			'<li class="clearfix w-100b h-50em lh-50em va-jz pl-12em pr-12em border-de-3em">'+
    			'<div class="pull-left w-7em h-7em lh-22em mr-12em text-align ranking_bg3">'+
//  			'<div class="f-7em">'+(i+1)+'</div>'+
    			'</div>'+
    			'<div class="pull-left mr-8em">'+
    				'<img class="w-30em h-30em bor-ra-50b over-h" src="'+((ret.data[i].communist_avatar!=null)?localStorage.url+ret.data[i].communist_avatar:"../../../statics/images/images_oa/oa_img_head.png")+'">'+
    			'</div>'+
    			'<div class="pull-left h-50em lh-20em w-75b va-jz">'+
    				'<div class="f-12em color-21 pl-8em">'+ret.data[i].communist_name+'</div>'+
    			'</div>'+
    			'<div class="pull-right f-16em color-21">'+ret.data[i].integral+'</div>'+
    			
    			'</li>'
    			)  
    		}else{
    			$("#list").append(
    			'<li class="clearfix w-100b h-50em lh-50em va-jz pl-12em pr-12em border-de-3em">'+
    			'<div class="pull-left w-7em h-7em lh-30em mr-12em text-align">'+
    			'<div class="f-10em">'+(i+1)+'</div>'+
    			'</div>'+
    			'<div class="pull-left mr-8em">'+
    				'<img class="w-30em h-30em bor-ra-50b" src="'+((ret.data[i].communist_avatar!=null)?localStorage.url+ret.data[i].communist_avatar:"../../../statics/images/images_oa/oa_img_head.png")+'">'+
    			'</div>'+
    			'<div class="pull-left h-50em lh-20em w-75b va-jz">'+
    				'<div class="f-12em color-21 pl-8em">'+ret.data[i].communist_name+'</div>'+
    			'</div>'+
    			'<div class="pull-right f-16em color-21">'+ret.data[i].integral+'</div>'+
    			
    			'</li>'
    			)  
    		}
    		
    		
      		  	
    		
    		}
    		
    		}
 				
    		}
			
    	}else{    		    		
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

//打开详情页----------------------------------------------------------------------------------
function openInfo(winName,type,no){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    	no:no
	    },
    });
}

//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}
