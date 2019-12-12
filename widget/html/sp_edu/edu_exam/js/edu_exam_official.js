apiready = function () {
	exitApp()
	getEduExamInfo()//调用（获取考试详情）接口
//	alert(api.pageParam.type);
	//$(".edu_analysis_mask").show();
	
}
//关闭得分遮罩层 返回列表页 并刷新页面
$(".edu_analysis_mask").click(function () {	
	//	official();
	
	
});
// 退出提醒
function exitApp() {
	api.addEventListener({
		name: 'keyback'
	}, function (ret, err) {
		//利用对话框返回的值 （true 或者 false）
		if (confirm("确定离开考试页面吗？")) {
			api.closeWin();
		}
		else {
			//点击了取消
		}
	})
}


//获取考试详情接口------------------------------------------------------------------
function getEduExamInfo() {
	showProgress();//加载等待
	var url = localStorage.url + "/index.php/Api/Edu/get_edu_exam_info";
	api.ajax({
		url: url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: {
				"communist_no": localStorage.user_id,//登录人员编号
				"exam_id": api.pageParam.id,//试题编号
				"task_id": api.pageParam.type,
			}
		}
	}, function (ret, err) {
		if (ret) {
			if (ret.status == 1) {
				var data = ret.data
				if (data.questions_list && data.questions_list.length > 0) {
					$("#strBtn").html(JSON.stringify(data));
					// 页面初始化执行的方法必须在这个里面调用 不能在($())//这种形式
					showQuestion(0);
					answerCard();
				}
				api.hideProgress();//隐藏进度提示框

				$("#exam_point").html(ret.data.exam.exam_point);//总分
				$("#questions_num").html(ret.data.exam.questions_num);//总题数

				localStorage.exam_topic = ret.data.exam.exam_topic;//专题类型id

			} else {
				api.hideProgress();//隐藏进度提示框
				/**无网络提示 */
				api.toast({ msg: ret.msg, duration: 3000, location: 'top' });
			}
		} else {
			api.hideProgress();//隐藏进度提示框
			/**无网络提示 */
			api.toast({ msg: '网络链接失败...', duration: 3000, location: 'top' });
		}
	})
}




//提交考试接口-----------------------------------------------------------------
function setEduExamQuestions() {
	var time_minute=$(".minute").html();
	var time_second=$(".second").html();
	var time_lave=time_minute+":"+time_second;//剩余时间

var target  = localStorage.getItem("target");
	showProgress();//加载等待
	var text = JSON.parse($("#strBtn").html()).questions_list
	if ($(".clickQue").length === text.length) {
		api.hideProgress();//隐藏进度提示框
		var url = localStorage.url + "/Api/Edu/set_edu_exam_questions";
		clearInterval(timer)

		api.ajax({
			url: url,
			method: 'post',
			timeout: 100,
			data: {//传输参数
				values: {
					"communist_no": localStorage.user_id,
					"exam_id": api.pageParam.id,//试题编号
					"questions_arr": target,
					"time_lave":time_lave,//剩余时间
					"task_id":api.pageParam.type,
				}
			}
		}, function (ret, err) {
			if (ret) {
				if (ret.status == 1) {
				api.hideProgress();//隐藏进度提示框
				
				//全部做答   弹出得分遮罩层
				$(".edu_analysis_mask").show();
				var exam_flag = localStorage.exam_flag;
				//1从专题页面进入	
				if(exam_flag==2){								
					$('#list3').append(
				'<div class="pull-left ml-30em mr-10em edu_exam_analysis text-align f-15em color-ff4242" onclick="edu_exam_analysis(\'edu_exam_analysis_header\',1)">'+"学习分析"+'</div>'+
				'<div class="pull-left edu_exam_Answer text-align f-15em color-fff" onclick="edu_exam_Answer(\'edu_exam_attend\','+api.pageParam.id+',1)">'+"答案解析"+'</div>'
					)
				}else{
				//2从首页进入
				$('#list3').append(
//				'<div class="pull-left mr-10em edu_exam_analysis text-align f-15em color-ff4242" onclick="edu_exam_analysis(\'edu_exam_analysis_header\',2)">'+"学习分析"+'</div>'+
				'<div class="edu_exam_Answer text-align f-15em color-fff" onclick="edu_exam_Answer(\'edu_exam_attend\','+api.pageParam.id+',2)">'+"答案解析"+'</div>'
					)
				}
				
				
				$("#point_amount").html(ret.data.point_amount);//所得总分
				$("#accuracy").html(ret.data.accuracy+'%');//正确率
				$("#count").html(ret.data.count);//答题数
				$("#time_cost").html(ret.data.time_lave);//考试用时
				$("#integral").html(clearNull(ret.data.integral,0) );//积分

				//发送监听
			     api.sendEvent({
				 name: 'myEvent_xw3',
				 extra: {
					     state: 'no'
					    }
					});	




				} else {
					api.hideProgress();//隐藏进度提示框
					/**无网络提示 */
					api.toast({ msg: ret.msg, duration: 3000, location: 'top' });
				}
			} else {
				api.hideProgress();//隐藏进度提示框
				/**无网络提示 */
				api.toast({ msg: '网络链接失败...', duration: 3000, location: 'top' });
			}
		})

	} else {
		$.message({
			message: (text.length - ($(".clickQue").length)) + "道题未做哦",
			type: 'info'
		})
		api.hideProgress();//隐藏进度提示框
	}



}



//考试未开始或者考试开始后推出----------------------------------------------------------------------------------
function goBlackExam() {
	if (theExamBegins == 'true') {
		$('#whetherToStart').removeClass('di-n');
		$('#blackTheExam').click(function () {
			api.closeWin();
		});
		$('#continueTheExam').click(function () {
			$('#whetherToStart').addClass('di-n');
		})
	} else {
		api.closeWin();
	}
}
//刷新页面-----------------------------------------------------------------------------------------------------
function exec() {
	location.reload();
}



//打开学习分析页面----------------------------------
function edu_exam_analysis(winName,id,type) {
	var topic_id = localStorage.topic_type;
	api.openWin({
		name: winName,
		url: 'header/' + winName + '.html',
		reload: true,
		pageParam: {
			id:topic_id,
			type:type
		}
	})
}
//打开答案解析----------------------------------
function edu_exam_Answer(winName,id,type) {
	//延迟关闭发布页
	setTimeout(function(){
	    api.closeWin();
	},1000)
	api.openWin({
		name: winName,
		//url: 'header/' + winName + '.html',
		url: winName + '.html',
		reload: true,
		pageParam: {
//			id:api.pageParam.id,
//			type:api.pageParam.type
			id:id,
			type:type
		}
	})
}


var activeQuestion = 0; //当前操作的考题编号
var questioned = 0; //
var currentSlide = 0;
var checkQues = []; //已做答的题的集合
var itemList = ["A", "B", "C", "D", "E", "F"];



//展示考卷信息
function showQuestion(id) {
	$(".questioned").html(id + 1);
	var text = JSON.parse($("#strBtn").html()).questions_list;
	//console.log(text);	
	// questioned = (id + 1) / text.length;
	if (activeQuestion != undefined) {
		$("#ques" + activeQuestion).removeClass("question_id").addClass("active_question_id");
	}
	activeQuestion = id
	$(".question").find(".question_info").remove();
	var question = text[id];
	$(".question_title").html("<strong>" + (id + 1) + "  、</strong>" + question.questions_title);

	$(".questions_type").html(question.questions_type);
	$(".xuanxiang").html(question.questions_answer);
	$('.content_classes_msg .answer_memo').html(question.memo)
	var items = question.questions_item.split(",");
	var itemDiv = '';
	var trues = question.questions_type == '单选题' ? true : false

	// 显示选项列表
	for (var i = 0; i < items.length; i++) {
	//var str2=items[i].substring(2);
		itemDiv += '<li class="question_info content_classes_bots radio icheck-success" onclick="clickTrim(this,'+question.questions_id+')" id="item' + i + '">'
		if (trues) {
			itemDiv += ' <input type="radio" data-val="'+itemList[i]+'" name="item" id="success' + itemList[i] + '" value="' + itemList[i] + '">'
		} else {//多选题
			itemDiv += ' <input type="checkbox" data-val="'+itemList[i]+'" name="item'+i+'" id="success' + itemList[i] + '" value="' + itemList[i] + '">'
		}
		itemDiv += ' <label for="item'+i+'" style="position: relative;">'
		itemDiv += '   <span class="xuanxiang' + i + ' options" >' + itemList[i] + '.</span><span class="pull-right" style="padding-left:1rem;display:block">' + items[i].substring(2) + '</span>'
		itemDiv += ' </label>'
		itemDiv += '</li>'

		$("#question_list").html(itemDiv);
		
	}

	$(".question").attr("id", "question" + id);
	$("#ques" + id).removeClass("active_question_id").addClass("question_id");
	for (var i = 0; i < checkQues.length; i++) {
		if (checkQues[i].id == id) {
			if(checkQues[i].type == 1){
				$("#" + checkQues[i].item).find("input").prop("checked", "checked");
				$("#" + checkQues[i].item).addClass("clickTrim");
				$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
			} else {
				if(checkQues[i].answer != undefined){
					$("#question_list").find("input[type='checkbox']:checked").each(function () {
						$(this).prop("checked", false);
					})
					var checkbox_answer_arr = checkQues[i].answer.split(',');
					for (var a = 0; a < checkbox_answer_arr.length; a++) {
						$("#question_list").find("input[data-val="+checkbox_answer_arr[a]+"]").prop("checked", "checked");
//						$("#" + checkQues[i].item).addClass("clickTrim");
						$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
					}
				}
			}
		}
	}
}

/*答题卡*/
function answerCard() {
	var text = JSON.parse($("#strBtn").html()).questions_list;
	$(".question_sum").text(text.length);
	for (var i = 0; i < text.length; i++) {
		var questionId =
			"<li id='ques" + i + "'onclick='saveQuestionState(" + i +
			")' class='questionId  pull-left'>" +
			(i + 1) +
			"</li>";
		$("#answerCard ul").append(questionId);
	}
}

/*选中考题*/
var Question;

function clickTrim(source,questions_id) {
	var id = source.id;
	var is_check = $(source).find('input:checkbox').prop('checked');
	var next_element = $(source).find('input:checkbox').length; // 根据checkbo判断是否多选
	if(next_element == 0){
		var type = 1; // 单选
		$("#" + id).find('.options').hide().parents('li').siblings().find(".options").show();
		$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
	} else {
		var type = 2; // 多选
		$("#" + id).find('.options').hide();
		$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
	}
	$("#" + id).find("input").prop("checked", "checked");
//	$("#" + id).find('.options').hide().parents('li').siblings().find(".options").show();
//	$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
	var ques = 0;
	for (var i = 0; i < checkQues.length; i++) {
		if (checkQues[i].id == activeQuestion && checkQues[i].item != id) {
			ques = checkQues[i].id;
			checkQues[i].item = id; //获取当前考题的选项ID
			checkQues[i].answer = $("#" + id).find("input[name=item]:checked").val(); //获取当前考题的选项值
		}
	}
	var checkbox_answer_str = '';
	$("#question_list").find("input[type='checkbox']:checked").each(function () {
		var answer_str = $(this).data('val');
		checkbox_answer_str += answer_str+',';
	})

	if(checkbox_answer_str != ''){
		checkbox_answer_str = checkbox_answer_str.substring(0,checkbox_answer_str.length-1);
	}
	if(type == 1){ // 单选
		//if (checkQues.length == 0 || Question != activeQuestion && activeQuestion != ques) {
			var check = {};
			check.id = activeQuestion; //获取当前考题的编号
			check.questions_id = questions_id;
			check.item = id; //获取当前考题的选项ID
			check.answer = $("#" + id).find("input[name=item]:checked").val(); //获取当前考题的选项值
			check.type = type; //获取当前考题的选项值
			checkQues.push(check);
			
		//}
	} else {
		var check = {};
		check.id = activeQuestion; //获取当前考题的编号
		check.questions_id = questions_id;
		check.item = id; //获取当前考题的选项ID
		check.answer = checkbox_answer_str;
		check.type = type; //获取当前考题的选项值
		checkQues.push(check);
		
	}

	var target = {};


	checkQues.forEach(item => {
		var source = JSON.parse(`{"${item.questions_id}":"${item.answer}"}`); //将数据转换为 JavaScript 对象
		Object.assign(target, source);//拷贝

	});
	  
	var target1=JSON.stringify(target);//将对象转为字符串
	console.log(target1);
	localStorage.setItem("target",target1);



	$(".question_info").each(function () {
		var otherId = $(this).attr("id");
		if (otherId != id) {
			if(next_element == 0){ //radio
				$("#" + otherId).find("input").prop("checked", false);
			} else {
				if(is_check == true){
					$(source).find("input:checkbox").prop("checked", false);
					$(source).find('.options').show()
					var check_length = $("#question_list").find("input[type='checkbox']:checked").length;
					if(check_length == 0){
						$("#ques" + activeQuestion).removeClass("question_id").removeClass("clickQue");

					}
					var checkbox_answer_str2 = '';
					$("#question_list").find("input[type='checkbox']:checked").each(function () {
						var answer_str = $(this).data('val');
						checkbox_answer_str2 += answer_str+',';
					})
					if(checkbox_answer_str2 != ''){
						checkbox_answer_str2 = checkbox_answer_str2.substring(0,checkbox_answer_str2.length-1);
					}
					var check = {};
					check.id = activeQuestion; //获取当前考题的编号
					check.item = id; //获取当前考题的选项ID
					check.answer = checkbox_answer_str2;
					check.type = type; //获取当前考题的选项值
					checkQues.push(check);
					var target = {};
					checkQues.forEach(item => {
						var source = JSON.parse(`{"${item.id + 1}":"${item.answer}"}`); //将数据转换为 JavaScript 对象
						Object.assign(target, source);//拷贝

					});
					  
					var target1=JSON.stringify(target);//将对象转为字符串
					localStorage.setItem("target",target1);
				}
			}
			$("#" + otherId).removeClass("clickTrim");
		}
	})
	Question = activeQuestion;
}




/*保存考题状态 已做答的状态*/
function saveQuestionState(clickId) {
	$('.z-index-mask_card').hide()
	$('.answer_analysis').css('display', 'none')
	showQuestion(clickId)
	var text = JSON.parse($("#strBtn").html()).questions_list
	// activeQuestion是当前操作的考题编号
	showQuestion(activeQuestion);
	if (activeQuestion == text.length - 1) {
		$('#nextQuestion').hide();
		$('.submitQuestions').show();
	}
	if (activeQuestion !== text.length - 1) {
		$('.submitQuestions').hide();
		$('#nextQuestion').show();
	}
}

$(function () {
	//进入下一题
	$("#nextQuestion").click(function () {
		var text = JSON.parse($("#strBtn").html()).questions_list
		// activeQuestion是当前操作的考题编号
		if ((activeQuestion + 1) != text.length) showQuestion(activeQuestion + 1);
		showQuestion(activeQuestion);
		if (activeQuestion == text.length - 1) {
			$('#nextQuestion').hide();
			$('.submitQuestions').show();
		}
		if (activeQuestion !== text.length - 1) {
			$('.submitQuestions').hide();
			$('#nextQuestion').show();
		}
	})
})

// 打开学习卡
$('#opencard').click(function () {
	$('.z-index-mask_card').show();
})
// 关闭学习卡
$('.mask_close').click(function () {
	$('.z-index-mask_card').hide();
})


var maxtime=$api.getStorage('exam_time');
function CountDown() {
	$('.false').hide();
	if (maxtime >= 0) {
		minutes = Math.floor(maxtime / 60);
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = Math.floor(maxtime % 60);
		seconds = seconds < 10 ? '0' + seconds : seconds;
		msg = `<span>剩余时间 </span>
				<span class="time minute">${minutes}</span>:
				<span class="time second">${seconds}</span>`
		document.all["timer"].innerHTML = msg;
		if (maxtime == 5 * 60) $.message({
			message: '考试还剩5分钟',
			type: 'info'
		})
		--maxtime;
	} else {
		clearInterval(timer)
		alert('时间到，考试结束! 请停止答题');
		api.closeWin({})
	}
}

var timer = setInterval("CountDown()", 1000)







function official(winName,type){
	api.openWin({
            name: 'index',
            url: '../../sp_bd/bd_index/bd_index.html'
       });
}


