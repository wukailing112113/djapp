apiready=function(){
	getLifeVoteInfo(api.pageParam.id)//调用（获取考试详情）接口
}

//获取考试详情接口------------------------------------------------------------------------------------------------
function getLifeVoteInfo(id){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/get_life_vote_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"subject_id":id,//问卷编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#survey_title').html(ret.data.subject_info.subject_content);//调查问卷名称
    			if(ret.data.option_list&&ret.data.option_list.length>0){
	    			for(var i=0;i<ret.data.option_list.length;i++){
	    				$('#questions_item').append(
							'<li onclick="opt(this)" select="false" class="f-12em color-33 pb-15em lh-15em questionsId" noo="'+ret.data.option_list[i].option_id+'">'+
								'<img class="w-12em h-12em pull-left mr-12em exam_no" src="../../../statics/images/images_edu/edu_exam_no.png" alt="" />'+
								'<img class="w-12em h-12em pull-left mr-12em exam_yes di-n" src="../../../statics/images/images_edu/edu_exam_yes.png" alt="" />'+
								'<span>'+ret.data.option_list[i].option_name+'</span>'+
							'</li>'
	    				)



	    			}
	    		}
    			api.hideProgress();//隐藏进度提示框
    		}else{
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//提交考试接口------------------------------------------------------------------------------------------------
function setLifeSurvey(){
	var questionsArr;
	for(var a=0;a<$('ul li').length;a++){
		if($('ul li').eq(a).attr('select')=='true'){
			questionsArr=$('ul li').eq(a).attr('noo')
		};
		
	};
	if(questionsArr==undefined){
		alert('请先进行投票');
		return
	}
//	alert(questionsArr);
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/life_vote_do_save";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//登录人编号
	            "subject_id":api.pageParam.id,//问卷编号
	            "option_id":questionsArr//答案
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
				api.hideProgress();//隐藏进度提示框
				api.execScript({
    				name: 'life_vote_header',
   				    frameName: 'life_vote',
	                script: 'exec();',
           		});
           		alert('投票成功')
       			api.closeWin({});   

    		}else{
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//题目选择答案-------------------------------------------------------------------------------------
function opt(This){
		$(This).siblings('li').removeClass('opt');
		$(This).siblings('li').attr('select','false');
		$(This).siblings('li').find('.exam_yes').addClass('di-n');
		$(This).siblings('li').find('.exam_no').removeClass('di-n');
		$(This).addClass('opt');
		$(This).attr('select','true');
		$(This).find('.exam_yes').removeClass('di-n');
		$(This).find('.exam_no').addClass('di-n');
}

//提交效果---------------------------------------------------------------------
//$('#submit').click(function(){
//	$('.masking').css('height',$(window).height());
//	$('.alert-div').css('display','block')
//})

