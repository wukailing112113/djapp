apiready=function(){
	getEduExamInfo();//调用（获取考试详情）接口
}

//获取考试详情接口------------------------------------------------------------------------------------------------
function getEduExamInfo(){
	showProgress();//加载等待
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_exam_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//登录人员编号
	            "exam_id":api.pageParam.type,//试题编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#exam_id').html(ret.data.exam.exam_title);//考试名称
    			$('#exam_name').html(localStorage.user_name);//考试人员
    			$('#add_time').html(ret.data.exam.add_time.substring(0,10));//考试时间
    			$('#exam_time').html(ret.data.exam.exam_time);//考试时长
    			$('#log_score').html(ret.data.branch.log_score);//我所得分
    			$('#exam_point').html(ret.data.exam.exam_point);//总分
    			if(ret.data.questions_list&&ret.data.questions_list.length>0){
	    			for(var i=0;i<ret.data.questions_list.length;i++){
	    				$('#questions_list').append(
	    					'<div class="bor-ra-7 box-sha-5-ed over-h bg-color-whiter mb-12em">'+
								'<ul id="questions_item'+i+'" class="pl-12em pr-20em pt-12em">'+
									'<p class="f-14em lh-20em color-33 pb-10em">'+
										'<span class="questionsId" noo="'+ret.data.questions_list[i].questions_id+'">'+(i-(-1))+'.</span>'+
										'<span class="color-ff3032 titleType">【'+ret.data.questions_list[i].questions_type+'题】</span>'+
										ret.data.questions_list[i].questions_title+
									'</p>'+
								'</ul>'+
								'<p class="f-12em lh-15em color-ff3032 pl-12em pr-20em pb-12em f-w">我选择的答案是：【'+ret.data.questions_list[i].my_questions_item+'】 ; 正确答案是：【'+ret.data.questions_list[i].questions_answer+'】</p>'+
							'</div>'
	    				)
	    				var questionsItem = ret.data.questions_list[i].questions_item.split(',');
	    				for(var j = 0;j<questionsItem.length;j++){
	    					$('#questions_item'+i+'').append(
	    						'<li class="f-12em color-33 pb-15em lh-15em">'+
									'<img class="w-12em h-12em pull-left mr-12em exam_no" src="../../../statics/images/images_edu/edu_exam_no.png" alt="" />'+
									'<img class="w-12em h-12em pull-left mr-12em exam_yes di-n" src="../../../statics/images/images_edu/edu_exam_yes.png" alt="" />'+
									'<span>'+questionsItem[j]+'</span>'+
								'</li>'
	    					)
	    				}
	    			}
	    		}
    			api.hideProgress();//隐藏进度提示框
    		}else{
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: ret.msg,duration:3000,location: 'top'});
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}