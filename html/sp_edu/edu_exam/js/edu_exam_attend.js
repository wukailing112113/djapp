apiready = function () {
	//exitApp();
	getEduExamInfo();
	//alert(api.pageParam.type)
	  if(api.pageParam.type==1){
              //1从专题页面过来
            $("#edu_back").click(function(){
        	    //延迟关闭发布页
				setTimeout(function(){
				    api.closeWin();
				},1000)
	         
//	         //发送监听
	    	  api.sendEvent({
			 	 name: 'myEvent_openMyexam',
			     extra: {
			            state: 'no'
			        }
	          });
            })
        }else{
            //从首页过来
             $("#edu_back").click(function(){   
             	//延迟关闭发布页
				setTimeout(function(){
				    api.closeWin();
				},1000)         

//	           //发送监听  模拟考试 答案解析 返回
	    	  api.sendEvent({
			 	 name: 'myEvent_attend',
			     extra: {
			            state: 'no'
			        }
	          });
             })
         
        }    
}

//获取考试详情接口-----------------------------------------------
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
				
				$("#income_point").html(ret.data.branch.log_score);//所得分数
				$("#exam_point").html(ret.data.exam.exam_point);//总分
				$("#questions_num").html(ret.data.exam.questions_num);//总题数
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
	});
}


function open11(winName) {
	api.openWin({
		name: winName,
		url: '../edu_special/header/' + winName + '.html',
		reload: true,
		pageParam: {
			//	type:type,

		}
	})
}

//关闭得分遮罩层
//$(".edu_analysis_mask").click(function () {
//	$(this).fadeOut();
//});

//打开学习分析页面
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
/********************************************************************/

var activeQuestion = 0 //当前操作的考题编号
var questioned = 0 //
var currentSlide = 0
var checkQues = [] //已做答的题的集合
var itemList = ["A", "B", "C", "D", "E", "F"]



//展示考卷信息
function showQuestion(id) {
	$(".questioned").text(id + 1);
	var text = JSON.parse($("#strBtn").html()).questions_list;		
	questioned = (id + 1) / text.length;
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
	var item = "";
	var type = question.type;
	var right_answer = question.questions_answer.split(",");
	var my_answer = question.my_questions_item.split(",");
	if(type = 2){ // 多选还是单选  多选用checkbox  单选用radio
		var checkbox_html = `<input type="checkbox" name=" item success${i}" id="success${itemList[i]}">`;
		var checkbox_true_html = `<input type="checkbox" checked="true" name=" item success${i}" id="success${itemList[i]}">`;

		for (var i = 0; i < items.length; i++) { // 循环问题选项
			if(isInArray(my_answer,itemList[i])){ // 选项在我的答案中
				if(isInArray(right_answer,itemList[i])){ // 我的选项在正确答案中    我的答案打对号
					item = `<li class="question_info content_classes_bots radio icheck-success"
									id= "item${i}">
						`+ checkbox_true_html +`
						<label for="success${i}" style="position: relative;">
							<span class="xuanxiang${i} options"></span>
							<span class="pull-right" style="padding-left:1rem;display:block">${items[i].substring(2)}</span>
						</label>
					</li>`

				} else { // 我的选项不在正确答案中    我的答案打错
					item = `<li class="question_info content_classes_bots radio icheck-success"
									id= "item${i}">
						`+ checkbox_html +`
						<label for="success${i}" style="position: relative;">
							<span class="xuanxiang${i} options check_false check"
							style="width:1.2rem;height:1.2rem;position:absolute;transform:translateY(-50%);top:50%;left:0%">
							<img src="../../../statics/images/images_edu/false.jpg" alt="答题卡">
							</span>
						<span class="pull-right" style="padding-left:1rem;display:block">${items[i].substring(2)}</span>
						</label>
					</li>`
				}
			} else {
				item = `<li class="question_info content_classes_bots radio icheck-success"
									id= "item${i}">
						`+ checkbox_html +`
						<label for="success1" style="position: relative;">
							<span class="xuanxiang${i} options">${itemList[i]} . </span>
							<span class="pull-right" style="padding-left:1rem;display:block">${items[i].substring(2)}</span>
						</label>
					</li>`
			}
			$(".question").append(item);
		}
	} else {
		var radio_html = `<input type="radio"  name=" item success1" id="success${itemList[i]}">`;
		var radio_true_html = `<input type="radio" checked="true" name=" item success${i}" id="success${itemList[i]}">`;
		for (var i = 0; i < items.length; i++) {
			if(isInArray(my_answer,itemList[i])){
				if(isInArray(right_answer,itemList[i])){ // 我的选项在正确答案中    我的答案打对号
					item = `<li class="question_info content_classes_bots radio icheck-success"
									id= "item${i}">
						`+ radio_true_html +`
						<label for="success${i}" style="position: relative;">
							<span class="xuanxiang${i} options"></span>
							<span class="pull-right" style="padding-left:1rem;display:block">${items[i].substring(2)}</span>
						</label>
					</li>`
				} else { // 我的选项不在正确答案中    我的答案打错
					item = `<li class="question_info content_classes_bots radio icheck-success"
									id= "item${i}">
						`+ radio_html +`
						<label for="success${i}" style="position: relative;">
							<span class="xuanxiang${i} options check_false check"
							style="width:1rem;height:1rem;position:absolute;transform:translateY(-50%);top:50%;">
							<img src="../../../statics/images/images_edu/false.jpg" alt="答题卡">
							</span>

							<span class="pull-right" style="padding-left:1rem;display:block">${items[i].substring(2)}</span>
						</label>
					</li>`
				}
			} else {
				item = `<li class="question_info content_classes_bots radio icheck-success"
									id= "item${i}">
						`+ radio_html +`
						<label for="success1" style="position: relative;">
							<span class="xuanxiang${i} options">${itemList[i]} . </span>
							<span class="pull-right" style="padding-left:1rem;display:block">${items[i].substring(2)}</span>
						</label>
					</li>`
			}
			$(".question").append(item);
		}
	}

	$(".question").attr("id", "question" + id);
	$("#ques" + id).removeClass("active_question_id").addClass("question_id");
	for (var i = 0; i < checkQues.length; i++) {
		if (checkQues[i].id == id) {
			$("#" + checkQues[i].item).find("input").prop("checked", "checked");
			$("#" + checkQues[i].item).addClass("clickTrim");
			$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
		}
	}
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

/*答题卡*/
function answerCard() {
	var text = JSON.parse($("#strBtn").html()).questions_list;
	$(".question_sum").text(text.length);
	for (var i = 0; i < text.length; i++) {
		let questionId =
			"<li id='ques" + i + "'onclick='saveQuestionState(" + i +
			")' class='questionId  pull-left question_true_id'>" +
			(i + 1) +
			"</li>";
		$("#answerCard ul").append(questionId);
	}
}

/*选中考题*/
var Question

function clickTrim(source) {
	var id = source.id

	$("#" + id).find("input").prop("checked", "checked");
	$("#" + id).find('.options').hide().parents('li').siblings().find(".options").show();

	$("#ques" + activeQuestion).removeClass("question_id").addClass("clickQue");
	var ques = 0;
	for (var i = 0; i < checkQues.length; i++) {
		if (checkQues[i].id == activeQuestion && checkQues[i].item != id) {
			ques = checkQues[i].id;
			checkQues[i].item = id; //获取当前考题的选项ID
			checkQues[i].answer = $("#" + id).find("input[name=item]:checked").val(); //获取当前考题的选项值
		}
	}
	if (checkQues.length == 0 || Question != activeQuestion && activeQuestion != ques) {
		var check = {};
		check.id = activeQuestion; //获取当前考题的编号
		check.item = id; //获取当前考题的选项ID
		check.answer = $("#" + id).find("input[name=item]:checked").val(); //获取当前考题的选项值
		checkQues.push(check);
	}
	$(".question_info").each(function () {
		var otherId = $(this).attr("id");
		if (otherId != id) {
			$("#" + otherId).find("input").prop("checked", false);
			$("#" + otherId).removeClass("clickTrim");
		}
	})
	Question = activeQuestion;
}



/*点击答题卡 出现相应考题*/
function saveQuestionState(clickId) {
	$('.z-index-mask').hide()
	// $('.answer_analysis').css('display', 'none')
	showQuestion(clickId)
	var text = JSON.parse($("#strBtn").html()).questions_list
		// activeQuestion是当前操作的考题编号
		showQuestion(activeQuestion);
		if (activeQuestion == text.length-1) {
			$('#nextQuestion').hide();
			$('.submitQuestions').show();
		}
		if (activeQuestion !== text.length-1) {
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
		// $('.answer_analysis').css('display', 'none')
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
	$('.z-index-mask').show()
})
// 关闭学习卡
$('.mask_close').click(function () {
	$('.z-index-mask').hide()
})


var maxtime = localStorage.exam_time;
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

// var timer = setInterval("CountDown()", 1000)
