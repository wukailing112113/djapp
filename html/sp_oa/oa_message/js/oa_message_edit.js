apiready = function (){
	
}

apiready = function(){
	var noticeDate = new Date();
//	$('#communist_no').html(localStorage.user_name);
//	$('#noticeDate').html(documentDate.getFullYear()+'-'+(documentDate.getMonth()+1)+'-'+documentDate.getDate())
}


//提交通知公告接口方法---------------------------------------
function get_oa_missive_info(){
	if($('#notice_communist').parent().attr('ChoosePeopleId')==""){
		alert('请选择查看人员');
		return;
	}else if($('#notice_title').val()==""){
		alert('请输入公告标题');
		return;
	}else if($('#notice_title').val()==""){
		alert('请输入公告标题');
		return;
	}
	//获取上传列表id
	var notice_attach="";
	$("input[name='file_no']").each(function(){
		if(notice_attach==""){
			notice_attach=notice_attach+$(this).val()
		}else{
			notice_attach=notice_attach+","+$(this).val()
		}
	})
	
	var url = localStorage.url+"/index.php/Api/Oa/set_oa_notice";
//	alert(type);
//	alert(keywork);
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//发起人
	            "notice_communist":$('#notice_communist').parent().attr('ChoosePeopleId'),//收件人
	            "notice_title":$('#notice_title').val(),//公文标题
	            "notice_content":$('#notice_content').val(),//公文内容
	            "notice_attach":notice_attach,//附件上传
	        }
	    }
    },function(ret,err){
    
    	if(ret){
    		if(ret.status){
				alert('发布公告成功');
				api.execScript({
					name: 'oa_notice_header',
				    frameName: 'oa_notice',
				    script: 'exec()'
				});
				api.closeWin({});
    		}else{
    			api.toast({msg: ret.msg ,duration:3000,location: 'top'});
    		}
    	}else{
    		api.toast({msg: '网络链接失败...',duration:3000,location: 'top'});
    	}
    });
}

//打开person页面-------------------------------------------------------------------------------
function openPerson(num,type){
    api.openSlidLayout({
		type:'left',
		slidPane:{
			name:'oa_person_right_header',
			url:'../oa_person/header/oa_person_right_header.html',
			pageParam:{
		    	num:num,
		    	type:type
		    }
		},
		fixedPane:{
			name:'oa_person_left_header',
			url:'../oa_person/header/oa_person_left_header.html',
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


