apiready = function(){
	var documentDate = new Date();
	$('#communist_no').html(localStorage.user_name);
	$('#documentDate').html(documentDate.getFullYear()+'-'+(documentDate.getMonth()+1)+'-'+documentDate.getDate())
}


//提交公文接口方法---------------------------------------
function set_oa_missive(){
	if($('#missive_receiver_no').parent().attr('ChoosePeopleId')==""){
		alert('请选择收件人');
		return;
	}else if($('#missive_receiver_no').parent().attr('ChoosePeopleId')==""){
		alert('请选择收件人');
		return;
	}else if($('#missive_title').val()==""){
		alert('请输入标题');
		return;
	}else if($('#missive_content').val()==""){
		alert('请输入公文内容');
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
//	alert(localStorage.user_id);
//	alert($('#missive_receiver_no').parent().attr('ChoosePeopleId'));
//	alert($('#missive_cc').parent().attr('ChoosePeopleId'));
//	alert($('#missive_title').val());
//	alert($('#missive_content').val());
//	alert(notice_attach);
	var url = localStorage.url+"/index.php/Api/Oa/set_oa_missive";
	api.ajax({
	    url:url,
	    method: 'post',
	    timeout: 100,
	    data: {//传输参数
	    	values: { 
	            "communist_no":localStorage.user_id,//发起人
	            "missive_receiver":$('#missive_receiver_no').parent().attr('ChoosePeopleId'),//收件人
	            "missive_cc":$('#missive_cc').parent().attr('ChoosePeopleId'),//抄送人
	            "missive_title":$('#missive_title').val(),//公文标题
	            "missive_content":$('#missive_content').val(),//公文内容
	            "missive_attach":notice_attach,//附件上传
	        }
	    }
    },function(ret,err){
    	if(ret){
    		if(ret.status){
    			api.execScript({
    				name:'oa_document_header',
    				frameName:'oa_document',
	                script: 'exec();'
                });
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




//打开选择人页面----------------------------------------
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





//取消 
function cancel(){
	api.openWin({
		name : 'oa_document_header',
		url : 'header/oa_document_header.html'
	});
}
