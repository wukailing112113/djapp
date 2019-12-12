apiready = function(){
/*---------------------------(api.pageParam.type==1)从定制页面进入---------------------------*/
	if(api.pageParam.type==1){
		welcome_you_made();		
		$(".Reset_bg").removeClass("di-n");//调整兴趣
		$(".Learning_analysis").hide();//学习分析
		$('.Learning_analysis_con').css('marginTop','-2rem');
		//监听下滑事件
		api.addEventListener({
		    name: 'scrolltobottom',
		    extra:{
		        threshold:50   //设置距离底部多少距离时触发，默认值为0，数字类型
		    }
		}, function(ret, err) {
		    $(".top_bg").fadeOut(500);//隐藏背景
		   $(".edu_special_one").fadeOut(500);//隐藏白色写笔记
		   $(".edu_special_tit").fadeOut(500);//隐藏欢迎语
		   $(".edu_special_tab").animate({height:"0rem"},1000);//隐藏table切换
		   $(".edu_special_tab").removeClass("pt-12em").removeClass("pb-12em");
		   $(".edu_special_two").fadeIn(500);//显示白色header
		  $(".edu_special_con").animate({marginTop:"3.5rem"},1000);
		  $(".Reset_bg").addClass("di-n");//调整兴趣
		});
		//向上轻扫事件
		api.addEventListener({
		    name:'swipedown'
		}, function(ret, err){        
		    $(".top_bg").fadeIn();
		   $(".edu_special_one").fadeIn();
		   $(".edu_special_tit").fadeIn();
		   $(".edu_special_tab").fadeIn();
		   $(".edu_special_two").fadeOut();
		   $(".edu_special_tab").animate({height:"100%"},800);//隐藏table切换
		   $(".edu_special_tab").addClass("pt-12em").addClass("pb-12em");
		  $(".edu_special_con").animate({marginTop:"-2rem"},800);
		  $(".Reset_bg").removeClass("di-n");//调整兴趣
		});
		
	}else if(api.pageParam.type==2){
/*---------------------------(api.pageParam.type==2)从专题页面进入---------------------------*/
		welcome_you();//获取个人信息
		$(".Reset_bg").addClass("di-n");//调整兴趣
		$(".Learning_analysis").show();//学习分析
		//监听下滑事件
	api.addEventListener({
	    name: 'scrolltobottom',
	    extra:{
	        threshold:50 
	    }
	}, function(ret, err) {
	    $(".top_bg").fadeOut(500);//隐藏背景
	   $(".edu_special_one").fadeOut(500);//隐藏白色写笔记
	   $(".edu_special_tit").fadeOut(500);//隐藏欢迎语
	   $(".edu_special_tab").animate({height:"0rem"},1000);//隐藏table切换
	   $(".edu_special_tab").removeClass("pt-12em").removeClass("pb-12em");
	   $(".edu_special_two").fadeIn(500);//显示白色header
	  $(".edu_special_con").animate({marginTop:"2rem"},1000);
	});
	//向下轻扫事件
	api.addEventListener({
	    name:'swipedown'
	}, function(ret, err){        
	    $(".top_bg").fadeIn();
	   $(".edu_special_one").fadeIn();
	   $(".edu_special_tit").fadeIn();
	   $(".edu_special_tab").fadeIn();
	   $(".edu_special_two").fadeOut();
	   $(".edu_special_tab").animate({height:"100%"},800);//隐藏table切换
	   $(".edu_special_tab").addClass("pt-12em").addClass("pb-12em");
	  $(".edu_special_con").animate({marginTop:"-3.3rem"},800);
	});
	}
	edu_progress();//获取视频 课件 考试进度百分比
	getEduMaterialVideo();//获取视频的接口
	$(".edu_special_tab li").eq(1).addClass("di-n");
	$(".edu_special_tab li").eq(3).addClass("di-n");
	$(".edu_special_tab li").eq(5).addClass("di-n");
	$(".edu_special_tab li").eq(7).addClass("di-n");
	//alert(api.pageParam.id)
/*---------------------------监听事件-----------------------------------------------*/	
	//接收监听-提交学习笔记
  	api.addEventListener({
           name: 'myEvent_notes'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
              getEduNotesList();
           }
       });
 //接收监听
	 api.addEventListener({
           name: 'myEvent_close'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
           }
       });
       
/*---------------------------视频  课件  考试  笔记   监听事件---------------------------------------------*/	        
        //监听文章返回 刷新页面
	 api.addEventListener({
           name: 'myEvent_learn_info'
       }, function(ret, err) {
           if (ret.value.state == 'no') {  
           edu_progress();           		        
              getEduMaterial();//课件接口
           }
       });   
       //监听视频返回 刷新页面
	 api.addEventListener({
           name: 'myEvent_video_info'
       }, function(ret, err) {
           if (ret.value.state == 'no') {  
           	edu_progress();           		        
              getEduMaterialVideo();//视频接口
           }
       });   
        //监听考试返回 刷新页面
	 api.addEventListener({
           name: 'myEvent_openMyexam'
       }, function(ret, err) {
           if (ret.value.state == 'no') {           
              edu_progress();   
               getEduExamList();//考试接口
           }
       });   
         //监听笔记返回 刷新页面
	 api.addEventListener({
           name: 'myEvent_notes_info'
       }, function(ret, err) {
           if (ret.value.state == 'no') {           
              edu_progress();   
               getEduNotesList();//学习笔记
           }
       });   
      
       

}
var is_exam='3';
var is_notes='';
/*---------------------------获取视频 课件 考试进度百分比---------------------------------------------*/	 
function edu_progress(){
//1定制 2专题
if(api.pageParam.type==2){
	is_customization=2;
}else{
	is_customization=1;
}
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material_percent";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "topic_id":api.pageParam.id,
				"is_customization":is_customization,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){  			
  				$('.video_progress').css("width",ret.data.video.learn_rate);//视频
  				$('.video_no').html(ret.data.video.learn);//视频已学习
  				$('.video_over').html(ret.data.video.residue);//视频剩余
  				$('.article_progress').css("width",ret.data.article.learn_rate);//课件
  				$('.article_no').html(ret.data.article.learn);//课件已学习
  				$('.article_over').html(ret.data.article.residue);//课件剩余
  				$('.exam_progress').css("width",ret.data.exam.learn_rate);//考试
  				$('.exam_no').html(ret.data.exam.learn);//考试已学习
  				$('.exam_over').html(ret.data.exam.residue);//考试剩余
  				$('.notes_progress').css("width",ret.data.notes.learn_rate);//笔记
  				$('.notes_no').html(ret.data.notes.count);//笔记已学习
  				$('.notes_over').html(ret.data.notes.residue);//笔记剩余
  				
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}
/*---------------------------获取专题页欢迎语---------------------------------------------*/
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
	            "type":1
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_con').html(ret.data);
    			$('#communist_con1').html(ret.data1);
    			$('#communist_con').fadeIn();
    			$('#communist_con1').fadeIn();
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}
/*---------------------------获取定制学习欢迎语---------------------------------------------*/
function welcome_you_made(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_topic_data";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	           //"topic_id":api.pageParam.id,
	            "type":3
	        }
	    }
    },function(ret,err){
    	if(ret){   	
    		if(ret.status==1){
    			$('#is_customization').html(ret.data.data);
    			$('#is_customization1').html(ret.data.data1);
    			$('#is_customization2').html(ret.data.data2);
    			
    		}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });

}

/*---------------------------获取视频接口---------------------------------------------*/
function getEduMaterialVideo(){
//alert(api.pageParam.type)
if(api.pageParam.type==2){
//专题传参2
	is_customization=2;
}else{
//定制1
	is_customization=1;
}

$(".edu-more").addClass("di-n");
$(".edu_video").removeClass("di-n");
$(".edu_biji").addClass("di-n");
$(".edu_kaoshi").addClass("di-n");
$(".edu_kejian").addClass("di-n");
$(".edu_special_tab li").eq(0).removeClass("di-n");
$(".edu_special_tab li").eq(1).addClass("di-n");
$(".edu_special_tab li").eq(2).removeClass("di-n");
$(".edu_special_tab li").eq(3).addClass("di-n");
$(".edu_special_tab li").eq(4).removeClass("di-n");
$(".edu_special_tab li").eq(5).addClass("di-n");
$(".edu_special_tab li").eq(6).removeClass("di-n");
$(".edu_special_tab li").eq(7).addClass("di-n");
	$('#list>div').remove();
	$("#list").css('display','none'); 
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				'type':21,
				'pagesize':5,   //获取视频的数量
				'page':1,
				'topic_id':api.pageParam.id,
				"communist_no":localStorage.user_id,
				"is_customization":is_customization,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){				
				if(ret.data&&ret.data.length>0){
				$(".ske").addClass("di-n");				
			    	//alert($('#list>div').length)
    				//添加专题视频
					for(var i=0;i<ret.data.length;i++){					
						$('#list').append(
						'<div>'+
						'<li class="clearfix w-93b va-jz over-h bb-1-f0 pb-12em pt-12em ml-12em mr-12em" onclick="openInfo(\'edu_learn_videoInfo_header\','+ret.data[i].material_id+')">'+
				'<div class="pull-left mr-12em w-130em h-72em over-h">'+
					'<img class="w-130em h-72em bor-ra-2em" src="'+((ret.data[i].material_thumb!=null)?localStorage.url+ret.data[i].material_thumb:"../../../statics/images/images_edu/edu_special_video1.png")+'">'+
				'</div>'+
				'<div class="pull-left w-100b">'+
					'<div class="f-14em color-21 over-h h-55em">'+InterceptField(ret.data[i].material_title,'无标题',25)+'</div>'+
					'<div class="clearfix">'+
						'<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
						'<div class="pull-right color-a4 f-11em">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
					'</div>'+
				'</div>'+
			'</li>'+						
		'</div>'	
						)
						
					}
					$("#list").fadeIn("slow");
				}
			}else{
			
				$(".edu-more").removeClass("di-n");
				$(".ske").addClass("di-n");
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}
/*---------------------------获取课件接口---------------------------------------------*/
function getEduMaterial(){
//1定制 2专题
if(api.pageParam.type==2){
	is_customization=2;
}else{
	is_customization=1;
}
//$(".header_list_active").animate({marginLeft:"-2rem"});
$(".edu-more").addClass("di-n");
$(".edu_biji").addClass("di-n");
$(".edu_kaoshi").addClass("di-n");
$(".edu_video").addClass("di-n");
$(".edu_kejian").removeClass("di-n");
$(".edu_special_tab li").eq(0).addClass("di-n");
$(".edu_special_tab li").eq(1).removeClass("di-n");
$(".edu_special_tab li").eq(2).addClass("di-n");
$(".edu_special_tab li").eq(3).removeClass("di-n");
$(".edu_special_tab li").eq(4).removeClass("di-n");
$(".edu_special_tab li").eq(5).addClass("di-n");
$(".edu_special_tab li").eq(6).removeClass("di-n");
$(".edu_special_tab li").eq(7).addClass("di-n");
$('#list>div').remove();
$("#list").css('display','none'); 
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				'type':11,
				'pagesize':7,   //获取文章数量
				'page':1,
				'topic_id':api.pageParam.id,
				"communist_no":localStorage.user_id,
				"is_customization":is_customization,
				
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
			
					//$('#articleBox').removeClass('di-n');
					//添加专题课件
					for(var i=0;i<ret.data.length;i++){	
						$('#list').append(
							'<div>'+
						'<li class="clearfix w-93b va-jz over-h bb-1-f0 pb-12em pt-12em ml-12em mr-12em" onclick="openInfo(\'edu_learn_info_header\','+ret.data[i].material_id+')">'+
				'<div class="pull-left mr-12em w-130em h-72em over-h">'+
					'<img class="w-130em h-72em bor-ra-2em" src="'+((ret.data[i].material_thumb!=null)?localStorage.url+ret.data[i].material_thumb:"../../../statics/images/images_edu/edu_special_default.png")+'">'+
				'</div>'+
				'<div class="pull-left w-100b">'+
					'<div class="f-14em color-21 h-55em over-h">'+InterceptField(ret.data[i].material_title,'无标题',25)+'</div>'+
					'<div class="clearfix">'+
						'<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'0')+'</div>'+
						'<div class="pull-right color-a4 f-11em">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
					'</div>'+
				'</div>'+
			'</li>'+		
			'</div>'	
						)		
					}
					$("#list").fadeIn("slow");
					
				}else{
				
				}
			}else{
					$(".edu-more").removeClass("di-n");
				//$('#articleBox').addClass('di-n');
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}


/*---------------------------获取考试接口---------------------------------------------*/
//模拟考试3  没考1  考过2
function getEduExamList(){
if(api.pageParam.type==2){
	is_customization=2;
}else{
	is_customization=1;
}
//alert(is_customization)
//$(".header_list_active").animate({marginLeft:"1rem"});
$(".edu-more").addClass("di-n");
$(".edu_biji").addClass("di-n");
$(".edu_kejian").addClass("di-n");
$(".edu_video").addClass("di-n");
$(".edu_special_tab li").eq(0).addClass("di-n");
$(".edu_special_tab li").eq(1).removeClass("di-n");
$(".edu_special_tab li").eq(2).removeClass("di-n");
$(".edu_special_tab li").eq(3).addClass("di-n");
$(".edu_special_tab li").eq(4).addClass("di-n");
$(".edu_special_tab li").eq(5).removeClass("di-n");
$(".edu_special_tab li").eq(6).removeClass("di-n");
$(".edu_special_tab li").eq(7).addClass("di-n");
$('#list>div').remove();
$("#list").css('display','none'); 
	var url = localStorage.url+"/Api/Edu/get_edu_exam_list";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		'communist_no':localStorage.user_id,
	            'topic_id':api.pageParam.id,
	            'is_exam':is_exam,
	            'page':1,//条数
				'pagesize':10,//页数
				"is_customization":is_customization,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		
    		$(".edu_kaoshi").removeClass("di-n");
    			if(ret.data&&ret.data.length>0){
    				//$('#examBox').removeClass('di-n');
	    			for(var i=0;i<ret.data.length;i++){
	    			//正式
	    				if(is_exam==1){
	    				$('#list').append(
	    				'<div>'+
						'<li class="clearfix w-93b va-jz over-h bb-1-f0 pb-12em pt-12em ml-12em mr-12em" onclick="openExamList(\'edu_exam_official\','+ret.data[i].exam_id+','+ret.data[i].exam_time+',1)">'+
				'<div class="pull-left mr-12em w-130em h-72em over-h">'+
					'<img class="w-130em h-72em bor-ra-2em" src="'+((ret.data[i].exam_thumb!=null)?localStorage.url+ret.data[i].exam_thumb:"../../../statics/images/images_edu/edu_special_video1.png")+'">'+
				'</div>'+
				'<div class="pull-left w-100b">'+
					'<div class="f-14em color-21 h-55em over-h">'+InterceptField(ret.data[i].exam_title,'无标题',25)+
					'</div>'+
					'<div class="clearfix">'+
'<div class="pull-left color-a4 f-11em">'+'时长:'+clearNull(ret.data[i].exam_time,'0')+'分钟'+'/'+ret.data[i].questions_num+'大题'+'</div>'+
						'<div class="pull-right color-a4 f-11em">'+((ret.data[i].exam_date).substring(0,10))+'</div>'+
					'</div>'+
				'</div>'+
			'</li>'+
						
'</div>'
		  )
	    				}else if(is_exam==3){
	    				//模拟
	    				$('#list').append(
	    				'<div>'+
						'<li class="clearfix w-93b va-jz over-h bb-1-f0 pb-12em pt-12em ml-12em mr-12em" onclick="openExamList(\'edu_exam_info\','+ret.data[i].exam_id+','+ret.data[i].exam_time+',1)">'+
				'<div class="pull-left mr-12em w-130em h-72em over-h">'+
					'<img class="w-130em h-72em bor-ra-2em" src="'+((ret.data[i].exam_thumb!=null)?localStorage.url+ret.data[i].exam_thumb:"../../../statics/images/images_edu/edu_special_video1.png")+'">'+
				'</div>'+
				'<div class="pull-left w-100b">'+
					'<div class="f-14em color-21 h-55em over-h">'+InterceptField(ret.data[i].exam_title,'无标题',25)+
					'</div>'+
					'<div class="clearfix">'+
'<div class="pull-left color-a4 f-11em">'+'时长:'+clearNull(ret.data[i].exam_time,'0')+'分钟'+'/'+ret.data[i].questions_num+'大题'+'</div>'+
						'<div class="pull-right color-a4 f-11em">'+((ret.data[i].exam_date).substring(0,10))+'</div>'+
					'</div>'+
				'</div>'+
			'</li>'+
						
'</div>'
		  )
	    				}else if(is_exam==2){
		  //$('#list div').remove();
		  	$('#list').append(
	    				'<div>'+
						'<li class="clearfix w-93b va-jz over-h bb-1-f0 pb-12em pt-12em ml-12em mr-12em" onclick="openExamList(\'edu_exam_attend\','+ret.data[i].exam_id+','+ret.data[i].exam_time+',1)">'+
				'<div class="pull-left mr-12em w-130em h-72em over-h">'+
					'<img class="w-130em h-72em bor-ra-2em" src="'+((ret.data[i].exam_thumb!=null)?localStorage.url+ret.data[i].exam_thumb:"../../../statics/images/images_edu/edu_special_video1.png")+'">'+
				'</div>'+
				'<div class="pull-left w-100b clearfix">'+
					'<div class="f-14em pull-left color-21 over-h">'+InterceptField(ret.data[i].exam_title,'无标题',25)+
					'</div>'+
					'<div class="f-8em text-center edu-kaoshi-bg pull-right  color-ff4040">'+'得分:'+InterceptField(ret.data[i].log_score,'无标题',25)+
					'</div>'+
					'<div class="clearfix">'+
						'<div class="pull-left color-a4 f-11em">'+'时长:'+clearNull(ret.data[i].exam_time,'0')+'分钟'+'/'+ret.data[i].questions_num+'大题'+'</div>'+
						'<div class="pull-right color-a4 f-11em">'+((ret.data[i].exam_date).substring(0,10))+'</div>'+
					'</div>'+
				'</div>'+
			'</li>'+
						
'</div>'
		  )
		  }
		  
	    			}
	    			$("#list").fadeIn("slow");
	    		}
    			api.hideProgress();//隐藏进度提示框
    		}else{
    			$(".edu_kaoshi").removeClass("di-n");
    			$(".edu-more").removeClass("di-n");
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


/*---------------------------获取笔记接口---------------------------------------------*/
// 视频笔记=1  课件笔记=2 全部或其他为空
function getEduNotesList(){
if(api.pageParam.type==2){
	is_customization=2;
}else{
	is_customization=1;
}
//$(".header_list_active").animate({marginLeft:"4rem"});
$(".edu_biji").removeClass("di-n");
$(".edu-more").addClass("di-n");
$(".edu_kaoshi").addClass("di-n");
$(".edu_kejian").addClass("di-n");
$(".edu_video").addClass("di-n");
$(".edu_special_tab li").eq(0).addClass("di-n");
$(".edu_special_tab li").eq(1).removeClass("di-n");
$(".edu_special_tab li").eq(2).removeClass("di-n");
$(".edu_special_tab li").eq(3).addClass("di-n");
$(".edu_special_tab li").eq(4).removeClass("di-n");
$(".edu_special_tab li").eq(5).addClass("di-n");
$(".edu_special_tab li").eq(6).addClass("di-n");
$(".edu_special_tab li").eq(7).removeClass("di-n");
$('#list>div').remove();
$("#list").css('display','none'); 
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				'topic_id':api.pageParam.id,
				"communist_no":localStorage.user_id,
				"page":1,
				"pagesize":6,
				"is_notes":is_notes,
				"is_customization":is_customization,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){
					if(ret.data[i].type_video=='no'){
						$('#list').append(
						'<div class="clearfix pl-12em pr-12em w-100b po-re" onclick="openScene_infowin(\'edu_notes_info_header\','+ret.data[i].notes_id+')">'+
						'<div class="pull-left pl-12em w-20b pt-0em mt-5mem color-21">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
						'<div class="edu_line pull-left h-100b hr-sr-de po-ab left-80em top-0em"></div>'+
						'<div class="edu-quan bg-color-ff4733 box-sha-3em w-12em h-12em po-ab top-0em left-75em bor-ra-50b"></div>'+
					'<div class="pull-right h-70em bor-ra-25em border-3em clearfix w-70b pl-8em va-jz mt-18mem mb-10em">'+
					'<div class="pull-left w-65b">'+
					'<div class="f-14em color-12">'+(InterceptField(ret.data[i].notes_title,'无',15))+'</div>'+
					'<div class="f-10em color-a4">'+(InterceptField(ret.data[i].notes_type_name,'无',10))+'</div>'+

						'</div>'+
						'<div class="pull-right">'+
						'<img class="w-70em h-52em bor-ra-25em over-h" src="'+((ret.data[i].notes_thumb!=null)?localStorage.url+ret.data[i].notes_thumb:"../../../statics/images/images_edu/edu_special_learn1.png")+'">'+
						'</div>'+
						'</div>'+
						'</div>'
						)
					}else{
						$('#list').append(
						'<div class="clearfix pl-12em pr-12em w-100b po-re" onclick="openScene_infowin(\'edu_notes_info_header\','+ret.data[i].notes_id+')">'+
						'<div class="pull-left pl-12em w-20b pt-0em mt-5mem color-21">'+((ret.data[i].add_time).substring(0,10))+'</div>'+
						'<div class="edu_line pull-left h-100b hr-sr-de po-ab left-80em top-0em"></div>'+
						'<div class="edu-quan bg-color-376bf5 box-sha-31em w-12em h-12em po-ab top-0em left-75em bor-ra-50b"></div>'+
					'<div class="pull-right h-70em bor-ra-25em border-3em clearfix w-70b pl-8em va-jz mt-18mem mb-10em">'+
					'<div class="pull-left w-65b">'+
					'<div class="f-14em color-12">'+(InterceptField(ret.data[i].notes_title,'无',15))+'</div>'+
					'<div class="f-10em color-a4">'+(InterceptField(ret.data[i].notes_type_name,'无',10))+'</div>'+

						'</div>'+
						'<div class="pull-right">'+
						'<img class="w-70em h-52em bor-ra-25em over-h" src="'+((ret.data[i].notes_thumb!=null)?localStorage.url+ret.data[i].notes_thumb:"../../../statics/images/images_edu/edu_special_learn1.png")+'">'+
						'</div>'+
						'</div>'+
						'</div>'
						)
					}

						
					}
				$("#list").fadeIn("slow");
				}
			}else{
				$(".edu-more").removeClass("di-n");
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}


/*---------------------------提交日常笔记接口---------------------------------------------*/
function setEduNotes(){
	//获取上传列表id
	var notice_attach="";
	$("input[name='file_no']").each(function(){
	if(notice_attach==""){
		notice_attach=notice_attach+$(this).val()
	}else{
		notice_attach=notice_attach+","+$(this).val()
		}
	})
	var url = localStorage.url+"/index.php/Api/Edu/set_edu_notes";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//提交人编号
	            "notes_title":$('#notes_title').val(),//笔记标题
	            "notes_type":3,//笔记类型
	            "topic_type":api.pageParam.id,//专题类型
	            "notes_content":$('#notes_content').val(),//笔记内容
	            "notes_thumb":notice_attach,//图片
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){    			
    			//发送监听
		         api.sendEvent({
		               name: 'myEvent_notes',
		               extra: {
		                   state: 'no'
		               }
		           });
				$(".daily_notes_mask").addClass("di-n");
				//alert('提交成功');
				//api.closeWin({});
			}
			else{
				api.toast({msg: ret.msg,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}


//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}
$('#tabBox2').find('li').click(function(){
	$('#list').html('');
	$('#tabBox2').find('li').removeClass('tabBox2-active').find('.active').hide();
	$(this).addClass('tabBox2-active').find('.active').show();
	is_exam = $(this).attr('num');
	//page=1;
	getEduExamList();
})
$('#tabBox3').find('li').click(function(){
	$('#list').html('');
	$('#tabBox3').find('li').removeClass('tabBox2-active').find('.active').hide();
	$(this).addClass('tabBox2-active').find('.active').show();
	is_notes = $(this).attr('num');
	//page=1;
	getEduNotesList();
})
$('#tabBox4').find('li').click(function(){
	$('#list').html('');
	$('#tabBox4').find('li').removeClass('tabBox2-active').find('.active').hide();
	$(this).addClass('tabBox2-active').find('.active').show();
	is_num = $(this).attr('num');
	if(is_num==1){
		getEduMaterialVideo();
	}else if(is_num==2){
		getEduMaterial();
	}else if(is_num==3){
		getEduExamList();
	}else{
		getEduNotesList();
	}
})

//打开更多页面--------------------------------------------------------------
function openlearn_type_list(winName,type){
	api.openWin({
		name: winName,
		url: 'header/' + winName + '.html',
		pageParam:{
			id:api.pageParam.id,
			type:type,
		}
	})
}
//进入考试详情
function openExamList(winName, id, time,type) {
	$api.setStorage('exam_time',60 * time);	
	api.openWin({
		name: winName,
		//url: './' + winName + '.html',
		url: '../edu_exam/' + winName + '.html',
		pageParam: {
			id:id,
			time:time,
			type:type
		}
	});
}
//打开学习笔记页面-------------------------------------------------------------
function openScene_infowin(winName,type){
	api.openWin({
		name: winName,
		url: '../edu_notes/header/' + winName + '.html',
		pageParam:{
			type:type,
		}
	})
}

//打开考试详情页面------------------------------------------------------------
function openExam_infowin(winName,type,no){
	api.openWin({
		name: winName,
		url: '../edu_exam/header/' + winName + '.html',
		pageParam:{
			type:type,
			no:no
		}
	})
}

//打开专题课件与专题视频详情页面------------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
		name: winName,
		url: '../edu_learn/header/' + winName + '.html',
		pageParam:{
			type:type,
		}
	})
}
//打开写笔记页面------------------------------------------------------------
function open_daily_notes(winName,type){
	api.openWin({
		name: winName,
		url: '../edu_notes/header/' + winName + '.html',
		pageParam:{
			type:type,
		}
	})
}
//打开学习分析页面----------------------------------
function edu_exam_analysis(winName,id) {
	api.openWin({
		name: winName,
		url: '../edu_exam/header/' + winName + '.html',
		reload: true,
		pageParam: {
			//id:api.pageParam.id,
			id:api.pageParam.id,
		}
	})
}

$(".daily_notes").click(function(){
	$(".daily_notes_mask").removeClass("di-n");
})
//关闭遮罩层
$(".daily_mask_close").click(function(){
	//api.closeWin({});
	$(".daily_notes_mask").hide();
	//发送监听
    	  api.sendEvent({
		  name: 'myEvent_close',
		    extra: {
	            state: 'no'
	           }
          });

});
/*---------------------------重新调整兴趣接口---------------------------------------------*/
$(".Reset_bg").click(function(){
	var url = localStorage.url+"/index.php/Api/Edu/edu_customization_group_data";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {
			values: { 
			"communist_no":localStorage.user_id,
			"type":1,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				//发送监听
	    	  api.sendEvent({
			  name: 'myEvent_two',
			    extra: {
			            state: 'no'
			        }
	          });
				api.closeWin();
					
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
})








