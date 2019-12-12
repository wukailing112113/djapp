var page =1 ;
var type = 1;
apiready = function () {
	getOaWorklogList(type);//调用（获取日报列表）接口
	openPullRefresh("exec()");//下拉刷新
    evenScrolltobottom("toTop()");//上拉加载数据
}

function toTop(){
	page++;
	getOaWorklogList(type);
}

//获取日报列表 接口----------------------------------------------
function getOaWorklogList(typeNum){
	typeNum?(type = typeNum):(type = type);
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_worklog_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data:{//传输参数
		    values:{
		    	"communist_no":localStorage.user_id,
		    	"worklog_type":type,
		    	"keyword":$('#keyword').val(),
		    	"page":page,
		    	"pagesize":10
		    }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.data.length;i++){
    				$('#list').append(
	    				'<div class="ml-8em mr-8em mt-12em bg-color-whiter" onclick="openInfo(\'oa_workplan_info_header\','+ret.data[i].worklog_id+')">'+
							'<div class="ml-8em over-h bb-1-df">'+
								'<div class="pull-left w-100b">'+
									'<p class="over-h pt-15em"><span class="pull-left f-15em color-33">'+((ret.data[i].worklog_title.length<=24)?(ret.data[i].worklog_title):(ret.data[i].worklog_title.substring(0,23)+'...'))+'</span><span class="pull-right mr-10em h-15em pl-5em pr-5em bg-color-ff3032 f-10em lh-18em bor-ra-3 color-white">'+ret.data[i].add_time.substring(0,10)+'</span></p>'+
									'<p class="f-14em color-b3 lh-16em pt-5em pb-10em white-space">'+InterceptField(ret.data[i].worklog_summary,'无',25)+'</p>'+
								'</div>'+
							'</div>'+
							'<div class="over-h pt-8em pb-12em ml-8em mr-8em f-10em color-99">'+
								'<div class="pull-left"><i></i><span></span></div>'+
								'<div class="pull-right"><i></i><span>'+ret.data[i].add_time+'</span></div>'+
							'</div>'+
						'</div>'
					)
    			}
			}
			else{
    			 if(page==1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无总结</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#list #more").remove();
					$("#list").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">已经到底啦~</div>'
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

//获取日报类型-----------------------------------------------------
function getType(type){
	$('#list').html('');
	getOaWorklogList(type);
}

//打开详情页-------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	type:type,
	    }
    });
}

//刷新页面-------------------------------------------------------
function exec(){
	location.reload();
}

//搜索关键字-----------------------------------------------------
$('#keyword').focus(function(){$(this).removeClass('text-align');})//获取焦点样式
$('#keyword').blur(function(){$(this).addClass('text-align');})//失去焦点样式
$('#keyword').keyup(function(){
	$('#list').html('');
	getOaWorklogList(type);
})


