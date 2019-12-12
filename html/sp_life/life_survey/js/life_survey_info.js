apiready=function(){
//alert('type1:'+api.pageParam.type1)
//alert('type:'+api.pageParam.type)
//alert('id:'+api.pageParam.id)
	getLifeSurveyInfo(api.pageParam.status,api.pageParam.id)//调用（获取考试详情）接口
	if(api.pageParam.type==1){
		$('#submitBox').hide();
	}
	
}

//获取详情接口------------------------------------------------------------------------------------
function getLifeSurveyInfo(type,id){
//alert(id)
//alert(type)
//alert(api.pageParam.type1)
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Life/get_life_survey_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"survey_id":id,//问卷编号
	            "status":type,//0:可参加 ;1:展示
	            "task_id":api.pageParam.type1,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    		//alert(api.pageParam.type)
    			$('#survey_title').html(ret.data.survey_info.survey_title);//调查问卷名称
    			if(ret.data.questions_list&&ret.data.questions_list.length>0){
    			$("#submitBox").removeClass("di-n");
//	    			for(var i=0;i<ret.data.questions_list.length;i++){
//	    				$('#list').append(
//	    					'<div class="bor-ra-7 box-sha-5-ed over-h bg-color-whiter mb-12em">'+
//								'<ul id="questions_item'+i+'" class="pl-12em pr-20em pt-12em">'+
//									'<p class="f-14em lh-20em color-33 pb-10em">'+
//										'<span class="questionsId" noo="'+ret.data.questions_list[i].questions_id+'">'+(i-(-1))+'.</span>'+
//										ret.data.questions_list[i].questions_title+'(<span class="titleType">'+ret.data.questions_list[i].questions_type+'</span>)'+
//									'</p>'+
//								'</ul>'+
//							'</div>'
//	    				)
//	    				var questionsItem = ret.data.questions_list[i].questions_item.split(',');
//	    				for(var j = 0;j<questionsItem.length;j++){
//		    					$('#questions_item'+i+'').append(
//		    						'<li onclick="opt(this)" select="false" class="f-12em color-33 pb-15em lh-15em">'+
//										'<img class="w-12em h-12em pull-left mr-12em exam_no" src="../../../statics/images/images_edu/edu_exam_no.png" alt="" />'+
//										'<img class="w-12em h-12em pull-left mr-12em exam_yes di-n" src="../../../statics/images/images_edu/edu_exam_yes.png" alt="" />'+
//										'<span>'+questionsItem[j]+'</span>'+
//									'</li>'
//		    					)
//		    				}
//	    			}
	    			for(var i=0;i<ret.data.questions_list.length;i++){
	    				$('#list').append(
	    					'<div class="bor-ra-7 box-sha-5-ed over-h bg-color-whiter mb-12em">'+
								'<ul id="questions_item'+i+'" class="pl-12em pr-20em pt-12em">'+
									'<p class="f-14em lh-20em color-33 pb-10em">'+
										'<span class="questionsId" noo="'+ret.data.questions_list[i].questions_id+'">'+(i-(-1))+'.</span>'+
										ret.data.questions_list[i].questions_title+'(<span class="titleType">'+ret.data.questions_list[i].questions_type+'</span>)'+
									'</p>'+
								'</ul>'+
							'</div>'
	    				)
	    				var questionsItem = ret.data.questions_list[i].questions_item.split(',');
	    				
	    				if(api.pageParam.status==0){
		    				for(var j = 0;j<questionsItem.length;j++){
		    					$('#questions_item'+i+'').append(
		    						'<li onclick="opt(this)" select="false" class="f-12em color-33 pb-15em lh-15em">'+
										'<img class="w-12em h-12em pull-left mr-12em exam_no" src="../../../statics/images/images_edu/edu_exam_no.png" alt="" />'+
										'<img class="w-12em h-12em pull-left mr-12em exam_yes di-n" src="../../../statics/images/images_edu/edu_exam_yes.png" alt="" />'+
										'<span>'+questionsItem[j]+'</span>'+
									'</li>'
		    					)
		    				}
		    			}else if(api.pageParam.status==1){
		    			$("#submitBox").addClass("di-n");
		    				for(var j = 0;j<ret.data.questions_list[i].item.length;j++){
		    					$('#questions_item'+i+'').append(
		    						'<li class="f-12em color-33 pb-15em lh-15em">'+
										'<span>'+ret.data.questions_list[i].item[j].answer_item+'<span class="color-ff3032 pl-20em">本选项总票数【'+ret.data.questions_list[i].item[j].count+'票】</span></span>'+
									'</li>'
		    					)
		    				}
		    			}
	    			}
	    		}else{
	    			$("#submitBox").addClass("di-n");
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
	showProgress();//加载等待
	var questionsArr = '[';
	for(var i=0;i<$('ul').length;i++){
		questionsArr = questionsArr+'{"questions_id":"'+$('ul').eq(i).find('.questionsId').attr('noo')+'","answer_item":"';
		for(var j=0;j<$('ul').eq(i).find('li').length;j++){
			if($('ul').eq(i).find('li').eq(j).attr('select')=='true'){
				questionsArr = questionsArr+$('ul').eq(i).find('li').eq(j).find('span').html()+',';
			}
		}
		questionsArr = questionsArr.substring(0,questionsArr.length-1)+'"},';
	}
	questionsArr = questionsArr.substring(0,questionsArr.length-1)+']';
	var url = localStorage.url+"/index.php/Api/Life/set_life_survey";
//	alert(localStorage.user_id);
//	alert(api.pageParam.id);
//	alert(questionsArr);
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//登录人编号
	            "survey_id":api.pageParam.id,//问卷编号
	            "answer_list":questionsArr,//答案
	            "task_id":api.pageParam.type1,
	        }
	    }
    },function(ret,err){
    	if(ret){
//  	alert(JSON.stringify(ret));
    		if(ret.status==1){
				$('.masking').css('height',$(window).height());
				$('.alert-div').css('display','block');
				$('#num').html(ret.data.num);
				api.hideProgress();//隐藏进度提示框
				$('#determine').click(function(){
					api.execScript({
	    				name: 'life_survey_header',
	   				    frameName: 'life_survey',
		                script: 'exec();',
	           		});
	       			api.closeWin({});   
				})
				//发送监听
			     api.sendEvent({
				 name: 'myEvent_xw4',
				 extra: {
					     state: 'no'
					    }
					});
				
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
	if($(This).parent().find('.titleType').html()=="单选"){
		$(This).siblings('li').removeClass('opt');
		$(This).siblings('li').attr('select','false');
		$(This).siblings('li').find('.exam_yes').addClass('di-n');
		$(This).siblings('li').find('.exam_no').removeClass('di-n');
		$(This).addClass('opt');
		$(This).attr('select','true');
		$(This).find('.exam_yes').removeClass('di-n');
		$(This).find('.exam_no').addClass('di-n');
	}else if($(This).parent().find('.titleType').html()=="多选"){
		$(This).attr('select',($(This).attr('select')=='true'?'false':'true'));
		if($(This).attr('select')=='true'){
			$(This).addClass('opt');
			$(This).find('.exam_yes').removeClass('di-n');
			$(This).find('.exam_no').addClass('di-n');
		}else{
			$(This).removeClass('opt');
			$(This).find('.exam_yes').addClass('di-n');
			$(This).find('.exam_no').removeClass('di-n');
		}
	}
}

//提交效果---------------------------------------------------------------------
//$('#submit').click(function(){
//	$('.masking').css('height',$(window).height());
//	$('.alert-div').css('display','block')
//})

