apiready = function () {
    openPullRefresh("exec()");//下拉刷新
   getEdu_pross();//进度条接口
	getConfig();//加载配置文件
	
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





$(".edu_fresh").click(function(){
	getEdu_pross();
});
//获取页面进度条接口
function getEdu_pross(){
	var url = localStorage.url+"/Api/Edu/edu_task_show";
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
				$('.obj_hide').html(ret.data.task_id);
				$('.article_progress').css("width",ret.data.article.ratio+"%");//文章进度条
				$('.article_num').html(ret.data.article.bili);//总数  	
				
				$('.video_progress').css("width",ret.data.video.ratio+"%");//视频进度条
				$('.video_num').html(ret.data.video.bili);//总数  	
				
				
				$('.exam_progress').css("width",ret.data.exam.ratio+"%");//考试进度条
				$('.exam_num').html(ret.data.exam.bili);//总数  	
				
				
				$('.notes_progress').css("width",ret.data.survey.ratio+"%");//调查问卷进度条
				$('.notes_num').html(ret.data.survey.bili);//总数  	
				
				
				
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

function openedu_obj_list2(winName,id){
var obj_hide=$(".obj_hide").html();
	api.openWin({
	    name: winName,
	    url: './header/'+winName+'.html',
	    pageParam:{
	    	id:obj_hide,
	    }
    });
}













