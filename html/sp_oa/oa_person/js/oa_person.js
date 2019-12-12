apiready = function(){
	get_hr_communist_list();//调用（获取党员列表）接口
	get_hr_cat_party_list();//调用（获取部门列表）接口
	get_hr_post_list();//调用（获取职务列表）接口
}
var page = 1;
var confirmFlang = false;



//获取党员列表接口------------------------------------------------------------------
function get_hr_communist_list(){
	var url = localStorage.url+"/index.php/Api/Hrcommunist/get_hr_communist_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	"party_no":(departmentIdList?departmentIdList:localStorage.dept_no),//部门编号
	    	"post_no":positionIdList,//职务编号
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
	    		
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

//获取部门列表接口------------------------------------------------------------------
function get_hr_cat_party_list(){
	var url = localStorage.url+"/index.php/Api/Hrcommunist/get_hr_cat_party_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.code_list.length;i++){
	    			$('#departmentBox').append(
	    				'<li class="over-h">'+
							'<p class="f-14em lh-14em color-33 f-w pt-16em pb-16em"><i class="f-12em lh-14em color-99 p-0 iconfont mr-8em">&#xe87d;</i>'+ret.code_list[i].code_name+'</p>'+
							'<ul class="over-h pl-15em departmentBoxs">'+
								
							'</ul>'+
						'</li>'
	    			)
	    			for(var j=0;j<ret.code_list[i].party_list.length;j++){
	    				$('.departmentBoxs').eq(i).append(
	    					'<li onclick="confirm(this)" confirm="flase" postNo="'+ret.code_list[i].party_list[j].party_no+'" class="pull-left w-100b f-14em lh-14em color-75 pt-15em pb-15em">'+
								'<div class="pull-left w-12em h-12em b-1-df bor-ra-3 mr-10em sure"></div>'+
								'<img class="pull-left w-12em h-12em bor-ra-3 mr-10em notSure di-n" src="../../../statics/images/images_com/com_yes.png" alt="" />'+
								'<span class="pull-left">'+ret.code_list[i].party_list[j].party_name+'</span>'+
							'</li>'
	    				)
	    			}
	    		}
	    		$('#departmentBox>li>ul').hide();
				$('.departmentBoxs').find('li').attr('confirm','false');
				$('.departmentBoxs').find('li').find('.notSure').addClass('di-n');
				$('.departmentBoxs').find('li').find('.sure').removeClass('di-n');
				$('#departmentBox>li').click(function(){
					$('#departmentBox>li>ul').hide();
					$('#departmentBox>li>p>i').html('&#xe87d;');
					$(this).find('p>i').html('&#xe780;');
					$(this).find('ul').show();
				});
			}else{
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

//获取职务列表接口------------------------------------------------------------------
function get_hr_post_list(){
	var url = localStorage.url+"/index.php/Api/Hrcommunist/get_hr_post_list";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			for(var i=0;i<ret.post_list.length;i++){
	    			$('#positionBox').append(
	    				'<li onclick="confirm(this)" confirm="flase" postNo="'+ret.post_list[i].post_no+'" class="pull-left w-33b f-14em lh-14em color-75 pt-15em pb-15em">'+
							'<div class="pull-left w-12em h-12em b-1-df bor-ra-3 mr-10em sure"></div>'+
							'<img class="pull-left w-12em h-12em bor-ra-3 mr-10em notSure di-n" src="../../../statics/images/images_com/com_yes.png" alt="" />'+
							'<span class="pull-left">'+ret.post_list[i].post_name+'</span>'+
						'</li>'
	    			)
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

//选择人员-----------------------------------------------------------------------
$('#personnelBox').find('li').click(function(){
	$(this).attr('confirm',($(this).attr('confirm')=='true'?'flase':'true'));
	if($(this).attr('confirm')=='true'){//人员已选择
		$(this).find('.sure').addClass('di-n');
		$(this).find('.notSure').removeClass('di-n');
	}else{								//人员未选择
		$(this).find('.notSure').addClass('di-n');
		$(this).find('.sure').removeClass('di-n');
	}
})//attr('confirm') 自定义属性，true为选中，false为未选中；

//确认选择人---------------------------------------------------------------------
var memberList = '';//创建已选择人员列表
var idList = '';//创建已选择人员id列表
function confirmor(){
	for(var i=0;i<$('#personnelBox').find('li').length;i++){
		if($('#personnelBox').find('li').eq(i).attr('confirm')=='true'){
			memberList=memberList+$('#personnelBox').find('li').eq(i).find('.name').html()+'   ';
			idList=idList+i+',';
		}
	};
	api.execScript({//调用（发起公文页）的（获取选择人）方法
		name: 'oa_document_edit_header',
		frameName: 'oa_document_edit',
        script: 'ChoosePeople('+api.pageParam.type+',\''+memberList+'\',\''+idList+'\');'
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
var departmentIdList = '';//创建已选择部门id列表
var positionList = '';//创建已选择职务列表
var positionIdList = '';//创建已选择职务id列表
$('#determine').click(function(){//确定选择
	confirmList();//调用（查找已选择部门或职务 并添加到已选择列表）方法
	get_hr_communist_list();//调用（获取党员列表）接口
	page = 1;
	reset();//调用重置方法
	departmentList = '';//初始化已选择部门列表
	departmentIdList = '';//初始化已选择部门id列表
	positionList = '';//初始化已选择职务列表
	positionIdList = '';//初始化已选择职务id列表
	$('#selectBox>div').removeClass('select');
	$('#personnelBox').show();
	$('#departmentBox').hide();
	$('#positionBox').hide();
	$('#OKAndReset').hide();
	$('#departmentBox>li>p>i').html('&#xe87d;');
	
})

function confirmList(){//查找已选择部门或职务 并添加到已选择列表
	for(var i=0;i<$('.departmentBoxs').find('li').length;i++){
		if($('.departmentBoxs').find('li').eq(i).attr('confirm')=='true'){
			departmentList=departmentList+$('.departmentBoxs').find('li').eq(i).find('span').html()+'   ';
			departmentIdList=departmentIdList+$('.departmentBoxs').find('li').eq(i).attr('postNo')+',';
		}
	};
	for(var i=0;i<$('#positionBox').find('li').length;i++){
		if($('#positionBox').find('li').eq(i).attr('confirm')=='true'){
			positionList=positionList+$('#positionBox').find('li').eq(i).find('span').html()+'   ';
			positionIdList=positionIdList+$('#positionBox').find('li').eq(i).attr('postNo')+',';
		}
	};
	departmentIdList = departmentIdList.substring(0,departmentIdList.length-1);
	positionIdList = positionIdList.substring(0,positionIdList.length-1);
	alert(departmentIdList);
}

//选择支部与选择职务tab切换-----------------------------------------------------------
$('#selectBox>div').click(function(){
	$('#selectBox>div').removeClass('select');
	$(this).addClass('select');
	$('#personnelBox').hide();
	$('#departmentBox').hide();
	$('#positionBox').hide();
	$('#OKAndReset').show();
	if($(this).index()==0){
		$('#departmentBox').show();
	}else{
		$('#positionBox').show();
	}
})

//部门与职务的初始化与重置--------------------------------------------------------------
$('#OKAndReset').hide();
$('#departmentBox').hide();
$('#positionBox').hide();
$('#departmentBox>li>ul').hide();
$('.departmentBoxs').find('li').attr('confirm','false');
$('.departmentBoxs').find('li').find('.notSure').addClass('di-n');
$('.departmentBoxs').find('li').find('.sure').removeClass('di-n');
$('#positionBox').find('li').attr('confirm','false');
$('#positionBox').find('li').find('.notSure').addClass('di-n');
$('#positionBox').find('li').find('.sure').removeClass('di-n');
function reset(){//重置方法
	$('#departmentBox>li>ul').hide();
	$('#departmentBox>li>p>i').html('&#xe87d;');
	$('.departmentBoxs').find('li').attr('confirm','false');
	$('.departmentBoxs').find('li').find('.notSure').addClass('di-n');
	$('.departmentBoxs').find('li').find('.sure').removeClass('di-n');
	$('#positionBox').find('li').attr('confirm','false');
	$('#positionBox').find('li').find('.notSure').addClass('di-n');
	$('#positionBox').find('li').find('.sure').removeClass('di-n');
}

//部门切换-------------------------------------------------------------------------
$('#departmentBox>li').click(function(){
	$('#departmentBox>li>ul').hide();
	$('#departmentBox>li>p>i').html('&#xe87d;');
	$(this).find('p>i').html('&#xe780;');
	$(this).find('ul').show();
});

