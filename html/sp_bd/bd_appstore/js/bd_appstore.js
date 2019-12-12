apiready = function () {
	openPullRefresh("exec()");//下拉刷新
	getConfig();//加载配置文件	
	//alert(localStorage.is_shuji)
	if(localStorage.is_shuji==1){
		//能看通讯录
		$("#is_shuji").removeClass("di-n");
	}else{
		$("#is_shuji").addClass("di-n");
	}

}


//刷新页面
function exec(){
	location.reload();
}

//党务平台板块
	//打开党务动态
	function openPartyWork(winName,type){
	api.openWin({
	    name: winName,
	    url: '../../sp_cms/cms_partyWork/header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    }
    });
}
	//打开党建矩阵
	function openMatrix(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_hr/hr_matrix/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}

	//打开党员发展全纪实
	function openDiscover(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_hr/hr_discover/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}

	//打开党费缴纳页面
	function openFa(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_fa/header/'+winName+'.html',
		   
	    });
	}
	
	//打开党员关系转移
	function openTransfer(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_hr/hr_transfer/header/'+winName+'.html',
		   
	    });
	}
	
	//打开流动党员之家
	function openMoving(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_hr/hr_moving/header/'+winName+'.html',
		   
	    });
	}

	//打开第一书记模块
	function openSecretary(winName){8
		api.openWin({
		    name: winName,
		    url: '../../sp_oa/oa_secretary/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开积分排名模块
	function openIntegral(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_hr/hr_integral/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开三会一课模块
	function openAttmeeting(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_oa/oa_attmeeting/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	//打开党内生活模块
	function openLifeing(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_oa/oa_attmeeting/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
//党务平台结束


//学习平台板块
	//打开专题学习模块
	function openSpecial(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_edu/edu_special/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开在线党校模块
	function openLearn(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_edu/edu_learn/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开考试中心模块
	function openExam(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_edu/edu_exam/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	//党员投稿
	function openWriting(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_edu/edu_writing/header/'+winName+'.html',
	    
    });
}

	
	
	//打开学习笔记模块
	function openNotes(winName,type){
		api.openWin({
		    name: winName,
		    url: '../../sp_edu/edu_notes/header/'+winName+'.html',
		    pageParam:{			
				type:type,
			}
	    });
	}
//学习平台结束

//民生平台
	//打开便民服务大厅
	function openPlatform(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_platform/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开精准扶贫
	function openHelpwin(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_hr/hr_poorhelp/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}

	//打开村务论坛
	function openBbs(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_bbs/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}

	//打开三务公开
	function openThreeservices(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_threeservices/header/'+winName+'.html'
	    });
	}
	
	//打开随手拍
	function openProblem(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_problem/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开调查问卷
	function openSurvey(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_survey/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开志愿者
	function openVolunteer(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_volunteer/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
	
	//打开投票
	function openVote(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_vote/header/'+winName+'.html',
	    });
	}
	
	//打开留言建议
	function openMessage(winName){
		api.openWin({
		    name: winName,
		    url: '../../sp_life/life_message/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });
	}
//民生平台结束




//打开日报管理
function openWorkplan(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_workplan/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开公文收发
function openDocument(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_document/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开通知公告
function openNotice(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_notice/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开工作计划
function openInstructions(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_instructions/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}

//打开绩效管理
function openPerformance(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_oa/oa_performance/header/'+winName+'.html',
	    pageParam:{
	    	
	    }
    });
}


//打开通讯录
function openPhone(winName){
	api.openWin({
		    name: winName,
		    url: '../../sp_com/com_phonebook/header/'+winName+'.html',
		    pageParam:{
		    	
		    }
	    });  
}



//function openPhone(){
//	api.openSlidLayout({
//		type:'left',
//		slidPane:{
//			name: 'com_phoneBook_right_header',
//	        url: 'widget://html/sp_com/com_phonebook/header/com_phonebook_right_header.html',	        
//		},
//		fixedPane:{
//			name: 'com_phonebook_left_header', 
//		    url: 'widget://html/sp_com/com_phonebook/header/com_phonebook_left_header.html', 		   
//		},
//	}, function(ret, err) {
//		
//	});
//}
//打开沟通中心
function openChat(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_com/com_chat/header/'+winName+'.html'
    });
}

//打开书记信箱
function openMailbox(winName){
	api.openWin({
	    name: winName,
	    url: '../../sp_com/com_mailbox/header/'+winName+'.html'
    });
}



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














