apiready=function(){
	getEduExamList();//调用（获取我的考试列表）接口
	evenScrolltobottom('toTop()')//上拉加载
	openPullRefresh('exec')//下拉刷新
}
var page = 1;
function toTop(){
	page++;
	getEduExamList();
}

//获取我的考试列表接口---------------------------------------------------------
function getEduExamList(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_exam_list";
	api.ajax({
		url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"communist_no":localStorage.user_id,//登录人员编号
	            "is_exam":2,//是否考试 1:未考;2:已考
	            "page":page,
	            "pagesize":10,
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
	    				$('#list').append(
							'<div class="w-100b h-80em over-h box-4-df bg-color-whiter bor-ra-4 po-re mb-8em join" onclick="openInfo(\'edu_exam_myinfo_header\','+ret.data[i].exam_id+')">'+
								'<div class="pull-left w-60em h-72em m-4em"><img class="w-100b h-100b" src="'+((ret.data[i].exam_thumb)?(localStorage.url+ret.data[i].exam_thumb):("../../../statics/images/images_edu/edu_exam.png"))+'" alt="" /></div>'+
								'<div class="pull-left w-270em m-4em">'+
									'<p class="f-15em lh-15em color-black pt-25em pb-10em f-w">'+ret.data[i].exam_title+'</p>'+
									'<div class="over-h">'+
										'<div class="f-10em lh-12em color-75 pull-left w-33b"><span>考试时长：</span><span>'+ret.data[i].exam_time+'</span></div>'+
										'<div class="f-10em lh-12em color-75 pull-left w-33b"><span>总分：</span><span>'+ret.data[i].score+'分'+'</span></div>'+
										'<div class="f-10em lh-12em color-75 pull-left w-33b">共'+ret.data[i].questions_num+'个大题</div>'+
									'</div>'+
								'</div>'+
								'<span class="po-ab top-0 right-0 f-10em lh-16em h-16em color-white bg-color-1b8cff pl-5em pr-5em">已 参加</span>'+
							'</div>'
	    				)
	    			}
    			}
    		}else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">暂无考试</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99" id="more">已经到底啦~</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }
    			
    			api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
//		    	api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开详情页------------------------------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    },
    });
}

//刷新页面---------------------------------------------------------------------------------
function exec(){
	location.reload();
}