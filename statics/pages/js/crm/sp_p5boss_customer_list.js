var page = 1;//主分页
var page1 = 1;
var page2 = 1;
var page3 = 1;
var status;//状态
//页面初始化
apiready=function(){
 	openTab();//tab多页签切换
    get_cust_list();//加载数据方法
    openPullRefresh("get_cust_list('pull')");//下拉加载方法
    evenScrolltobottom("get_cust_list()");
}
//加载数据方法
function get_cust_list(pull,tab,cust_keyword){
	showProgress();//加载等待
    if(tab != undefined){//标签切换赋值，加载数据
        tab_id = tab;
    }
    //判断是否为下拉刷新，初始page
    if(pull == "pull"){
        if(tab_id == "tab1"){
        	page = 1;
            page1 = 1;
            status = "01";
        }else if(tab_id == "tab2"){
        	page = 1;
            page2 = 1;
            status = "02";
        }else if(tab_id == "tab3"){
        	page = 1;
            page3 = 1;
            status = "03";
        }
    }else{
        if(tab_id == "tab1"){
            page = page1;
            status = "01";
        }else if(tab_id == "tab2"){
            page = page2;
            status = "02";
        }else if(tab_id == "tab3"){
            page = page3;
            status = "03";
        }
    }
    //ajax获取数据处理
	var url = localStorage.url+"Api/Crm/get_cust_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "page": page,
	            "pagesize":10,
	            "cust_keyword":cust_keyword,//关键词
	            "status":status//状态
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			for(var i=0;i<ret.cust_list.length;i++){
			        $("#"+tab_id).append(
			            '<li class="aui-user-view-cell border-b-none"onclick="openNewWin(\'customer_infoHeader\','+ret.cust_list[i].cust_no+')">'+
			            	'<div class="aui-img-object aui-pull-left aui-bg-info w-50 h-50 fcolor-white aui-text-center">客户</div>'+
			                '<div class="aui-img-body aui-border-b pr-0">'+
			                    '<div>'+
			                        '<span class="di-ib w-60b aui-ellipsis-1">'+ret.cust_list[i].cust_name+'</span>'+ 
			                        '<span class="di-ib w-30b text-r aui-pull-right fsize-12 pt-3 fcolor-99 mr-15">'+new Date(ret.cust_list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd")+'</span>'+                               
			                    '</div>'+
			                    '<div class="pt-5 pb-8">'+
			                        '<span class="mr-10 fsize-14 fcolor-99">销售:'+(ret.cust_list[i].sale_man != null?ret.cust_list[i].sale_man:"")+'</span>'+
			                        '<span class="fsize-14 fcolor-99">商务:'+(ret.cust_list[i].business_man != null?ret.cust_list[i].business_man:"")+'</span>'+                              
			                    '</div>'+
			                '</div>'+
			            '</li>'
			        )
			    }
				//判断标签分类追加
			    if(tab_id == "tab1"){
			        page1++;
			    }else if(tab_id == "tab2"){
			        page2++;
			    }else if(tab_id == "tab3"){
			        page3++;
			    }
			}else{
				$("#"+tab_id+" #more").remove();
				$("#"+tab_id).append(
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


//点击取消搜索事件
function cancelSearch(){
    $api.removeCls($api.dom(".aui-searchbar-wrap.focus"),"focus");
    $api.val($api.byId("search-input"),'');
    $api.dom('.aui-searchbar-input input').blur();
}

//赋值方法
function clearInput(){
    $api.val($api.byId("search-input"),'');
}

//搜索后内容回调
function search(){
    var content = $api.val($api.byId("search-input"));
	$("#"+tab_id).html("");
    get_cust_list("pull",undefined,content);//搜索加载列表
    cancelSearch();
}

//点击搜索条事件
function doSearch(){
    $api.addCls($api.dom(".aui-searchbar-wrap"),"focus");
    $api.dom('.aui-searchbar-input input').focus();
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
function exec(){
	 location.reload();
}