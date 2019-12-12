var typeNum = 2;
apiready=function(){
	getOaWorkplanList(typeNum);//调用（获取工作计划列表）
	openPullRefresh('exec()')//下拉刷新
	evenScrolltobottom('toTop()')//上拉加载
}
var page = 1;
function toTop(){
	page++;
	getOaWorkplanList(typeNum);
}

//获取工作计划列表------------------------------------------------------------------------------------
function getOaWorkplanList(type){
	var url = localStorage.url+"/index.php/Api/Oa/get_oa_workplan_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	           "communist_no":localStorage.user_id,  //已登录的id
	           "is_arranger":type,        //我发起的
	           "keywork":$("#keywork").val(), //关键字
	           "page":page,
	           "pagesize":10
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i = 0 ;i<ret.data.length;i++){
		    		$("#listBox").append(
		    			'<div class="over-h bb-1-dfdfdf pt-10em pl-12em pr-12em" onclick="openInfo(\'oa_instructions_info_header\','+ret.data[i].workplan_id+')">'+
							'<div class="pb-10em">'+
								'<p class="f-14em color-33 lh-15em f-w">'+clearNull(ret.data[i].workplan_title,'无标题')+'<span class="f-10em color-99 pull-right">'+clearNull(ret.data[i].workplan_expectstart_time,'0').substring(0,10)+'</span></p>'+
								'<p class="pt-5em f-12em color-33 lh-15em white-space">'+InterceptField(ret.data[i].workplan_content,'无',25)+'</p>'+
								'<p class="pt-5em f-12em color-99">审核人：'+clearNull(ret.data[i].workplan_audit_man,'无')+'</p>'+
							'</div>'+
						'</div>'
					)
				}
			}
			else{
    			 if(page==1){
    			 	$("#listBox #more").remove();
					$("#listBox").append(
						'<div class="aui-user-view-cell aui-text-center clearfix color-99 pt-10em" id="more">暂无工作</div>'
					);	
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#listBox #more").remove();
					$("#listBox").append(
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

//tab切换 我的工作计划与我安排的工作计划切换------------------------------------------------------------
$("#tabBox2>li").click(function(){
	$("#listBox").empty();
	$(this).addClass("tabBox2-active").siblings().removeClass("tabBox2-active");
	page = 1;
	if($(this).index()==0) typeNum=2;	else typeNum=1;
	getOaWorkplanList(typeNum);
})

//打开详情页-----------------------------------------------------------------------------------------
function openInfo(winName,type){
	api.openWin({
	    name: winName,
	    url: 'header/'+winName+'.html',
	    pageParam:{
	    	type:type
	    }
    });
}

//打开新增工作计划页面---------------------------------------------------------------------------------
function openEdit(){
	api.openWin({
        name: "oa_instructions_edit_header",
        url: 'header/oa_instructions_edit_header.html',
        pageParam:{
        	type:typeNum,
        }
    });
}

//关键字搜索----------------------------------------------------------
$('#keywork').keyup(function(){
	$("#listBox").html('');
	getOaWorkplanList(typeNum);
})

//页面刷新-------------------------------------------------------------------------------
function exec(){
	location.reload();
}