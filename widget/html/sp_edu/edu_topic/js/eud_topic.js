apiready = function () {
    openPullRefresh("exec()");//下拉刷新
   is_customization();//判断是否定制学习模块   
	getConfig();//加载配置文件
	getEduTopicList();//获取专题课件	
	getEduNotesList();//获取学习实况
	getEdu_obj(1);//获取学习任务接口
	var mydate = new Date();
	var mydate_first=mydate.getFullYear()+'-'+(mydate.getMonth()+1)+'-'+mydate.getDate();
	ready_fun_first(mydate_first);//第一次进入页面学习笔记接口
	//接收调整兴趣监听
	 api.addEventListener({
           name: 'myEvent_two'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
           }
       });
	//接收定制遮罩层监听
	 api.addEventListener({
           name: 'myEvent_mask'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               mask_back();
           }
       });


}
//判断是否定制学习模块
function is_customization(){
	var url = localStorage.url+"/index.php/Api/Edu/customization_off_no";
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
				if(ret.data==1){
					getEdu_pross();//进度条接口
					$(".edu_made").removeClass("di-n");//出现进度条				
					$(".edu_made_first").addClass("di-n");//关闭定制按钮
				}
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//获取专题课件接口
function getEduTopicList(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_topic_list";
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
    		if(ret.status){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
	    			var learn_rate=ret.data[i].learn_rate;
	    			if(learn_rate==0){
	    				learn_rate=0.000000000001;
	    			}
	    				var urlPath = ret.data[i].img_url;
	    				$('.swiper-wrapper').append(
						'<div class="swiper-slide">'+
						'<div class="shyk mt-20em over-h" onclick="openTwostudiesWin(\'edu_special_twostudies_header\','+ret.data[i].topic_id+',\''+urlPath+'\',2)">'+	
						'<img class="w-100b h-180em over-h pl-5em pr-5em pt-5em bor-ra-5em" src="'+((urlPath!=null)?localStorage.url+urlPath:"../../../statics/images/images_edu/edu_two_learn.png")+'" class="main-img">'+
						'<div class="clearfix pl-15em pr-15em pt-10em">'+
						'<div class="pull-left f-16em color-212121">'+clearNull(ret.data[i].topic_title,"无标题")+'</div>'+
						'<div class="pull-right">'+
								'<div class="pull-left">'+
									'<div class="circleChart'+i+' pt-4em" id="circle1" data-rate="'+ret.data[i].learn_rate+'"></div>'+
								'</div>'+
								'<div class="pull-right f-12em color-9e pl-5em">'+
									'<div>已学习</div>'+
									'<div>'+ret.data[i].learn_rate+'%</div>'+
								'</div>'+							
								'</div>'+			
								'</div>'+
							'</div>'+
						 '</div>'							
				    		)
			$(".gjp").hide();
			//圆形进度条效果
			$(".circleChart"+i).circleChart({			
				      color: "#ff404d",
					  backgroundColor: "#e2e2e2",//进度条之外颜色
					  background: true, // 是否显示进度条之外颜色
					  widthRatio: 0.2,//进度条宽度
					  size: 60,//圆形大小
				      value: learn_rate,//进度条占比
				      startAngle: 180,//开始点
				      speed: 3000,
				     // text: true,//圆圈内文字
				      animation: "easeInOutCubic",
				      onDraw: function(el, circle) {				     
			       		 circle.text(Math.round(circle.value) + "%"); // 根据value修改text
 
			    	  }
			
			   });
			   //进度条效果结束	
				}
	    			
	    			//学习模块轮播图 js   
					var mySwiper = new Swiper('.swiper-container',{
						  slidesPerView : 1.8,
						  spaceBetween: 5,
						  centeredSlides : true,
						  watchSlidesProgress: true,
						  pagination : '.swiper-pagination',
						  paginationClickable: true,
					
						  onProgress: function(swiper){
			
					      },
					
					     onSetTransition: function(swiper, speed) {
					      	for (var i = 0; i < swiper.slides.length; i++) {
									es = swiper.slides[i].style;
									es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
							}
					
					      }
			  });
			//学习模块轮播图end    			
	    			
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


//刷新页面
function exec(){
	location.reload();
}


//打开在线党校模块
function openLearn(winName,type){
	api.openWin({
	    name: winName,
	    url: '../edu_learn/header/'+winName+'.html',
	    pageParam:{
	    	"type":type
	    }
    });
}

//打开专题学习模块
function openMask(winName){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    
    });
}
function openTwostudiesWin(winName,id,url,type){
	localStorage.exam_flag = type;
	localStorage.topic_type = id;
	api.openWin({
		name:winName,
		url:"../edu_special/header/"+winName+".html",
		pageParam:{
    		id:id,
    		url:url,
    		type:type,
		},
	})
}
//打开考试中心模块
function openExam(winName){
	api.openWin({
	    name: winName,
	    url: '../edu_exam/header/'+winName+'.html',
	    
    });
}

//打开党员投稿模块
function openWriting(winName){
	api.openWin({
	    name: winName,
	    url: '../edu_writing/header/'+winName+'.html',
	    
    });
}

//第一次进入页面获取学习笔记接口
function ready_fun_first(mydate_first){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "page":page,
	            "pagesize":10,
	            "note_time":mydate_first,
	            "notes_type":1,//只查学习笔记
	            "type":1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		$('#testView .no_more').hide();
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){	    			
		    			$('#testView').append(
		    				'<li class="over-h ml-12em" onclick="openInfo(\'edu_notes_info_header\','+ret.data[i].notes_id+')">'+
								'<div class="pull-left w-20b po-re pb-20em">'+
									'<p class="f-12em lh-24em pl-20em pt-4em color-9e">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</p>'+
									'<img class="po-ab top-0em right-f13em wh-24em bor-ra-100b" src="../../../statics/images/images_edu/notes_time.png" alt="" />'+
								'</div>'+
								'<div class="pull-left bj_bj w-80b bl-1-dedede pt-8em pl-8em">'+
									'<p class="f-14em color-212121 mb-5em pl-20em f-w">'+clearNull(ret.data[i].notes_title,'无标题').substring(0,10)+'</p>'+
									'<p class="f-10em pull-left fcolor-66 pb-8em pl-20em">['+clearNull(ret.data[i].notes_type_name,'其他')+']</p>'+
									'<p class="f-10em pull-right fcolor-66 pb-8em pr-10em">'+clearNull(ret.data[i].add_time,'')+'</p>'+
								'</div>'+
							'</li>'
		    			)}	
		    			$("#testView").fadeIn("slow");
		    	}
		    	$(".ske").addClass('di-n');
			}else{
				//无数据
				$('#testView').fadeIn();
				if($('#testView h1').length>0){
					$('#testView h1').remove();
					$('#testView').append('<h1 class="no_more f-12em color-66 pb-10em w-100b text-center">今天没有学习笔记哦~</h1>');
				}else{
					$('#testView').append('<h1 class="no_more f-12em color-66 pb-10em w-100b text-center">今天没有学习笔记哦~</h1>');
				}
				
				$(".ske").addClass('di-n');
			}			
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
	   
	
}
/*日历切换获取学习笔记接口********************************************/
function ready_fun(this_data){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_notes_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,
	            "page":page,
	            "pagesize":10,
	            "note_time":this_data,
	            "notes_type":1,//只查学习笔记
	            "type":1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		$('#testView .no_more').hide();
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){	    			
		    			$('#testView').append(
		    				'<li class="over-h ml-12em" onclick="openInfo(\'edu_notes_info_header\','+ret.data[i].notes_id+')">'+
								'<div class="pull-left w-20b po-re pb-20em">'+
									'<p class="f-12em lh-24em pl-20em pt-4em color-9e">'+clearNull(ret.data[i].add_time,'0').substring(0,10)+'</p>'+
									'<img class="po-ab top-0em right-f13em wh-24em bor-ra-100b" src="../../../statics/images/images_edu/notes_time.png" alt="" />'+
								'</div>'+
								'<div class="pull-left bj_bj w-80b bl-1-dedede pt-8em pl-8em">'+
									'<p class="f-14em color-212121 mb-5em pl-20em f-w">'+clearNull(ret.data[i].notes_title,'无标题').substring(0,10)+'</p>'+
									'<p class="f-10em pull-left fcolor-66 pb-8em pl-20em">['+clearNull(ret.data[i].notes_type_name,'其他')+']</p>'+
									'<p class="f-10em pull-right fcolor-66 pb-8em pr-10em">'+clearNull(ret.data[i].add_time,'')+'</p>'+
								'</div>'+
							'</li>'
		    			)}	
		    			$("#testView").fadeIn("slow");
		    	}
		    	$(".ske").addClass('di-n');
		    	
			}else{
				//暂无数据
				$('#testView').fadeIn();
				if($('#testView h1').length>0){
					$('#testView h1').remove();
					$('#testView').append('<h1 class="no_more f-12em color-66 pb-10em w-100b text-center">今天没有学习笔记哦~</h1>');
				}else{
					$('#testView').append('<h1 class="no_more f-12em color-66 pb-10em w-100b text-center">今天没有学习笔记哦~</h1>');
				}
				
				$(".ske").addClass('di-n');
				
			}			
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
	   

}

//日历插件*******************************************
//初始化日历插件
var page=1;
laydate.render({
 	elem: '#test2'
 	,lang: 'cn'
  	,position: 'static'
 	,min: -4 //5天前
  	,max: 0 //7天后
    ,type: 'date' //默认，可不填
    ,format: 'M月d日' //日期组合方式 可任意组合
     //传入Date对象给初始值
	//,value: '2018-08-18' //参数即为：2018-08-20 20:08:08 的时间戳
	,isInitValue: true //是否允许填充初始值，默认为 true
	,show: true //直接显示
	,position: 'static'
  	,showBottom: false//是否显示底部栏
 	 //一、控件初始打开的回调
 	  ,ready: function(date){ 	 	
 	  	//lay('#testView').html(1);//切换日期时显示的值	
 	    $(".layui-laydate-header").addClass('di-n');//隐藏header
 	  	$('.layui-laydate-content>table>thead>tr').hide();//隐藏周一到周日
 	  	//隐藏5天之外
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');					
				}
 	  		//遍历td 添加月份
			$("table td").each(function(index,item){				
		    if($(this).hasClass("laydate-day-next")){
			    $(this).html((date.month+1)+'月'+$(this).text()+'日');//下月
			  }else if($(this).hasClass("laydate-day-prev")){
			      $(this).html((date.month-1)+'月'+$(this).text()+'日');//上月
			  }else{
			  	 $(this).html(date.month+'月'+$(this).text()+'日');//当前月份
			  }		    
		  });
		//ready_fun_first(mydate_first);
		//$('#testView').html(1);
 		 }
 	//二、日期时间被切换后的回调
	,change: function(value, date, endDate){
	var this_data=date.year+'-'+date.month+'-'+date.date;
	$("#testView").hide();
	$(".ske").removeClass('di-n');//骨架屏
	//$(".layui-laydate .layui-this")
	 if($('#testView li').length>0){
		  $('#testView li').remove();
		 }
		 	//监听日期被切换
		 	//lay('#testView').html(value);//切换日期时显示的值		 	
		 	$(".layui-laydate-header").addClass('di-n');//隐藏header
 	  	$('.layui-laydate-content>table>thead>tr').hide();//隐藏周一到周日
 	  		if($(".layui-laydate-content tr td").hasClass('laydate-disabled')){
					$('.laydate-disabled').addClass('di-n');//隐藏5天之外
				}
			//遍历td 添加月份
			$("table td").each(function(index,item){				
		    if($(this).hasClass("laydate-day-next")){
			    $(this).html((date.month+1)+'月'+$(this).text()+'日');//下月
			  }else if($(this).hasClass("laydate-day-prev")){
			      $(this).html((date.month-1)+'月'+$(this).text()+'日');//上月
			  }else{
			  	 $(this).html(date.month+'月'+$(this).text()+'日');//当前月份
			  }		    
		  });

		 ready_fun(this_data);//获取学习笔记
		 	
	   
	  
	  }
			
			
	  
	});
//日历插件结束
//学习实况的接口
function getEduNotesList(){
	var url = localStorage.url+"/index.php/Api/Publicize/get_cms_article_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"cat_id":'19',
	            "page":1,
	            "pagesize":10
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					$('#liveBox').removeClass('di-n');
					//添加学习实况
					for(var i=0;i<ret.data.length;i++){
						$('#notes_list').append(
							'<li class="over-h bb-1-e6e6e6 pb-12em pt-12em" onclick="openPartyWorkInfo(\'cms_partyWork_info_header\','+ret.data[i].article_id+')">'+
								'<div class="pull-left w-97em h-73em">'+
									'<img class="w-97em h-73em bor-ra-2em" src='+((ret.data[i].article_thumb!=null)?(localStorage.url+ret.data[i].article_thumb):"../../../statics/images/images_edu/edu_special_learn1.png")+'>'+
								'</div>'+
								'<div class="pull-left over-h w-217em ml-13em">'+									
				                    '<div class="pull-left w-217em mt-0em">'+
				                        '<div class="f-14em color-12 h-58em f-w">'+InterceptField(ret.data[i].article_title,'无标题',25)+'</div>'+
				                        '<div class="pull-left color-a4 f-11em">'+clearNull(ret.data[i].add_staff,'无')+'</div>'+
				                        '<div class="pull-right color-a4 f-11em">'+clearNull(ret.data[i].add_time,'0')+'</div>'+
				                    '</div>'+
				               '</div>'+
							'</li>'

							
						)
					}
				
				}
			}else{
				$('#liveBox').addClass('di-n');
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}
$(".edu_fresh").click(function(){
	getEdu_pross();
});
//获取页面进度条接口
function getEdu_pross(){
	var url = localStorage.url+"/index.php/Api/Edu/edu_customization_group_data";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {
			values: { 
				"communist_no":localStorage.user_id,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				$('.article_progress').css("width",ret.data.article.learn_rate+"%");//文章进度条
				$('.article_num').html(ret.data.article.num);//总数  	
				$('.article_learn').html(ret.data.article.learn);//已学
				
				$('.video_progress').css("width",ret.data.video.learn_rate+"%");//视频进度条
				$('.video_num').html(ret.data.video.num);//总数  	
				$('.video_learn').html(ret.data.video.learn);//已学
				
				$('.exam_progress').css("width",ret.data.exam.learn_rate+"%");//考试进度条
				$('.exam_num').html(ret.data.exam.num);//总数  	
				$('.exam_learn').html(ret.data.exam.learn);//已学
				
				$('.notes_progress').css("width",ret.data.notes.learn_rate+"%");//笔记进度条
				$('.notes_num').html(ret.data.notes.num);//总数  	
				$('.notes_learn').html(ret.data.notes.learn);//已学
				
				
			}
		}else{
			//api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

/*———————————————————————————获取学习任务接口———————————————————————————————————————————————**/
function getEdu_obj(type_obj){
//object：1党员   2部门组织
	var url = localStorage.url+"/Api/Edu/edu_task_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {
			values: { 
				"communist_no":localStorage.user_id,
				"object":type_obj,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
			for(var i=0;i<ret.data.length;i++){	
				$('#list_obj').append(
				'<li class="clearfix h-40em lh-40em bb-3em-e6 pl-12em pr-12em" onclick="openedu_obj(\'edu_topic_list1_header\','+ret.data[i].task_id+')">'+
					'<div class="pull-left f-14em h-55em over-h color-12 w-75b over-h">'+InterceptField(ret.data[i].task_title,'无任务',25)+'</div>'+
					'<div class="color-a4 f-12em pull-right">'+ret.data[i].end_time+'</div>'+
				'</li>'
				
				)
			}
				
				
			}
		}else{
			//api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//打开详情页---------------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: '../edu_notes/header/'+winName+".html",
	    pageParam:{
	    	type:type,
	    }
    });
}


//打开学习实况页面
function openPartyWorkInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}
function openPartyWork(winName,type){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    }
    });
}
//打开专题学习模块
function openSpecial(winName){
	api.openWin({
	    name: winName,
	    url: '../edu_special/header/'+winName+'.html',
	    
    });
}
//个性化定制>遮罩层
function mask_back(){
	getEdu_pross();
	$(".edu_made").removeClass("di-n");
	$(".edu_made_first").addClass("di-n");
}

//学习笔记更多**********************************************************
function openNotes(winName,type){
	api.openWin({
	    name: winName,
	    url: '../edu_notes/header/'+winName+'.html',
	    pageParam:{			
			type:type,
		}
    });
}

//打开学习实况页面--------------------------------------------------------------
function openlearn_type_list(winName,type){
	api.openWin({
		name: winName,
		url: '../edu_special/header/'+winName+'.html',
		pageParam:{
			id:api.pageParam.id,
			type:type,
		}
	})
}
//打开学习任务页面
function openedu_obj(winName,id){
	api.openWin({
	    name: winName,
	    url: './header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    }
    });
}
$('#tabBox2').find('li').click(function(){
	$('#list_obj').html('');
	$('#tabBox2').find('li').removeClass('color-e84044').addClass('color-212121');
	$(this).addClass('color-e84044').removeClass('color-212121');
	status = $(this).attr('num');
	if(status==1){
		getEdu_obj(1);//获取学习任务接口
	}else{
		getEdu_obj(2);//获取学习任务接口
	}
})


/**————————————————————————聊天功能——————————————————————————————————————————*/
function group_chat(winName){	
//打开另一个页面
	api.openWin({
	    name: winName,
	    url: '../../sp_chat/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });

}











