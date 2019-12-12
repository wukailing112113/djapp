var page =1;
apiready = function () {
	getOaWorklogList(); // 工作纪实的方法
	openPullRefresh("exec()");//下拉刷新
    evenScrolltobottom("toTop()");//上拉加载数据
}

function toTop(){
	page++;
	getOaWorklogList();
}

//工作纪实的接口
function getOaWorklogList(){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_worklog_list";
	api.ajax({
		url:url,
		method: 'post',
		timeout: 100,
		data: {//传输参数
			values: { 
				"communist_no":localStorage.user_id,
				"page":page,
				"pagesize":10,
				"worklog_type":5,
				"keyword": $('#keyword').val()
			}
		}
	},function(ret,err){
		if(ret){
			if(ret.status==1){
				if(ret.data&&ret.data.length>0){
					for(var i=0;i<ret.data.length;i++){	
						$("#flow_list").append(
							'<li class="over-h w-100b" onclick="openInfo(\'oa_secretary_report_info_header\','+ret.data[i].worklog_id+')">'+
								'<div class="pull-left w-60em f-12em lh-24em color-33 f-w">'+ret.data[i].add_communist+'</div>'+
			                	'<div class="pull-right w-290em po-re pb-25em">'+
		                   		'<img class="po-ab wh-24em left-14mem top-0" src="../../../statics/images/images_edu/edu_notes_time.png" alt="" />'+
		                      	'<p class="f-10em lh-24em color-ff9776 pl-20em">'+ret.data[i].add_time.substring(0,11)+'</p>'+
		                      	'<p class="f-16em lh-16em color-99 mt-4em pl-20em">'+ret.data[i].worklog_title+'</p>'+
		                		'</div>'+
	                		'</li>'
						)
					}
				}
			}else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
		}else{
			api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
		}
	});
}

//关键词搜索 ---------------------------------------------------------
$('#keyword').keyup(function(){
	page = 1;
	$("#flow_list").html('<div class="po-ab w-2px h-100b bg-color-ffb767 left-72em ml-1mpx" id="line"></div>');
	getOaWorklogList();
})

//打开详情 ---------------------------------------------------------
function openInfo(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	'id': id,
	    }
    });
}

//刷新页面  ---------------------------------------------------------
function exec(){
	location.reload();
}