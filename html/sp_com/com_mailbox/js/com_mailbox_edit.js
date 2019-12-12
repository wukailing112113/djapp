apiready = function(){
	
}


//提交公文接口方法---------------------------------------
function comImailSave(){
	var url = localStorage.url+"/index.php/Api/Life/com_imail_save";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//发起人
	            "imail_receivers":$('#imail_receivers').attr('ChoosePeopleId'),//收件人
	            "imail_title":$('#imail_title').val(),//公文标题
	            "imail_content":$('#imail_content').val(),//公文内容
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
				alert('提交成功');
				api.closeWin({});
    		}else{
    			api.toast({msg: '发起失败...',duration:3000,location: 'top'});
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

function goBlack(){
	api.closeWin({name:api.winName});
}


//打开person页面-------------------------------------------------------------------------------
function openPerson(num,type){
    api.openSlidLayout({
		type:'left',
		slidPane:{
			name:'oa_person_right_header',
			url:'../../sp_oa/oa_person/header/oa_person_right_header.html',
			pageParam:{
		    	num:num,
		    	type:type
		    }
		},
		fixedPane:{
			name:'oa_person_left_header',
			url:'../../sp_oa/oa_person/header/oa_person_left_header.html',
		},
	}, function(ret, err) {
		
	});
}

//获取选择人方法-----------------------------------------
function ChoosePeople(num,name,id){
	$('.memberList').eq(num).find('span').html(name);
	$('.memberList').eq(num).attr('ChoosePeopleId',id);
}

//---------------------
//var documentDate = new Date();
//documentDate.getFullYear();    //获取完整的年份(4位,1970-????)
//documentDate.getMonth();       //获取当前月份(0-11,0代表1月)
//documentDate.getDate();        //获取当前日(1-31)