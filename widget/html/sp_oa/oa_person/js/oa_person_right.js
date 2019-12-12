apiready = function(){
	getHrCommunistList();//调用（获取党员列表）接口
	getHrPostList();//调用（获取职务列表）接口
	openPullRefresh("exec()");//下拉刷新
	evenScrolltobottom("pullUp()");//上拉加载
	var winName = api.pageParam.type;
}
var page = 1;
var confirmFlang = false;

//上拉page+1--------------------------------------------------------------------
function pullUp(){
	page++;
	getHrCommunistList()
}

//侧滑选择部门--------------------------------------------------------------------
function tabCommunistList(departmentIdList){
	$('#personnelBox').html('');
	getHrCommunistList(departmentIdList);
}

//获取党员列表接口------------------------------------------------------------------
function getHrCommunistList(departmentIdList){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{
		    	"party_no":(departmentIdList?departmentIdList:localStorage.dept_no),//部门编号
		    	"post_no":positionIdList,//职务编号
		    	"communist_name":$('#keywork').val(),//关键字
		    	"status":1,//1、党员 2、非党员
		    	"page":page,//页数
		    	"pagesize":10,//每页数量
			}
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(api.pageParam.workplan_type!='workplan_type'){
	    			if(ret.data&&ret.data.length>0){
		    			for(var i=0;i<ret.data.length;i++){
		    				$('#personnelBox').append(
			    				'<li confirm="flase" class="over-h bb-1-df pt-10em" communistNo="'+ret.data[i].communist_no+'" onclick="ChoosePeopleFun(this)">'+
									'<img class="pull-left w-40em h-40em bor-ra-100b mr-12em mb-10em" src="'+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
									'<div class="pull-left w-270em">'+
										'<p class="f-16em lh-16em color-33 f-w pt-5em pb-8em name">'+ret.data[i].communist_name+'</p>'+
										'<p class="f-16em lh-16em color-75 pb-12em">'+InterceptField(ret.data[i].party_no,'所属支部未找到',16)+'</p>'+
									'</div>'+
									'<div class="pull-right w-16em h-16em mt-20em mr-12em">'+
										'<div class="pull-left w-16em h-16em b-1-df bor-ra-3 sure"></div>'+
										'<img class="pull-left w-16em h-16em bor-ra-3 di-n notSure" src="../../../statics/images/images_com/com_yes.png" alt="" />'+
									'</div>'+
								'</li>'
							)
		    			}
		    		}
		    	}else{
		    		if(ret.data&&ret.data.length>0){
		    			for(var i=0;i<ret.data.length;i++){
		    				$('#personnelBox').append(
			    				'<li confirm="flase" class="over-h bb-1-df pt-10em" communistNo="'+ret.data[i].communist_no+'" onclick="ChoosePeopleRadio(this)">'+
									'<img class="pull-left w-40em h-40em bor-ra-100b mr-12em mb-10em" src="'+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
									'<div class="pull-left w-270em">'+
										'<p class="f-16em lh-16em color-33 f-w pt-5em pb-8em name">'+ret.data[i].communist_name+'</p>'+
										'<p class="f-16em lh-16em color-75 pb-12em">'+InterceptField(ret.data[i].party_no,'所属支部未找到',16)+'</p>'+
									'</div>'+
									'<div class="pull-right w-16em h-16em mt-20em mr-12em">'+
										'<div class="pull-left w-16em h-16em b-1-df bor-ra-3 sure"></div>'+
										'<img class="pull-left w-16em h-16em bor-ra-3 di-n notSure" src="../../../statics/images/images_com/com_yes.png" alt="" />'+
									'</div>'+
								'</li>'
							)
		    			}
		    		}
		    	}
			}
			else{
				api.toast({msg: ret.msg ,duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//选则人员（多选）
function ChoosePeopleFun(This){
	$(This).attr('confirm',($(This).attr('confirm')=='true'?'flase':'true'));
	if($(This).attr('confirm')=='true'){//人员已选择
		$(This).find('.sure').addClass('di-n');
		$(This).find('.notSure').removeClass('di-n');
	}else{								//人员未选择
		$(This).find('.notSure').addClass('di-n');
		$(This).find('.sure').removeClass('di-n');
	}
}//attr('confirm') 自定义属性，true为选中，false为未选中；

//选则人员（单选）
function ChoosePeopleRadio(This){
	$(This).attr('confirm','true');
	$(This).find('.sure').addClass('di-n');
	$(This).find('.notSure').removeClass('di-n');
	$(This).siblings().find('.notSure').addClass('di-n');
	$(This).siblings().find('.sure').removeClass('di-n');
	$(This).siblings().attr('confirm','flase');
}//attr('confirm') 自定义属性，true为选中，false为未选中；

//获取职务列表接口------------------------------------------------------------------
function getHrPostList(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_post_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	
	    }
    },function(ret,err){
    //alert(ret.data.data[1].post_no);
    	if(ret){
    		if(ret.status==1){
    			if(ret.data.data&&ret.data.data.length>0){
	    			for(var i=0;i<ret.data.data.length;i++){
		    			$('#positionBox').append(
		    				'<li onclick="confirm(this)" confirm="flase" postNo="'+ret.data.data[i].post_no+'" class="pull-left w-33b f-14em lh-14em color-75 pt-15em pb-15em">'+
								'<div class="pull-left w-12em h-12em b-1-df bor-ra-3 mr-10em sure"></div>'+
								'<img class="pull-left w-12em h-12em bor-ra-3 mr-10em notSure di-n" src="../../../statics/images/images_com/com_yes.png" alt="" />'+
								'<span class="pull-left">'+ret.data.data[i].post_name+'</span>'+
							'</li>'
		    			)
		    		}
		    	}
			}
			else{
				api.toast({msg: '无更多数据...',duration:3000,location: 'top'});
			}
			api.hideProgress();//隐藏进度提示框
    	}else{
    		api.hideProgress();//隐藏进度提示框
    		/**无网络提示 */
	    	api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//确认选择人---------------------------------------------------------------------
var memberList = '';//创建已选择人员列表
var idList = '';//创建已选择人员id列表
function confirmor(winName){
	for(var i=0;i<$('#personnelBox').find('li').length;i++){
		if($('#personnelBox').find('li').eq(i).attr('confirm')=='true'){
			memberList=memberList+$('#personnelBox').find('li').eq(i).find('.name').html()+'   ';
			idList=idList+$('#personnelBox').find('li').eq(i).attr('communistNo')+',';
		}
	};
	idList = idList.substring(0,idList.length-1);
	//调用（发起页）的（获取选择人）方法
	api.execScript({
		name: ''+winName+'_header',
	    frameName: winName,
	    script: 'ChoosePeople("'+api.pageParam.num+'","'+memberList+'","'+idList+'")'
	});
	

}

//选择部门与职务-------------------------------------------------------------------
function confirm(This){
	$(This).attr('confirm',($(This).attr('confirm')=='true'?'flase':'true'));
	if($(This).attr('confirm')=='true'){//人员已选择
		$(This).find('.sure').addClass('di-n');
		$(This).find('.notSure').removeClass('di-n');
	}else{								//人员未选择
		$(This).find('.notSure').addClass('di-n');
		$(This).find('.sure').removeClass('di-n');
	}
}//attr('confirm') 自定义属性，true为选中，false为未选中；

//确定部门与职务按钮-----------------------------------------------------------------
var departmentList = '';//创建已选择部门列表
var positionList = '';//创建已选择职务列表
var positionIdList = '';//创建已选择职务id列表
$('#determine').click(function(){//确定选择
	page = 1;
	departmentList = '';//初始化已选择部门列表
	positionList = '';//初始化已选择职务列表
	positionIdList = '';//初始化已选择职务id列表
	$('#personnelBox').html('');
	confirmList();//调用（查找已选择部门或职务 并添加到已选择列表）方法
	getHrCommunistList();//调用（获取党员列表）接口
	reset();//调用重置方法
	$('#selectBox>div').removeClass('select');
	$('#personnelBox').show();
	$('#positionBox').hide();
	$('#OKAndReset').hide();
})

function confirmList(){//查找已选择部门或职务 并添加到已选择列表
	for(var i=0;i<$('#positionBox').find('li').length;i++){
		if($('#positionBox').find('li').eq(i).attr('confirm')=='true'){
			positionList=positionList+$('#positionBox').find('li').eq(i).find('span').html()+'   ';
			positionIdList=positionIdList+$('#positionBox').find('li').eq(i).attr('postNo')+',';
		}
	};
	positionIdList = positionIdList.substring(0,positionIdList.length-1);
}

//选择支部-----------------------------------------------------------
$('#selectDepartment').click(function(){
	api.openSlidPane({
		type: 'left',
	})
})

//选择职务-----------------------------------------------------------
$('#selectPosition').click(function(){
	$(this).addClass('select');
	$('#positionBox').hide();
	$('#OKAndReset').show();
	$('#positionBox').show();
})

//部门与职务的初始化与重置--------------------------------------------------------------
$('#OKAndReset').hide();
$('#positionBox').hide();
$('#positionBox').find('li').attr('confirm','false');
$('#positionBox').find('li').find('.notSure').addClass('di-n');
$('#positionBox').find('li').find('.sure').removeClass('di-n');
function reset(){//重置方法
	$('#positionBox').find('li').attr('confirm','false');
	$('#positionBox').find('li').find('.notSure').addClass('di-n');
	$('#positionBox').find('li').find('.sure').removeClass('di-n');
}

//关键字搜索----------------------------------------------------------
$('#keywork').keyup(function(){
	positionIdList='';
	$('#personnelBox').html('');
	getHrCommunistList();
})

//刷新页面-------------------------------------------------------------------------
function exec(){
	location.reload();
}

//打开侧边栏
$('#selectDepartment').click(function(){
	api.openSlidPane({
		type: 'left',
	})
});