var page = 1;//主分页
//页面初始化
apiready=function(){
    get_cust_list();//加载数据方法
    openPullRefresh("get_cust_list('pull')");//下拉加载方法
    evenScrolltobottom("get_cust_list()");
}
//加载数据方法
function get_cust_list(pull){
	showProgress();//加载等待
    //判断是否为下拉刷新，初始page
    if(pull == "pull"){
        page = 1;
    }
    //加载客户索引列表
    //ajax获取数据处理
	var url = localStorage.url+(api.pageParam.type==1?"Api/Crm/get_cust_list":api.pageParam.type==2?"Api/Crm/get_cust_business_list":"Api/Crm/get_cust_communication_list");
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "page": page,
	            "pagesize":10,
	            "cust_keyword":api.pageParam.cust_keyword,//关键词
	            "start_time":api.pageParam.start_time,//开始时间
	            "end_time":api.pageParam.end_time,//结束时间
	            "cust_area":api.pageParam.cust_area,//地区
		    	"cust_type":api.pageParam.cust_type,//类型
		    	"status":api.pageParam.status,//状态
		    	"cust_source":api.pageParam.cust_source,//来源
		    	"cust_level":api.pageParam.cust_level,//级别
		    	"sale_man":api.pageParam.sale,//销售，商机使用
				"business_man":api.pageParam.market,//商务,商机使用
				"type":1,//商机使用（用于区分APP/NET的查询类型--1：APP）
				"keywords":api.pageParam.cust_keyword,//关键词，商机使用
				"cust_no":api.pageParam.cust_no//客户编号
				
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			if(api.pageParam.type==1){
    				for(var i=0;i<ret.cust_list.length;i++){
				        $("#tab1").append(
				            '<li class="aui-user-view-cell border-b-none"onclick="openNewWin(\'customer_infoHeader\','+ret.cust_list[i].cust_no+')">'+
				            	'<div class="aui-img-object aui-pull-left aui-bg-info w-50 h-50 fcolor-white aui-text-center">客户</div>'+
				                '<div class="aui-img-body aui-border-b pr-0">'+
				                    '<div>'+
				                        '<span class="di-ib w-60b">'+ret.cust_list[i].cust_name+'</span>'+ 
				                        '<span class="di-ib w-30b text-r aui-pull-right fsize-14 pt-3 fcolor-99 mr-15">'+new Date((ret.cust_list[i].add_time!=null?ret.cust_list[i].add_time.replace(/-/g,"/"):"")).format("yyyy-MM-dd")+'</span>'+                               
				                    '</div>'+
				                    '<div class="pt-5 pb-8">'+
				                        '<span class="mr-10 fsize-14 fcolor-99">销售:'+ret.cust_list[i].sale_man+'</span>'+
				                        '<span class="fsize-14 fcolor-99">商务:'+ret.cust_list[i].business_man+'</span>'+                              
				                    '</div>'+
				                '</div>'+
				            '</li>'
				        )
			        }
			    }else if(api.pageParam.type==2){
				    for(var i=0;i<ret.business_list.length;i++){
			        	 $("#tab1").append(
			        	 	'<li class="aui-user-view-cell border-b-none"onclick="openNewWin(\'customer_infoHeader\','+ret.business_list[i].cust_no+')">'+
				            	'<div class="aui-img-object aui-pull-left aui-bg-info w-50 h-50 fcolor-white aui-text-center">商机</div>'+
				                '<div class="aui-img-body aui-border-b pr-0">'+
				                    '<div>'+
				                        '<span class="di-ib w-60b">'+ret.business_list[i].business_name+'</span>'+ 
				                        '<span class="di-ib w-30b text-r aui-pull-right fsize-14 pt-3 fcolor-99 mr-15">'+new Date(ret.business_list[i].add_time.replace(/-/g,"/")).format("yyyy-MM-dd")+'</span>'+                               
				                    '</div>'+
				                    '<div class="pt-5 pb-8">'+
				                        '<span class="mr-10 fsize-14 fcolor-99">'+ret.business_list[i].cust_name+'</span>'+
				                    '</div>'+
				                '</div>'+
				            '</li>'
				        )
				    }
		        }else if(api.pageParam.type==3){
			        for(var i=0;i<ret.list.length;i++){
			        	 $("#tab1").append(
			        	 	'<li class="aui-user-view-cell border-b-none"onclick="openNewWin(\''+(api.pageParam.info=="详情"?'customer_public_editHeader':'customer_infoHeader')+'\',\''+ret.list[i].cust_no+'\',\'沟通\',\''+ret.list[i].commu_id+'\')">'+
				            	'<div class="aui-img-object aui-pull-left aui-bg-info w-50 h-50 fcolor-white aui-text-center">沟通</div>'+
				                '<div class="aui-img-body aui-border-b pr-0">'+
				                    '<div>'+
				                        '<span class="di-ib w-60b">'+ret.list[i].business_name+'</span>'+ 
				                    '</div>'+
				                    '<div class="pt-5 pb-8">'+
				                        '<span class="mr-10 fsize-14 fcolor-99">'+ret.list[i].commu_type_name+'</span>'+
				                        '<span class="fsize-14 fcolor-99">'+ret.list[i].commu_time+'</span>'+
				                    '</div>'+
				                '</div>'+
				            '</li>'
					    )
					}
		        }
				page++;
			}else{
				$("#tab1 #more").remove();
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
function openNewWin(winName,id,type,commu_id){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	id:id,
	    	type:type,
	    	commu_id:commu_id
	    }
	});
}