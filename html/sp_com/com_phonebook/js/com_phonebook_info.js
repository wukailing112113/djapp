apiready = function(){
	if(api.pageParam.nochat == "nochat"){
		$('openChat').hide();
	}
	getHrCommunistInfo();
}

//获取党员详情接口------------------------------------------------------------------
function getHrCommunistInfo(){
	var url = localStorage.url+"/index.php/Api/Hr/get_hr_communist_info";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values:{
		    	"communist_no":api.pageParam.id,//党员编号
			}
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status==1){
    			$('#communist_avatar').attr('src',localStorage.url+ret.data.communist_avatar);//党员头像
    			$('#communist_name').html(ret.data.communist_name);//党员姓名
    			$('#communist_sex').html(ret.data.communist_sex);//党员性别
    			$('#party_name').html(ret.data.party_name);//党员所属部门
    			$('#post_name').html(ret.data.post_name);//党员职务
    			$('#communist_birthday').html(ret.data.communist_birthday);//党员生日
    			$('#communist_mobile').html(ret.data.communist_mobile);//党员电话
    			$('#communist_email').html((ret.data.communist_email!=null&&ret.data.communist_email!='')?ret.data.communist_email:'无');//党员邮箱
    			$('#communist_address').html(ret.data.communist_address);//党员地址
    			//拨打电话
				$('#communist_mobile').click(function(){
						api.call({
							type: 'tel_prompt',
							number: ''+ret.data.communist_mobile+''
						});
				});
    			
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

function openChat(winName){
	api.openWin({
	    name: winName,
	    url: '../com_chat/header/'+winName+'.html',
	    pageParam: {
	    	"id": api.pageParam.id
	    }
    });
}