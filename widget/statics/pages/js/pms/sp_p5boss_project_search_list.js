var page = 1;//主分页
//页面初始化
apiready=function(){
    get_project_list();//加载数据方法
    openPullRefresh("get_project_list('pull')");//下拉刷新
	evenScrolltobottom("get_project_list()");//上拉加载数据
}
//加载数据方法
function get_project_list(pull){
	showProgress();//加载等待
    //判断是否为下拉刷新，初始page
    if(pull == "pull"){
        page=1;
    }
    
    //加载客户索引列表
    //ajax获取数据处理
	var url = localStorage.url+"Api/Pms/get_project_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "page": page,
	            "pagesize":10,
	            "key_word":api.pageParam.cust_keyword,//关键词
	            "start_time":api.pageParam.start_time,//开始时间
	            "end_time":api.pageParam.end_time,//结束时间
	            "cust_area":api.pageParam.cust_area,//地区
		    	"cust_type":api.pageParam.cust_type,//类型
		    	"cust_source":api.pageParam.cust_source,//来源
		    	"cust_level":api.pageParam.cust_level,//级别
		    	"add_staff":localStorage.user_id//当前登陆人编号
	        }
	    }
    },function(ret,err){
	    	if(ret){
	    		if(ret.status==1){
	    			for(var i=0;i<ret.cust_list.length;i++){
	    				if(ret.cust_list[i].is_default==0){//判断是否为默认项目0为非默认1为默认
		    				$('#tab1').append(
			    				'<li class="aui-user-view-cell aui-img" onclick="openWin(\'project_trackingHeader\','+ret.cust_list[i].project_no+')">'+
			    					(ret.cust_list[i].project_logo != null && ret.cust_list[i].project_logo != ""?'<img class="aui-img-object aui-pull-left aui-bg-success w-50 h-50" src=\"'+localStorage.url+ret.cust_list[i].project_logo +'\" />':'<div class="w-50 h-50 aui-col-xs-4 aui-bg-info mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-12">'+ret.cust_list[i].project_abbr.substring(ret.cust_list[i].project_abbr.length-2,ret.cust_list[i].project_abbr.length)+'</div>')+
									'<div class="aui-img-body lh-50 aui-border-b pr-15 pb-11 aui-flex-col">'+
										'<div class="aui-ellipsis-1 aui-flex-item-8">'+ret.cust_list[i].project_abbr+'</div>'+
										'<div class="aui-pull-right  aui-text-info z-index-max aui-flex-item-4 aui-text-right" onclick="default_t('+ret.cust_list[i].project_no+')">设为默认</div>'+
									'</div>'+
								'</li>'
			    			)
			    		}else if(ret.cust_list[i].is_default==1){
			    			$('#tab1').prepend(
			    				'<li class="aui-user-view-cell aui-img" onclick="openWin(\'project_trackingHeader\','+ret.cust_list[i].project_no+')">'+
									(ret.cust_list[i].project_logo != null && ret.cust_list[i].project_logo != ""?'<img class="aui-img-object aui-pull-left aui-bg-success w-50 h-50" src=\"'+localStorage.url+ret.cust_list[i].project_logo +'\" />':'<div class="w-50 h-50 aui-col-xs-4 aui-bg-info mr-15 lh-50 fcolor-white ellipsis-one bor-ra-100b text-align fsize-12">'+ret.cust_list[i].project_abbr.substring(ret.cust_list[i].project_abbr.length-2,ret.cust_list[i].project_abbr.length)+'</div>')+
									'<div class="aui-img-body lh-50 aui-border-b pr-15 pb-11">'+
										'<div class="aui-ellipsis-1 aui-flex-item-8">'+ret.cust_list[i].project_abbr+'</div>'+
										'<div class="aui-pull-right default aui-text-info z-index-max aui-flex-item-4 aui-text-right">默认</div>'+
									'</div>'+
								'</li>'
			    			)
			    		}
	    			}
	    			page++;
				}
				else{
					$("#more").remove();
					$("#tab1").append(
						'<li class="aui-user-view-cell aui-text-center" id="more">没有更多数据</li>'
					);	
				}
				api.hideProgress();//隐藏进度提示框
	    	}else{
	    		api.hideProgress();//隐藏进度提示框
	    		/**无网络提示 */
		    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
	    	}
	    });
}

//打开新页面
function openNewWin(winName,id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id
	    }
	});
}
//设置默认项目 
function default_t(id,event){
	var event=event||window.event;
	event.stopPropagation();
	showProgress();//加载等待
	var url = localStorage.url+"Api/Pms/set_project_default";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           project_no:id,
	           staff_no:localStorage.user_id//当前登陆人编号
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$aui.alert({
    				title:'提示',
    				content:'提交成功',
    				buttons:['确定']},
    				function(ret){
    					exec();
    				});
			}
			else{
				alert(ret.msg,"提示");
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}
//刷新页面方法
function exec(){
	location.reload();
}
//打开新页面
function openWin(winName,project_no){
	api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
        	project_no:project_no
        }
    });
   
}