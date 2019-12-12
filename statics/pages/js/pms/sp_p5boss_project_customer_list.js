var page = 1;//主分页
var cust_name='';//客户名称
var cust_no='';//客户
//页面初始化
apiready=function(){
    get_cust_list();//加载数据方法
    openPullRefresh("get_cust_list('pull')");//下拉加载方法
    evenScrolltobottom("get_cust_list()");
}
//加载数据方法
function get_cust_list(pull,cust_keyword){
	showProgress();//加载等待
    //判断是否为下拉刷新，初始page
    if(pull == "pull"){
        page = 1;
    }
    //加载客户索引列表
    //ajax获取数据处理
	var url = localStorage.url+"Api/Crm/get_cust_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	    		"cust_keyword":cust_keyword,
	            "page": page,
	            "pagesize":10	
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status == 1){
    				var bg = new Array();
					bg[0] = "aui-bg-primary";
					bg[1] = "aui-bg-success";
					bg[2] = "aui-bg-info";
					bg[3] = "aui-bg-warning";
					bg[4] = "aui-bg-danger";
					var aui_bg=0;
    				for(var i=0;i<ret.cust_list.length;i++){
				        $("#tab1").append(
				            '<li class="aui-user-view-cell border-b-none">'+
				            	'<img class="aui-img-object aui-pull-left '+bg[aui_bg]+'" width="50px" height="50px" src="">'+
				                '<span  style="position: absolute;top: 20px;left: 23px;color:#fff;">客户</span>'+
				                '<div class="aui-img-body aui-border-b pr-0">'+
				                    '<div>'+
				                        '<span class="di-ib w-60b aui-ellipsis-1">'+ret.cust_list[i].cust_name+'</span>'+ 
				                        '<input onclick="check(this)" class="aui-pull-right aui-radio aui-radio-info mt-15" type="radio" name="demo">'+   
				                        '<span class="di-n">'+ret.cust_list[i].cust_no+'</span>'+                             
				                    '</div>'+
				                    '<div class="pt-5 pb-8 aui-ellipsis-1">'+
				                        '<span class="mr-10 fsize-14 fcolor-99">销售:'+(ret.cust_list[i].sale_man==null?'':ret.cust_list[i].sale_man)+'</span>'+
				                        '<span class="fsize-14 fcolor-99">商务:'+(ret.cust_list[i].business_man==null?'':ret.cust_list[i].business_man)+'</span>'+                             
				                    '</div>'+
				                '</div>'+
				            '</li>'
				        )
				        aui_bg++;
				        if(aui_bg==5){
				        	aui_bg=0;
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
//搜索
function SearchBar(){
    var UISearchBar = api.require('UISearchBar');
    UISearchBar.open({
        placeholder: '请输入搜索关键字',
        historyCount: 10,
        showRecordBtn: false,
        texts: {
            cancelText: '取消',
            clearText: '清除搜索记录'
        },
        styles: {
            navBar: {
                bgColor: '#FFFFFF',
                borderColor: '#ccc'
            },
            searchBox: {
                bgImg: '',
                color: '#000',
                height: 44
            },
            cancel: {
                bg: 'rgba(0,0,0,0)',
                color: '#D2691E',
                size: 16
            },
            list: {
                color: '#696969',
                bgColor: '#FFFFFF',
                borderColor: '#eee',
                size: 16
            },
            clear: {
                color: '#000000',
                borderColor: '#ccc',
                size: 16
            }
        }
    },function( ret, err ){
        if( ret ){ 
            get_project_list(ret.text);
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
//关键词搜索
//点击搜索条事件
function doSearch(){
    $api.addCls($api.dom(".aui-searchbar-wrap"),"focus");
    $api.dom('.aui-searchbar-input input').focus();
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
    if(content){
	    $("#tab1").html("");
        get_cust_list("pull",content);//搜索加载列表
    }else{
        api.alert({
            title: '搜索提示',
            msg: '您没有输入任何内容'
        });
    }
    cancelSearch();
}	
function select(){
	if($("[check='check']").prev().html()){
		cust_name=$("[check='check']").prev().html();
	}
	if($("[check='check']").next().html()){
		cust_no=$("[check='check']").next().html();
	}
	api.closeWin({
    });
    //新增项目时客户名称用
	api.execScript({
		name:'project_addHeader',
		frameName:'project_add',
	    script: 'change("'+cust_name+'","'+cust_no+'");'
    });
    //新增商机时客户名称赋值用
    api.execScript({
		name:'business_editHeader',
		frameName:'business_edit',
	    script: 'change("'+cust_name+'","'+cust_no+'");'
    });
    //新增沟通时客户名称赋值用
    api.execScript({
		name:'customer_public_editHeader',
		frameName:'customer_public_edit',
	    script: 'change("'+cust_name+'","'+cust_no+'");'
    });

    //新增拜访客户赋值用
    api.execScript({
		name:'sign_editHeader',
		frameName:'sign_edit',
	    script: 'change("'+cust_name+'","'+cust_no+'");'
    });
    
}	
function check(obj){
	$("[type='radio']").attr('check','');
	$(obj).attr('check','check');
	
}