apiready = function(){
	getHrCommunistList();//调用（获取党员列表）接口
	openPullRefresh("exec()");//下拉刷新
	evenScrolltobottom("toTop()");//上拉加载
}
var page = 1;
	confirmFlang = false;
	nochat = '';

//上拉page+1--------------------------------------------------------------------
function toTop(){
	page++;
	getHrCommunistList()
}

function tabCommunistList(departmentIdList){
	$('#personnelBox').html('');
	getHrCommunistList(departmentIdList);
}

//获取浏览接口------------------------------------------------------------------
function getHrCommunistList(){
	var url = localStorage.url+"/index.php/Api/Edu/get_edu_material_communist";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{	
		    	"material_id":api.pageParam.type,//文章id
			}
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			if(ret.data&&ret.data.length>0){
	    			for(var i=0;i<ret.data.length;i++){
						$('#personnelBox').append(
		    				'<li confirm="flase" class="over-h bb-1-df pt-10em" communistNo="'+ret.data[i].communist_no+'" onclick="openInfo(\'com_phonebook_info_header\','+ret.data[i].communist_no+')">'+
								'<img class="pull-left w-31em h-31em bor-ra-100b mr-12em mb-10em" src="'+((ret.data[i].communist_avatar)?(localStorage.url+ret.data[i].communist_avatar):("../../../statics/images/images_oa/oa_img_head.png"))+'" alt="" />'+
								'<div class="pull-left w-270em">'+
									'<p class="f-14em color-21 pt-8em pb-8em name">'+ret.data[i].communist_name+'</p>'+

								'</div>'+

							'</li>'
						)
	    			}
	    		}
			}
			else{
    			 if(page==1){
    			 	$("#personnelBox #more").remove();
					$("#personnelBox").append(
						'<div class="aui-text-center clearfix color-99 pt-10em" id="more">暂无人员</div>'
					);
	    			api.hideProgress();//隐藏进度提示框
    			 }else if(page>1){
    			 	$("#personnelBox #more").remove();
					$("#personnelBox").append(
						'<div class="aui-text-center clearfix color-99 pt-10em" id="more">已经到底啦~</div>'
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

function openInfo(winName,id){
	api.openWin({
		    name: winName,
		   // url: 'header/'+winName+'.html',
		    url: '../.../../../sp_com/com_phonebook/header/' + winName + '.html',
		    pageParam:{
		    	"id": id,		    	
		    }
	    });
}

//关键字搜索----------------------------------------------------------
$('#keywork').keyup(function(){
	$('#personnelBox').html('');
	getHrCommunistList();
})

//刷新页面-------------------------------------------------------------------------
function exec(){
	location.reload();
}

//选则人员（多选）
function ChoosePeopleFun(This,e){
	e = e || window.event;
	e.stopPropagation();
	$(This).attr('confirm',($(This).attr('confirm')=='true'?'flase':'true'));
	if($(This).attr('confirm')=='true'){//人员已选择
		$(This).find('.sure').addClass('di-n');
		$(This).find('.notSure').removeClass('di-n');
	}else{								//人员未选择
		$(This).find('.notSure').addClass('di-n');
		$(This).find('.sure').removeClass('di-n');
	}
}//attr('confirm') 自定义属性，true为选中，false为未选中；

//发起群聊  ------------------------------------------------------------------------
var memberList = '';//创建已选择人员列表
var idList = [];//创建已选择人员id列表
function groupChat(){
	memberList = '';
	idList = [];
	for(var i=0;i<$('#personnelBox').find('li').length;i++){
		if($('#personnelBox').find('.personItem').eq(i).attr('confirm')=='true'){
			memberList=memberList+$('#personnelBox').find('li').eq(i).find('.name').html()+',';
			idList.push($('#personnelBox').find('li').eq(i).attr('communistNo'));
		}
	};
	if(memberList == ''){
		alert('请选择人员');
		return;
	}
	memberList = memberList+localStorage.user_name;

	publicRong.createDiscussion({
	    name: memberList,
	    userIdList: idList
	},function(data){
//		alert(JSON.stringify(data));
		api.openWin({
	        name: 'com_chat_header',
	        url: '../com_chat/header/com_chat_header.html',
	        pageParam: {
	        	targetId: data.result.discussionId,
	        	conversationType: "DISCUSSION"
	        }
        });
	})
//	//调用（发起页）的（获取选择人）方法
//	api.execScript({
//		name: ''+winName+'_header',
//	    frameName: winName,
//	    script: 'ChoosePeople("'+api.pageParam.num+'","'+memberList+'","'+idList+'")'
//	});
}

//确认群聊人员添加  ----------------------------------------
function AddToGroup(){
	idList = [];
	for(var i=0;i<$('#personnelBox').find('li').length;i++){
		if($('#personnelBox').find('.personItem').eq(i).attr('confirm')=='true'){
			idList.push($('#personnelBox').find('li').eq(i).attr('communistNo'));
		}
	};
	publicRong.addMemberToDiscussion({
	    discussionId: api.pageParam.discussionId,
	    userIdList: idList
	},function(data){
		api.execScript({
			name: 'com_chat_members_header',
			frameName: 'com_chat_members',
	        script: 'exec();'
        });
        api.closeWin({});
	})
}
