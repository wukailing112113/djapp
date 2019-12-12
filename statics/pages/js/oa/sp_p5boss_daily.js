var page = 1;//主分页
var page1 = 1;
var page2 = 1;
var page3 = 1;
var page4 = 1;
var page5 = 1;
var worklog_type;//状态
var bportrait="";
apiready = function(){
	 openTab();//tab多页签切换
	 openPullRefresh("get_worklog('pull')");//下拉刷新	
	 evenScrolltobottom("get_worklog()");//上拉加载数据	 
	 get_worklog();//获取个人资料取得头像
}
var pic;
//获得日报列表
function get_worklog(pull,tab){
	var is_audit;//是否为查询审核数据
	showProgress();//加载等待	
	//ajax获取数据处理
	if(tab != undefined){//标签切换赋值，加载数据
		tab_id = tab;
	}
	//判断是否为下拉刷新，初始page
	if(pull == "pull"){
		if(tab_id == "tab1"){
			page1 = 1;
			worklog_type = "01";
			is_audit = 0;
		}else if(tab_id == "tab2"){
			page2 = 1;
			worklog_type = "02";
			is_audit = 0;
		}else if(tab_id == "tab3"){
			page3 = 1;
			worklog_type = "03";
			is_audit = 0;
		}else if(tab_id == "tab4"){
			page4 = 1;
			worklog_type = "04";
			is_audit = 0;
		}else{
			page5 = 1;
			worklog_type = "";
			is_audit = 1;
		}
		page=1;
	}else{
		if(tab_id == "tab1"){
			page = page1;
			worklog_type = "01";
			is_audit = 0;
		}else if(tab_id == "tab2"){
			page = page2;
			worklog_type = "02";
			is_audit = 0;
		}else if(tab_id == "tab3"){
			page = page3;
			worklog_type = "03";
			is_audit = 0;
		}else if(tab_id == "tab4"){
			page = page4;
			worklog_type = "04";
			is_audit = 0;
		}else{
			page = page5;
			worklog_type = "";
			is_audit = 1;
		}
	}
	//ajax获取数据处理
	var url = localStorage.url+"Api/Oa/get_worklog_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "page": page,
	            "pagesize":10,
	            "worklog_staff":localStorage.user_id,
	            "worklog_type":worklog_type,
	            "is_audit":is_audit//是否查询审核日志
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			var worklog_list = ret.list;
				for(var i = 0; i < worklog_list.length; i++){
					bportrait=get_head(worklog_list[i].staff_avatar,worklog_list[i].staff_name);
					$("#"+tab_id).append(
                        '<li class="aui-user-view-cell  border-b-none pr-0 pb-0" onclick="openNewWin(\'daily_infoHeader\','+worklog_list[i].worklog_id+',this,\''+tab_id+'\')">'+
                            bportrait+
                            '<div class="aui-img-body aui-border-b pb-5">'+
                                '<div>'+
                                    '<span class="ellipsis-one di-ib w-75b">'+worklog_list[i].worklog_title+' </span>'+
                                    '<em class="aui-pull-right fsize-12 pt-3 mr8 '+(worklog_list[i].status==1?"green":"red")+'">'+(worklog_list[i].status==1?"已审核":"未审核")+'</em>'+
                                '</div>'+
                                '<div>'+
                                    '<i class="aui-iconfont aui-icon-location aui-text-info aui-pull-left istyle"></i>'+
                                    '<span id="address_'+i+'" class="fsize-12 pt-3 fcolor-99 ellipsis-one di-ib w-60b">这位小伙伴没有定位</span>'+
                                    '<em class="aui-pull-right fsize-12 pt-5 fcolor-99 mr8">'+
                                        new Date(worklog_list[i].worklog_date!=null?worklog_list[i].worklog_date.replace(/-/g,"/"):"").format('yyyy-MM-dd')+
                                    '</em>'+
                                '</div>'+
                            '</div>'+
                        '</li>'
					);
					if(worklog_list[i].address!=null){
						var str = worklog_list[i].address.split(",");
						lon = str[0];
						lat = str[1];
						getNameFromCoords(i,lon,lat);
					}
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
				else if(tab_id == "tab5"){
					page5++;
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

/**
 *根据经纬度获取位置详细信息 
 */
function getNameFromCoords(id,lon,lat){
	var map = api.require('bMap');
	map.getNameFromCoords({
	    lon: lon,
	    lat: lat
	},function(ret,err){
	    if(ret.status){
	        $("#address_"+id).html(ret.address);
	    }
	});
}

//打开新页面
function openNewWin(winName,id,obj,tab){
	//打开新页面
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	"type":"info",
	    	"tab":tab,
	    	"id":id
	    }
    });
}
//页面刷新
function exec(){
	location.reload();
}