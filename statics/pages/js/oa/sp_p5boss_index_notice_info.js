//页面加载方法
apiready = function(){	
		get_notice_list();
}

//获取我的公告数据
function get_notice_list(){
	//ajax获取数据处理
	var url = localStorage.url+"Api/Bd/get_notice_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "staff_no":localStorage.user_id
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    			$("#notice").html("");
    			var notice_list = ret.list;
				for(var i = 0; i < notice_list.length; i++){
					$("#notice").append(
			            '<li class="aui-list-view-cell" onclick="openNewWin(\'notice_infoHeader\','+notice_list[i].notice_id+')">'
		                	+notice_list[i].notice_title+
			            '</li>'
					);
				}
			}
    	}else{
    		//无网络提示 
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});	    	
    	}
    });
}

//打开新页面
function openNewWin(winName,id){
    //打开新页面
    api.openWin({
        name: winName,
        url: 'header/'+winName+'.html',
        pageParam:{
            "id":id
        }
    });
}

//刷新页面
function exec(){
    location.reload();
}