apiready = function () {
	getEduExamList()//调用（获取考试列表）接口
	// openPullRefresh('exec()');//下拉刷新
	//evenScrolltobottom("toTop()");//上拉加载
	//接收监听  提交试卷
//接收监听
	 api.addEventListener({
           name: 'myEvent_openMyexam'
       }, function(ret, err) {
           if (ret.value.state == 'no') {           
               exec();
           }
       });

       //接收监听  模拟考试 答案解析 返回
        api.addEventListener({
           name: 'myEvent_attend'
       }, function(ret, err) {
           if (ret.value.state == 'no') {           
               exec();
           }
       });
      

}
var page = 1
var is_exam = 3
function toTop() {
	page++;
	getEduExamList()
}

//获取考试列表接口---------------------------------------------------------
function getEduExamList() {
	// localStorage.url = http://dev.dangjian.co
	var url = localStorage.url + "/Api/Edu/get_edu_exam_list"
	api.ajax({
		url: url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: {
				"communist_no": localStorage.user_id,//登录人员编号
				"is_exam": is_exam,// 1 正式考试 2  已参加的考试 3 模拟考试
				"page": page,
				"pagesize": 10,
			}
		}
	}, function (ret, err) {
		if (ret) {
			const { data } = ret
			if (ret.status == 1) {
				// 未考的模拟考
				if (is_exam == 3) {
					$('.model_info').html('')
					for (var i = 0; i < data.length; i++) {
						$('.model_info').append(
							`<ul class="model_tests_list">
						<li onclick="openExamList('edu_exam_info',${data[i].exam_id},${data[i].exam_time})">
							<p class="model_tests_list_tit">
								${data[i].exam_title}
							</p>
							<div class="model_tests_list_bot">
								<span class="model_tests_list_time">时长:${data[i].exam_time}分钟 / ${data[i].questions_num}大题</span>
								<span class="model_tests_list_status f-10em not_red">共:${data[i].exam_time}分</span>
							</div>
						</li>
					</ul>`
						)
					}
					// 未考的正式考
				} else if (is_exam == 1) {
					$('.model_official').html('')
					for (var i = 0; i < data.length; i++) {
						$('.model_official').append(
							`<ul class="model_tests_list">
							<li onclick="openExamList('edu_exam_official',${data[i].exam_id},${data[i].exam_time})">
								<p class="model_tests_list_tit">
									${data[i].exam_title}
								</p>
								<div class="model_tests_list_bot">
									<span class="model_tests_list_time">时长:${data[i].exam_time}分钟 / ${data[i].questions_num}大题</span>
									<span class="model_tests_list_status f-10em not_red">共:${data[i].exam_time}分</span>
								</div>
							</li>
						</ul>`
						)
					}
					// 所有已参加
				} else if (is_exam == 2) {
					$('.model_join').html('')
					for (var i = 0; i < data.length; i++) {
						$('.model_join').append(
							`<ul class="model_join_list">
								<li onclick="openExamList('edu_exam_attend',${data[i].exam_id},${data[i].exam_time})">
								<p>${data[i].exam_title}</p>
								<div class="model_join_list_bot">
								<span class="model_join_list_time">时长:${data[i].exam_time}分钟/  总分:150分/ ${data[i].questions_num}大题</span>
								<a href="javascript:;" class="model_join_list_status f-10em not_red"><span>得分:${data[i].log_score}</span></a>
								</div>
								</li>
							</ul>`
						)
					}
				}
			}
		} else {
			/**无网络提示 */
			api.toast({ msg: '网络链接失败...', duration: 3000, location: 'top' });
		}
	})
}



// 考试详情--------------------------------------------------------------------------------
function openExamList(winName, id, time) {
	$api.setStorage('exam_time',60 * time);		
	//var maxtime = 60 * time;//一个小时，按秒计算，自己调整!
	//localStorage.exam_time = maxtime;

	api.openWin({
		name: winName,
		url: './' + winName + '.html',
		pageParam: {
			id:id,
			time:time,
			
		}
	});
}


// header栏切换---------------------------------------------------------------------------
$('.title_list ul li').click(function () {
	$('li').removeClass('title_lists_active')
	var num = $(this).index() //获取触发事件的索引
	//通过索引 找到切换项
	$('.content .item-content') //找到所有div
		.eq(num) //找到单个item;
		.css('display', 'block') //更改css样式
		.siblings()
		.css('display', 'none')
	$(this).addClass('title_lists_active');
	if (num == 0) {
		is_exam = 3
	} else if (num == 1) {
		is_exam = 1
	} else if (num == 2) {
		is_exam = 2
	}
	getEduExamList()
})

//页面刷新--------------------------------------------------------------------------------
function exec() {
	location.reload();
}
