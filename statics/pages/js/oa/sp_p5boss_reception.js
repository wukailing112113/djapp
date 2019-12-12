
//分页字段
var page = 1;//主分页
var page1 = 1;
var page2 = 1;
var page3 = 1;
var page4 = 1;
var approval_status;//状态
//刷新本页面
function rel(){
	location.reload();
}

apiready = function () {
    openTab();//tab多页签切换
    openPullRefresh("get_approval_list('pull')");//下拉刷新
    evenScrolltobottom("get_approval_list()");//上拉加载数据
    get_approval_list();//获取数据
}

//获取数据
function get_approval_list(pull,tab){
	showProgress();//加载等待
	if(tab != undefined){//标签切换赋值，加载数据
		tab_id = tab;
	}
	//判断是否为下拉刷新，初始page
	if(pull == "pull"){
		if(tab_id == "tab1"){
			page1 = 1;
			approval_status = 0;
		}else if(tab_id == "tab2"){
			page2 = 1;
			approval_status = 3;
		}else if(tab_id == "tab3"){
			page3 = 1;
			approval_status = 4;
		}
		else if(tab_id == "tab4"){
			page4 = 1;
			approval_status = 1;
		}
		page=1;
	}else{
		if(tab_id == "tab1"){
			page = page1;
			approval_status = 0;
		}else if(tab_id == "tab2"){
			page = page2;
			approval_status = 3;
		}else if(tab_id == "tab3"){
			page = page3;
			approval_status = 4;
		}
		else if(tab_id == "tab4"){
			page = page4;
			approval_status = 1;
		}
	}
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oaapproval/get_approval_reception_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            page: page,
	            pagesize:10,
	            staff_no:localStorage.user_id,
	            status:approval_status
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			var approval_list = ret.reception_list;
				for(var i = 0; i < approval_list.length; i++){
					$("#"+tab_id).append(
						'<li class="aui-user-view-cell aui-img" onclick="openNewWin(\'oa_reception_info_header\',\''+approval_list[i].reception_no+'\',\''+approval_status+'\')">'+
			                '<div class="aui-img-body">'+
			                    '<div class="aui-ellipsis-1">'+approval_list[i].reception_name+'</div>'+
			                    '<p>'+approval_list[i].reception_apply_staff+'<em class="aui-pull-right">'+approval_list[i].reception_time+'</em></p>'+
			                '</div>'+
			            '</li>'
					);
				}
				//判断标签分类追加
				if(tab_id == "tab1"){
					page1++;
				}else if(tab_id == "tab2"){
					page2++;
				}else if(tab_id == "tab3"){
					page3++;
				}
				else if(tab_id == "tab4"){
					page4++;
				}
				api.hideProgress();//隐藏进度提示框
			}else{
				$("#"+tab_id+" #more").remove();
				$("#"+tab_id).append(
					'<li class="aui-user-view-cell aui-text-center" id="more">没有更多数据</li>'
				);
				api.hideProgress();//隐藏进度提示框
			}
			
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开新页面
function openNewWin(winName,reception_no,approval_status){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":"info",//区分页面类型，主要是详情页和添加一同一页面
	    	"reception_no":reception_no,
	    	"approval_status":approval_status//approval_status状态，用来处理详情中根据状态展示底部按钮
	    }
    });
}

