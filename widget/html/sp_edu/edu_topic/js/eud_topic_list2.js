apiready = function () {
    openPullRefresh("exec()");//下拉刷新 
	getConfig();//加载配置文件
	
	getEdu_obj(1);//获取学习任务接口
	//接收监听
	 api.addEventListener({
           name: 'myEvent_xw1'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
           }
       });
       //接收监听
	 api.addEventListener({
           name: 'myEvent_xw2'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
           }
       });
        //接收监听
	 api.addEventListener({
           name: 'myEvent_xw3'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
           }
       });
        //接收监听
	 api.addEventListener({
           name: 'myEvent_xw4'
       }, function(ret, err) {
           if (ret.value.state == 'no') {
               exec();
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




/*———————————————————————————获取学习任务接口———————————————————————————————————————————————**/
function getEdu_obj(type_obj){
//object：1党员   2部门组织
	var url = localStorage.url+"/Api/Edu/edu_task_list_more";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {
			values: { 
				"communist_no":localStorage.user_id,
				"task_id":api.pageParam.id,
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
//			alert(ret.data.task_id)
			/**——————————————————文章————————————————————————————————*/			
			for(var i=0;i<ret.data.article.list.length;i++){
			var status1;
			if(ret.data.article.list[i].status==0){
				//未进行
				status1='<div class="color-red">未进行</div>';
			}else{
				status1='<div class="color-green">进行中</div>';
			}	
				$('#list_obj_article').append(
				'<li class="clearfix h-55em bb-3em-e6 pl-12em pr-12em over-h" onclick="openedu_article_info(\'edu_learn_info_header\','+ret.data.article.list[i].material_id+','+ret.data.task_id+')">'+
					'<div class="pull-left f-14em va-jz h-55em over-h color-12 w-80b over-h">'+InterceptField(ret.data.article.list[i].material_title,'无标题',38)+'</div>'+
					'<div class="color-a4 f-12em lh-60em pull-right">'+status1+'</div>'+
				'</li>'
				
				)
			}
			/**——————————————————视频————————————————————————————————*/			
			for(var i=0;i<ret.data.video.list.length;i++){
			var status2;
			if(ret.data.video.list[i].status==0){
				//未进行
				status2='<div class="color-red">未进行</div>';
			}else{
				status2='<div class="color-green">进行中</div>';
			}	
				$('#list_obj_video').append(
				'<li class="clearfix h-55em bb-3em-e6 pl-12em pr-12em over-h" onclick="openedu_video_info(\'edu_learn_videoInfo_header\','+ret.data.video.list[i].material_id+','+ret.data.task_id+')">'+
					'<div class="pull-left f-14em va-jz h-55em over-h color-12 w-80b over-h">'+InterceptField(ret.data.video.list[i].material_title,'无标题',38)+'</div>'+
					'<div class="color-a4 f-12em lh-60em pull-right">'+status2+'</div>'+
				'</li>'
				
				)
			}
			/**——————————————————考试————————————————————————————————*/			
			for(var i=0;i<ret.data.exam.list.length;i++){	
			if(ret.data.exam.list[i].status==0){//未进行  正式考试页面
			$('#list_obj_exam').append(
				'<li class="clearfix h-55em bb-3em-e6 pl-12em pr-12em over-h" onclick="openedu_exam_info(\'edu_exam_official_header\','+ret.data.task_id+','+ret.data.exam.list[i].exam_id+','+ret.data.exam.list[i].exam_time+')">'+
					'<div class="pull-left f-14em va-jz h-55em over-h color-12 w-80b over-h">'+InterceptField(ret.data.exam.list[i].exam_title,'无标题',38)+'</div>'+
					'<div class="color-red f-12em lh-60em pull-right">未进行</div>'+
				'</li>'
				
				)
			
			}else{//进行中  已参加页面
				$('#list_obj_exam').append(
				'<li class="clearfix h-55em bb-3em-e6 pl-12em pr-12em over-h" onclick="openedu_exam_info(\'edu_exam_attend_header\','+ret.data.task_id+','+ret.data.exam.list[i].exam_id+','+ret.data.exam.list[i].exam_time+')">'+
					'<div class="pull-left f-14em va-jz h-55em over-h color-12 w-80b over-h">'+InterceptField(ret.data.exam.list[i].exam_title,'无标题',38)+'</div>'+
					'<div class="color-green f-12em lh-60em pull-right">进行中</div>'+
				'</li>'
				
				)
			}
			
			
				
			}
			/**——————————————————调查问卷————————————————————————————————*/			
			for(var i=0;i<ret.data.survey.list.length;i++){
//			var status4;
//			if(ret.data.survey.list[i].status==0){
//				//未进行
//				status4='<div class="color-red">未进行</div>';
//			}else{
//				status4='<div class="color-green">进行中</div>';
//			}	
			if(ret.data.survey.list[i].status==0){
				$('#list_obj_survey').append(
				'<li class="clearfix h-55em bb-3em-e6 pl-12em pr-12em over-h" onclick="openedu_survey_info(\'life_survey_info_header\','+ret.data.survey.list[i].survey_id+','+ret.data.task_id+',0)">'+
					'<div class="pull-left f-14em va-jz h-55em over-h color-12 w-80b over-h">'+InterceptField(ret.data.survey.list[i].survey_title,'无标题',38)+'</div>'+
					'<div class="color-red f-12em lh-60em pull-right">未进行</div>'+
				'</li>'
				
				)
			}else{
				$('#list_obj_survey').append(
				'<li class="clearfix h-55em bb-3em-e6 pl-12em pr-12em over-h" onclick="openedu_survey_info(\'life_survey_info_header\','+ret.data.survey.list[i].survey_id+','+ret.data.task_id+',1)">'+
					'<div class="pull-left f-14em va-jz h-55em over-h color-12 w-80b over-h">'+InterceptField(ret.data.survey.list[i].survey_title,'无标题',38)+'</div>'+
					'<div class="color-green f-12em lh-60em pull-right">进行中</div>'+
				'</li>'
				
				)
			}

				
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

/**—————————————————————————————打开文章详情———————————————————————————————————————————*/
function openedu_article_info(winName,type,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_learn/header/'+winName+'.html',
	    pageParam:{
	    	type:type,//文章id
	    	id:id,//task_id
	    }
    });
}

/**—————————————————————————————打开视频详情———————————————————————————————————————————*/
function openedu_video_info(winName,type,id){
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_learn/header/'+winName+'.html',
	    pageParam:{
	    	type:type,//视频id
	    	id:id,//task_id
	    }
    });
}

/**—————————————————————————————打开调查问卷详情———————————————————————————————————————————*/
function openedu_survey_info(winName,id,type1,status){
	api.openWin({
	    name: winName,
	    url: '../../sp_life/life_survey/header/'+winName+'.html',
	    pageParam:{	    	
	    	id:id,//查问卷id
	    	type1:type1,//task_id
	    	status:status
	    }
    });
}


/**—————————————————————————————打开考试详情———————————————————————————————————————————*/
function openedu_exam_info(winName,type,id,time){
	$api.setStorage('exam_time',60 * time);		
	api.openWin({
	    name: winName,
//	    url: '../../sp_edu/edu_exam/header/'+winName+'.html',
		url: '../../sp_edu/edu_exam/header/'+winName+'.html',
	    pageParam:{
	    	type:type,//视频id
	    	id:id,//task_id
	    	time:time,
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
function openedu_obj(winName,id,type){
	api.openWin({
	    name: winName,
	    url: './header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    	type:type,
	    }
    });
}
//点开收缩

$("#tabBox1").click(function () {
    $("#list_obj_article").slideToggle();
});
$("#tabBox2").click(function () {
    $("#list_obj_video").slideToggle();
});
$("#tabBox3").click(function () {
    $("#list_obj_exam").slideToggle();
});
$("#tabBox4").click(function () {
    $("#list_obj_survey").slideToggle();
});










